// Core 3D Counter-Strike Engine (Three.js + Mobile & Desktop + Online + Bots)

class CSGame {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.radarCanvas = document.getElementById('radar-canvas');
        this.radarCtx = this.radarCanvas.getContext('2d');

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x87b5d6);
        this.scene.fog = new THREE.FogExp2(0xd6c29f, 0.0085);

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 250);
        this.scene.add(this.camera);

        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, powerPreference: 'high-performance' });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        this.setupLights();
        this.map = new GameMap(this.scene);
        this.botAI = new BotAI(this);
        this.net = new NetworkManager(this);

        this.running = false;
        this.gameMode = 'classic'; // 'classic' (Bomb/Rounds) or 'tdm' (Team Deathmatch)
        this.botCount = 8; // Total bots (e.g. 4v5)
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

        this.entities = []; // Bots & Remote Players
        this.tracers = [];
        this.grenades = [];
        this.particles = [];

        this.keys = {};
        this.mouseDown = false;
        this.touchMove = { x: 0, y: 0 };
        this.touchFiring = false;
        this.holdingBombBtn = false;

        this.initAmmoForAll();
        this.equipSlot(1);
        this.setupInputs();
        this.setupUIEvents();
        this.applyMobileModeUI();

        this.lastTime = performance.now();
        requestAnimationFrame((t) => this.loop(t));
    }

    setupLights() {
        const ambient = new THREE.AmbientLight(0xfffbeb, 0.68);
        this.scene.add(ambient);

        const sun = new THREE.DirectionalLight(0xfff3d1, 0.95);
        sun.position.set(35, 65, 25);
        sun.castShadow = true;
        sun.shadow.mapSize.width = 1024;
        sun.shadow.mapSize.height = 1024;
        sun.shadow.camera.near = 10;
        sun.shadow.camera.far = 160;
        const d = 50;
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

    startMatch(options = {}) {
        const nameInput = document.getElementById('player-name-input').value.trim();
        if (nameInput) this.player.name = nameInput;

        this.gameMode = document.getElementById('game-mode-select').value;
        this.botCount = parseInt(document.getElementById('bot-count-select').value, 10) || 0;

        document.getElementById('lobby-overlay').classList.add('hidden');
        document.getElementById('hud').classList.remove('hidden');
        this.applyMobileModeUI();

        this.running = true;
        this.scores = { T: 0, CT: 0 };
        this.player.money = this.gameMode === 'tdm' ? 16000 : 1000;
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
        // Remove existing bots
        this.entities = this.entities.filter(e => {
            if (e.isBot) {
                if (e.mesh) this.scene.remove(e.mesh);
                return false;
            }
            return true;
        });

        const tNames = ['Bot_Phoenix', 'Bot_Leet', 'Bot_Viper', 'Bot_Razor', 'Bot_Kobra'];
        const ctNames = ['Bot_Maverick', 'Bot_SAS', 'Bot_Ghost', 'Bot_Falcon', 'Bot_Wolf'];

        for (let i = 0; i < this.botCount; i++) {
            // Balance teams
            const team = (i % 2 === 0) ? (this.player.team === 'T' ? 'CT' : 'T') : this.player.team;
            const spawnList = this.map.spawns[team];
            const sp = spawnList[(i + 1) % spawnList.length];
            const namePool = team === 'T' ? tNames : ctNames;
            const botName = namePool[i % namePool.length];
            const botWep = team === 'T' ? 'ak47' : 'm4a1';

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

        // Respawn all entities
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

        if (this.net.isHost) {
            this.net.broadcast({
                type: 'round_reset',
                scores: this.scores,
                roundTime: this.roundTime
            });
        }
    }

    onClientRoundReset(data) {
        this.scores = data.scores;
        this.roundTime = data.roundTime;
        this.clearPlantedBomb();
        this.respawnLocalPlayer();
        this.showAnnouncement('🔥 เริ่มรอบใหม่!', 2.2);
        this.updateScoreHUD();
    }

    respawnLocalPlayer() {
        const spList = this.map.spawns[this.player.team];
        const sp = spList[0];
        this.player.x = sp.x + (Math.random() - 0.5) * 1.5;
        this.player.y = 0;
        this.player.z = sp.z + (Math.random() - 0.5) * 1.5;
        this.player.vx = 0;
        this.player.vy = 0;
        this.player.vz = 0;
        this.player.yaw = sp.yaw;
        this.player.pitch = 0;
        this.player.hp = 100;
        this.player.armor = 100;
        this.player.reloading = false;

        // Refill clip on spawn
        for (const k of Object.keys(this.player.ammo)) {
            this.player.ammo[k].clip = WEAPONS[k].clipSize;
            this.player.ammo[k].reserve = WEAPONS[k].reserveMax;
        }
        this.equipSlot(this.player.slots[1] ? 1 : 2);
        this.updateVitalsHUD();
    }

    shoot() {
        if (!this.running || this.player.hp <= 0 || this.player.reloading) return;
        if (this.player.fireCooldown > 0) return;

        const wep = WEAPONS[this.player.weaponId];
        const ammoObj = this.player.ammo[wep.id];

        if (wep.id === 'hegrenade') {
            if (ammoObj.clip <= 0) return;
            ammoObj.clip--;
            this.player.fireCooldown = wep.fireRate;
            this.throwGrenade();
            this.updateWeaponHUD();
            setTimeout(() => {
                if (this.player.weaponId === 'hegrenade') this.equipSlot(1);
            }, 350);
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

        // Muzzle flash & Viewmodel kick
        if (this.weaponMesh) {
            this.weaponMesh.position.z += 0.06;
            this.weaponMesh.rotation.x += 0.08;
            const flash = this.weaponMesh.getObjectByName('muzzleFlash');
            if (flash) {
                flash.visible = true;
                flash.rotation.z = Math.random() * Math.PI * 2;
                setTimeout(() => { flash.visible = false; }, 45);
            }
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

            // Check wall hit distance
            const wallHits = ray.intersectObjects(this.map.shootableMeshes, false);
            let maxDist = wep.range;
            let endPoint = origin.clone().add(dir.clone().multiplyScalar(wep.range));

            if (wallHits.length > 0) {
                maxDist = wallHits[0].distance;
                endPoint = wallHits[0].point;
            }

            // Check enemy hits
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
                this.spawnImpactSparks(hit.point, 0xef4444);

                if (this.net.isClient) {
                    this.net.sendHitClaim(targetEnt.id, dmg, wep.id, isHeadshot);
                } else {
                    this.damageEntity(targetEnt, dmg, this.player.name, wep.id, isHeadshot, this.player);
                }
            } else if (wallHits.length > 0 && wep.id !== 'knife') {
                this.spawnImpactSparks(endPoint, 0xfbbf24);
            }

            if (wep.id !== 'knife') {
                const gunMuzzle = origin.clone().add(new THREE.Vector3(0, -0.1, 0));
                this.spawnBulletTracer(gunMuzzle, endPoint);
                this.net.sendShoot(gunMuzzle, endPoint, wep.id);
            }
        }

        // Apply Recoil
        this.player.recoilPitch = Math.min(0.18, this.player.recoilPitch + wep.recoil);

        // Unscope briefly after AWP shot
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

        const geo = new THREE.SphereGeometry(0.14, 10, 10);
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

        // Big explosion flash & particles
        for (let i = 0; i < 24; i++) {
            this.spawnImpactSparks(pos, i % 2 === 0 ? 0xf97316 : 0xfacc15, 6.5);
        }

        // Damage nearby enemies
        const radius = 11.0;
        for (const ent of this.entities) {
            if (ent.hp > 0 && ent.team !== this.player.team) {
                const dist = Math.hypot(ent.x - pos.x, ent.z - pos.z);
                if (dist < radius) {
                    const dmg = Math.round(98 * (1 - dist / radius));
                    this.damageEntity(ent, dmg, this.player.name, 'hegrenade', false, this.player);
                }
            }
        }
    }

    damageEntity(ent, dmg, attackerName, weaponId, isHeadshot, attackerObj = null) {
        if (ent.hp <= 0) return;
        ent.hp -= dmg;

        // If target is a remote client connected to Host, notify them
        if (this.net.isHost && !ent.isBot) {
            this.net.sendToPeer(ent.id, {
                type: 'damage_you',
                dmg,
                attacker: attackerName,
                weapon: weaponId,
                isHeadshot
            });
        }

        if (ent.hp <= 0) {
            ent.hp = 0;
            ent.deaths = (ent.deaths || 0) + 1;
            if (ent.mesh) ent.mesh.visible = false;

            if (attackerObj) {
                attackerObj.kills = (attackerObj.kills || 0) + 1;
                if (attackerObj === this.player) {
                    this.player.money = Math.min(16000, this.player.money + 300);
                    this.updateVitalsHUD();
                }
            }

            this.addKillfeed(attackerName, ent.name, weaponId, isHeadshot);
            if (this.net.isHost) {
                this.net.broadcast({
                    type: 'killfeed',
                    killer: attackerName,
                    victim: ent.name,
                    weapon: weaponId,
                    isHeadshot
                });
            }

            if (this.gameMode === 'tdm') {
                // Respawn after 3 seconds in TDM
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
                }, 3000);
            } else {
                this.checkRoundWinCondition();
            }
        }
    }

    damageLocalPlayer(dmg, attackerName, weaponId, isHeadshot) {
        if (this.player.hp <= 0) return;

        // Armor absorption
        let actualDmg = dmg;
        if (this.player.armor > 0) {
            const absorbed = Math.min(this.player.armor, Math.round(dmg * 0.35));
            this.player.armor -= absorbed;
            actualDmg = dmg - absorbed;
        }

        this.player.hp = Math.max(0, this.player.hp - actualDmg);
        this.updateVitalsHUD();

        // Red damage flash
        const flash = document.getElementById('damage-flash');
        if (flash) {
            flash.style.opacity = '1';
            setTimeout(() => { flash.style.opacity = '0'; }, 180);
        }

        if (this.player.hp <= 0) {
            this.player.deaths++;
            this.setScope(false);
            this.addKillfeed(attackerName, this.player.name, weaponId, isHeadshot);
            this.showAnnouncement(`💀 คุณถูกสังหารโดย ${attackerName}!`, 2.5);

            if (this.gameMode === 'tdm') {
                setTimeout(() => this.respawnLocalPlayer(), 3000);
            } else if (!this.net.isClient) {
                this.checkRoundWinCondition();
            }
        }
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

        const won = this.player.team === winnerTeam;
        this.player.money = Math.min(16000, this.player.money + (won ? 3250 : 1900));
        this.updateVitalsHUD();

        window.soundFX.playRoundEnd(won);
        this.showAnnouncement(reasonText, 4.0);

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

        // Create 3D C4 Mesh
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

    // ==================== VISUAL EFFECTS ====================
    spawnBulletTracer(start, end) {
        const mat = new THREE.LineBasicMaterial({ color: 0xfde047, transparent: true, opacity: 0.85 });
        const geo = new THREE.BufferGeometry().setFromPoints([start, end]);
        const line = new THREE.Line(geo, mat);
        this.scene.add(line);
        this.tracers.push({ line, timer: 0.07 });
    }

    spawnImpactSparks(point, colorHex, speedScale = 2.8) {
        for (let i = 0; i < 5; i++) {
            const geo = new THREE.BoxGeometry(0.06, 0.06, 0.06);
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
        if (p.hp <= 0) return;

        // Cooldowns & Reload
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

        // Firing check (Desktop Mouse OR Mobile Touch Fire OR Mobile Auto-Fire)
        const wep = WEAPONS[p.weaponId];
        if (this.mouseDown || this.touchFiring) {
            if (wep.auto || p.fireCooldown <= 0) {
                this.shoot();
            }
        } else if (this.mobileMode && this.autoFireMobile && !p.reloading) {
            this.checkMobileAutoFire();
        }

        // Movement Input Vector (Keyboard WASD + Mobile Touch Joystick)
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

        // Gravity & Jumping onto crates
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

        // Footsteps & Weapon Bobbing
        const movingSpeed = Math.hypot(wishX, wishZ);
        if (movingSpeed > 1.2 && p.onGround) {
            p.bobTimer += dt * 10;
            p.stepTimer -= dt;
            if (p.stepTimer <= 0) {
                window.soundFX.playFootstep();
                p.stepTimer = 0.36;
            }
        }

        // Update Camera Position & Rotation
        const eyeH = p.crouching ? 1.05 : 1.62;
        this.camera.position.set(p.x, p.y + eyeH, p.z);
        this.camera.rotation.order = 'YXZ';
        this.camera.rotation.y = p.yaw;
        this.camera.rotation.x = Math.max(-1.45, Math.min(1.45, p.pitch + p.recoilPitch));

        // Smooth Weapon Viewmodel Recovery
        if (this.weaponMesh && !p.reloading) {
            const bobX = Math.cos(p.bobTimer) * 0.012;
            const bobY = Math.abs(Math.sin(p.bobTimer)) * 0.012;
            this.weaponMesh.position.x = THREE.MathUtils.lerp(this.weaponMesh.position.x, 0.25 + bobX, dt * 10);
            this.weaponMesh.position.y = THREE.MathUtils.lerp(this.weaponMesh.position.y, -0.23 - bobY, dt * 10);
            this.weaponMesh.position.z = THREE.MathUtils.lerp(this.weaponMesh.position.z, -0.45, dt * 12);
            this.weaponMesh.rotation.x = THREE.MathUtils.lerp(this.weaponMesh.rotation.x, 0, dt * 12);
        }

        // Dynamic Crosshair expansion
        this.updateCrosshair(movingSpeed);

        // Bomb Plant / Defuse check
        this.updatePlayerBombInteraction(dt);
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
        // Bullet tracers
        for (let i = this.tracers.length - 1; i >= 0; i--) {
            const t = this.tracers[i];
            t.timer -= dt;
            if (t.timer <= 0) {
                this.scene.remove(t.line);
                this.tracers.splice(i, 1);
            }
        }

        // Particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const pt = this.particles[i];
            pt.timer -= dt;
            pt.vel.y -= 12 * dt;
            pt.mesh.position.addScaledVector(pt.vel, dt);
            if (pt.timer <= 0) {
                this.scene.remove(pt.mesh);
                this.particles.splice(i, 1);
            }
        }

        // Grenades
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
        }
    }

    onRemotePlayerLeft(peerId) {
        const idx = this.entities.findIndex(e => e.id === peerId);
        if (idx !== -1) {
            const ent = this.entities[idx];
            if (ent.mesh) this.scene.remove(ent.mesh);
            this.addChatMessage(`👋 ${ent.name} ออกจากห้อง`, '#94a3b8');
            this.entities.splice(idx, 1);
        }
    }

    updateRemotePlayerState(peerId, data) {
        let ent = this.entities.find(e => e.id === peerId);
        if (!ent) {
            this.onRemotePlayerJoined(peerId, data.name, data.team, data.weapon);
            ent = this.entities.find(e => e.id === peerId);
        }
        if (ent) {
            ent.x = data.x;
            ent.y = data.y;
            ent.z = data.z;
            ent.yaw = data.yaw;
            ent.hp = data.hp;
            ent.weapon = data.weapon;
            if (ent.mesh) {
                ent.mesh.visible = ent.hp > 0;
                ent.mesh.position.set(ent.x, ent.y, ent.z);
                ent.mesh.rotation.y = ent.yaw;
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
            if (a.id === myId) continue;
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
                    x: a.x,
                    y: a.y,
                    z: a.z,
                    yaw: a.yaw,
                    hp: a.hp,
                    weapon: a.weapon,
                    kills: a.kills,
                    deaths: a.deaths,
                    mesh
                };
                this.entities.push(ent);
            } else {
                ent.x = a.x;
                ent.y = a.y;
                ent.z = a.z;
                ent.yaw = a.yaw;
                ent.hp = a.hp;
                ent.kills = a.kills;
                ent.deaths = a.deaths;
                if (ent.mesh) {
                    ent.mesh.visible = ent.hp > 0;
                    ent.mesh.position.set(ent.x, ent.y, ent.z);
                    ent.mesh.rotation.y = ent.yaw;
                }
            }
        }

        // Remove stale entities
        for (let i = this.entities.length - 1; i >= 0; i--) {
            if (!seenIds.has(this.entities[i].id)) {
                if (this.entities[i].mesh) this.scene.remove(this.entities[i].mesh);
                this.entities.splice(i, 1);
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
        if (data.targetId === 'HOST') {
            this.damageLocalPlayer(data.dmg, data.attacker, data.weapon, data.isHeadshot);
        } else {
            const target = this.entities.find(e => e.id === data.targetId);
            const attackerEnt = this.entities.find(e => e.id === peerId);
            if (target) {
                this.damageEntity(target, data.dmg, data.attacker, data.weapon, data.isHeadshot, attackerEnt);
            }
        }
    }

    // ==================== HUD & UI UPDATES ====================
    updateVitalsHUD() {
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

        // Update slot buttons
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

        // Mouse Look & Fire
        this.canvas.addEventListener('mousedown', (e) => {
            if (!this.running) return;
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
            e.preventDefault();
            const t = e.changedTouches[0];
            joyTouchId = t.identifier;
            updateJoystick(t.clientX, t.clientY);
        }, { passive: false });

        joyZone.addEventListener('touchmove', (e) => {
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

        // Right Look Zone (Touch Drag Aim)
        const lookZone = document.getElementById('look-zone');
        let lookTouchId = null;
        let lastLookX = 0;
        let lastLookY = 0;

        lookZone.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const t = e.changedTouches[0];
            lookTouchId = t.identifier;
            lastLookX = t.clientX;
            lastLookY = t.clientY;
        }, { passive: false });

        lookZone.addEventListener('touchmove', (e) => {
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

        // Mobile Action Buttons
        const bindHoldBtn = (id, onDown, onUp) => {
            const el = document.getElementById(id);
            if (!el) return;
            el.addEventListener('touchstart', (e) => { e.preventDefault(); el.classList.add('pressed'); onDown(); }, { passive: false });
            el.addEventListener('touchend', (e) => { e.preventDefault(); el.classList.remove('pressed'); if (onUp) onUp(); }, { passive: false });
            el.addEventListener('mousedown', (e) => { e.preventDefault(); onDown(); });
            el.addEventListener('mouseup', (e) => { e.preventDefault(); if (onUp) onUp(); });
        };

        bindHoldBtn('btn-fire-right', () => { this.touchFiring = true; this.shoot(); }, () => { this.touchFiring = false; });
        bindHoldBtn('btn-fire-left', () => { this.touchFiring = true; this.shoot(); }, () => { this.touchFiring = false; });
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
        // Team Select in Lobby
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

        // Quick Play / Start Match
        document.getElementById('btn-start-play').addEventListener('click', () => {
            this.startMatch();
        });

        // Host Online Room
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

        // Join Online Room
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

        // Top HUD Mini Buttons
        document.getElementById('btn-open-buy').addEventListener('click', () => this.toggleBuyMenu());
        document.getElementById('btn-close-buy').addEventListener('click', () => this.toggleBuyMenu(false));
        document.getElementById('btn-open-score').addEventListener('click', () => this.toggleScoreboard());
        document.getElementById('btn-close-score').addEventListener('click', () => this.toggleScoreboard(false));

        document.getElementById('btn-toggle-mobile').addEventListener('click', () => {
            this.mobileMode = !this.mobileMode;
            this.applyMobileModeUI();
        });

        document.getElementById('btn-toggle-autofire').addEventListener('click', () => {
            this.autoFireMobile = !this.autoFireMobile;
            document.getElementById('btn-toggle-autofire').textContent = this.autoFireMobile ? '🎯 ยิงออโต้: เปิด' : '🎯 ยิงออโต้: ปิด';
        });

        document.getElementById('btn-open-lobby').addEventListener('click', () => {
            if (document.pointerLockElement) document.exitPointerLock();
            document.getElementById('lobby-overlay').classList.remove('hidden');
        });

        // Weapon Slots Click
        for (let s = 1; s <= 4; s++) {
            document.getElementById(`slot-btn-${s}`).addEventListener('click', () => this.equipSlot(s));
        }

        // Chat Send
        document.getElementById('btn-send-chat').addEventListener('click', () => this.submitChat());

        this.populateBuyMenu();
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

    populateBuyMenu() {
        const grid = document.getElementById('buy-items-grid');
        grid.innerHTML = '';

        const items = [
            ...Object.values(WEAPONS).filter(w => w.price > 0),
            { id: 'armor', name: 'Kevlar + Helmet', type: 'เกราะกันกระสุน + หมวกเหล็ก (100 AP)', price: 1000, isEquipment: true },
            { id: 'ammo', name: 'Full Ammo Refill', type: 'เติมกระสุนเต็มทุกกระบอก', price: 200, isEquipment: true }
        ];

        for (const item of items) {
            const card = document.createElement('div');
            card.className = 'buy-card';
            card.innerHTML = `
                <div>
                    <div class="buy-card-title">${item.name}</div>
                    <div class="buy-card-type">${item.type}</div>
                </div>
                <div class="buy-card-price">$${item.price}</div>
            `;
            card.addEventListener('click', () => this.buyItem(item));
            grid.appendChild(card);
        }
    }

    buyItem(item) {
        if (this.player.money < item.price) {
            this.showAnnouncement('❌ เงินไม่พอสำหรับซื้อไอเทมนี้!', 1.5);
            return;
        }

        this.player.money -= item.price;

        if (item.id === 'armor') {
            this.player.armor = 100;
        } else if (item.id === 'ammo') {
            this.initAmmoForAll();
        } else {
            const wep = WEAPONS[item.id];
            this.player.slots[wep.slot] = wep.id;
            this.player.ammo[wep.id] = { clip: wep.clipSize, reserve: wep.reserveMax };
            this.equipSlot(wep.slot);
        }

        window.soundFX.playReload();
        this.updateVitalsHUD();
        this.updateWeaponHUD();
        this.toggleBuyMenu(false);
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

    renderScoreboardTable() {
        const tbody = document.getElementById('scoreboard-tbody');
        tbody.innerHTML = '';

        const all = [
            { name: this.player.name + ' (คุณ)', team: this.player.team, kills: this.player.kills, deaths: this.player.deaths, hp: this.player.hp },
            ...this.entities.map(e => ({ name: e.name, team: e.team, kills: e.kills || 0, deaths: e.deaths || 0, hp: e.hp }))
        ];

        all.sort((a, b) => b.kills - a.kills);

        for (const row of all) {
            const tr = document.createElement('tr');
            const teamColor = row.team === 'T' ? '#fbbf24' : '#38bdf8';
            tr.innerHTML = `
                <td style="color:${teamColor};font-weight:700;">${row.team}</td>
                <td>${row.name}</td>
                <td>${row.kills}</td>
                <td>${row.deaths}</td>
                <td>${row.hp > 0 ? `<span style="color:#34d399">${row.hp} HP</span>` : '<span style="color:#ef4444">DEAD</span>'}</td>
            `;
            tbody.appendChild(tr);
        }
    }
}

window.addEventListener('DOMContentLoaded', () => {
    window.csGame = new CSGame();
});
