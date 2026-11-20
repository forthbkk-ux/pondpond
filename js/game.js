// Core 3D Counter-Strike Engine (Realistic PBR Lighting + Host-Authoritative Score & Multiplayer Sync)

class CSGame {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.radarCanvas = document.getElementById('radar-canvas');
        this.radarCtx = this.radarCanvas.getContext('2d');

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x8a9ba8);
        this.scene.fog = new THREE.FogExp2(0xb5aa96, 0.0082);

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 550);
        this.scene.add(this.camera);

        // Dedicated crisp First-Person Viewmodel Scene & Camera (prevents wall clipping, removes 75deg FOV stretching & eliminates scene shader recompiles)
        this.vmScene = new THREE.Scene();
        this.vmCamera = new THREE.PerspectiveCamera(56, window.innerWidth / window.innerHeight, 0.03, 5);
        this.vmScene.add(this.vmCamera);

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
        this.mapId = 'de_dust2';
        this.map = new GameMap(this.scene, this.mapId, this);
        this.botAI = new BotAI(this);
        this.net = new NetworkManager(this);

        this.running = false;
        this.gameMode = 'tdm'; // Rich Elimination Mode ($50,000 always)
        this.botCount = 8;
        this.mobileMode = this.loadMobileModePref();
        this.autoFireMobile = this.loadMobileAutoFire();
        this.hudEditorReturnToLobby = false;
        this.lookSensitivity = 1.0;

        this.scores = { T: 0, CT: 0 };
        this.roundTime = 300;
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
            money: 50000,
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
        this.katanaEffects = [];
        this.knifeComboStep = 0;
        this.knifeAnim = null;
        this.bulletDecals = [];
        this.spentShells = [];
        this.gunSmokePuffs = [];
        this.bloodDecals = [];

        // Real-Time Dynamic Muzzle Flash Light (illuminates walls, barrels & hands)
        this.muzzleLight = new THREE.PointLight(0xffa726, 0, 16);
        this.scene.add(this.muzzleLight);

        // Tactical Viewmodel Sway, Weapon Bobbing & Recoil Physics
        this.weaponBobTimer = 0;
        this.weaponSwayX = 0;
        this.weaponSwayY = 0;
        this.targetSwayX = 0;
        this.targetSwayY = 0;
        this.weaponKickBack = 0;
        this.weaponKickPitch = 0;
        this.weaponKickRoll = 0;

        // Visceral Camera Aim Punch & Trauma Flinch
        this.cameraFlinchPitch = 0;
        this.cameraFlinchYaw = 0;
        this.cameraFlinchRoll = 0;

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
        this.roundRestartTimer = 0;

        this.initAmmoForAll();
        this.equipSlot(1);
        this.setupInputs();
        this.setupUIEvents();
        this.initPlayerNameConfig();
        this.setupHudLayoutEditor();
        this.loadHudLayout();
        this.applyMobileModeUI();

        this.lastTime = performance.now();
        requestAnimationFrame((t) => this.loop(t));

        // Background tab heartbeat so Host/Bots/Timers keep ticking only when tab is actually backgrounded
        setInterval(() => {
            if (this.running && document.hidden && performance.now() - this.lastTime > 250) {
                this.lastTime = performance.now();
                this.stepSimulation(0.1);
            }
        }, 120);
    }

    setupLights() {
        // Realistic atmospheric sky & ground bounce light + high-contrast directional sunlight
        const hemi = new THREE.HemisphereLight(0x8fa3b5, 0x6e604c, 0.48);
        hemi.position.set(0, 50, 0);
        this.scene.add(hemi);
        this.hemiLight = hemi;

        const ambient = new THREE.AmbientLight(0xe5dec9, 0.18);
        this.scene.add(ambient);
        this.ambientLight = ambient;

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
        this.sunLight = sun;

        // Permanent High-Contrast 3-Point Studio Lighting + Obsidian PMREM Reflection Environment on Viewmodel Scene
        const vmHemi = new THREE.HemisphereLight(0xd4e2f0, 0x262018, 0.42);
        const vmKey = new THREE.DirectionalLight(0xfff6e5, 1.85);
        vmKey.position.set(-1.6, 2.4, 1.1);
        const vmRim = new THREE.DirectionalLight(0x93c5fd, 1.35);
        vmRim.position.set(1.6, 1.4, -2.0);
        const vmFill = new THREE.DirectionalLight(0xfde68a, 0.24);
        vmFill.position.set(-1.8, -0.5, -0.4);
        this.vmScene.add(vmHemi, vmKey, vmRim, vmFill);

        if (THREE.PMREMGenerator) {
            try {
                const pmrem = new THREE.PMREMGenerator(this.renderer);
                pmrem.compileEquirectangularShader();
                const envScene = new THREE.Scene();
                // Dark studio ambient prevents chalky washed-out black/olive while narrow light strips create razor-sharp metallic edge streaks
                envScene.background = new THREE.Color(0x161d26);
                const topPanel = new THREE.Mesh(
                    new THREE.PlaneGeometry(10, 14),
                    new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide })
                );
                topPanel.position.set(-2, 10, 2);
                topPanel.lookAt(0, 0, 0);
                const warmPanel = new THREE.Mesh(
                    new THREE.PlaneGeometry(9, 6),
                    new THREE.MeshBasicMaterial({ color: 0xffe4b8, side: THREE.DoubleSide })
                );
                warmPanel.position.set(10, 4, -4);
                warmPanel.lookAt(0, 0, 0);
                const coolPanel = new THREE.Mesh(
                    new THREE.PlaneGeometry(9, 6),
                    new THREE.MeshBasicMaterial({ color: 0x93c5fd, side: THREE.DoubleSide })
                );
                coolPanel.position.set(-10, 5, -7);
                coolPanel.lookAt(0, 0, 0);
                const floorPanel = new THREE.Mesh(
                    new THREE.PlaneGeometry(24, 24),
                    new THREE.MeshBasicMaterial({ color: 0x1a1612, side: THREE.DoubleSide })
                );
                floorPanel.position.set(0, -8, 0);
                floorPanel.rotation.x = -Math.PI / 2;
                envScene.add(topPanel, warmPanel, coolPanel, floorPanel);
                const envRT = pmrem.fromScene(envScene, 0.025);
                this.vmScene.environment = envRT.texture;
                pmrem.dispose();
            } catch (e) {}
        }
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

    isAwpOnly() {
        return this.gameMode === 'awp_only';
    }

    isRichMode() {
        return this.gameMode === 'tdm' || this.gameMode === 'awp_only';
    }

    applyGameModeLoadout() {
        if (this.isAwpOnly()) {
            this.player.slots[1] = 'awp';
            this.player.slots[2] = null;
            this.player.slots[3] = null;
            this.player.slots[4] = null;
            if (this.player.ammo && this.player.ammo.hegrenade) {
                this.player.ammo.hegrenade.clip = 0;
                this.player.ammo.hegrenade.reserve = 0;
            }
            if (this.player.ammo && this.player.ammo.awp && WEAPONS.awp) {
                this.player.ammo.awp.clip = WEAPONS.awp.clipSize;
                this.player.ammo.awp.reserve = Math.max(this.player.ammo.awp.reserve || 0, WEAPONS.awp.reserveMax);
            }
        } else {
            this.player.slots[1] = this.player.team === 'T' ? 'ak47' : 'm4a1';
            this.player.slots[2] = 'pistol';
            this.player.slots[3] = 'knife';
            this.player.slots[4] = 'hegrenade';
        }
        this.populateBuyMenu('all');
    }

    equipSlot(slotNum) {
        if (this.isAwpOnly() && slotNum !== 1) {
            this.showAnnouncement('🔭 โหมด AWP Only: ใช้ได้เฉพาะปืน AWP เท่านั้น (ปืนพก/มีด/ระเบิด ปิดใช้งาน)!', 1.5);
            return;
        }
        const wepId = this.player.slots[slotNum];
        if (!wepId || !WEAPONS[wepId]) return;
        if (slotNum === 3) {
            this.knifeComboStep = 0;
            this.knifeAnim = null;
        }
        if (slotNum === 4) {
            const gAmmo = this.player.ammo.hegrenade;
            const totalG = gAmmo ? ((gAmmo.clip || 0) + (gAmmo.reserve || 0)) : 0;
            if (totalG <= 0) return;
            if (gAmmo.clip <= 0 && gAmmo.reserve > 0) {
                gAmmo.clip = 1;
                gAmmo.reserve--;
            }
        }

        this.spectatedWepId = null;
        this.player.currentSlot = slotNum;
        this.player.weaponId = wepId;
        this.player.reloading = false;
        this.setScope(false);

        if (this.weaponMesh) {
            this.vmCamera.remove(this.weaponMesh);
        }
        this.weaponMesh = createWeaponViewModel(wepId);
        this.vmCamera.add(this.weaponMesh);

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
        if (!this.validatePlayerName(false)) return;

        this.purgePlayerGhost(this.player.name, 'LOCAL');

        this.gameMode = document.getElementById('game-mode-select').value;
        this.botCount = parseInt(document.getElementById('bot-count-select').value, 10) || 0;
        const diffSel = document.getElementById('bot-diff-select');
        if (diffSel) {
            this.botAI.setDifficulty(diffSel.value);
            this.updateBotDiffHUD();
        }

        const mapSelect = document.getElementById('map-select');
        if (mapSelect && mapSelect.value) {
            this.mapId = mapSelect.value;
        }
        if (this.map.currentMapId !== this.mapId) {
            this.loadMap(this.mapId);
        } else {
            this.updateMapHUD();
        }

        document.getElementById('lobby-overlay').classList.add('hidden');
        document.getElementById('hud').classList.remove('hidden');
        this.applyMobileModeUI();

        this.running = true;
        this.scores = { T: 0, CT: 0 };
        this.player.kills = 0;
        this.player.deaths = 0;
        this.player.money = this.isRichMode() ? 50000 : 1000;
        this.initAmmoForAll();
        this.applyGameModeLoadout();

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
        const modeLabel = this.isAwpOnly() ? '🔭 AWP Only Mode (เฉพาะ AWP เท่านั้น)' : '💰 Rich Elimination Mode';
        this.addChatMessage(`🎮 ยินดีต้อนรับสู่ Counter-Strike Online! (${modeLabel}) — สมรภูมิ: ${this.getMapName(this.mapId)}`, '#fbbf24');
    }

    loadMap(mapId) {
        if (!window.MAP_METADATA || !window.MAP_METADATA[mapId]) mapId = 'de_dust2';
        this.mapId = mapId;
        if (!this.map) {
            this.map = new GameMap(this.scene, mapId, this);
        } else {
            this.map.load(mapId);
        }

        if (this.sunLight && this.sunLight.shadow && this.sunLight.shadow.camera && this.map) {
            const sd = Math.max(52, this.map.mapSize * 0.55);
            this.sunLight.shadow.camera.left = -sd;
            this.sunLight.shadow.camera.right = sd;
            this.sunLight.shadow.camera.top = sd;
            this.sunLight.shadow.camera.bottom = -sd;
            this.sunLight.shadow.camera.far = Math.max(170, this.map.mapSize * 1.4);
            this.sunLight.shadow.camera.updateProjectionMatrix();
        }

        this.updateMapHUD();

        // Sync dropdowns
        const mapSelect = document.getElementById('map-select');
        if (mapSelect && mapSelect.value !== mapId) mapSelect.value = mapId;
        const ingameMapSelect = document.getElementById('ingame-map-select');
        if (ingameMapSelect && ingameMapSelect.value !== mapId) ingameMapSelect.value = mapId;

        // If game is active, reset round & reposition entities
        if (this.running) {
            this.bombState = { planted: false, defused: false, exploded: false, timer: 0, x: 0, z: 0, planter: null };
            if (this.bombMesh) {
                this.scene.remove(this.bombMesh);
                this.bombMesh = null;
            }
            this.respawnLocalPlayer();
            if (!this.net.isClient) {
                this.setupBots();
                if (this.net.isHost) {
                    this.net.broadcast({
                        type: 'map_change',
                        mapId: this.mapId
                    });
                }
            }
            const meta = window.MAP_METADATA ? window.MAP_METADATA[mapId] : null;
            this.addChatMessage(`🗺️ เข้าสู่สมรภูมิใหม่: ${meta ? meta.name : mapId} (${meta ? meta.subtitle : ''})`, '#38bdf8');
        }
    }

    getMapName(mapId) {
        if (window.MAP_METADATA && window.MAP_METADATA[mapId]) {
            return window.MAP_METADATA[mapId].name;
        }
        return mapId || 'DE_DUST2';
    }

    updateMapHUD() {
        const tag = document.getElementById('map-name-tag');
        if (tag) {
            const meta = window.MAP_METADATA ? window.MAP_METADATA[this.mapId] : null;
            if (meta && meta.hudTag) {
                tag.textContent = meta.hudTag;
            } else {
                const suffix = (meta && meta.name && meta.name.includes('(New)')) ? ' (New)' : '';
                tag.textContent = (meta ? meta.id.toUpperCase() : (this.mapId ? this.mapId.toUpperCase() : 'DE_DUST2')) + suffix;
            }
        }
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
            const botWep = this.isAwpOnly() ? 'awp' : wepPool[i % wepPool.length];

            const mesh = createCharacterMesh(team, botName, team === this.player.team, botWep);
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
                armor: 100,
                weapon: botWep,
                kills: 0,
                deaths: 0,
                mesh,
                radarVisible: false
            });
        }
    }

    clearRespawnTimeouts() {
        if (this.roundEndTimeout) {
            clearTimeout(this.roundEndTimeout);
            this.roundEndTimeout = null;
        }
        if (this.respawnTimeouts) {
            for (const tid of this.respawnTimeouts) {
                clearTimeout(tid);
            }
        }
        this.respawnTimeouts = [];
    }

    startNewRound() {
        this.roundOver = false;
        this.roundRestartTimer = 0;
        this.clearRespawnTimeouts();
        this.roundTime = this.isRichMode() ? 300 : 115;
        this.clearPlantedBomb();

        this.respawnLocalPlayer();

        const nowMs = performance.now();
        this.entities.forEach((ent, idx) => {
            const spList = this.map.spawns[ent.team];
            const sp = spList[(idx + 1) % spList.length];
            ent.x = sp.x + (Math.random() - 0.5) * 1.2;
            ent.y = 0;
            ent.z = sp.z + (Math.random() - 0.5) * 1.2;
            ent.yaw = sp.yaw;
            ent.hp = 100;
            ent.armor = 100;
            ent.invincibleTimer = 2.0;
            ent.ignoreStateUntil = nowMs + 500;
            ent.targetWP = null;
            if (ent.mesh) {
                ent.mesh.visible = true;
                ent.mesh.position.set(ent.x, ent.y, ent.z);
                ent.mesh.rotation.y = ent.yaw;
            }
        });

        this.showAnnouncement('🔥 เริ่มรอบใหม่ที่ฐาน! (🛡️ อมตะเกิดใหม่ 2 วินาที)', 2.2);
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
        this.clearRespawnTimeouts();
        this.scores = data.scores;
        this.roundTime = data.roundTime;
        this.clearPlantedBomb();
        this.respawnLocalPlayer();
        this.showAnnouncement('🔥 เริ่มรอบใหม่ที่ฐาน! (🛡️ อมตะเกิดใหม่ 2 วินาที)', 2.2);
        this.updateScoreHUD();
        this.refreshScoreboardIfOpen();
    }

    onClientRoundEnd(data) {
        this.roundOver = true;
        this.clearRespawnTimeouts();
        this.scores = data.scores;
        this.updateScoreHUD();
        this.refreshScoreboardIfOpen();
        const won = this.player.team === data.winnerTeam;
        this.player.money = this.isRichMode() ? 50000 : Math.min(50000, this.player.money + (won ? 3250 : 1900));
        this.updateVitalsHUD();
        window.soundFX.playRoundEnd(won);
        this.showAnnouncement(data.reasonText, 3.2);
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
        this.equipArmor(100, false);
        this.player.invincibleTimer = 2.0; // 2-Second Spawn Protection Invincibility!
        this.player.reloading = false;
        if (this.isRichMode()) {
            this.player.money = 50000;
        }

        for (const k of Object.keys(this.player.ammo)) {
            if (k === 'hegrenade') {
                const g = this.player.ammo[k];
                if (this.isAwpOnly()) {
                    g.clip = 0;
                    g.reserve = 0;
                } else {
                    const total = Math.min(10, Math.max((g.clip || 0) + (g.reserve || 0), WEAPONS[k].clipSize + WEAPONS[k].reserveMax));
                    if (total > 0) {
                        g.clip = 1;
                        g.reserve = total - 1;
                    } else {
                        g.clip = 0;
                        g.reserve = 0;
                    }
                }
            } else {
                this.player.ammo[k].clip = WEAPONS[k].clipSize;
                this.player.ammo[k].reserve = Math.max(this.player.ammo[k].reserve || 0, WEAPONS[k].reserveMax);
            }
        }
        if (this.isAwpOnly()) {
            this.player.slots[1] = 'awp';
            this.player.slots[2] = null;
            this.player.slots[3] = null;
            this.player.slots[4] = null;
        }
        this.equipSlot(this.player.slots[1] ? 1 : 2);
        this.updateVitalsHUD();
        this.updateScoreHUD();
        this.refreshScoreboardIfOpen();
        this.showAnnouncement('🛡️ เกิดใหม่ที่ฐาน (อมตะ 2 วินาที!)', 2.0);

        if (this.net.isClient && this.net.hostConn && this.net.hostConn.open) {
            this.net.hostConn.send({
                type: 'state',
                id: this.net.peer.id,
                name: this.player.name,
                team: this.player.team,
                x: this.player.x,
                y: this.player.y,
                z: this.player.z,
                yaw: this.player.yaw,
                pitch: this.player.pitch,
                weapon: this.player.weaponId
            });
        }
    }

    shoot() {
        if (!this.running || this.player.hp <= 0 || this.player.reloading) return;
        if (this.player.fireCooldown > 0) return;
        if (this.isAwpOnly() && this.player.weaponId !== 'awp') {
            this.equipSlot(1);
            return;
        }

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

        let meleeStep = 0;
        const isKatana = (wep.id === 'knife');
        if (!isKatana) {
            if (ammoObj.clip <= 0) {
                this.reload();
                return;
            }
            ammoObj.clip--;
        } else {
            meleeStep = this.knifeComboStep || 0;
            this.knifeComboStep = (meleeStep + 1) % 3;
        }
        const isKatanaStab = isKatana && meleeStep === 2;

        this.player.fireCooldown = isKatana ? (isKatanaStab ? 0.42 : 0.30) : wep.fireRate;
        window.soundFX.playShoot(isKatana ? (isKatanaStab ? 'knife_stab' : 'knife_slash') : wep.id, 1.0);
        this.updateWeaponHUD();

        // Viewmodel recoil kick / Katana 3-hit combo animation + Muzzle Flash
        if (isKatana) {
            this.knifeAnim = {
                step: meleeStep,
                elapsed: 0,
                duration: isKatanaStab ? 0.36 : 0.28
            };
        } else if (this.weaponMesh) {
            this.weaponKickBack = Math.min(0.12, this.weaponKickBack + (wep.recoil * 5.5 + 0.045));
            this.weaponKickPitch = Math.min(0.20, this.weaponKickPitch + (wep.recoil * 6.5 + 0.055));
            this.weaponKickRoll = (Math.random() - 0.5) * 0.06;

            const flash = this.weaponMesh.getObjectByName('muzzleFlash');
            if (flash) {
                flash.visible = true;
                flash.rotation.z = Math.random() * Math.PI * 2;
                clearTimeout(this.flashTimeout);
                this.flashTimeout = setTimeout(() => { flash.visible = false; }, 40);
            }
        }

        const eyeHeight = this.player.crouching ? 1.05 : 1.62;
        const origin = new THREE.Vector3(this.player.x, this.player.y + eyeHeight, this.player.z);
        const forwardVec = new THREE.Vector3(0, 0, -1).applyEuler(new THREE.Euler(this.player.pitch, this.player.yaw, 0, 'YXZ'));
        const rightVec = new THREE.Vector3(1, 0, 0).applyEuler(new THREE.Euler(0, this.player.yaw, 0));
        const gunMuzzle = origin.clone().addScaledVector(forwardVec, 0.62).addScaledVector(rightVec, 0.18).add(new THREE.Vector3(0, -0.06, 0));

        if (!isKatana) {
            // Real-time Dynamic Muzzle Light flash in 3D world
            this.muzzleLight.position.copy(gunMuzzle);
            this.muzzleLight.intensity = 5.2;

            this.spawnShellCasing(wep.id);
            this.spawnGunSmoke(gunMuzzle);
        } else {
            this.spawnKatanaEffect(meleeStep, origin, forwardVec, rightVec);
        }

        const pellets = wep.pellets || 1;
        const effectiveRange = isKatanaStab ? (wep.range + 0.75) : wep.range;

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

            const ray = new THREE.Raycaster(origin, dir, 0.1, effectiveRange);

            const wallHits = ray.intersectObjects(this.map.shootableMeshes, false);
            let maxDist = effectiveRange;
            let endPoint = origin.clone().add(dir.clone().multiplyScalar(effectiveRange));

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
                if (isKatanaStab) dmg = Math.round(dmg * 1.45);
                if (isHeadshot) dmg = Math.round(dmg * wep.headshotMult);
                else if (part === 'leg') dmg = Math.round(dmg * 0.75);

                this.triggerHitmarker(isHeadshot);
                this.spawnImpactBlood(hit.point, dir, isHeadshot);

                if (this.net.isClient) {
                    this.net.sendHitClaim(targetEnt.id, dmg, wep.id, isHeadshot);
                } else {
                    this.damageEntity(targetEnt, dmg, this.player.name, wep.id, isHeadshot, this.player);
                }
            } else if (wallHits.length > 0 && !isKatana) {
                const norm = wallHits[0].face ? wallHits[0].face.normal : new THREE.Vector3(0, 1, 0);
                this.spawnEnvironmentImpact(endPoint, norm, wep.id, wallHits[0].object);
            }

            if (!isKatana) {
                this.spawnBulletTracer(gunMuzzle, endPoint);
                this.net.sendShoot(gunMuzzle, endPoint, wep.id);
            }
        }

        this.player.recoilPitch = Math.min(0.18, this.player.recoilPitch + wep.recoil);

        if (wep.id === 'awp' && this.player.isScoped) {
            this.setScope(false);
        }
        if (!isKatana && wep.id !== 'hegrenade' && ammoObj.clip <= 0 && ammoObj.reserve > 0 && !this.player.reloading) {
            this.reload();
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

        // 1. Massive fiery sparks and smoke burst
        for (let i = 0; i < 48; i++) {
            this.spawnImpactSparks(pos, i % 3 === 0 ? 0xef4444 : (i % 2 === 0 ? 0xf97316 : 0xfacc15), 10.0);
        }

        // 2. Camera screen shake if local player is nearby
        const distToPlayer = Math.hypot(this.player.x - pos.x, this.player.z - pos.z);
        if (distToPlayer < 24.0) {
            this.player.recoilPitch += Math.max(0.04, (1 - distToPlayer / 24.0) * 0.16);
        }

        // 3. Super high explosive power (radius 18.0m, direct blast 280 HP - instant lethal!)
        const radius = 18.0;
        const maxDamage = 280;

        for (const ent of this.entities) {
            if (ent.hp > 0 && ent.team !== this.player.team) {
                const dist = Math.hypot(ent.x - pos.x, ent.z - pos.z);
                if (dist < radius) {
                    const dmg = Math.round(maxDamage * Math.pow(1 - dist / radius, 1.2));
                    if (this.net.isClient) {
                        this.net.sendHitClaim(ent.id, dmg, 'hegrenade', false);
                    } else {
                        this.damageEntity(ent, dmg, this.player.name, 'hegrenade', false, this.player);
                    }
                }
            }
        }

        // Friendly or enemy blast hitting local player
        if (this.player.hp > 0 && g.owner && g.owner !== this.player && g.owner.team !== this.player.team) {
            if (distToPlayer < radius) {
                const dmg = Math.round(maxDamage * Math.pow(1 - distToPlayer / radius, 1.2));
                this.damageLocalPlayer(dmg, g.owner.name, 'hegrenade', false);
            }
        }
    }

    // ==================== HOST-AUTHORITATIVE DAMAGE & KILL TRACKING ====================
    /** Absorb 35% of incoming damage using armor for both local player and entities. */
    absorbDamageWithArmor(targetObj, dmg) {
        let actualDmg = dmg;
        const curArmor = typeof targetObj.armor === 'number' ? targetObj.armor : 0;
        if (curArmor > 0) {
            const absorbed = Math.min(curArmor, Math.round(dmg * 0.35));
            targetObj.armor = Math.max(0, curArmor - absorbed);
            actualDmg = Math.max(0, dmg - absorbed);
        }
        return actualDmg;
    }

    damageEntity(ent, dmg, attackerName, weaponId, isHeadshot, attackerObj = null) {
        if (ent.hp <= 0 || (ent.invincibleTimer && ent.invincibleTimer > 0)) return;
        const actualDmg = this.absorbDamageWithArmor(ent, dmg);
        ent.hp = Math.max(0, ent.hp - actualDmg);

        // Tactical: Spawn blood splatter and sound for bot-on-bot hits
        if (attackerObj !== this.player && this.spawnImpactBlood && ent.mesh) {
            const hitPos = new THREE.Vector3(ent.x, ent.y + (isHeadshot ? 1.6 : 1.1), ent.z);
            const dir = attackerObj ? new THREE.Vector3(ent.x - attackerObj.x, 0, ent.z - attackerObj.z).normalize() : new THREE.Vector3(0, 0, 1);
            this.spawnImpactBlood(hitPos, dir, isHeadshot);
            const floorY = this.getFloorHeight(ent.x, ent.y, ent.z);
            this.spawnBulletDecal(new THREE.Vector3(ent.x, floorY, ent.z), new THREE.Vector3(0, 1, 0), 'blood');
        }

        // If target is a remote client connected to Host, send authoritative HP, Armor & damage flash
        if (this.net.isHost && !ent.isBot) {
            this.net.sendToPeer(ent.id, {
                type: 'damage_you',
                dmg: actualDmg,
                newHp: ent.hp,
                newArmor: ent.armor,
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
                    this.player.money = this.isRichMode() ? 50000 : Math.min(50000, this.player.money + 300);
                    this.updateVitalsHUD();
                } else {
                    killerId = attackerObj.id;
                }
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

            if (!this.net.isClient) {
                this.checkRoundWinCondition();
            }
        }
    }

    damageLocalPlayer(dmg, attackerName, weaponId, isHeadshot, attackerObj = null) {
        if (this.player.hp <= 0 || (this.player.invincibleTimer && this.player.invincibleTimer > 0)) return;

        const actualDmg = this.absorbDamageWithArmor(this.player, dmg);
        this.player.hp = Math.max(0, this.player.hp - actualDmg);
        this.updateVitalsHUD();

        window.soundFX.playImpactFlesh(isHeadshot);
        this.triggerAimPunch(actualDmg, attackerObj);
        this.triggerThreatIndicator(attackerObj);

        const flash = document.getElementById('damage-flash');
        if (flash) {
            flash.style.opacity = '1';
            setTimeout(() => { flash.style.opacity = '0'; }, 160);
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

            this.addKillfeed(attackerName, this.player.name, weaponId, isHeadshot);
            this.showAnnouncement(`💀 คุณถูกสังหารโดย ${attackerName}! (กำลังดูเพื่อนร่วมทีม - รอจบรอบเพื่อเริ่มใหม่)`, 3.0);
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

            if (!this.net.isClient) {
                this.checkRoundWinCondition();
            }
        }
    }

    onClientDamagedByHost(data) {
        if (this.player.hp <= 0 || (this.player.invincibleTimer && this.player.invincibleTimer > 0)) return;
        this.player.hp = Math.max(0, data.newHp !== undefined ? data.newHp : (this.player.hp - data.dmg));
        if (data.newArmor !== undefined) {
            this.player.armor = Math.max(0, data.newArmor);
        }
        this.updateVitalsHUD();

        this.triggerAimPunch(data.dmg || 25, null);
        this.triggerThreatIndicator(null);

        const flash = document.getElementById('damage-flash');
        if (flash) {
            flash.style.opacity = '1';
            setTimeout(() => { flash.style.opacity = '0'; }, 160);
        }

        if (this.player.hp <= 0) {
            this.setScope(false);
            this.showAnnouncement(`💀 คุณถูกสังหารโดย ${data.attacker}! (กำลังดูเพื่อนร่วมทีม - รอจบรอบเพื่อเริ่มใหม่)`, 3.0);
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
            this.player.money = this.isRichMode() ? 50000 : Math.min(50000, this.player.money + 300);
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
        if (this.roundOver) return;

        let tAlive = (this.player.team === 'T' && this.player.hp > 0) ? 1 : 0;
        let ctAlive = (this.player.team === 'CT' && this.player.hp > 0) ? 1 : 0;
        let tTotal = (this.player.team === 'T') ? 1 : 0;
        let ctTotal = (this.player.team === 'CT') ? 1 : 0;

        const seenNames = new Set([this.player.name]);
        for (const ent of this.entities) {
            if (ent.name === this.player.name || seenNames.has(ent.name)) continue;
            seenNames.add(ent.name);
            if (ent.team === 'T') {
                tTotal++;
                if (ent.hp > 0) tAlive++;
            } else {
                ctTotal++;
                if (ent.hp > 0) ctAlive++;
            }
        }

        // Trigger team-wipe immediately whenever all members of either team are dead
        if (tTotal > 0 && tAlive === 0) {
            this.endRound('CT', '🛡️ COUNTER-TERRORISTS WIN! (ตายครบทุกคน - เริ่มรอบใหม่ที่ฐาน)');
        } else if (ctTotal > 0 && ctAlive === 0) {
            this.endRound('T', '💣 TERRORISTS WIN! (ตายครบทุกคน - เริ่มรอบใหม่ที่ฐาน)');
        }
    }

    endRound(winnerTeam, reasonText) {
        if (this.roundOver) return;
        this.roundOver = true;
        this.clearRespawnTimeouts();
        this.roundRestartTimer = 2.6;
        this.scores[winnerTeam]++;
        this.updateScoreHUD();
        this.refreshScoreboardIfOpen();

        const won = this.player.team === winnerTeam;
        this.player.money = this.isRichMode() ? 50000 : Math.min(50000, this.player.money + (won ? 3250 : 1900));
        this.updateVitalsHUD();

        window.soundFX.playRoundEnd(won);
        this.showAnnouncement(reasonText, 2.6);

        if (this.net.isHost) {
            this.net.broadcast({
                type: 'round_end',
                winnerTeam,
                reasonText,
                scores: this.scores
            });
        }

        this.roundEndTimeout = setTimeout(() => {
            if (this.running && !this.net.isClient && this.roundOver) {
                this.startNewRound();
            }
        }, 2700);
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

    // ==================== REALISTIC TACTICAL & MILITARY VISUAL EFFECTS ====================
    spawnBulletTracer(start, end, colorHex = 0xfef08a) {
        const mat = new THREE.LineBasicMaterial({ color: colorHex, transparent: true, opacity: 0.92 });
        const geo = new THREE.BufferGeometry().setFromPoints([start, end]);
        const line = new THREE.Line(geo, mat);
        this.scene.add(line);
        this.tracers.push({ line, timer: 0.055 });
    }

    spawnShellCasing(weaponId) {
        const isShotgun = (weaponId === 'nova' || weaponId === 'sawedoff' || weaponId === 'mag7' || weaponId === 'shotgun' || weaponId === 'spas12');
        const eyeH = this.player.crouching ? 1.05 : 1.62;
        const origin = new THREE.Vector3(this.player.x, this.player.y + eyeH, this.player.z);
        const forward = new THREE.Vector3(0, 0, -1).applyEuler(new THREE.Euler(this.player.pitch, this.player.yaw, 0, 'YXZ'));
        const right = new THREE.Vector3(1, 0, 0).applyEuler(new THREE.Euler(0, this.player.yaw, 0));
        const up = new THREE.Vector3(0, 1, 0);

        const pos = origin.clone().addScaledVector(right, 0.22).addScaledVector(forward, 0.30).add(new THREE.Vector3(0, -0.06, 0));

        let mesh;
        if (isShotgun) {
            const shellGeo = new THREE.CylinderGeometry(0.011, 0.011, 0.046, 8);
            const shellMat = new THREE.MeshStandardMaterial({ color: 0xb91c1c, roughness: 0.35, metalness: 0.25 });
            mesh = new THREE.Mesh(shellGeo, shellMat);
        } else {
            const brassGeo = new THREE.CylinderGeometry(0.007, 0.007, 0.032, 8);
            const brassMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.22, metalness: 0.94 });
            mesh = new THREE.Mesh(brassGeo, brassMat);
        }
        mesh.position.copy(pos);
        mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
        this.scene.add(mesh);

        const vel = right.clone().multiplyScalar(2.6 + Math.random() * 1.0)
            .add(up.clone().multiplyScalar(1.6 + Math.random() * 0.8))
            .add(forward.clone().multiplyScalar(-(0.3 + Math.random() * 0.4)));

        const rotVel = new THREE.Vector3(
            (Math.random() - 0.5) * 32,
            (Math.random() - 0.5) * 32,
            (Math.random() - 0.5) * 32
        );

        this.spentShells.push({
            mesh,
            vel,
            rotVel,
            bounces: 0,
            timer: 3.0
        });

        if (this.spentShells.length > 35) {
            const old = this.spentShells.shift();
            this.scene.remove(old.mesh);
        }
    }

    spawnGunSmoke(muzzlePos) {
        const geo = new THREE.SphereGeometry(0.065, 6, 6);
        const mat = new THREE.MeshBasicMaterial({ color: 0xd6d3d1, transparent: true, opacity: 0.38, depthWrite: false });
        const smoke = new THREE.Mesh(geo, mat);
        smoke.position.copy(muzzlePos);
        this.scene.add(smoke);

        this.gunSmokePuffs.push({
            mesh: smoke,
            vel: new THREE.Vector3((Math.random() - 0.5) * 0.25, 0.42 + Math.random() * 0.25, (Math.random() - 0.5) * 0.25),
            timer: 1.1,
            maxTimer: 1.1,
            initialOpacity: 0.38
        });

        if (this.gunSmokePuffs.length > 25) {
            const old = this.gunSmokePuffs.shift();
            this.scene.remove(old.mesh);
        }
    }

    getDecalTexture(type) {
        if (!this._decalTexCache) this._decalTexCache = {};
        if (this._decalTexCache[type]) return this._decalTexCache[type];

        const canvas = document.createElement('canvas');
        canvas.width = 128;
        canvas.height = 128;
        const ctx = canvas.getContext('2d');

        if (type === 'blood') {
            ctx.fillStyle = '#880808';
            ctx.beginPath();
            ctx.arc(64, 64, 26, 0, Math.PI * 2);
            ctx.fill();
            for (let i = 0; i < 18; i++) {
                const angle = Math.random() * Math.PI * 2;
                const dist = 22 + Math.random() * 36;
                const r = 3 + Math.random() * 8;
                ctx.fillStyle = i % 2 === 0 ? '#6b0707' : '#991b1b';
                ctx.beginPath();
                ctx.arc(64 + Math.cos(angle) * dist, 64 + Math.sin(angle) * dist, r, 0, Math.PI * 2);
                ctx.fill();
            }
        } else if (type === 'metal') {
            ctx.fillStyle = '#f59e0b';
            ctx.beginPath();
            ctx.arc(64, 64, 14, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#1c1917';
            ctx.beginPath();
            ctx.arc(64, 64, 8, 0, Math.PI * 2);
            ctx.fill();
        } else {
            // Concrete crater with powder burn & cracked radial lines
            ctx.fillStyle = 'rgba(28, 25, 23, 0.75)';
            ctx.beginPath();
            ctx.arc(64, 64, 24, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#0a0a0a';
            ctx.beginPath();
            ctx.arc(64, 64, 10, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#1c1917';
            ctx.lineWidth = 2.5;
            for (let a = 0; a < 6; a++) {
                const angle = a * Math.PI / 3 + (Math.random() - 0.5) * 0.4;
                ctx.beginPath();
                ctx.moveTo(64, 64);
                ctx.lineTo(64 + Math.cos(angle) * 44, 64 + Math.sin(angle) * 44);
                ctx.stroke();
            }
        }

        const tex = new THREE.CanvasTexture(canvas);
        this._decalTexCache[type] = tex;
        return tex;
    }

    spawnBulletDecal(point, normal, type = 'concrete') {
        const size = type === 'blood' ? 0.38 : (type === 'metal' ? 0.08 : 0.12);
        const geo = new THREE.PlaneGeometry(size, size);
        const mat = new THREE.MeshBasicMaterial({
            map: this.getDecalTexture(type),
            transparent: true,
            opacity: type === 'blood' ? 0.88 : 0.85,
            depthWrite: false,
            polygonOffset: true,
            polygonOffsetFactor: -4
        });
        const decal = new THREE.Mesh(geo, mat);
        decal.position.copy(point).addScaledVector(normal, 0.015);
        decal.lookAt(point.clone().add(normal));
        this.scene.add(decal);

        this.bulletDecals.push(decal);
        if (this.bulletDecals.length > 60) {
            const old = this.bulletDecals.shift();
            this.scene.remove(old);
            if (old.geometry) old.geometry.dispose();
            if (old.material) old.material.dispose();
        }
    }

    spawnImpactBlood(point, bulletDir, isHeadshot = false) {
        const count = isHeadshot ? 28 : 16;
        const bloodColor = 0x880808;

        // 1. High-velocity arterial blood droplet spray
        for (let i = 0; i < count; i++) {
            const dropGeo = new THREE.SphereGeometry(0.026 + Math.random() * 0.016, 5, 5);
            const dropMat = new THREE.MeshBasicMaterial({ color: bloodColor });
            const drop = new THREE.Mesh(dropGeo, dropMat);
            drop.position.copy(point);
            this.scene.add(drop);

            const sprayDir = bulletDir.clone().negate().multiplyScalar(1.8 + Math.random() * 2.2)
                .add(new THREE.Vector3((Math.random() - 0.5) * 2.8, (Math.random() - 0.3) * 2.8, (Math.random() - 0.5) * 2.8));

            this.particles.push({
                mesh: drop,
                vel: sprayDir,
                timer: 0.40 + Math.random() * 0.25,
                isBlood: true
            });
        }

        // 2. Atmospheric lingering blood mist cloud
        for (let m = 0; m < (isHeadshot ? 3 : 2); m++) {
            const mistGeo = new THREE.SphereGeometry(0.18, 6, 6);
            const mistMat = new THREE.MeshBasicMaterial({ color: 0x7f1d1d, transparent: true, opacity: 0.58 });
            const mist = new THREE.Mesh(mistGeo, mistMat);
            mist.position.copy(point);
            this.scene.add(mist);
            this.particles.push({
                mesh: mist,
                vel: new THREE.Vector3((Math.random() - 0.5) * 0.6, 0.25 + Math.random() * 0.4, (Math.random() - 0.5) * 0.6),
                timer: 0.45,
                maxTimer: 0.45,
                isDust: true
            });
        }

        // 3. If headshot: spawn helmet ricochet sparks + helmet ping audio
        if (isHeadshot) {
            window.soundFX.playImpactFlesh(true);
            for (let s = 0; s < 10; s++) {
                const sGeo = new THREE.BoxGeometry(0.02, 0.02, 0.06);
                const sMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
                const spk = new THREE.Mesh(sGeo, sMat);
                spk.position.copy(point);
                this.scene.add(spk);
                this.particles.push({
                    mesh: spk,
                    vel: new THREE.Vector3((Math.random() - 0.5) * 4, Math.random() * 3 + 1, (Math.random() - 0.5) * 4),
                    timer: 0.22 + Math.random() * 0.12,
                    isSpark: true
                });
            }
        } else {
            window.soundFX.playImpactFlesh(false);
        }

        // 4. Project persistent blood puddle decal onto floor
        const floorY = this.getFloorHeight(point.x, point.y, point.z);
        if (point.y - floorY < 3.0) {
            this.spawnBulletDecal(new THREE.Vector3(point.x + (Math.random() - 0.5) * 0.4, floorY, point.z + (Math.random() - 0.5) * 0.4), new THREE.Vector3(0, 1, 0), 'blood');
        }
    }

    spawnEnvironmentImpact(point, normal, wepId, hitObject) {
        let isMetal = false;
        let isWood = false;

        if (hitObject) {
            if (hitObject.userData && hitObject.userData.isCrate) isWood = true;
            if (hitObject.geometry && (hitObject.geometry.type === 'CylinderGeometry')) isMetal = true;
        }

        if (isMetal) {
            window.soundFX.playImpactMetal();
            for (let i = 0; i < 14; i++) {
                const geo = new THREE.BoxGeometry(0.025, 0.025, 0.08);
                const mat = new THREE.MeshBasicMaterial({ color: i % 2 === 0 ? 0xfef08a : 0xf97316 });
                const spark = new THREE.Mesh(geo, mat);
                spark.position.copy(point).addScaledVector(normal, 0.02);
                this.scene.add(spark);
                const spread = new THREE.Vector3((Math.random() - 0.5) * 3, Math.random() * 2.5 + 1.2, (Math.random() - 0.5) * 3);
                const vel = normal.clone().multiplyScalar(3.5).add(spread);
                this.particles.push({ mesh: spark, vel, timer: 0.28 + Math.random() * 0.15, isSpark: true });
            }
            this.spawnBulletDecal(point, normal, 'metal');
        } else if (isWood) {
            window.soundFX.playImpactConcrete();
            for (let i = 0; i < 8; i++) {
                const geo = new THREE.BoxGeometry(0.015, 0.015, 0.09);
                const mat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.9 });
                const splinter = new THREE.Mesh(geo, mat);
                splinter.position.copy(point).addScaledVector(normal, 0.02);
                this.scene.add(splinter);
                const vel = normal.clone().multiplyScalar(2.0).add(new THREE.Vector3((Math.random() - 0.5) * 2.5, Math.random() * 2.2, (Math.random() - 0.5) * 2.5));
                this.particles.push({ mesh: splinter, vel, timer: 0.45 + Math.random() * 0.2 });
            }
            this.spawnBulletDecal(point, normal, 'wood');
        } else {
            // Concrete / Stone Wall
            window.soundFX.playImpactConcrete();
            for (let i = 0; i < 3; i++) {
                const dustGeo = new THREE.SphereGeometry(0.12, 6, 6);
                const dustMat = new THREE.MeshBasicMaterial({ color: 0xd1d5db, transparent: true, opacity: 0.65 });
                const dust = new THREE.Mesh(dustGeo, dustMat);
                dust.position.copy(point).addScaledVector(normal, 0.04);
                this.scene.add(dust);
                this.particles.push({
                    mesh: dust,
                    vel: normal.clone().multiplyScalar(1.2).add(new THREE.Vector3((Math.random() - 0.5) * 0.8, Math.random() * 0.9, (Math.random() - 0.5) * 0.8)),
                    timer: 0.45,
                    maxTimer: 0.45,
                    isDust: true
                });
            }
            for (let i = 0; i < 6; i++) {
                const chipGeo = new THREE.BoxGeometry(0.035, 0.035, 0.035);
                const chipMat = new THREE.MeshStandardMaterial({ color: 0x9ca3af, roughness: 0.95 });
                const chip = new THREE.Mesh(chipGeo, chipMat);
                chip.position.copy(point).addScaledVector(normal, 0.02);
                this.scene.add(chip);
                this.particles.push({
                    mesh: chip,
                    vel: normal.clone().multiplyScalar(2.2).add(new THREE.Vector3((Math.random() - 0.5) * 2.0, Math.random() * 2.0, (Math.random() - 0.5) * 2.0)),
                    timer: 0.4 + Math.random() * 0.2
                });
            }
            this.spawnBulletDecal(point, normal, 'concrete');
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

    triggerAimPunch(dmg, attackerObj) {
        const punchMag = Math.min(0.24, (dmg / 100) * 0.32 + 0.06);
        this.cameraFlinchPitch = -punchMag * (0.85 + Math.random() * 0.4);
        this.cameraFlinchRoll = (Math.random() - 0.5) * punchMag * 1.4;
        this.cameraFlinchYaw = (Math.random() - 0.5) * punchMag * 0.8;

        this.weaponKickBack = Math.min(0.14, this.weaponKickBack + punchMag * 0.45);
        this.weaponKickRoll += (Math.random() - 0.5) * 0.12;
    }

    triggerThreatIndicator(attackerObj) {
        const ind = document.getElementById('directional-damage-indicator');
        if (!ind) return;

        let targetAngle = 0;
        if (attackerObj && attackerObj.x !== undefined) {
            const dx = attackerObj.x - this.player.x;
            const dz = attackerObj.z - this.player.z;
            const worldAngle = Math.atan2(dx, dz);
            targetAngle = (worldAngle - this.player.yaw) * 180 / Math.PI;
        }

        ind.style.transform = `rotate(${targetAngle}deg)`;
        ind.style.opacity = '1';
        clearTimeout(this.threatTimeout);
        this.threatTimeout = setTimeout(() => {
            ind.style.opacity = '0';
        }, 450);
    }

    triggerHitmarker(isHeadshot) {
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
    stepSimulation(dt) {
        if (!this.running) return;
        this.updatePlayer(dt);
        if (!this.net.isClient) {
            this.botAI.update(dt);
            this.updateRoundAndBomb(dt);
        }
        this.updateEffects(dt);
        this.net.update(dt);
        this.map.drawRadar(this.radarCtx, 130, 130, this.player, this.entities, this.bombState);
    }

    loop(now) {
        const dt = Math.min(0.1, (now - this.lastTime) / 1000);
        this.lastTime = now;

        if (this.running) {
            this.stepSimulation(dt);
        }

        this.renderer.render(this.scene, this.camera);
        if (this.vmScene && this.vmCamera && this.weaponMesh && this.weaponMesh.visible) {
            this.renderer.autoClear = false;
            this.renderer.clearDepth();
            this.renderer.render(this.vmScene, this.vmCamera);
            this.renderer.autoClear = true;
        }
        requestAnimationFrame((t) => this.loop(t));
    }

    updatePlayer(dt) {
        const p = this.player;
        if (p.hp <= 0) {
            this.updateSpectator(dt);
            return;
        }

        if (p.invincibleTimer > 0) {
            p.invincibleTimer = Math.max(0, p.invincibleTimer - dt);
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

        // Visceral Camera Flinch & Aim Punch Recovery
        this.cameraFlinchPitch = THREE.MathUtils.lerp(this.cameraFlinchPitch, 0, dt * 12);
        this.cameraFlinchYaw = THREE.MathUtils.lerp(this.cameraFlinchYaw, 0, dt * 12);
        this.cameraFlinchRoll = THREE.MathUtils.lerp(this.cameraFlinchRoll, 0, dt * 12);

        const eyeH = p.crouching ? 1.05 : 1.62;
        this.camera.position.set(p.x, p.y + eyeH, p.z);
        this.camera.rotation.order = 'YXZ';
        this.camera.rotation.y = p.yaw + this.cameraFlinchYaw;
        this.camera.rotation.x = Math.max(-1.45, Math.min(1.45, p.pitch + p.recoilPitch + this.cameraFlinchPitch));
        this.camera.rotation.z = this.cameraFlinchRoll;

        // Tactical Weapon Viewmodel Physics (Breathing Sway, Walk Bobbing & Recoil Spring)
        this.weaponKickBack = THREE.MathUtils.lerp(this.weaponKickBack, 0, dt * 16);
        this.weaponKickPitch = THREE.MathUtils.lerp(this.weaponKickPitch, 0, dt * 14);
        this.weaponKickRoll = THREE.MathUtils.lerp(this.weaponKickRoll, 0, dt * 14);

        this.targetSwayX = THREE.MathUtils.lerp(this.targetSwayX, 0, dt * 10);
        this.targetSwayY = THREE.MathUtils.lerp(this.targetSwayY, 0, dt * 10);
        this.weaponSwayX = THREE.MathUtils.lerp(this.weaponSwayX, this.targetSwayX, dt * 14);
        this.weaponSwayY = THREE.MathUtils.lerp(this.weaponSwayY, this.targetSwayY, dt * 14);

        const isMoving = movingSpeed > 0.8 && p.onGround;
        this.weaponBobTimer += dt * (isMoving ? 10.5 : 2.2);

        const bobX = Math.sin(this.weaponBobTimer * 0.5) * (isMoving ? 0.016 : 0.0035);
        const bobY = Math.abs(Math.sin(this.weaponBobTimer)) * (isMoving ? 0.015 : 0.003);
        const bobRotZ = Math.sin(this.weaponBobTimer * 0.5) * (isMoving ? 0.035 : 0.006);

        if (this.knifeAnim) {
            this.knifeAnim.elapsed += dt;
            if (this.knifeAnim.elapsed >= this.knifeAnim.duration || p.weaponId !== 'knife') {
                this.knifeAnim = null;
            }
        }

        if (this.weaponMesh && !p.reloading) {
            if (p.weaponId === 'knife') {
                let targetX = 0.24 + bobX + this.weaponSwayX;
                let targetY = -0.22 - bobY + this.weaponSwayY;
                let targetZ = -0.44;
                let targetRx = 0.24;
                let targetRy = 0.16 + this.weaponSwayX * 0.8;
                let targetRz = -0.22 + bobRotZ;

                if (this.knifeAnim) {
                    const t = Math.min(1, this.knifeAnim.elapsed / this.knifeAnim.duration);
                    const step = this.knifeAnim.step;
                    if (step === 0) {
                        // Hit 1: High-right wind-up -> Sweeping diagonal slash right-to-left
                        if (t < 0.25) {
                            const k = t / 0.25;
                            targetX += 0.12 * k; targetY += 0.11 * k; targetZ += 0.04 * k;
                            targetRx += 0.16 * k; targetRy -= 0.34 * k; targetRz -= 0.45 * k;
                        } else if (t < 0.65) {
                            const k = (t - 0.25) / 0.40;
                            targetX += 0.12 - 0.56 * k; targetY += 0.11 - 0.20 * k; targetZ += 0.04 - 0.10 * k;
                            targetRx += 0.16 - 0.38 * k; targetRy += -0.34 + 1.24 * k; targetRz += -0.45 + 1.52 * k;
                        } else {
                            const k = 1 - (t - 0.65) / 0.35;
                            targetX -= 0.44 * k; targetY -= 0.09 * k; targetZ -= 0.06 * k;
                            targetRx -= 0.22 * k; targetRy += 0.90 * k; targetRz += 1.07 * k;
                        }
                    } else if (step === 1) {
                        // Hit 2: Left backhand wind-up -> Sweeping reverse slash left-to-right
                        if (t < 0.25) {
                            const k = t / 0.25;
                            targetX -= 0.44 * k; targetY -= 0.05 * k; targetZ += 0.04 * k;
                            targetRx -= 0.14 * k; targetRy += 0.78 * k; targetRz += 1.15 * k;
                        } else if (t < 0.65) {
                            const k = (t - 0.25) / 0.40;
                            targetX += -0.44 + 0.58 * k; targetY += -0.05 + 0.16 * k; targetZ += 0.04 - 0.08 * k;
                            targetRx += -0.14 + 0.34 * k; targetRy += 0.78 - 1.38 * k; targetRz += 1.15 - 1.78 * k;
                        } else {
                            const k = 1 - (t - 0.65) / 0.35;
                            targetX += 0.14 * k; targetY += 0.11 * k; targetZ -= 0.04 * k;
                            targetRx += 0.20 * k; targetRy -= 0.60 * k; targetRz -= 0.63 * k;
                        }
                    } else {
                        // Hit 3: Level blade forward along -Z -> Explosive forward thrust / stab
                        if (t < 0.22) {
                            const k = t / 0.22;
                            targetX -= 0.10 * k; targetY += 0.05 * k; targetZ += 0.18 * k;
                            targetRx -= 0.20 * k; targetRy -= 0.08 * k; targetRz += 0.16 * k;
                        } else if (t < 0.56) {
                            const k = (t - 0.22) / 0.34;
                            targetX -= 0.10 + 0.08 * k; targetY += 0.05 + 0.03 * k; targetZ += 0.18 - 0.38 * k;
                            targetRx -= 0.20 + 0.02 * k; targetRy -= 0.08 + 0.04 * k; targetRz += 0.16;
                        } else {
                            const k = 1 - (t - 0.56) / 0.44;
                            targetX -= 0.18 * k; targetY += 0.08 * k; targetZ -= 0.20 * k;
                            targetRx -= 0.22 * k; targetRy -= 0.12 * k; targetRz += 0.16 * k;
                        }
                    }
                    this.weaponMesh.position.set(targetX, targetY, targetZ);
                    this.weaponMesh.rotation.set(targetRx, targetRy, targetRz);
                } else {
                    this.weaponMesh.position.x = THREE.MathUtils.lerp(this.weaponMesh.position.x, targetX, dt * 16);
                    this.weaponMesh.position.y = THREE.MathUtils.lerp(this.weaponMesh.position.y, targetY, dt * 16);
                    this.weaponMesh.position.z = THREE.MathUtils.lerp(this.weaponMesh.position.z, targetZ, dt * 16);
                    this.weaponMesh.rotation.x = THREE.MathUtils.lerp(this.weaponMesh.rotation.x, targetRx, dt * 16);
                    this.weaponMesh.rotation.y = THREE.MathUtils.lerp(this.weaponMesh.rotation.y, targetRy, dt * 16);
                    this.weaponMesh.rotation.z = THREE.MathUtils.lerp(this.weaponMesh.rotation.z, targetRz, dt * 16);
                }
            } else {
                const baseX = p.isScoped ? 0 : 0.24;
                const baseY = p.isScoped ? -0.14 : -0.19;
                const baseZ = p.isScoped ? -0.25 : -0.52;

                this.weaponMesh.position.x = THREE.MathUtils.lerp(this.weaponMesh.position.x, baseX + bobX + this.weaponSwayX, dt * 14);
                this.weaponMesh.position.y = THREE.MathUtils.lerp(this.weaponMesh.position.y, baseY - bobY + this.weaponSwayY, dt * 14);
                this.weaponMesh.position.z = THREE.MathUtils.lerp(this.weaponMesh.position.z, baseZ + this.weaponKickBack, dt * 18);

                this.weaponMesh.rotation.x = THREE.MathUtils.lerp(this.weaponMesh.rotation.x, 0.025 + this.weaponKickPitch, dt * 16);
                this.weaponMesh.rotation.y = THREE.MathUtils.lerp(this.weaponMesh.rotation.y, 0.115 + this.weaponSwayX * 0.8, dt * 14);
                this.weaponMesh.rotation.z = THREE.MathUtils.lerp(this.weaponMesh.rotation.z, bobRotZ + this.weaponKickRoll, dt * 14);
            }
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
            if (specName) specName.textContent = 'ไม่มีเพื่อนร่วมทีมที่ยังมีชีวิต (กำลังเริ่มรอบใหม่...)';
            if (this.weaponMesh) this.weaponMesh.visible = false;

            // Smooth overview camera above map using clean YXZ Euler rotation
            this.spectateOrbitAngle += dt * 0.25;
            const camX = Math.sin(this.spectateOrbitAngle) * 24;
            const camZ = Math.cos(this.spectateOrbitAngle) * 24;
            this.camera.position.set(camX, 18, camZ);
            this.camera.rotation.order = 'YXZ';
            this.camera.rotation.y = this.spectateOrbitAngle;
            this.camera.rotation.x = -0.58;
            this.camera.rotation.z = 0;
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
            // First-Person Teammate POV + Show Teammate's Weapon Viewmodel
            if (target.mesh) target.mesh.visible = false;
            const tWepId = target.weapon || 'ak47';
            if (this.spectatedWepId !== tWepId) {
                this.spectatedWepId = tWepId;
                if (this.weaponMesh) this.vmCamera.remove(this.weaponMesh);
                this.weaponMesh = createWeaponViewModel(tWepId);
                this.vmCamera.add(this.weaponMesh);
            }
            if (this.weaponMesh) this.weaponMesh.visible = true;

            this.camera.position.x = THREE.MathUtils.lerp(this.camera.position.x, target.x, dt * 16);
            this.camera.position.y = THREE.MathUtils.lerp(this.camera.position.y, target.y + 1.62, dt * 16);
            this.camera.position.z = THREE.MathUtils.lerp(this.camera.position.z, target.z, dt * 16);

            this.camera.rotation.order = 'YXZ';
            this.camera.rotation.y = target.yaw || 0;
            this.camera.rotation.x = target.pitch || 0;
            this.camera.rotation.z = 0;
        } else {
            // Third-Person Follow Camera behind teammate using clean YXZ Euler rotation
            if (target.mesh) target.mesh.visible = true;
            if (this.weaponMesh) this.weaponMesh.visible = false;

            const dist = 3.8;
            const tyaw = target.yaw || 0;
            const desiredX = target.x + Math.sin(tyaw) * dist;
            const desiredY = target.y + 2.3;
            const desiredZ = target.z + Math.cos(tyaw) * dist;

            this.camera.position.x = THREE.MathUtils.lerp(this.camera.position.x, desiredX, dt * 12);
            this.camera.position.y = THREE.MathUtils.lerp(this.camera.position.y, desiredY, dt * 12);
            this.camera.position.z = THREE.MathUtils.lerp(this.camera.position.z, desiredZ, dt * 12);
            this.camera.rotation.order = 'YXZ';
            this.camera.rotation.y = tyaw;
            this.camera.rotation.x = -0.22;
            this.camera.rotation.z = 0;
        }
    }

    checkMobileAutoFire() {
        const p = this.player;
        if (!this.running || this.hudEditMode || p.hp <= 0 || p.reloading || p.fireCooldown > 0) return;

        // Avoid auto-firing while lobby, buy, or settings modals are open
        for (const modalId of ['lobby-overlay', 'buy-modal', 'settings-modal', 'mobile-settings-modal']) {
            const el = document.getElementById(modalId);
            if (el && !el.classList.contains('hidden')) return;
        }

        const wep = WEAPONS[p.weaponId];
        if (!wep || wep.id === 'hegrenade') return;

        const maxRange = wep.id === 'knife' ? Math.min((wep.range || 2.5) + 0.5, 4.0) : Math.min(wep.range || 140, 180);
        const eyeH = p.crouching ? 1.05 : 1.62;
        if (!this._autoFireOrigin) {
            this._autoFireOrigin = new THREE.Vector3();
            this._autoFireDir = new THREE.Vector3();
            this._autoFireEuler = new THREE.Euler(0, 0, 0, 'YXZ');
            this._autoFireRay = new THREE.Raycaster();
        }
        this._autoFireOrigin.set(p.x, p.y + eyeH, p.z);
        this._autoFireEuler.set(p.pitch + p.recoilPitch, p.yaw, 0, 'YXZ');
        this._autoFireDir.set(0, 0, -1).applyEuler(this._autoFireEuler).normalize();

        this._autoFireRay.set(this._autoFireOrigin, this._autoFireDir);
        this._autoFireRay.near = 0.1;
        this._autoFireRay.far = maxRange;

        const enemyMeshes = [];
        const allyMeshes = [];
        for (const ent of this.entities) {
            if (ent.hp > 0 && ent.mesh && ent.mesh.visible) {
                const targetArr = ent.team !== p.team ? enemyMeshes : allyMeshes;
                ent.mesh.traverse(c => {
                    if (c.isMesh && c.visible) targetArr.push(c);
                });
            }
        }
        if (enemyMeshes.length === 0) return;

        const hits = this._autoFireRay.intersectObjects(enemyMeshes, false);
        if (hits.length === 0) return;

        const enemyDist = hits[0].distance;
        const wallHits = this._autoFireRay.intersectObjects(this.map.shootableMeshes, false);
        if (wallHits.length > 0 && wallHits[0].distance <= enemyDist) return;

        if (allyMeshes.length > 0) {
            const allyHits = this._autoFireRay.intersectObjects(allyMeshes, false);
            if (allyHits.length > 0 && allyHits[0].distance <= enemyDist) return;
        }

        this.shoot();
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
        if (this.roundOver) {
            if (this.roundRestartTimer > 0) {
                this.roundRestartTimer -= dt;
                if (this.roundRestartTimer <= 0 && !this.net.isClient) {
                    this.startNewRound();
                }
            }
            return;
        }

        this.checkRoundWinCondition();
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
                if (this.isRichMode()) {
                    this.startNewRound();
                } else {
                    this.endRound('CT', '⏱️ หมดเวลา! COUNTER-TERRORISTS WIN!');
                }
            }
        }

        this.updateTimerDisplay();
    }

    spawnKatanaEffect(step, origin, forwardVec, rightVec) {
        if (!this.scene) return;
        const fwd = forwardVec.clone().normalize();
        const isStab = (step === 2);

        const fxGroup = new THREE.Group();
        const spawnDist = isStab ? 1.65 : 1.42;
        const pos = origin.clone().addScaledVector(fwd, spawnDist).add(new THREE.Vector3(0, isStab ? -0.09 : -0.14, 0));
        fxGroup.position.copy(pos);

        // Right-handed basis where local -Z = fwd, +X = right, +Y = up (invariant at all yaws/pitches)
        const zAxis = fwd.clone().negate();
        const xAxis = rightVec.clone().normalize();
        const yAxis = new THREE.Vector3().crossVectors(zAxis, xAxis).normalize();
        fxGroup.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(xAxis, yAxis, zAxis));

        const disposeFns = [];
        const trackedMeshes = [];

        if (!isStab) {
            // Hits 1 & 2: Curved Katana Crescent Slash Ribbon + Bright Edge Tube (pitched so clearly visible in 1P!)
            const tiltZ = (step === 0) ? -0.52 : 0.52;
            const swingDir = (step === 0) ? -1 : 1;
            const outerColor = (step === 0) ? 0x38bdf8 : 0x60a5fa;
            const coreColor = 0xf8fafc;

            const tiltGroup = new THREE.Group();
            tiltGroup.rotation.z = tiltZ;
            tiltGroup.rotation.x = 0.36; // Pitch downward slightly so camera sees full glowing crescent face
            const sweepPivot = new THREE.Group();
            sweepPivot.rotation.y = -swingDir * 0.45;

            const outerGeo = new THREE.RingGeometry(0.34, 0.92, 28, 1, Math.PI * 0.14, Math.PI * 0.72);
            const outerMat = new THREE.MeshBasicMaterial({
                color: outerColor,
                transparent: true,
                opacity: 0.88,
                side: THREE.DoubleSide,
                depthWrite: false,
                blending: THREE.AdditiveBlending
            });
            const outerArc = new THREE.Mesh(outerGeo, outerMat);
            outerArc.rotation.x = -Math.PI / 2;

            const rimGeo = new THREE.TorusGeometry(0.88, 0.028, 8, 28, Math.PI * 0.70);
            const rimMat = new THREE.MeshBasicMaterial({
                color: coreColor,
                transparent: true,
                opacity: 0.98,
                depthWrite: false,
                blending: THREE.AdditiveBlending
            });
            const rimArc = new THREE.Mesh(rimGeo, rimMat);
            rimArc.rotation.x = -Math.PI / 2;
            rimArc.rotation.z = Math.PI * 0.15;

            sweepPivot.add(outerArc, rimArc);
            tiltGroup.add(sweepPivot);
            fxGroup.add(tiltGroup);

            trackedMeshes.push({ mat: outerMat, initOp: 0.88 }, { mat: rimMat, initOp: 0.98 });
            disposeFns.push(() => { outerGeo.dispose(); outerMat.dispose(); rimGeo.dispose(); rimMat.dispose(); });

            fxGroup.userData.effectKind = (step === 0) ? 'slash1' : 'slash2';
            this.scene.add(fxGroup);
            this.katanaEffects.push({
                group: fxGroup,
                sweepPivot,
                swingDir,
                isStab: false,
                fwd,
                timer: 0.25,
                maxTimer: 0.25,
                trackedMeshes,
                dispose: () => disposeFns.forEach(fn => fn())
            });
        } else {
            // Hit 3: Piercing Forward Katana Thrust (Golden-White Thrust Cone + Sonic Rings + Piercing Lance Streak)
            const coneGeo = new THREE.ConeGeometry(0.24, 1.75, 16, 1, true);
            const coneMat = new THREE.MeshBasicMaterial({
                color: 0xfacc15,
                transparent: true,
                opacity: 0.86,
                side: THREE.DoubleSide,
                depthWrite: false,
                blending: THREE.AdditiveBlending
            });
            const cone = new THREE.Mesh(coneGeo, coneMat);
            cone.rotation.x = -Math.PI / 2;
            cone.position.z = -0.35;

            const innerGeo = new THREE.ConeGeometry(0.085, 1.95, 12, 1, true);
            const innerMat = new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent: true,
                opacity: 0.96,
                side: THREE.DoubleSide,
                depthWrite: false,
                blending: THREE.AdditiveBlending
            });
            const innerCone = new THREE.Mesh(innerGeo, innerMat);
            innerCone.rotation.x = -Math.PI / 2;
            innerCone.position.z = -0.45;

            const ringGeo = new THREE.TorusGeometry(0.26, 0.024, 8, 24);
            const ringMat = new THREE.MeshBasicMaterial({
                color: 0xfef08a,
                transparent: true,
                opacity: 0.95,
                depthWrite: false,
                blending: THREE.AdditiveBlending
            });
            const ring1 = new THREE.Mesh(ringGeo, ringMat);
            ring1.position.z = 0.20;
            const ring2 = new THREE.Mesh(ringGeo, ringMat);
            ring2.scale.setScalar(0.65);
            ring2.position.z = -0.25;

            fxGroup.add(cone, innerCone, ring1, ring2);
            trackedMeshes.push(
                { mat: coneMat, initOp: 0.86 },
                { mat: innerMat, initOp: 0.96 },
                { mat: ringMat, initOp: 0.95 }
            );
            disposeFns.push(() => {
                coneGeo.dispose(); coneMat.dispose();
                innerGeo.dispose(); innerMat.dispose();
                ringGeo.dispose(); ringMat.dispose();
            });

            fxGroup.userData.effectKind = 'stab3';
            this.scene.add(fxGroup);
            this.katanaEffects.push({
                group: fxGroup,
                ring1,
                ring2,
                isStab: true,
                fwd,
                timer: 0.30,
                maxTimer: 0.30,
                trackedMeshes,
                dispose: () => disposeFns.forEach(fn => fn())
            });
        }
    }

    updateEffects(dt) {
        // Decay dynamic real-time muzzle flash light
        if (this.muzzleLight && this.muzzleLight.intensity > 0) {
            this.muzzleLight.intensity = Math.max(0, this.muzzleLight.intensity - dt * 95);
        }

        // Animate Katana 3-hit combo slash arcs & forward thrust shockwaves
        for (let i = this.katanaEffects.length - 1; i >= 0; i--) {
            const kf = this.katanaEffects[i];
            kf.timer -= dt;
            const life = Math.max(0, kf.timer / kf.maxTimer);
            const prog = 1 - life;

            if (!kf.isStab) {
                if (kf.sweepPivot) {
                    kf.sweepPivot.rotation.y = kf.swingDir * (-0.52 + prog * 1.18);
                }
                kf.group.scale.setScalar(0.85 + prog * 0.42);
            } else {
                kf.group.position.addScaledVector(kf.fwd, dt * 3.8);
                if (kf.ring1) kf.ring1.scale.setScalar(1 + prog * 1.45);
                if (kf.ring2) kf.ring2.scale.setScalar(0.68 + prog * 1.85);
            }

            for (const tm of kf.trackedMeshes) {
                tm.mat.opacity = life * tm.initOp;
            }

            if (kf.timer <= 0) {
                this.scene.remove(kf.group);
                if (kf.dispose) kf.dispose();
                this.katanaEffects.splice(i, 1);
            }
        }

        // Low-HP Heartbeat & Visceral Screen Blood Splatter Pulse
        const bloodOverlay = document.getElementById('blood-screen-overlay');
        if (bloodOverlay) {
            if (this.player.hp > 0 && this.player.hp <= 35) {
                const intensity = (1 - (this.player.hp / 35)).toFixed(2);
                bloodOverlay.style.opacity = Math.max(0.35, intensity);
                bloodOverlay.classList.add('critical-hp');
                window.soundFX.playHeartbeat();
            } else {
                bloodOverlay.style.opacity = '0';
                bloodOverlay.classList.remove('critical-hp');
            }
        }

        for (const ent of this.entities) {
            if (ent.invincibleTimer > 0) {
                ent.invincibleTimer = Math.max(0, ent.invincibleTimer - dt);
            }
        }

        // Update Hypersonic Tracers
        for (let i = this.tracers.length - 1; i >= 0; i--) {
            const t = this.tracers[i];
            t.timer -= dt;
            if (t.timer <= 0) {
                this.scene.remove(t.line);
                if (t.line.geometry) t.line.geometry.dispose();
                if (t.line.material) t.line.material.dispose();
                this.tracers.splice(i, 1);
            }
        }

        // Update Physical Spent Shell Casings (Gravity + Floor Bounces)
        for (let i = this.spentShells.length - 1; i >= 0; i--) {
            const sh = this.spentShells[i];
            sh.timer -= dt;
            sh.vel.y -= 14 * dt;
            sh.mesh.position.addScaledVector(sh.vel, dt);
            sh.mesh.rotation.x += sh.rotVel.x * dt;
            sh.mesh.rotation.y += sh.rotVel.y * dt;
            sh.mesh.rotation.z += sh.rotVel.z * dt;

            const floorY = this.getFloorHeight(sh.mesh.position.x, sh.mesh.position.y, sh.mesh.position.z);
            if (sh.mesh.position.y <= floorY + 0.012) {
                sh.mesh.position.y = floorY + 0.012;
                if (Math.abs(sh.vel.y) > 0.6 && sh.bounces < 3) {
                    sh.vel.y = -sh.vel.y * 0.42;
                    sh.vel.x *= 0.65;
                    sh.vel.z *= 0.65;
                    sh.rotVel.multiplyScalar(0.45);
                    if (sh.bounces === 0) window.soundFX.playCasingBounce();
                    sh.bounces++;
                } else {
                    sh.vel.set(0, 0, 0);
                    sh.rotVel.set(0, 0, 0);
                }
            }
            if (sh.timer <= 0) {
                this.scene.remove(sh.mesh);
                if (sh.mesh.geometry) sh.mesh.geometry.dispose();
                if (sh.mesh.material) sh.mesh.material.dispose();
                this.spentShells.splice(i, 1);
            }
        }

        // Update Lingering Gunsmoke Wisps
        for (let i = this.gunSmokePuffs.length - 1; i >= 0; i--) {
            const sm = this.gunSmokePuffs[i];
            sm.timer -= dt;
            sm.mesh.position.addScaledVector(sm.vel, dt);
            sm.mesh.scale.multiplyScalar(1 + dt * 1.6);
            const progress = Math.max(0, sm.timer / sm.maxTimer);
            sm.mesh.material.opacity = progress * sm.initialOpacity;
            if (sm.timer <= 0) {
                this.scene.remove(sm.mesh);
                if (sm.mesh.geometry) sm.mesh.geometry.dispose();
                if (sm.mesh.material) sm.mesh.material.dispose();
                this.gunSmokePuffs.splice(i, 1);
            }
        }

        // Update Debris, Blood Droplets, Sparks & Dust
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const pt = this.particles[i];
            pt.timer -= dt;

            if (pt.isBlood) {
                pt.vel.y -= 15 * dt;
                pt.vel.x *= (1 - dt * 1.5);
                pt.vel.z *= (1 - dt * 1.5);
            } else if (pt.isDust) {
                pt.mesh.scale.multiplyScalar(1 + dt * 2.0);
                if (pt.mesh.material) {
                    pt.mesh.material.opacity = (pt.timer / (pt.maxTimer || 0.45)) * 0.6;
                }
            } else if (pt.isSpark) {
                pt.vel.y -= 12 * dt;
            } else {
                pt.vel.y -= 12 * dt;
            }

            pt.mesh.position.addScaledVector(pt.vel, dt);
            if (pt.mesh.rotation) pt.mesh.rotation.x += 6 * dt;

            if (pt.timer <= 0) {
                this.scene.remove(pt.mesh);
                if (pt.mesh.geometry) pt.mesh.geometry.dispose();
                if (pt.mesh.material) pt.mesh.material.dispose();
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

    // ==================== PLAYER NAME CONFIG & VALIDATION ====================
    initPlayerNameConfig() {
        const input = document.getElementById('player-name-input');
        const badge = document.getElementById('name-status-badge');
        let saved = '';
        try {
            saved = localStorage.getItem('cs_player_name_saved') || '';
        } catch (e) {}

        if (saved && saved.trim().length >= 2 && saved.trim() !== 'Striker_TH' && saved.trim() !== 'ผู้เล่น' && saved.trim() !== 'Player') {
            this.player.name = saved.trim();
            if (input) input.value = this.player.name;
            if (badge) {
                badge.className = 'name-badge-ok';
                badge.textContent = '✅ ชื่อพร้อมใช้งาน';
            }
        } else {
            this.player.name = '';
            if (input) input.value = '';
            if (badge) {
                badge.className = 'name-badge-warn';
                badge.textContent = '🔴 บังคับตั้งชื่อก่อนเล่น';
            }
        }
    }

    updateNameBadgeOnInput() {
        const input = document.getElementById('player-name-input');
        const badge = document.getElementById('name-status-badge');
        const errEl = document.getElementById('name-error-msg');
        if (!input) return;

        const val = input.value.trim();
        if (val.length >= 2 && val !== 'Striker_TH' && val !== 'ผู้เล่น' && val !== 'Player') {
            if (badge) {
                badge.className = 'name-badge-ok';
                badge.textContent = '✅ ชื่อพร้อมใช้งาน';
            }
            if (errEl) errEl.style.display = 'none';
            input.classList.remove('input-error');
        } else {
            if (badge) {
                badge.className = 'name-badge-warn';
                badge.textContent = '🔴 บังคับตั้งชื่อก่อนเล่น';
            }
        }
    }

    validatePlayerName(isOnlineAction = false) {
        const input = document.getElementById('player-name-input');
        const badge = document.getElementById('name-status-badge');
        const errEl = document.getElementById('name-error-msg');
        const statusEl = document.getElementById('room-status-text');

        const val = input ? input.value.trim() : '';

        if (!val || val.length < 2 || val === 'Striker_TH' || val === 'ผู้เล่น' || val === 'Player') {
            if (input) {
                input.classList.remove('input-error');
                void input.offsetWidth;
                input.classList.add('input-error');
                input.focus();
            }
            if (badge) {
                badge.className = 'name-badge-warn';
                badge.textContent = '🔴 บังคับตั้งชื่อก่อนเล่น';
            }
            if (errEl) {
                errEl.style.display = 'block';
                errEl.textContent = '⚠️ บังคับตั้งชื่อของคุณก่อนเข้าเล่น เพื่อใช้ระบุตัวตนและเล่นกับเพื่อนออนไลน์!';
            }
            if (isOnlineAction && statusEl) {
                statusEl.textContent = '⚠️ ต้องตั้งชื่อตัวละครของคุณก่อนสร้างหรือเข้าร่วมห้องกับเพื่อน!';
            }
            return false;
        }

        this.player.name = val;
        try {
            localStorage.setItem('cs_player_name_saved', val);
        } catch (e) {}

        if (input) input.classList.remove('input-error');
        if (errEl) errEl.style.display = 'none';
        if (badge) {
            badge.className = 'name-badge-ok';
            badge.textContent = '✅ ชื่อพร้อมใช้งาน';
        }
        return true;
    }

    // ==================== CLEAN TEAM SWITCHING & GHOST PURGING ====================
    switchTeam(newTeam = null) {
        if (!newTeam) {
            newTeam = this.player.team === 'T' ? 'CT' : 'T';
        }
        const oldTeam = this.player.team;

        this.player.team = newTeam;

        // 1. Update Lobby team selector buttons
        const btnT = document.getElementById('select-team-t');
        const btnCT = document.getElementById('select-team-ct');
        if (btnT && btnCT) {
            btnT.classList.toggle('active', newTeam === 'T');
            btnCT.classList.toggle('active', newTeam === 'CT');
        }

        // 2. Update In-Game Settings modal team badge and button
        const teamBadge = document.getElementById('current-team-badge');
        if (teamBadge) {
            teamBadge.textContent = newTeam === 'T' ? '💣 TERRORIST' : '🛡️ COUNTER-TERRORIST';
            teamBadge.style.color = newTeam === 'T' ? '#fbbf24' : '#38bdf8';
            teamBadge.style.background = newTeam === 'T' ? 'rgba(245,158,11,0.2)' : 'rgba(56,189,248,0.2)';
        }

        // 3. Switch default rifle loadout for the team (or lock AWP in AWP-Only mode)
        if (this.isAwpOnly()) {
            this.applyGameModeLoadout();
        } else {
            this.player.slots[1] = newTeam === 'T' ? 'ak47' : 'm4a1';
        }
        this.equipSlot(1);

        // 4. PURGE any existing entity / ghost matching local player name from entities list & scene!
        this.purgePlayerGhost(this.player.name, 'LOCAL');

        // 5. If match is active, respawn local player at new team spawn and re-sync
        if (this.running) {
            this.respawnLocalPlayer();
            const teamName = newTeam === 'T' ? 'โจร (TERRORIST)' : 'ตำรวจ (COUNTER-TERRORIST)';
            this.addChatMessage(`🔄 คุณได้ย้ายไปอยู่ฝ่าย ${teamName} (ลบออกจากทีมเดิมแล้ว)`, newTeam === 'T' ? '#fbbf24' : '#38bdf8');
            this.showAnnouncement(`🔄 คุณได้ย้ายไปอยู่ฝ่าย ${teamName}!`, 2.5);

            // In Single Player / Host: Rebalance Bots cleanly so teams are equal without duplicates!
            if (!this.net.isClient) {
                this.setupBots();
            }

            // In Multiplayer: Synchronize team switch immediately
            if (this.net.isClient && this.net.hostConn && this.net.hostConn.open) {
                this.net.hostConn.send({
                    type: 'team_change',
                    id: this.net.peer ? this.net.peer.id : '',
                    name: this.player.name,
                    newTeam: newTeam,
                    oldTeam: oldTeam,
                    weapon: this.player.weaponId
                });
            } else if (this.net.isHost) {
                this.net.broadcast({
                    type: 'team_change',
                    id: 'HOST',
                    name: this.player.name,
                    newTeam: newTeam,
                    oldTeam: oldTeam
                });
            }
        }

        this.updateScoreHUD();
        this.refreshScoreboardIfOpen();
    }

    purgePlayerGhost(name, exceptId = null) {
        if (!name) return;
        for (let i = this.entities.length - 1; i >= 0; i--) {
            const e = this.entities[i];
            if (e.id === exceptId) continue;
            if (e.name === name || (exceptId === 'LOCAL' && e.id === 'LOCAL')) {
                if (e.mesh) this.scene.remove(e.mesh);
                this.entities.splice(i, 1);
            }
        }
    }

    // ==================== NETWORK SYNC CALLBACKS ====================
    onRemotePlayerJoined(peerId, name, team, weapon) {
        // ALWAYS purge any existing entity with this peerId OR player name from either team!
        for (let i = this.entities.length - 1; i >= 0; i--) {
            const e = this.entities[i];
            if (e.id === peerId || (name && e.name === name)) {
                if (e.mesh) this.scene.remove(e.mesh);
                this.entities.splice(i, 1);
            }
        }

        const spList = this.map.spawns[team] || this.map.spawns.T;
        const sp = spList[0];
        const remWep = this.resolveEntityWeapon(weapon, team);
        const mesh = createCharacterMesh(team, name, team === this.player.team, remWep);
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
            armor: 100,
            weapon: remWep,
            kills: 0,
            deaths: 0,
            mesh
        });
        this.updateScoreHUD();
        this.refreshScoreboardIfOpen();
    }

    onRemotePlayerArmorSync(peerId, armor) {
        const ent = this.entities.find(e => e.id === peerId);
        if (ent && ent.hp > 0) {
            ent.armor = Math.min(150, Math.max(0, Number(armor) || 0));
        }
    }

    resolveEntityWeapon(wep, team) {
        if (this.isAwpOnly && this.isAwpOnly()) return 'awp';
        return wep || (team === 'T' ? 'ak47' : 'm4a1');
    }

    onRemotePlayerTeamChanged(peerId, data) {
        const newTeam = data.newTeam;
        const playerName = data.name;

        // 1. Remove ANY entity with this peerId or player name from any team!
        let oldKills = 0;
        let oldDeaths = 0;
        for (let i = this.entities.length - 1; i >= 0; i--) {
            const e = this.entities[i];
            if (e.id === peerId || (playerName && e.name === playerName)) {
                oldKills = e.kills || oldKills;
                oldDeaths = e.deaths || oldDeaths;
                if (e.mesh) this.scene.remove(e.mesh);
                this.entities.splice(i, 1);
            }
        }

        // 2. Add player exclusively to newTeam with correct model skin
        const spList = this.map.spawns[newTeam] || this.map.spawns.T;
        const sp = spList[Math.floor(Math.random() * spList.length)];
        const remWep = this.resolveEntityWeapon(data.weapon, newTeam);
        const mesh = createCharacterMesh(newTeam, playerName, newTeam === this.player.team, remWep);
        mesh.position.set(sp.x, 0, sp.z);
        this.scene.add(mesh);

        this.entities.push({
            id: peerId,
            name: playerName,
            team: newTeam,
            isBot: false,
            isRemotePlayer: true,
            x: sp.x,
            y: 0,
            z: sp.z,
            yaw: sp.yaw,
            hp: 100,
            armor: 100,
            weapon: remWep,
            kills: oldKills,
            deaths: oldDeaths,
            mesh
        });

        const teamName = newTeam === 'T' ? 'โจร (TERRORIST)' : 'ตำรวจ (COUNTER-TERRORIST)';
        this.addChatMessage(`🔄 ${playerName} ย้ายไปอยู่ฝ่าย ${teamName} (ลบออกจากทีมเดิมแล้ว)`, newTeam === 'T' ? '#fbbf24' : '#38bdf8');
        this.updateScoreHUD();
        this.refreshScoreboardIfOpen();
    }

    onClientRemoteTeamChanged(data) {
        const myId = this.net.peer ? this.net.peer.id : '';
        if (data.id === myId || (data.name && data.name === this.player.name)) {
            if (this.player.team !== data.newTeam) {
                this.switchTeam(data.newTeam);
            }
            return;
        }

        // Purge any entity with this id or matching name from any team
        let oldKills = 0;
        let oldDeaths = 0;
        for (let i = this.entities.length - 1; i >= 0; i--) {
            const e = this.entities[i];
            if (e.id === data.id || (data.name && e.name === data.name)) {
                oldKills = e.kills || oldKills;
                oldDeaths = e.deaths || oldDeaths;
                if (e.mesh) this.scene.remove(e.mesh);
                this.entities.splice(i, 1);
            }
        }

        // Recreate on newTeam
        const spList = this.map.spawns[data.newTeam] || this.map.spawns.T;
        const sp = spList[0];
        const remWep = this.resolveEntityWeapon(data.weapon, data.newTeam);
        const mesh = createCharacterMesh(data.newTeam, data.name, data.newTeam === this.player.team, remWep);
        mesh.position.set(sp.x, 0, sp.z);
        this.scene.add(mesh);

        this.entities.push({
            id: data.id,
            name: data.name,
            team: data.newTeam,
            isBot: false,
            isRemotePlayer: true,
            x: sp.x,
            y: 0,
            z: sp.z,
            yaw: sp.yaw,
            hp: 100,
            armor: 100,
            weapon: data.weapon || (data.newTeam === 'T' ? 'ak47' : 'm4a1'),
            kills: oldKills,
            deaths: oldDeaths,
            mesh
        });

        const teamName = data.newTeam === 'T' ? 'โจร (TERRORIST)' : 'ตำรวจ (COUNTER-TERRORIST)';
        this.addChatMessage(`🔄 ${data.name} ย้ายไปอยู่ฝ่าย ${teamName} (ลบออกจากทีมเดิมแล้ว)`, data.newTeam === 'T' ? '#fbbf24' : '#38bdf8');
        this.updateScoreHUD();
        this.refreshScoreboardIfOpen();
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
        let ent = this.entities.find(e => e.id === peerId || (data.name && e.name === data.name));
        if (!ent) {
            this.onRemotePlayerJoined(peerId, data.name, data.team, data.weapon);
            ent = this.entities.find(e => e.id === peerId || (data.name && e.name === data.name));
        }
        if (ent) {
            if (data.team && ent.team !== data.team) {
                // Team changed! Cleanly remove from old team and update to new team
                ent.team = data.team;
                const remWep = this.resolveEntityWeapon(data.weapon, ent.team);
                if (ent.mesh) {
                    this.scene.remove(ent.mesh);
                    ent.mesh = createCharacterMesh(ent.team, ent.name, ent.team === this.player.team, remWep);
                    this.scene.add(ent.mesh);
                }
                this.purgePlayerGhost(ent.name, ent.id);
                this.updateScoreHUD();
                this.refreshScoreboardIfOpen();
            }
            if (ent.ignoreStateUntil && performance.now() < ent.ignoreStateUntil) return;
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
            if (a.id === myId || (a.name && a.name === this.player.name)) {
                // Sync Client's own authoritative Kills, Deaths & Respawn state from Host!
                const changed = (this.player.kills !== a.kills || this.player.deaths !== a.deaths);
                this.player.kills = a.kills || 0;
                this.player.deaths = a.deaths || 0;
                if (this.player.hp <= 0 && a.hp > 0) {
                    this.respawnLocalPlayer();
                }
                if (changed) this.refreshScoreboardIfOpen();
                continue;
            }
            seenIds.add(a.id);

            let ent = this.entities.find(e => e.id === a.id || (a.name && e.name === a.name));
            const snapWep = this.resolveEntityWeapon(a.weapon, a.team);
            if (!ent) {
                const mesh = createCharacterMesh(a.team, a.name, a.team === this.player.team, snapWep);
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
                    armor: a.armor !== undefined ? a.armor : 100,
                    weapon: snapWep,
                    kills: a.kills || 0,
                    deaths: a.deaths || 0,
                    mesh
                };
                this.entities.push(ent);
                this.refreshScoreboardIfOpen();
            } else {
                const needAwpRebuild = (this.isAwpOnly() && ent.mesh && (!ent.mesh.userData || ent.mesh.userData.weaponId !== 'awp'));
                if ((a.team && ent.team !== a.team) || needAwpRebuild) {
                    if (a.team) ent.team = a.team;
                    if (ent.mesh) {
                        this.scene.remove(ent.mesh);
                        ent.mesh = createCharacterMesh(ent.team, ent.name, ent.team === this.player.team, snapWep);
                        this.scene.add(ent.mesh);
                    }
                }
                const moved = Math.hypot(a.x - ent.x, a.z - ent.z) > 0.02;
                const scoreChanged = (ent.kills !== a.kills || ent.deaths !== a.deaths || ent.hp !== a.hp);
                ent.x = a.x;
                ent.y = a.y;
                ent.z = a.z;
                ent.yaw = a.yaw;
                ent.pitch = a.pitch || 0;
                ent.hp = a.hp;
                if (a.armor !== undefined) ent.armor = a.armor;
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
        if (this.isRichMode()) {
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
        const hudImg = document.getElementById('hud-weapon-img');
        if (hudImg) {
            const imgSrc = (window.WEAPON_IMAGES && window.WEAPON_IMAGES[wep.id]) ? window.WEAPON_IMAGES[wep.id] : '';
            if (imgSrc) {
                hudImg.src = imgSrc;
                hudImg.alt = wep.name;
                hudImg.classList.remove('hidden');
            } else {
                hudImg.classList.add('hidden');
            }
        }
        if (wep.id === 'knife') {
            document.getElementById('ammo-clip').textContent = '∞';
            document.getElementById('ammo-reserve').textContent = '';
        } else {
            document.getElementById('ammo-clip').textContent = ammoObj.clip;
            document.getElementById('ammo-reserve').textContent = `/ ${ammoObj.reserve}`;
        }

        const awpLocked = this.isAwpOnly();
        for (let s = 1; s <= 4; s++) {
            const btn = document.getElementById(`slot-btn-${s}`);
            if (!btn) continue;
            const lockedSlot = awpLocked && s !== 1;
            btn.disabled = lockedSlot;
            btn.style.opacity = lockedSlot ? '0.32' : '';
            btn.style.filter = lockedSlot ? 'grayscale(1)' : '';
            btn.classList.toggle('active', !lockedSlot && this.player.currentSlot === s);
            const wId = this.player.slots[s];
            const label = btn.querySelector('.slot-name');
            if (label) {
                if (lockedSlot) {
                    label.textContent = '🔒 ปิดใช้งาน';
                } else if (wId && WEAPONS[wId]) {
                    if (wId === 'hegrenade') {
                        const gAmmo = this.player.ammo.hegrenade;
                        const totalG = gAmmo ? ((gAmmo.clip || 0) + (gAmmo.reserve || 0)) : 0;
                        label.textContent = `HE (${totalG})`;
                    } else if (wId === 'knife') {
                        label.textContent = 'KATANA';
                    } else {
                        label.textContent = WEAPONS[wId].id.toUpperCase();
                    }
                }
            }
        }
    }

    updateScoreHUD() {
        document.getElementById('score-t').textContent = this.scores.T;
        document.getElementById('score-ct').textContent = this.scores.CT;

        let tAlive = (this.player.team === 'T' && this.player.hp > 0) ? 1 : 0;
        let ctAlive = (this.player.team === 'CT' && this.player.hp > 0) ? 1 : 0;

        const seenNames = new Set([this.player.name]);
        for (const e of this.entities) {
            if (e.name === this.player.name || seenNames.has(e.name)) continue;
            seenNames.add(e.name);
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
    detectMobileDevice() {
        const ua = navigator.userAgent || '';
        // Desktop OS check: if Windows NT or desktop Linux/Mac (without iPadOS multi-touch), strictly PC mode!
        if (/Windows NT/i.test(ua)) return false;
        const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i.test(ua);
        const isIPadOS = (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
        return isMobileUA || isIPadOS;
    }

    loadMobileModePref() {
        try {
            const saved = localStorage.getItem('cs_mobile_mode_v1');
            if (saved === '1') return true;
            if (saved === '0') return false;
        } catch (e) {}
        return this.detectMobileDevice();
    }

    saveMobileModePref() {
        try {
            localStorage.setItem('cs_mobile_mode_v1', this.mobileMode ? '1' : '0');
        } catch (e) {}
    }

    loadMobileAutoFire() {
        try {
            const saved = localStorage.getItem('cs_mobile_autofire_v1');
            if (saved === '0') return false;
        } catch (e) {}
        return true;
    }

    setMobileMode(enabled) {
        this.mobileMode = !!enabled;
        this.saveMobileModePref();
        this.applyMobileModeUI();
    }

    setMobileAutoFire(enabled) {
        this.autoFireMobile = !!enabled;
        try {
            localStorage.setItem('cs_mobile_autofire_v1', this.autoFireMobile ? '1' : '0');
        } catch (e) {}
        this.syncMobileSettingsUI();
    }

    syncMobileSettingsUI() {
        const autoFireText = this.autoFireMobile
            ? '🎯 ยิงออโต้เวลาเล็งเจอคน (Auto-Fire): เปิด'
            : '🎯 ยิงออโต้เวลาเล็งเจอคน (Auto-Fire): ปิด';

        const styleAutoBtn = (btn) => {
            if (!btn) return;
            btn.textContent = autoFireText;
            btn.style.borderColor = this.autoFireMobile ? '#10b981' : 'rgba(255,255,255,0.22)';
            btn.style.color = this.autoFireMobile ? '#34d399' : '#cbd5e1';
        };

        const autoFireBtn = document.getElementById('btn-toggle-autofire');
        if (autoFireBtn) {
            autoFireBtn.classList.toggle('hidden', !this.mobileMode);
            styleAutoBtn(autoFireBtn);
        }

        styleAutoBtn(document.getElementById('btn-mobset-autofire'));

        const mobsetModeBtn = document.getElementById('btn-mobset-mode');
        if (mobsetModeBtn) {
            mobsetModeBtn.textContent = this.mobileMode
                ? '📱 โหมดควบคุมปัจจุบัน: มือถือ (Touch) — แตะเพื่อสลับ'
                : '💻 โหมดควบคุมปัจจุบัน: คอมพิวเตอร์ (PC) — แตะเพื่อสลับเป็นมือถือ';
            mobsetModeBtn.style.borderColor = this.mobileMode ? '#10b981' : '#38bdf8';
            mobsetModeBtn.style.color = this.mobileMode ? '#34d399' : '#7dd3fc';
        }

        const lobbyBtn = document.getElementById('btn-lobby-mobile-settings');
        if (lobbyBtn) {
            lobbyBtn.classList.toggle('active', this.mobileMode);
        }
        const lobbyStatus = document.getElementById('lobby-mobile-status-text');
        if (lobbyStatus) {
            lobbyStatus.textContent = `${this.mobileMode ? '📱 มือถือ: เปิด' : '💻 โหมด: PC'} • 🎯 ยิงออโต้: ${this.autoFireMobile ? 'เปิด' : 'ปิด'}`;
        }

        const sensPct = Math.round((this.lookSensitivity || 1) * 100);
        const mobSensSlider = document.getElementById('mobset-sens-slider');
        const mobSensVal = document.getElementById('mobset-sens-val');
        const hudSensSlider = document.getElementById('hud-sens-slider');
        const hudSensVal = document.getElementById('hud-sens-val');
        if (mobSensSlider) mobSensSlider.value = sensPct;
        if (mobSensVal) mobSensVal.textContent = `${sensPct}%`;
        if (hudSensSlider) hudSensSlider.value = sensPct;
        if (hudSensVal) hudSensVal.textContent = `${sensPct}%`;
    }

    checkOrientationWarning() {
        const warnEl = document.getElementById('portrait-warning-overlay');
        if (!warnEl) return;
        const w = window.visualViewport ? window.visualViewport.width : window.innerWidth;
        const h = window.visualViewport ? window.visualViewport.height : window.innerHeight;
        const isPortrait = h > w;
        // Show rotate-to-landscape warning when actively playing in portrait mobile mode (not during lobby setup or HUD editing)
        warnEl.classList.toggle('hidden', !(this.mobileMode && isPortrait && this.running && !this.hudEditMode));
    }

    applyMobileModeUI() {
        document.body.classList.toggle('is-mobile', this.mobileMode);

        const mobCtrl = document.getElementById('mobile-controls');
        if (mobCtrl) {
            mobCtrl.classList.toggle('hidden', !this.mobileMode || (!this.running && !this.hudEditMode));
        }

        const toggleBtn = document.getElementById('btn-toggle-mobile');
        if (toggleBtn) {
            toggleBtn.textContent = this.mobileMode ? '📱 โหมด: มือถือ' : '💻 โหมด: PC';
        }

        const editHudBtn = document.getElementById('btn-edit-hud');
        if (editHudBtn) {
            editHudBtn.classList.toggle('hidden', !this.mobileMode);
        }

        if (this.mobileMode && document.pointerLockElement) {
            document.exitPointerLock();
        }

        this.syncMobileSettingsUI();
        this.checkOrientationWarning();
    }

    handleViewportResize() {
        const w = window.visualViewport ? window.visualViewport.width : window.innerWidth;
        const h = window.visualViewport ? window.visualViewport.height : window.innerHeight;
        this.camera.aspect = w / h;
        this.camera.updateProjectionMatrix();
        if (this.vmCamera) {
            this.vmCamera.aspect = w / h;
            this.vmCamera.updateProjectionMatrix();
        }
        this.renderer.setSize(w, h);
        this.checkOrientationWarning();
    }

    enterFullscreen() {
        const docEl = document.documentElement;
        const reqFs = docEl.requestFullscreen || docEl.webkitRequestFullscreen || docEl.msRequestFullscreen;
        if (reqFs) {
            try {
                const p = reqFs.call(docEl);
                if (p && p.catch) p.catch(() => {});
            } catch (e) {}
        }
        if (screen.orientation && screen.orientation.lock) {
            try {
                screen.orientation.lock('landscape').catch(() => {});
            } catch (e) {}
        }
        window.scrollTo(0, 1);
        setTimeout(() => this.handleViewportResize(), 200);
    }

    toggleFullscreen() {
        const isFs = document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
        if (!isFs) {
            this.enterFullscreen();
        } else {
            const exitFs = document.exitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen;
            if (exitFs) {
                try { exitFs.call(document); } catch (e) {}
            }
        }
        setTimeout(() => {
            this.updateFullscreenButtons();
            this.handleViewportResize();
        }, 200);
    }

    updateFullscreenButtons() {
        const isFs = !!(document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement);
        const hudFsBtn = document.getElementById('btn-fullscreen');
        const lobbyFsBtn = document.getElementById('btn-lobby-fullscreen');
        const mobsetFsBtn = document.getElementById('btn-mobset-fullscreen');
        const fullText = isFs ? '📺 ออกจากโหมดเต็มจอ (Exit Fullscreen)' : '📺 เปิดโหมดเต็มจอ (Fullscreen)';
        if (hudFsBtn) hudFsBtn.textContent = fullText;
        if (mobsetFsBtn) mobsetFsBtn.textContent = fullText;
        if (lobbyFsBtn) lobbyFsBtn.textContent = isFs ? '📺 ออกจากเต็มจอ' : '📺 เปิดเต็มจอ (Fullscreen)';
    }

    setupInputs() {
        window.addEventListener('resize', () => this.handleViewportResize());
        window.addEventListener('orientationchange', () => setTimeout(() => this.handleViewportResize(), 250));
        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', () => this.handleViewportResize());
        }
        document.addEventListener('fullscreenchange', () => {
            this.updateFullscreenButtons();
            this.handleViewportResize();
        });
        document.addEventListener('webkitfullscreenchange', () => {
            this.updateFullscreenButtons();
            this.handleViewportResize();
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
            } else if (e.code === 'KeyM') {
                this.toggleSettingsModal();
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
        const nameInput = document.getElementById('player-name-input');
        if (nameInput) {
            nameInput.addEventListener('input', () => this.updateNameBadgeOnInput());
            nameInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    if (this.validatePlayerName(false)) {
                        this.startMatch();
                    }
                }
            });
        }

        document.getElementById('select-team-t').addEventListener('click', () => {
            this.switchTeam('T');
        });
        document.getElementById('select-team-ct').addEventListener('click', () => {
            this.switchTeam('CT');
        });

        const switchTeamBtn = document.getElementById('btn-switch-team');
        if (switchTeamBtn) {
            switchTeamBtn.addEventListener('click', () => {
                this.switchTeam();
            });
        }

        document.getElementById('btn-start-play').addEventListener('click', () => {
            if (!this.validatePlayerName(false)) return;
            if (this.mobileMode) {
                this.enterFullscreen();
            }
            this.startMatch();
        });

        const lobbyFsBtn = document.getElementById('btn-lobby-fullscreen');
        if (lobbyFsBtn) {
            lobbyFsBtn.addEventListener('click', () => this.toggleFullscreen());
        }

        const hudFsBtn = document.getElementById('btn-fullscreen');
        if (hudFsBtn) {
            hudFsBtn.addEventListener('click', () => this.toggleFullscreen());
        }

        const portraitFsBtn = document.getElementById('btn-portrait-fullscreen');
        if (portraitFsBtn) {
            portraitFsBtn.addEventListener('click', () => this.enterFullscreen());
        }

        document.getElementById('btn-host-room').addEventListener('click', () => {
            if (!this.validatePlayerName(true)) return;
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
            if (!this.validatePlayerName(true)) return;
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

        const openSettingsBtn = document.getElementById('btn-open-settings');
        const closeSettingsBtn = document.getElementById('btn-close-settings');
        if (openSettingsBtn) openSettingsBtn.addEventListener('click', () => this.toggleSettingsModal(true));
        if (closeSettingsBtn) closeSettingsBtn.addEventListener('click', () => this.toggleSettingsModal(false));

        const botDiffBtn = document.getElementById('btn-cycle-bot-diff');
        if (botDiffBtn) {
            botDiffBtn.addEventListener('click', () => this.cycleBotDifficulty());
        }

        const mapSelect = document.getElementById('map-select');
        const mapPreviewBadge = document.getElementById('map-preview-badge');
        if (mapSelect && mapPreviewBadge) {
            mapSelect.addEventListener('change', () => {
                const mid = mapSelect.value;
                const meta = window.MAP_METADATA ? window.MAP_METADATA[mid] : null;
                if (meta) {
                    mapPreviewBadge.innerHTML = `<strong>${meta.name}:</strong> ${meta.description}`;
                }
                const ingameSel = document.getElementById('ingame-map-select');
                if (ingameSel) ingameSel.value = mid;
            });
        }

        const ingameMapSelect = document.getElementById('ingame-map-select');
        if (ingameMapSelect) {
            ingameMapSelect.addEventListener('change', () => {
                const newMid = ingameMapSelect.value;
                this.loadMap(newMid);
                if (mapSelect) mapSelect.value = newMid;
            });
        }

        const soundBtn = document.getElementById('btn-toggle-sound');
        if (soundBtn) {
            soundBtn.addEventListener('click', () => {
                window.soundFX.enabled = !window.soundFX.enabled;
                soundBtn.textContent = window.soundFX.enabled ? '🔊 เสียงเอฟเฟกต์: เปิด' : '🔇 เสียงเอฟเฟกต์: ปิด';
            });
        }

        const mobToggleBtn = document.getElementById('btn-toggle-mobile');
        if (mobToggleBtn) {
            mobToggleBtn.addEventListener('click', () => {
                this.setMobileMode(!this.mobileMode);
            });
        }

        const editHudBtn = document.getElementById('btn-edit-hud');
        if (editHudBtn) {
            editHudBtn.addEventListener('click', () => {
                this.toggleSettingsModal(false);
                this.toggleHudEditor(true);
            });
        }

        const autoFireBtn = document.getElementById('btn-toggle-autofire');
        if (autoFireBtn) {
            autoFireBtn.addEventListener('click', () => {
                this.setMobileAutoFire(!this.autoFireMobile);
            });
        }

        // Lobby Mobile Settings Modal Controls
        const openMobSetBtn = document.getElementById('btn-lobby-mobile-settings');
        const closeMobSetBtn = document.getElementById('btn-close-mobile-settings');
        if (openMobSetBtn) openMobSetBtn.addEventListener('click', () => this.toggleMobileSettingsModal(true));
        if (closeMobSetBtn) closeMobSetBtn.addEventListener('click', () => this.toggleMobileSettingsModal(false));

        const mobsetModeBtn = document.getElementById('btn-mobset-mode');
        if (mobsetModeBtn) {
            mobsetModeBtn.addEventListener('click', () => {
                this.setMobileMode(!this.mobileMode);
            });
        }

        const mobsetAutoFireBtn = document.getElementById('btn-mobset-autofire');
        if (mobsetAutoFireBtn) {
            mobsetAutoFireBtn.addEventListener('click', () => {
                this.setMobileAutoFire(!this.autoFireMobile);
            });
        }

        const mobsetSensSlider = document.getElementById('mobset-sens-slider');
        if (mobsetSensSlider) {
            mobsetSensSlider.addEventListener('input', () => {
                const val = parseInt(mobsetSensSlider.value, 10) || 100;
                this.lookSensitivity = val / 100;
                this.syncMobileSettingsUI();
                this.saveHudLayout();
            });
        }

        const mobsetEditHudBtn = document.getElementById('btn-mobset-edit-hud');
        if (mobsetEditHudBtn) {
            mobsetEditHudBtn.addEventListener('click', () => {
                this.hudEditorReturnToLobby = !this.running;
                this.toggleMobileSettingsModal(false);
                const lobby = document.getElementById('lobby-overlay');
                if (lobby && this.hudEditorReturnToLobby) lobby.classList.add('hidden');
                this.toggleHudEditor(true);
            });
        }

        const mobsetFsBtn = document.getElementById('btn-mobset-fullscreen');
        if (mobsetFsBtn) {
            mobsetFsBtn.addEventListener('click', () => this.toggleFullscreen());
        }

        document.getElementById('btn-open-lobby').addEventListener('click', () => {
            this.toggleSettingsModal(false);
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

    toggleMobileSettingsModal(forceState) {
        const modal = document.getElementById('mobile-settings-modal');
        if (!modal) return;
        const show = forceState !== undefined ? forceState : modal.classList.contains('hidden');
        modal.classList.toggle('hidden', !show);
        if (show) {
            this.syncMobileSettingsUI();
            this.updateFullscreenButtons();
        }
    }

    toggleSettingsModal(forceState) {
        const modal = document.getElementById('settings-modal');
        if (!modal) return;
        const show = forceState !== undefined ? forceState : modal.classList.contains('hidden');
        modal.classList.toggle('hidden', !show);
        if (show) {
            this.updateBotDiffHUD();
            this.updateFullscreenButtons();
            this.syncMobileSettingsUI();
            if (document.pointerLockElement) document.exitPointerLock();
        } else if (!this.mobileMode && this.running && !this.hudEditMode) {
            this.canvas.requestPointerLock();
        }
    }

    updateBotDiffHUD() {
        const btn = document.getElementById('btn-cycle-bot-diff');
        if (!btn) return;
        const shortNames = {
            easy: '🟢 บอท: ง่าย (แตะเพื่อเปลี่ยนความเก่งบอท)',
            normal: '🟡 บอท: ปานกลาง (แตะเพื่อเปลี่ยนความเก่งบอท)',
            hard: '🟠 บอท: ยาก (แตะเพื่อเปลี่ยนความเก่งบอท)',
            expert: '🔴 บอท: โหดมาก (แตะเพื่อเปลี่ยนความเก่งบอท)'
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

        const awpOnly = this.isAwpOnly();
        const quickPistolBtn = document.getElementById('btn-buy-ammo-pistol');
        const quickNadeBtn = document.getElementById('btn-buy-nade-quick');
        if (quickPistolBtn) quickPistolBtn.classList.toggle('hidden', awpOnly);
        if (quickNadeBtn) quickNadeBtn.classList.toggle('hidden', awpOnly);

        // Build Category Filter Tabs
        if (tabsBar && window.WEAPON_CATEGORIES) {
            tabsBar.innerHTML = '';
            const cats = awpOnly
                ? [{ id: 'all', name: '🔭 โหมด AWP Only (ใช้ได้เฉพาะ AWP เท่านั้น)' }]
                : window.WEAPON_CATEGORIES;
            for (const cat of cats) {
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

        const filtered = awpOnly
            ? allItems.filter(item => item.id === 'awp' || item.isEquipment)
            : (selectedCat === 'all' ? allItems : allItems.filter(item => item.category === selectedCat));

        for (const item of filtered) {
            const card = document.createElement('div');
            card.className = 'buy-card';
            const badgeText = catLabels[item.category] || 'อาวุธ';
            let statsHtml = '';
            if (!item.isEquipment && item.clipSize) {
                const pelletsInfo = item.pellets ? `x${item.pellets}` : '';
                statsHtml = `<div class="buy-card-stats">⚔️ ดาเมจ: ${item.damage}${pelletsInfo} &nbsp;|&nbsp; 📦 กระสุน: ${item.clipSize} / ${item.reserveMax}</div>`;
            }

            const imgSrc = (window.WEAPON_IMAGES && window.WEAPON_IMAGES[item.id]) ? window.WEAPON_IMAGES[item.id] : '';
            const imgHtml = imgSrc
                ? `<div class="buy-card-img-wrap"><img src="${imgSrc}" alt="${item.name}" class="buy-card-img" /></div>`
                : '';

            card.innerHTML = `
                <div>
                    <div class="buy-card-top-row">
                        <span class="buy-card-cat-badge">${badgeText}</span>
                        <span class="buy-card-price">$${item.price}</span>
                    </div>
                    ${imgHtml}
                    <div class="buy-card-title">${item.name}</div>
                    <div class="buy-card-type">${item.type}</div>
                </div>
                ${statsHtml}
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
                if (this.isAwpOnly() && (id === 'btn-buy-ammo-pistol' || id === 'btn-buy-nade-quick')) {
                    this.showAnnouncement('🔭 โหมด AWP Only: ห้ามใช้ปืนพก/มีด/ระเบิด!', 1.8);
                    return;
                }
                if (id === 'btn-buy-nade-quick') {
                    const gAmmo = this.player.ammo.hegrenade;
                    const curTotal = (gAmmo ? ((gAmmo.clip || 0) + (gAmmo.reserve || 0)) : 0);
                    if (curTotal >= 10) {
                        this.showAnnouncement('⚠️ ระเบิดมือเต็มแล้ว! พกได้สูงสุด 10 ลูกเท่านั้น', 1.8);
                        return;
                    }
                }
                if (!this.isRichMode()) {
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
            this.equipArmor(100, true);
            this.showAnnouncement('🛡️ สวมเกราะ Kevlar + หมวกเหล็ก (100 AP)!', 1.6);
        });

        // 5. Heavy Tactical Armor (150 AP)
        bindBtn('btn-buy-armor-heavy', 1000, () => {
            this.equipArmor(150, false);
            this.showAnnouncement('🛡️ สวมเกราะหนักจู่โจมพิเศษ (150 AP)!', 1.6);
        });

        // 6. Quick Buy HE Grenade (+10 grenades pack, max 10)
        bindBtn('btn-buy-nade-quick', 300, () => {
            this.player.slots[4] = 'hegrenade';
            const gAmmo = this.player.ammo.hegrenade;
            const curTotal = (gAmmo ? ((gAmmo.clip || 0) + (gAmmo.reserve || 0)) : 0);
            const newTotal = Math.min(10, curTotal + 10);
            gAmmo.clip = 1;
            gAmmo.reserve = newTotal - 1;
            this.updateWeaponHUD();
            this.showAnnouncement(`💣 ซื้อระเบิดมือ HE (+${newTotal - curTotal} ลูก)! มีทั้งหมด ${newTotal}/10 ลูก (เต็มความจุ)`, 1.8);
        });

        // 7. Quick HUD Buy Ammo Button (bottom-right HUD next to ammo counter)
        bindBtn('btn-hud-buy-ammo', 50, () => {
            const curId = this.player.weaponId;
            if (curId && WEAPONS[curId] && curId !== 'knife' && curId !== 'hegrenade') {
                const w = WEAPONS[curId];
                this.player.ammo[curId].clip = w.clipSize;
                this.player.ammo[curId].reserve = Math.min(999, (this.player.ammo[curId].reserve || 0) + 120);
                this.showAnnouncement(`➕ เติมกระสุน ${w.name} (+120 นัด)!`, 1.4);
            }
        });
    }

    equipArmor(ap, isMin = false) {
        this.player.armor = isMin ? Math.max(this.player.armor, ap) : ap;
        if (this.net && this.net.sendArmorSync) {
            this.net.sendArmorSync(this.player.armor);
        }
    }

    buyItem(item) {
        if (this.isAwpOnly() && !item.isEquipment && item.id !== 'awp') {
            this.showAnnouncement('🔭 โหมด AWP Only ใช้ได้เฉพาะ AWP เท่านั้น (ปืนพก/มีด/ระเบิด ซื้อไม่ได้)!', 1.8);
            return;
        }
        if (item.id === 'hegrenade') {
            const gAmmo = this.player.ammo.hegrenade;
            const curTotal = (gAmmo ? ((gAmmo.clip || 0) + (gAmmo.reserve || 0)) : 0);
            if (curTotal >= 10) {
                this.showAnnouncement('⚠️ ระเบิดมือเต็มแล้ว! พกได้สูงสุด 10 ลูกเท่านั้น', 1.8);
                return;
            }
        }

        if (!this.isRichMode()) {
            if (this.player.money < item.price) {
                this.showAnnouncement('❌ เงินไม่พอสำหรับซื้อไอเทมนี้!', 1.5);
                return;
            }
            this.player.money -= item.price;
        } else {
            this.player.money = 50000;
        }

        if (item.id === 'armor') {
            this.equipArmor(100, true);
        } else if (item.id === 'heavyarmor') {
            this.equipArmor(150, false);
        } else if (item.id === 'hegrenade') {
            this.player.slots[4] = 'hegrenade';
            const gAmmo = this.player.ammo.hegrenade;
            const curTotal = (gAmmo ? ((gAmmo.clip || 0) + (gAmmo.reserve || 0)) : 0);
            const newTotal = Math.min(10, curTotal + 10);
            gAmmo.clip = 1;
            gAmmo.reserve = newTotal - 1;
            this.equipSlot(4);
            this.updateWeaponHUD();
            this.showAnnouncement(`💣 ซื้อระเบิดมือ HE (+${newTotal - curTotal} ลูก)! มีทั้งหมด ${newTotal}/10 ลูก (เต็มความจุ)`, 1.8);
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
            this.populateBuyMenu('all');
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

        const seenNames = new Set([this.player.name]);
        const uniqueEntities = [];
        for (const e of this.entities) {
            if (e.name === this.player.name || seenNames.has(e.name)) continue;
            seenNames.add(e.name);
            uniqueEntities.push(e);
        }

        const all = [
            {
                name: this.player.name + ' (คุณ)',
                team: this.player.team,
                kills: this.player.kills || 0,
                deaths: this.player.deaths || 0,
                hp: this.player.hp,
                isMe: true
            },
            ...uniqueEntities.map(e => ({
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
                this.lookSensitivity = val / 100;
                this.syncMobileSettingsUI();
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
            this.setMobileMode(true);
            if (document.pointerLockElement) document.exitPointerLock();
            mobCtrl.classList.add('hud-editing');
            panel.classList.remove('hidden');
            if (bombBtn) bombBtn.classList.remove('hidden');
            this.selectHudElement(document.getElementById('btn-fire-right'));
        } else {
            mobCtrl.classList.remove('hud-editing');
            panel.classList.add('hidden');
            this.selectHudElement(null);
            this.applyMobileModeUI();
            if (this.hudEditorReturnToLobby) {
                this.hudEditorReturnToLobby = false;
                const lobby = document.getElementById('lobby-overlay');
                if (lobby) lobby.classList.remove('hidden');
            }
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
                this.syncMobileSettingsUI();
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
        this.syncMobileSettingsUI();

        this.showAnnouncement('🔄 รีเซ็ตตำแหน่งปุ่มเป็นค่าเริ่มต้นแล้ว', 2.0);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    window.csGame = new CSGame();
});
