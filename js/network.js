// WebRTC Online Multiplayer Manager (PeerJS) - Host Authoritative Combat & Score Sync
class NetworkManager {
    constructor(game) {
        this.game = game;
        this.peer = null;
        this.isHost = false;
        this.isClient = false;
        this.roomCode = '';
        this.connections = new Map(); // peerId -> DataConnection
        this.hostConn = null;
        this.syncTimer = 0;
    }

    generateCode() {
        const digits = Math.floor(1000 + Math.random() * 9000);
        return `CS-${digits}`;
    }

    toPeerId(code) {
        const clean = code.toUpperCase().replace(/[^A-Z0-9]/g, '');
        return `agy-cs-online-v1-${clean}`;
    }

    hostRoom(onReady, onError) {
        if (typeof Peer === 'undefined') {
            if (onError) onError('ไม่สามารถโหลดระบบ PeerJS ได้ (ตรวจสอบอินเทอร์เน็ต)');
            return;
        }

        this.cleanup();
        this.roomCode = this.generateCode();
        const peerId = this.toPeerId(this.roomCode);

        try {
            this.peer = new Peer(peerId, { debug: 1 });
        } catch (err) {
            if (onError) onError(err.message);
            return;
        }

        this.peer.on('open', () => {
            this.isHost = true;
            this.isClient = false;
            if (onReady) onReady(this.roomCode);
        });

        this.peer.on('connection', (conn) => {
            this.setupHostConnection(conn);
        });

        this.peer.on('error', (err) => {
            console.warn('Peer error:', err);
            if (onError) onError('เกิดข้อผิดพลาดในการสร้างห้อง: ' + err.type);
        });
    }

    joinRoom(rawCode, onConnected, onError) {
        if (typeof Peer === 'undefined') {
            if (onError) onError('ไม่สามารถโหลดระบบ PeerJS ได้');
            return;
        }

        const clean = rawCode.trim().toUpperCase();
        if (!clean) {
            if (onError) onError('กรุณากรอกรหัสห้อง');
            return;
        }

        const formattedCode = clean.startsWith('CS-') ? clean : (clean.startsWith('CS') ? 'CS-' + clean.slice(2) : `CS-${clean}`);
        const hostPeerId = this.toPeerId(formattedCode);

        this.cleanup();
        this.roomCode = formattedCode;

        try {
            this.peer = new Peer(undefined, { debug: 1 });
        } catch (err) {
            if (onError) onError(err.message);
            return;
        }

        this.peer.on('open', (myId) => {
            const conn = this.peer.connect(hostPeerId, { reliable: true });
            this.hostConn = conn;

            conn.on('open', () => {
                this.isClient = true;
                this.isHost = false;
                conn.send({
                    type: 'join',
                    id: myId,
                    name: this.game.player.name,
                    team: this.game.player.team,
                    weapon: this.game.player.weaponId
                });
                if (onConnected) onConnected(this.roomCode);
            });

            conn.on('data', (data) => {
                this.handleClientData(data);
            });

            conn.on('close', () => {
                this.game.addChatMessage('⚠️ การเชื่อมต่อกับหัวหน้าห้องหลุด', '#f87171');
            });

            conn.on('error', (err) => {
                if (onError) onError('เชื่อมต่อห้องไม่สำเร็จ: ' + err);
            });
        });

        this.peer.on('error', (err) => {
            if (onError) onError('ไม่พบรหัสห้องนี้ หรือเชื่อมต่อไม่ได้ (' + err.type + ')');
        });
    }

    setupHostConnection(conn) {
        conn.on('open', () => {
            this.connections.set(conn.peer, conn);
        });

        conn.on('data', (data) => {
            if (!data || !data.type) return;

            if (data.type === 'join') {
                this.game.onRemotePlayerJoined(conn.peer, data.name, data.team, data.weapon);
                this.broadcast({
                    type: 'chat',
                    sender: 'SYSTEM',
                    text: `🟢 ${data.name} เข้าร่วมทีม ${data.team}!`
                });
                conn.send({
                    type: 'welcome',
                    mode: this.game.gameMode,
                    mapId: this.game.mapId,
                    scores: this.game.scores,
                    roundTime: this.game.roundTime
                });
            } else if (data.type === 'state') {
                this.game.updateRemotePlayerState(conn.peer, data);
            } else if (data.type === 'shoot') {
                this.game.onRemoteShoot(conn.peer, data);
                this.broadcastExcept(conn.peer, data);
            } else if (data.type === 'hit') {
                this.game.onRemoteHitClaim(conn.peer, data);
            } else if (data.type === 'chat') {
                this.game.addChatMessage(`${data.sender}: ${data.text}`);
                this.broadcastExcept(conn.peer, data);
            } else if (data.type === 'bomb_plant') {
                this.game.plantBombAt(data.x, data.z, data.site, data.planter);
            } else if (data.type === 'bomb_defuse') {
                this.game.onBombDefused(data.defuser);
            }
        });

        conn.on('close', () => {
            this.connections.delete(conn.peer);
            this.game.onRemotePlayerLeft(conn.peer);
        });
    }

    handleClientData(data) {
        if (!data || !data.type) return;

        if (data.type === 'welcome') {
            this.game.gameMode = data.mode;
            if (data.mapId && this.game.mapId !== data.mapId) {
                this.game.loadMap(data.mapId);
            }
            this.game.scores = data.scores;
            this.game.roundTime = data.roundTime;
            this.game.updateVitalsHUD();
            this.game.updateScoreHUD();
        } else if (data.type === 'map_change') {
            this.game.loadMap(data.mapId);
            this.game.addChatMessage(`🗺️ หัวหน้าห้องเปลี่ยนด่านเป็น: ${this.game.getMapName(data.mapId)}`, '#38bdf8');
        } else if (data.type === 'world_snapshot') {
            this.game.applyWorldSnapshot(data);
        } else if (data.type === 'shoot') {
            this.game.onRemoteShoot(data.id, data);
        } else if (data.type === 'damage_you') {
            this.game.onClientDamagedByHost(data);
        } else if (data.type === 'respawn_you') {
            this.game.respawnLocalPlayer();
        } else if (data.type === 'kill_event') {
            this.game.onClientKillEvent(data);
        } else if (data.type === 'round_reset') {
            this.game.onClientRoundReset(data);
        } else if (data.type === 'round_end') {
            this.game.onClientRoundEnd(data);
        } else if (data.type === 'chat') {
            this.game.addChatMessage(`${data.sender}: ${data.text}`);
        }
    }

    update(dt) {
        if (!this.isHost && !this.isClient) return;

        this.syncTimer += dt;
        if (this.syncTimer < 0.05) return; // 20 Hz network tick
        this.syncTimer = 0;

        const p = this.game.player;
        if (this.isClient && this.hostConn && this.hostConn.open) {
            this.hostConn.send({
                type: 'state',
                id: this.peer.id,
                name: p.name,
                team: p.team,
                x: p.x,
                y: p.y,
                z: p.z,
                yaw: p.yaw,
                pitch: p.pitch,
                weapon: p.weaponId
            });
        } else if (this.isHost && this.connections.size > 0) {
            const actors = [
                {
                    id: 'HOST',
                    name: p.name,
                    team: p.team,
                    x: p.x,
                    y: p.y,
                    z: p.z,
                    yaw: p.yaw,
                    pitch: p.pitch,
                    hp: p.hp,
                    weapon: p.weaponId,
                    kills: p.kills,
                    deaths: p.deaths,
                    isBot: false
                }
            ];

            for (const ent of this.game.entities) {
                actors.push({
                    id: ent.id,
                    name: ent.name,
                    team: ent.team,
                    x: ent.x,
                    y: ent.y,
                    z: ent.z,
                    yaw: ent.yaw,
                    pitch: ent.pitch || 0,
                    hp: ent.hp,
                    weapon: ent.weapon,
                    kills: ent.kills || 0,
                    deaths: ent.deaths || 0,
                    isBot: ent.isBot
                });
            }

            this.broadcast({
                type: 'world_snapshot',
                scores: this.game.scores,
                roundTime: this.game.roundTime,
                bombState: this.game.bombState ? {
                    planted: this.game.bombState.planted,
                    site: this.game.bombState.site,
                    x: this.game.bombState.x,
                    z: this.game.bombState.z,
                    timer: this.game.bombState.timer
                } : null,
                actors
            });
        }
    }

    broadcast(msg) {
        for (const conn of this.connections.values()) {
            if (conn.open) conn.send(msg);
        }
    }

    broadcastExcept(excludeId, msg) {
        for (const [id, conn] of this.connections.entries()) {
            if (id !== excludeId && conn.open) conn.send(msg);
        }
    }

    sendToPeer(peerId, msg) {
        const conn = this.connections.get(peerId);
        if (conn && conn.open) conn.send(msg);
    }

    sendShoot(start, end, weaponId) {
        const payload = {
            type: 'shoot',
            id: this.isHost ? 'HOST' : (this.peer ? this.peer.id : 'LOCAL'),
            start: { x: start.x, y: start.y, z: start.z },
            end: { x: end.x, y: end.y, z: end.z },
            weapon: weaponId
        };
        if (this.isHost) {
            this.broadcast(payload);
        } else if (this.isClient && this.hostConn && this.hostConn.open) {
            this.hostConn.send(payload);
        }
    }

    sendHitClaim(targetId, dmg, weaponId, isHeadshot) {
        if (this.isClient && this.hostConn && this.hostConn.open) {
            this.hostConn.send({
                type: 'hit',
                targetId,
                dmg,
                attacker: this.game.player.name,
                weapon: weaponId,
                isHeadshot
            });
        }
    }

    sendChat(text) {
        const msg = {
            type: 'chat',
            sender: this.game.player.name,
            text
        };
        if (this.isHost) {
            this.broadcast(msg);
        } else if (this.isClient && this.hostConn && this.hostConn.open) {
            this.hostConn.send(msg);
        }
    }

    cleanup() {
        if (this.peer) {
            try { this.peer.destroy(); } catch (e) {}
        }
        this.peer = null;
        this.connections.clear();
        this.hostConn = null;
        this.isHost = false;
        this.isClient = false;
    }
}

window.NetworkManager = NetworkManager;
