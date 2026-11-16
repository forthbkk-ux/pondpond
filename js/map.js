// Comprehensive Multi-Map Arena System (CS2 / Source 2 Inspired Military Realism)
// Supports DE_DUST2, DE_INFERNO, DE_AZTEC, CS_ASSAULT, DE_NUKE, and AIM_MAP

const MAP_METADATA = {
    de_dust2: {
        id: 'de_dust2',
        name: '🏜️ DE_DUST2',
        subtitle: 'สมรภูมิทะเลทรายคลาสสิก (Dust II)',
        description: 'สมรภูมิทะเลทรายยอดนิยมตลอดกาล ทางแยก Long A, อุโมงค์ B Tunnels และประตูกลาง Mid Double Doors',
        mapSize: 90
    },
    de_inferno: {
        id: 'de_inferno',
        name: '🏛️ DE_INFERNO',
        subtitle: 'เมืองโบราณอิตาลี & ตรอกกล้วย (Inferno)',
        description: 'เมืองเก่าสไตล์ยุโรป ถนนหิน Cobblestone ทางโค้ง Banana สถาปัตยกรรมอิฐแดง และซุ้มโบสถ์คลาสสิก',
        mapSize: 90
    },
    de_aztec: {
        id: 'de_aztec',
        name: '🌿 DE_AZTEC',
        subtitle: 'วิหารโบราณหินมอสส์ & ป่าดงดิบ (Aztec)',
        description: 'ซากโบราณสถานอารยธรรมแอซเทกในป่าดิบชื้น คลองน้ำกลางแมตช์ และสะพานหินเชื่อมจุดปะทะ',
        mapSize: 96
    },
    cs_assault: {
        id: 'cs_assault',
        name: '🏭 CS_ASSAULT',
        subtitle: 'โกดังโรงงานยุทธวิธี & คอนเทนเนอร์ (Assault)',
        description: 'ลานจอดตู้คอนเทนเนอร์และโกดังอุตสาหกรรมขนาดใหญ่ ทางเข้าประตูม้วน ช่องระบายอากาศ และสะพานลอยเหล็ก',
        mapSize: 94
    },
    de_nuke: {
        id: 'de_nuke',
        name: '☢️ DE_NUKE',
        subtitle: 'โรงไฟฟ้านิวเคลียร์ลับสองชั้น (Nuke)',
        description: 'โรงไฟฟ้านิวเคลียร์ความมั่นคงสูง พื้นที่สองระดับ (ชั้นบน A / ชั้นล่าง B) และถังปฏิกรณ์ยูเรเนียม',
        mapSize: 90
    },
    aim_map: {
        id: 'aim_map',
        name: '🎯 AIM_MAP',
        subtitle: 'สมรภูมิดวลปืนระยะประชิด (Aim Arena)',
        description: 'ลานประลองดวลปืนสมมาตรยอดนิยม ร่องคูน้ำกลางสนาม และกล่องบังเกอร์ไม้สำหรับฝึกฝนความแม่นยำ',
        mapSize: 60
    }
};

class GameMap {
    constructor(scene, mapId = 'de_dust2', game = null) {
        this.scene = scene;
        this.game = game;
        this.currentMapId = mapId;
        this.colliders = [];
        this.shootableMeshes = [];
        this.mapObjects = [];
        this.mapLights = [];
        this.spawns = { T: [], CT: [] };
        this.bombsites = {};
        this.waypoints = [];
        this.mapSize = 90;

        this.load(mapId);
    }

    clear() {
        // Safely dispose all existing meshes, geometries, and materials
        for (const obj of this.mapObjects) {
            this.scene.remove(obj);
            if (obj.geometry) obj.geometry.dispose();
            if (obj.material) {
                if (Array.isArray(obj.material)) {
                    obj.material.forEach(m => {
                        if (m.map) m.map.dispose();
                        if (m.bumpMap && m.bumpMap !== m.map) m.bumpMap.dispose();
                        m.dispose();
                    });
                } else {
                    if (obj.material.map) obj.material.map.dispose();
                    if (obj.material.bumpMap && obj.material.bumpMap !== obj.material.map) obj.material.bumpMap.dispose();
                    obj.material.dispose();
                }
            }
        }
        this.mapObjects = [];

        // Remove dynamic map lights
        for (const light of this.mapLights) {
            this.scene.remove(light);
        }
        this.mapLights = [];

        this.colliders = [];
        this.shootableMeshes = [];
        this.spawns = { T: [], CT: [] };
        this.bombsites = {};
        this.waypoints = [];
    }

    load(mapId = 'de_dust2') {
        if (!MAP_METADATA[mapId]) mapId = 'de_dust2';
        this.clear();
        this.currentMapId = mapId;
        const meta = MAP_METADATA[mapId];
        this.mapSize = meta.mapSize;

        switch (mapId) {
            case 'de_inferno':
                this.buildInferno();
                break;
            case 'de_aztec':
                this.buildAztec();
                break;
            case 'cs_assault':
                this.buildAssault();
                break;
            case 'de_nuke':
                this.buildNuke();
                break;
            case 'aim_map':
                this.buildAimMap();
                break;
            case 'de_dust2':
            default:
                this.buildDust2();
                break;
        }
    }

    // ==================== SHARED GEOMETRY HELPERS ====================
    addBlock(x, y, z, w, h, d, material, isCrate = false, addTrim = false) {
        let mat = material;
        if (material && material.map && (w > 4 || d > 4)) {
            const clonedTex = material.map.clone();
            clonedTex.needsUpdate = true;
            clonedTex.repeat.set(Math.max(w, d) / 6, h / 6);
            mat = material.clone();
            mat.map = clonedTex;
            mat.bumpMap = clonedTex;
        }

        const geo = new THREE.BoxGeometry(w, h, d);
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(x, y + h / 2, z);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        this.scene.add(mesh);
        this.mapObjects.push(mesh);
        this.shootableMeshes.push(mesh);

        if (addTrim) {
            const capGeo = new THREE.BoxGeometry(w + 0.28, 0.38, d + 0.28);
            const capMat = new THREE.MeshStandardMaterial({
                color: 0x3d352c,
                roughness: 0.95
            });
            const cap = new THREE.Mesh(capGeo, capMat);
            cap.position.set(x, y + h + 0.19, z);
            cap.castShadow = true;
            cap.receiveShadow = true;
            this.scene.add(cap);
            this.mapObjects.push(cap);
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

    addConcreteBarrier(x, z, rotY = 0, tex = null) {
        const mat = new THREE.MeshStandardMaterial({
            map: tex || this.groundTex,
            bumpMap: tex || this.groundTex,
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
        this.mapObjects.push(base);
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

    addBarrelProp(x, z, colorHex = 0x3b4238, isHazard = false) {
        const mat = new THREE.MeshStandardMaterial({
            color: colorHex,
            roughness: isHazard ? 0.38 : 0.52,
            metalness: isHazard ? 0.65 : 0.72
        });
        const mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.50, 0.50, 1.45, 18), mat);
        mesh.position.set(x, 0.725, z);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        this.scene.add(mesh);
        this.mapObjects.push(mesh);
        this.shootableMeshes.push(mesh);

        // Black metal rings around barrel
        const ringGeo = new THREE.TorusGeometry(0.51, 0.022, 8, 20);
        const ringMat = new THREE.MeshStandardMaterial({ color: 0x18181b, metalness: 0.9, roughness: 0.3 });
        const ring1 = new THREE.Mesh(ringGeo, ringMat);
        ring1.rotation.x = Math.PI / 2;
        ring1.position.set(x, 0.35, z);
        const ring2 = new THREE.Mesh(ringGeo, ringMat);
        ring2.rotation.x = Math.PI / 2;
        ring2.position.set(x, 1.10, z);
        this.scene.add(ring1);
        this.scene.add(ring2);
        this.mapObjects.push(ring1, ring2);

        this.colliders.push({
            minX: x - 0.52, maxX: x + 0.52,
            minY: 0, maxY: 1.45,
            minZ: z - 0.52, maxZ: z + 0.52,
            isCrate: true
        });
    }

    addContainerProp(x, z, w, h, d, rotY = 0, colorHex = 0x1e3a8a, labelText = 'MSK-704') {
        // Realistic 20ft/40ft shipping freight container with corrugated ribs & stenciled text
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = `#${colorHex.toString(16).padStart(6, '0')}`;
        ctx.fillRect(0, 0, 512, 256);

        // Vertical corrugation ribs
        for (let vx = 0; vx < 512; vx += 16) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.32)';
            ctx.fillRect(vx, 0, 8, 256);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
            ctx.fillRect(vx + 8, 0, 8, 256);
        }

        // Heavy industrial frame borders
        ctx.strokeStyle = 'rgba(0,0,0,0.65)';
        ctx.lineWidth = 14;
        ctx.strokeRect(7, 7, 498, 242);

        // White stenciled container code
        ctx.fillStyle = 'rgba(255, 255, 255, 0.88)';
        ctx.font = 'bold 28px monospace';
        ctx.fillText(labelText, 34, 52);
        ctx.font = 'bold 16px monospace';
        ctx.fillText('MAX GROSS 32,500 KG // 71,650 LB', 34, 82);

        // Corner castings
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, 36, 36);
        ctx.fillRect(476, 0, 36, 36);
        ctx.fillRect(0, 220, 36, 36);
        ctx.fillRect(476, 220, 36, 36);

        const tex = new THREE.CanvasTexture(canvas);
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;

        const mat = new THREE.MeshStandardMaterial({
            map: tex,
            bumpMap: tex,
            bumpScale: 0.08,
            roughness: 0.65,
            metalness: 0.45
        });

        const geo = new THREE.BoxGeometry(w, h, d);
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(x, h / 2, z);
        mesh.rotation.y = rotY;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        this.scene.add(mesh);
        this.mapObjects.push(mesh);
        this.shootableMeshes.push(mesh);

        const effW = rotY === 0 ? w : d;
        const effD = rotY === 0 ? d : w;
        this.colliders.push({
            minX: x - effW / 2, maxX: x + effW / 2,
            minY: 0, maxY: h,
            minZ: z - effD / 2, maxZ: z + effD / 2,
            isCrate: true
        });
    }

    createBombsiteZone(x, z, label) {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');

        // Stenciled spray-paint military zone marking on ground
        ctx.strokeStyle = 'rgba(220, 38, 38, 0.78)';
        ctx.lineWidth = 10;
        ctx.setLineDash([20, 14]);
        ctx.strokeRect(14, 14, 228, 228);

        ctx.fillStyle = 'rgba(220, 38, 38, 0.75)';
        ctx.font = 'bold 96px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`[ ${label} ]`, 128, 128);

        const tex = new THREE.CanvasTexture(canvas);
        const geo = new THREE.PlaneGeometry(11, 11);
        const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.rotation.x = -Math.PI / 2;
        mesh.position.set(x, 0.04, z);
        this.scene.add(mesh);
        this.mapObjects.push(mesh);
    }

    buildSky(topColor, midColor, botColor, sunX = 720, sunY = 145, sunColor = 'rgba(255, 245, 210, 1.0)') {
        const skyCanvas = document.createElement('canvas');
        skyCanvas.width = 1024;
        skyCanvas.height = 512;
        const ctx = skyCanvas.getContext('2d');

        const grad = ctx.createLinearGradient(0, 0, 0, 512);
        grad.addColorStop(0.0, topColor);
        grad.addColorStop(0.35, midColor);
        grad.addColorStop(0.55, botColor);
        grad.addColorStop(1.0, '#1a1f26');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 1024, 512);

        // Sun glow
        const sunGrad = ctx.createRadialGradient(sunX, sunY, 2, sunX, sunY, 140);
        sunGrad.addColorStop(0, sunColor);
        sunGrad.addColorStop(0.2, 'rgba(255, 230, 180, 0.65)');
        sunGrad.addColorStop(0.5, 'rgba(240, 210, 160, 0.18)');
        sunGrad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = sunGrad;
        ctx.beginPath();
        ctx.arc(sunX, sunY, 140, 0, Math.PI * 2);
        ctx.fill();

        // Atmospheric haze & cloud strata
        for (let i = 0; i < 45; i++) {
            const cx = Math.random() * 1024;
            const cy = 90 + Math.random() * 160;
            const rx = 50 + Math.random() * 100;
            const ry = 8 + Math.random() * 22;
            const cGrad = ctx.createRadialGradient(cx, cy, 1, cx, cy, rx);
            cGrad.addColorStop(0, 'rgba(245, 245, 245, 0.15)');
            cGrad.addColorStop(1, 'rgba(245, 245, 245, 0.0)');
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
        this.scene.environment = skyTex;

        const skyGeo = new THREE.SphereGeometry(190, 32, 24);
        const skyMat = new THREE.MeshBasicMaterial({ map: skyTex, side: THREE.BackSide, fog: false });
        const skyMesh = new THREE.Mesh(skyGeo, skyMat);
        this.scene.add(skyMesh);
        this.mapObjects.push(skyMesh);
    }

    updateAtmosphericLighting(hemiSky, hemiGround, ambientCol, sunCol, sunIntensity = 1.35) {
        if (!this.game) return;
        if (this.game.hemiLight) {
            this.game.hemiLight.color.setHex(hemiSky);
            this.game.hemiLight.groundColor.setHex(hemiGround);
        }
        if (this.game.ambientLight) {
            this.game.ambientLight.color.setHex(ambientCol);
        }
        if (this.game.sunLight) {
            this.game.sunLight.color.setHex(sunCol);
            this.game.sunLight.intensity = sunIntensity;
        }
    }

    // =========================================================================
    // MAP 1: DE_DUST2 (Classic Desert Sandstone Fortress)
    // =========================================================================
    buildDust2() {
        this.buildSky('#3a4f66', '#9cb0bf', '#cfc4b0', 720, 145, 'rgba(255, 252, 240, 1.0)');
        this.updateAtmosphericLighting(0x8fa3b5, 0x6e604c, 0xe5dec9, 0xfff3db, 1.38);

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
            { x: 0, z: 32 }, { x: 0, z: 16 }, { x: 0, z: 0 }, { x: 0, z: -18 }, { x: 0, z: -32 },
            { x: 25, z: 24 }, { x: 28, z: 4 }, { x: 26, z: -22 }, { x: 14, z: -24 },
            { x: -25, z: 22 }, { x: -28, z: 2 }, { x: -26, z: -22 }, { x: -12, z: -22 }
        ];

        // 1. Desert Ground
        const groundCanvas = document.createElement('canvas');
        groundCanvas.width = 512;
        groundCanvas.height = 512;
        const gCtx = groundCanvas.getContext('2d');
        gCtx.fillStyle = '#8f826d';
        gCtx.fillRect(0, 0, 512, 512);
        for (let y = 0; y < 512; y += 64) {
            for (let x = 0; x < 512; x += 64) {
                const v = 128 + Math.floor((Math.random() - 0.5) * 20);
                gCtx.fillStyle = `rgb(${v + 12}, ${v + 2}, ${v - 14})`;
                gCtx.fillRect(x + 1, y + 1, 62, 62);
                gCtx.strokeStyle = 'rgba(42, 36, 28, 0.65)';
                gCtx.lineWidth = 2;
                gCtx.strokeRect(x, y, 64, 64);
            }
        }
        for (let i = 0; i < 15000; i++) {
            gCtx.fillStyle = i % 2 === 0 ? 'rgba(30, 25, 18, 0.28)' : 'rgba(215, 200, 175, 0.22)';
            gCtx.fillRect(Math.random() * 512, Math.random() * 512, 1.5, 1.5);
        }
        this.groundTex = new THREE.CanvasTexture(groundCanvas);
        this.groundTex.wrapS = THREE.RepeatWrapping;
        this.groundTex.wrapT = THREE.RepeatWrapping;
        this.groundTex.repeat.set(20, 20);

        // 2. Sandstone Walls
        const wallCanvas = document.createElement('canvas');
        wallCanvas.width = 512;
        wallCanvas.height = 512;
        const wCtx = wallCanvas.getContext('2d');
        const wallGrad = wCtx.createLinearGradient(0, 0, 0, 512);
        wallGrad.addColorStop(0.0, '#594e3f');
        wallGrad.addColorStop(0.10, '#9c8f7a');
        wallGrad.addColorStop(0.55, '#948671');
        wallGrad.addColorStop(0.85, '#7d6f5b');
        wallGrad.addColorStop(1.0, '#3d3429');
        wCtx.fillStyle = wallGrad;
        wCtx.fillRect(0, 0, 512, 512);
        for (let y = 0; y < 512; y += 64) {
            wCtx.fillStyle = 'rgba(38, 32, 24, 0.55)';
            wCtx.fillRect(0, y, 512, 3);
            const offset = (y / 64) % 2 === 0 ? 0 : 64;
            for (let x = offset; x < 512; x += 128) {
                wCtx.fillStyle = 'rgba(38, 32, 24, 0.5)';
                wCtx.fillRect(x, y, 3, 64);
            }
        }
        this.wallTex = new THREE.CanvasTexture(wallCanvas);
        this.wallTex.wrapS = THREE.RepeatWrapping;
        this.wallTex.wrapT = THREE.RepeatWrapping;

        // 3. NATO Wood Crates
        const crateCanvas = document.createElement('canvas');
        crateCanvas.width = 512;
        crateCanvas.height = 512;
        const cCtx = crateCanvas.getContext('2d');
        cCtx.fillStyle = '#5c4935';
        cCtx.fillRect(0, 0, 512, 512);
        for (let y = 0; y < 512; y += 64) {
            const base = 78 + (y / 64 % 2) * 10;
            cCtx.fillStyle = `rgb(${base + 18}, ${base}, ${base - 22})`;
            cCtx.fillRect(0, y, 512, 61);
            cCtx.fillStyle = '#241a10';
            cCtx.fillRect(0, y + 61, 512, 3);
        }
        cCtx.strokeStyle = '#3d2e1e';
        cCtx.lineWidth = 34;
        cCtx.strokeRect(17, 17, 478, 478);
        cCtx.fillStyle = 'rgba(220, 210, 185, 0.65)';
        cCtx.font = 'bold 28px monospace';
        cCtx.textAlign = 'center';
        cCtx.fillText('NATO // ORD-7.62', 256, 256);
        this.crateTex = new THREE.CanvasTexture(crateCanvas);

        // Floor Mesh
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
        this.mapObjects.push(floor);
        this.shootableMeshes.push(floor);

        this.createBombsiteZone(this.bombsites.A.x, this.bombsites.A.z, 'A');
        this.createBombsiteZone(this.bombsites.B.x, this.bombsites.B.z, 'B');

        const wallMat = new THREE.MeshStandardMaterial({ map: this.wallTex, bumpMap: this.wallTex, bumpScale: 0.08, roughness: 0.92 });
        const crateMat = new THREE.MeshStandardMaterial({ map: this.crateTex, bumpMap: this.crateTex, bumpScale: 0.06, roughness: 0.80 });

        const half = this.mapSize / 2;
        const wallH = 6.8;

        // Perimeter
        this.addBlock(0, 0, -half, this.mapSize, wallH, 2, wallMat, false, true);
        this.addBlock(0, 0, half, this.mapSize, wallH, 2, wallMat, false, true);
        this.addBlock(-half, 0, 0, 2, wallH, this.mapSize, wallMat, false, true);
        this.addBlock(half, 0, 0, 2, wallH, this.mapSize, wallMat, false, true);

        // Dust 2 Lanes & Chokepoints
        this.addBlock(-14, 0, 15, 2.5, wallH, 26, wallMat, false, true);
        this.addBlock(-14, 0, -14, 2.5, wallH, 18, wallMat, false, true);
        this.addBlock(14, 0, 15, 2.5, wallH, 26, wallMat, false, true);
        this.addBlock(14, 0, -14, 2.5, wallH, 18, wallMat, false, true);

        // Mid Double Doors
        this.addBlock(-7.5, 0, 0, 11, wallH, 1.8, wallMat, false, true);
        this.addBlock(7.5, 0, 0, 11, wallH, 1.8, wallMat, false, true);
        this.addBlock(0, 4.6, 0, 4.2, 2.2, 1.8, wallMat, false, true);

        // Spawns Covers
        this.addBlock(0, 0, 26, 12, 3.2, 2.0, wallMat, false, true);
        this.addBlock(0, 0, -26, 12, 3.2, 2.0, wallMat, false, true);

        // Long A Arch
        this.addBlock(22, 0, 12, 8, wallH, 2, wallMat, false, true);
        this.addBlock(38, 0, 12, 10, wallH, 2, wallMat, false, true);
        this.addBlock(29.5, 4.8, 12, 7, 2.0, 2, wallMat, false, true);

        // B Tunnels Roof
        this.addBlock(-22, 0, 8, 8, wallH, 2, wallMat, false, true);
        this.addBlock(-38, 0, 8, 10, wallH, 2, wallMat, false, true);
        this.addBlock(-28, 4.5, 8, 18, 2.3, 18, wallMat, false, true);

        const tunnelLight = new THREE.PointLight(0xffb74d, 1.15, 24);
        tunnelLight.position.set(-28, 4.0, 8);
        this.scene.add(tunnelLight);
        this.mapLights.push(tunnelLight);

        // Site A Crates
        this.addBlock(26, 0, -22, 3.2, 2.2, 3.2, crateMat, true);
        this.addBlock(28.5, 0, -19.5, 2.2, 1.5, 2.2, crateMat, true);
        this.addBlock(22, 0, -26, 2.5, 2.5, 2.5, crateMat, true);

        // Site B Crates
        this.addBlock(-26, 0, -22, 3.2, 2.2, 3.2, crateMat, true);
        this.addBlock(-29, 0, -20, 2.2, 1.5, 2.2, crateMat, true);
        this.addBlock(-22, 0, -26, 2.5, 2.5, 2.5, crateMat, true);

        // Mid Crates & Props
        this.addBlock(-5, 0, 11, 2.2, 1.4, 2.2, crateMat, true);
        this.addBlock(5, 0, -11, 2.2, 1.4, 2.2, crateMat, true);
        this.addConcreteBarrier(19, 28, 0);
        this.addConcreteBarrier(-19, -28, 0);
        this.addBarrelProp(11.8, 16, 0x4a3525);
        this.addBarrelProp(-11.8, -15, 0x2f3832);
        this.addBarrelProp(35, -24, 0x3b4238);
    }

    // =========================================================================
    // MAP 2: DE_INFERNO (European Village, Cobblestones, Red Brick & Banana Lane)
    // =========================================================================
    buildInferno() {
        this.buildSky('#254b77', '#7fa0be', '#f1cb9a', 680, 160, 'rgba(255, 225, 170, 1.0)');
        this.updateAtmosphericLighting(0x93b7d8, 0x5a483a, 0xffeedb, 0xffe2b8, 1.35);

        this.spawns = {
            T: [
                { x: 0, z: 36, yaw: 0 },
                { x: -6, z: 37, yaw: 0 },
                { x: 6, z: 37, yaw: 0 },
                { x: -11, z: 35, yaw: 0 },
                { x: 11, z: 35, yaw: 0 }
            ],
            CT: [
                { x: 0, z: -36, yaw: Math.PI },
                { x: -6, z: -37, yaw: Math.PI },
                { x: 6, z: -37, yaw: Math.PI },
                { x: -11, z: -35, yaw: Math.PI },
                { x: 11, z: -35, yaw: Math.PI }
            ]
        };

        this.bombsites = {
            A: { x: 25, z: -20, radius: 6.8, label: 'A' },
            B: { x: -25, z: -20, radius: 6.8, label: 'B' }
        };

        this.waypoints = [
            { x: 0, z: 34 }, { x: -22, z: 24 }, { x: -25, z: 6 }, { x: -24, z: -8 }, { x: -25, z: -20 },
            { x: 0, z: 18 }, { x: 0, z: 0 }, { x: 0, z: -16 }, { x: 0, z: -34 },
            { x: 20, z: 22 }, { x: 24, z: 4 }, { x: 25, z: -20 }, { x: 12, z: -22 }
        ];

        // 1. European Cobblestone Texture
        const cobbleCanvas = document.createElement('canvas');
        cobbleCanvas.width = 512;
        cobbleCanvas.height = 512;
        const cCtx = cobbleCanvas.getContext('2d');
        cCtx.fillStyle = '#4a443c';
        cCtx.fillRect(0, 0, 512, 512);
        for (let y = 0; y < 512; y += 32) {
            const rowOffset = (y / 32 % 2) * 16;
            for (let x = -16; x < 528; x += 32) {
                const rx = x + rowOffset;
                const shade = 95 + Math.floor((Math.random() - 0.5) * 28);
                cCtx.fillStyle = `rgb(${shade + 8}, ${shade}, ${shade - 6})`;
                cCtx.beginPath();
                cCtx.ellipse(rx + 14, y + 14, 13, 11, 0, 0, Math.PI * 2);
                cCtx.fill();
                cCtx.strokeStyle = 'rgba(28, 24, 20, 0.75)';
                cCtx.lineWidth = 3;
                cCtx.stroke();
            }
        }
        this.infernoGroundTex = new THREE.CanvasTexture(cobbleCanvas);
        this.infernoGroundTex.wrapS = THREE.RepeatWrapping;
        this.infernoGroundTex.wrapT = THREE.RepeatWrapping;
        this.infernoGroundTex.repeat.set(18, 18);

        // 2. Italian Terracotta & Red Brick Wall
        const brickCanvas = document.createElement('canvas');
        brickCanvas.width = 512;
        brickCanvas.height = 512;
        const bCtx = brickCanvas.getContext('2d');
        bCtx.fillStyle = '#7a3b2b';
        bCtx.fillRect(0, 0, 512, 512);
        for (let y = 0; y < 512; y += 28) {
            const xOff = (y / 28 % 2) * 28;
            for (let x = -28; x < 540; x += 56) {
                const bx = x + xOff;
                const rVal = 135 + Math.floor((Math.random() - 0.5) * 35);
                bCtx.fillStyle = `rgb(${rVal}, ${Math.floor(rVal * 0.48)}, ${Math.floor(rVal * 0.38)})`;
                bCtx.fillRect(bx + 2, y + 2, 52, 24);
                bCtx.strokeStyle = 'rgba(215, 205, 190, 0.45)';
                bCtx.lineWidth = 2;
                bCtx.strokeRect(bx, y, 56, 28);
            }
        }
        // Plaster peeling patches
        for (let i = 0; i < 14; i++) {
            bCtx.fillStyle = 'rgba(210, 198, 180, 0.72)';
            bCtx.beginPath();
            bCtx.arc(Math.random() * 512, Math.random() * 512, 28 + Math.random() * 45, 0, Math.PI * 2);
            bCtx.fill();
        }
        this.infernoWallTex = new THREE.CanvasTexture(brickCanvas);
        this.infernoWallTex.wrapS = THREE.RepeatWrapping;
        this.infernoWallTex.wrapT = THREE.RepeatWrapping;

        // 3. Italian Wine Crate Texture
        const wineCanvas = document.createElement('canvas');
        wineCanvas.width = 512;
        wineCanvas.height = 512;
        const wCtx = wineCanvas.getContext('2d');
        wCtx.fillStyle = '#6e5033';
        wCtx.fillRect(0, 0, 512, 512);
        for (let y = 0; y < 512; y += 64) {
            wCtx.fillStyle = y % 128 === 0 ? '#5a4026' : '#7d5c3d';
            wCtx.fillRect(0, y, 512, 60);
        }
        wCtx.strokeStyle = '#382516';
        wCtx.lineWidth = 24;
        wCtx.strokeRect(12, 12, 488, 488);
        wCtx.fillStyle = 'rgba(255, 235, 190, 0.7)';
        wCtx.font = 'bold 32px serif';
        wCtx.textAlign = 'center';
        wCtx.fillText('VINO RISERVA', 256, 240);
        wCtx.font = 'bold 20px serif';
        wCtx.fillText('★ TOSCANA 1999 ★', 256, 280);
        this.wineCrateTex = new THREE.CanvasTexture(wineCanvas);

        // Floor Mesh
        const floorGeo = new THREE.PlaneGeometry(this.mapSize, this.mapSize);
        const floorMat = new THREE.MeshStandardMaterial({
            map: this.infernoGroundTex,
            bumpMap: this.infernoGroundTex,
            bumpScale: 0.08,
            roughness: 0.88
        });
        const floor = new THREE.Mesh(floorGeo, floorMat);
        floor.rotation.x = -Math.PI / 2;
        floor.receiveShadow = true;
        this.scene.add(floor);
        this.mapObjects.push(floor);
        this.shootableMeshes.push(floor);

        this.createBombsiteZone(this.bombsites.A.x, this.bombsites.A.z, 'A');
        this.createBombsiteZone(this.bombsites.B.x, this.bombsites.B.z, 'B');

        const wallMat = new THREE.MeshStandardMaterial({ map: this.infernoWallTex, bumpMap: this.infernoWallTex, bumpScale: 0.09, roughness: 0.90 });
        const crateMat = new THREE.MeshStandardMaterial({ map: this.wineCrateTex, bumpMap: this.wineCrateTex, bumpScale: 0.07, roughness: 0.82 });

        const half = this.mapSize / 2;
        const wallH = 7.2;

        // Perimeter
        this.addBlock(0, 0, -half, this.mapSize, wallH, 2.2, wallMat, false, true);
        this.addBlock(0, 0, half, this.mapSize, wallH, 2.2, wallMat, false, true);
        this.addBlock(-half, 0, 0, 2.2, wallH, this.mapSize, wallMat, false, true);
        this.addBlock(half, 0, 0, 2.2, wallH, this.mapSize, wallMat, false, true);

        // === INFERNO "BANANA" LANE (West corridor curving toward B site) ===
        this.addBlock(-16, 0, 22, 2.4, wallH, 18, wallMat, false, true);
        this.addBlock(-28, 0, 18, 2.4, wallH, 22, wallMat, false, true);
        this.addBlock(-18, 0, 4, 2.4, wallH, 14, wallMat, false, true);
        this.addBlock(-30, 0, -4, 2.4, wallH, 18, wallMat, false, true);
        // Banana Sandbags / Half-Wall
        this.addBlock(-22, 0, 10, 4.2, 1.25, 1.2, crateMat, true);

        // === INFERNO MID & APARTMENTS ===
        this.addBlock(-6, 0, 0, 2.2, wallH, 32, wallMat, false, true);
        this.addBlock(8, 0, 12, 2.2, wallH, 20, wallMat, false, true);
        this.addBlock(8, 0, -14, 2.2, wallH, 18, wallMat, false, true);
        // Mid Archway
        this.addBlock(1, 4.6, 0, 12, 2.4, 2.2, wallMat, false, true);

        // === BOMBSITE B (Church Courtyard & Wine Barrels) ===
        this.addBlock(-25, 0, -20, 3.4, 2.4, 3.4, crateMat, true);
        this.addBlock(-28, 0, -17, 2.4, 1.6, 2.4, crateMat, true);
        this.addBarrelProp(-21, -22, 0x4a2c1d);
        this.addBarrelProp(-22, -22, 0x4a2c1d);
        this.addBarrelProp(-21.5, -20.5, 0x5a3522);

        // === BOMBSITE A (Fountain Plaza & Pit) ===
        // Fountain base pedestal in center of site A
        const fountainGeo = new THREE.CylinderGeometry(2.4, 2.6, 1.1, 16);
        const fountainMat = new THREE.MeshStandardMaterial({ map: this.infernoGroundTex, bumpMap: this.infernoGroundTex, bumpScale: 0.08 });
        const fountain = new THREE.Mesh(fountainGeo, fountainMat);
        fountain.position.set(25, 0.55, -20);
        this.scene.add(fountain);
        this.mapObjects.push(fountain);
        this.shootableMeshes.push(fountain);
        this.colliders.push({ minX: 22.5, maxX: 27.5, minY: 0, maxY: 1.1, minZ: -22.5, maxZ: -17.5, isCrate: true });

        this.addBlock(32, 0, -22, 3.0, 2.2, 3.0, crateMat, true);
        this.addBlock(20, 0, -26, 2.4, 2.4, 2.4, crateMat, true);
        this.addBarrelProp(28, -14, 0x422a18);

        // Spawns Plazas
        this.addBlock(0, 0, 26, 14, 3.4, 2.2, wallMat, false, true);
        this.addBlock(0, 0, -26, 14, 3.4, 2.2, wallMat, false, true);
    }

    // =========================================================================
    // MAP 3: DE_AZTEC (Ancient Mossy Stone Ruins, Canal & Stone Bridge)
    // =========================================================================
    buildAztec() {
        this.buildSky('#283b32', '#4d6356', '#72887a', 640, 160, 'rgba(230, 245, 230, 0.9)');
        this.updateAtmosphericLighting(0x6e8f7c, 0x334438, 0xd0e6d6, 0xe2f0e4, 1.25);

        this.spawns = {
            T: [
                { x: 0, z: 38, yaw: 0 },
                { x: -7, z: 39, yaw: 0 },
                { x: 7, z: 39, yaw: 0 },
                { x: -12, z: 37, yaw: 0 },
                { x: 12, z: 37, yaw: 0 }
            ],
            CT: [
                { x: 0, z: -38, yaw: Math.PI },
                { x: -7, z: -39, yaw: Math.PI },
                { x: 7, z: -39, yaw: Math.PI },
                { x: -12, z: -37, yaw: Math.PI },
                { x: 12, z: -37, yaw: Math.PI }
            ]
        };

        this.bombsites = {
            A: { x: 28, z: -24, radius: 7.2, label: 'A' },
            B: { x: -28, z: -24, radius: 7.2, label: 'B' }
        };

        this.waypoints = [
            { x: 0, z: 36 }, { x: 0, z: 20 }, { x: 0, z: 0 }, { x: 0, z: -20 }, { x: 0, z: -36 },
            { x: 26, z: 26 }, { x: 28, z: 6 }, { x: 28, z: -24 }, { x: 14, z: -24 },
            { x: -26, z: 26 }, { x: -28, z: 6 }, { x: -28, z: -24 }, { x: -14, z: -24 }
        ];

        // 1. Wet Mossy Stone Ground
        const mossCanvas = document.createElement('canvas');
        mossCanvas.width = 512;
        mossCanvas.height = 512;
        const mCtx = mossCanvas.getContext('2d');
        mCtx.fillStyle = '#38423b';
        mCtx.fillRect(0, 0, 512, 512);
        for (let y = 0; y < 512; y += 64) {
            for (let x = 0; x < 512; x += 64) {
                const val = 58 + Math.floor((Math.random() - 0.5) * 16);
                mCtx.fillStyle = `rgb(${val - 4}, ${val + 10}, ${val})`;
                mCtx.fillRect(x + 2, y + 2, 60, 60);
                mCtx.strokeStyle = 'rgba(20, 28, 22, 0.75)';
                mCtx.lineWidth = 3;
                mCtx.strokeRect(x, y, 64, 64);
            }
        }
        // Lichen & water puddles
        for (let i = 0; i < 40; i++) {
            mCtx.fillStyle = i % 2 === 0 ? 'rgba(34, 197, 94, 0.22)' : 'rgba(15, 23, 42, 0.45)';
            mCtx.beginPath();
            mCtx.arc(Math.random() * 512, Math.random() * 512, 14 + Math.random() * 32, 0, Math.PI * 2);
            mCtx.fill();
        }
        this.aztecGroundTex = new THREE.CanvasTexture(mossCanvas);
        this.aztecGroundTex.wrapS = THREE.RepeatWrapping;
        this.aztecGroundTex.wrapT = THREE.RepeatWrapping;
        this.aztecGroundTex.repeat.set(20, 20);

        // 2. Ancient Carved Aztec Megalith Wall
        const stoneCanvas = document.createElement('canvas');
        stoneCanvas.width = 512;
        stoneCanvas.height = 512;
        const sCtx = stoneCanvas.getContext('2d');
        sCtx.fillStyle = '#3f4741';
        sCtx.fillRect(0, 0, 512, 512);
        for (let y = 0; y < 512; y += 80) {
            sCtx.fillStyle = 'rgba(18, 24, 20, 0.7)';
            sCtx.fillRect(0, y, 512, 4);
            const xOff = (y / 80 % 2) * 80;
            for (let x = xOff; x < 512; x += 160) {
                sCtx.fillRect(x, y, 4, 80);
                // Carved hieroglyph relief square
                sCtx.strokeStyle = 'rgba(22, 101, 52, 0.35)';
                sCtx.lineWidth = 4;
                sCtx.strokeRect(x + 24, y + 16, 112, 48);
            }
        }
        this.aztecWallTex = new THREE.CanvasTexture(stoneCanvas);
        this.aztecWallTex.wrapS = THREE.RepeatWrapping;
        this.aztecWallTex.wrapT = THREE.RepeatWrapping;

        // Floor Mesh
        const floorGeo = new THREE.PlaneGeometry(this.mapSize, this.mapSize);
        const floorMat = new THREE.MeshStandardMaterial({
            map: this.aztecGroundTex,
            bumpMap: this.aztecGroundTex,
            bumpScale: 0.09,
            roughness: 0.85
        });
        const floor = new THREE.Mesh(floorGeo, floorMat);
        floor.rotation.x = -Math.PI / 2;
        floor.receiveShadow = true;
        this.scene.add(floor);
        this.mapObjects.push(floor);
        this.shootableMeshes.push(floor);

        this.createBombsiteZone(this.bombsites.A.x, this.bombsites.A.z, 'A');
        this.createBombsiteZone(this.bombsites.B.x, this.bombsites.B.z, 'B');

        const wallMat = new THREE.MeshStandardMaterial({ map: this.aztecWallTex, bumpMap: this.aztecWallTex, bumpScale: 0.10, roughness: 0.92 });
        const half = this.mapSize / 2;
        const wallH = 7.5;

        // Perimeter
        this.addBlock(0, 0, -half, this.mapSize, wallH, 2.5, wallMat, false, true);
        this.addBlock(0, 0, half, this.mapSize, wallH, 2.5, wallMat, false, true);
        this.addBlock(-half, 0, 0, 2.5, wallH, this.mapSize, wallMat, false, true);
        this.addBlock(half, 0, 0, 2.5, wallH, this.mapSize, wallMat, false, true);

        // === THE ICONIC AZTEC STONE BRIDGE & WATER CANAL ===
        // Sunken water canal (visual water plane across center)
        const waterGeo = new THREE.PlaneGeometry(this.mapSize - 6, 18);
        const waterMat = new THREE.MeshStandardMaterial({
            color: 0x134e4a,
            roughness: 0.1,
            metalness: 0.85
        });
        const water = new THREE.Mesh(waterGeo, waterMat);
        water.rotation.x = -Math.PI / 2;
        water.position.set(0, 0.05, 0);
        this.scene.add(water);
        this.mapObjects.push(water);

        // Massive Stone Bridge spanning North to South across Mid
        this.addBlock(0, 0, 0, 11, 0.6, 22, wallMat);
        // Left & Right Bridge Railings
        this.addBlock(-5.1, 0.6, 0, 0.8, 1.2, 22, wallMat);
        this.addBlock(5.1, 0.6, 0, 0.8, 1.2, 22, wallMat);

        // Canal Entry Ramps
        this.addBlock(-26, 0, 0, 14, 0.4, 6, wallMat);
        this.addBlock(26, 0, 0, 14, 0.4, 6, wallMat);

        // Ancient Temple Gates & Ruins
        this.addBlock(-16, 0, 18, 3.0, wallH, 18, wallMat, false, true);
        this.addBlock(-16, 0, -18, 3.0, wallH, 18, wallMat, false, true);
        this.addBlock(16, 0, 18, 3.0, wallH, 18, wallMat, false, true);
        this.addBlock(16, 0, -18, 3.0, wallH, 18, wallMat, false, true);

        // Aztec Stone Pillars on Sites A & B
        for (const [px, pz] of [[24, -28], [32, -28], [24, -18], [32, -18]]) {
            this.addBlock(px, 0, pz, 1.8, 6.2, 1.8, wallMat);
        }
        for (const [px, pz] of [[-24, -28], [-32, -28], [-24, -18], [-32, -18]]) {
            this.addBlock(px, 0, pz, 1.8, 6.2, 1.8, wallMat);
        }

        // Stepped Temple Relic Altars (Crates for cover)
        this.addBlock(28, 0, -24, 3.6, 1.8, 3.6, wallMat, true);
        this.addBlock(-28, 0, -24, 3.6, 1.8, 3.6, wallMat, true);
        this.addBlock(0, 0, 24, 14, 3.2, 2.2, wallMat, false, true);
        this.addBlock(0, 0, -24, 14, 3.2, 2.2, wallMat, false, true);
    }

    // =========================================================================
    // MAP 4: CS_ASSAULT (Tactical Industrial Warehouse & Shipping Container Yard)
    // =========================================================================
    buildAssault() {
        this.buildSky('#151c24', '#2d3748', '#4a5568', 600, 190, 'rgba(251, 191, 36, 0.85)');
        this.updateAtmosphericLighting(0x475569, 0x1e293b, 0x94a3b8, 0xf59e0b, 1.45);

        this.spawns = {
            T: [
                { x: 0, z: -34, yaw: Math.PI },
                { x: -6, z: -35, yaw: Math.PI },
                { x: 6, z: -35, yaw: Math.PI },
                { x: -11, z: -33, yaw: Math.PI },
                { x: 11, z: -33, yaw: Math.PI }
            ],
            CT: [
                { x: 0, z: 38, yaw: 0 },
                { x: -6, z: 39, yaw: 0 },
                { x: 6, z: 39, yaw: 0 },
                { x: -11, z: 37, yaw: 0 },
                { x: 11, z: 37, yaw: 0 }
            ]
        };

        this.bombsites = {
            A: { x: 18, z: -18, radius: 6.8, label: 'A' },
            B: { x: -18, z: -22, radius: 6.8, label: 'B' }
        };

        this.waypoints = [
            { x: 0, z: 36 }, { x: -20, z: 28 }, { x: 20, z: 28 }, { x: 0, z: 16 },
            { x: -18, z: 6 }, { x: 18, z: 6 }, { x: 0, z: -4 },
            { x: 18, z: -18 }, { x: -18, z: -22 }, { x: 0, z: -34 }
        ];

        // 1. Dark Asphalt & Oil Stain Tarmac
        const asphaltCanvas = document.createElement('canvas');
        asphaltCanvas.width = 512;
        asphaltCanvas.height = 512;
        const aCtx = asphaltCanvas.getContext('2d');
        aCtx.fillStyle = '#23272e';
        aCtx.fillRect(0, 0, 512, 512);
        // Yellow safety hazard lines
        aCtx.strokeStyle = 'rgba(234, 179, 8, 0.65)';
        aCtx.lineWidth = 10;
        aCtx.setLineDash([28, 20]);
        aCtx.strokeRect(10, 10, 492, 492);
        for (let i = 0; i < 18000; i++) {
            aCtx.fillStyle = i % 2 === 0 ? 'rgba(10, 12, 16, 0.45)' : 'rgba(75, 85, 99, 0.35)';
            aCtx.fillRect(Math.random() * 512, Math.random() * 512, 2, 2);
        }
        this.asphaltTex = new THREE.CanvasTexture(asphaltCanvas);
        this.asphaltTex.wrapS = THREE.RepeatWrapping;
        this.asphaltTex.wrapT = THREE.RepeatWrapping;
        this.asphaltTex.repeat.set(16, 16);

        // 2. Corrugated Industrial Steel Warehouse Wall
        const steelCanvas = document.createElement('canvas');
        steelCanvas.width = 512;
        steelCanvas.height = 512;
        const stCtx = steelCanvas.getContext('2d');
        stCtx.fillStyle = '#374151';
        stCtx.fillRect(0, 0, 512, 512);
        for (let x = 0; x < 512; x += 16) {
            stCtx.fillStyle = 'rgba(17, 24, 39, 0.55)';
            stCtx.fillRect(x, 0, 8, 512);
            stCtx.fillStyle = 'rgba(156, 163, 175, 0.35)';
            stCtx.fillRect(x + 8, 0, 8, 512);
        }
        this.steelWallTex = new THREE.CanvasTexture(steelCanvas);
        this.steelWallTex.wrapS = THREE.RepeatWrapping;
        this.steelWallTex.wrapT = THREE.RepeatWrapping;

        // Floor Mesh
        const floorGeo = new THREE.PlaneGeometry(this.mapSize, this.mapSize);
        const floorMat = new THREE.MeshStandardMaterial({
            map: this.asphaltTex,
            bumpMap: this.asphaltTex,
            bumpScale: 0.07,
            roughness: 0.90
        });
        const floor = new THREE.Mesh(floorGeo, floorMat);
        floor.rotation.x = -Math.PI / 2;
        floor.receiveShadow = true;
        this.scene.add(floor);
        this.mapObjects.push(floor);
        this.shootableMeshes.push(floor);

        this.createBombsiteZone(this.bombsites.A.x, this.bombsites.A.z, 'A');
        this.createBombsiteZone(this.bombsites.B.x, this.bombsites.B.z, 'B');

        const wallMat = new THREE.MeshStandardMaterial({ map: this.steelWallTex, bumpMap: this.steelWallTex, bumpScale: 0.08, roughness: 0.65, metalness: 0.45 });
        const half = this.mapSize / 2;
        const wallH = 8.5;

        // Perimeter
        this.addBlock(0, 0, -half, this.mapSize, wallH, 2.5, wallMat, false, true);
        this.addBlock(0, 0, half, this.mapSize, wallH, 2.5, wallMat, false, true);
        this.addBlock(-half, 0, 0, 2.5, wallH, this.mapSize, wallMat, false, true);
        this.addBlock(half, 0, 0, 2.5, wallH, this.mapSize, wallMat, false, true);

        // === GIANT WAREHOUSE FACILITY (North Half) ===
        // Warehouse Front Wall with Garage Openings
        this.addBlock(-26, 0, -2, 22, wallH, 2.5, wallMat, false, true);
        this.addBlock(26, 0, -2, 22, wallH, 2.5, wallMat, false, true);
        this.addBlock(0, 5.2, -2, 30, 3.3, 2.5, wallMat, false, true);

        // High Warehouse Roof
        const roofGeo = new THREE.BoxGeometry(78, 1.2, 42);
        const roofMat = new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.8 });
        const roof = new THREE.Mesh(roofGeo, roofMat);
        roof.position.set(0, wallH + 0.6, -23);
        this.scene.add(roof);
        this.mapObjects.push(roof);

        // High-Intensity Orange Sodium Lights inside and outside warehouse
        const floodLight1 = new THREE.PointLight(0xf59e0b, 1.6, 34);
        floodLight1.position.set(0, 6.5, -18);
        const floodLight2 = new THREE.PointLight(0xf59e0b, 1.4, 30);
        floodLight2.position.set(0, 6.5, 14);
        this.scene.add(floodLight1, floodLight2);
        this.mapLights.push(floodLight1, floodLight2);

        // === REALISTIC SHIPPING CONTAINERS (Maersk Blue, Evergreen Green, Cargo Red) ===
        // Container Yard Stacks (South)
        this.addContainerProp(-16, 26, 6.2, 2.8, 14.5, 0, 0x1e40af, 'MSK-4011');
        this.addContainerProp(16, 26, 6.2, 2.8, 14.5, 0, 0x991b1b, 'CMA-9920');
        this.addContainerProp(0, 16, 14.5, 2.8, 6.2, Math.PI / 2, 0x065f46, 'EVERGREEN');

        // Inside Warehouse Container Stacks & Shelves (Bombsites A & B)
        this.addContainerProp(18, -18, 6.2, 2.8, 14.5, 0, 0xd97706, 'CAT-LOGISTICS');
        this.addContainerProp(-18, -22, 6.2, 2.8, 14.5, 0, 0x374151, 'TAC-EQUIP');

        this.addBarrelProp(-6, -16, 0x475569);
        this.addBarrelProp(6, -16, 0x475569);
    }

    // =========================================================================
    // MAP 5: DE_NUKE (High-Tech Nuclear Power Facility & Silo Complex)
    // =========================================================================
    buildNuke() {
        this.buildSky('#334155', '#64748b', '#cbd5e1', 700, 140, 'rgba(255, 255, 255, 1.0)');
        this.updateAtmosphericLighting(0x94a3b8, 0x475569, 0xf1f5f9, 0xf8fafc, 1.40);

        this.spawns = {
            T: [
                { x: 0, z: 36, yaw: 0 },
                { x: -6, z: 37, yaw: 0 },
                { x: 6, z: 37, yaw: 0 },
                { x: -11, z: 35, yaw: 0 },
                { x: 11, z: 35, yaw: 0 }
            ],
            CT: [
                { x: 0, z: -36, yaw: Math.PI },
                { x: -6, z: -37, yaw: Math.PI },
                { x: 6, z: -37, yaw: Math.PI },
                { x: -11, z: -35, yaw: Math.PI },
                { x: 11, z: -35, yaw: Math.PI }
            ]
        };

        this.bombsites = {
            A: { x: 14, z: -14, radius: 6.8, label: 'A' },
            B: { x: 14, z: 12, radius: 6.8, label: 'B' }
        };

        this.waypoints = [
            { x: 0, z: 34 }, { x: -24, z: 24 }, { x: -24, z: 0 }, { x: -24, z: -24 },
            { x: 0, z: 18 }, { x: 14, z: 12 }, { x: 0, z: 0 }, { x: 14, z: -14 },
            { x: 0, z: -18 }, { x: 0, z: -34 }
        ];

        // 1. Epoxy Polished Facility Concrete
        const nukeFloorCanvas = document.createElement('canvas');
        nukeFloorCanvas.width = 512;
        nukeFloorCanvas.height = 512;
        const nfCtx = nukeFloorCanvas.getContext('2d');
        nfCtx.fillStyle = '#64748b';
        nfCtx.fillRect(0, 0, 512, 512);
        for (let y = 0; y < 512; y += 128) {
            for (let x = 0; x < 512; x += 128) {
                nfCtx.fillStyle = ((x + y) / 128 % 2 === 0) ? '#475569' : '#64748b';
                nfCtx.fillRect(x + 2, y + 2, 124, 124);
                nfCtx.strokeStyle = 'rgba(15, 23, 42, 0.45)';
                nfCtx.lineWidth = 3;
                nfCtx.strokeRect(x, y, 128, 128);
            }
        }
        this.nukeFloorTex = new THREE.CanvasTexture(nukeFloorCanvas);
        this.nukeFloorTex.wrapS = THREE.RepeatWrapping;
        this.nukeFloorTex.wrapT = THREE.RepeatWrapping;
        this.nukeFloorTex.repeat.set(16, 16);

        // 2. High-Tech Industrial Panels with Yellow/Black Hazard Stripes
        const panelCanvas = document.createElement('canvas');
        panelCanvas.width = 512;
        panelCanvas.height = 512;
        const pCtx = panelCanvas.getContext('2d');
        pCtx.fillStyle = '#cbd5e1';
        pCtx.fillRect(0, 0, 512, 512);
        pCtx.strokeStyle = '#94a3b8';
        pCtx.lineWidth = 4;
        pCtx.strokeRect(4, 4, 504, 504);

        // Diagonal Yellow / Black Caution Hazard Band
        pCtx.save();
        pCtx.rect(0, 216, 512, 80);
        pCtx.clip();
        pCtx.fillStyle = '#eab308';
        pCtx.fillRect(0, 216, 512, 80);
        pCtx.fillStyle = '#18181b';
        for (let x = -80; x < 600; x += 40) {
            pCtx.beginPath();
            pCtx.moveTo(x, 216);
            pCtx.lineTo(x + 24, 216);
            pCtx.lineTo(x - 16, 296);
            pCtx.lineTo(x - 40, 296);
            pCtx.fill();
        }
        pCtx.restore();

        pCtx.fillStyle = '#1e293b';
        pCtx.font = 'bold 24px monospace';
        pCtx.textAlign = 'center';
        pCtx.fillText('☢ HIGH VOLTAGE // REACTOR 04', 256, 340);

        this.nukeWallTex = new THREE.CanvasTexture(panelCanvas);
        this.nukeWallTex.wrapS = THREE.RepeatWrapping;
        this.nukeWallTex.wrapT = THREE.RepeatWrapping;

        // Floor Mesh
        const floorGeo = new THREE.PlaneGeometry(this.mapSize, this.mapSize);
        const floorMat = new THREE.MeshStandardMaterial({
            map: this.nukeFloorTex,
            bumpMap: this.nukeFloorTex,
            bumpScale: 0.05,
            roughness: 0.55,
            metalness: 0.15
        });
        const floor = new THREE.Mesh(floorGeo, floorMat);
        floor.rotation.x = -Math.PI / 2;
        floor.receiveShadow = true;
        this.scene.add(floor);
        this.mapObjects.push(floor);
        this.shootableMeshes.push(floor);

        this.createBombsiteZone(this.bombsites.A.x, this.bombsites.A.z, 'A');
        this.createBombsiteZone(this.bombsites.B.x, this.bombsites.B.z, 'B');

        const wallMat = new THREE.MeshStandardMaterial({ map: this.nukeWallTex, bumpMap: this.nukeWallTex, bumpScale: 0.06, roughness: 0.72, metalness: 0.25 });
        const half = this.mapSize / 2;
        const wallH = 7.8;

        // Perimeter
        this.addBlock(0, 0, -half, this.mapSize, wallH, 2.2, wallMat, false, true);
        this.addBlock(0, 0, half, this.mapSize, wallH, 2.2, wallMat, false, true);
        this.addBlock(-half, 0, 0, 2.2, wallH, this.mapSize, wallMat, false, true);
        this.addBlock(half, 0, 0, 2.2, wallH, this.mapSize, wallMat, false, true);

        // Outside Silo Corridor (West)
        this.addBlock(-16, 0, 0, 2.4, wallH, 56, wallMat, false, true);
        // Giant Cylindrical Cooling Silos
        const siloGeo = new THREE.CylinderGeometry(5.2, 5.2, 11, 24);
        const siloMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.45, metalness: 0.65 });
        const silo1 = new THREE.Mesh(siloGeo, siloMat);
        silo1.position.set(-28, 5.5, -16);
        const silo2 = new THREE.Mesh(siloGeo, siloMat);
        silo2.position.set(-28, 5.5, 16);
        this.scene.add(silo1, silo2);
        this.mapObjects.push(silo1, silo2);
        this.shootableMeshes.push(silo1, silo2);
        this.colliders.push(
            { minX: -33.5, maxX: -22.5, minY: 0, maxY: 11, minZ: -21.5, maxZ: -10.5, isCrate: true },
            { minX: -33.5, maxX: -22.5, minY: 0, maxY: 11, minZ: 10.5, maxZ: 21.5, isCrate: true }
        );

        // Interior Reactor Core (Bombsite A) & Lower Containment (Bombsite B)
        this.addBlock(14, 0, -14, 5.5, 3.2, 5.5, wallMat, true);
        this.addBlock(14, 0, 12, 5.5, 3.2, 5.5, wallMat, true);

        // Yellow Toxic Waste Barrels
        this.addBarrelProp(8, -14, 0xeab308, true);
        this.addBarrelProp(9.2, -14, 0xeab308, true);
        this.addBarrelProp(8.6, -12.8, 0xeab308, true);
        this.addBarrelProp(8, 12, 0xeab308, true);
        this.addBarrelProp(9.2, 12, 0xeab308, true);

        // Center Hut & Catwalk
        this.addBlock(0, 0, -2, 12, wallH, 2.2, wallMat, false, true);
        this.addBlock(0, 0, 24, 14, 3.2, 2.0, wallMat, false, true);
        this.addBlock(0, 0, -24, 14, 3.2, 2.0, wallMat, false, true);
    }

    // =========================================================================
    // MAP 6: AIM_MAP (Symmetrical Competitive Aim Duel Arena)
    // =========================================================================
    buildAimMap() {
        this.buildSky('#1e3a5f', '#60a5fa', '#f8fafc', 512, 120, 'rgba(255, 255, 230, 1.0)');
        this.updateAtmosphericLighting(0x93c5fd, 0x475569, 0xffffff, 0xfffbeb, 1.48);

        this.spawns = {
            T: [
                { x: 0, z: 22, yaw: 0 },
                { x: -6, z: 23, yaw: 0 },
                { x: 6, z: 23, yaw: 0 },
                { x: -12, z: 21, yaw: 0 },
                { x: 12, z: 21, yaw: 0 }
            ],
            CT: [
                { x: 0, z: -22, yaw: Math.PI },
                { x: -6, z: -23, yaw: Math.PI },
                { x: 6, z: -23, yaw: Math.PI },
                { x: -12, z: -21, yaw: Math.PI },
                { x: 12, z: -21, yaw: Math.PI }
            ]
        };

        this.bombsites = {
            A: { x: 16, z: 0, radius: 5.5, label: 'A' },
            B: { x: -16, z: 0, radius: 5.5, label: 'B' }
        };

        this.waypoints = [
            { x: 0, z: 20 }, { x: -14, z: 18 }, { x: 14, z: 18 },
            { x: -16, z: 0 }, { x: 0, z: 0 }, { x: 16, z: 0 },
            { x: -14, z: -18 }, { x: 14, z: -18 }, { x: 0, z: -20 }
        ];

        // Crisp Arena Ground
        const arenaCanvas = document.createElement('canvas');
        arenaCanvas.width = 512;
        arenaCanvas.height = 512;
        const arCtx = arenaCanvas.getContext('2d');
        arCtx.fillStyle = '#94a3b8';
        arCtx.fillRect(0, 0, 512, 512);
        for (let y = 0; y < 512; y += 64) {
            for (let x = 0; x < 512; x += 64) {
                arCtx.fillStyle = (x + y) % 128 === 0 ? '#cbd5e1' : '#94a3b8';
                arCtx.fillRect(x + 2, y + 2, 60, 60);
                arCtx.strokeStyle = 'rgba(51, 65, 85, 0.45)';
                arCtx.lineWidth = 2;
                arCtx.strokeRect(x, y, 64, 64);
            }
        }
        this.arenaGroundTex = new THREE.CanvasTexture(arenaCanvas);
        this.arenaGroundTex.wrapS = THREE.RepeatWrapping;
        this.arenaGroundTex.wrapT = THREE.RepeatWrapping;
        this.arenaGroundTex.repeat.set(12, 12);

        // Arena Concrete Block Walls
        const blockCanvas = document.createElement('canvas');
        blockCanvas.width = 512;
        blockCanvas.height = 512;
        const blCtx = blockCanvas.getContext('2d');
        blCtx.fillStyle = '#475569';
        blCtx.fillRect(0, 0, 512, 512);
        blCtx.strokeStyle = '#334155';
        blCtx.lineWidth = 6;
        blCtx.strokeRect(6, 6, 500, 500);
        this.arenaWallTex = new THREE.CanvasTexture(blockCanvas);

        // Competition Wood Crate
        const compCrateCanvas = document.createElement('canvas');
        compCrateCanvas.width = 256;
        compCrateCanvas.height = 256;
        const ccCtx = compCrateCanvas.getContext('2d');
        ccCtx.fillStyle = '#b45309';
        ccCtx.fillRect(0, 0, 256, 256);
        ccCtx.strokeStyle = '#78350f';
        ccCtx.lineWidth = 18;
        ccCtx.strokeRect(9, 9, 238, 238);
        ccCtx.fillStyle = 'rgba(254, 243, 199, 0.85)';
        ccCtx.font = 'bold 24px monospace';
        ccCtx.textAlign = 'center';
        ccCtx.fillText('AIM // PRO', 128, 134);
        this.compCrateTex = new THREE.CanvasTexture(compCrateCanvas);

        // Floor Mesh
        const floorGeo = new THREE.PlaneGeometry(this.mapSize, this.mapSize);
        const floorMat = new THREE.MeshStandardMaterial({
            map: this.arenaGroundTex,
            bumpMap: this.arenaGroundTex,
            bumpScale: 0.06,
            roughness: 0.82
        });
        const floor = new THREE.Mesh(floorGeo, floorMat);
        floor.rotation.x = -Math.PI / 2;
        floor.receiveShadow = true;
        this.scene.add(floor);
        this.mapObjects.push(floor);
        this.shootableMeshes.push(floor);

        this.createBombsiteZone(this.bombsites.A.x, this.bombsites.A.z, 'A');
        this.createBombsiteZone(this.bombsites.B.x, this.bombsites.B.z, 'B');

        const wallMat = new THREE.MeshStandardMaterial({ map: this.arenaWallTex, roughness: 0.85 });
        const crateMat = new THREE.MeshStandardMaterial({ map: this.compCrateTex, bumpMap: this.compCrateTex, bumpScale: 0.08, roughness: 0.75 });

        const half = this.mapSize / 2;
        const wallH = 6.2;

        // Perimeter
        this.addBlock(0, 0, -half, this.mapSize, wallH, 2, wallMat, false, true);
        this.addBlock(0, 0, half, this.mapSize, wallH, 2, wallMat, false, true);
        this.addBlock(-half, 0, 0, 2, wallH, this.mapSize, wallMat, false, true);
        this.addBlock(half, 0, 0, 2, wallH, this.mapSize, wallMat, false, true);

        // Center Dividing Trench Blocks
        this.addBlock(0, 0, 0, 14, 1.2, 2.2, wallMat);
        this.addBlock(-20, 0, 0, 10, 1.2, 2.2, wallMat);
        this.addBlock(20, 0, 0, 10, 1.2, 2.2, wallMat);

        // Symmetrical Duel Bunkers (T side and CT side)
        this.addBlock(-10, 0, 12, 3.2, 2.2, 3.2, crateMat, true);
        this.addBlock(10, 0, 12, 3.2, 2.2, 3.2, crateMat, true);
        this.addBlock(0, 0, 14, 4.2, 1.5, 2.0, crateMat, true);

        this.addBlock(-10, 0, -12, 3.2, 2.2, 3.2, crateMat, true);
        this.addBlock(10, 0, -12, 3.2, 2.2, 3.2, crateMat, true);
        this.addBlock(0, 0, -14, 4.2, 1.5, 2.0, crateMat, true);

        // Flank Peek Boxes
        this.addBlock(16, 0, 0, 2.8, 2.2, 2.8, crateMat, true);
        this.addBlock(-16, 0, 0, 2.8, 2.2, 2.8, crateMat, true);
    }

    getInBombsite(x, z) {
        if (!this.bombsites) return null;
        for (const key of ['A', 'B']) {
            const site = this.bombsites[key];
            if (!site) continue;
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

        // Draw Map Geometry Walls & Colliders
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
            if (!site) continue;
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

        // Draw Active Planted C4
        if (bombState && bombState.planted) {
            const bx = toRadarX(bombState.x);
            const by = toRadarY(bombState.z);
            ctx.fillStyle = (Math.floor(Date.now() / 250) % 2 === 0) ? '#ef4444' : '#fde047';
            ctx.beginPath();
            ctx.arc(bx, by, 5, 0, Math.PI * 2);
            ctx.fill();
        }

        // Draw Bots and Remote Players
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

        // Draw Local Player with Vision Cone
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

window.MAP_METADATA = MAP_METADATA;
window.GameMap = GameMap;
