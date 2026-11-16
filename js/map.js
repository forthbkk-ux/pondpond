// DE_DUST2 Inspired 3D Map Builder, Colliders & Radar Renderer

class GameMap {
    constructor(scene) {
        this.scene = scene;
        this.colliders = []; // { minX, maxX, minY, maxY, minZ, maxZ }
        this.shootableMeshes = [];
        this.mapSize = 90; // -45 to +45

        this.spawns = {
            T: [
                { x: 0, z: 36, yaw: 0 },
                { x: -5, z: 37, yaw: 0 },
                { x: 5, z: 37, yaw: 0 },
                { x: -10, z: 35, yaw: 0 },
                { x: 10, z: 35, yaw: 0 }
            ],
            CT: [
                { x: 0, z: -36, yaw: Math.PI },
                { x: -5, z: -37, yaw: Math.PI },
                { x: 5, z: -37, yaw: Math.PI },
                { x: -10, z: -35, yaw: Math.PI },
                { x: 10, z: -35, yaw: Math.PI }
            ]
        };

        this.bombsites = {
            A: { x: 26, z: -22, radius: 6.5, label: 'A' },
            B: { x: -26, z: -22, radius: 6.5, label: 'B' }
        };

        // Waypoints for AI Bots to patrol/attack around Dust2 lanes
        this.waypoints = [
            { x: 0, z: 32 },    // T spawn exit
            { x: 0, z: 16 },    // Top Mid
            { x: 0, z: 0 },     // Mid Doors
            { x: 0, z: -18 },   // CT Mid
            { x: 0, z: -32 },   // CT Spawn
            { x: 25, z: 24 },   // Long A Entry
            { x: 28, z: 4 },    // Long A Lane
            { x: 26, z: -22 },  // Bombsite A
            { x: 14, z: -24 },  // A Short / CT Ramp
            { x: -25, z: 22 },  // B Tunnels Entry
            { x: -28, z: 2 },   // B Tunnels Inside
            { x: -26, z: -22 }, // Bombsite B
            { x: -12, z: -22 }  // B Window / Doors
        ];

        this.buildTextures();
        this.buildArena();
    }

    buildTextures() {
        // Sand Ground Texture
        const groundCanvas = document.createElement('canvas');
        groundCanvas.width = 256;
        groundCanvas.height = 256;
        const gCtx = groundCanvas.getContext('2d');
        gCtx.fillStyle = '#d4b483';
        gCtx.fillRect(0, 0, 256, 256);
        for (let i = 0; i < 1800; i++) {
            gCtx.fillStyle = i % 2 === 0 ? 'rgba(180, 145, 95, 0.35)' : 'rgba(245, 222, 179, 0.3)';
            gCtx.fillRect(Math.random() * 256, Math.random() * 256, 3, 3);
        }
        gCtx.strokeStyle = 'rgba(140, 110, 70, 0.22)';
        gCtx.lineWidth = 2;
        gCtx.strokeRect(0, 0, 128, 128);
        gCtx.strokeRect(128, 128, 128, 128);

        this.groundTex = new THREE.CanvasTexture(groundCanvas);
        this.groundTex.wrapS = THREE.RepeatWrapping;
        this.groundTex.wrapT = THREE.RepeatWrapping;
        this.groundTex.repeat.set(22, 22);

        // Sandstone Wall Texture
        const wallCanvas = document.createElement('canvas');
        wallCanvas.width = 256;
        wallCanvas.height = 256;
        const wCtx = wallCanvas.getContext('2d');
        wCtx.fillStyle = '#c29b61';
        wCtx.fillRect(0, 0, 256, 256);
        wCtx.strokeStyle = '#9c7844';
        wCtx.lineWidth = 3;
        for (let y = 0; y < 256; y += 32) {
            wCtx.beginPath();
            wCtx.moveTo(0, y);
            wCtx.lineTo(256, y);
            wCtx.stroke();
            const offset = (y / 32) % 2 === 0 ? 0 : 32;
            for (let x = offset; x < 256; x += 64) {
                wCtx.beginPath();
                wCtx.moveTo(x, y);
                wCtx.lineTo(x, y + 32);
                wCtx.stroke();
            }
        }
        this.wallTex = new THREE.CanvasTexture(wallCanvas);
        this.wallTex.wrapS = THREE.RepeatWrapping;
        this.wallTex.wrapT = THREE.RepeatWrapping;

        // Wooden Crate Texture
        const crateCanvas = document.createElement('canvas');
        crateCanvas.width = 128;
        crateCanvas.height = 128;
        const cCtx = crateCanvas.getContext('2d');
        cCtx.fillStyle = '#9a6b3b';
        cCtx.fillRect(0, 0, 128, 128);
        cCtx.strokeStyle = '#5c3c1b';
        cCtx.lineWidth = 8;
        cCtx.strokeRect(4, 4, 120, 120);
        cCtx.beginPath();
        cCtx.moveTo(4, 4);
        cCtx.lineTo(124, 124);
        cCtx.moveTo(124, 4);
        cCtx.lineTo(4, 124);
        cCtx.stroke();
        this.crateTex = new THREE.CanvasTexture(crateCanvas);
    }

    addBlock(x, y, z, w, h, d, material, isCrate = false) {
        const geo = new THREE.BoxGeometry(w, h, d);
        const mesh = new THREE.Mesh(geo, material);
        mesh.position.set(x, y + h / 2, z);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        this.scene.add(mesh);
        this.shootableMeshes.push(mesh);

        this.colliders.push({
            minX: x - w / 2,
            maxX: x + w / 2,
            minY: y,
            maxY: y + h,
            minZ: z - d / 2,
            maxZ: z + d / 2,
            isCrate
        });
        return mesh;
    }

    buildArena() {
        // Ground Floor
        const floorGeo = new THREE.PlaneGeometry(this.mapSize, this.mapSize);
        const floorMat = new THREE.MeshStandardMaterial({ map: this.groundTex, roughness: 0.9 });
        const floor = new THREE.Mesh(floorGeo, floorMat);
        floor.rotation.x = -Math.PI / 2;
        floor.receiveShadow = true;
        this.scene.add(floor);
        this.shootableMeshes.push(floor);

        // Bombsite A & B Ground Markings
        this.createBombsiteZone(this.bombsites.A.x, this.bombsites.A.z, 'A');
        this.createBombsiteZone(this.bombsites.B.x, this.bombsites.B.z, 'B');

        const wallMat = new THREE.MeshStandardMaterial({ map: this.wallTex, roughness: 0.85 });
        const crateMat = new THREE.MeshStandardMaterial({ map: this.crateTex, roughness: 0.75 });
        const doorMat = new THREE.MeshStandardMaterial({ color: 0x6b4423, roughness: 0.7 });

        const half = this.mapSize / 2;
        const wallH = 6.5;

        // Outer Perimeter Walls
        this.addBlock(0, 0, -half, this.mapSize, wallH, 2, wallMat); // North
        this.addBlock(0, 0, half, this.mapSize, wallH, 2, wallMat);  // South
        this.addBlock(-half, 0, 0, 2, wallH, this.mapSize, wallMat); // West
        this.addBlock(half, 0, 0, 2, wallH, this.mapSize, wallMat);  // East

        // --- DUST 2 INSPIRED LANE dividers ---
        // Left Side (B Tunnels & Mid Divider)
        this.addBlock(-14, 0, 15, 2.5, wallH, 26, wallMat);
        this.addBlock(-14, 0, -14, 2.5, wallH, 18, wallMat);

        // Right Side (Long A & Mid Divider)
        this.addBlock(14, 0, 15, 2.5, wallH, 26, wallMat);
        this.addBlock(14, 0, -14, 2.5, wallH, 18, wallMat);

        // Classic Mid Double Doors (with sniper peek gap in center!)
        this.addBlock(-7.5, 0, 0, 11, wallH, 1.8, wallMat);
        this.addBlock(7.5, 0, 0, 11, wallH, 1.8, wallMat);
        // Angled wooden doors in middle
        this.addBlock(-1.6, 0, 0.2, 1.8, 4.5, 0.5, doorMat);
        this.addBlock(1.6, 0, -0.2, 1.8, 4.5, 0.5, doorMat);

        // T-Spawn Cover Wall
        this.addBlock(0, 0, 26, 12, 3.2, 2.0, wallMat);

        // CT-Spawn Cover Wall
        this.addBlock(0, 0, -26, 12, 3.2, 2.0, wallMat);

        // Long A Doors / Chokepoint Walls
        this.addBlock(22, 0, 12, 8, wallH, 2, wallMat);
        this.addBlock(38, 0, 12, 10, wallH, 2, wallMat);

        // B Tunnels Chokepoint Walls
        this.addBlock(-22, 0, 8, 8, wallH, 2, wallMat);
        this.addBlock(-38, 0, 8, 10, wallH, 2, wallMat);
        // B Tunnels Roof / Arch feel
        this.addBlock(-28, 4.2, 8, 16, 2.3, 18, wallMat);

        // --- BOMBSITE A CRATES & COVER ---
        this.addBlock(26, 0, -22, 3.2, 2.2, 3.2, crateMat, true);
        this.addBlock(28.5, 0, -19.5, 2.2, 1.5, 2.2, crateMat, true);
        this.addBlock(22, 0, -26, 2.5, 2.5, 2.5, crateMat, true);
        this.addBlock(32, 0, -12, 3.0, 2.2, 3.0, crateMat, true);

        // --- BOMBSITE B CRATES & COVER ---
        this.addBlock(-26, 0, -22, 3.2, 2.2, 3.2, crateMat, true);
        this.addBlock(-29, 0, -20, 2.2, 1.5, 2.2, crateMat, true);
        this.addBlock(-22, 0, -26, 2.5, 2.5, 2.5, crateMat, true);
        this.addBlock(-31, 0, -10, 2.8, 2.2, 2.8, crateMat, true);

        // --- MID & CATWALK CRATES (Jumpable!) ---
        this.addBlock(-5, 0, 11, 2.2, 1.4, 2.2, crateMat, true);
        this.addBlock(5, 0, -11, 2.2, 1.4, 2.2, crateMat, true);
        this.addBlock(9, 0, 5, 2.0, 1.3, 2.0, crateMat, true);
        this.addBlock(-9, 0, -6, 2.0, 1.3, 2.0, crateMat, true);
    }

    createBombsiteZone(x, z, label) {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');

        ctx.strokeStyle = 'rgba(239, 68, 68, 0.85)';
        ctx.lineWidth = 10;
        ctx.setLineDash([20, 12]);
        ctx.strokeRect(12, 12, 232, 232);

        ctx.fillStyle = 'rgba(239, 68, 68, 0.16)';
        ctx.fillRect(12, 12, 232, 232);

        ctx.fillStyle = 'rgba(239, 68, 68, 0.88)';
        ctx.font = 'bold 120px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(label, 128, 128);

        const tex = new THREE.CanvasTexture(canvas);
        const geo = new THREE.PlaneGeometry(11, 11);
        const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.rotation.x = -Math.PI / 2;
        mesh.position.set(x, 0.03, z);
        this.scene.add(mesh);
    }

    getInBombsite(x, z) {
        for (const key of ['A', 'B']) {
            const site = this.bombsites[key];
            const dist = Math.hypot(x - site.x, z - site.z);
            if (dist <= site.radius) return key;
        }
        return null;
    }

    drawRadar(ctx, width, height, localPlayer, entities, bombState) {
        ctx.clearRect(0, 0, width, height);

        // Background
        ctx.fillStyle = 'rgba(10, 16, 28, 0.92)';
        ctx.fillRect(0, 0, width, height);

        const scale = width / this.mapSize;
        const toRadarX = (wx) => (wx + this.mapSize / 2) * scale;
        const toRadarY = (wz) => (wz + this.mapSize / 2) * scale;

        // Draw walls / colliders
        ctx.fillStyle = 'rgba(148, 163, 184, 0.38)';
        for (const c of this.colliders) {
            const rx = toRadarX(c.minX);
            const ry = toRadarY(c.minZ);
            const rw = (c.maxX - c.minX) * scale;
            const rh = (c.maxZ - c.minZ) * scale;
            ctx.fillRect(rx, ry, rw, rh);
        }

        // Draw Bombsites A & B
        for (const key of ['A', 'B']) {
            const site = this.bombsites[key];
            const sx = toRadarX(site.x);
            const sy = toRadarY(site.z);
            ctx.strokeStyle = '#ef4444';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(sx - 8, sy - 8, 16, 16);
            ctx.fillStyle = '#fca5a5';
            ctx.font = 'bold 10px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(key, sx, sy + 3.5);
        }

        // Draw Planted Bomb
        if (bombState && bombState.planted) {
            const bx = toRadarX(bombState.x);
            const by = toRadarY(bombState.z);
            ctx.fillStyle = (Math.floor(Date.now() / 250) % 2 === 0) ? '#ef4444' : '#fde047';
            ctx.beginPath();
            ctx.arc(bx, by, 5, 0, Math.PI * 2);
            ctx.fill();
        }

        // Draw Other Players / Bots
        for (const ent of entities) {
            if (ent.hp <= 0) continue;
            const isAlly = ent.team === localPlayer.team;
            // Show allies always, show enemies if firing recently or close
            if (!isAlly && !ent.radarVisible) continue;

            const ex = toRadarX(ent.x);
            const ey = toRadarY(ent.z);
            ctx.fillStyle = ent.team === 'T' ? '#fbbf24' : '#38bdf8';
            if (!isAlly) ctx.fillStyle = '#ef4444';

            ctx.beginPath();
            ctx.arc(ex, ey, 3.2, 0, Math.PI * 2);
            ctx.fill();
        }

        // Draw Local Player + FOV Cone
        if (localPlayer && localPlayer.hp > 0) {
            const px = toRadarX(localPlayer.x);
            const py = toRadarY(localPlayer.z);

            ctx.save();
            ctx.translate(px, py);
            ctx.rotate(-localPlayer.yaw);

            // View cone
            ctx.fillStyle = 'rgba(34, 197, 94, 0.22)';
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.arc(0, 0, 22, -Math.PI / 2 - 0.45, -Math.PI / 2 + 0.45);
            ctx.closePath();
            ctx.fill();

            // Player dot
            ctx.fillStyle = '#22c55e';
            ctx.beginPath();
            ctx.arc(0, 0, 3.8, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }
}

window.GameMap = GameMap;
