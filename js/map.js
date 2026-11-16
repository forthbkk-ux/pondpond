// Photorealistic DE_DUST2 3D Map Builder (CS2 / Source 2 Inspired Gritty Military Realism)

class GameMap {
    constructor(scene) {
        this.scene = scene;
        this.colliders = [];
        this.shootableMeshes = [];
        this.mapSize = 90;

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

        this.waypoints = [
            { x: 0, z: 32 },
            { x: 0, z: 16 },
            { x: 0, z: 0 },
            { x: 0, z: -18 },
            { x: 0, z: -32 },
            { x: 25, z: 24 },
            { x: 28, z: 4 },
            { x: 26, z: -22 },
            { x: 14, z: -24 },
            { x: -25, z: 22 },
            { x: -28, z: 2 },
            { x: -26, z: -22 },
            { x: -12, z: -22 }
        ];

        this.buildEnvironmentAndSky();
        this.buildRealisticTextures();
        this.buildArena();
    }

    buildEnvironmentAndSky() {
        // Photorealistic desaturated hazy Middle-Eastern sky + environment reflection map
        const skyCanvas = document.createElement('canvas');
        skyCanvas.width = 1024;
        skyCanvas.height = 512;
        const ctx = skyCanvas.getContext('2d');

        // Realistic atmospheric gradient (zenith -> horizon -> ground bounce)
        const grad = ctx.createLinearGradient(0, 0, 0, 512);
        grad.addColorStop(0.0, '#3a4f66');
        grad.addColorStop(0.28, '#647d94');
        grad.addColorStop(0.46, '#9cb0bf');
        grad.addColorStop(0.52, '#cfc4b0');
        grad.addColorStop(0.56, '#8c7d65');
        grad.addColorStop(1.0, '#4a3f31');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 1024, 512);

        // Realistic Sun Glare
        const sunGrad = ctx.createRadialGradient(720, 145, 2, 720, 145, 130);
        sunGrad.addColorStop(0, 'rgba(255, 252, 240, 1.0)');
        sunGrad.addColorStop(0.15, 'rgba(255, 240, 200, 0.75)');
        sunGrad.addColorStop(0.45, 'rgba(235, 215, 175, 0.22)');
        sunGrad.addColorStop(1, 'rgba(235, 215, 175, 0.0)');
        ctx.fillStyle = sunGrad;
        ctx.beginPath();
        ctx.arc(720, 145, 130, 0, Math.PI * 2);
        ctx.fill();

        // Distant realistic hazy cloud strata
        for (let i = 0; i < 60; i++) {
            const cx = Math.random() * 1024;
            const cy = 90 + Math.random() * 140;
            const rx = 40 + Math.random() * 90;
            const ry = 8 + Math.random() * 20;
            const cGrad = ctx.createRadialGradient(cx, cy, 1, cx, cy, rx);
            cGrad.addColorStop(0, 'rgba(245, 242, 235, 0.18)');
            cGrad.addColorStop(1, 'rgba(245, 242, 235, 0.0)');
            ctx.fillStyle = cGrad;
            ctx.save();
            ctx.translate(cx, cy);
            ctx.scale(1, ry / rx);
            ctx.beginPath();
            ctx.arc(0, 0, rx, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        const skyTex = new THREE.CanvasTexture(skyCanvas);
        skyTex.mapping = THREE.EquirectangularReflectionMapping;

        // Set as scene environment so metallic guns, scopes, and helmets reflect the sky & desert!
        this.scene.environment = skyTex;

        const skyGeo = new THREE.SphereGeometry(190, 32, 24);
        const skyMat = new THREE.MeshBasicMaterial({ map: skyTex, side: THREE.BackSide, fog: false });
        const skyMesh = new THREE.Mesh(skyGeo, skyMat);
        this.scene.add(skyMesh);
    }

    buildRealisticTextures() {
        // 1. Gritty Weathered Desert Concrete & Cobblestone Ground (512x512)
        const groundCanvas = document.createElement('canvas');
        groundCanvas.width = 512;
        groundCanvas.height = 512;
        const gCtx = groundCanvas.getContext('2d');

        gCtx.fillStyle = '#8f826d';
        gCtx.fillRect(0, 0, 512, 512);

        // Concrete slabs with realistic tonal variation
        const slabSize = 64;
        for (let y = 0; y < 512; y += slabSize) {
            for (let x = 0; x < 512; x += slabSize) {
                const v = 128 + Math.floor((Math.random() - 0.5) * 20);
                gCtx.fillStyle = `rgb(${v + 12}, ${v + 2}, ${v - 14})`;
                gCtx.fillRect(x + 1, y + 1, slabSize - 2, slabSize - 2);

                // Dark expansion joint crevice
                gCtx.strokeStyle = 'rgba(42, 36, 28, 0.65)';
                gCtx.lineWidth = 2;
                gCtx.strokeRect(x, y, slabSize, slabSize);
            }
        }

        // Sand patches & dirt blotches
        for (let i = 0; i < 90; i++) {
            const bx = Math.random() * 512;
            const by = Math.random() * 512;
            const br = 12 + Math.random() * 45;
            const bGrad = gCtx.createRadialGradient(bx, by, 1, bx, by, br);
            const isDark = Math.random() > 0.5;
            bGrad.addColorStop(0, isDark ? 'rgba(55, 46, 34, 0.22)' : 'rgba(175, 158, 128, 0.25)');
            bGrad.addColorStop(1, 'rgba(0,0,0,0)');
            gCtx.fillStyle = bGrad;
            gCtx.beginPath();
            gCtx.arc(bx, by, br, 0, Math.PI * 2);
            gCtx.fill();
        }

        // High-frequency stone & asphalt grain
        for (let i = 0; i < 18000; i++) {
            gCtx.fillStyle = i % 2 === 0 ? 'rgba(30, 25, 18, 0.28)' : 'rgba(215, 200, 175, 0.22)';
            gCtx.fillRect(Math.random() * 512, Math.random() * 512, 1.5, 1.5);
        }

        this.groundTex = new THREE.CanvasTexture(groundCanvas);
        this.groundTex.wrapS = THREE.RepeatWrapping;
        this.groundTex.wrapT = THREE.RepeatWrapping;
        this.groundTex.repeat.set(20, 20);
        this.groundTex.anisotropy = 8;

        // 2. Photorealistic Aged Stucco & Exposed Masonry Wall Texture (512x512)
        const wallCanvas = document.createElement('canvas');
        wallCanvas.width = 512;
        wallCanvas.height = 512;
        const wCtx = wallCanvas.getContext('2d');

        // Realistic desaturated sandstone-grey plaster with strong bottom & top grime (AO)
        const wallGrad = wCtx.createLinearGradient(0, 0, 0, 512);
        wallGrad.addColorStop(0.0, '#594e3f');
        wallGrad.addColorStop(0.10, '#9c8f7a');
        wallGrad.addColorStop(0.55, '#948671');
        wallGrad.addColorStop(0.85, '#7d6f5b');
        wallGrad.addColorStop(1.0, '#3d3429');
        wCtx.fillStyle = wallGrad;
        wCtx.fillRect(0, 0, 512, 512);

        // Coursed stone / concrete block seams
        for (let y = 0; y < 512; y += 64) {
            wCtx.fillStyle = 'rgba(38, 32, 24, 0.55)';
            wCtx.fillRect(0, y, 512, 3);
            wCtx.fillStyle = 'rgba(210, 198, 178, 0.2)';
            wCtx.fillRect(0, y + 3, 512, 1.5);

            const offset = (y / 64) % 2 === 0 ? 0 : 64;
            for (let x = offset; x < 512; x += 128) {
                wCtx.fillStyle = 'rgba(38, 32, 24, 0.5)';
                wCtx.fillRect(x, y, 3, 64);

                const tone = (Math.random() - 0.5) * 18;
                wCtx.fillStyle = tone > 0 ? `rgba(255,250,240,${tone / 255})` : `rgba(20,15,10,${-tone / 255})`;
                wCtx.fillRect(x + 3, y + 3, 125, 61);
            }
        }

        // Water streaks & weathering stains from top of wall
        for (let i = 0; i < 35; i++) {
            const sx = Math.random() * 512;
            const sw = 8 + Math.random() * 24;
            const sh = 60 + Math.random() * 220;
            const sGrad = wCtx.createLinearGradient(0, 0, 0, sh);
            sGrad.addColorStop(0, 'rgba(35, 28, 20, 0.32)');
            sGrad.addColorStop(1, 'rgba(35, 28, 20, 0.0)');
            wCtx.fillStyle = sGrad;
            wCtx.fillRect(sx, 0, sw, sh);
        }

        // Concrete & stucco micro-pitting noise
        for (let i = 0; i < 16000; i++) {
            wCtx.fillStyle = i % 2 === 0 ? 'rgba(25, 20, 14, 0.26)' : 'rgba(225, 215, 195, 0.18)';
            wCtx.fillRect(Math.random() * 512, Math.random() * 512, 2, 2);
        }

        this.wallTex = new THREE.CanvasTexture(wallCanvas);
        this.wallTex.wrapS = THREE.RepeatWrapping;
        this.wallTex.wrapT = THREE.RepeatWrapping;
        this.wallTex.anisotropy = 8;

        // 3. Realistic Weathered Military Timber & Steel Crate Texture (512x512)
        const crateCanvas = document.createElement('canvas');
        crateCanvas.width = 512;
        crateCanvas.height = 512;
        const cCtx = crateCanvas.getContext('2d');

        cCtx.fillStyle = '#5c4935';
        cCtx.fillRect(0, 0, 512, 512);

        // Wood planks with realistic fiber grain
        for (let y = 0; y < 512; y += 64) {
            const base = 78 + (y / 64 % 2) * 10;
            cCtx.fillStyle = `rgb(${base + 18}, ${base}, ${base - 22})`;
            cCtx.fillRect(0, y, 512, 61);
            cCtx.fillStyle = '#241a10';
            cCtx.fillRect(0, y + 61, 512, 3);

            // Wood grain lines
            for (let g = 0; g < 40; g++) {
                cCtx.fillStyle = g % 2 === 0 ? 'rgba(30, 20, 10, 0.18)' : 'rgba(160, 130, 95, 0.12)';
                cCtx.fillRect(0, y + Math.random() * 58, 512, 1.5);
            }
        }

        // Heavy framing & crossbeam
        cCtx.strokeStyle = '#3d2e1e';
        cCtx.lineWidth = 34;
        cCtx.strokeRect(17, 17, 478, 478);
        cCtx.lineWidth = 26;
        cCtx.beginPath();
        cCtx.moveTo(24, 24);
        cCtx.lineTo(488, 488);
        cCtx.moveTo(488, 24);
        cCtx.lineTo(24, 488);
        cCtx.stroke();

        // Dark gunmetal steel corner reinforcements & bolts
        cCtx.fillStyle = '#1e2226';
        const corners = [[0, 0], [432, 0], [0, 432], [432, 432]];
        for (const [cx, cy] of corners) {
            cCtx.fillRect(cx, cy, 80, 80);
            cCtx.fillStyle = '#525860';
            cCtx.beginPath();
            cCtx.arc(cx + 22, cy + 22, 5, 0, Math.PI * 2);
            cCtx.arc(cx + 58, cy + 58, 5, 0, Math.PI * 2);
            cCtx.fill();
            cCtx.fillStyle = '#1e2226';
        }

        // Gritty edge grime (vignette on crate face)
        const cGrad = cCtx.createRadialGradient(256, 256, 120, 256, 256, 360);
        cGrad.addColorStop(0, 'rgba(0,0,0,0)');
        cGrad.addColorStop(1, 'rgba(15, 12, 8, 0.55)');
        cCtx.fillStyle = cGrad;
        cCtx.fillRect(0, 0, 512, 512);

        cCtx.fillStyle = 'rgba(220, 210, 185, 0.55)';
        cCtx.font = 'bold 28px monospace';
        cCtx.textAlign = 'center';
        cCtx.fillText('NATO // ORD-7.62', 256, 248);
        cCtx.font = 'bold 20px monospace';
        cCtx.fillText('LOT 44-908B', 256, 280);

        this.crateTex = new THREE.CanvasTexture(crateCanvas);
        this.crateTex.anisotropy = 8;

        // 4. Rusted Industrial Steel Double Door Texture
        const doorCanvas = document.createElement('canvas');
        doorCanvas.width = 256;
        doorCanvas.height = 512;
        const dCtx = doorCanvas.getContext('2d');
        dCtx.fillStyle = '#333b33';
        dCtx.fillRect(0, 0, 256, 512);
        dCtx.strokeStyle = '#1d221d';
        dCtx.lineWidth = 16;
        dCtx.strokeRect(8, 8, 240, 496);
        dCtx.strokeRect(28, 35, 200, 200);
        dCtx.strokeRect(28, 265, 200, 210);
        for (let i = 0; i < 4000; i++) {
            dCtx.fillStyle = i % 3 === 0 ? 'rgba(110, 65, 35, 0.22)' : 'rgba(18, 22, 18, 0.25)';
            dCtx.fillRect(Math.random() * 256, Math.random() * 512, 3, 4);
        }
        this.doorTex = new THREE.CanvasTexture(doorCanvas);
    }

    addBlock(x, y, z, w, h, d, material, isCrate = false, addTrim = false) {
        let mat = material;
        if (material.map === this.wallTex && (w > 4 || d > 4)) {
            const clonedTex = this.wallTex.clone();
            clonedTex.needsUpdate = true;
            clonedTex.repeat.set(Math.max(w, d) / 6, h / 6);
            mat = new THREE.MeshStandardMaterial({
                map: clonedTex,
                bumpMap: clonedTex,
                bumpScale: 0.085,
                roughness: 0.92,
                metalness: 0.04
            });
        }

        const geo = new THREE.BoxGeometry(w, h, d);
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(x, y + h / 2, z);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        this.scene.add(mesh);
        this.shootableMeshes.push(mesh);

        if (addTrim) {
            const capGeo = new THREE.BoxGeometry(w + 0.28, 0.38, d + 0.28);
            const capMat = new THREE.MeshStandardMaterial({
                color: 0x574c3d,
                bumpMap: this.wallTex,
                bumpScale: 0.05,
                roughness: 0.95
            });
            const cap = new THREE.Mesh(capGeo, capMat);
            cap.position.set(x, y + h + 0.19, z);
            cap.castShadow = true;
            cap.receiveShadow = true;
            this.scene.add(cap);
        }

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

    addConcreteBarrier(x, z, rotY = 0) {
        // Realistic Jersey Concrete Barrier
        const mat = new THREE.MeshStandardMaterial({
            map: this.groundTex,
            bumpMap: this.groundTex,
            bumpScale: 0.06,
            color: 0x8a8275,
            roughness: 0.92
        });
        const base = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.15, 0.75), mat);
        base.position.set(x, 0.575, z);
        base.rotation.y = rotY;
        base.castShadow = true;
        base.receiveShadow = true;
        this.scene.add(base);
        this.shootableMeshes.push(base);

        const w = rotY === 0 ? 3.2 : 0.75;
        const d = rotY === 0 ? 0.75 : 3.2;
        this.colliders.push({
            minX: x - w / 2, maxX: x + w / 2,
            minY: 0, maxY: 1.15,
            minZ: z - d / 2, maxZ: z + d / 2,
            isCrate: true
        });
    }

    addBarrelProp(x, z, colorHex = 0x3b4238) {
        const mat = new THREE.MeshStandardMaterial({
            color: colorHex,
            bumpMap: this.doorTex,
            bumpScale: 0.04,
            roughness: 0.52,
            metalness: 0.72
        });
        const mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.50, 0.50, 1.45, 18), mat);
        mesh.position.set(x, 0.725, z);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        this.scene.add(mesh);
        this.shootableMeshes.push(mesh);

        this.colliders.push({
            minX: x - 0.52, maxX: x + 0.52,
            minY: 0, maxY: 1.45,
            minZ: z - 0.52, maxZ: z + 0.52,
            isCrate: true
        });
    }

    buildArena() {
        const floorGeo = new THREE.PlaneGeometry(this.mapSize, this.mapSize);
        const floorMat = new THREE.MeshStandardMaterial({
            map: this.groundTex,
            bumpMap: this.groundTex,
            bumpScale: 0.065,
            roughness: 0.92,
            metalness: 0.04
        });
        const floor = new THREE.Mesh(floorGeo, floorMat);
        floor.rotation.x = -Math.PI / 2;
        floor.receiveShadow = true;
        this.scene.add(floor);
        this.shootableMeshes.push(floor);

        this.createBombsiteZone(this.bombsites.A.x, this.bombsites.A.z, 'A');
        this.createBombsiteZone(this.bombsites.B.x, this.bombsites.B.z, 'B');

        const wallMat = new THREE.MeshStandardMaterial({
            map: this.wallTex,
            bumpMap: this.wallTex,
            bumpScale: 0.085,
            roughness: 0.92,
            metalness: 0.04
        });
        const crateMat = new THREE.MeshStandardMaterial({
            map: this.crateTex,
            bumpMap: this.crateTex,
            bumpScale: 0.06,
            roughness: 0.80,
            metalness: 0.12
        });
        const doorMat = new THREE.MeshStandardMaterial({
            map: this.doorTex,
            bumpMap: this.doorTex,
            bumpScale: 0.05,
            roughness: 0.55,
            metalness: 0.65
        });

        const half = this.mapSize / 2;
        const wallH = 6.8;

        // Outer Perimeter Walls
        this.addBlock(0, 0, -half, this.mapSize, wallH, 2, wallMat, false, true);
        this.addBlock(0, 0, half, this.mapSize, wallH, 2, wallMat, false, true);
        this.addBlock(-half, 0, 0, 2, wallH, this.mapSize, wallMat, false, true);
        this.addBlock(half, 0, 0, 2, wallH, this.mapSize, wallMat, false, true);

        // --- DUST 2 LANE DIVIDERS ---
        this.addBlock(-14, 0, 15, 2.5, wallH, 26, wallMat, false, true);
        this.addBlock(-14, 0, -14, 2.5, wallH, 18, wallMat, false, true);

        this.addBlock(14, 0, 15, 2.5, wallH, 26, wallMat, false, true);
        this.addBlock(14, 0, -14, 2.5, wallH, 18, wallMat, false, true);

        // Classic Mid Double Doors
        this.addBlock(-7.5, 0, 0, 11, wallH, 1.8, wallMat, false, true);
        this.addBlock(7.5, 0, 0, 11, wallH, 1.8, wallMat, false, true);
        this.addBlock(0, 4.6, 0, 4.2, 2.2, 1.8, wallMat, false, true);
        this.addBlock(-1.6, 0, 0.2, 1.85, 4.6, 0.35, doorMat);
        this.addBlock(1.6, 0, -0.2, 1.85, 4.6, 0.35, doorMat);

        // T-Spawn Cover Wall & CT-Spawn Cover Wall
        this.addBlock(0, 0, 26, 12, 3.2, 2.0, wallMat, false, true);
        this.addBlock(0, 0, -26, 12, 3.2, 2.0, wallMat, false, true);

        // Long A Chokepoint Walls + Arch
        this.addBlock(22, 0, 12, 8, wallH, 2, wallMat, false, true);
        this.addBlock(38, 0, 12, 10, wallH, 2, wallMat, false, true);
        this.addBlock(29.5, 4.8, 12, 7, 2.0, 2, wallMat, false, true);

        // B Tunnels Chokepoint Walls & Covered Tunnel Roof
        this.addBlock(-22, 0, 8, 8, wallH, 2, wallMat, false, true);
        this.addBlock(-38, 0, 8, 10, wallH, 2, wallMat, false, true);
        this.addBlock(-28, 4.5, 8, 18, 2.3, 18, wallMat, false, true);

        const tunnelLight = new THREE.PointLight(0xffb74d, 1.15, 24);
        tunnelLight.position.set(-28, 4.0, 8);
        this.scene.add(tunnelLight);

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

        // --- MID & CATWALK CRATES ---
        this.addBlock(-5, 0, 11, 2.2, 1.4, 2.2, crateMat, true);
        this.addBlock(5, 0, -11, 2.2, 1.4, 2.2, crateMat, true);
        this.addBlock(9, 0, 5, 2.0, 1.3, 2.0, crateMat, true);
        this.addBlock(-9, 0, -6, 2.0, 1.3, 2.0, crateMat, true);

        // --- REALISTIC MILITARY CONCRETE BARRIERS & RUSTED BARRELS ---
        this.addConcreteBarrier(19, 28, 0);
        this.addConcreteBarrier(-19, 28, 0);
        this.addConcreteBarrier(19, -28, 0);
        this.addConcreteBarrier(-19, -28, 0);

        this.addBarrelProp(11.8, 16, 0x4a3525);
        this.addBarrelProp(-11.8, -15, 0x2f3832);
        this.addBarrelProp(35, -24, 0x3b4238);
        this.addBarrelProp(-35, -24, 0x4a3525);
    }

    createBombsiteZone(x, z, label) {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');

        // Stenciled spray-paint military zone marking on ground
        ctx.strokeStyle = 'rgba(185, 38, 38, 0.72)';
        ctx.lineWidth = 8;
        ctx.setLineDash([18, 14]);
        ctx.strokeRect(14, 14, 228, 228);

        ctx.fillStyle = 'rgba(185, 38, 38, 0.68)';
        ctx.font = 'bold 92px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`[ ${label} ]`, 128, 128);

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

        ctx.fillStyle = 'rgba(10, 14, 20, 0.94)';
        ctx.fillRect(0, 0, width, height);

        const scale = width / this.mapSize;
        const toRadarX = (wx) => (wx + this.mapSize / 2) * scale;
        const toRadarY = (wz) => (wz + this.mapSize / 2) * scale;

        ctx.fillStyle = 'rgba(148, 163, 184, 0.35)';
        for (const c of this.colliders) {
            const rx = toRadarX(c.minX);
            const ry = toRadarY(c.minZ);
            const rw = (c.maxX - c.minX) * scale;
            const rh = (c.maxZ - c.minZ) * scale;
            ctx.fillRect(rx, ry, rw, rh);
        }

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

        if (bombState && bombState.planted) {
            const bx = toRadarX(bombState.x);
            const by = toRadarY(bombState.z);
            ctx.fillStyle = (Math.floor(Date.now() / 250) % 2 === 0) ? '#ef4444' : '#fde047';
            ctx.beginPath();
            ctx.arc(bx, by, 5, 0, Math.PI * 2);
            ctx.fill();
        }

        for (const ent of entities) {
            if (ent.hp <= 0) continue;
            const isAlly = ent.team === localPlayer.team;
            if (!isAlly && !ent.radarVisible && !ent.isRemotePlayer) continue;

            const ex = toRadarX(ent.x);
            const ey = toRadarY(ent.z);
            ctx.fillStyle = isAlly ? (ent.team === 'T' ? '#fbbf24' : '#38bdf8') : '#ef4444';

            ctx.beginPath();
            ctx.arc(ex, ey, 3.4, 0, Math.PI * 2);
            ctx.fill();
        }

        if (localPlayer && localPlayer.hp > 0) {
            const px = toRadarX(localPlayer.x);
            const py = toRadarY(localPlayer.z);

            ctx.save();
            ctx.translate(px, py);
            ctx.rotate(-localPlayer.yaw);

            ctx.fillStyle = 'rgba(34, 197, 94, 0.22)';
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.arc(0, 0, 22, -Math.PI / 2 - 0.45, -Math.PI / 2 + 0.45);
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = '#22c55e';
            ctx.beginPath();
            ctx.arc(0, 0, 3.8, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }
}

window.GameMap = GameMap;
