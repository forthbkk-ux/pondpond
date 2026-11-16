// Core 3D Counter-Strike Engine (Realistic PBR Lighting + Host-Authoritative Score & Multiplayer Sync)

class CSGame {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.radarCanvas = document.getElementById('radar-canvas');
        this.radarCtx = this.radarCanvas.getContext('2d');

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x8a9ba8);
        this.scene.fog = new THREE.FogExp2(0xb5aa96, 0.0082);

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 260);
        this.scene.add(this.camera);

        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, powerPreference: 'high-performance' });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        if (THREE.ACESFilmicToneMapping !== undefined) {
            this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
            this.renderer.toneMappingExposure = 1.04;
        }
        if (THREE.sRGBEncoding !== undefined) {
            this.renderer.outputEncoding = THREE.sRGBEncoding;
        }

        this.setupLights();
        this.map = new GameMap(this.scene);
        this.botAI = new BotAI(this);
        this.net = new NetworkManager(this);

        this.running = false;
        this.gameMode = 'classic'; // 'classic' or 'tdm'
        this.botCount = 8;
        this.mobileMode = ('ontouchstart' in window) || navigator.maxTouchPoints > 0 || window.innerWidth <= 900;
        this.autoFireMobile = false;
        this.lookSensitivity = 1.0;

        this.scores = { T: 0, CT: 0 };
        this.roundTime = 115;
        this.roundOver = false;

        this.bombState = {
            planted: false,
            site: null,
            x: 0,
            z: 0,
            timer: 35,
            beepTimer: 0,
            mesh: null
        };

        this.player = {
            name: 'Player_' + Math.floor(100 + Math.random() * 899),
            team: 'T',
            x: 0,
            y: 0,
            z: 36,
            vx: 0,
            vy: 0,
            vz: 0,
            yaw: 0,
            pitch: 0,
            hp: 100,
            armor: 100,
            money: 1600,
            kills: 0,
            deaths: 0,
            crouching: false,
            onGround: true,
            isScoped: false,
            slots: {
                1: 'ak47',
                2: 'pistol',
                3: 'knife',
                4: 'hegrenade'
            },
            currentSlot: 1,
            weaponId: 'ak47',
            ammo: {},
            reloading: false,
            reloadTimer: 0,
            fireCooldown: 0,
            recoilPitch: 0,
            bobTimer: 0,
            stepTimer: 0,
            bombActionProgress: 0
        };

        this.entities = [];
        this.tracers = [];
        this.grenades = [];
        this.particles = [];
        this.bulletDecals = [];

        this.keys = {};
        this.mouseDown = false;
        this.touchMove = { x: 0, y: 0 };
        this.touchFiring = false;
        this.holdingBombBtn = false;
        this.hudEditMode = false;
        this.selectedHudEl = null;
        this.hudLayout = {};
        this.spectateIndex = 0;
        this.spectateTarget = null;
        this.spectateThirdPerson = false;
        this.spectateOrbitAngle = 0;

        this.initAmmoForAll();
        this.equipSlot(1);
        this.setupInputs();
        this.setupUIEvents();
        this.setupHudLayoutEditor();
        this.loadHudLayout();
        this.applyMobileModeUI();

        this.lastTime = performance.now();
        requestAnimationFrame((t) => this.loop(t));
    }

    setupLights() {
        // Realistic atmospheric sky & ground bounce light + high-contrast directional sunlight
        const hemi = new THREE.HemisphereLight(0x8fa3b5, 0x6e604c, 0.48);
        hemi.position.set(0, 50, 0);
        this.scene.add(hemi);

        const ambient = new THREE.AmbientLight(0xe5dec9, 0.18);
        this.scene.add(ambient);

        const sun = new THREE.DirectionalLight(0xfff3db, 1.38);
        sun.position.set(38, 68, 28);
        sun.castShadow = true;
        sun.shadow.mapSize.width = 2048;
        sun.shadow.mapSize.height = 2048;
        sun.shadow.camera.near = 10;
        sun.shadow.camera.far = 170;
        sun.shadow.bias = -0.0005;
        const d = 52;
        sun.shadow.camera.left = -d;
        sun.shadow.camera.right = d;
        sun.shadow.camera.top = d;
        sun.shadow.camera.bottom = -d;
        this.scene.add(sun);
    }

    initAmmoForAll() {
        for (const key of Object.keys(WEAPONS)) {
            const w = WEAPONS[key];
            this.player.ammo[key] = {
                clip: w.clipSize,
                reserve: w.reserveMax
            };
        }
    }

    equipSlot(slotNum) {
        const wepId = this.player.slots[slotNum];
        if (!wepId || !WEAPONS[wepId]) return;
        if (slotNum === 4 && this.player.ammo.hegrenade.clip <= 0) return;

        this.player.currentSlot = slotNum;
        this.player.weaponId = wepId;
        this.player.reloading = false;
        this.setScope(false);

        if (this.weaponMesh) {
            this.camera.remove(this.weaponMesh);
        }
        this.weaponMesh = createWeaponViewModel(wepId);
        this.camera.add(this.weaponMesh);

        this.updateWeaponHUD();
    }

    setScope(scoped) {
        const wep = WEAPONS[this.player.weaponId];
        if (scoped && (!wep || !wep.canScope)) scoped = false;
        this.player.isScoped = scoped;
        this.camera.fov = scoped ? 22 : 75;
        this.camera.updateProjectionMatrix();

        const scopeEl = document.getElementById('scope-overlay');
        if (scopeEl) scopeEl.classList.toggle('hidden', !scoped);
        if (this.weaponMesh) this.weaponMesh.visible = !scoped;
    }

    startMatch() {
        const nameInput = document.getElementById('player-name-input').value.trim();
        if (nameInput) this.player.name = nameInput;

        this.gameMode = document.getElementById('game-mode-select').value;
        this.botCount = parseInt(document.getElementById('bot-count-select').value, 10) || 0;
        const diffSel = document.getElementById('bot-diff-select');
        if (diffSel) {
            this.botAI.setDifficulty(diffSel.value);
            this.updateBotDiffHUD();
        }

        document.getElementById('lobby-overlay').classList.add('hidden');
        document.getElementById('hud').classList.remove('hidden');
        this.applyMobileModeUI();

        this.running = true;
        this.scores = { T: 0, CT: 0 };
        this.player.kills = 0;
        this.player.deaths = 0;
        this.player.money = this.gameMode === 'tdm' ? 50000 : 1000;
        this.player.slots[1] = this.player.team === 'T' ? 'ak47' : 'm4a1';
        this.initAmmoForAll();

        if (!this.net.isClient) {
            this.setupBots();
            this.startNewRound();
        } else {
            this.respawnLocalPlayer();
        }

        if (!this.mobileMode && this.canvas.requestPointerLock) {
            this.canvas.requestPointerLock();
        }

        window.soundFX.init();
        this.addChatMessage(`🎮 ยินดีต้อนรับสู่ Counter-Strike Online! (${this.gameMode === 'tdm' ? 'Team Deathmatch' : 'Bomb Defusal'})`, '#fbbf24');
    }

    setupBots() {
        this.entities = this.entities.filter(e => {
            if (e.isBot) {
                if (e.mesh) this.scene.remove(e.mesh);
                return false;
            }
            return true;
        });

        const tNames = ['Bot_Phoenix', 'Bot_Leet', 'Bot_Viper', 'Bot_Razor', 'Bot_Kobra'];
        const ctNames = ['Bot_Maverick', 'Bot_SAS', 'Bot_Ghost', 'Bot_Falcon', 'Bot_Wolf'];
        const tLoadouts = ['ak47', 'galil', 'sg553', 'p90', 'sawedoff', 'awp', 'negev'];
        const ctLoadouts = ['m4a1', 'm4a4', 'aug', 'mp5', 'spas12', 'awp', 'm249'];

        for (let i = 0; i < this.botCount; i++) {
            const team = (i % 2 === 0) ? (this.player.team === 'T' ? 'CT' : 'T') : this.player.team;
            const spawnList = this.map.spawns[team];
            const sp = spawnList[(i + 1) % spawnList.length];
            const namePool = team === 'T' ? tNames : ctNames;
            const botName = namePool[i % namePool.length];
            const wepPool = team === 'T' ? tLoadouts : ctLoadouts;
            const botWep = wepPool[i % wepPool.length];

            const mesh = createCharacterMesh(team, botName, team === this.player.team);
            mesh.position.set(sp.x, 0, sp.z);
            this.scene.add(mesh);

            this.entities.push({
                id: 'BOT_' + i,
                name: botName,
                team,
                isBot: true,
                x: sp.x,
                y: 0,
                z: sp.z,
                yaw: sp.yaw,
                hp: 100,
                weapon: botWep,
                kills: 0,
                deaths: 0,
                mesh,
                radarVisible: false
            });
        }
    }

    startNewRound() {
        this.roundOver = false;
        this.roundTime = this.gameMode === 'tdm' ? 300 : 115;
        this.clearPlantedBomb();

        this.respawnLocalPlayer();

        this.entities.forEach((ent, idx) => {
            const spList = this.map.spawns[ent.team];
            const sp = spList[(idx + 1) % spList.length];
            ent.x = sp.x + (Math.random() - 0.5) * 1.5;
            ent.y = 0;
            ent.z = sp.z + (Math.random() - 0.5) * 1.5;
            ent.yaw = sp.yaw;
            ent.hp = 100;
            ent.targetWP = null;
            if (ent.mesh) {
                ent.mesh.visible = true;
                ent.mesh.position.set(ent.x, ent.y, ent.z);
            }
        });

        this.showAnnouncement('🔥 เริ่มรอบใหม่! เตรียมอาวุธให้พร้อม', 2.5);
        this.updateScoreHUD();
        this.refreshScoreboardIfOpen();

        if (this.net.isHost) {
            this.net.broadcast({
                type: 'round_reset',
                scores: this.scores,
                roundTime: this.roundTime
            });
        }
    }

    onClientRoundReset(data) {
        this.roundOver = false;
        this.scores = data.scores;
        this.roundTime = data.roundTime;
        this.clearPlantedBomb();
        this.respawnLocalPlayer();
        this.showAnnouncement('🔥 เริ่มรอบใหม่!', 2.2);
        this.updateScoreHUD();
        this.refreshScoreboardIfOpen();
    }

    onClientRoundEnd(data) {
        this.roundOver = true;
        this.scores = data.scores;
        this.updateScoreHUD();
        this.refreshScoreboardIfOpen();
        const won = this.player.team === data.winnerTeam;
        this.player.money = Math.min(16000, this.player.money + (won ? 3250 : 1900));
        this.updateVitalsHUD();
        window.soundFX.playRoundEnd(won);
        this.showAnnouncement(data.reasonText, 4.0);
    }

    respawnLocalPlayer() {
        this.spectateTarget = null;
        const specBar = document.getElementById('spectator-bar');
        if (specBar) specBar.classList.add('hidden');
        for (const e of this.entities) {
            if (e.mesh) e.mesh.visible = (e.hp > 0);
        }

        const spList = this.map.spawns[this.player.team];
        const sp = spList[Math.floor(Math.random() * spList.length)];
        this.player.x = sp.x + (Math.random() - 0.5) * 1.2;
        this.player.y = 0;
        this.player.z = sp.z + (Math.random() - 0.5) * 1.2;
        this.player.vx = 0;
        this.player.vy = 0;
        this.player.vz = 0;
        this.player.yaw = sp.yaw;
        this.player.pitch = 0;
        this.player.hp = 100;
        this.player.armor = 100;
        this.player.reloading = false;

        for (const k of Object.keys(this.player.ammo)) {
            this.player.ammo[k].clip = WEAPONS[k].clipSize;
            this.player.ammo[k].reserve = WEAPONS[k].reserveMax;
        }
        this.equipSlot(this.player.slots[1] ? 1 : 2);
        this.updateVitalsHUD();
        this.updateScoreHUD();
        this.refreshScoreboardIfOpen();
    }

    shoot() {
        if (!this.running || this.player.hp <= 0 || this.player.reloading) return;
        if (this.player.fireCooldown > 0) return;

        const wep = WEAPONS[this.player.weaponId];
        const ammoObj = this.player.ammo[wep.id];

        if (wep.id === 'hegrenade') {
            if (ammoObj.clip <= 0 && ammoObj.reserve <= 0) return;
            if (ammoObj.clip > 0) ammoObj.clip--;
            else ammoObj.reserve--;
            if (ammoObj.clip <= 0 && ammoObj.reserve > 0) {
                ammoObj.clip = 1;
                ammoObj.reserve--;
            }
            this.player.fireCooldown = wep.fireRate;
            this.throwGrenade();
            this.updateWeaponHUD();
            if (ammoObj.clip <= 0 && ammoObj.reserve <= 0) {
                setTimeout(() => {
                    if (this.player.weaponId === 'hegrenade') this.equipSlot(1);
                }, 350);
            }
            return;
        }

        if (wep.id !== 'knife') {
            if (ammoObj.clip <= 0) {
                this.reload();
                return;
            }
            ammoObj.clip--;
        }

        this.player.fireCooldown = wep.fireRate;
        window.soundFX.playShoot(wep.id, 1.0);
        this.updateWeaponHUD();

        // Viewmodel recoil kick, Muzzle Flash + Dynamic Light + Ejecting Brass Shell
        if (this.weaponMesh) {
            this.weaponMesh.position.z += 0.065;
            this.weaponMesh.rotation.x += 0.085;
            const flash = this.weaponMesh.getObjectByName('muzzleFlash');
            if (flash) {
                flash.visible = true;
                flash.rotation.z = Math.random() * Math.PI * 2;
                clearTimeout(this.flashTimeout);
                this.flashTimeout = setTimeout(() => { flash.visible = false; }, 50);
            }
        }
        if (wep.id !== 'knife') {
            this.spawnShellCasing();
        }

        const pellets = wep.pellets || 1;
        const eyeHeight = this.player.crouching ? 1.05 : 1.62;
        const origin = new THREE.Vector3(this.player.x, this.player.y + eyeHeight, this.player.z);

        for (let p = 0; p < pellets; p++) {
            let spreadAmount = wep.spread;
            if (wep.canScope && !this.player.isScoped) spreadAmount = wep.unscopedSpread;
            if (this.player.crouching) spreadAmount *= 0.6;

            const dir = new THREE.Vector3(0, 0, -1);
            dir.applyEuler(new THREE.Euler(
                this.player.pitch + this.player.recoilPitch + (Math.random() - 0.5) * spreadAmount,
                this.player.yaw + (Math.random() - 0.5) * spreadAmount,
                0,
                'YXZ'
            ));
            dir.normalize();

            const ray = new THREE.Raycaster(origin, dir, 0.1, wep.range);

            const wallHits = ray.intersectObjects(this.map.shootableMeshes, false);
            let maxDist = wep.range;
            let endPoint = origin.clone().add(dir.clone().multiplyScalar(wep.range));

            if (wallHits.length > 0) {
                maxDist = wallHits[0].distance;
                endPoint = wallHits[0].point;
            }

            const enemyMeshes = [];
            for (const ent of this.entities) {
                if (ent.hp > 0 && ent.mesh && ent.team !== this.player.team) {
                    ent.mesh.traverse(child => {
                        if (child.isMesh) {
                            child.userData.ownerEntity = ent;
                            enemyMeshes.push(child);
                        }
                    });
                }
            }

            const charHits = ray.intersectObjects(enemyMeshes, false);
            if (charHits.length > 0 && charHits[0].distance < maxDist) {
                const hit = charHits[0];
                endPoint = hit.point;
                const targetEnt = hit.object.userData.ownerEntity;
                const part = hit.object.userData.part || 'body';
                const isHeadshot = part === 'head';

                let dmg = wep.damage;
                if (isHeadshot) dmg = Math.round(dmg * wep.headshotMult);
                else if (part === 'leg') dmg = Math.round(dmg * 0.75);

                this.triggerHitmarker(isHeadshot);
                this.spawnImpactSparks(hit.point, 0xdc2626, 3.4);

                if (this.net.isClient) {
                    this.net.sendHitClaim(targetEnt.id, dmg, wep.id, isHeadshot);
                } else {
                    this.damageEntity(targetEnt, dmg, this.player.name, wep.id, isHeadshot, this.player);
                }
            } else if (wallHits.length > 0 && wep.id !== 'knife') {
                this.spawnImpactSparks(endPoint, 0xfbbf24, 2.6);
                if (wallHits[0].face) {
                    this.spawnBulletDecal(endPoint, wallHits[0].face.normal);
                }
            }

            if (wep.id !== 'knife') {
                const gunMuzzle = origin.clone().add(new THREE.Vector3(0, -0.08, 0));
                this.spawnBulletTracer(gunMuzzle, endPoint);
                this.net.sendShoot(gunMuzzle, endPoint, wep.id);
            }
        }

        this.player.recoilPitch = Math.min(0.18, this.player.recoilPitch + wep.recoil);

        if (wep.id === 'awp' && this.player.isScoped) {
            this.setScope(false);
        }
    }

    reload() {
        const wep = WEAPONS[this.player.weaponId];
        if (!wep || wep.id === 'knife' || wep.id === 'hegrenade') return;

        const ammoObj = this.player.ammo[wep.id];
        if (this.player.reloading || ammoObj.clip >= wep.clipSize || ammoObj.reserve <= 0) return;

        this.player.reloading = true;
        this.player.reloadTimer = wep.reloadTime;
        this.setScope(false);
        window.soundFX.playReload();
        this.updateWeaponHUD();
    }

    throwGrenade() {
        const eyeHeight = this.player.crouching ? 1.05 : 1.62;
        const pos = new THREE.Vector3(this.player.x, this.player.y + eyeHeight, this.player.z);
        const dir = new THREE.Vector3(0, 0, -1).applyEuler(new THREE.Euler(this.player.pitch, this.player.yaw, 0, 'YXZ'));

        const geo = new THREE.SphereGeometry(0.14, 12, 12);
        const mat = new THREE.MeshStandardMaterial({ color: 0x365314, roughness: 0.4 });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.copy(pos);
        this.scene.add(mesh);

        this.grenades.push({
            mesh,
            vel: dir.multiplyScalar(18).add(new THREE.Vector3(0, 4.5, 0)),
            timer: 1.7,
            owner: this.player
        });
    }

    explodeGrenade(g) {
        const pos = g.mesh.position.clone();
        this.scene.remove(g.mesh);
        window.soundFX.playExplosion();

        for (let i = 0; i < 28; i++) {
            this.spawnImpactSparks(pos, i % 2 === 0 ? 0xf97316 : 0xfacc15, 7.0);
        }

        const radius = 11.0;
        for (const ent of this.entities) {
            if (ent.hp > 0 && ent.team !== this.player.team) {
                const dist = Math.hypot(ent.x - pos.x, ent.z - pos.z);
                if (dist < radius) {
                    const dmg = Math.round(98 * (1 - dist / radius));
                    if (this.net.isClient) {
                        this.net.sendHitClaim(ent.id, dmg, 'hegrenade', false);
                    } else {
                        this.damageEntity(ent, dmg, this.player.name, 'hegrenade', false, this.player);
                    }
                }
            }
        }
    }

    // ==================== HOST-AUTHORITATIVE DAMAGE & KILL TRACKING ====================
    damageEntity(ent, dmg, attackerName, weaponId, isHeadshot, attackerObj = null) {
        if (ent.hp <= 0) return;
        ent.hp = Math.max(0, ent.hp - dmg);

        // If target is a remote client connected to Host, send authoritative HP & damage flash
        if (this.net.isHost && !ent.isBot) {
            this.net.sendToPeer(ent.id, {
                type: 'damage_you',
                dmg,
                newHp: ent.hp,
                attacker: attackerName,
                weapon: weaponId,
                isHeadshot
            });
        }

        if (ent.hp <= 0) {
            ent.deaths = (ent.deaths || 0) + 1;
            if (ent.mesh) ent.mesh.visible = false;

            let killerId = 'BOT';
            let killerTeam = ent.team === 'T' ? 'CT' : 'T';

            if (attackerObj) {
                attackerObj.kills = (attackerObj.kills || 0) + 1;
                killerTeam = attackerObj.team || killerTeam;
                if (attackerObj === this.player) {
                    killerId = 'HOST';
                    this.player.money = Math.min(16000, this.player.money + 300);
                    this.updateVitalsHUD();
                } else {
                    killerId = attackerObj.id;
                }
            }

            // Update Team Score immediately on kill in TDM (or track round wins in Classic)
            if (this.gameMode === 'tdm') {
                this.scores[killerTeam] = (this.scores[killerTeam] || 0) + 1;
            }

            this.addKillfeed(attackerName, ent.name, weaponId, isHeadshot);
            this.updateScoreHUD();
            this.refreshScoreboardIfOpen();

            if (this.net.isHost) {
                this.net.broadcast({
                    type: 'kill_event',
                    killerId,
                    killerName: attackerName,
                    killerKills: attackerObj ? attackerObj.kills : 0,
                    victimId: ent.id,
                    victimName: ent.name,
                    victimDeaths: ent.deaths,
                    weapon: weaponId,
                    isHeadshot,
                    scores: this.scores
                });
            }

            if (this.gameMode === 'tdm') {
                setTimeout(() => {
                    if (!this.running) return;
                    const spList = this.map.spawns[ent.team];
                    const sp = spList[Math.floor(Math.random() * spList.length)];
                    ent.x = sp.x;
                    ent.y = 0;
                    ent.z = sp.z;
                    ent.hp = 100;
                    if (ent.mesh) {
                        ent.mesh.visible = true;
                        ent.mesh.position.set(ent.x, ent.y, ent.z);
                    }
                    if (this.net.isHost && !ent.isBot) {
                        this.net.sendToPeer(ent.id, { type: 'respawn_you' });
                    }
                    this.updateScoreHUD();
                    this.refreshScoreboardIfOpen();
                }, 3000);
            } else {
                this.checkRoundWinCondition();
            }
        }
    }

    damageLocalPlayer(dmg, attackerName, weaponId, isHeadshot, attackerObj = null) {
        if (this.player.hp <= 0) return;

        let actualDmg = dmg;
        if (this.player.armor > 0) {
            const absorbed = Math.min(this.player.armor, Math.round(dmg * 0.35));
            this.player.armor -= absorbed;
            actualDmg = dmg - absorbed;
        }

        this.player.hp = Math.max(0, this.player.hp - actualDmg);
        this.updateVitalsHUD();

        const flash = document.getElementById('damage-flash');
        if (flash) {
            flash.style.opacity = '1';
            setTimeout(() => { flash.style.opacity = '0'; }, 180);
        }

        if (this.player.hp <= 0) {
            this.player.deaths++;
            this.setScope(false);

            let killerId = 'BOT';
            let killerTeam = this.player.team === 'T' ? 'CT' : 'T';

            if (attackerObj) {
                attackerObj.kills = (attackerObj.kills || 0) + 1;
                killerId = attackerObj.id || 'BOT';
                killerTeam = attackerObj.team || killerTeam;
            }

            if (this.gameMode === 'tdm') {
                this.scores[killerTeam] = (this.scores[killerTeam] || 0) + 1;
            }

            this.addKillfeed(attackerName, this.player.name, weaponId, isHeadshot);
            this.showAnnouncement(`💀 คุณถูกสังหารโดย ${attackerName}!`, 2.5);
            this.updateScoreHUD();
            this.refreshScoreboardIfOpen();

            if (this.net.isHost) {
                this.net.broadcast({
                    type: 'kill_event',
                    killerId,
                    killerName: attackerName,
                    killerKills: attackerObj ? attackerObj.kills : 0,
                    victimId: 'HOST',
                    victimName: this.player.name,
                    victimDeaths: this.player.deaths,
                    weapon: weaponId,
                    isHeadshot,
                    scores: this.scores
                });
            }

            if (this.gameMode === 'tdm') {
                setTimeout(() => this.respawnLocalPlayer(), 3000);
            } else if (!this.net.isClient) {
                this.checkRoundWinCondition();
            }
        }
    }

    onClientDamagedByHost(data) {
        if (this.player.hp <= 0) return;
        this.player.hp = Math.max(0, data.newHp !== undefined ? data.newHp : (this.player.hp - data.dmg));
        this.updateVitalsHUD();

        const flash = document.getElementById('damage-flash');
        if (flash) {
            flash.style.opacity = '1';
            setTimeout(() => { flash.style.opacity = '0'; }, 180);
        }

        if (this.player.hp <= 0) {
            this.setScope(false);
            this.showAnnouncement(`💀 คุณถูกสังหารโดย ${data.attacker}!`, 2.5);
        }
    }

    onClientKillEvent(data) {
        const myId = this.net.peer ? this.net.peer.id : '';
        if (data.scores) {
            this.scores = data.scores;
        }
        if (data.killerId === myId) {
            if (data.killerKills !== undefined) this.player.kills = data.killerKills;
            else this.player.kills++;
            this.player.money = Math.min(16000, this.player.money + 300);
            this.updateVitalsHUD();
        } else {
            const kEnt = this.entities.find(e => e.id === data.killerId);
            if (kEnt && data.killerKills !== undefined) kEnt.kills = data.killerKills;
        }

        if (data.victimId === myId) {
            if (data.victimDeaths !== undefined) this.player.deaths = data.victimDeaths;
            else this.player.deaths++;
        } else {
            const vEnt = this.entities.find(e => e.id === data.victimId);
            if (vEnt && data.victimDeaths !== undefined) vEnt.deaths = data.victimDeaths;
        }

        this.addKillfeed(data.killerName, data.victimName, data.weapon, data.isHeadshot);
        this.updateScoreHUD();
        this.refreshScoreboardIfOpen();
    }

    checkRoundWinCondition() {
        if (this.roundOver || this.gameMode === 'tdm') return;

        let tAlive = (this.player.team === 'T' && this.player.hp > 0) ? 1 : 0;
        let ctAlive = (this.player.team === 'CT' && this.player.hp > 0) ? 1 : 0;

        for (const ent of this.entities) {
            if (ent.hp > 0) {
                if (ent.team === 'T') tAlive++;
                else ctAlive++;
            }
        }

        if (tAlive === 0 && !this.bombState.planted) {
            this.endRound('CT', '🛡️ COUNTER-TERRORISTS WIN! (กวาดล้างผู้ก่อการร้ายสำเร็จ)');
        } else if (ctAlive === 0) {
            this.endRound('T', '💣 TERRORISTS WIN! (กวาดล้างหน่วยต่อต้านสำเร็จ)');
        }
    }

    endRound(winnerTeam, reasonText) {
        if (this.roundOver) return;
        this.roundOver = true;
        this.scores[winnerTeam]++;
        this.updateScoreHUD();
        this.refreshScoreboardIfOpen();

        const won = this.player.team === winnerTeam;
        this.player.money = Math.min(16000, this.player.money + (won ? 3250 : 1900));
        this.updateVitalsHUD();

        window.soundFX.playRoundEnd(won);
        this.showAnnouncement(reasonText, 4.0);

        if (this.net.isHost) {
            this.net.broadcast({
                type: 'round_end',
                winnerTeam,
                reasonText,
                scores: this.scores
            });
        }

        setTimeout(() => {
            if (this.running && !this.net.isClient) {
                this.startNewRound();
            }
        }, 4200);
    }

    // ==================== C4 BOMB SYSTEM ====================
    plantBombAt(x, z, site, planterName) {
        if (this.bombState.planted) return;
        this.bombState.planted = true;
        this.bombState.site = site;
        this.bombState.x = x;
        this.bombState.z = z;
        this.bombState.timer = 35;
        this.bombState.beepTimer = 0.8;

        const c4Group = new THREE.Group();
        const pack = new THREE.Mesh(
            new THREE.BoxGeometry(0.45, 0.16, 0.32),
            new THREE.MeshStandardMaterial({ color: 0x3f6212, roughness: 0.7 })
        );
        const led = new THREE.Mesh(
            new THREE.SphereGeometry(0.05, 8, 8),
            new THREE.MeshBasicMaterial({ color: 0xef4444 })
        );
        led.position.set(0, 0.1, 0);
        c4Group.add(pack, led);
        c4Group.position.set(x, 0.08, z);
        this.scene.add(c4Group);
        this.bombState.mesh = c4Group;

        window.soundFX.playBombBeep(true);
        this.showAnnouncement(`🚨 วางระเบิด C4 แล้วที่จุด ${site} โดย ${planterName}! (35 วินาที)`, 3.5);
        document.getElementById('round-timer').classList.add('bomb-planted');
    }

    onBombDefused(defuserName) {
        if (!this.bombState.planted || this.roundOver) return;
        this.clearPlantedBomb();
        this.endRound('CT', `🔧 กู้ระเบิดสำเร็จโดย ${defuserName}! COUNTER-TERRORISTS WIN!`);
    }

    clearPlantedBomb() {
        if (this.bombState.mesh) {
            this.scene.remove(this.bombState.mesh);
            this.bombState.mesh = null;
        }
        this.bombState.planted = false;
        this.player.bombActionProgress = 0;
        document.getElementById('round-timer').classList.remove('bomb-planted');
        document.getElementById('bomb-progress-box').classList.add('hidden');
    }

    // ==================== REALISTIC VISUAL EFFECTS ====================
    spawnBulletTracer(start, end) {
        const mat = new THREE.LineBasicMaterial({ color: 0xfef08a, transparent: true, opacity: 0.9 });
        const geo = new THREE.BufferGeometry().setFromPoints([start, end]);
        const line = new THREE.Line(geo, mat);
        this.scene.add(line);
        this.tracers.push({ line, timer: 0.065 });
    }

    spawnShellCasing() {
        const eyeH = this.player.crouching ? 1.05 : 1.62;
        const pos = new THREE.Vector3(this.player.x, this.player.y + eyeH - 0.12, this.player.z);
        const right = new THREE.Vector3(1, 0, 0).applyEuler(new THREE.Euler(0, this.player.yaw, 0));
        const forward = new THREE.Vector3(0, 0, -1).applyEuler(new THREE.Euler(this.player.pitch, this.player.yaw, 0, 'YXZ'));

        pos.addScaledVector(right, 0.22).addScaledVector(forward, 0.35);

        const geo = new THREE.CylinderGeometry(0.008, 0.008, 0.032, 6);
        const mat = new THREE.MeshStandardMaterial({ color: 0xfbbf24, metalness: 0.9, roughness: 0.2 });
        const shell = new THREE.Mesh(geo, mat);
        shell.position.copy(pos);
        shell.rotation.set(Math.random() * 3, Math.random() * 3, Math.random() * 3);
        this.scene.add(shell);

        this.particles.push({
            mesh: shell,
            vel: right.multiplyScalar(2.2 + Math.random()).add(new THREE.Vector3(0, 1.8 + Math.random(), 0)),
            timer: 0.65
        });
    }

    spawnBulletDecal(point, normal) {
        const geo = new THREE.CircleGeometry(0.055, 8);
        const mat = new THREE.MeshBasicMaterial({ color: 0x1c1917, transparent: true, opacity: 0.82, depthWrite: false });
        const decal = new THREE.Mesh(geo, mat);
        decal.position.copy(point).addScaledVector(normal, 0.015);
        decal.lookAt(point.clone().add(normal));
        this.scene.add(decal);

        this.bulletDecals.push(decal);
        if (this.bulletDecals.length > 45) {
            const old = this.bulletDecals.shift();
            this.scene.remove(old);
        }
    }

    spawnImpactSparks(point, colorHex, speedScale = 2.8) {
        for (let i = 0; i < 6; i++) {
            const geo = new THREE.BoxGeometry(0.055, 0.055, 0.055);
            const mat = new THREE.MeshBasicMaterial({ color: colorHex });
            const spark = new THREE.Mesh(geo, mat);
            spark.position.copy(point);
            this.scene.add(spark);
            this.particles.push({
                mesh: spark,
                vel: new THREE.Vector3(
                    (Math.random() - 0.5) * speedScale,
                    Math.random() * speedScale,
                    (Math.random() - 0.5) * speedScale
                ),
                timer: 0.25 + Math.random() * 0.15
            });
        }
    }

    triggerHitmarker(isHeadshot) {
        window.soundFX.playHit(isHeadshot);
        const hm = document.getElementById('hitmarker');
        if (!hm) return;
        hm.classList.toggle('headshot', isHeadshot);
        hm.style.opacity = '1';
        clearTimeout(this.hmTimeout);
        this.hmTimeout = setTimeout(() => { hm.style.opacity = '0'; }, 140);
    }

    // ==================== COLLISION & PHYSICS ====================
    checkWallCollision(x, y, z, radius = 0.42, height = 1.7) {
        for (const c of this.map.colliders) {
            if (y + height > c.minY && y < c.maxY - 0.1) {
                if (x + radius > c.minX && x - radius < c.maxX &&
                    z + radius > c.minZ && z - radius < c.maxZ) {
                    return c;
                }
            }
        }
        return null;
    }

    getFloorHeight(x, y, z, radius = 0.4) {
        let highest = 0;
        for (const c of this.map.colliders) {
            if (x + radius > c.minX && x - radius < c.maxX &&
                z + radius > c.minZ && z - radius < c.maxZ) {
                if (y >= c.maxY - 0.35 && c.maxY > highest) {
                    highest = c.maxY;
                }
            }
        }
        return highest;
    }

    // ==================== GAME LOOP ====================
    loop(now) {
        const dt = Math.min(0.1, (now - this.lastTime) / 1000);
        this.lastTime = now;

        if (this.running) {
            this.updatePlayer(dt);
            if (!this.net.isClient) {
                this.botAI.update(dt);
                this.updateRoundAndBomb(dt);
            }
            this.updateEffects(dt);
            this.net.update(dt);
            this.map.drawRadar(this.radarCtx, 130, 130, this.player, this.entities, this.bombState);
        }

        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame((t) => this.loop(t));
    }

    updatePlayer(dt) {
        const p = this.player;
        if (p.hp <= 0) {
            this.updateSpectator(dt);
            return;
        }

        if (p.fireCooldown > 0) p.fireCooldown -= dt;
        if (p.recoilPitch > 0) p.recoilPitch = Math.max(0, p.recoilPitch - dt * 0.25);

        if (p.reloading) {
            p.reloadTimer -= dt;
            if (this.weaponMesh) {
                this.weaponMesh.rotation.x = -0.45;
            }
            if (p.reloadTimer <= 0) {
                p.reloading = false;
                const wep = WEAPONS[p.weaponId];
                const ammoObj = p.ammo[wep.id];
                const needed = wep.clipSize - ammoObj.clip;
                const take = Math.min(needed, ammoObj.reserve);
                ammoObj.clip += take;
                ammoObj.reserve -= take;
                if (this.weaponMesh) this.weaponMesh.rotation.x = 0;
                this.updateWeaponHUD();
            }
        }

        const wep = WEAPONS[p.weaponId];
        if (this.mouseDown || this.touchFiring) {
            if (wep.auto || p.fireCooldown <= 0) {
                this.shoot();
            }
        } else if (this.mobileMode && this.autoFireMobile && !p.reloading) {
            this.checkMobileAutoFire();
        }

        let moveForward = 0;
        let moveRight = 0;

        if (this.keys['KeyW'] || this.keys['ArrowUp']) moveForward += 1;
        if (this.keys['KeyS'] || this.keys['ArrowDown']) moveForward -= 1;
        if (this.keys['KeyD'] || this.keys['ArrowRight']) moveRight += 1;
        if (this.keys['KeyA'] || this.keys['ArrowLeft']) moveRight -= 1;

        moveForward += this.touchMove.y;
        moveRight += this.touchMove.x;

        const len = Math.hypot(moveForward, moveRight);
        if (len > 1) {
            moveForward /= len;
            moveRight /= len;
        }

        const baseSpeed = 7.4 * (wep ? wep.moveSpeed : 1.0) * (p.crouching ? 0.58 : 1.0);
        const sin = Math.sin(p.yaw);
        const cos = Math.cos(p.yaw);

        const wishX = (-sin * moveForward + cos * moveRight) * baseSpeed;
        const wishZ = (-cos * moveForward - sin * moveRight) * baseSpeed;

        const nextX = p.x + wishX * dt;
        if (!this.checkWallCollision(nextX, p.y, p.z)) {
            p.x = nextX;
        }
        const nextZ = p.z + wishZ * dt;
        if (!this.checkWallCollision(p.x, p.y, nextZ)) {
            p.z = nextZ;
        }

        p.vy -= 22.0 * dt;
        p.y += p.vy * dt;
        const floorY = this.getFloorHeight(p.x, p.y, p.z);
        if (p.y <= floorY) {
            p.y = floorY;
            p.vy = 0;
            p.onGround = true;
        } else {
            p.onGround = false;
        }

        const movingSpeed = Math.hypot(wishX, wishZ);
        if (movingSpeed > 1.2 && p.onGround) {
            p.bobTimer += dt * 10;
            p.stepTimer -= dt;
            if (p.stepTimer <= 0) {
                window.soundFX.playFootstep();
                p.stepTimer = 0.36;
            }
        }

        const eyeH = p.crouching ? 1.05 : 1.62;
        this.camera.position.set(p.x, p.y + eyeH, p.z);
        this.camera.rotation.order = 'YXZ';
        this.camera.rotation.y = p.yaw;
        this.camera.rotation.x = Math.max(-1.45, Math.min(1.45, p.pitch + p.recoilPitch));

        if (this.weaponMesh && !p.reloading) {
            const bobX = Math.cos(p.bobTimer) * 0.012;
            const bobY = Math.abs(Math.sin(p.bobTimer)) * 0.012;
            this.weaponMesh.position.x = THREE.MathUtils.lerp(this.weaponMesh.position.x, 0.24 + bobX, dt * 10);
            this.weaponMesh.position.y = THREE.MathUtils.lerp(this.weaponMesh.position.y, -0.23 - bobY, dt * 10);
            this.weaponMesh.position.z = THREE.MathUtils.lerp(this.weaponMesh.position.z, -0.44, dt * 12);
            this.weaponMesh.rotation.x = THREE.MathUtils.lerp(this.weaponMesh.rotation.x, 0, dt * 12);
        }

        this.updateCrosshair(movingSpeed);
        this.updatePlayerBombInteraction(dt);
    }

    // ==================== SPECTATOR MODE (WATCH TEAMMATES WHEN DEAD) ====================
    getLivingTeammates() {
        return this.entities.filter(e => e.hp > 0 && e.team === this.player.team);
    }

    cycleSpectator(step = 1) {
        if (this.player.hp > 0) return;
        const allies = this.getLivingTeammates();
        if (allies.length === 0) {
            this.spectateTarget = null;
            return;
        }
        this.spectateIndex = (this.spectateIndex + step + allies.length) % allies.length;
        this.spectateTarget = allies[this.spectateIndex];
        window.soundFX.playReload();
    }

    toggleSpectateCameraMode() {
        if (this.player.hp > 0) return;
        this.spectateThirdPerson = !this.spectateThirdPerson;
        const camBtn = document.getElementById('btn-spectate-cam');
        if (camBtn) {
            camBtn.textContent = this.spectateThirdPerson ? '🎥 มุมมอง: บุคคลที่ 3' : '🎥 มุมมอง: บุคคลที่ 1';
        }
    }

    updateSpectator(dt) {
        const specBar = document.getElementById('spectator-bar');
        const specName = document.getElementById('spectator-target-name');
        if (specBar) specBar.classList.remove('hidden');

        // Restore visibility of all living entities before hiding the 1st-person spectated target
        for (const e of this.entities) {
            if (e.mesh) e.mesh.visible = (e.hp > 0);
        }

        const allies = this.getLivingTeammates();
        if (allies.length === 0) {
            this.spectateTarget = null;
            if (specName) specName.textContent = 'ไม่มีเพื่อนร่วมทีมที่ยังมีชีวิต (รอรอบใหม่...)';
            if (this.weaponMesh) this.weaponMesh.visible = false;

            // Smooth overview camera above map
            this.spectateOrbitAngle += dt * 0.25;
            const camX = Math.sin(this.spectateOrbitAngle) * 24;
            const camZ = Math.cos(this.spectateOrbitAngle) * 24;
            this.camera.position.set(camX, 18, camZ);
            this.camera.lookAt(0, 1.5, 0);
            return;
        }

        if (!this.spectateTarget || this.spectateTarget.hp <= 0 || this.spectateTarget.team !== this.player.team) {
            this.spectateIndex = this.spectateIndex % allies.length;
            this.spectateTarget = allies[this.spectateIndex];
        }

        const target = this.spectateTarget;
        const idx = allies.indexOf(target) + 1;
        if (specName) {
            specName.textContent = `${target.name} (${target.hp} HP) [${idx}/${allies.length}]`;
        }

        if (!this.spectateThirdPerson) {
            // First-Person Teammate POV
            if (target.mesh) target.mesh.visible = false;
            if (this.weaponMesh) this.weaponMesh.visible = true;

            this.camera.position.x = THREE.MathUtils.lerp(this.camera.position.x, target.x, dt * 16);
            this.camera.position.y = THREE.MathUtils.lerp(this.camera.position.y, target.y + 1.62, dt * 16);
            this.camera.position.z = THREE.MathUtils.lerp(this.camera.position.z, target.z, dt * 16);

            this.camera.rotation.order = 'YXZ';
            this.camera.rotation.y = target.yaw;
            this.camera.rotation.x = target.pitch || 0;
        } else {
            // Third-Person Follow Camera behind teammate
            if (target.mesh) target.mesh.visible = true;
            if (this.weaponMesh) this.weaponMesh.visible = false;

            const dist = 3.8;
            const desiredX = target.x + Math.sin(target.yaw) * dist;
            const desiredY = target.y + 2.3;
            const desiredZ = target.z + Math.cos(target.yaw) * dist;

            this.camera.position.x = THREE.MathUtils.lerp(this.camera.position.x, desiredX, dt * 12);
            this.camera.position.y = THREE.MathUtils.lerp(this.camera.position.y, desiredY, dt * 12);
            this.camera.position.z = THREE.MathUtils.lerp(this.camera.position.z, desiredZ, dt * 12);
            this.camera.lookAt(target.x, target.y + 1.4, target.z);
        }
    }

    checkMobileAutoFire() {
        const p = this.player;
        const eyeH = p.crouching ? 1.05 : 1.62;
        const origin = new THREE.Vector3(p.x, p.y + eyeH, p.z);
        const dir = new THREE.Vector3(0, 0, -1).applyEuler(new THREE.Euler(p.pitch, p.yaw, 0, 'YXZ'));

        const ray = new THREE.Raycaster(origin, dir, 0.2, 120);
        const wallHits = ray.intersectObjects(this.map.shootableMeshes, false);
        const wallDist = wallHits.length > 0 ? wallHits[0].distance : 120;

        const enemyMeshes = [];
        for (const ent of this.entities) {
            if (ent.hp > 0 && ent.mesh && ent.team !== p.team) {
                ent.mesh.traverse(c => { if (c.isMesh) enemyMeshes.push(c); });
            }
        }
        const hits = ray.intersectObjects(enemyMeshes, false);
        if (hits.length > 0 && hits[0].distance < wallDist) {
            this.shoot();
        }
    }

    updatePlayerBombInteraction(dt) {
        if (this.hudEditMode) return;
        const p = this.player;
        const bombBtn = document.getElementById('btn-bomb-action');
        const progBox = document.getElementById('bomb-progress-box');
        const progFill = document.getElementById('bomb-progress-fill');
        const progLabel = document.getElementById('bomb-progress-label');

        if (this.gameMode !== 'classic') {
            bombBtn.classList.add('hidden');
            progBox.classList.add('hidden');
            return;
        }

        const inSite = this.map.getInBombsite(p.x, p.z);
        const canPlant = (p.team === 'T' && !this.bombState.planted && inSite);
        const canDefuse = (p.team === 'CT' && this.bombState.planted &&
            Math.hypot(p.x - this.bombState.x, p.z - this.bombState.z) < 3.5);

        if (canPlant || canDefuse) {
            bombBtn.classList.remove('hidden');
            bombBtn.textContent = canPlant ? `💣 กดค้างวางระเบิด C4 (จุด ${inSite}) [E]` : `🔧 กดค้างกู้ระเบิด C4 [E]`;

            if (this.keys['KeyE'] || this.holdingBombBtn) {
                const duration = canPlant ? 3.0 : 4.0;
                p.bombActionProgress += dt;
                progBox.classList.remove('hidden');
                progLabel.textContent = canPlant ? `กำลังวางระเบิด C4 ที่จุด ${inSite}...` : `กำลังกู้ระเบิด C4...`;
                progFill.style.width = `${Math.min(100, (p.bombActionProgress / duration) * 100)}%`;

                if (p.bombActionProgress >= duration) {
                    p.bombActionProgress = 0;
                    progBox.classList.add('hidden');
                    if (canPlant) {
                        this.plantBombAt(p.x, p.z, inSite, p.name);
                        if (this.net.isClient && this.net.hostConn) {
                            this.net.hostConn.send({ type: 'bomb_plant', x: p.x, z: p.z, site: inSite, planter: p.name });
                        }
                    } else if (canDefuse) {
                        this.onBombDefused(p.name);
                        if (this.net.isClient && this.net.hostConn) {
                            this.net.hostConn.send({ type: 'bomb_defuse', defuser: p.name });
                        }
                    }
                }
            } else {
                p.bombActionProgress = 0;
                progBox.classList.add('hidden');
            }
        } else {
            p.bombActionProgress = 0;
            bombBtn.classList.add('hidden');
            progBox.classList.add('hidden');
        }
    }

    updateRoundAndBomb(dt) {
        if (this.roundOver) return;

        if (this.bombState.planted) {
            this.bombState.timer -= dt;
            this.bombState.beepTimer -= dt;

            if (this.bombState.beepTimer <= 0) {
                const urgent = this.bombState.timer < 10;
                window.soundFX.playBombBeep(urgent);
                this.bombState.beepTimer = Math.max(0.15, this.bombState.timer / 40);
            }

            this.roundTime = Math.max(0, this.bombState.timer);
            if (this.bombState.timer <= 0) {
                window.soundFX.playExplosion();
                this.clearPlantedBomb();
                this.endRound('T', '💥 ระเบิด C4 ทำงาน! TERRORISTS WIN!');
            }
        } else {
            this.roundTime -= dt;
            if (this.roundTime <= 0) {
                this.roundTime = 0;
                if (this.gameMode === 'tdm') {
                    this.startNewRound();
                } else {
                    this.endRound('CT', '⏱️ หมดเวลา! COUNTER-TERRORISTS WIN!');
                }
            }
        }

        this.updateTimerDisplay();
    }

    updateEffects(dt) {
        for (let i = this.tracers.length - 1; i >= 0; i--) {
            const t = this.tracers[i];
            t.timer -= dt;
            if (t.timer <= 0) {
                this.scene.remove(t.line);
                this.tracers.splice(i, 1);
            }
        }

        for (let i = this.particles.length - 1; i >= 0; i--) {
            const pt = this.particles[i];
            pt.timer -= dt;
            pt.vel.y -= 12 * dt;
            pt.mesh.position.addScaledVector(pt.vel, dt);
            pt.mesh.rotation.x += 5 * dt;
            if (pt.timer <= 0) {
                this.scene.remove(pt.mesh);
                this.particles.splice(i, 1);
            }
        }

        for (let i = this.grenades.length - 1; i >= 0; i--) {
            const g = this.grenades[i];
            g.timer -= dt;
            g.vel.y -= 18 * dt;

            const nextPos = g.mesh.position.clone().addScaledVector(g.vel, dt);
            if (nextPos.y < 0.15) {
                nextPos.y = 0.15;
                g.vel.y = -g.vel.y * 0.45;
                g.vel.x *= 0.75;
                g.vel.z *= 0.75;
            }
            if (this.checkWallCollision(nextPos.x, nextPos.y, nextPos.z, 0.15, 0.2)) {
                g.vel.x = -g.vel.x * 0.5;
                g.vel.z = -g.vel.z * 0.5;
            } else {
                g.mesh.position.copy(nextPos);
            }

            if (g.timer <= 0) {
                this.explodeGrenade(g);
                this.grenades.splice(i, 1);
            }
        }
    }

    // ==================== NETWORK SYNC CALLBACKS ====================
    onRemotePlayerJoined(peerId, name, team, weapon) {
        let existing = this.entities.find(e => e.id === peerId);
        if (!existing) {
            const sp = this.map.spawns[team][0];
            const mesh = createCharacterMesh(team, name, team === this.player.team);
            mesh.position.set(sp.x, 0, sp.z);
            this.scene.add(mesh);

            this.entities.push({
                id: peerId,
                name,
                team,
                isBot: false,
                isRemotePlayer: true,
                x: sp.x,
                y: 0,
                z: sp.z,
                yaw: sp.yaw,
                hp: 100,
                weapon: weapon || 'ak47',
                kills: 0,
                deaths: 0,
                mesh
            });
            this.updateScoreHUD();
            this.refreshScoreboardIfOpen();
        }
    }

    onRemotePlayerLeft(peerId) {
        const idx = this.entities.findIndex(e => e.id === peerId);
        if (idx !== -1) {
            const ent = this.entities[idx];
            if (ent.mesh) this.scene.remove(ent.mesh);
            this.addChatMessage(`👋 ${ent.name} ออกจากห้อง`, '#94a3b8');
            this.entities.splice(idx, 1);
            this.updateScoreHUD();
            this.refreshScoreboardIfOpen();
        }
    }

    updateRemotePlayerState(peerId, data) {
        let ent = this.entities.find(e => e.id === peerId);
        if (!ent) {
            this.onRemotePlayerJoined(peerId, data.name, data.team, data.weapon);
            ent = this.entities.find(e => e.id === peerId);
        }
        if (ent) {
            const moved = Math.hypot(data.x - ent.x, data.z - ent.z) > 0.02;
            ent.x = data.x;
            ent.y = data.y;
            ent.z = data.z;
            ent.yaw = data.yaw;
            ent.pitch = data.pitch || 0;
            ent.weapon = data.weapon;
            // Note: ent.hp, ent.kills, ent.deaths are Host-authoritative and NOT overwritten by Client state!
            if (ent.mesh) {
                const isSpectated1P = (this.player.hp <= 0 && this.spectateTarget === ent && !this.spectateThirdPerson);
                ent.mesh.visible = ent.hp > 0 && !isSpectated1P;
                ent.mesh.position.set(ent.x, ent.y, ent.z);
                ent.mesh.rotation.y = ent.yaw;
                if (window.animateCharacterWalk) {
                    window.animateCharacterWalk(ent.mesh, moved, 0.05);
                }
            }
        }
    }

    applyWorldSnapshot(snapshot) {
        this.scores = snapshot.scores;
        this.roundTime = snapshot.roundTime;
        this.updateTimerDisplay();
        this.updateScoreHUD();

        const myId = this.net.peer ? this.net.peer.id : '';
        const seenIds = new Set();

        for (const a of snapshot.actors) {
            if (a.id === myId) {
                // Sync Client's own authoritative Kills, Deaths & HP from Host!
                const changed = (this.player.kills !== a.kills || this.player.deaths !== a.deaths);
                this.player.kills = a.kills || 0;
                this.player.deaths = a.deaths || 0;
                if (changed) this.refreshScoreboardIfOpen();
                continue;
            }
            seenIds.add(a.id);

            let ent = this.entities.find(e => e.id === a.id);
            if (!ent) {
                const mesh = createCharacterMesh(a.team, a.name, a.team === this.player.team);
                this.scene.add(mesh);
                ent = {
                    id: a.id,
                    name: a.name,
                    team: a.team,
                    isBot: a.isBot,
                    isRemotePlayer: !a.isBot,
                    x: a.x,
                    y: a.y,
                    z: a.z,
                    yaw: a.yaw,
                    hp: a.hp,
                    weapon: a.weapon,
                    kills: a.kills || 0,
                    deaths: a.deaths || 0,
                    mesh
                };
                this.entities.push(ent);
                this.refreshScoreboardIfOpen();
            } else {
                const moved = Math.hypot(a.x - ent.x, a.z - ent.z) > 0.02;
                const scoreChanged = (ent.kills !== a.kills || ent.deaths !== a.deaths || ent.hp !== a.hp);
                ent.x = a.x;
                ent.y = a.y;
                ent.z = a.z;
                ent.yaw = a.yaw;
                ent.pitch = a.pitch || 0;
                ent.hp = a.hp;
                ent.kills = a.kills || 0;
                ent.deaths = a.deaths || 0;
                if (ent.mesh) {
                    const isSpectated1P = (this.player.hp <= 0 && this.spectateTarget === ent && !this.spectateThirdPerson);
                    ent.mesh.visible = ent.hp > 0 && !isSpectated1P;
                    ent.mesh.position.set(ent.x, ent.y, ent.z);
                    ent.mesh.rotation.y = ent.yaw;
                    if (window.animateCharacterWalk) {
                        window.animateCharacterWalk(ent.mesh, moved, 0.05);
                    }
                }
                if (scoreChanged) this.refreshScoreboardIfOpen();
            }
        }

        for (let i = this.entities.length - 1; i >= 0; i--) {
            if (!seenIds.has(this.entities[i].id)) {
                if (this.entities[i].mesh) this.scene.remove(this.entities[i].mesh);
                this.entities.splice(i, 1);
                this.refreshScoreboardIfOpen();
            }
        }
    }

    onRemoteShoot(peerId, data) {
        const s = new THREE.Vector3(data.start.x, data.start.y, data.start.z);
        const e = new THREE.Vector3(data.end.x, data.end.y, data.end.z);
        this.spawnBulletTracer(s, e);
        window.soundFX.playShoot(data.weapon || 'ak47', 0.45);
    }

    onRemoteHitClaim(peerId, data) {
        const attackerEnt = this.entities.find(e => e.id === peerId);
        if (data.targetId === 'HOST') {
            this.damageLocalPlayer(data.dmg, data.attacker, data.weapon, data.isHeadshot, attackerEnt);
        } else {
            const target = this.entities.find(e => e.id === data.targetId);
            if (target) {
                this.damageEntity(target, data.dmg, data.attacker, data.weapon, data.isHeadshot, attackerEnt);
            }
        }
    }

    // ==================== HUD & UI UPDATES ====================
    updateVitalsHUD() {
        if (this.gameMode === 'tdm') {
            this.player.money = 50000;
        }
        document.getElementById('hp-val').textContent = this.player.hp;
        document.getElementById('armor-val').textContent = this.player.armor;
        document.getElementById('money-val').textContent = `$${this.player.money}`;
        const buyMoney = document.getElementById('buy-money-val');
        if (buyMoney) buyMoney.textContent = `$${this.player.money}`;
    }

    updateWeaponHUD() {
        const wep = WEAPONS[this.player.weaponId];
        const ammoObj = this.player.ammo[wep.id];

        document.getElementById('hud-weapon-name').textContent = this.player.reloading ? `${wep.name} (กำลังรีโหลด...)` : wep.name;
        if (wep.id === 'knife') {
            document.getElementById('ammo-clip').textContent = '∞';
            document.getElementById('ammo-reserve').textContent = '';
        } else {
            document.getElementById('ammo-clip').textContent = ammoObj.clip;
            document.getElementById('ammo-reserve').textContent = `/ ${ammoObj.reserve}`;
        }

        for (let s = 1; s <= 4; s++) {
            const btn = document.getElementById(`slot-btn-${s}`);
            if (!btn) continue;
            btn.classList.toggle('active', this.player.currentSlot === s);
            const wId = this.player.slots[s];
            const label = btn.querySelector('.slot-name');
            if (label && wId && WEAPONS[wId]) {
                label.textContent = WEAPONS[wId].id.toUpperCase();
            }
        }
    }

    updateScoreHUD() {
        document.getElementById('score-t').textContent = this.scores.T;
        document.getElementById('score-ct').textContent = this.scores.CT;

        let tAlive = (this.player.team === 'T' && this.player.hp > 0) ? 1 : 0;
        let ctAlive = (this.player.team === 'CT' && this.player.hp > 0) ? 1 : 0;
        for (const e of this.entities) {
            if (e.hp > 0) {
                if (e.team === 'T') tAlive++;
                else ctAlive++;
            }
        }
        document.getElementById('alive-t').textContent = `T: ${tAlive}`;
        document.getElementById('alive-ct').textContent = `CT: ${ctAlive}`;
    }

    updateTimerDisplay() {
        const sec = Math.max(0, Math.ceil(this.roundTime));
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        document.getElementById('round-timer').textContent = `${m}:${s < 10 ? '0' : ''}${s}`;
        this.updateScoreHUD();
    }

    updateCrosshair(speed) {
        const offset = Math.min(10, Math.round(speed * 0.7 + this.player.recoilPitch * 45));
        document.querySelector('.ch-top').style.top = `${2 - offset}px`;
        document.querySelector('.ch-bottom').style.bottom = `${2 - offset}px`;
        document.querySelector('.ch-left').style.left = `${2 - offset}px`;
        document.querySelector('.ch-right').style.right = `${2 - offset}px`;
    }

    addKillfeed(killer, victim, weaponId, isHeadshot) {
        const feed = document.getElementById('killfeed');
        const div = document.createElement('div');
        div.className = 'kill-item';
        const hsIcon = isHeadshot ? ' 💀' : '';
        div.textContent = `${killer} [${weaponId.toUpperCase()}${hsIcon}] ${victim}`;
        feed.appendChild(div);
        setTimeout(() => {
            if (div.parentNode) div.parentNode.removeChild(div);
        }, 4500);
    }

    showAnnouncement(text, duration = 2.5) {
        const el = document.getElementById('center-announcement');
        el.textContent = text;
        el.classList.remove('hidden');
        clearTimeout(this.announceTimeout);
        this.announceTimeout = setTimeout(() => {
            el.classList.add('hidden');
        }, duration * 1000);
    }

    addChatMessage(text, color = '#e2e8f0') {
        const box = document.getElementById('chat-messages');
        const line = document.createElement('div');
        line.className = 'chat-line';
        line.style.color = color;
        line.textContent = text;
        box.appendChild(line);
        while (box.children.length > 5) {
            box.removeChild(box.firstChild);
        }
    }

    // ==================== INPUTS & MOBILE CONTROLS ====================
    applyMobileModeUI() {
        const mobCtrl = document.getElementById('mobile-controls');
        if (mobCtrl) {
            mobCtrl.classList.toggle('hidden', !this.mobileMode || !this.running);
        }
        const toggleBtn = document.getElementById('btn-toggle-mobile');
        if (toggleBtn) {
            toggleBtn.textContent = this.mobileMode ? '📱 มือถือ: เปิด' : '💻 PC: เปิด';
        }
    }

    setupInputs() {
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });

        window.addEventListener('keydown', (e) => {
            if (document.activeElement && document.activeElement.tagName === 'INPUT') {
                if (e.key === 'Enter') {
                    this.submitChat();
                }
                return;
            }
            this.keys[e.code] = true;

            if (this.player.hp <= 0) {
                if (e.code === 'Space' || e.code === 'ArrowRight' || e.code === 'KeyD') {
                    this.cycleSpectator(1);
                } else if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
                    this.cycleSpectator(-1);
                } else if (e.code === 'Tab') {
                    e.preventDefault();
                    this.toggleScoreboard(true);
                }
                return;
            }

            if (e.code === 'Space' && this.player.onGround) {
                this.player.vy = 8.4;
                this.player.onGround = false;
            } else if (e.code === 'KeyR') {
                this.reload();
            } else if (e.code === 'Digit1') {
                this.equipSlot(1);
            } else if (e.code === 'Digit2') {
                this.equipSlot(2);
            } else if (e.code === 'Digit3') {
                this.equipSlot(3);
            } else if (e.code === 'Digit4') {
                this.equipSlot(4);
            } else if (e.code === 'KeyB') {
                this.toggleBuyMenu();
            } else if (e.code === 'ShiftLeft' || e.code === 'ControlLeft' || e.code === 'KeyC') {
                this.player.crouching = true;
            } else if (e.code === 'Tab') {
                e.preventDefault();
                this.toggleScoreboard(true);
            }
        });

        window.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
            if (e.code === 'ShiftLeft' || e.code === 'ControlLeft' || e.code === 'KeyC') {
                this.player.crouching = false;
            } else if (e.code === 'Tab') {
                this.toggleScoreboard(false);
            }
        });

        this.canvas.addEventListener('mousedown', (e) => {
            if (!this.running) return;
            if (this.player.hp <= 0) {
                if (e.button === 0) {
                    this.cycleSpectator(1);
                } else if (e.button === 2) {
                    this.toggleSpectateCameraMode();
                }
                return;
            }
            if (!this.mobileMode && document.pointerLockElement !== this.canvas) {
                this.canvas.requestPointerLock();
                return;
            }
            if (e.button === 0) {
                this.mouseDown = true;
                this.shoot();
            } else if (e.button === 2) {
                this.setScope(!this.player.isScoped);
            }
        });

        window.addEventListener('mouseup', (e) => {
            if (e.button === 0) this.mouseDown = false;
        });

        window.addEventListener('contextmenu', (e) => e.preventDefault());

        window.addEventListener('mousemove', (e) => {
            if (document.pointerLockElement === this.canvas && this.running) {
                const sens = (this.player.isScoped ? 0.0008 : 0.0022) * this.lookSensitivity;
                this.player.yaw -= e.movementX * sens;
                this.player.pitch = Math.max(-1.45, Math.min(1.45, this.player.pitch - e.movementY * sens));
            }
        });

        // --- MOBILE MULTI-TOUCH JOYSTICK & LOOK ---
        const joyZone = document.getElementById('joystick-zone');
        const joyKnob = document.getElementById('joystick-knob');
        let joyTouchId = null;

        const updateJoystick = (clientX, clientY) => {
            const rect = joyZone.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const maxR = rect.width / 2 - 12;

            let dx = clientX - cx;
            let dy = clientY - cy;
            const dist = Math.hypot(dx, dy);
            if (dist > maxR) {
                dx = (dx / dist) * maxR;
                dy = (dy / dist) * maxR;
            }

            joyKnob.style.transform = `translate(${dx}px, ${dy}px)`;
            this.touchMove.x = dx / maxR;
            this.touchMove.y = -dy / maxR;
        };

        joyZone.addEventListener('touchstart', (e) => {
            if (this.hudEditMode) return;
            e.preventDefault();
            const t = e.changedTouches[0];
            joyTouchId = t.identifier;
            updateJoystick(t.clientX, t.clientY);
        }, { passive: false });

        joyZone.addEventListener('touchmove', (e) => {
            if (this.hudEditMode) return;
            e.preventDefault();
            for (const t of e.changedTouches) {
                if (t.identifier === joyTouchId) {
                    updateJoystick(t.clientX, t.clientY);
                }
            }
        }, { passive: false });

        const resetJoystick = (e) => {
            for (const t of e.changedTouches) {
                if (t.identifier === joyTouchId) {
                    joyTouchId = null;
                    joyKnob.style.transform = 'translate(0px, 0px)';
                    this.touchMove.x = 0;
                    this.touchMove.y = 0;
                }
            }
        };
        joyZone.addEventListener('touchend', resetJoystick);
        joyZone.addEventListener('touchcancel', resetJoystick);

        const lookZone = document.getElementById('look-zone');
        let lookTouchId = null;
        let lastLookX = 0;
        let lastLookY = 0;

        lookZone.addEventListener('touchstart', (e) => {
            if (this.hudEditMode) return;
            e.preventDefault();
            const t = e.changedTouches[0];
            lookTouchId = t.identifier;
            lastLookX = t.clientX;
            lastLookY = t.clientY;
        }, { passive: false });

        lookZone.addEventListener('touchmove', (e) => {
            if (this.hudEditMode) return;
            e.preventDefault();
            for (const t of e.changedTouches) {
                if (t.identifier === lookTouchId) {
                    const dx = t.clientX - lastLookX;
                    const dy = t.clientY - lastLookY;
                    lastLookX = t.clientX;
                    lastLookY = t.clientY;

                    const sens = (this.player.isScoped ? 0.0022 : 0.0055) * this.lookSensitivity;
                    this.player.yaw -= dx * sens;
                    this.player.pitch = Math.max(-1.45, Math.min(1.45, this.player.pitch - dy * sens));
                }
            }
        }, { passive: false });

        const endLook = (e) => {
            for (const t of e.changedTouches) {
                if (t.identifier === lookTouchId) lookTouchId = null;
            }
        };
        lookZone.addEventListener('touchend', endLook);
        lookZone.addEventListener('touchcancel', endLook);

        const bindHoldBtn = (id, onDown, onUp) => {
            const el = document.getElementById(id);
            if (!el) return;
            el.addEventListener('touchstart', (e) => {
                if (this.hudEditMode) return;
                e.preventDefault();
                el.classList.add('pressed');
                onDown();
            }, { passive: false });
            el.addEventListener('touchend', (e) => {
                if (this.hudEditMode) return;
                e.preventDefault();
                el.classList.remove('pressed');
                if (onUp) onUp();
            }, { passive: false });
            el.addEventListener('mousedown', (e) => {
                if (this.hudEditMode) return;
                e.preventDefault();
                onDown();
            });
            el.addEventListener('mouseup', (e) => {
                if (this.hudEditMode) return;
                e.preventDefault();
                if (onUp) onUp();
            });
        };

        bindHoldBtn('btn-fire-right', () => {
            if (this.player.hp <= 0) { this.cycleSpectator(1); return; }
            this.touchFiring = true;
            this.shoot();
        }, () => { this.touchFiring = false; });
        bindHoldBtn('btn-fire-left', () => {
            if (this.player.hp <= 0) { this.cycleSpectator(1); return; }
            this.touchFiring = true;
            this.shoot();
        }, () => { this.touchFiring = false; });
        bindHoldBtn('btn-aim', () => { this.setScope(!this.player.isScoped); });
        bindHoldBtn('btn-reload', () => { this.reload(); });
        bindHoldBtn('btn-jump', () => {
            if (this.player.onGround) {
                this.player.vy = 8.4;
                this.player.onGround = false;
            }
        });
        bindHoldBtn('btn-crouch', () => {
            this.player.crouching = !this.player.crouching;
            document.getElementById('btn-crouch').classList.toggle('pressed', this.player.crouching);
        });
        bindHoldBtn('btn-bomb-action', () => { this.holdingBombBtn = true; }, () => { this.holdingBombBtn = false; });
    }

    setupUIEvents() {
        document.getElementById('select-team-t').addEventListener('click', () => {
            this.player.team = 'T';
            document.getElementById('select-team-t').classList.add('active');
            document.getElementById('select-team-ct').classList.remove('active');
        });
        document.getElementById('select-team-ct').addEventListener('click', () => {
            this.player.team = 'CT';
            document.getElementById('select-team-ct').classList.add('active');
            document.getElementById('select-team-t').classList.remove('active');
        });

        document.getElementById('btn-start-play').addEventListener('click', () => {
            this.startMatch();
        });

        document.getElementById('btn-host-room').addEventListener('click', () => {
            const statusEl = document.getElementById('room-status-text');
            statusEl.textContent = '⏳ กำลังสร้างรหัสห้องออนไลน์...';
            this.net.hostRoom((code) => {
                document.getElementById('room-code-box').classList.remove('hidden');
                document.getElementById('room-code-val').textContent = code;
                statusEl.textContent = '✅ สร้างห้องสำเร็จ! ส่งรหัสนี้ให้เพื่อนเข้าเล่นได้เลย';
            }, (err) => {
                statusEl.textContent = '⚠️ ' + err;
            });
        });

        document.getElementById('btn-join-room').addEventListener('click', () => {
            const code = document.getElementById('join-code-input').value;
            const statusEl = document.getElementById('room-status-text');
            statusEl.textContent = '⏳ กำลังเชื่อมต่อเข้าห้อง...';
            this.net.joinRoom(code, (roomCode) => {
                statusEl.textContent = `✅ เชื่อมต่อห้อง ${roomCode} สำเร็จ!`;
                this.startMatch();
            }, (err) => {
                statusEl.textContent = '⚠️ ' + err;
            });
        });

        document.getElementById('btn-open-buy').addEventListener('click', () => this.toggleBuyMenu());
        document.getElementById('btn-close-buy').addEventListener('click', () => this.toggleBuyMenu(false));
        document.getElementById('btn-open-score').addEventListener('click', () => this.toggleScoreboard());
        document.getElementById('btn-close-score').addEventListener('click', () => this.toggleScoreboard(false));

        const botDiffBtn = document.getElementById('btn-cycle-bot-diff');
        if (botDiffBtn) {
            botDiffBtn.addEventListener('click', () => this.cycleBotDifficulty());
        }

        document.getElementById('btn-toggle-mobile').addEventListener('click', () => {
            this.mobileMode = !this.mobileMode;
            this.applyMobileModeUI();
        });

        const editHudBtn = document.getElementById('btn-edit-hud');
        if (editHudBtn) {
            editHudBtn.addEventListener('click', () => {
                this.toggleHudEditor(!this.hudEditMode);
            });
        }

        document.getElementById('btn-toggle-autofire').addEventListener('click', () => {
            this.autoFireMobile = !this.autoFireMobile;
            document.getElementById('btn-toggle-autofire').textContent = this.autoFireMobile ? '🎯 ยิงออโต้: เปิด' : '🎯 ยิงออโต้: ปิด';
        });

        document.getElementById('btn-open-lobby').addEventListener('click', () => {
            if (document.pointerLockElement) document.exitPointerLock();
            document.getElementById('lobby-overlay').classList.remove('hidden');
        });

        for (let s = 1; s <= 4; s++) {
            document.getElementById(`slot-btn-${s}`).addEventListener('click', () => this.equipSlot(s));
        }

        document.getElementById('btn-send-chat').addEventListener('click', () => this.submitChat());

        const specPrev = document.getElementById('btn-spectate-prev');
        const specNext = document.getElementById('btn-spectate-next');
        const specCam = document.getElementById('btn-spectate-cam');
        if (specPrev) specPrev.addEventListener('click', () => this.cycleSpectator(-1));
        if (specNext) specNext.addEventListener('click', () => this.cycleSpectator(1));
        if (specCam) specCam.addEventListener('click', () => this.toggleSpectateCameraMode());

        this.populateBuyMenu('all');
        this.setupAmmoSupplyButtons();
    }

    cycleBotDifficulty() {
        const order = ['easy', 'normal', 'hard', 'expert'];
        const curIdx = order.indexOf(this.botAI.difficulty);
        const nextKey = order[(curIdx + 1) % order.length];
        this.botAI.setDifficulty(nextKey);
        const diffSel = document.getElementById('bot-diff-select');
        if (diffSel) diffSel.value = nextKey;
        this.updateBotDiffHUD();
        const cfg = this.botAI.getDiffConfig();
        this.showAnnouncement(`🤖 ปรับความเก่งของบอทเป็น: ${cfg.label}`, 2.0);
    }

    updateBotDiffHUD() {
        const btn = document.getElementById('btn-cycle-bot-diff');
        if (!btn) return;
        const shortNames = {
            easy: '🟢 บอท: ง่าย',
            normal: '🟡 บอท: ปานกลาง',
            hard: '🟠 บอท: ยาก',
            expert: '🔴 บอท: โหดมาก'
        };
        btn.textContent = shortNames[this.botAI.difficulty] || '🟡 บอท: ปานกลาง';
    }

    submitChat() {
        const input = document.getElementById('chat-input');
        const txt = input.value.trim();
        if (!txt) return;
        input.value = '';
        input.blur();
        this.addChatMessage(`${this.player.name}: ${txt}`, '#38bdf8');
        this.net.sendChat(txt);
    }

    populateBuyMenu(selectedCat = 'all') {
        this.currentBuyCat = selectedCat;
        const tabsBar = document.getElementById('buy-category-tabs');
        const grid = document.getElementById('buy-items-grid');
        if (!grid) return;

        // Build Category Filter Tabs
        if (tabsBar && window.WEAPON_CATEGORIES) {
            tabsBar.innerHTML = '';
            for (const cat of window.WEAPON_CATEGORIES) {
                const btn = document.createElement('button');
                btn.className = 'buy-tab-btn' + (cat.id === selectedCat ? ' active' : '');
                btn.textContent = cat.name;
                btn.addEventListener('click', () => this.populateBuyMenu(cat.id));
                tabsBar.appendChild(btn);
            }
        }

        grid.innerHTML = '';

        const catLabels = {
            pistol: '🔫 ปืนพก (Pistol)',
            shotgun: '💥 ปืนลูกซอง (Shotgun)',
            smg: '⚡ ปืนกลเบา (SMG)',
            mg: '🛡️ ปืนกลหนัก (LMG)',
            rifle: '🎯 ปืนไรเฟิล (Rifle)',
            sniper: '🔭 ปืนสไนเปอร์ (Sniper)',
            equip: '💣 ยุทโธปกรณ์'
        };

        const allItems = [
            ...Object.values(WEAPONS).filter(w => w.price > 0),
            { id: 'armor', category: 'equip', name: 'Kevlar + Helmet (100 AP)', type: 'เกราะกันกระสุน + หมวกเหล็กมาตรฐาน', price: 650, isEquipment: true },
            { id: 'heavyarmor', category: 'equip', name: 'Heavy Tactical Armor (150 AP)', type: 'เกราะจู่โจมหนาพิเศษ 150 AP', price: 1000, isEquipment: true }
        ];

        const filtered = selectedCat === 'all'
            ? allItems
            : allItems.filter(item => item.category === selectedCat);

        for (const item of filtered) {
            const card = document.createElement('div');
            card.className = 'buy-card';
            const badgeText = catLabels[item.category] || 'อาวุธ';
            let statsHtml = '';
            if (!item.isEquipment && item.clipSize) {
                const pelletsInfo = item.pellets ? `x${item.pellets}` : '';
                statsHtml = `<div class="buy-card-stats">⚔️ ดาเมจ: ${item.damage}${pelletsInfo} &nbsp;|&nbsp; 📦 กระสุน: ${item.clipSize} / ${item.reserveMax}</div>`;
            }

            card.innerHTML = `
                <div>
                    <span class="buy-card-cat-badge">${badgeText}</span>
                    <div class="buy-card-title">${item.name}</div>
                    <div class="buy-card-type">${item.type}</div>
                </div>
                ${statsHtml}
                <div class="buy-card-price">$${item.price}</div>
            `;
            card.addEventListener('click', () => this.buyItem(item));
            grid.appendChild(card);
        }
    }

    setupAmmoSupplyButtons() {
        const bindBtn = (id, cost, actionFn) => {
            const el = document.getElementById(id);
            if (!el) return;
            el.addEventListener('click', () => {
                if (this.gameMode !== 'tdm') {
                    if (this.player.money < cost) {
                        this.showAnnouncement('❌ เงินไม่พอสำหรับซื้อรายการนี้!', 1.5);
                        return;
                    }
                    this.player.money -= cost;
                } else {
                    this.player.money = 50000;
                }
                actionFn();
                window.soundFX.playReload();
                this.updateVitalsHUD();
                this.updateWeaponHUD();
            });
        };

        // 1. Primary Ammo (+150 rounds to Slot 1 weapon)
        bindBtn('btn-buy-ammo-primary', 80, () => {
            const wId = this.player.slots[1];
            if (wId && WEAPONS[wId]) {
                const w = WEAPONS[wId];
                this.player.ammo[wId].clip = w.clipSize;
                this.player.ammo[wId].reserve = Math.min(999, (this.player.ammo[wId].reserve || 0) + 150);
                this.showAnnouncement(`📦 ซื้อกระสุนปืนหลัก +150 นัด (${w.name})!`, 1.6);
            }
        });

        // 2. Pistol Ammo (+100 rounds to Slot 2 weapon)
        bindBtn('btn-buy-ammo-pistol', 50, () => {
            const wId = this.player.slots[2];
            if (wId && WEAPONS[wId]) {
                const w = WEAPONS[wId];
                this.player.ammo[wId].clip = w.clipSize;
                this.player.ammo[wId].reserve = Math.min(999, (this.player.ammo[wId].reserve || 0) + 100);
                this.showAnnouncement(`📦 ซื้อกระสุนปืนพก +100 นัด (${w.name})!`, 1.6);
            }
        });

        // 3. Super Max Ammo Refill (+350 rounds to all weapons)
        bindBtn('btn-buy-ammo-max', 150, () => {
            for (const key of Object.keys(WEAPONS)) {
                if (key === 'knife' || key === 'hegrenade') continue;
                const w = WEAPONS[key];
                this.player.ammo[key].clip = w.clipSize;
                this.player.ammo[key].reserve = Math.min(999, Math.max(w.reserveMax, (this.player.ammo[key].reserve || 0) + 350));
            }
            this.showAnnouncement('📦 เติมกระสุนเต็มแม็กพิเศษ (+350 นัด) ทุกกระบอก!', 1.8);
        });

        // 4. Standard Kevlar + Helmet (100 AP)
        bindBtn('btn-buy-armor-std', 650, () => {
            this.player.armor = Math.max(this.player.armor, 100);
            this.showAnnouncement('🛡️ สวมเกราะ Kevlar + หมวกเหล็ก (100 AP)!', 1.6);
        });

        // 5. Heavy Tactical Armor (150 AP)
        bindBtn('btn-buy-armor-heavy', 1000, () => {
            this.player.armor = 150;
            this.showAnnouncement('🛡️ สวมเกราะหนักจู่โจมพิเศษ (150 AP)!', 1.6);
        });

        // 6. Quick Buy HE Grenade (+1 grenade up to 5)
        bindBtn('btn-buy-nade-quick', 300, () => {
            this.player.slots[4] = 'hegrenade';
            const gAmmo = this.player.ammo.hegrenade;
            if (gAmmo.clip <= 0) gAmmo.clip = 1;
            else gAmmo.reserve = Math.min(5, (gAmmo.reserve || 0) + 1);
            this.showAnnouncement(`💣 ซื้อระเบิดมือ M67 เพิ่ม! (มี ${gAmmo.clip + gAmmo.reserve} ลูก)`, 1.6);
        });

        // 7. Quick HUD Buy Ammo Button (bottom-right HUD next to ammo counter)
        bindBtn('btn-hud-buy-ammo', 50, () => {
            const curId = this.player.weaponId;
            if (curId && WEAPONS[curId] && curId !== 'knife') {
                const w = WEAPONS[curId];
                this.player.ammo[curId].clip = w.clipSize;
                this.player.ammo[curId].reserve = Math.min(999, (this.player.ammo[curId].reserve || 0) + 120);
                this.showAnnouncement(`➕ เติมกระสุน ${w.name} (+120 นัด)!`, 1.4);
            }
        });
    }

    buyItem(item) {
        if (this.gameMode !== 'tdm') {
            if (this.player.money < item.price) {
                this.showAnnouncement('❌ เงินไม่พอสำหรับซื้อไอเทมนี้!', 1.5);
                return;
            }
            this.player.money -= item.price;
        } else {
            this.player.money = 50000;
        }

        if (item.id === 'armor') {
            this.player.armor = Math.max(this.player.armor, 100);
        } else if (item.id === 'heavyarmor') {
            this.player.armor = 150;
        } else if (item.id === 'hegrenade') {
            this.player.slots[4] = 'hegrenade';
            const gAmmo = this.player.ammo.hegrenade;
            if (gAmmo.clip <= 0) gAmmo.clip = 1;
            else gAmmo.reserve = Math.min(5, (gAmmo.reserve || 0) + 1);
            this.equipSlot(4);
        } else {
            const wep = WEAPONS[item.id];
            this.player.slots[wep.slot] = wep.id;
            this.player.ammo[wep.id] = { clip: wep.clipSize, reserve: wep.reserveMax };
            this.equipSlot(wep.slot);
        }

        window.soundFX.playReload();
        this.updateVitalsHUD();
        this.updateWeaponHUD();
        this.showAnnouncement(`✅ ซื้อ ${item.name} สำเร็จ!`, 1.5);
    }

    toggleBuyMenu(forceState) {
        const modal = document.getElementById('buy-modal');
        const show = forceState !== undefined ? forceState : modal.classList.contains('hidden');
        modal.classList.toggle('hidden', !show);
        if (show) {
            this.updateVitalsHUD();
            if (document.pointerLockElement) document.exitPointerLock();
        } else if (!this.mobileMode && this.running) {
            this.canvas.requestPointerLock();
        }
    }

    toggleScoreboard(forceState) {
        const modal = document.getElementById('score-modal');
        const show = forceState !== undefined ? forceState : modal.classList.contains('hidden');
        modal.classList.toggle('hidden', !show);
        if (show) {
            this.renderScoreboardTable();
        }
    }

    refreshScoreboardIfOpen() {
        const modal = document.getElementById('score-modal');
        if (modal && !modal.classList.contains('hidden')) {
            this.renderScoreboardTable();
        }
    }

    renderScoreboardTable() {
        const tbodyT = document.getElementById('scoreboard-tbody-t');
        const tbodyCT = document.getElementById('scoreboard-tbody-ct');
        if (!tbodyT || !tbodyCT) return;

        tbodyT.innerHTML = '';
        tbodyCT.innerHTML = '';

        const all = [
            {
                name: this.player.name + ' (คุณ)',
                team: this.player.team,
                kills: this.player.kills || 0,
                deaths: this.player.deaths || 0,
                hp: this.player.hp,
                isMe: true
            },
            ...this.entities.map(e => ({
                name: e.name,
                team: e.team,
                kills: e.kills || 0,
                deaths: e.deaths || 0,
                hp: e.hp,
                isMe: false
            }))
        ];

        const teamT = all.filter(p => p.team === 'T').sort((a, b) => (b.kills - a.kills) || (a.deaths - b.deaths));
        const teamCT = all.filter(p => p.team === 'CT').sort((a, b) => (b.kills - a.kills) || (a.deaths - b.deaths));

        const totalKillsT = teamT.reduce((sum, p) => sum + p.kills, 0);
        const totalKillsCT = teamCT.reduce((sum, p) => sum + p.kills, 0);

        const roundsT = document.getElementById('sb-rounds-t');
        const killsT = document.getElementById('sb-kills-t');
        const roundsCT = document.getElementById('sb-rounds-ct');
        const killsCT = document.getElementById('sb-kills-ct');

        if (roundsT) roundsT.textContent = this.scores.T;
        if (killsT) killsT.textContent = totalKillsT;
        if (roundsCT) roundsCT.textContent = this.scores.CT;
        if (killsCT) killsCT.textContent = totalKillsCT;

        const renderTeamRows = (list, tbody, accentColor) => {
            for (const row of list) {
                const tr = document.createElement('tr');
                if (row.isMe) {
                    tr.style.background = 'rgba(255, 255, 255, 0.08)';
                }
                tr.innerHTML = `
                    <td style="font-weight:${row.isMe ? '800' : '600'};color:${row.isMe ? accentColor : '#f8fafc'};">${row.name}</td>
                    <td style="font-weight:800;color:#fde047;">${row.kills}</td>
                    <td>${row.deaths}</td>
                    <td>${row.hp > 0 ? `<span style="color:#34d399;font-weight:700;">${row.hp} HP</span>` : '<span style="color:#ef4444;font-weight:700;">DEAD</span>'}</td>
                `;
                tbody.appendChild(tr);
            }
        };

        renderTeamRows(teamT, tbodyT, '#fbbf24');
        renderTeamRows(teamCT, tbodyCT, '#38bdf8');
    }

    // ==================== MOBILE HUD LAYOUT CUSTOMIZATION ====================
    getCustomizableHudIds() {
        return [
            'joystick-zone',
            'btn-fire-right',
            'btn-fire-left',
            'btn-aim',
            'btn-reload',
            'btn-jump',
            'btn-crouch',
            'btn-bomb-action'
        ];
    }

    setupHudLayoutEditor() {
        const ids = this.getCustomizableHudIds();
        let draggingEl = null;
        let dragOffsetX = 0;
        let dragOffsetY = 0;

        const startDrag = (el, clientX, clientY) => {
            if (!this.hudEditMode) return;
            this.selectHudElement(el);
            draggingEl = el;
            const rect = el.getBoundingClientRect();
            dragOffsetX = clientX - (rect.left + rect.width / 2);
            dragOffsetY = clientY - (rect.top + rect.height / 2);
        };

        const moveDrag = (clientX, clientY) => {
            if (!this.hudEditMode || !draggingEl) return;
            const id = draggingEl.id;
            const cfg = this.hudLayout[id] || { scale: 100, opacity: 100 };

            const cx = Math.max(28, Math.min(window.innerWidth - 28, clientX - dragOffsetX));
            const cy = Math.max(40, Math.min(window.innerHeight - 28, clientY - dragOffsetY));

            cfg.leftPct = Number(((cx / window.innerWidth) * 100).toFixed(2));
            cfg.topPct = Number(((cy / window.innerHeight) * 100).toFixed(2));
            this.hudLayout[id] = cfg;

            this.applyHudElementStyle(draggingEl, cfg);
        };

        const endDrag = () => {
            draggingEl = null;
        };

        for (const id of ids) {
            const el = document.getElementById(id);
            if (!el) continue;

            el.addEventListener('touchstart', (e) => {
                if (!this.hudEditMode) return;
                e.preventDefault();
                e.stopPropagation();
                const t = e.changedTouches[0];
                startDrag(el, t.clientX, t.clientY);
            }, { passive: false });

            el.addEventListener('touchmove', (e) => {
                if (!this.hudEditMode || draggingEl !== el) return;
                e.preventDefault();
                e.stopPropagation();
                const t = e.changedTouches[0];
                moveDrag(t.clientX, t.clientY);
            }, { passive: false });

            el.addEventListener('touchend', (e) => {
                if (!this.hudEditMode) return;
                e.preventDefault();
                endDrag();
            }, { passive: false });

            el.addEventListener('mousedown', (e) => {
                if (!this.hudEditMode) return;
                e.preventDefault();
                e.stopPropagation();
                startDrag(el, e.clientX, e.clientY);
            });
        }

        window.addEventListener('mousemove', (e) => {
            if (this.hudEditMode && draggingEl) {
                moveDrag(e.clientX, e.clientY);
            }
        });

        window.addEventListener('mouseup', () => {
            if (this.hudEditMode) endDrag();
        });

        // Sliders for Scale, Opacity, and Look Sensitivity
        const scaleSlider = document.getElementById('hud-scale-slider');
        const opacitySlider = document.getElementById('hud-opacity-slider');
        const sensSlider = document.getElementById('hud-sens-slider');

        if (scaleSlider) {
            scaleSlider.addEventListener('input', () => {
                const val = parseInt(scaleSlider.value, 10) || 100;
                document.getElementById('hud-scale-val').textContent = `${val}%`;
                if (this.selectedHudEl) {
                    const id = this.selectedHudEl.id;
                    if (!this.hudLayout[id]) this.captureElementCurrentPosition(this.selectedHudEl);
                    this.hudLayout[id].scale = val;
                    this.applyHudElementStyle(this.selectedHudEl, this.hudLayout[id]);
                }
            });
        }

        if (opacitySlider) {
            opacitySlider.addEventListener('input', () => {
                const val = parseInt(opacitySlider.value, 10) || 100;
                document.getElementById('hud-opacity-val').textContent = `${val}%`;
                if (this.selectedHudEl) {
                    const id = this.selectedHudEl.id;
                    if (!this.hudLayout[id]) this.captureElementCurrentPosition(this.selectedHudEl);
                    this.hudLayout[id].opacity = val;
                    this.applyHudElementStyle(this.selectedHudEl, this.hudLayout[id]);
                }
            });
        }

        if (sensSlider) {
            sensSlider.addEventListener('input', () => {
                const val = parseInt(sensSlider.value, 10) || 100;
                document.getElementById('hud-sens-val').textContent = `${val}%`;
                this.lookSensitivity = val / 100;
            });
        }

        const resetBtn = document.getElementById('btn-hud-reset');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.resetHudLayout());
        }

        const saveBtn = document.getElementById('btn-hud-save');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                this.saveHudLayout();
                this.toggleHudEditor(false);
                this.showAnnouncement('✅ บันทึกตำแหน่งปุ่มมือถือเรียบร้อยแล้ว!', 2.2);
            });
        }
    }

    captureElementCurrentPosition(el) {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        this.hudLayout[el.id] = {
            leftPct: Number(((cx / window.innerWidth) * 100).toFixed(2)),
            topPct: Number(((cy / window.innerHeight) * 100).toFixed(2)),
            scale: 100,
            opacity: 100
        };
    }

    selectHudElement(el) {
        for (const id of this.getCustomizableHudIds()) {
            const node = document.getElementById(id);
            if (node) node.classList.remove('hud-selected-el');
        }
        this.selectedHudEl = el;
        if (!el) return;

        el.classList.add('hud-selected-el');
        const label = el.getAttribute('data-label') || el.id;
        document.getElementById('hud-selected-name').textContent = label;

        if (!this.hudLayout[el.id]) {
            this.captureElementCurrentPosition(el);
        }
        const cfg = this.hudLayout[el.id];
        const scale = cfg.scale || 100;
        const opacity = cfg.opacity || 100;

        document.getElementById('hud-scale-slider').value = scale;
        document.getElementById('hud-scale-val').textContent = `${scale}%`;
        document.getElementById('hud-opacity-slider').value = opacity;
        document.getElementById('hud-opacity-val').textContent = `${opacity}%`;
    }

    applyHudElementStyle(el, cfg) {
        if (!el || !cfg) return;
        if (cfg.leftPct !== undefined && cfg.topPct !== undefined) {
            el.style.left = `${cfg.leftPct}%`;
            el.style.top = `${cfg.topPct}%`;
            el.style.right = 'auto';
            el.style.bottom = 'auto';
            const scaleVal = (cfg.scale || 100) / 100;
            el.style.transform = `translate(-50%, -50%) scale(${scaleVal})`;
        }
        if (cfg.opacity !== undefined) {
            el.style.opacity = String(cfg.opacity / 100);
        }
    }

    toggleHudEditor(enable) {
        this.hudEditMode = enable;
        const mobCtrl = document.getElementById('mobile-controls');
        const panel = document.getElementById('hud-editor-panel');
        const bombBtn = document.getElementById('btn-bomb-action');

        if (enable) {
            this.mobileMode = true;
            this.applyMobileModeUI();
            if (document.pointerLockElement) document.exitPointerLock();
            mobCtrl.classList.add('hud-editing');
            panel.classList.remove('hidden');
            if (bombBtn) bombBtn.classList.remove('hidden');
            this.selectHudElement(document.getElementById('btn-fire-right'));
        } else {
            mobCtrl.classList.remove('hud-editing');
            panel.classList.add('hidden');
            this.selectHudElement(null);
        }
    }

    saveHudLayout() {
        try {
            const payload = {
                lookSensitivity: this.lookSensitivity,
                elements: this.hudLayout
            };
            localStorage.setItem('cs_mobile_hud_layout_v1', JSON.stringify(payload));
        } catch (e) {
            console.warn('Could not save HUD layout:', e);
        }
    }

    loadHudLayout() {
        try {
            const raw = localStorage.getItem('cs_mobile_hud_layout_v1');
            if (!raw) return;
            const data = JSON.parse(raw);
            if (data.lookSensitivity) {
                this.lookSensitivity = data.lookSensitivity;
                const sensPct = Math.round(this.lookSensitivity * 100);
                const sensSlider = document.getElementById('hud-sens-slider');
                const sensVal = document.getElementById('hud-sens-val');
                if (sensSlider) sensSlider.value = sensPct;
                if (sensVal) sensVal.textContent = `${sensPct}%`;
            }
            if (data.elements) {
                this.hudLayout = data.elements;
                for (const [id, cfg] of Object.entries(this.hudLayout)) {
                    const el = document.getElementById(id);
                    if (el) this.applyHudElementStyle(el, cfg);
                }
            }
        } catch (e) {
            console.warn('Could not load HUD layout:', e);
        }
    }

    resetHudLayout() {
        this.hudLayout = {};
        this.lookSensitivity = 1.0;
        try {
            localStorage.removeItem('cs_mobile_hud_layout_v1');
        } catch (e) {}

        for (const id of this.getCustomizableHudIds()) {
            const el = document.getElementById(id);
            if (el) {
                el.style.left = '';
                el.style.top = '';
                el.style.right = '';
                el.style.bottom = '';
                el.style.transform = '';
                el.style.opacity = '';
            }
        }

        document.getElementById('hud-scale-slider').value = 100;
        document.getElementById('hud-scale-val').textContent = '100%';
        document.getElementById('hud-opacity-slider').value = 100;
        document.getElementById('hud-opacity-val').textContent = '100%';
        document.getElementById('hud-sens-slider').value = 100;
        document.getElementById('hud-sens-val').textContent = '100%';

        this.showAnnouncement('🔄 รีเซ็ตตำแหน่งปุ่มเป็นค่าเริ่มต้นแล้ว', 2.0);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    window.csGame = new CSGame();
});
