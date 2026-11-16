// Realistic Military Operator 3D Character Model (Non-Cartoon Anatomical Mesh + Camo Textures) & Multi-Tier AI Bot Controller

const BOT_DIFFICULTIES = {
    easy: {
        id: 'easy',
        label: '🟢 ง่าย (Easy)',
        reactionTime: 0.72,
        fireInterval: 0.48,
        baseAccuracy: 0.20,
        headshotChance: 0.04,
        moveSpeed: 4.2,
        strafeSpeed: 1.8,
        sightRange: 32,
        turnSpeed: 4.5,
        damageScale: 0.75
    },
    normal: {
        id: 'normal',
        label: '🟡 ปานกลาง (Normal)',
        reactionTime: 0.34,
        fireInterval: 0.26,
        baseAccuracy: 0.42,
        headshotChance: 0.11,
        moveSpeed: 5.3,
        strafeSpeed: 3.0,
        sightRange: 44,
        turnSpeed: 7.5,
        damageScale: 1.0
    },
    hard: {
        id: 'hard',
        label: '🟠 ยาก (Hard)',
        reactionTime: 0.16,
        fireInterval: 0.16,
        baseAccuracy: 0.64,
        headshotChance: 0.24,
        moveSpeed: 6.2,
        strafeSpeed: 4.2,
        sightRange: 58,
        turnSpeed: 11.5,
        damageScale: 1.25
    },
    expert: {
        id: 'expert',
        label: '🔴 โหดมาก (Expert Pro)',
        reactionTime: 0.06,
        fireInterval: 0.11,
        baseAccuracy: 0.84,
        headshotChance: 0.45,
        moveSpeed: 6.8,
        strafeSpeed: 5.2,
        sightRange: 75,
        turnSpeed: 16.0,
        damageScale: 1.5
    }
};

let _cachedCharTextures = null;
function getCharacterTextures() {
    if (_cachedCharTextures) return _cachedCharTextures;

    // 1. T Camo / Desert Militia Fabric Texture
    const tCanvas = document.createElement('canvas');
    tCanvas.width = 256;
    tCanvas.height = 256;
    const tCtx = tCanvas.getContext('2d');
    tCtx.fillStyle = '#5c503f';
    tCtx.fillRect(0, 0, 256, 256);
    const tColors = ['#473d2f', '#6e604c', '#3b3328', '#786852'];
    for (let i = 0; i < 180; i++) {
        tCtx.fillStyle = tColors[i % tColors.length];
        tCtx.beginPath();
        tCtx.arc(Math.random() * 256, Math.random() * 256, 6 + Math.random() * 18, 0, Math.PI * 2);
        tCtx.fill();
    }
    for (let i = 0; i < 4000; i++) {
        tCtx.fillStyle = i % 2 === 0 ? 'rgba(0,0,0,0.16)' : 'rgba(255,255,255,0.06)';
        tCtx.fillRect(Math.random() * 256, Math.random() * 256, 2, 2);
    }
    const tCamoTex = new THREE.CanvasTexture(tCanvas);

    // 2. CT Special Forces Dark Slate / Urban Navy Tactical Fabric Texture
    const ctCanvas = document.createElement('canvas');
    ctCanvas.width = 256;
    ctCanvas.height = 256;
    const ctCtx = ctCanvas.getContext('2d');
    ctCtx.fillStyle = '#252f38';
    ctCtx.fillRect(0, 0, 256, 256);
    const ctColors = ['#1b232b', '#303c47', '#161c22', '#2c3740'];
    for (let i = 0; i < 180; i++) {
        ctCtx.fillStyle = ctColors[i % ctColors.length];
        ctCtx.beginPath();
        ctCtx.arc(Math.random() * 256, Math.random() * 256, 6 + Math.random() * 18, 0, Math.PI * 2);
        ctCtx.fill();
    }
    for (let i = 0; i < 4000; i++) {
        ctCtx.fillStyle = i % 2 === 0 ? 'rgba(0,0,0,0.18)' : 'rgba(255,255,255,0.05)';
        ctCtx.fillRect(Math.random() * 256, Math.random() * 256, 2, 2);
    }
    const ctCamoTex = new THREE.CanvasTexture(ctCanvas);

    // 3. Ballistic Kevlar Vest Weave Texture
    const vestCanvas = document.createElement('canvas');
    vestCanvas.width = 128;
    vestCanvas.height = 128;
    const vCtx = vestCanvas.getContext('2d');
    vCtx.fillStyle = '#1f2221';
    vCtx.fillRect(0, 0, 128, 128);
    for (let y = 0; y < 128; y += 4) {
        vCtx.fillStyle = 'rgba(0,0,0,0.35)';
        vCtx.fillRect(0, y, 128, 1.5);
    }
    const vestTex = new THREE.CanvasTexture(vestCanvas);

    _cachedCharTextures = { tCamoTex, ctCamoTex, vestTex };
    return _cachedCharTextures;
}

function createCharacterMesh(team, name, isAlly = false) {
    const group = new THREE.Group();
    const isT = team === 'T';
    const { tCamoTex, ctCamoTex, vestTex } = getCharacterTextures();

    const uniformMat = new THREE.MeshStandardMaterial({
        map: isT ? tCamoTex : ctCamoTex,
        bumpMap: isT ? tCamoTex : ctCamoTex,
        bumpScale: 0.02,
        roughness: 0.86,
        metalness: 0.05
    });
    const pantsMat = new THREE.MeshStandardMaterial({
        map: isT ? tCamoTex : ctCamoTex,
        color: isT ? 0x8c8273 : 0x7c858e,
        bumpMap: vestTex,
        bumpScale: 0.015,
        roughness: 0.88
    });
    const vestMat = new THREE.MeshStandardMaterial({
        map: vestTex,
        bumpMap: vestTex,
        bumpScale: 0.025,
        color: isT ? 0x2b2620 : 0x181c20,
        roughness: 0.72,
        metalness: 0.18
    });
    const helmetMat = new THREE.MeshStandardMaterial({
        map: vestTex,
        color: isT ? 0x3b2f26 : 0x22282a,
        roughness: 0.52,
        metalness: 0.25
    });
    const balaclavaMat = new THREE.MeshStandardMaterial({
        map: vestTex,
        color: isT ? 0x262320 : 0x16181a,
        roughness: 0.85
    });
    const bootMat = new THREE.MeshStandardMaterial({
        color: 0x141618,
        roughness: 0.55,
        metalness: 0.25
    });
    const lensMat = new THREE.MeshStandardMaterial({
        color: isT ? 0x1f2421 : 0x2d4a43,
        roughness: 0.12,
        metalness: 0.92
    });
    const gunMat = new THREE.MeshStandardMaterial({
        color: 0x1e2226,
        roughness: 0.32,
        metalness: 0.85
    });

    // --- ANATOMICAL CONTOURED LEGS (Thighs, Knee Pads, Calves, Combat Boots) ---
    const buildLeg = (xOffset) => {
        const legPivot = new THREE.Group();
        legPivot.position.set(xOffset, 0.82, 0);

        const thigh = new THREE.Mesh(new THREE.CylinderGeometry(0.115, 0.098, 0.38, 12), pantsMat);
        thigh.position.set(0, -0.19, 0);
        thigh.castShadow = true;
        thigh.userData = { part: 'leg' };

        const kneePad = new THREE.Mesh(new THREE.SphereGeometry(0.095, 10, 10), vestMat);
        kneePad.scale.set(1.0, 0.85, 0.65);
        kneePad.position.set(0, -0.39, -0.04);
        kneePad.userData = { part: 'leg' };

        const calf = new THREE.Mesh(new THREE.CylinderGeometry(0.095, 0.078, 0.36, 12), pantsMat);
        calf.position.set(0, -0.55, 0);
        calf.castShadow = true;
        calf.userData = { part: 'leg' };

        const boot = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.14, 0.27), bootMat);
        boot.position.set(0, -0.75, -0.03);
        boot.castShadow = true;
        boot.userData = { part: 'leg' };

        legPivot.add(thigh, kneePad, calf, boot);
        return legPivot;
    };

    const leftLegGroup = buildLeg(-0.145);
    const rightLegGroup = buildLeg(0.145);

    // --- ANATOMICAL TORSO, PELVIS, SHOULDERS & PLATE CARRIER VEST ---
    const pelvis = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.20, 0.20, 12), pantsMat);
    pelvis.scale.set(1.15, 1, 0.72);
    pelvis.position.set(0, 0.86, 0);
    pelvis.castShadow = true;
    pelvis.userData = { part: 'body' };

    const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.21, 0.56, 14), uniformMat);
    torso.scale.set(1.18, 1, 0.72);
    torso.position.set(0, 1.18, 0);
    torso.castShadow = true;
    torso.userData = { part: 'body' };

    // Sculpted Plate Carrier Vest + 3 Mag Pouches on Chest
    const plateCarrier = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.44, 0.31), vestMat);
    plateCarrier.position.set(0, 1.18, 0);
    plateCarrier.castShadow = true;
    plateCarrier.userData = { part: 'body' };

    for (let m = -1; m <= 1; m++) {
        const pouch = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.15, 0.06), vestMat);
        pouch.position.set(m * 0.11, 1.09, -0.17);
        pouch.userData = { part: 'body' };
        group.add(pouch);
    }

    // Neck
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.095, 0.12, 10), balaclavaMat);
    neck.position.set(0, 1.49, 0);
    neck.userData = { part: 'head' };

    // --- REALISTIC SCULPTED HEAD, BALACLAVA, BALLISTIC HELMET & NVG GOGGLES ---
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.175, 16, 16), balaclavaMat);
    head.scale.set(0.95, 1.08, 1.0);
    head.position.set(0, 1.65, 0);
    head.castShadow = true;
    head.userData = { part: 'head' };

    // Ballistic Helmet Dome / Keffiyeh Wrap
    const helmet = new THREE.Mesh(new THREE.SphereGeometry(0.192, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.62), helmetMat);
    helmet.position.set(0, 1.67, 0.01);
    helmet.rotation.x = -0.12;
    helmet.castShadow = true;
    helmet.userData = { part: 'head' };

    // Tactical Goggles / Ballistic Visor
    const goggles = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.075, 0.08), lensMat);
    goggles.position.set(0, 1.66, -0.145);
    goggles.userData = { part: 'head' };

    // Dual-tube Night Vision Goggles (NVG) on CT Helmet for authentic Spec-Ops look
    if (!isT) {
        const nvgMount = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.06, 0.06), gunMat);
        nvgMount.position.set(0, 1.76, -0.17);
        nvgMount.userData = { part: 'head' };
        const tubeL = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, 0.11, 10), gunMat);
        tubeL.rotation.x = Math.PI / 2;
        tubeL.position.set(-0.045, 1.75, -0.22);
        tubeL.userData = { part: 'head' };
        const tubeR = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, 0.11, 10), gunMat);
        tubeR.rotation.x = Math.PI / 2;
        tubeR.position.set(0.045, 1.75, -0.22);
        tubeR.userData = { part: 'head' };
        group.add(nvgMount, tubeL, tubeR);
    }

    // --- CONTOURED ARMS & DETAILED 3D RIFLE IN HANDS ---
    const leftShoulder = new THREE.Mesh(new THREE.SphereGeometry(0.105, 10, 10), uniformMat);
    leftShoulder.position.set(-0.31, 1.36, 0);
    leftShoulder.userData = { part: 'body' };

    const rightShoulder = new THREE.Mesh(new THREE.SphereGeometry(0.105, 10, 10), uniformMat);
    rightShoulder.position.set(0.31, 1.36, 0);
    rightShoulder.userData = { part: 'body' };

    const leftArm = new THREE.Mesh(new THREE.CylinderGeometry(0.082, 0.068, 0.52, 10), uniformMat);
    leftArm.position.set(-0.26, 1.18, -0.20);
    leftArm.rotation.x = Math.PI / 2.5;
    leftArm.rotation.z = -0.25;
    leftArm.castShadow = true;
    leftArm.userData = { part: 'body' };

    const rightArm = new THREE.Mesh(new THREE.CylinderGeometry(0.082, 0.068, 0.52, 10), uniformMat);
    rightArm.position.set(0.28, 1.18, -0.18);
    rightArm.rotation.x = Math.PI / 2.6;
    rightArm.rotation.z = 0.12;
    rightArm.castShadow = true;
    rightArm.userData = { part: 'body' };

    // Detailed 3rd-Person Rifle
    const gunReceiver = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.095, 0.48), gunMat);
    gunReceiver.position.set(0.16, 1.16, -0.38);
    gunReceiver.castShadow = true;
    gunReceiver.userData = { part: 'body' };

    const gunBarrel = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.016, 0.42, 10), gunMat);
    gunBarrel.rotation.x = Math.PI / 2;
    gunBarrel.position.set(0.16, 1.18, -0.72);
    gunBarrel.userData = { part: 'body' };

    const gunMag = new THREE.Mesh(new THREE.BoxGeometry(0.042, 0.17, 0.068), vestMat);
    gunMag.position.set(0.16, 1.04, -0.42);
    gunMag.rotation.x = -0.28;
    gunMag.userData = { part: 'body' };

    group.add(
        leftLegGroup, rightLegGroup, pelvis, torso, plateCarrier,
        neck, head, helmet, goggles,
        leftShoulder, rightShoulder, leftArm, rightArm,
        gunReceiver, gunBarrel, gunMag
    );
    group.userData.leftLegGroup = leftLegGroup;
    group.userData.rightLegGroup = rightLegGroup;
    group.userData.walkCycle = 0;

    // Compact Tactical Callsign Tag
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 56;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgba(12, 16, 22, 0.78)';
    ctx.fillRect(24, 10, 208, 36);
    ctx.strokeStyle = isT ? 'rgba(217, 119, 6, 0.75)' : 'rgba(56, 189, 248, 0.75)';
    ctx.lineWidth = 2;
    ctx.strokeRect(24, 10, 208, 36);
    ctx.fillStyle = isT ? '#fcd34d' : '#7dd3fc';
    ctx.font = 'bold 20px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(name, 128, 35);

    const tex = new THREE.CanvasTexture(canvas);
    const spriteMat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false });
    const labelSprite = new THREE.Sprite(spriteMat);
    labelSprite.scale.set(1.6, 0.35, 1);
    labelSprite.position.set(0, 2.08, 0);
    labelSprite.visible = isAlly; // Only show floating tags above friendly teammates for true tactical realism!
    group.add(labelSprite);
    group.userData.labelSprite = labelSprite;

    return group;
}

function animateCharacterWalk(mesh, isMoving, dt) {
    if (!mesh || !mesh.userData.leftLegGroup) return;
    if (isMoving) {
        mesh.userData.walkCycle = (mesh.userData.walkCycle || 0) + dt * 11;
        const swing = Math.sin(mesh.userData.walkCycle) * 0.55;
        mesh.userData.leftLegGroup.rotation.x = swing;
        mesh.userData.rightLegGroup.rotation.x = -swing;
    } else {
        mesh.userData.leftLegGroup.rotation.x = THREE.MathUtils.lerp(mesh.userData.leftLegGroup.rotation.x, 0, dt * 10);
        mesh.userData.rightLegGroup.rotation.x = THREE.MathUtils.lerp(mesh.userData.rightLegGroup.rotation.x, 0, dt * 10);
    }
}

class BotAI {
    constructor(game) {
        this.game = game;
        this.difficulty = 'normal'; // 'easy' | 'normal' | 'hard' | 'expert'
    }

    getDiffConfig() {
        return BOT_DIFFICULTIES[this.difficulty] || BOT_DIFFICULTIES.normal;
    }

    setDifficulty(diffKey) {
        if (BOT_DIFFICULTIES[diffKey]) {
            this.difficulty = diffKey;
        }
    }

    update(dt) {
        const bots = this.game.entities.filter(e => e.isBot && e.hp > 0);
        const waypoints = this.game.map.waypoints;
        const cfg = this.getDiffConfig();

        for (const bot of bots) {
            if (bot.radarTimer > 0) {
                bot.radarTimer -= dt;
                if (bot.radarTimer <= 0) bot.radarVisible = false;
            }

            if (!bot.targetWP || Math.hypot(bot.x - bot.targetWP.x, bot.z - bot.targetWP.z) < 2.2) {
                if (this.game.bombState.planted) {
                    bot.targetWP = {
                        x: this.game.bombState.x + (Math.random() - 0.5) * 4,
                        z: this.game.bombState.z + (Math.random() - 0.5) * 4
                    };
                } else {
                    const wp = waypoints[Math.floor(Math.random() * waypoints.length)];
                    bot.targetWP = {
                        x: wp.x + (Math.random() - 0.5) * 3,
                        z: wp.z + (Math.random() - 0.5) * 3
                    };
                }
            }

            const enemy = this.findVisibleEnemy(bot, cfg.sightRange);
            let movedThisFrame = false;

            if (enemy) {
                const dx = enemy.x - bot.x;
                const dz = enemy.z - bot.z;
                const targetYaw = Math.atan2(-dx, -dz);
                bot.yaw = this.lerpAngle(bot.yaw, targetYaw, dt * cfg.turnSpeed);

                bot.strafeTimer = (bot.strafeTimer || 0) - dt;
                if (bot.strafeTimer <= 0) {
                    bot.strafeDir = (Math.random() > 0.5 ? 1 : -1);
                    bot.strafeTimer = 0.6 + Math.random() * 0.7;
                }
                const moveAngle = bot.yaw + (Math.PI / 2) * bot.strafeDir;
                const stepX = -Math.sin(moveAngle) * cfg.strafeSpeed * dt;
                const stepZ = -Math.cos(moveAngle) * cfg.strafeSpeed * dt;
                movedThisFrame = this.moveBotWithCollision(bot, stepX, stepZ);

                if (bot.reactionDelay === undefined) {
                    bot.reactionDelay = cfg.reactionTime * (0.85 + Math.random() * 0.3);
                }
                bot.reactionDelay -= dt;
                bot.fireCooldown = (bot.fireCooldown || 0) - dt;

                if (bot.reactionDelay <= 0 && bot.fireCooldown <= 0) {
                    this.botShoot(bot, enemy, cfg);
                    bot.fireCooldown = cfg.fireInterval * (0.85 + Math.random() * 0.35);
                }
            } else {
                bot.reactionDelay = cfg.reactionTime * (0.85 + Math.random() * 0.3);
                const dx = bot.targetWP.x - bot.x;
                const dz = bot.targetWP.z - bot.z;
                const targetYaw = Math.atan2(-dx, -dz);
                bot.yaw = this.lerpAngle(bot.yaw, targetYaw, dt * 6.5);

                const stepX = -Math.sin(bot.yaw) * cfg.moveSpeed * dt;
                const stepZ = -Math.cos(bot.yaw) * cfg.moveSpeed * dt;
                movedThisFrame = this.moveBotWithCollision(bot, stepX, stepZ);
                if (!movedThisFrame) {
                    const wp = waypoints[Math.floor(Math.random() * waypoints.length)];
                    bot.targetWP = { x: wp.x, z: wp.z };
                }

                if (bot.team === 'CT' && this.game.bombState.planted) {
                    const distToBomb = Math.hypot(bot.x - this.game.bombState.x, bot.z - this.game.bombState.z);
                    if (distToBomb < 3.0) {
                        bot.defuseProgress = (bot.defuseProgress || 0) + dt;
                        if (bot.defuseProgress >= 4.0) {
                            this.game.onBombDefused(bot.name);
                            bot.defuseProgress = 0;
                        }
                    }
                }
            }

            if (bot.mesh) {
                bot.mesh.position.set(bot.x, bot.y, bot.z);
                bot.mesh.rotation.y = bot.yaw;
                animateCharacterWalk(bot.mesh, movedThisFrame, dt);
            }
        }
    }

    moveBotWithCollision(bot, dx, dz) {
        const radius = 0.45;
        let moved = false;

        const nextX = bot.x + dx;
        if (!this.game.checkWallCollision(nextX, bot.y, bot.z, radius, 1.7)) {
            bot.x = nextX;
            moved = true;
        }
        const nextZ = bot.z + dz;
        if (!this.game.checkWallCollision(bot.x, bot.y, nextZ, radius, 1.7)) {
            bot.z = nextZ;
            moved = true;
        }
        return moved;
    }

    findVisibleEnemy(bot, maxSightRange = 44) {
        const candidates = [];
        if (this.game.player.hp > 0 && this.game.player.team !== bot.team) {
            candidates.push({
                isLocalPlayer: true,
                x: this.game.player.x,
                y: this.game.player.y,
                z: this.game.player.z,
                hp: this.game.player.hp,
                name: this.game.player.name,
                team: this.game.player.team
            });
        }

        for (const ent of this.game.entities) {
            if (ent.id !== bot.id && ent.hp > 0 && ent.team !== bot.team) {
                candidates.push(ent);
            }
        }

        let best = null;
        let bestDist = maxSightRange;

        const origin = new THREE.Vector3(bot.x, bot.y + 1.5, bot.z);
        for (const c of candidates) {
            const dist = Math.hypot(c.x - bot.x, c.z - bot.z);
            if (dist < bestDist) {
                const targetPos = new THREE.Vector3(c.x, c.y + 1.3, c.z);
                const dir = targetPos.clone().sub(origin).normalize();
                const ray = new THREE.Raycaster(origin, dir, 0.2, dist);
                const hits = ray.intersectObjects(this.game.map.shootableMeshes, false);
                if (hits.length === 0) {
                    bestDist = dist;
                    best = c;
                }
            }
        }
        return best;
    }

    botShoot(bot, target, cfg) {
        bot.radarVisible = true;
        bot.radarTimer = 2.0;

        const dist = Math.hypot(target.x - bot.x, target.z - bot.z);
        const vol = Math.max(0.08, 1 - dist / 55);
        window.soundFX.playShoot(bot.weapon || 'ak47', vol * 0.45);

        const spreadVisual = Math.max(0.15, 1.0 - cfg.baseAccuracy);
        const start = new THREE.Vector3(bot.x, bot.y + 1.38, bot.z);
        const end = new THREE.Vector3(
            target.x + (Math.random() - 0.5) * spreadVisual,
            target.y + 1.2 + (Math.random() - 0.5) * spreadVisual,
            target.z + (Math.random() - 0.5) * spreadVisual
        );
        this.game.spawnBulletTracer(start, end);

        // Accuracy scaled by difficulty and distance
        const hitChance = Math.max(0.08, cfg.baseAccuracy - dist * 0.006);
        if (Math.random() < hitChance) {
            const isHeadshot = Math.random() < cfg.headshotChance;
            const baseDmg = isHeadshot ? 34 : (12 + Math.floor(Math.random() * 7));
            const dmg = Math.max(5, Math.round(baseDmg * cfg.damageScale));

            if (target.isLocalPlayer) {
                this.game.damageLocalPlayer(dmg, bot.name, bot.weapon || 'ak47', isHeadshot, bot);
            } else {
                this.game.damageEntity(target, dmg, bot.name, bot.weapon || 'ak47', isHeadshot, bot);
            }
        }
    }

    lerpAngle(a, b, t) {
        let diff = b - a;
        while (diff < -Math.PI) diff += Math.PI * 2;
        while (diff > Math.PI) diff -= Math.PI * 2;
        return a + diff * Math.min(1, t);
    }
}

window.BOT_DIFFICULTIES = BOT_DIFFICULTIES;
window.createCharacterMesh = createCharacterMesh;
window.animateCharacterWalk = animateCharacterWalk;
window.BotAI = BotAI;
