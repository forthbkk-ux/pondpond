// 3D Character Model (T & CT) + AI Bot Controller

function createCharacterMesh(team, name, isAlly = false) {
    const group = new THREE.Group();

    // Colors based on Terrorist (Amber/Desert/Red headband) vs Counter-Terrorist (Navy SAS/SWAT Blue)
    const torsoColor = team === 'T' ? 0xb45309 : 0x1e3a8a;
    const pantsColor = team === 'T' ? 0x451a03 : 0x0f172a;
    const headColor = team === 'T' ? 0xd97706 : 0x1d4ed8;
    const skinColor = 0xeab676;

    const torsoMat = new THREE.MeshStandardMaterial({ color: torsoColor, roughness: 0.7 });
    const pantsMat = new THREE.MeshStandardMaterial({ color: pantsColor, roughness: 0.8 });
    const headMat = new THREE.MeshStandardMaterial({ color: headColor, roughness: 0.6 });
    const skinMat = new THREE.MeshStandardMaterial({ color: skinColor, roughness: 0.6 });
    const gunMat = new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.4, metalness: 0.7 });

    // Legs (0 to 0.75)
    const leftLeg = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.75, 0.24), pantsMat);
    leftLeg.position.set(-0.15, 0.375, 0);
    leftLeg.userData = { part: 'leg' };

    const rightLeg = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.75, 0.24), pantsMat);
    rightLeg.position.set(0.15, 0.375, 0);
    rightLeg.userData = { part: 'leg' };

    // Torso / Chest + Tactical Vest (0.75 to 1.42)
    const torso = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.68, 0.32), torsoMat);
    torso.position.set(0, 1.09, 0);
    torso.userData = { part: 'body' };

    // Head (1.42 to 1.80) - Headshot hitbox!
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.38, 0.38), skinMat);
    head.position.set(0, 1.63, 0);
    head.userData = { part: 'head' };

    // Helmet / Balaclava / Visor
    const helmet = new THREE.Mesh(new THREE.BoxGeometry(0.41, 0.22, 0.41), headMat);
    helmet.position.set(0, 1.72, 0);
    helmet.userData = { part: 'head' };

    // Arms + Rifle in hands
    const leftArm = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.55, 0.18), torsoMat);
    leftArm.position.set(-0.36, 1.15, -0.15);
    leftArm.rotation.x = Math.PI / 3;
    leftArm.userData = { part: 'body' };

    const rightArm = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.55, 0.18), torsoMat);
    rightArm.position.set(0.36, 1.15, -0.15);
    rightArm.rotation.x = Math.PI / 3;
    rightArm.userData = { part: 'body' };

    const gun = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.12, 0.65), gunMat);
    gun.position.set(0.22, 1.12, -0.42);
    gun.userData = { part: 'body' };

    group.add(leftLeg, rightLeg, torso, head, helmet, leftArm, rightArm, gun);

    // Floating Name & Health Sprite
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
    ctx.fillRect(18, 8, 220, 44);
    ctx.fillStyle = team === 'T' ? '#fbbf24' : '#38bdf8';
    ctx.font = 'bold 24px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(name, 128, 38);

    const tex = new THREE.CanvasTexture(canvas);
    const spriteMat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false });
    const labelSprite = new THREE.Sprite(spriteMat);
    labelSprite.scale.set(1.8, 0.45, 1);
    labelSprite.position.set(0, 2.15, 0);
    labelSprite.visible = isAlly;
    group.add(labelSprite);
    group.userData.labelSprite = labelSprite;

    return group;
}

class BotAI {
    constructor(game) {
        this.game = game;
    }

    update(dt) {
        const bots = this.game.entities.filter(e => e.isBot && e.hp > 0);
        const waypoints = this.game.map.waypoints;

        for (const bot of bots) {
            if (bot.radarTimer > 0) {
                bot.radarTimer -= dt;
                if (bot.radarTimer <= 0) bot.radarVisible = false;
            }

            // Pick a target waypoint if none or reached
            if (!bot.targetWP || Math.hypot(bot.x - bot.targetWP.x, bot.z - bot.targetWP.z) < 2.2) {
                // If bomb is planted, bots head towards the planted bomb!
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

            // Find closest living enemy with line of sight
            const enemy = this.findVisibleEnemy(bot);

            if (enemy) {
                // Face enemy
                const dx = enemy.x - bot.x;
                const dz = enemy.z - bot.z;
                const targetYaw = Math.atan2(-dx, -dz);
                bot.yaw = this.lerpAngle(bot.yaw, targetYaw, dt * 8);

                // Strafe slightly while shooting
                bot.strafeTimer = (bot.strafeTimer || 0) - dt;
                if (bot.strafeTimer <= 0) {
                    bot.strafeDir = (Math.random() > 0.5 ? 1 : -1);
                    bot.strafeTimer = 0.8 + Math.random() * 0.8;
                }
                const moveAngle = bot.yaw + (Math.PI / 2) * bot.strafeDir;
                const stepX = -Math.sin(moveAngle) * 3.0 * dt;
                const stepZ = -Math.cos(moveAngle) * 3.0 * dt;
                this.moveBotWithCollision(bot, stepX, stepZ);

                // Reaction time & Fire burst
                bot.reactionDelay = (bot.reactionDelay || 0.25) - dt;
                bot.fireCooldown = (bot.fireCooldown || 0) - dt;
                if (bot.reactionDelay <= 0 && bot.fireCooldown <= 0) {
                    this.botShoot(bot, enemy);
                    bot.fireCooldown = 0.22 + Math.random() * 0.22;
                }
            } else {
                bot.reactionDelay = 0.28 + Math.random() * 0.18;
                // Move toward waypoint
                const dx = bot.targetWP.x - bot.x;
                const dz = bot.targetWP.z - bot.z;
                const targetYaw = Math.atan2(-dx, -dz);
                bot.yaw = this.lerpAngle(bot.yaw, targetYaw, dt * 6);

                const speed = 5.4;
                const stepX = -Math.sin(bot.yaw) * speed * dt;
                const stepZ = -Math.cos(bot.yaw) * speed * dt;
                const moved = this.moveBotWithCollision(bot, stepX, stepZ);
                if (!moved) {
                    // Pick new waypoint if blocked by wall
                    const wp = waypoints[Math.floor(Math.random() * waypoints.length)];
                    bot.targetWP = { x: wp.x, z: wp.z };
                }

                // CT Bots can defuse planted bomb if right next to it and no enemies visible!
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

            // Update 3D mesh position & rotation
            if (bot.mesh) {
                bot.mesh.position.set(bot.x, bot.y, bot.z);
                bot.mesh.rotation.y = bot.yaw;
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

    findVisibleEnemy(bot) {
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
        let bestDist = 42; // Max sight range

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

    botShoot(bot, target) {
        bot.radarVisible = true;
        bot.radarTimer = 2.0;

        const dist = Math.hypot(target.x - bot.x, target.z - bot.z);
        const vol = Math.max(0.08, 1 - dist / 55);
        window.soundFX.playShoot(bot.weapon || 'ak47', vol * 0.45);

        // Draw bullet tracer
        const start = new THREE.Vector3(bot.x, bot.y + 1.35, bot.z);
        const end = new THREE.Vector3(
            target.x + (Math.random() - 0.5) * 0.9,
            target.y + 1.1 + (Math.random() - 0.5) * 0.6,
            target.z + (Math.random() - 0.5) * 0.9
        );
        this.game.spawnBulletTracer(start, end);

        // Hit chance scales with distance
        const hitChance = Math.max(0.18, 0.58 - dist * 0.01);
        if (Math.random() < hitChance) {
            const isHeadshot = Math.random() < 0.12;
            const dmg = isHeadshot ? 28 : (11 + Math.floor(Math.random() * 8));

            if (target.isLocalPlayer) {
                this.game.damageLocalPlayer(dmg, bot.name, bot.weapon || 'ak47', isHeadshot);
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

window.createCharacterMesh = createCharacterMesh;
window.BotAI = BotAI;
