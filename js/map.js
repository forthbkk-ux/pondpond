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
    de_bangkok_thailand: {
        id: 'de_bangkok_thailand',
        name: '🇹🇭 ประเทศไทย — กรุงเทพมหานคร (Bangkok, Thailand) (New)',
        hudTag: '🇹🇭 กรุงเทพฯ ประเทศไทย (THAILAND)',
        subtitle: 'กรุงเทพมหานคร, ประเทศไทย 220m',
        description: 'แผนที่ใหม่ขนาดใหญ่ที่สุด 220m กรุงเทพมหานคร ประเทศไทย! สมรภูมิบนถนนใหญ่สุขุมวิท-อโศก มีรถติดเต็มถนน (แท็กซี่ ตุ๊กตุ๊ก รถเมล์ ขสมก. รถกระบะ รถตู้ รถบรรทุก) รางรถไฟฟ้า BTS & สะพานลอยคนข้าม 2 จุด ตึกแถว-ร้าน 24 ชม.-สน.ตำรวจ-ธนาคารสยาม-ตลาดโต้รุ่ง ที่เข้าแอบได้ทุกตึก พร้อมซอกซอยและมุมซุ่มยิงนับไม่ถ้วน!',
        mapSize: 220
    },
    de_jungle_bunker: {
        id: 'de_jungle_bunker',
        name: '🌴 DE_JUNGLE_BUNKER (New)',
        subtitle: 'ป่าดงดิบ & บังเกอร์ซุ่มยิงขนาดยักษ์ 185m (New)',
        description: 'แผนที่ยักษ์ป่าทึบและฐานบังเกอร์ลับ (New) เต็มไปด้วยที่แอบ: บังเกอร์หิน 6 หลังเข้าได้หลายทาง ดงต้นสนพรางตัว ซากวิหาร ร่องคูดิน และลังซุ่มโจมตีทั่วแมพ',
        mapSize: 185
    },
    cs_suburb_maze: {
        id: 'cs_suburb_maze',
        name: '🏘️ CS_SUBURB_MAZE (New)',
        subtitle: 'หมู่บ้านเขาวงกต & ตรอกซอกซอยซุ่มยิง 180m (New)',
        description: 'แผนที่ยักษ์หมู่บ้านชานเมือง (New) ซอกซอยและที่แอบเยอะมาก! บ้าน 8 หลังเข้าแอบได้ทุกหลัง มีซอกห้องด้านใน รั้วสวน รถบรรทุก และมุมกำแพงดักซุ่ม',
        mapSize: 180
    },
    de_oil_rig: {
        id: 'de_oil_rig',
        name: '🛢️ DE_OIL_RIG (New)',
        subtitle: 'แท่นขุดเจาะน้ำมันกลางทะเลขนาดมหึมา 190m (New)',
        description: 'แผนที่ยักษ์แท่นขุดเจาะน้ำมันกลางสมุทร (New) เต็มไปด้วยเขาวงกตตู้คอนเทนเนอร์ ถังน้ำมันยักษ์ ท่อส่งก๊าซ หอขุดเจาะ และห้องเครื่องจักรให้แอบซุ่ม',
        mapSize: 190
    },
    de_underground_lab: {
        id: 'de_underground_lab',
        name: '🧪 DE_UNDERGROUND_LAB (New)',
        subtitle: 'ศูนย์วิจัยลับใต้ดิน & เขาวงกตนิรภัย 175m (New)',
        description: 'แผนที่ยักษ์ห้องแล็บใต้ดินเขาวงกต (New) ซอกแอบเพียบ! ห้องทดลองหลายโซน แคปซูลชีวภาพ แถวตู้เซิร์ฟเวอร์ซ้อน เสาคอนกรีตหนา และห้องนิรภัยประตูคู่',
        mapSize: 175
    },
    de_ruin_canyon: {
        id: 'de_ruin_canyon',
        name: '🏔️ DE_RUIN_CANYON (New)',
        subtitle: 'หุบเขาซากเมืองร้าง & ช่องเขาซุ่มยิงยักษ์ 200m (New)',
        description: 'แผนที่ใหญ่ที่สุด 200 เมตร! (New) หุบเขาหินสูงและซากโบราณสถาน ห้องหินร้าง 7 หลัง ร่องคูสนามเพลาะยาว และโขดหินซุ่มยิงนับไม่ถ้วน',
        mapSize: 200
    },
    de_megacity: {
        id: 'de_megacity',
        name: '🏙️ DE_MEGACITY',
        subtitle: 'มหานครยุทธวิธีขนาดมหึมา 160m (Mega Metropolis)',
        description: 'แผนที่ยักษ์แนวใหม่ขนาดใหญ่ที่สุด 160 เมตร ถนนหลวงหลายเลน ตึกระฟ้า ทางเดินใต้ดิน สะพานลอยสไนเปอร์ และพลาซ่าใหญ่',
        mapSize: 160
    },
    de_desert_storm: {
        id: 'de_desert_storm',
        name: '🏜️ DE_DESERT_STORM',
        subtitle: 'มหาป้อมปราการทะเลทราย 180m (แผนที่ยักษ์)',
        description: 'สมรภูมิทะเลทรายขนาดมหึมา 180 เมตร โรงเก็บเครื่องบินรบ บังเกอร์สื่อสาร คลังขีปนาวุธ หอคอยสไนเปอร์ และแนวร่องคูดิน',
        mapSize: 180
    },
    de_harbor_mega: {
        id: 'de_harbor_mega',
        name: '⚓ DE_HARBOR_MEGA',
        subtitle: 'ท่าเรือขนส่งสินค้าและเรือรบยักษ์ 185m (แผนที่ยักษ์)',
        description: 'ท่าเรือยุทธวิธีขนาดยักษ์ 185 เมตร เรือรบพิฆาตเทียบท่า เครนยกตู้สินค้า เขาวงกตคอนเทนเนอร์ 3 ชั้น และอู่ต่อเรือ',
        mapSize: 185
    },
    cs_airport: {
        id: 'cs_airport',
        name: '✈️ CS_AIRPORT',
        subtitle: 'ท่าอากาศยานนานาชาติ & รันเวย์เครื่องบิน 190m (แผนที่ยักษ์)',
        description: 'สนามบินนานาชาติขนาดมหึมา 190 เมตร รันเวย์กว้าง เครื่องบินเจ็ทโดยสารยักษ์ หอควบคุมการบิน ATC และอาคารผู้โดยสาร',
        mapSize: 190
    },
    cs_mansion_mega: {
        id: 'cs_mansion_mega',
        name: '🏰 CS_MANSION_MEGA',
        subtitle: 'มหาคฤหาสน์หรูและสวนวงกต 175m (แผนที่ยักษ์)',
        description: 'คฤหาสน์ส่วนตัวสุดหรู 175 เมตร โถงบันไดคู่สองชั้น สวนเขาวงกตต้นไม้ สระว่ายน้ำโอลิมปิก และห้องเก็บไวน์ใต้ดิน',
        mapSize: 175
    },
    de_mirage: {
        id: 'de_mirage',
        name: '🕌 DE_MIRAGE',
        subtitle: 'พระราชวังโมร็อกโก & ตลาดโบราณ (Mirage)',
        description: 'สมรภูมิแข่งขันยอดนิยม ทางขึ้น Palace พระราชวังโบราณ หน้าต่าง Mid Sniper และซอย B Apartments',
        mapSize: 105
    },
    cs_office: {
        id: 'cs_office',
        name: '❄️ CS_OFFICE',
        subtitle: 'สำนักงานหรูหรากลางพายุหิมะ (Office Winter)',
        description: 'อาคารสำนักงานไฮเทคกลางลานหิมะ ห้องประชุม เซิร์ฟเวอร์รูม โซนเคาน์เตอร์ และลานจอดรถด้านนอก',
        mapSize: 115
    },
    de_vertigo: {
        id: 'de_vertigo',
        name: '🏗️ DE_VERTIGO',
        subtitle: 'ดาดฟ้าตึกระฟ้า 50 ชั้น & ไซต์ก่อสร้าง (Vertigo Highrise)',
        description: 'ไซต์งานก่อสร้างบนตึกระฟ้าสูงเสียดฟ้า เครนยกสีเหลืองยักษ์ คานเหล็ก เสาคอนกรีต และทางลาดเชื่อมดาดฟ้า',
        mapSize: 110
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

        // Restore default fog & sun position if a map customized atmospheric lighting
        if (this.game && this.game.scene && this.game.scene.fog) {
            this.game.scene.fog.color.setHex(0xb5aa96);
            this.game.scene.fog.density = 0.0082;
        }
        if (this.game && this.game.sunLight) {
            this.game.sunLight.position.set(38, 68, 28);
        }
    }

    load(mapId = 'de_dust2') {
        if (!MAP_METADATA[mapId]) mapId = 'de_dust2';
        this.clear();
        this._radarBgKey = null;
        this.currentMapId = mapId;
        const meta = MAP_METADATA[mapId];
        this.mapSize = meta.mapSize;

        switch (mapId) {
            case 'de_bangkok_thailand':
                this.buildBangkokThailand();
                break;
            case 'de_jungle_bunker':
                this.buildJungleBunker();
                break;
            case 'cs_suburb_maze':
                this.buildSuburbMaze();
                break;
            case 'de_oil_rig':
                this.buildOilRig();
                break;
            case 'de_underground_lab':
                this.buildUndergroundLab();
                break;
            case 'de_ruin_canyon':
                this.buildRuinCanyon();
                break;
            case 'de_megacity':
                this.buildMegaCity();
                break;
            case 'de_desert_storm':
                this.buildDesertStorm();
                break;
            case 'de_harbor_mega':
                this.buildHarborMega();
                break;
            case 'cs_airport':
                this.buildAirport();
                break;
            case 'cs_mansion_mega':
                this.buildMansionMega();
                break;
            case 'de_mirage':
                this.buildMirage();
                break;
            case 'cs_office':
                this.buildOffice();
                break;
            case 'de_vertigo':
                this.buildVertigo();
                break;
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
    setFog(colorHex, density) {
        if (this.game && this.game.scene && this.game.scene.fog) {
            this.game.scene.fog.color.setHex(colorHex);
            this.game.scene.fog.density = density;
        }
    }

    addBlock(x, y, z, w, h, d, material, isCrate = false, addTrim = false, colliderOpts = null) {
        let mat = material;
        if (material && material.map && (w > 4 || d > 4) && !(material.userData && material.userData.noTileRepeat)) {
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
            isCrate,
            noRadar: !!(colliderOpts && colliderOpts.noRadar)
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

    addStreetLamp(x, z, h = 5.6) {
        const poleMat = new THREE.MeshStandardMaterial({ color: 0x22262c, metalness: 0.85, roughness: 0.35 });
        const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, h, 10), poleMat);
        pole.position.set(x, h / 2, z);
        pole.castShadow = true;
        this.scene.add(pole);
        this.mapObjects.push(pole);
        this.shootableMeshes.push(pole);

        const headMat = new THREE.MeshBasicMaterial({ color: 0xfff4d0 });
        const lampHead = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.22, 0.8), headMat);
        lampHead.position.set(x, h + 0.1, z);
        this.scene.add(lampHead);
        this.mapObjects.push(lampHead);

        const pLight = new THREE.PointLight(0xffeaae, 0.85, 24);
        pLight.position.set(x, h - 0.2, z);
        this.scene.add(pLight);
        this.mapLights.push(pLight);

        this.colliders.push({
            minX: x - 0.3, maxX: x + 0.3,
            minY: 0, maxY: h,
            minZ: z - 0.3, maxZ: z + 0.3,
            isCrate: true
        });
    }

    addPineTree(x, z, h = 5.2, isSnowy = true) {
        const trunkMat = new THREE.MeshStandardMaterial({ color: 0x3d2714, roughness: 0.95 });
        const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.32, 2.0, 8), trunkMat);
        trunk.position.set(x, 1.0, z);
        trunk.castShadow = true;
        this.scene.add(trunk);
        this.mapObjects.push(trunk);
        this.shootableMeshes.push(trunk);

        const foliageMat = new THREE.MeshStandardMaterial({ color: isSnowy ? 0x1e3a29 : 0x1f4d28, roughness: 0.85 });
        const snowMat = isSnowy ? new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.95 }) : null;

        for (let i = 0; i < 3; i++) {
            const rad = 1.8 - i * 0.45;
            const coneH = 2.2 - i * 0.3;
            const cy = 1.8 + i * 1.35;
            const cone = new THREE.Mesh(new THREE.ConeGeometry(rad, coneH, 8), foliageMat);
            cone.position.set(x, cy, z);
            cone.castShadow = true;
            this.scene.add(cone);
            this.mapObjects.push(cone);
            this.shootableMeshes.push(cone);

            if (isSnowy && snowMat) {
                const cap = new THREE.Mesh(new THREE.ConeGeometry(rad * 0.96, 0.4, 8), snowMat);
                cap.position.set(x, cy + coneH * 0.38, z);
                this.scene.add(cap);
                this.mapObjects.push(cap);
            }
        }

        this.colliders.push({
            minX: x - 0.38, maxX: x + 0.38,
            minY: 0, maxY: h,
            minZ: z - 0.38, maxZ: z + 0.38,
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

    // ==================== SHARED LARGE-MAP & HIDING-SPOT BUILDERS ====================
    makeTexMat(bgColor, drawFn, repeat = 1, opts = {}) {
        const c = document.createElement('canvas');
        c.width = 512; c.height = 512;
        const ctx = c.getContext('2d');
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, 512, 512);
        if (drawFn) drawFn(ctx);
        const tex = new THREE.CanvasTexture(c);
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;
        tex.repeat.set(repeat, repeat);
        return new THREE.MeshStandardMaterial({
            map: tex,
            bumpMap: tex,
            bumpScale: opts.bumpScale !== undefined ? opts.bumpScale : 0.05,
            roughness: opts.roughness !== undefined ? opts.roughness : 0.88,
            metalness: opts.metalness || 0.0
        });
    }

    buildCanvasFloor(bgColor, drawFn, repeat = 24, bumpScale = 0.08, roughness = 0.90) {
        const floorMat = this.makeTexMat(bgColor, drawFn, repeat, { bumpScale, roughness });
        this.groundTex = floorMat.map;
        const floorGeo = new THREE.PlaneGeometry(this.mapSize, this.mapSize);
        const floor = new THREE.Mesh(floorGeo, floorMat);
        floor.rotation.x = -Math.PI / 2;
        floor.receiveShadow = true;
        this.scene.add(floor);
        this.mapObjects.push(floor);
        this.shootableMeshes.push(floor);
        this.createBombsiteZone(this.bombsites.A.x, this.bombsites.A.z, 'A');
        this.createBombsiteZone(this.bombsites.B.x, this.bombsites.B.z, 'B');
        return floorMat;
    }

    buildPerimeterWalls(wallH, thick, mat) {
        const half = this.mapSize / 2;
        this.addBlock(0, 0, -half, this.mapSize, wallH, thick, mat, false, true);
        this.addBlock(0, 0, half, this.mapSize, wallH, thick, mat, false, true);
        this.addBlock(-half, 0, 0, thick, wallH, this.mapSize, mat, false, true);
        this.addBlock(half, 0, 0, thick, wallH, this.mapSize, mat, false, true);
    }

    setupLargeMapSpawns(half, siteAx = 58, siteAz = -12, siteBx = -58, siteBz = 12) {
        const tz = half - 11;
        this.spawns = {
            T: [
                { x: 0, z: tz, yaw: 0 },
                { x: -10, z: tz + 1, yaw: 0 },
                { x: 10, z: tz + 1, yaw: 0 },
                { x: -20, z: tz - 1, yaw: 0 },
                { x: 20, z: tz - 1, yaw: 0 }
            ],
            CT: [
                { x: 0, z: -tz, yaw: Math.PI },
                { x: -10, z: -tz - 1, yaw: Math.PI },
                { x: 10, z: -tz - 1, yaw: Math.PI },
                { x: -20, z: -tz + 1, yaw: Math.PI },
                { x: 20, z: -tz + 1, yaw: Math.PI }
            ]
        };
        this.bombsites = {
            A: { x: siteAx, z: siteAz, radius: 8.5, label: 'A' },
            B: { x: siteBx, z: siteBz, radius: 8.5, label: 'B' }
        };
    }

    // Enterable multi-doorway bunker / house / chamber with blind ambush corners & interior cover crates
    buildHideoutRoom(x, z, w, d, h, wallMat, roofMat, crateMat, openSides = ['N', 'S', 'E', 'W'], addRoof = true) {
        const t = 0.8;
        const doorW = 3.8;
        const has = (side) => openSides.includes(side);

        // North & South Walls
        for (const [side, wz] of [['N', z - d / 2], ['S', z + d / 2]]) {
            if (has(side)) {
                const segW = Math.max(1.2, (w - doorW) / 2);
                this.addBlock(x - w / 2 + segW / 2, 0, wz, segW, h, t, wallMat);
                this.addBlock(x + w / 2 - segW / 2, 0, wz, segW, h, t, wallMat);
            } else {
                this.addBlock(x, 0, wz, w, h, t, wallMat);
            }
        }
        // West & East Walls (trimmed between N/S)
        for (const [side, wx] of [['W', x - w / 2], ['E', x + w / 2]]) {
            if (has(side)) {
                const segD = Math.max(1.2, (d - t - doorW) / 2);
                this.addBlock(wx, 0, z - d / 2 + t / 2 + segD / 2, t, h, segD, wallMat);
                this.addBlock(wx, 0, z + d / 2 - t / 2 - segD / 2, t, h, segD, wallMat);
            } else {
                this.addBlock(wx, 0, z, t, h, d - t, wallMat);
            }
        }

        if (addRoof) {
            this.addBlock(x, h, z, w + 0.6, 0.7, d + 0.6, roofMat, false, false);
        }
        // Interior asymmetric cover crates tucked off center so players can crouch-ambush without blocking doorways
        this.addBlock(x - w * 0.25, 0, z - d * 0.22, 1.8, 1.55, 1.8, crateMat, true);
        this.addBlock(x + w * 0.25, 0, z + d * 0.22, 1.9, 2.25, 1.9, crateMat, true);
    }

    buildHideCluster(x, z, wallMat, crateMat, colorHex = 0x1e3a8a, label = 'HID-01', variant = 0) {
        if (variant === 0) {
            this.addContainerProp(x, z, 6.2, 2.7, 2.6, 0, colorHex, label);
            this.addBlock(x - 2.6, 0, z + 3.0, 2.0, 2.1, 2.0, crateMat, true);
            this.addBlock(x + 2.4, 0, z - 2.9, 1.8, 1.35, 1.8, crateMat, true);
            this.addBarrelProp(x + 3.9, z + 0.4, colorHex);
            this.addBarrelProp(x + 3.9, z - 0.9, colorHex);
        } else if (variant === 1) {
            this.addContainerProp(x, z, 6.2, 2.7, 2.6, Math.PI / 2, colorHex, label);
            this.addConcreteBarrier(x - 3.4, z + 2.4, 0);
            this.addConcreteBarrier(x + 3.4, z - 2.4, Math.PI / 2);
            this.addBlock(x + 2.6, 0, z + 2.6, 2.1, 2.3, 2.1, crateMat, true);
        } else {
            this.addBlock(x - 1.8, 0, z - 1.5, 2.1, 2.3, 2.1, crateMat, true);
            this.addBlock(x + 1.9, 0, z + 1.6, 2.0, 1.4, 2.0, crateMat, true);
            this.addBlock(x + 1.9, 0, z - 1.8, 1.8, 1.9, 1.8, wallMat, true);
            this.addConcreteBarrier(x - 2.2, z + 2.2, 0);
        }
    }

    buildTrenchZigZag(x, z, count, step, vertical, mat) {
        for (let i = 0; i < count; i++) {
            const offset = (i % 2 === 0 ? -2.4 : 2.4);
            const posAlong = (i - (count - 1) / 2) * step;
            if (vertical) {
                this.addBlock(x + offset, 0, z + posAlong, 0.9, 1.55, 4.2, mat, true);
            } else {
                this.addBlock(x + posAlong, 0, z + offset, 4.2, 1.55, 0.9, mat, true);
            }
        }
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

        const skyRadius = Math.max(280, this.mapSize * 1.6);
        const skyGeo = new THREE.SphereGeometry(skyRadius, 32, 24);
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

    // =========================================================================
    // MAP 7: DE_MEGACITY (Mega Metropolis 160m - Brand New Mega Arena)
    // =========================================================================
    buildMegaCity() {
        this.buildSky('#0a1128', '#1c2d5a', '#ea580c', 720, 160, 'rgba(255, 237, 213, 1.0)');
        this.updateAtmosphericLighting(0x60a5fa, 0x1e293b, 0xffedd5, 0xffd8a8, 1.45);

        this.spawns = {
            T: [
                { x: 0, z: 66, yaw: 0 },
                { x: -8, z: 67, yaw: 0 },
                { x: 8, z: 67, yaw: 0 },
                { x: -18, z: 64, yaw: 0 },
                { x: 18, z: 64, yaw: 0 }
            ],
            CT: [
                { x: 0, z: -66, yaw: Math.PI },
                { x: -8, z: -67, yaw: Math.PI },
                { x: 8, z: -67, yaw: Math.PI },
                { x: -18, z: -64, yaw: Math.PI },
                { x: 18, z: -64, yaw: Math.PI }
            ]
        };

        this.bombsites = {
            A: { x: 48, z: -20, radius: 7.5, label: 'A' },
            B: { x: -48, z: 20, radius: 7.5, label: 'B' }
        };

        this.waypoints = [
            // South Commercial District (T spawn & alleys)
            { x: 0, z: 64 }, { x: -18, z: 60 }, { x: 18, z: 60 }, { x: -36, z: 54 }, { x: 36, z: 54 },
            // South-Mid Boulevard & Metro approach
            { x: 0, z: 42 }, { x: -24, z: 38 }, { x: 24, z: 38 }, { x: -48, z: 36 },
            // Bombsite B (Transit Terminal & Subway Depot)
            { x: -48, z: 20 }, { x: -36, z: 16 }, { x: -56, z: 8 },
            // Central Plaza, Avenue & Elevated Skybridge
            { x: 0, z: 18 }, { x: 0, z: 0 }, { x: -14, z: 0 }, { x: 14, z: 0 }, { x: 0, z: -18 },
            // Bombsite A (Financial Plaza & Bank Vault Steps)
            { x: 48, z: -20 }, { x: 36, z: -16 }, { x: 56, z: -8 }, { x: 48, z: -36 },
            // North Civic Center (CT spawn & avenues)
            { x: 0, z: -42 }, { x: -24, z: -38 }, { x: 24, z: -38 }, { x: -36, z: -54 }, { x: 36, z: -54 },
            { x: 0, z: -64 }, { x: -18, z: -60 }, { x: 18, z: -60 }
        ];

        // 1. Asphalt Boulevard Ground with Road Lanes & Zebra Crossings
        const roadCanvas = document.createElement('canvas');
        roadCanvas.width = 512;
        roadCanvas.height = 512;
        const rCtx = roadCanvas.getContext('2d');
        rCtx.fillStyle = '#1e232a';
        rCtx.fillRect(0, 0, 512, 512);

        // Asphalt texture speckles
        for (let i = 0; i < 20000; i++) {
            rCtx.fillStyle = i % 2 === 0 ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.06)';
            rCtx.fillRect(Math.random() * 512, Math.random() * 512, 1.5, 1.5);
        }

        // Sidewalk curb edge lines
        rCtx.fillStyle = '#94a3b8';
        rCtx.fillRect(0, 0, 512, 12);
        rCtx.fillRect(0, 500, 512, 12);

        // Double yellow center divider line
        rCtx.fillStyle = '#f59e0b';
        rCtx.fillRect(0, 252, 512, 3);
        rCtx.fillRect(0, 257, 512, 3);

        // White dashed lane markings
        rCtx.fillStyle = 'rgba(255, 255, 255, 0.75)';
        for (let x = 0; x < 512; x += 48) {
            rCtx.fillRect(x, 128, 24, 3);
            rCtx.fillRect(x, 384, 24, 3);
        }

        const roadTex = new THREE.CanvasTexture(roadCanvas);
        roadTex.wrapS = THREE.RepeatWrapping;
        roadTex.wrapT = THREE.RepeatWrapping;
        roadTex.repeat.set(16, 16);

        // 2. High-Rise Glass Skyscraper Curtain Wall Texture
        const skyCanvas = document.createElement('canvas');
        skyCanvas.width = 512;
        skyCanvas.height = 512;
        const sCtx = skyCanvas.getContext('2d');
        sCtx.fillStyle = '#0f172a';
        sCtx.fillRect(0, 0, 512, 512);

        for (let y = 0; y < 512; y += 32) {
            for (let x = 0; x < 512; x += 24) {
                const lit = Math.random() > 0.45;
                if (lit) {
                    sCtx.fillStyle = Math.random() > 0.3 ? '#fef08a' : '#7dd3fc';
                } else {
                    sCtx.fillStyle = '#1e293b';
                }
                sCtx.fillRect(x + 2, y + 2, 20, 28);
                sCtx.strokeStyle = '#020617';
                sCtx.lineWidth = 2;
                sCtx.strokeRect(x, y, 24, 32);
            }
        }
        const skyscapeTex = new THREE.CanvasTexture(skyCanvas);
        skyscapeTex.wrapS = THREE.RepeatWrapping;
        skyscapeTex.wrapT = THREE.RepeatWrapping;

        // 3. Concrete Urban Sidewalk & Wall Texture
        const urbanCanvas = document.createElement('canvas');
        urbanCanvas.width = 512;
        urbanCanvas.height = 512;
        const uCtx = urbanCanvas.getContext('2d');
        uCtx.fillStyle = '#475569';
        uCtx.fillRect(0, 0, 512, 512);
        for (let y = 0; y < 512; y += 64) {
            for (let x = 0; x < 512; x += 64) {
                uCtx.fillStyle = (x + y) % 128 === 0 ? '#64748b' : '#475569';
                uCtx.fillRect(x + 1, y + 1, 62, 62);
                uCtx.strokeStyle = 'rgba(15, 23, 42, 0.45)';
                uCtx.lineWidth = 2;
                uCtx.strokeRect(x, y, 64, 64);
            }
        }
        const urbanTex = new THREE.CanvasTexture(urbanCanvas);
        urbanTex.wrapS = THREE.RepeatWrapping;
        urbanTex.wrapT = THREE.RepeatWrapping;

        // 4. Financial Bank Neoclassical Granite Texture
        const bankCanvas = document.createElement('canvas');
        bankCanvas.width = 512;
        bankCanvas.height = 512;
        const bCtx = bankCanvas.getContext('2d');
        bCtx.fillStyle = '#334155';
        bCtx.fillRect(0, 0, 512, 512);
        bCtx.strokeStyle = '#1e293b';
        bCtx.lineWidth = 6;
        bCtx.strokeRect(8, 8, 496, 496);
        bCtx.fillStyle = '#fbbf24';
        bCtx.font = 'bold 22px monospace';
        bCtx.textAlign = 'center';
        bCtx.fillText('METROPOLIS RESERVE BANK // SEC-A', 256, 42);
        const bankTex = new THREE.CanvasTexture(bankCanvas);

        // Floor Mesh
        const floorGeo = new THREE.PlaneGeometry(this.mapSize, this.mapSize);
        const floorMat = new THREE.MeshStandardMaterial({
            map: roadTex,
            bumpMap: roadTex,
            bumpScale: 0.05,
            roughness: 0.88,
            metalness: 0.1
        });
        const floor = new THREE.Mesh(floorGeo, floorMat);
        floor.rotation.x = -Math.PI / 2;
        floor.receiveShadow = true;
        this.scene.add(floor);
        this.mapObjects.push(floor);
        this.shootableMeshes.push(floor);

        this.createBombsiteZone(this.bombsites.A.x, this.bombsites.A.z, 'A');
        this.createBombsiteZone(this.bombsites.B.x, this.bombsites.B.z, 'B');

        const roadWallMat = new THREE.MeshStandardMaterial({ map: urbanTex, roughness: 0.85 });
        const glassBuildingMat = new THREE.MeshStandardMaterial({ map: skyscapeTex, roughness: 0.25, metalness: 0.75 });
        const bankMat = new THREE.MeshStandardMaterial({ map: bankTex, roughness: 0.65 });
        const metalMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.85, roughness: 0.35 });

        const half = this.mapSize / 2;
        const wallH = 12.0;

        // Perimeter Boundaries
        this.addBlock(0, 0, -half, this.mapSize, wallH, 3, roadWallMat, false, true);
        this.addBlock(0, 0, half, this.mapSize, wallH, 3, roadWallMat, false, true);
        this.addBlock(-half, 0, 0, 3, wallH, this.mapSize, roadWallMat, false, true);
        this.addBlock(half, 0, 0, 3, wallH, this.mapSize, roadWallMat, false, true);

        // 4 Mega Skyscraper Corner Complexes (Heights 28m - 34m)
        this.addBlock(-58, 0, -58, 28, 32, 28, glassBuildingMat);
        this.addBlock(58, 0, -58, 28, 34, 28, glassBuildingMat);
        this.addBlock(-58, 0, 58, 28, 30, 28, glassBuildingMat);
        this.addBlock(58, 0, 58, 28, 32, 28, glassBuildingMat);

        // Bombsite A: Financial Plaza Building & Bank Steps
        this.addBlock(48, 0, -28, 34, 16, 18, bankMat);
        this.addBlock(48, 0, -18, 18, 1.2, 4, roadWallMat); // Bank Entrance Steps
        this.addBlock(40, 0, -20, 2.4, 4.5, 2.4, bankMat);  // Neoclassical Pillar 1
        this.addBlock(56, 0, -20, 2.4, 4.5, 2.4, bankMat);  // Neoclassical Pillar 2
        this.addConcreteBarrier(44, -14, 0);
        this.addConcreteBarrier(52, -14, 0);
        this.addContainerProp(36, -8, 6.2, 2.6, 2.6, Math.PI / 4, 0x1e3a8a, 'SEC-VAULT');
        this.addBarrelProp(48, -12, 0x10b981);
        this.addBarrelProp(49, -12, 0x10b981);

        // Bombsite B: Transit Terminal & Metro Subway Canopy
        this.addBlock(-48, 0, 28, 34, 15, 18, roadWallMat);
        this.addBlock(-48, 0, 18, 16, 4.8, 8, roadWallMat); // Subway Entrance Building
        this.addBlock(-48, 0, 12, 8, 1.2, 4, roadWallMat);  // Station Subway Stairs
        this.addContainerProp(-36, 10, 6.2, 2.6, 2.6, 0, 0x854d0e, 'METRO-CARGO');
        this.addContainerProp(-42, 6, 6.2, 2.6, 2.6, Math.PI / 2, 0x1e3a8a, 'TRANSIT-77');
        this.addConcreteBarrier(-48, 15, Math.PI / 2);
        this.addBarrelProp(-38, 22, 0xd97706, true);
        this.addBarrelProp(-39.2, 22, 0xd97706, true);

        // Central Elevated Pedestrian Skybridge (Spans over Boulevard at z: 0)
        // Deck elevated at y: 4.6m (walkable overhead sniper roost)
        this.addBlock(0, 4.4, 0, 32, 0.6, 5.0, metalMat);
        // Handrails
        this.addBlock(0, 5.0, -2.4, 32, 1.2, 0.3, roadWallMat);
        this.addBlock(0, 5.0, 2.4, 32, 1.2, 0.3, roadWallMat);
        // Skybridge Support Columns
        this.addBlock(-12, 0, -1.8, 1.8, 4.4, 1.8, metalMat);
        this.addBlock(12, 0, -1.8, 1.8, 4.4, 1.8, metalMat);
        this.addBlock(-12, 0, 1.8, 1.8, 4.4, 1.8, metalMat);
        this.addBlock(12, 0, 1.8, 1.8, 4.4, 1.8, metalMat);
        // Skybridge Stair Ramps (East and West access)
        this.addBlock(-18, 0, 0, 4, 1.4, 4.2, roadWallMat);
        this.addBlock(-15, 1.4, 0, 4, 1.5, 4.2, roadWallMat);
        this.addBlock(-12, 2.9, 0, 4, 1.5, 4.2, roadWallMat);
        this.addBlock(18, 0, 0, 4, 1.4, 4.2, roadWallMat);
        this.addBlock(15, 1.4, 0, 4, 1.5, 4.2, roadWallMat);
        this.addBlock(12, 2.9, 0, 4, 1.5, 4.2, roadWallMat);

        // Mid Boulevard Jersey Barriers & Tactical Cover
        this.addConcreteBarrier(0, 16, 0);
        this.addConcreteBarrier(0, -16, 0);
        this.addConcreteBarrier(-8, 30, Math.PI / 2);
        this.addConcreteBarrier(8, -30, Math.PI / 2);

        // Central Plaza Fountain Pedestal (x: 0, z: 0)
        this.addBlock(0, 0, 0, 4.5, 0.9, 4.5, roadWallMat);

        // North & South Commercial Mid Blocks
        this.addBlock(-26, 0, -42, 16, 8, 12, glassBuildingMat);
        this.addBlock(26, 0, -42, 16, 8, 12, glassBuildingMat);
        this.addBlock(-26, 0, 42, 16, 8, 12, glassBuildingMat);
        this.addBlock(26, 0, 42, 16, 8, 12, glassBuildingMat);

        // Street Lamps along the Grand Boulevard
        this.addStreetLamp(-14, 52);
        this.addStreetLamp(14, 52);
        this.addStreetLamp(-14, 24);
        this.addStreetLamp(14, 24);
        this.addStreetLamp(-14, -24);
        this.addStreetLamp(14, -24);
        this.addStreetLamp(-14, -52);
        this.addStreetLamp(14, -52);
    }

    // =========================================================================
    // MAP 8: DE_DESERT_STORM (Massive Desert Warfare Outpost 180m)
    // =========================================================================
    buildDesertStorm() {
        this.buildSky('#7c2d12', '#b45309', '#fde68a', 720, 160, 'rgba(255, 237, 213, 1.0)');
        this.updateAtmosphericLighting(0xf59e0b, 0x451a03, 0xfef3c7, 0xfde68a, 1.50);

        this.spawns = {
            T: [
                { x: 0, z: 76, yaw: 0 },
                { x: -10, z: 78, yaw: 0 },
                { x: 10, z: 78, yaw: 0 },
                { x: -22, z: 74, yaw: 0 },
                { x: 22, z: 74, yaw: 0 }
            ],
            CT: [
                { x: 0, z: -76, yaw: Math.PI },
                { x: -10, z: -78, yaw: Math.PI },
                { x: 10, z: -78, yaw: Math.PI },
                { x: -22, z: -74, yaw: Math.PI },
                { x: 22, z: -74, yaw: Math.PI }
            ]
        };

        this.bombsites = {
            A: { x: 55, z: -25, radius: 8.0, label: 'A' },
            B: { x: -55, z: 25, radius: 8.0, label: 'B' }
        };

        this.waypoints = [
            // South Desert Outpost (T Spawn)
            { x: 0, z: 74 }, { x: -24, z: 70 }, { x: 24, z: 70 }, { x: -48, z: 60 }, { x: 48, z: 60 },
            // South Canyon Approach & Trenches
            { x: 0, z: 48 }, { x: -32, z: 42 }, { x: 32, z: 42 },
            // Bombsite B (Missile Silo & Heavy Fuel Tank Farm)
            { x: -55, z: 25 }, { x: -40, z: 20 }, { x: -68, z: 12 }, { x: -55, z: 40 },
            // Center Battlefield & Sniper Watchtower
            { x: 0, z: 20 }, { x: 0, z: 0 }, { x: -18, z: 0 }, { x: 18, z: 0 }, { x: 0, z: -20 },
            // Bombsite A (Communications Bunker & Radar)
            { x: 55, z: -25 }, { x: 40, z: -20 }, { x: 68, z: -12 }, { x: 55, z: -40 },
            // North Airbase Garrison & Hangar (CT Spawn)
            { x: 0, z: -48 }, { x: -32, z: -42 }, { x: 32, z: -42 },
            { x: 0, z: -74 }, { x: -24, z: -70 }, { x: 24, z: -70 }, { x: -48, z: -60 }, { x: 48, z: -60 }
        ];

        // Desert Dune Ground Texture
        const duneCanvas = document.createElement('canvas');
        duneCanvas.width = 512;
        duneCanvas.height = 512;
        const dCtx = duneCanvas.getContext('2d');
        dCtx.fillStyle = '#b49065';
        dCtx.fillRect(0, 0, 512, 512);
        for (let y = 0; y < 512; y += 48) {
            dCtx.fillStyle = (y / 48 % 2 === 0) ? 'rgba(90, 68, 42, 0.28)' : 'rgba(225, 200, 160, 0.22)';
            dCtx.fillRect(0, y, 512, 24);
        }
        for (let i = 0; i < 18000; i++) {
            dCtx.fillStyle = i % 2 === 0 ? 'rgba(50, 36, 20, 0.3)' : 'rgba(255, 235, 195, 0.15)';
            dCtx.fillRect(Math.random() * 512, Math.random() * 512, 1.5, 1.5);
        }
        const duneTex = new THREE.CanvasTexture(duneCanvas);
        duneTex.wrapS = THREE.RepeatWrapping;
        duneTex.wrapT = THREE.RepeatWrapping;
        duneTex.repeat.set(22, 22);

        // Fortified Camo Concrete Wall Texture
        const fortCanvas = document.createElement('canvas');
        fortCanvas.width = 512;
        fortCanvas.height = 512;
        const fCtx = fortCanvas.getContext('2d');
        fCtx.fillStyle = '#786650';
        fCtx.fillRect(0, 0, 512, 512);
        for (let y = 0; y < 512; y += 64) {
            fCtx.fillStyle = 'rgba(40, 30, 20, 0.45)';
            fCtx.fillRect(0, y, 512, 3);
            for (let x = (y % 128 === 0 ? 0 : 64); x < 512; x += 128) {
                fCtx.fillRect(x, y, 3, 64);
            }
        }
        const fortTex = new THREE.CanvasTexture(fortCanvas);

        // Heavy Steel Fuel Tank Texture
        const tankCanvas = document.createElement('canvas');
        tankCanvas.width = 256;
        tankCanvas.height = 256;
        const tCtx = tankCanvas.getContext('2d');
        tCtx.fillStyle = '#475569';
        tCtx.fillRect(0, 0, 256, 256);
        tCtx.strokeStyle = '#ef4444';
        tCtx.lineWidth = 14;
        tCtx.strokeRect(7, 7, 242, 242);
        tCtx.fillStyle = '#fee2e2';
        tCtx.font = 'bold 22px monospace';
        tCtx.textAlign = 'center';
        tCtx.fillText('FLAMMABLE JP-8', 128, 134);
        const tankTex = new THREE.CanvasTexture(tankCanvas);

        const floorGeo = new THREE.PlaneGeometry(this.mapSize, this.mapSize);
        const floorMat = new THREE.MeshStandardMaterial({
            map: duneTex,
            bumpMap: duneTex,
            bumpScale: 0.08,
            roughness: 0.92
        });
        const floor = new THREE.Mesh(floorGeo, floorMat);
        floor.rotation.x = -Math.PI / 2;
        floor.receiveShadow = true;
        this.scene.add(floor);
        this.mapObjects.push(floor);
        this.shootableMeshes.push(floor);

        this.createBombsiteZone(this.bombsites.A.x, this.bombsites.A.z, 'A');
        this.createBombsiteZone(this.bombsites.B.x, this.bombsites.B.z, 'B');

        const fortMat = new THREE.MeshStandardMaterial({ map: fortTex, roughness: 0.88 });
        const tankMat = new THREE.MeshStandardMaterial({ map: tankTex, roughness: 0.55, metalness: 0.65 });
        const steelMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.85, roughness: 0.35 });

        const half = this.mapSize / 2;
        const wallH = 14.0;

        // Giant Outer Fortress Perimeter
        this.addBlock(0, 0, -half, this.mapSize, wallH, 4, fortMat, false, true);
        this.addBlock(0, 0, half, this.mapSize, wallH, 4, fortMat, false, true);
        this.addBlock(-half, 0, 0, 4, wallH, this.mapSize, fortMat, false, true);
        this.addBlock(half, 0, 0, 4, wallH, this.mapSize, fortMat, false, true);

        // 4 Corner Observation Fortresses
        this.addBlock(-68, 0, -68, 30, 22, 30, fortMat);
        this.addBlock(68, 0, -68, 30, 22, 30, fortMat);
        this.addBlock(-68, 0, 68, 30, 22, 30, fortMat);
        this.addBlock(68, 0, 68, 30, 22, 30, fortMat);

        // Aircraft/Helicopter Hangar (North-West)
        this.addBlock(-45, 0, -45, 34, 16, 28, steelMat);
        this.addBlock(-45, 0, -31, 28, 1.2, 8, fortMat);

        // Bombsite A: Communications Bunker & Radar Post (East)
        this.addBlock(55, 0, -25, 26, 8.5, 24, fortMat);
        this.addBlock(55, 8.5, -25, 4.5, 4.0, 4.5, steelMat);
        this.addConcreteBarrier(44, -25, Math.PI / 2);
        this.addConcreteBarrier(66, -25, Math.PI / 2);
        this.addContainerProp(42, -15, 6.2, 2.6, 2.6, 0, 0x1e3a8a, 'MIL-SAT9');
        this.addBarrelProp(54, -15, 0x15803d);
        this.addBarrelProp(55.2, -15, 0x15803d);

        // Bombsite B: Missile Silo & Heavy Fuel Tank Farm (West)
        this.addBlock(-55, 0, 25, 32, 1.4, 32, steelMat);
        this.addBlock(-45, 0, 18, 9, 8.5, 9, tankMat);
        this.addBlock(-65, 0, 18, 9, 8.5, 9, tankMat);
        this.addBlock(-45, 0, 32, 9, 8.5, 9, tankMat);
        this.addBlock(-65, 0, 32, 9, 8.5, 9, tankMat);
        this.addConcreteBarrier(-55, 12, 0);
        this.addContainerProp(-36, 25, 6.2, 2.6, 2.6, Math.PI / 2, 0x991b1b, 'ORD-NUK4');
        this.addBarrelProp(-48, 38, 0xd97706, true);
        this.addBarrelProp(-49.2, 38, 0xd97706, true);

        // Central Sniper Watchtower (x: 0, z: 0)
        this.addBlock(0, 0, 0, 5.0, 12.0, 5.0, steelMat);
        this.addBlock(0, 12.0, 0, 9.0, 0.6, 9.0, steelMat);
        this.addBlock(0, 12.6, -4.2, 9.0, 1.2, 0.3, fortMat);
        this.addBlock(0, 12.6, 4.2, 9.0, 1.2, 0.3, fortMat);
        this.addBlock(-4.2, 12.6, 0, 0.3, 1.2, 9.0, fortMat);
        this.addBlock(4.2, 12.6, 0, 0.3, 1.2, 9.0, fortMat);

        // Sunken Trench Walls (Mid Cross)
        this.addBlock(0, 0, 24, 22, 1.8, 3.2, fortMat);
        this.addBlock(0, 0, -24, 22, 1.8, 3.2, fortMat);
        this.addBlock(-24, 0, 0, 3.2, 1.8, 22, fortMat);
        this.addBlock(24, 0, 0, 3.2, 1.8, 22, fortMat);

        // Sandbag & Concrete Defensive Barricades
        this.addConcreteBarrier(-16, 52, 0);
        this.addConcreteBarrier(16, 52, 0);
        this.addConcreteBarrier(-16, -52, 0);
        this.addConcreteBarrier(16, -52, 0);
    }

    // =========================================================================
    // MAP 9: DE_HARBOR_MEGA (Massive Shipping Port & Naval Warship 185m)
    // =========================================================================
    buildHarborMega() {
        this.buildSky('#082f49', '#0284c7', '#fdba74', 680, 170, 'rgba(255, 237, 213, 1.0)');
        this.updateAtmosphericLighting(0x38bdf8, 0x0f172a, 0xffedd5, 0xffd8a8, 1.45);

        this.spawns = {
            T: [
                { x: 0, z: 78, yaw: 0 },
                { x: -10, z: 80, yaw: 0 },
                { x: 10, z: 80, yaw: 0 },
                { x: -24, z: 76, yaw: 0 },
                { x: 24, z: 76, yaw: 0 }
            ],
            CT: [
                { x: 0, z: -78, yaw: Math.PI },
                { x: -10, z: -80, yaw: Math.PI },
                { x: 10, z: -80, yaw: Math.PI },
                { x: -24, z: -76, yaw: Math.PI },
                { x: 24, z: -76, yaw: Math.PI }
            ]
        };

        this.bombsites = {
            A: { x: 56, z: -10, radius: 8.0, label: 'A' },
            B: { x: -55, z: 20, radius: 8.0, label: 'B' }
        };

        this.waypoints = [
            // South Cargo Gate (T Spawn)
            { x: 0, z: 76 }, { x: -28, z: 72 }, { x: 28, z: 72 }, { x: -54, z: 64 }, { x: 54, z: 64 },
            // Container Yard South & Drydock Approach
            { x: 0, z: 50 }, { x: -36, z: 45 }, { x: 36, z: 45 },
            // Bombsite B (Drydock Basin & Torpedo Warehouse)
            { x: -55, z: 20 }, { x: -40, z: 15 }, { x: -68, z: 6 }, { x: -55, z: 36 },
            // Central Port Corridor & Gantry Crane Base
            { x: 0, z: 24 }, { x: 0, z: 0 }, { x: 24, z: 0 }, { x: -24, z: 0 }, { x: 0, z: -24 },
            // Bombsite A (Moored Naval Warship Superstructure Deck)
            { x: 56, z: -10 }, { x: 56, z: 15 }, { x: 56, z: -35 }, { x: 42, z: -10 },
            // North Port Authority (CT Spawn)
            { x: 0, z: -50 }, { x: -36, z: -45 }, { x: 36, z: -45 },
            { x: 0, z: -76 }, { x: -28, z: -72 }, { x: 28, z: -72 }, { x: -54, z: -64 }, { x: 54, z: -64 }
        ];

        // Concrete Pier Dock Ground
        const dockCanvas = document.createElement('canvas');
        dockCanvas.width = 512;
        dockCanvas.height = 512;
        const dkCtx = dockCanvas.getContext('2d');
        dkCtx.fillStyle = '#334155';
        dkCtx.fillRect(0, 0, 512, 512);
        for (let y = 0; y < 512; y += 64) {
            for (let x = 0; x < 512; x += 64) {
                dkCtx.fillStyle = (x + y) % 128 === 0 ? '#475569' : '#334155';
                dkCtx.fillRect(x + 2, y + 2, 60, 60);
                dkCtx.strokeStyle = 'rgba(15, 23, 42, 0.4)';
                dkCtx.lineWidth = 2;
                dkCtx.strokeRect(x, y, 64, 64);
            }
        }
        for (let y = 0; y < 512; y += 32) {
            dkCtx.fillStyle = (y / 32 % 2 === 0) ? '#f59e0b' : '#0f172a';
            dkCtx.fillRect(496, y, 16, 32);
        }
        const dockTex = new THREE.CanvasTexture(dockCanvas);
        dockTex.wrapS = THREE.RepeatWrapping;
        dockTex.wrapT = THREE.RepeatWrapping;
        dockTex.repeat.set(20, 20);

        // Naval Gray Warship Steel Hull Texture
        const shipCanvas = document.createElement('canvas');
        shipCanvas.width = 512;
        shipCanvas.height = 512;
        const sCtx = shipCanvas.getContext('2d');
        sCtx.fillStyle = '#475569';
        sCtx.fillRect(0, 0, 512, 512);
        sCtx.strokeStyle = '#1e293b';
        sCtx.lineWidth = 8;
        sCtx.strokeRect(6, 6, 500, 500);
        sCtx.fillStyle = '#f8fafc';
        sCtx.font = 'bold 36px monospace';
        sCtx.fillText('DDG-88 AEGIS', 42, 68);
        const shipTex = new THREE.CanvasTexture(shipCanvas);

        const floorGeo = new THREE.PlaneGeometry(this.mapSize, this.mapSize);
        const floorMat = new THREE.MeshStandardMaterial({
            map: dockTex,
            bumpMap: dockTex,
            bumpScale: 0.06,
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

        const dockWallMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.85 });
        const shipMat = new THREE.MeshStandardMaterial({ map: shipTex, roughness: 0.55, metalness: 0.65 });
        const craneYellowMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.75, roughness: 0.35 });
        const warehouseMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.75 });

        const half = this.mapSize / 2;
        const wallH = 13.0;

        // Perimeter Walls
        this.addBlock(0, 0, -half, this.mapSize, wallH, 3, dockWallMat, false, true);
        this.addBlock(0, 0, half, this.mapSize, wallH, 3, dockWallMat, false, true);
        this.addBlock(-half, 0, 0, 3, wallH, this.mapSize, dockWallMat, false, true);
        this.addBlock(half, 0, 0, 3, wallH, this.mapSize, dockWallMat, false, true);

        // Moored Naval Warship (Bombsite A: East Dock, length 85m, width 18m)
        this.addBlock(56, 0, -5, 18, 5.5, 85, shipMat);
        this.addBlock(56, 5.5, -10, 12, 6.5, 34, shipMat);
        this.addBlock(56, 12.0, -10, 4, 7.5, 4, shipMat);
        this.addBlock(44, 0, -5, 6, 5.5, 10, dockWallMat);

        // Bombsite B: Drydock Basin & Torpedo Warehouse (West)
        this.addBlock(-55, 0, 20, 26, 10.5, 36, warehouseMat);
        this.addBlock(-55, 0, 4, 16, 1.4, 12, dockWallMat);
        this.addContainerProp(-40, 20, 6.2, 2.6, 2.6, 0, 0x1e3a8a, 'TORP-533');
        this.addContainerProp(-40, 26, 6.2, 2.6, 2.6, 0, 0x1e3a8a, 'NAV-ORD8');
        this.addBarrelProp(-32, 22, 0xd97706, true);
        this.addBarrelProp(-32, 23.5, 0xd97706, true);

        // Giant Rail-Mounted Dock Gantry Crane (x: 20, z: 0)
        this.addBlock(14, 0, 0, 2.2, 20.0, 2.2, craneYellowMat);
        this.addBlock(28, 0, 0, 2.2, 20.0, 2.2, craneYellowMat);
        this.addBlock(21, 20.0, 0, 24.0, 2.4, 4.0, craneYellowMat);

        // Multi-Story Container Labyrinth (South & Mid Yard)
        this.addContainerProp(-12, 45, 6.2, 2.6, 2.6, 0, 0x1e3a8a, 'MSK-901');
        this.addContainerProp(-12, 45, 6.2, 5.2, 2.6, 0, 0x991b1b, 'MSK-902');
        this.addContainerProp(12, 45, 6.2, 2.6, 2.6, Math.PI / 2, 0x15803d, 'EVER-44');
        this.addContainerProp(12, 45, 6.2, 5.2, 2.6, Math.PI / 2, 0x854d0e, 'HAPAG-11');

        this.addContainerProp(-12, -45, 6.2, 2.6, 2.6, Math.PI / 2, 0x991b1b, 'COSCO-08');
        this.addContainerProp(-12, -45, 6.2, 5.2, 2.6, Math.PI / 2, 0x1e3a8a, 'ONE-604');
        this.addContainerProp(12, -45, 6.2, 2.6, 2.6, 0, 0x15803d, 'CMA-72');

        this.addContainerProp(-25, 0, 6.2, 2.6, 2.6, 0, 0x854d0e, 'YANG-33');
        this.addContainerProp(-25, 0, 6.2, 5.2, 2.6, 0, 0x1e3a8a, 'ZIM-91');
        this.addContainerProp(0, 0, 6.2, 2.6, 2.6, Math.PI / 2, 0x991b1b, 'OOCL-19');

        // Concrete Jersey Barriers
        this.addConcreteBarrier(-20, 60, 0);
        this.addConcreteBarrier(20, 60, 0);
        this.addConcreteBarrier(-20, -60, 0);
        this.addConcreteBarrier(20, -60, 0);

        // Dockside Street Lamps
        this.addStreetLamp(36, 40);
        this.addStreetLamp(36, -40);
        this.addStreetLamp(-36, 40);
        this.addStreetLamp(-36, -40);
    }

    // =========================================================================
    // MAP 10: CS_AIRPORT (International Airport Runway & Jetliner 190m)
    // =========================================================================
    buildAirport() {
        this.buildSky('#0f172a', '#1e293b', '#64748b', 650, 150, 'rgba(255, 255, 255, 1.0)');
        this.updateAtmosphericLighting(0x94a3b8, 0x1e293b, 0xf8fafc, 0xffffff, 1.48);

        this.spawns = {
            T: [
                { x: 0, z: 80, yaw: 0 },
                { x: -12, z: 82, yaw: 0 },
                { x: 12, z: 82, yaw: 0 },
                { x: -26, z: 78, yaw: 0 },
                { x: 26, z: 78, yaw: 0 }
            ],
            CT: [
                { x: 0, z: -80, yaw: Math.PI },
                { x: -12, z: -82, yaw: Math.PI },
                { x: 12, z: -82, yaw: Math.PI },
                { x: -26, z: -78, yaw: Math.PI },
                { x: 26, z: -78, yaw: Math.PI }
            ]
        };

        this.bombsites = {
            A: { x: 38, z: -8, radius: 8.5, label: 'A' },
            B: { x: -50, z: 42, radius: 8.0, label: 'B' }
        };

        this.waypoints = [
            // South Cargo Ramp (T Spawn)
            { x: 0, z: 78 }, { x: -30, z: 74 }, { x: 30, z: 74 }, { x: -58, z: 68 }, { x: 58, z: 68 },
            // Taxiway South & Fuel Depot Approach
            { x: 0, z: 52 }, { x: -36, z: 48 }, { x: 36, z: 48 },
            // Bombsite B (ATC Control Tower & Jet Fuel Farm)
            { x: -50, z: 42 }, { x: -36, z: 32 }, { x: -65, z: 36 }, { x: -50, z: 58 },
            // Center Tarmac & Runway Intersection
            { x: 0, z: 24 }, { x: 0, z: 0 }, { x: 22, z: 0 }, { x: -22, z: 0 }, { x: 0, z: -24 },
            // Bombsite A (Giant Jetliner Cargo Hold & Wing)
            { x: 38, z: -8 }, { x: 38, z: 16 }, { x: 38, z: -32 }, { x: 24, z: -8 },
            // North VIP Departure Terminal (CT Spawn)
            { x: 0, z: -52 }, { x: -36, z: -48 }, { x: 36, z: -48 },
            { x: 0, z: -78 }, { x: -30, z: -74 }, { x: 30, z: -74 }, { x: -58, z: -68 }, { x: 58, z: -68 }
        ];

        // Tarmac Runway Asphalt Texture with White Centerlines
        const runwayCanvas = document.createElement('canvas');
        runwayCanvas.width = 512;
        runwayCanvas.height = 512;
        const rwCtx = runwayCanvas.getContext('2d');
        rwCtx.fillStyle = '#1e293b';
        rwCtx.fillRect(0, 0, 512, 512);

        // White Runway Centerline Stripes
        rwCtx.fillStyle = '#ffffff';
        for (let y = 0; y < 512; y += 64) {
            rwCtx.fillRect(244, y, 24, 38);
        }
        // Yellow Taxiway Edge Lines
        rwCtx.fillStyle = '#f59e0b';
        rwCtx.fillRect(32, 0, 6, 512);
        rwCtx.fillRect(474, 0, 6, 512);

        const runwayTex = new THREE.CanvasTexture(runwayCanvas);
        runwayTex.wrapS = THREE.RepeatWrapping;
        runwayTex.wrapT = THREE.RepeatWrapping;
        runwayTex.repeat.set(20, 20);

        // Passenger Jetliner Metal Hull Texture
        const jetCanvas = document.createElement('canvas');
        jetCanvas.width = 512;
        jetCanvas.height = 512;
        const jCtx = jetCanvas.getContext('2d');
        jCtx.fillStyle = '#f8fafc';
        jCtx.fillRect(0, 0, 512, 512);
        jCtx.fillStyle = '#0284c7';
        jCtx.fillRect(0, 180, 512, 42);
        for (let x = 20; x < 500; x += 36) {
            jCtx.fillStyle = '#0f172a';
            jCtx.fillRect(x, 140, 16, 22);
        }
        const jetTex = new THREE.CanvasTexture(jetCanvas);

        const floorGeo = new THREE.PlaneGeometry(this.mapSize, this.mapSize);
        const floorMat = new THREE.MeshStandardMaterial({
            map: runwayTex,
            bumpMap: runwayTex,
            bumpScale: 0.05,
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

        const tarmacWallMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.85 });
        const jetMat = new THREE.MeshStandardMaterial({ map: jetTex, roughness: 0.35, metalness: 0.75 });
        const glassMat = new THREE.MeshStandardMaterial({ color: 0x7dd3fc, roughness: 0.15, metalness: 0.85, transparent: true, opacity: 0.85 });
        const whiteTankMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.45, metalness: 0.65 });

        const half = this.mapSize / 2;
        const wallH = 14.0;

        // Perimeter
        this.addBlock(0, 0, -half, this.mapSize, wallH, 3, tarmacWallMat, false, true);
        this.addBlock(0, 0, half, this.mapSize, wallH, 3, tarmacWallMat, false, true);
        this.addBlock(-half, 0, 0, 3, wallH, this.mapSize, tarmacWallMat, false, true);
        this.addBlock(half, 0, 0, 3, wallH, this.mapSize, tarmacWallMat, false, true);

        // Commercial Passenger Jetliner (Bombsite A: x: 38, z: 0)
        this.addBlock(38, 1.2, 0, 7.5, 6.5, 60, jetMat);
        this.addBlock(38, 3.2, 0, 48, 0.8, 14, jetMat);
        this.addBlock(24, 1.4, 0, 3.8, 3.8, 7.5, tarmacWallMat);
        this.addBlock(52, 1.4, 0, 3.8, 3.8, 7.5, tarmacWallMat);
        this.addBlock(31, 0, -8, 5.0, 1.6, 5.0, tarmacWallMat);
        this.addBlock(31, 1.6, -8, 5.0, 1.6, 3.5, tarmacWallMat);

        // Terminal Concourse Building (West side: x: -62, z: -70 to 70)
        this.addBlock(-62, 0, 0, 24, 16.0, 140, tarmacWallMat);
        this.addBlock(-48, 0, 0, 4, 14.0, 120, glassMat);
        this.addBlock(-42, 4.5, -28, 12, 3.8, 4.5, tarmacWallMat);
        this.addBlock(-42, 4.5, 28, 12, 3.8, 4.5, tarmacWallMat);

        // Air Traffic Control (ATC) Tower (Bombsite B: x: -50, z: 42)
        this.addBlock(-50, 0, 42, 9.0, 24.0, 9.0, tarmacWallMat);
        this.addBlock(-50, 24.0, 42, 14.0, 4.5, 14.0, glassMat);
        this.addBlock(-36, 0, 42, 8.5, 7.5, 8.5, whiteTankMat);
        this.addBlock(-36, 0, 54, 8.5, 7.5, 8.5, whiteTankMat);
        this.addConcreteBarrier(-36, 32, 0);
        this.addBarrelProp(-36, 62, 0xef4444, true);
        this.addBarrelProp(-37.2, 62, 0xef4444, true);

        // Luggage Cargo Carts & Barriers
        this.addContainerProp(18, -25, 6.2, 2.6, 2.6, 0, 0x1e3a8a, 'BAGS-AER');
        this.addContainerProp(18, 25, 6.2, 2.6, 2.6, 0, 0x991b1b, 'AIR-CARGO');
        this.addConcreteBarrier(0, 55, 0);
        this.addConcreteBarrier(0, -55, 0);

        // Runway Guidance Light Towers
        this.addStreetLamp(12, 65, 6.5);
        this.addStreetLamp(-12, 65, 6.5);
        this.addStreetLamp(12, -65, 6.5);
        this.addStreetLamp(-12, -65, 6.5);
    }

    // =========================================================================
    // MAP 11: CS_MANSION_MEGA (Luxury Estate & Giant Hedge Maze 175m)
    // =========================================================================
    buildMansionMega() {
        this.buildSky('#1e1b4b', '#4338ca', '#f59e0b', 700, 160, 'rgba(254, 243, 199, 1.0)');
        this.updateAtmosphericLighting(0x818cf8, 0x1e1b4b, 0xfef08a, 0xfef9c3, 1.45);

        this.spawns = {
            T: [
                { x: 0, z: 75, yaw: 0 },
                { x: -10, z: 76, yaw: 0 },
                { x: 10, z: 76, yaw: 0 },
                { x: -22, z: 72, yaw: 0 },
                { x: 22, z: 72, yaw: 0 }
            ],
            CT: [
                { x: 0, z: -75, yaw: Math.PI },
                { x: -10, z: -76, yaw: Math.PI },
                { x: 10, z: -76, yaw: Math.PI },
                { x: -22, z: -72, yaw: Math.PI },
                { x: 22, z: -72, yaw: Math.PI }
            ]
        };

        this.bombsites = {
            A: { x: 14, z: -25, radius: 8.0, label: 'A' },
            B: { x: -20, z: -35, radius: 7.5, label: 'B' }
        };

        this.waypoints = [
            // South Front Gates & Roundabout (T Spawn)
            { x: 0, z: 72 }, { x: -28, z: 68 }, { x: 28, z: 68 }, { x: 0, z: 48 },
            // Hedge Maze Pathways (West)
            { x: -45, z: 42 }, { x: -45, z: 22 }, { x: -32, z: 22 }, { x: -55, z: 12 }, { x: -38, z: 4 },
            // Swimming Pool & Cabana (East)
            { x: 45, z: 42 }, { x: 45, z: 22 }, { x: 32, z: 22 }, { x: 55, z: 12 },
            // Central Driveway & Fountain
            { x: 0, z: 24 }, { x: 0, z: 0 }, { x: -16, z: 0 }, { x: 16, z: 0 },
            // Mansion Front Portico & Grand Balcony
            { x: 0, z: -14 }, { x: -14, z: -14 }, { x: 14, z: -14 },
            // Bombsite A: Master Suite & 2-Story Atrium
            { x: 14, z: -25 }, { x: 24, z: -25 }, { x: 14, z: -38 },
            // Bombsite B: Wine Cellar & Secure Vault
            { x: -20, z: -35 }, { x: -20, z: -22 }, { x: -34, z: -30 },
            // North Gardens & Helipad (CT Spawn)
            { x: 0, z: -52 }, { x: -28, z: -58 }, { x: 28, z: -58 },
            { x: 0, z: -72 }, { x: -22, z: -70 }, { x: 22, z: -70 }
        ];

        // Estate Marble Terrace & Lawn Texture
        const lawnCanvas = document.createElement('canvas');
        lawnCanvas.width = 512;
        lawnCanvas.height = 512;
        const lCtx = lawnCanvas.getContext('2d');
        lCtx.fillStyle = '#14532d';
        lCtx.fillRect(0, 0, 512, 512);
        for (let i = 0; i < 24000; i++) {
            lCtx.fillStyle = i % 2 === 0 ? 'rgba(5, 46, 22, 0.4)' : 'rgba(34, 197, 94, 0.2)';
            lCtx.fillRect(Math.random() * 512, Math.random() * 512, 1.5, 1.5);
        }
        const lawnTex = new THREE.CanvasTexture(lawnCanvas);
        lawnTex.wrapS = THREE.RepeatWrapping;
        lawnTex.wrapT = THREE.RepeatWrapping;
        lawnTex.repeat.set(22, 22);

        // Italian Marble Mansion Facade Texture
        const marbleCanvas = document.createElement('canvas');
        marbleCanvas.width = 512;
        marbleCanvas.height = 512;
        const mCtx = marbleCanvas.getContext('2d');
        mCtx.fillStyle = '#f8fafc';
        mCtx.fillRect(0, 0, 512, 512);
        for (let y = 0; y < 512; y += 64) {
            mCtx.strokeStyle = 'rgba(148, 163, 184, 0.45)';
            mCtx.lineWidth = 3;
            mCtx.strokeRect(0, y, 512, 64);
        }
        const marbleTex = new THREE.CanvasTexture(marbleCanvas);

        // Dense Green Hedge Texture
        const hedgeCanvas = document.createElement('canvas');
        hedgeCanvas.width = 256;
        hedgeCanvas.height = 256;
        const hCtx = hedgeCanvas.getContext('2d');
        hCtx.fillStyle = '#166534';
        hCtx.fillRect(0, 0, 256, 256);
        for (let i = 0; i < 8000; i++) {
            hCtx.fillStyle = i % 2 === 0 ? '#14532d' : '#15803d';
            hCtx.fillRect(Math.random() * 256, Math.random() * 256, 3, 3);
        }
        const hedgeTex = new THREE.CanvasTexture(hedgeCanvas);

        const floorGeo = new THREE.PlaneGeometry(this.mapSize, this.mapSize);
        const floorMat = new THREE.MeshStandardMaterial({
            map: lawnTex,
            bumpMap: lawnTex,
            bumpScale: 0.06,
            roughness: 0.95
        });
        const floor = new THREE.Mesh(floorGeo, floorMat);
        floor.rotation.x = -Math.PI / 2;
        floor.receiveShadow = true;
        this.scene.add(floor);
        this.mapObjects.push(floor);
        this.shootableMeshes.push(floor);

        this.createBombsiteZone(this.bombsites.A.x, this.bombsites.A.z, 'A');
        this.createBombsiteZone(this.bombsites.B.x, this.bombsites.B.z, 'B');

        const marbleMat = new THREE.MeshStandardMaterial({ map: marbleTex, roughness: 0.45 });
        const hedgeMat = new THREE.MeshStandardMaterial({ map: hedgeTex, roughness: 0.92 });
        const roofMat = new THREE.MeshStandardMaterial({ color: 0x7f1d1d, roughness: 0.65 });
        const waterMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.15, metalness: 0.85 });

        const half = this.mapSize / 2;
        const wallH = 11.0;

        // Perimeter Brick & Wrought Walls
        this.addBlock(0, 0, -half, this.mapSize, wallH, 3, marbleMat, false, true);
        this.addBlock(0, 0, half, this.mapSize, wallH, 3, marbleMat, false, true);
        this.addBlock(-half, 0, 0, 3, wallH, this.mapSize, marbleMat, false, true);
        this.addBlock(half, 0, 0, 3, wallH, this.mapSize, marbleMat, false, true);

        // Grand 2-Story Mansion (x: 0, z: -25, width 54m, height 14m, depth 36m)
        this.addBlock(0, 0, -25, 54, 13.0, 36, marbleMat);
        this.addBlock(0, 13.0, -25, 56, 3.5, 38, roofMat);

        // Grand Front Balcony & Colonnade Portico
        this.addBlock(0, 4.8, -6, 22, 0.6, 6, marbleMat);
        this.addBlock(0, 5.4, -3.2, 22, 1.1, 0.4, marbleMat);
        this.addBlock(-9, 0, -4, 1.8, 4.8, 1.8, marbleMat);
        this.addBlock(-3, 0, -4, 1.8, 4.8, 1.8, marbleMat);
        this.addBlock(3, 0, -4, 1.8, 4.8, 1.8, marbleMat);
        this.addBlock(9, 0, -4, 1.8, 4.8, 1.8, marbleMat);

        // Outdoor Hedge Maze (West Side: x: -45, z: 25, 42m x 42m)
        const hzH = 3.4;
        this.addBlock(-45, 0, 4, 38, hzH, 2.2, hedgeMat);
        this.addBlock(-45, 0, 46, 38, hzH, 2.2, hedgeMat);
        this.addBlock(-64, 0, 25, 2.2, hzH, 42, hedgeMat);
        this.addBlock(-26, 0, 25, 2.2, hzH, 42, hedgeMat);
        this.addBlock(-45, 0, 18, 24, hzH, 2.2, hedgeMat);
        this.addBlock(-45, 0, 32, 24, hzH, 2.2, hedgeMat);
        this.addBlock(-36, 0, 25, 2.2, hzH, 16, hedgeMat);
        this.addBlock(-54, 0, 25, 2.2, hzH, 16, hedgeMat);

        // Luxury Swimming Pool & Patio (East Side: x: 45, z: 25)
        this.addBlock(45, 0, 25, 28, 0.2, 36, marbleMat);
        this.addBlock(45, 0.1, 25, 18, 0.15, 26, waterMat);
        this.addBlock(45, 0, 44, 20, 3.5, 6, marbleMat);

        // Central Courtyard Fountain (x: 0, z: 25)
        this.addBlock(0, 0, 25, 6.0, 1.4, 6.0, marbleMat);

        // Street Lamps & Garden Lighting
        this.addStreetLamp(-14, 12);
        this.addStreetLamp(14, 12);
        this.addStreetLamp(-14, 45);
        this.addStreetLamp(14, 45);
        this.addConcreteBarrier(-14, 55, 0);
        this.addConcreteBarrier(14, 55, 0);
    }

    // =========================================================================
    // MAP 8: DE_MIRAGE (Moroccan Palace & Ancient Bazaar 105m)
    // =========================================================================
    buildMirage() {
        this.buildSky('#1d4ed8', '#60a5fa', '#fed7aa', 700, 140, 'rgba(255, 247, 237, 1.0)');
        this.updateAtmosphericLighting(0x93c5fd, 0x78553d, 0xfde68a, 0xfffbeb, 1.42);

        this.spawns = {
            T: [
                { x: 0, z: 42, yaw: 0 },
                { x: -6, z: 43, yaw: 0 },
                { x: 6, z: 43, yaw: 0 },
                { x: -14, z: 40, yaw: 0 },
                { x: 14, z: 40, yaw: 0 }
            ],
            CT: [
                { x: 0, z: -42, yaw: Math.PI },
                { x: -6, z: -43, yaw: Math.PI },
                { x: 6, z: -43, yaw: Math.PI },
                { x: -14, z: -40, yaw: Math.PI },
                { x: 14, z: -40, yaw: Math.PI }
            ]
        };

        this.bombsites = {
            A: { x: 28, z: -24, radius: 6.5, label: 'A' },
            B: { x: -28, z: -24, radius: 6.5, label: 'B' }
        };

        this.waypoints = [
            { x: 0, z: 40 }, { x: 18, z: 36 }, { x: -18, z: 36 },
            // A Palace Approach
            { x: 28, z: 24 }, { x: 34, z: 8 }, { x: 32, z: -12 }, { x: 28, z: -24 },
            // Mid Courtyard & Catwalk
            { x: 0, z: 22 }, { x: 0, z: 0 }, { x: -14, z: 2 }, { x: 0, z: -20 }, { x: 12, z: -22 },
            // B Apartments & Market
            { x: -24, z: 24 }, { x: -32, z: 6 }, { x: -28, z: -10 }, { x: -28, z: -24 }, { x: -16, z: -32 },
            // CT Base
            { x: 0, z: -40 }, { x: 16, z: -38 }, { x: -16, z: -38 }
        ];

        // Moroccan Paver Ground
        const groundCanvas = document.createElement('canvas');
        groundCanvas.width = 512;
        groundCanvas.height = 512;
        const gCtx = groundCanvas.getContext('2d');
        gCtx.fillStyle = '#b49f82';
        gCtx.fillRect(0, 0, 512, 512);
        for (let y = 0; y < 512; y += 48) {
            for (let x = 0; x < 512; x += 48) {
                gCtx.fillStyle = (x + y) % 96 === 0 ? '#c7b499' : '#a89477';
                gCtx.fillRect(x + 1, y + 1, 46, 46);
                gCtx.strokeStyle = 'rgba(74, 55, 36, 0.4)';
                gCtx.lineWidth = 2;
                gCtx.strokeRect(x, y, 48, 48);
            }
        }
        const mirageGroundTex = new THREE.CanvasTexture(groundCanvas);
        mirageGroundTex.wrapS = THREE.RepeatWrapping;
        mirageGroundTex.wrapT = THREE.RepeatWrapping;
        mirageGroundTex.repeat.set(14, 14);

        // Moroccan Sandstone Adobe Wall
        const wallCanvas = document.createElement('canvas');
        wallCanvas.width = 512;
        wallCanvas.height = 512;
        const wCtx = wallCanvas.getContext('2d');
        wCtx.fillStyle = '#c4a682';
        wCtx.fillRect(0, 0, 512, 512);
        for (let y = 0; y < 512; y += 64) {
            wCtx.fillStyle = 'rgba(92, 64, 40, 0.4)';
            wCtx.fillRect(0, y, 512, 3);
            for (let x = (y % 128 === 0 ? 0 : 64); x < 512; x += 128) {
                wCtx.fillRect(x, y, 3, 64);
            }
        }
        const mirageWallTex = new THREE.CanvasTexture(wallCanvas);

        // Wooden Market Crate Texture
        const crateCanvas = document.createElement('canvas');
        crateCanvas.width = 256;
        crateCanvas.height = 256;
        const cCtx = crateCanvas.getContext('2d');
        cCtx.fillStyle = '#855829';
        cCtx.fillRect(0, 0, 256, 256);
        cCtx.strokeStyle = '#4a2f10';
        cCtx.lineWidth = 16;
        cCtx.strokeRect(8, 8, 240, 240);
        cCtx.fillStyle = 'rgba(254, 243, 199, 0.85)';
        cCtx.font = 'bold 22px monospace';
        cCtx.textAlign = 'center';
        cCtx.fillText('MAROC // BAZAAR', 128, 134);
        const mirageCrateTex = new THREE.CanvasTexture(crateCanvas);

        const floorGeo = new THREE.PlaneGeometry(this.mapSize, this.mapSize);
        const floorMat = new THREE.MeshStandardMaterial({
            map: mirageGroundTex,
            bumpMap: mirageGroundTex,
            bumpScale: 0.05,
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

        const wallMat = new THREE.MeshStandardMaterial({ map: mirageWallTex, roughness: 0.88 });
        const crateMat = new THREE.MeshStandardMaterial({ map: mirageCrateTex, roughness: 0.75 });

        const half = this.mapSize / 2;
        const wallH = 8.5;

        // Perimeter
        this.addBlock(0, 0, -half, this.mapSize, wallH, 2, wallMat, false, true);
        this.addBlock(0, 0, half, this.mapSize, wallH, 2, wallMat, false, true);
        this.addBlock(-half, 0, 0, 2, wallH, this.mapSize, wallMat, false, true);
        this.addBlock(half, 0, 0, 2, wallH, this.mapSize, wallMat, false, true);

        // A Site: Palace Structure (Elevated Balcony)
        this.addBlock(36, 0, -12, 14, 9, 24, wallMat);
        this.addBlock(28, 2.8, -12, 6, 0.5, 12, wallMat); // Palace Balcony Floor
        this.addBlock(28, 3.3, -18, 6, 1.0, 0.4, wallMat); // Balcony Rail
        this.addBlock(28, 0, -24, 3.5, 3.2, 3.5, crateMat, true); // Triple Box Stack
        this.addBlock(28, 3.2, -24, 2.2, 2.0, 2.2, crateMat, true);
        this.addBlock(22, 0, -32, 4.5, 3.5, 4.5, wallMat); // CT Ticket Booth

        // Mid Courtyard: Sniper Window & Catwalk
        this.addBlock(6, 0, -18, 12, 7.5, 4, wallMat); // Mid Window Wall
        this.addBlock(0, 0, 0, 4, 1.6, 2, crateMat, true); // Mid Cart
        this.addBlock(-12, 0, 4, 16, 2.8, 3.5, wallMat); // Catwalk Short B
        this.addBlock(-12, 2.8, 4, 16, 0.5, 3.5, wallMat);

        // B Site: Apartments & Market
        this.addBlock(-36, 0, 8, 14, 8, 24, wallMat); // B Apps Building
        this.addBlock(-26, 0, -24, 3.5, 2.8, 3.5, crateMat, true);
        this.addBlock(-18, 0, -28, 10, 6.5, 3, wallMat); // Market Wall
        this.addConcreteBarrier(-28, -16, 0);
        this.addBarrelProp(-32, -22, 0x1e3a8a);
        this.addBarrelProp(-33.2, -22, 0x1e3a8a);
    }

    // =========================================================================
    // MAP 9: CS_OFFICE (High-Tech Corporate Office & Winter Snow 115m)
    // =========================================================================
    buildOffice() {
        this.buildSky('#334155', '#64748b', '#e2e8f0', 600, 150, 'rgba(255, 255, 255, 0.95)');
        this.updateAtmosphericLighting(0xcbd5e1, 0x475569, 0xf8fafc, 0xffffff, 1.35);

        this.spawns = {
            T: [
                { x: 0, z: 46, yaw: 0 },
                { x: -6, z: 47, yaw: 0 },
                { x: 6, z: 47, yaw: 0 },
                { x: -14, z: 44, yaw: 0 },
                { x: 14, z: 44, yaw: 0 }
            ],
            CT: [
                { x: 0, z: -46, yaw: Math.PI },
                { x: -6, z: -47, yaw: Math.PI },
                { x: 6, z: -47, yaw: Math.PI },
                { x: -14, z: -44, yaw: Math.PI },
                { x: 14, z: -44, yaw: Math.PI }
            ]
        };

        this.bombsites = {
            A: { x: 26, z: 8, radius: 6.5, label: 'A' },
            B: { x: -26, z: 12, radius: 6.5, label: 'B' }
        };

        this.waypoints = [
            // Front Snowy Courtyard (CT Base)
            { x: 0, z: -44 }, { x: -18, z: -42 }, { x: 18, z: -42 }, { x: 0, z: -32 },
            // Office Lobby & Entrance
            { x: 0, z: -20 }, { x: -16, z: -18 }, { x: 16, z: -18 },
            // Central Office Hallway
            { x: 0, z: -4 }, { x: 0, z: 10 },
            // Bombsite A: Server Room
            { x: 18, z: 0 }, { x: 26, z: 8 }, { x: 32, z: 16 },
            // Bombsite B: Executive Conference Room
            { x: -18, z: 2 }, { x: -26, z: 12 }, { x: -32, z: 20 },
            // Back Warehouse & Garage (T Base)
            { x: 0, z: 28 }, { x: -16, z: 36 }, { x: 16, z: 36 }, { x: 0, z: 44 }
        ];

        // Fresh Winter Snow Texture
        const snowCanvas = document.createElement('canvas');
        snowCanvas.width = 512;
        snowCanvas.height = 512;
        const snCtx = snowCanvas.getContext('2d');
        snCtx.fillStyle = '#f1f5f9';
        snCtx.fillRect(0, 0, 512, 512);
        for (let i = 0; i < 22000; i++) {
            snCtx.fillStyle = i % 2 === 0 ? 'rgba(203, 213, 225, 0.35)' : 'rgba(255, 255, 255, 0.8)';
            snCtx.fillRect(Math.random() * 512, Math.random() * 512, 1.5, 1.5);
        }
        const snowTex = new THREE.CanvasTexture(snowCanvas);
        snowTex.wrapS = THREE.RepeatWrapping;
        snowTex.wrapT = THREE.RepeatWrapping;
        snowTex.repeat.set(16, 16);

        // Dark Granite Corporate Wall Texture
        const graniteCanvas = document.createElement('canvas');
        graniteCanvas.width = 512;
        graniteCanvas.height = 512;
        const grCtx = graniteCanvas.getContext('2d');
        grCtx.fillStyle = '#1e293b';
        grCtx.fillRect(0, 0, 512, 512);
        grCtx.strokeStyle = '#0f172a';
        grCtx.lineWidth = 4;
        grCtx.strokeRect(6, 6, 500, 500);
        for (let y = 0; y < 512; y += 128) {
            grCtx.strokeRect(0, y, 512, 2);
        }
        const graniteTex = new THREE.CanvasTexture(graniteCanvas);

        // Server Rack Blinking LED Texture (Bombsite A)
        const serverCanvas = document.createElement('canvas');
        serverCanvas.width = 256;
        serverCanvas.height = 256;
        const svCtx = serverCanvas.getContext('2d');
        svCtx.fillStyle = '#0f172a';
        svCtx.fillRect(0, 0, 256, 256);
        for (let y = 12; y < 240; y += 22) {
            svCtx.fillStyle = '#1e293b';
            svCtx.fillRect(12, y, 232, 16);
            for (let x = 20; x < 230; x += 18) {
                svCtx.fillStyle = Math.random() > 0.4 ? '#22c55e' : (Math.random() > 0.5 ? '#38bdf8' : '#ef4444');
                svCtx.fillRect(x, y + 4, 6, 6);
            }
        }
        const serverTex = new THREE.CanvasTexture(serverCanvas);

        const floorGeo = new THREE.PlaneGeometry(this.mapSize, this.mapSize);
        const floorMat = new THREE.MeshStandardMaterial({
            map: snowTex,
            bumpMap: snowTex,
            bumpScale: 0.08,
            roughness: 0.95
        });
        const floor = new THREE.Mesh(floorGeo, floorMat);
        floor.rotation.x = -Math.PI / 2;
        floor.receiveShadow = true;
        this.scene.add(floor);
        this.mapObjects.push(floor);
        this.shootableMeshes.push(floor);

        this.createBombsiteZone(this.bombsites.A.x, this.bombsites.A.z, 'A');
        this.createBombsiteZone(this.bombsites.B.x, this.bombsites.B.z, 'B');

        const wallMat = new THREE.MeshStandardMaterial({ map: graniteTex, roughness: 0.65 });
        const serverMat = new THREE.MeshStandardMaterial({ map: serverTex, roughness: 0.45, metalness: 0.65 });
        const glassMat = new THREE.MeshStandardMaterial({ color: 0x93c5fd, roughness: 0.15, metalness: 0.85, transparent: true, opacity: 0.85 });

        const half = this.mapSize / 2;
        const wallH = 8.0;

        // Perimeter Boundaries
        this.addBlock(0, 0, -half, this.mapSize, wallH, 2, wallMat, false, true);
        this.addBlock(0, 0, half, this.mapSize, wallH, 2, wallMat, false, true);
        this.addBlock(-half, 0, 0, 2, wallH, this.mapSize, wallMat, false, true);
        this.addBlock(half, 0, 0, 2, wallH, this.mapSize, wallMat, false, true);

        // Main Corporate Office Building (z: -24 to 28, x: -38 to 38)
        this.addBlock(-26, 0, -24, 24, 7.5, 2, wallMat); // Front Left Wall
        this.addBlock(26, 0, -24, 24, 7.5, 2, wallMat);  // Front Right Wall
        this.addBlock(0, 0, -24, 12, 7.5, 1.5, glassMat); // Front Glass Entrance Doors

        // Reception Desk & Lobby (z: -18)
        this.addBlock(0, 0, -16, 7.5, 1.2, 2.4, wallMat, true); // Reception Counter

        // Central Dividing Wall with Doorways
        this.addBlock(-16, 0, 2, 22, 7.5, 2, wallMat);
        this.addBlock(16, 0, 2, 22, 7.5, 2, wallMat);

        // Bombsite A: Server Room Complex
        this.addBlock(38, 0, 8, 2, 7.5, 24, wallMat);
        this.addBlock(26, 0, 4, 3.8, 3.2, 1.6, serverMat, true);
        this.addBlock(26, 0, 8, 3.8, 3.2, 1.6, serverMat, true);
        this.addBlock(26, 0, 12, 3.8, 3.2, 1.6, serverMat, true);
        this.addBlock(32, 0, 8, 3.8, 3.2, 1.6, serverMat, true);

        // Bombsite B: Executive Conference Room
        this.addBlock(-38, 0, 12, 2, 7.5, 24, wallMat);
        this.addBlock(-26, 0, 12, 9.0, 1.0, 3.4, wallMat, true); // Long Boardroom Conference Table
        this.addBlock(-26, 0, 18, 5.0, 2.2, 1.2, wallMat, true); // Projector Display Console

        // Back Garage & Warehouse Wall (z: 28)
        this.addBlock(-20, 0, 28, 28, 7.5, 2, wallMat);
        this.addBlock(20, 0, 28, 28, 7.5, 2, wallMat);
        this.addConcreteBarrier(0, 32, 0);

        // Front Snowy Courtyard Pine Trees & Props
        this.addPineTree(-18, -36);
        this.addPineTree(18, -36);
        this.addPineTree(-32, -42);
        this.addPineTree(32, -42);
        this.addConcreteBarrier(-10, -32, 0);
        this.addConcreteBarrier(10, -32, 0);
    }

    // =========================================================================
    // MAP 10: DE_VERTIGO (Skyscraper 50th Floor Rooftop & Tower Crane 110m)
    // =========================================================================
    buildVertigo() {
        this.buildSky('#0369a1', '#38bdf8', '#f8fafc', 680, 130, 'rgba(255, 255, 240, 1.0)');
        this.updateAtmosphericLighting(0x7dd3fc, 0x334155, 0xffffff, 0xffedd5, 1.50);

        this.spawns = {
            T: [
                { x: 0, z: 40, yaw: 0 },
                { x: -6, z: 41, yaw: 0 },
                { x: 6, z: 41, yaw: 0 },
                { x: -14, z: 38, yaw: 0 },
                { x: 14, z: 38, yaw: 0 }
            ],
            CT: [
                { x: 0, z: -40, yaw: Math.PI },
                { x: -6, z: -41, yaw: Math.PI },
                { x: 6, z: -41, yaw: Math.PI },
                { x: -14, z: -38, yaw: Math.PI },
                { x: 14, z: -38, yaw: Math.PI }
            ]
        };

        this.bombsites = {
            A: { x: 26, z: -18, radius: 6.5, label: 'A' },
            B: { x: -26, z: 16, radius: 6.5, label: 'B' }
        };

        this.waypoints = [
            { x: 0, z: 38 }, { x: -16, z: 36 }, { x: 16, z: 36 },
            // A Site Ramp & Crane
            { x: 20, z: 20 }, { x: 26, z: 4 }, { x: 26, z: -18 }, { x: 34, z: -26 },
            // Mid Elevator Core & Scaffolding
            { x: 0, z: 20 }, { x: 0, z: 0 }, { x: 0, z: -20 }, { x: -12, z: 0 }, { x: 12, z: 0 },
            // B Site HVAC & Electrical Plant
            { x: -20, z: 24 }, { x: -26, z: 16 }, { x: -34, z: 4 }, { x: -26, z: -8 },
            // CT Base
            { x: 0, z: -38 }, { x: -16, z: -36 }, { x: 16, z: -36 }
        ];

        // Construction Poured Concrete Slab Floor
        const concCanvas = document.createElement('canvas');
        concCanvas.width = 512;
        concCanvas.height = 512;
        const cCtx = concCanvas.getContext('2d');
        cCtx.fillStyle = '#64748b';
        cCtx.fillRect(0, 0, 512, 512);
        for (let y = 0; y < 512; y += 64) {
            for (let x = 0; x < 512; x += 64) {
                cCtx.fillStyle = (x + y) % 128 === 0 ? '#475569' : '#64748b';
                cCtx.fillRect(x + 1, y + 1, 62, 62);
                cCtx.strokeStyle = '#334155';
                cCtx.lineWidth = 2;
                cCtx.strokeRect(x, y, 64, 64);
            }
        }
        // Safety yellow & black hazard perimeter border
        for (let x = 0; x < 512; x += 32) {
            cCtx.fillStyle = (x / 32 % 2 === 0) ? '#f59e0b' : '#0f172a';
            cCtx.fillRect(x, 0, 32, 14);
            cCtx.fillRect(x, 498, 32, 14);
        }
        const vertigoFloorTex = new THREE.CanvasTexture(concCanvas);
        vertigoFloorTex.wrapS = THREE.RepeatWrapping;
        vertigoFloorTex.wrapT = THREE.RepeatWrapping;
        vertigoFloorTex.repeat.set(12, 12);

        // Red Construction Steel Girder Texture
        const steelCanvas = document.createElement('canvas');
        steelCanvas.width = 256;
        steelCanvas.height = 256;
        const stCtx = steelCanvas.getContext('2d');
        stCtx.fillStyle = '#991b1b';
        stCtx.fillRect(0, 0, 256, 256);
        stCtx.strokeStyle = '#450a0a';
        stCtx.lineWidth = 12;
        stCtx.strokeRect(6, 6, 244, 244);
        const steelTex = new THREE.CanvasTexture(steelCanvas);

        const floorGeo = new THREE.PlaneGeometry(this.mapSize, this.mapSize);
        const floorMat = new THREE.MeshStandardMaterial({
            map: vertigoFloorTex,
            bumpMap: vertigoFloorTex,
            bumpScale: 0.06,
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

        const steelMat = new THREE.MeshStandardMaterial({ map: steelTex, metalness: 0.8, roughness: 0.4 });
        const concWallMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.88 });
        const yellowCraneMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.75, roughness: 0.35 });

        const half = this.mapSize / 2;
        const wallH = 5.5;

        // Perimeter Safety Railings & Concrete Walls
        this.addBlock(0, 0, -half, this.mapSize, wallH, 1.8, concWallMat, false, true);
        this.addBlock(0, 0, half, this.mapSize, wallH, 1.8, concWallMat, false, true);
        this.addBlock(-half, 0, 0, 1.8, wallH, this.mapSize, concWallMat, false, true);
        this.addBlock(half, 0, 0, 1.8, wallH, this.mapSize, concWallMat, false, true);

        // Giant Yellow Skyscraper Construction Tower Crane (Site A)
        // Crane Vertical Mast Tower (18m high)
        const mast = new THREE.Mesh(new THREE.BoxGeometry(2.4, 18, 2.4), yellowCraneMat);
        mast.position.set(24, 9, -16);
        mast.castShadow = true;
        this.scene.add(mast);
        this.mapObjects.push(mast);
        this.shootableMeshes.push(mast);
        this.colliders.push({ minX: 22.8, maxX: 25.2, minY: 0, maxY: 18, minZ: -17.2, maxZ: -14.8, isCrate: true });

        // Crane Horizontal Boom Jib (26m long)
        const jib = new THREE.Mesh(new THREE.BoxGeometry(26, 1.8, 1.8), yellowCraneMat);
        jib.position.set(24, 18.5, -16);
        this.scene.add(jib);
        this.mapObjects.push(jib);

        // Central Elevator Shaft Core (x: 0, z: 0)
        this.addBlock(0, 0, 0, 16, 9.0, 14, concWallMat);
        // Elevated Walkway Ramp alongside elevator shaft
        this.addBlock(10, 0, 0, 4, 1.4, 14, steelMat);
        this.addBlock(10, 1.4, 0, 4, 1.4, 10, steelMat);

        // Bombsite A: Construction Barricades & Pallet Forms
        this.addConcreteBarrier(22, -18, 0);
        this.addConcreteBarrier(30, -18, 0);
        this.addBlock(26, 0, -22, 3.4, 2.2, 3.4, steelMat, true);
        this.addBarrelProp(28, -14, 0xd97706, true);
        this.addBarrelProp(29.2, -14, 0xd97706, true);

        // Bombsite B: Heavy Industrial HVAC Chiller Units & Conduits
        this.addBlock(-26, 0, 16, 6.5, 3.2, 3.8, concWallMat, true); // HVAC Chiller 1
        this.addBlock(-26, 0, 22, 6.5, 3.2, 3.8, concWallMat, true); // HVAC Chiller 2
        this.addConcreteBarrier(-26, 10, Math.PI / 2);
        this.addContainerProp(-34, 14, 6.2, 2.6, 2.6, Math.PI / 2, 0x1e3a8a, 'HVAC-GEN4');
    }

    // =========================================================================
    // NEW MAP 1 (185m): 🌴 DE_JUNGLE_BUNKER (New) — Dense Jungle & Secret Bunkers
    // =========================================================================
    buildJungleBunker() {
        this.buildSky('#133325', '#2d6a4f', '#95d5b2', 710, 150, 'rgba(254, 249, 195, 1.0)');
        this.updateAtmosphericLighting(0x74c69d, 0x1f2e18, 0xd8f3dc, 0xfef3c7, 1.38);
        this.setupLargeMapSpawns(92.5, 58, -12, -58, 12);

        this.waypoints = [
            { x: 0, z: 76 }, { x: -28, z: 72 }, { x: 28, z: 72 },
            { x: -42, z: 52 }, { x: 42, z: 52 }, { x: 0, z: 48 },
            { x: -58, z: 12 }, { x: -26, z: -16 }, { x: 0, z: 10 }, { x: 0, z: -10 }, { x: 26, z: 16 }, { x: 58, z: -12 },
            { x: -64, z: -36 }, { x: 64, z: 36 },
            { x: -42, z: -52 }, { x: 42, z: -52 }, { x: 0, z: -48 },
            { x: 0, z: -76 }, { x: -28, z: -72 }, { x: 28, z: -72 }
        ];

        this.buildCanvasFloor('#283b1e', (ctx) => {
            for (let i = 0; i < 900; i++) {
                ctx.fillStyle = (i % 3 === 0) ? '#1f2e17' : (i % 2 === 0 ? '#364d26' : '#4a3d28');
                ctx.fillRect(Math.random() * 512, Math.random() * 512, 8 + Math.random() * 14, 8 + Math.random() * 14);
            }
            ctx.fillStyle = 'rgba(74, 58, 36, 0.45)';
            ctx.fillRect(210, 0, 92, 512);
        }, 22, 0.12, 0.94);

        const mossBunkerMat = this.makeTexMat('#3f4a3c', (ctx) => {
            for (let y = 0; y < 512; y += 32) {
                ctx.fillStyle = y % 64 === 0 ? '#313b2e' : '#475442';
                ctx.fillRect(0, y, 512, 30);
                ctx.fillStyle = 'rgba(34, 84, 48, 0.35)';
                ctx.fillRect((y * 5) % 440, y, 70, 26);
            }
        }, 1, { roughness: 0.92 });
        const roofMat = this.makeTexMat('#273026', null, 1, { roughness: 0.94 });
        const milCrateMat = this.makeTexMat('#3d4b2c', (ctx) => {
            ctx.strokeStyle = '#1d2415'; ctx.lineWidth = 18; ctx.strokeRect(10, 10, 492, 492);
            ctx.beginPath(); ctx.moveTo(14, 14); ctx.lineTo(498, 498); ctx.stroke();
        }, 1, { roughness: 0.85 });
        const foliageMat = this.makeTexMat('#1d4428', (ctx) => {
            for (let i = 0; i < 400; i++) {
                ctx.fillStyle = i % 2 === 0 ? '#14331d' : '#285936';
                ctx.beginPath(); ctx.arc(Math.random() * 512, Math.random() * 512, 14, 0, Math.PI * 2); ctx.fill();
            }
        }, 1, { roughness: 0.95 });

        this.buildPerimeterWalls(14, 3.5, mossBunkerMat);

        // 6 Enterable Multi-Doorway Jungle Bunkers + Interior Cover Crates
        this.buildHideoutRoom(-42, 52, 16, 15, 5.2, mossBunkerMat, roofMat, milCrateMat, ['N', 'S', 'E']);
        this.buildHideoutRoom(42, 52, 16, 15, 5.2, mossBunkerMat, roofMat, milCrateMat, ['N', 'S', 'W']);
        this.buildHideoutRoom(-42, -52, 16, 15, 5.2, mossBunkerMat, roofMat, milCrateMat, ['N', 'S', 'E']);
        this.buildHideoutRoom(42, -52, 16, 15, 5.2, mossBunkerMat, roofMat, milCrateMat, ['N', 'S', 'W']);
        this.buildHideoutRoom(-26, -16, 14, 13, 5.0, mossBunkerMat, roofMat, milCrateMat, ['N', 'S', 'E', 'W']);
        this.buildHideoutRoom(26, 16, 14, 13, 5.0, mossBunkerMat, roofMat, milCrateMat, ['N', 'S', 'E', 'W']);

        // Central Ancient Jungle Shrine Pillbox (4 open walk-through corners + stealth center pillar)
        this.addBlock(0, 0, 0, 4.4, 7.5, 4.4, mossBunkerMat);
        this.buildTrenchZigZag(0, 32, 4, 7.5, true, mossBunkerMat);
        this.buildTrenchZigZag(0, -32, 4, 7.5, true, mossBunkerMat);

        // Abundant Jungle Hiding Clusters & Bombsite Flanking Nooks
        const clusters = [
            [-42, -2, 0], [-74, 24, 1], [-44, 28, 2],
            [42, 2, 0], [74, -24, 1], [44, -28, 2],
            [-64, -20, 1], [64, 20, 1], [-18, 22, 2], [18, -22, 2],
            [-74, -64, 0], [74, 64, 0], [-74, 64, 2], [74, -64, 2]
        ];
        clusters.forEach(([cx, cz, v], idx) => {
            this.buildHideCluster(cx, cz, mossBunkerMat, milCrateMat, idx % 2 === 0 ? 0x2d4a22 : 0x3b4238, `JNG-${idx + 1}`, v);
        });

        // Dense Camouflage Pine/Jungle Trees & Shrubs for Corner Hiding
        const treeCoords = [
            [-28, 34], [28, 34], [-28, -34], [28, -34],
            [-54, 40], [54, -40], [-78, 42], [78, -42],
            [-14, 58], [14, 58], [-14, -58], [14, -58],
            [-72, -10], [72, 10], [-42, 74], [42, 74], [-42, -74], [42, -74],
            [-14, -12], [14, 12], [-56, -70], [56, 70]
        ];
        for (const [tx, tz] of treeCoords) {
            this.addPineTree(tx, tz, 6.2, false);
            this.addBlock(tx + 1.8, 0, tz + 1.6, 2.0, 1.35, 2.0, foliageMat, true);
        }
    }

    // =========================================================================
    // NEW MAP 2 (180m): 🏘️ CS_SUBURB_MAZE (New) — Suburban House Maze & Alleys
    // =========================================================================
    buildSuburbMaze() {
        this.buildSky('#1e3a5f', '#64748b', '#fde68a', 760, 155, 'rgba(255, 240, 195, 1.0)');
        this.updateAtmosphericLighting(0x93c5fd, 0x475569, 0xfef3c7, 0xffe4b5, 1.40);
        this.setupLargeMapSpawns(90, 56, -12, -56, 12);

        this.waypoints = [
            { x: 0, z: 74 }, { x: -28, z: 70 }, { x: 28, z: 70 },
            { x: -42, z: 50 }, { x: 42, z: 50 }, { x: 0, z: 46 },
            { x: -56, z: 12 }, { x: -26, z: -16 }, { x: 0, z: 10 }, { x: 0, z: -10 }, { x: 26, z: 16 }, { x: 56, z: -12 },
            { x: -62, z: -36 }, { x: 62, z: 36 },
            { x: -42, z: -50 }, { x: 42, z: -50 }, { x: 0, z: -46 },
            { x: 0, z: -74 }, { x: -28, z: -70 }, { x: 28, z: -70 }
        ];

        this.buildCanvasFloor('#334155', (ctx) => {
            ctx.fillStyle = '#2d4a26';
            for (let y = 0; y < 512; y += 128) {
                for (let x = 0; x < 512; x += 128) {
                    if ((x + y) % 256 === 0) ctx.fillRect(x + 8, y + 8, 112, 112);
                }
            }
            ctx.strokeStyle = 'rgba(251, 191, 36, 0.32)'; ctx.lineWidth = 4;
            ctx.setLineDash([18, 14]); ctx.strokeRect(4, 250, 504, 12);
        }, 18, 0.06, 0.90);

        const brickHouseMat = this.makeTexMat('#7c3a2d', (ctx) => {
            ctx.strokeStyle = '#d6c7b8'; ctx.lineWidth = 3;
            for (let y = 0; y < 512; y += 24) {
                ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(512, y); ctx.stroke();
            }
        }, 1, { roughness: 0.90 });
        const stuccoMat = this.makeTexMat('#cbbba0', (ctx) => {
            ctx.fillStyle = 'rgba(0,0,0,0.06)';
            for (let y = 0; y < 512; y += 32) ctx.fillRect(0, y, 512, 4);
        }, 1, { roughness: 0.88 });
        const shingleRoofMat = this.makeTexMat('#27272a', null, 1, { roughness: 0.85 });
        const woodFenceMat = this.makeTexMat('#6b4226', (ctx) => {
            ctx.strokeStyle = '#3e2412'; ctx.lineWidth = 4;
            for (let x = 0; x < 512; x += 32) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 512); ctx.stroke(); }
        }, 1, { roughness: 0.86 });

        this.buildPerimeterWalls(12, 3.2, brickHouseMat);

        // 8 Enterable Suburban Houses & Garages with Interior Furniture Cover
        this.buildHideoutRoom(-42, 50, 16, 15, 5.4, brickHouseMat, shingleRoofMat, woodFenceMat, ['N', 'S', 'E', 'W']);
        this.buildHideoutRoom(42, 50, 16, 15, 5.4, stuccoMat, shingleRoofMat, woodFenceMat, ['N', 'S', 'E', 'W']);
        this.buildHideoutRoom(-42, -50, 16, 15, 5.4, stuccoMat, shingleRoofMat, woodFenceMat, ['N', 'S', 'E', 'W']);
        this.buildHideoutRoom(42, -50, 16, 15, 5.4, brickHouseMat, shingleRoofMat, woodFenceMat, ['N', 'S', 'E', 'W']);
        this.buildHideoutRoom(-26, -16, 13, 13, 5.0, brickHouseMat, shingleRoofMat, woodFenceMat, ['N', 'S', 'E', 'W']);
        this.buildHideoutRoom(26, 16, 13, 13, 5.0, stuccoMat, shingleRoofMat, woodFenceMat, ['N', 'S', 'E', 'W']);
        this.buildHideoutRoom(-62, -36, 13, 12, 5.0, brickHouseMat, shingleRoofMat, woodFenceMat, ['N', 'S', 'E']);
        this.buildHideoutRoom(62, 36, 13, 12, 5.0, stuccoMat, shingleRoofMat, woodFenceMat, ['N', 'S', 'W']);

        // Central Gazebo Fountain Block + Parked Street Delivery Trucks & Fence Mazes
        this.addBlock(0, 0, 0, 5.2, 2.2, 5.2, stuccoMat, true);
        this.addBlock(0, 2.2, 0, 2.4, 3.6, 2.4, brickHouseMat);
        this.buildTrenchZigZag(0, 32, 4, 7.2, true, woodFenceMat);
        this.buildTrenchZigZag(0, -32, 4, 7.2, true, woodFenceMat);

        // Box Trucks & Backyard Stealth Hiding Pockets
        const spots = [
            [-72, 26, 1], [-40, 26, 0], [-72, -4, 2], [-42, -4, 0],
            [72, -26, 1], [40, -26, 0], [72, 4, 2], [42, 4, 0],
            [-14, 14, 2], [14, -14, 2], [-72, -62, 0], [72, 62, 0], [-72, 62, 2], [72, -62, 2]
        ];
        spots.forEach(([sx, sz, v], i) => {
            this.buildHideCluster(sx, sz, woodFenceMat, woodFenceMat, i % 2 === 0 ? 0x1e40af : 0xb45309, `SUB-${i + 1}`, v);
        });
    }

    // =========================================================================
    // NEW MAP 3 (190m): 🛢️ DE_OIL_RIG (New) — Offshore Mega Oil Platform
    // =========================================================================
    buildOilRig() {
        this.buildSky('#0c1e35', '#1d4e89', '#f59e0b', 700, 175, 'rgba(255, 225, 165, 1.0)');
        this.updateAtmosphericLighting(0x60a5fa, 0x0f172a, 0xffedd5, 0xfde68a, 1.45);
        this.setupLargeMapSpawns(95, 58, -12, -58, 12);

        this.waypoints = [
            { x: 0, z: 80 }, { x: -28, z: 74 }, { x: 28, z: 74 },
            { x: -42, z: 54 }, { x: 42, z: 54 }, { x: 0, z: 50 },
            { x: -58, z: 12 }, { x: -26, z: -16 }, { x: 0, z: 0 }, { x: 26, z: 16 }, { x: 58, z: -12 },
            { x: -64, z: -36 }, { x: 64, z: 36 },
            { x: -42, z: -54 }, { x: 42, z: -54 }, { x: 0, z: -50 },
            { x: 0, z: -80 }, { x: -28, z: -74 }, { x: 28, z: -74 }
        ];

        this.buildCanvasFloor('#1e293b', (ctx) => {
            ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 4;
            for (let i = 0; i < 512; i += 64) {
                ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 512); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(512, i); ctx.stroke();
            }
            ctx.fillStyle = '#eab308';
            for (let x = 0; x < 512; x += 64) ctx.fillRect(x, 0, 32, 10);
        }, 24, 0.06, 0.65);

        const steelDeckWall = this.makeTexMat('#334155', (ctx) => {
            ctx.strokeStyle = '#1e293b'; ctx.lineWidth = 10; ctx.strokeRect(6, 6, 500, 500);
            ctx.fillStyle = 'rgba(245, 158, 11, 0.28)'; ctx.fillRect(0, 440, 512, 36);
        }, 1, { roughness: 0.45, metalness: 0.72 });
        const hazardPipeMat = this.makeTexMat('#991b1b', (ctx) => {
            ctx.fillStyle = '#f59e0b'; ctx.fillRect(0, 220, 512, 42);
        }, 1, { roughness: 0.42, metalness: 0.68 });
        const roofSteelMat = this.makeTexMat('#1e293b', null, 1, { roughness: 0.5, metalness: 0.75 });
        const crateSteelMat = this.makeTexMat('#475569', (ctx) => {
            ctx.strokeStyle = '#eab308'; ctx.lineWidth = 14; ctx.strokeRect(10, 10, 492, 492);
        }, 1, { roughness: 0.52, metalness: 0.62 });

        this.buildPerimeterWalls(14, 3.6, steelDeckWall);

        // Central Walk-Through Derrick Tower Frame (4 corner pillars around x:0, z:0)
        for (const [px, pz] of [[-5, -5], [5, -5], [-5, 5], [5, 5]]) {
            this.addBlock(px, 0, pz, 2.2, 18, 2.2, hazardPipeMat);
        }
        this.addBlock(0, 14, 0, 13, 1.4, 13, steelDeckWall);

        // 6 Enterable Offshore Control & Pump Rooms
        this.buildHideoutRoom(-42, 54, 16, 15, 5.2, steelDeckWall, roofSteelMat, crateSteelMat, ['N', 'S', 'E']);
        this.buildHideoutRoom(42, 54, 16, 15, 5.2, steelDeckWall, roofSteelMat, crateSteelMat, ['N', 'S', 'W']);
        this.buildHideoutRoom(-42, -54, 16, 15, 5.2, steelDeckWall, roofSteelMat, crateSteelMat, ['N', 'S', 'E']);
        this.buildHideoutRoom(42, -54, 16, 15, 5.2, steelDeckWall, roofSteelMat, crateSteelMat, ['N', 'S', 'W']);
        this.buildHideoutRoom(-26, -16, 13, 13, 5.0, steelDeckWall, roofSteelMat, crateSteelMat, ['N', 'S', 'E', 'W']);
        this.buildHideoutRoom(26, 16, 13, 13, 5.0, steelDeckWall, roofSteelMat, crateSteelMat, ['N', 'S', 'E', 'W']);

        // Giant Crude Oil Storage Silos & Pipe Ambush Corridors
        for (const [ox, oz] of [[-64, -36], [64, 36], [-64, 62], [64, -62]]) {
            this.addBlock(ox - 4.2, 0, oz, 4.4, 8.5, 4.4, hazardPipeMat);
            this.addBlock(ox + 4.2, 0, oz, 4.4, 8.5, 4.4, crateSteelMat);
            this.addBarrelProp(ox, oz + 4.2, 0xd97706, true);
            this.addBarrelProp(ox, oz - 4.2, 0xd97706, true);
        }
        this.buildTrenchZigZag(0, 34, 4, 7.4, true, crateSteelMat);
        this.buildTrenchZigZag(0, -34, 4, 7.4, true, crateSteelMat);

        // Dense Container Maze & Pipe Clusters
        const rigClusters = [
            [-42, -2, 0, 0xb91c1c], [-74, 24, 1, 0x0f766e], [-44, 28, 2, 0xd97706],
            [42, 2, 0, 0x1d4ed8], [74, -24, 1, 0xb91c1c], [44, -28, 2, 0x0f766e],
            [-16, 22, 0, 0xd97706], [16, -22, 1, 0x1d4ed8],
            [-76, -64, 1, 0x15803d], [76, 64, 0, 0xb91c1c]
        ];
        rigClusters.forEach(([cx, cz, v, col], idx) => {
            this.buildHideCluster(cx, cz, steelDeckWall, crateSteelMat, col, `RIG-${idx + 1}`, v);
        });
    }

    // =========================================================================
    // NEW MAP 4 (175m): 🧪 DE_UNDERGROUND_LAB (New) — Underground Bio-Lab Maze
    // =========================================================================
    buildUndergroundLab() {
        this.buildSky('#020617', '#0f172a', '#1e293b', 640, 120, 'rgba(147, 197, 253, 0.7)');
        this.updateAtmosphericLighting(0x93c5fd, 0x0f172a, 0xdbeafe, 0xe0f2fe, 1.35);
        this.setupLargeMapSpawns(87.5, 55, -12, -55, 12);

        this.waypoints = [
            { x: 0, z: 72 }, { x: -26, z: 68 }, { x: 26, z: 68 },
            { x: -40, z: 48 }, { x: 40, z: 48 }, { x: 0, z: 44 },
            { x: -55, z: 12 }, { x: -25, z: -15 }, { x: 0, z: 8 }, { x: 0, z: -8 }, { x: 25, z: 15 }, { x: 55, z: -12 },
            { x: -62, z: -34 }, { x: 62, z: 34 },
            { x: -40, z: -48 }, { x: 40, z: -48 }, { x: 0, z: -44 },
            { x: 0, z: -72 }, { x: -26, z: -68 }, { x: 26, z: -68 }
        ];

        this.buildCanvasFloor('#1e293b', (ctx) => {
            ctx.fillStyle = '#0f172a';
            for (let y = 0; y < 512; y += 64) {
                for (let x = 0; x < 512; x += 64) {
                    ctx.strokeStyle = '#334155'; ctx.lineWidth = 3; ctx.strokeRect(x, y, 64, 64);
                    if ((x + y) % 128 === 0) ctx.fillRect(x + 4, y + 4, 56, 56);
                }
            }
            ctx.fillStyle = 'rgba(56, 189, 248, 0.22)'; ctx.fillRect(0, 246, 512, 10);
        }, 22, 0.04, 0.55);

        const labWallMat = this.makeTexMat('#cbd5e1', (ctx) => {
            ctx.fillStyle = '#0ea5e9'; ctx.fillRect(0, 380, 512, 28);
            ctx.strokeStyle = '#64748b'; ctx.lineWidth = 8; ctx.strokeRect(8, 8, 496, 496);
        }, 1, { roughness: 0.45, metalness: 0.25 });
        const serverRackMat = this.makeTexMat('#0f172a', (ctx) => {
            for (let y = 24; y < 480; y += 36) {
                ctx.fillStyle = '#1e293b'; ctx.fillRect(28, y, 456, 22);
                ctx.fillStyle = (y % 72 === 0) ? '#22c55e' : '#38bdf8';
                ctx.fillRect(46, y + 6, 14, 8); ctx.fillRect(72, y + 6, 14, 8);
            }
        }, 1, { roughness: 0.35, metalness: 0.75 });
        const ceilingMat = this.makeTexMat('#1e293b', null, 1, { roughness: 0.6, metalness: 0.5 });
        const bioTankMat = new THREE.MeshStandardMaterial({ color: 0x06b6d4, emissive: 0x0891b2, emissiveIntensity: 0.45, roughness: 0.2, metalness: 0.3 });

        this.buildPerimeterWalls(14, 3.5, labWallMat);

        // 8 Walk-in Research Chambers, Airlocks & Server Vaults
        this.buildHideoutRoom(-40, 48, 15, 14, 5.2, labWallMat, ceilingMat, serverRackMat, ['N', 'S', 'E', 'W']);
        this.buildHideoutRoom(40, 48, 15, 14, 5.2, labWallMat, ceilingMat, serverRackMat, ['N', 'S', 'E', 'W']);
        this.buildHideoutRoom(-40, -48, 15, 14, 5.2, labWallMat, ceilingMat, serverRackMat, ['N', 'S', 'E', 'W']);
        this.buildHideoutRoom(40, -48, 15, 14, 5.2, labWallMat, ceilingMat, serverRackMat, ['N', 'S', 'E', 'W']);
        this.buildHideoutRoom(-25, -15, 13, 13, 5.0, labWallMat, ceilingMat, serverRackMat, ['N', 'S', 'E', 'W']);
        this.buildHideoutRoom(25, 15, 13, 13, 5.0, labWallMat, ceilingMat, serverRackMat, ['N', 'S', 'E', 'W']);
        this.buildHideoutRoom(-62, -34, 13, 12, 5.0, labWallMat, ceilingMat, serverRackMat, ['N', 'S', 'E']);
        this.buildHideoutRoom(62, 34, 13, 12, 5.0, labWallMat, ceilingMat, serverRackMat, ['N', 'S', 'W']);

        // Central Reactor Cryo-Core & Glowing Bio-Containment Pillars (Hiding Angles Everywhere!)
        this.addBlock(0, 0, 0, 3.8, 7.0, 3.8, bioTankMat);
        for (const [bx, bz] of [[-12, 0], [12, 0], [0, -14], [0, 14], [-40, 14], [40, -14]]) {
            this.addBlock(bx, 0, bz, 2.2, 4.2, 2.2, bioTankMat, true);
        }

        this.buildTrenchZigZag(0, 32, 4, 7.0, true, serverRackMat);
        this.buildTrenchZigZag(0, -32, 4, 7.0, true, serverRackMat);

        // Tight Server Rack Hide Corridors & Steel Locker Nooks
        const labClusters = [
            [-70, 24, 2], [-42, 26, 2], [-70, -4, 0],
            [70, -24, 2], [42, -26, 2], [70, 4, 0],
            [-16, 22, 1], [16, -22, 1], [-70, -60, 2], [70, 60, 2]
        ];
        labClusters.forEach(([cx, cz, v], idx) => {
            this.buildHideCluster(cx, cz, labWallMat, serverRackMat, 0x0284c7, `LAB-${idx + 1}`, v);
        });
    }

    // =========================================================================
    // NEW MAP 5 (200m): 🏔️ DE_RUIN_CANYON (New) — Giant Red Rock Canyon & Ruins
    // =========================================================================
    buildRuinCanyon() {
        this.buildSky('#431407', '#c2410c', '#fed7aa', 740, 160, 'rgba(255, 220, 175, 1.0)');
        this.updateAtmosphericLighting(0xfdba74, 0x431407, 0xffedd5, 0xfed7aa, 1.45);
        this.setupLargeMapSpawns(100, 62, -12, -62, 12);

        this.waypoints = [
            { x: 0, z: 84 }, { x: -30, z: 78 }, { x: 30, z: 78 },
            { x: -44, z: 56 }, { x: 44, z: 56 }, { x: 0, z: 50 },
            { x: -62, z: 12 }, { x: -28, z: -18 }, { x: 0, z: 0 }, { x: 28, z: 18 }, { x: 62, z: -12 },
            { x: -68, z: -38 }, { x: 68, z: 38 },
            { x: -44, z: -56 }, { x: 44, z: -56 }, { x: 0, z: -50 },
            { x: 0, z: -84 }, { x: -30, z: -78 }, { x: 30, z: -78 }
        ];

        this.buildCanvasFloor('#7c3f26', (ctx) => {
            for (let i = 0; i < 850; i++) {
                ctx.fillStyle = (i % 3 === 0) ? '#5e2c18' : (i % 2 === 0 ? '#934e32' : '#a86744');
                ctx.fillRect(Math.random() * 512, Math.random() * 512, 12 + Math.random() * 20, 6 + Math.random() * 14);
            }
        }, 24, 0.14, 0.94);

        const cliffMat = this.makeTexMat('#6c311b', (ctx) => {
            for (let y = 0; y < 512; y += 28) {
                ctx.fillStyle = y % 56 === 0 ? '#542412' : '#854026';
                ctx.fillRect(0, y, 512, 24);
            }
        }, 1, { roughness: 0.95 });
        const ruinStoneMat = this.makeTexMat('#9c8669', (ctx) => {
            ctx.strokeStyle = '#5c4b37'; ctx.lineWidth = 4;
            for (let y = 0; y < 512; y += 64) {
                ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(512, y); ctx.stroke();
            }
        }, 1, { roughness: 0.92 });
        const supplyMat = this.makeTexMat('#784c24', (ctx) => {
            ctx.strokeStyle = '#3e240e'; ctx.lineWidth = 18; ctx.strokeRect(10, 10, 492, 492);
            ctx.beginPath(); ctx.moveTo(14, 14); ctx.lineTo(498, 498); ctx.stroke();
        }, 1, { roughness: 0.85 });

        this.buildPerimeterWalls(18, 4.5, cliffMat);

        // Towering Canyon Rock Cliff Ridges Forming Blind Canyon Passes & Hiding Corners
        for (const [rx, rz, rw, rd, rh] of [
            [-14, 34, 6, 16, 12], [14, -34, 6, 16, 12],
            [-78, 0, 12, 14, 14], [78, 0, 12, 14, 14],
            [-36, 10, 8, 12, 10], [36, -10, 8, 12, 10]
        ]) {
            this.addBlock(rx, 0, rz, rw, rh, rd, cliffMat, false, true);
        }

        // 7 Ancient Stone Ruin Chambers for Deep Indoor Ambush
        this.buildHideoutRoom(-44, 56, 16, 15, 5.4, ruinStoneMat, cliffMat, supplyMat, ['N', 'S', 'E', 'W']);
        this.buildHideoutRoom(44, 56, 16, 15, 5.4, ruinStoneMat, cliffMat, supplyMat, ['N', 'S', 'E', 'W']);
        this.buildHideoutRoom(-44, -56, 16, 15, 5.4, ruinStoneMat, cliffMat, supplyMat, ['N', 'S', 'E', 'W']);
        this.buildHideoutRoom(44, -56, 16, 15, 5.4, ruinStoneMat, cliffMat, supplyMat, ['N', 'S', 'E', 'W']);
        this.buildHideoutRoom(-28, -18, 14, 13, 5.2, ruinStoneMat, cliffMat, supplyMat, ['N', 'S', 'E', 'W']);
        this.buildHideoutRoom(28, 18, 14, 13, 5.2, ruinStoneMat, cliffMat, supplyMat, ['N', 'S', 'E', 'W']);
        this.buildHideoutRoom(0, 0, 14, 14, 5.6, ruinStoneMat, cliffMat, supplyMat, ['N', 'S', 'E', 'W']);

        // Long Sunken Canyon Defensive Trenches & Stealth Boulder Pockets
        this.buildTrenchZigZag(0, 32, 4, 7.8, true, ruinStoneMat);
        this.buildTrenchZigZag(0, -32, 4, 7.8, true, ruinStoneMat);
        this.buildTrenchZigZag(-62, -22, 3, 7.5, true, ruinStoneMat);
        this.buildTrenchZigZag(62, 22, 3, 7.5, true, ruinStoneMat);

        const canyonClusters = [
            [-48, 28, 2], [-78, 28, 1], [-46, -2, 0],
            [48, -28, 2], [78, -28, 1], [46, 2, 0],
            [-78, -22, 1], [78, 22, 1], [-80, -68, 0], [80, 68, 0],
            [-80, 68, 2], [80, -68, 2]
        ];
        canyonClusters.forEach(([cx, cz, v], idx) => {
            this.buildHideCluster(cx, cz, cliffMat, supplyMat, idx % 2 === 0 ? 0x92400e : 0x4d7c0f, `CYN-${idx + 1}`, v);
        });
    }

    // =========================================================================
    // BANGKOK, THAILAND (220m): 🇹🇭 DE_BANGKOK_THAILAND — Realistic Urban Street
    // =========================================================================
    addGroundStrip(x, y, z, w, d, mat, rotY = 0) {
        const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, d), mat);
        mesh.rotation.order = 'YXZ';
        mesh.rotation.x = -Math.PI / 2;
        mesh.rotation.y = rotY;
        mesh.position.set(x, y, z);
        mesh.receiveShadow = true;
        this.scene.add(mesh);
        this.mapObjects.push(mesh);
        return mesh;
    }

    addOrientedPart(cx, y, cz, rotY, lx, ly, lz, w, h, d, mat, opts = {}) {
        const cos = Math.cos(rotY);
        const sin = Math.sin(rotY);
        const wx = cx + lx * cos + lz * sin;
        const wz = cz - lx * sin + lz * cos;

        const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
        mesh.rotation.order = 'YXZ';
        mesh.position.set(wx, y + ly + h / 2, wz);
        mesh.rotation.y = rotY;
        if (opts.rotX) mesh.rotation.x = opts.rotX;
        if (opts.rotZ) mesh.rotation.z = opts.rotZ;
        mesh.castShadow = opts.castShadow !== false;
        mesh.receiveShadow = opts.receiveShadow !== false;
        this.scene.add(mesh);
        this.mapObjects.push(mesh);

        if (opts.shootable !== false) {
            this.shootableMeshes.push(mesh);
        }
        if (opts.collider !== false) {
            const effW = Math.abs(w * cos) + Math.abs(d * sin);
            const effD = Math.abs(w * sin) + Math.abs(d * cos);
            this.colliders.push({
                minX: wx - effW / 2,
                maxX: wx + effW / 2,
                minY: y + ly,
                maxY: y + ly + h,
                minZ: wz - effD / 2,
                maxZ: wz + effD / 2,
                isCrate: opts.isCrate !== false,
                noRadar: !!opts.noRadar
            });
        }
        return mesh;
    }

    addWheel(cx, y, cz, rotY, lx, lz, radius, width, tireMat, rimMat) {
        const cos = Math.cos(rotY);
        const sin = Math.sin(rotY);
        const wx = cx + lx * cos + lz * sin;
        const wz = cz - lx * sin + lz * cos;

        const tire = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, width, 14), tireMat);
        tire.rotation.order = 'YXZ';
        tire.rotation.z = Math.PI / 2;
        tire.rotation.y = rotY;
        tire.position.set(wx, y + radius, wz);
        tire.castShadow = true;
        this.scene.add(tire);
        this.mapObjects.push(tire);

        if (rimMat) {
            const rim = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.56, radius * 0.56, width + 0.03, 10), rimMat);
            rim.rotation.order = 'YXZ';
            rim.rotation.z = Math.PI / 2;
            rim.rotation.y = rotY;
            rim.position.set(wx, y + radius, wz);
            this.scene.add(rim);
            this.mapObjects.push(rim);
        }
        return tire;
    }

    makeCarSideMat(bodyHex, accentHex = null, label = '') {
        const c = document.createElement('canvas');
        c.width = 512; c.height = 128;
        const ctx = c.getContext('2d');
        const grad = ctx.createLinearGradient(0, 0, 0, 128);
        grad.addColorStop(0, bodyHex);
        grad.addColorStop(0.75, bodyHex);
        grad.addColorStop(1, '#111827');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 512, 128);

        if (accentHex) {
            ctx.fillStyle = accentHex;
            ctx.fillRect(0, 56, 512, 18);
        }
        // Subtle lower rocker trim + vertical door panel seams + chrome handles
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 110, 512, 18);
        ctx.strokeStyle = 'rgba(0,0,0,0.48)';
        ctx.lineWidth = 3;
        for (const dx of [135, 265, 385]) {
            ctx.beginPath(); ctx.moveTo(dx, 10); ctx.lineTo(dx, 110); ctx.stroke();
        }
        ctx.fillStyle = '#e2e8f0';
        ctx.fillRect(218, 36, 26, 7);
        ctx.fillRect(342, 36, 26, 7);
        if (label) {
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 20px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(label, 256, 92);
        }
        const tex = new THREE.CanvasTexture(c);
        return new THREE.MeshStandardMaterial({ map: tex, roughness: 0.24, metalness: 0.52 });
    }

    makeBusSideMat(lowerHex, upperHex, windowBorderHex, routeLabel) {
        const c = document.createElement('canvas');
        c.width = 512; c.height = 256;
        const ctx = c.getContext('2d');
        ctx.fillStyle = lowerHex;
        ctx.fillRect(0, 128, 512, 128);
        ctx.fillStyle = upperHex;
        ctx.fillRect(0, 0, 512, 128);
        // Window frame band + realistic multi-pane sliding glass windows
        ctx.fillStyle = windowBorderHex;
        ctx.fillRect(0, 38, 512, 92);
        for (let wx = 18; wx < 488; wx += 58) {
            ctx.fillStyle = '#0c1524';
            ctx.fillRect(wx, 46, 48, 76);
            ctx.fillStyle = 'rgba(148, 197, 255, 0.18)';
            ctx.fillRect(wx + 4, 50, 18, 68);
        }
        // Folding passenger doors & wheel cutouts
        ctx.strokeStyle = 'rgba(0,0,0,0.55)';
        ctx.lineWidth = 4;
        ctx.strokeRect(18, 44, 46, 206);
        ctx.strokeRect(272, 44, 46, 206);
        ctx.fillStyle = '#111827';
        ctx.fillRect(78, 206, 68, 50);
        ctx.fillRect(346, 206, 96, 50);

        ctx.fillStyle = '#fef08a';
        ctx.font = 'bold 18px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(routeLabel, 210, 168);
        const tex = new THREE.CanvasTexture(c);
        return new THREE.MeshStandardMaterial({ map: tex, roughness: 0.42, metalness: 0.35 });
    }

    createBangkokVehiclePalette() {
        const paint = (color, roughness = 0.22, metalness = 0.56) =>
            new THREE.MeshStandardMaterial({ color, roughness, metalness });
        const trim = (color, roughness = 0.78, metalness = 0.15) =>
            new THREE.MeshStandardMaterial({ color, roughness, metalness });

        const cargoTex = this.makeTexMat('#e2e8f0', (ctx) => {
            for (let x = 0; x < 512; x += 20) {
                ctx.fillStyle = 'rgba(15, 23, 42, 0.16)';
                ctx.fillRect(x, 0, 7, 512);
            }
            ctx.fillStyle = '#1e3a8a';
            ctx.fillRect(0, 180, 512, 114);
            ctx.fillStyle = '#facc15';
            ctx.font = 'bold 34px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('THAILAND LOGISTICS', 256, 234);
            ctx.font = 'bold 22px sans-serif';
            ctx.fillStyle = '#ffffff';
            ctx.fillText('กรุงเทพมหานคร • EXPRESS', 256, 272);
        }, 1, { roughness: 0.52, metalness: 0.3 });

        const grilleTex = this.makeTexMat('#111827', (ctx) => {
            ctx.fillStyle = '#94a3b8';
            for (let y = 64; y < 448; y += 64) ctx.fillRect(24, y, 464, 18);
            ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 14; ctx.strokeRect(12, 12, 488, 488);
        }, 1, { roughness: 0.35, metalness: 0.8 });

        const mkAwning = (c1, c2) => this.makeTexMat(c1, (ctx) => {
            ctx.fillStyle = c2;
            for (let x = 0; x < 512; x += 64) ctx.fillRect(x, 0, 32, 512);
        }, 1, { roughness: 0.88 });

        const plateMat = this.makeSignMaterial('กท 8492', '#f8fafc', '#0f172a', '#64748b');

        return {
            tire: trim(0x11141a, 0.92, 0.04),
            rim: paint(0xd1d5db, 0.25, 0.88),
            bumper: trim(0x181b22, 0.72, 0.18),
            glass: paint(0x0b1322, 0.08, 0.88),
            steel: paint(0xcbd5e1, 0.30, 0.82),
            bedliner: trim(0x14161c, 0.88, 0.12),
            grille: grilleTex,
            plate: plateMat,
            headlight: new THREE.MeshBasicMaterial({ color: 0xfffbeb }),
            taillight: new THREE.MeshBasicMaterial({ color: 0xdc2626 }),
            taxiSign: new THREE.MeshBasicMaterial({ color: 0xfef08a }),
            vacantLed: new THREE.MeshBasicMaterial({ color: 0xef4444 }),
            busSign: new THREE.MeshBasicMaterial({ color: 0xfb923c }),
            green: paint(0x15803d),
            yellow: paint(0xeab308),
            pink: paint(0xdb2777),
            blue: paint(0x1d4ed8),
            navy: paint(0x1e293b),
            cream: paint(0xf5e9c9, 0.45, 0.25),
            busRed: paint(0x991b1b, 0.38, 0.35),
            busOrange: paint(0xd9480f, 0.35, 0.38),
            white: paint(0xf1f5f9),
            silver: paint(0x94a3b8, 0.20, 0.72),
            charcoal: paint(0x27303f),
            taxiGreenSide: this.makeCarSideMat('#15803d', '#eab308', 'TAXI-METER • กทม'),
            taxiPinkSide: this.makeCarSideMat('#db2777', '#fdf2f8', 'TAXI-METER • กทม'),
            sedanSide: this.makeCarSideMat('#64748b', null, ''),
            vanSide: this.makeBusSideMat('#f8fafc', '#f8fafc', '#1e3a8a', 'รถตู้ กทม • สุขุมวิท'),
            busRedSide: this.makeBusSideMat('#f5e9c9', '#991b1b', '#1e293b', 'ขสมก. สาย 2 • สนามหลวง'),
            busOrangeSide: this.makeBusSideMat('#d9480f', '#f5e9c9', '#1e293b', 'ปอ. 511 • สายใต้ใหม่'),
            truckCargo: cargoTex,
            awningRed: mkAwning('#b91c1c', '#f8fafc'),
            awningBlue: mkAwning('#0369a1', '#f8fafc'),
            awningGreen: mkAwning('#15803d', '#fef08a')
        };
    }

    addThaiVehicle(type, x, z, rotY, pal, customBodyMat = null) {
        const part = (lx, ly, lz, w, h, d, mat, opts) =>
            this.addOrientedPart(x, 0, z, rotY, lx, ly, lz, w, h, d, mat, opts);
        const wheel = (lx, lz, r = 0.33, w = 0.22) =>
            this.addWheel(x, 0, z, rotY, lx, lz, r, w, pal.tire, pal.rim);

        if (type === 'taxi_green' || type === 'taxi_pink' || type === 'sedan') {
            const isGreenTaxi = type === 'taxi_green';
            const bodyMat = customBodyMat || (isGreenTaxi ? pal.green : (type === 'taxi_pink' ? pal.pink : pal.silver));
            const roofMat = isGreenTaxi ? pal.yellow : bodyMat;
            const sideMat = isGreenTaxi ? pal.taxiGreenSide : (type === 'taxi_pink' ? pal.taxiPinkSide : pal.sedanSide);
            const hullMats = [sideMat, sideMat, bodyMat, bodyMat, bodyMat, bodyMat];

            // Lower sculpted chassis + black/chrome bumpers + grille + Thai license plate
            part(0, 0.24, 0, 1.92, 0.48, 4.55, hullMats);
            part(0, 0.18, -2.28, 1.90, 0.18, 0.16, pal.bumper, { collider: false, shootable: false });
            part(0, 0.18, 2.28, 1.90, 0.18, 0.16, pal.bumper, { collider: false, shootable: false });
            part(0, 0.44, -2.28, 0.84, 0.24, 0.06, pal.grille, { collider: false, shootable: false });
            part(0, 0.30, 2.29, 0.44, 0.16, 0.04, pal.plate, { collider: false, shootable: false });

            // Sloped hood & rear trunk deck
            part(0, 0.70, -1.62, 1.84, 0.10, 1.24, isGreenTaxi ? pal.yellow : bodyMat, { rotX: 0.07, collider: false, shootable: false });
            part(0, 0.72, 1.72, 1.82, 0.10, 0.96, bodyMat, { collider: false, shootable: false });

            // Cabin core + sloped front & rear glass windshields + side mirrors
            part(0, 0.72, 0.08, 1.68, 0.58, 1.95, pal.glass);
            part(0, 0.76, -0.96, 1.62, 0.64, 0.12, pal.glass, { rotX: -0.58, collider: false, shootable: false });
            part(0, 0.76, 1.12, 1.62, 0.64, 0.12, pal.glass, { rotX: 0.56, collider: false, shootable: false });
            part(0, 1.30, 0.08, 1.66, 0.12, 1.92, roofMat, { collider: false });
            part(-0.98, 0.84, -0.78, 0.18, 0.12, 0.16, bodyMat, { collider: false, shootable: false });
            part(0.98, 0.84, -0.78, 0.18, 0.12, 0.16, bodyMat, { collider: false, shootable: false });

            if (type !== 'sedan') {
                part(0, 1.42, -0.15, 0.62, 0.18, 0.24, pal.taxiSign, { collider: false, shootable: false });
                part(-0.42, 0.88, -0.95, 0.24, 0.10, 0.06, pal.vacantLed, { collider: false, shootable: false });
            }
            part(-0.70, 0.50, -2.29, 0.34, 0.16, 0.06, pal.headlight, { collider: false, shootable: false });
            part(0.70, 0.50, -2.29, 0.34, 0.16, 0.06, pal.headlight, { collider: false, shootable: false });
            part(-0.70, 0.52, 2.29, 0.38, 0.15, 0.06, pal.taillight, { collider: false, shootable: false });
            part(0.70, 0.52, 2.29, 0.38, 0.15, 0.06, pal.taillight, { collider: false, shootable: false });
            wheel(-0.88, -1.40); wheel(0.88, -1.40); wheel(-0.88, 1.40); wheel(0.88, 1.40);
            return;
        }

        if (type === 'tuktuk') {
            const bodyMat = customBodyMat || pal.blue;
            part(0, 0.22, -0.82, 1.12, 0.84, 0.94, bodyMat);
            part(0, 0.88, -0.86, 1.06, 0.42, 0.10, pal.glass, { rotX: -0.28, collider: false, shootable: false });
            part(0, 0.56, -1.28, 0.46, 0.14, 0.40, pal.yellow, { collider: false, shootable: false });
            part(0, 0.22, 0.48, 1.52, 0.72, 1.55, bodyMat);
            part(0, 0.92, 0.62, 1.34, 0.34, 0.92, pal.busRed, { collider: false });
            // Two-tone Thai Tuk-Tuk roof canopy
            part(0, 1.68, 0.05, 1.56, 0.16, 2.35, pal.navy, { noRadar: true });
            part(0, 1.84, 0.05, 1.48, 0.08, 2.22, pal.yellow, { collider: false, shootable: false });
            for (const [px, pz] of [[-0.68, -0.92], [0.68, -0.92], [-0.68, 1.12], [0.68, 1.12]]) {
                part(px, 0.92, pz, 0.07, 0.78, 0.07, pal.steel, { collider: false, shootable: false });
            }
            part(0, 0.78, -1.32, 0.24, 0.24, 0.06, pal.headlight, { collider: false, shootable: false });
            part(0, 0.38, 1.28, 0.42, 0.16, 0.04, pal.plate, { collider: false, shootable: false });
            wheel(0, -1.14, 0.26, 0.20);
            wheel(-0.72, 0.88, 0.28, 0.20);
            wheel(0.72, 0.88, 0.28, 0.20);
            return;
        }

        if (type === 'pickup') {
            const bodyMat = customBodyMat || pal.silver;
            const hullMats = [pal.sedanSide, pal.sedanSide, bodyMat, bodyMat, bodyMat, bodyMat];
            part(0, 0.26, 0, 1.98, 0.60, 4.95, hullMats);
            part(0, 0.20, -2.46, 1.96, 0.22, 0.18, pal.bumper, { collider: false, shootable: false });
            part(0, 0.56, -2.47, 0.96, 0.28, 0.06, pal.grille, { collider: false, shootable: false });
            part(0, 0.86, -0.45, 1.84, 0.72, 1.85, pal.glass);
            part(0, 0.92, -1.42, 1.76, 0.74, 0.12, pal.glass, { rotX: -0.45, collider: false, shootable: false });
            part(0, 1.58, -0.45, 1.80, 0.12, 1.78, bodyMat, { collider: false });
            // Black roll-bar + rear cargo bed & wooden supply box inside bed
            part(-0.84, 0.88, 0.56, 0.10, 0.72, 0.10, pal.bumper, { collider: false });
            part(0.84, 0.88, 0.56, 0.10, 0.72, 0.10, pal.bumper, { collider: false });
            part(0, 1.54, 0.56, 1.78, 0.10, 0.10, pal.bumper, { collider: false });
            part(0, 0.86, 1.44, 1.72, 0.12, 2.05, pal.bedliner, { collider: false });
            part(-0.90, 0.86, 1.44, 0.14, 0.36, 2.08, bodyMat, { collider: false });
            part(0.90, 0.86, 1.44, 0.14, 0.36, 2.08, bodyMat, { collider: false });
            part(-0.70, 0.58, -2.48, 0.34, 0.18, 0.06, pal.headlight, { collider: false, shootable: false });
            part(0.70, 0.58, -2.48, 0.34, 0.18, 0.06, pal.headlight, { collider: false, shootable: false });
            wheel(-0.94, -1.55, 0.36, 0.24); wheel(0.94, -1.55, 0.36, 0.24);
            wheel(-0.94, 1.55, 0.36, 0.24); wheel(0.94, 1.55, 0.36, 0.24);
            return;
        }

        if (type === 'van') {
            const vanMats = [pal.vanSide, pal.vanSide, pal.white, pal.white, pal.white, pal.white];
            part(0, 0.24, 0, 1.94, 1.84, 4.86, vanMats);
            part(0, 0.20, -2.42, 1.92, 0.22, 0.18, pal.bumper, { collider: false, shootable: false });
            part(0, 1.12, -2.38, 1.78, 0.72, 0.14, pal.glass, { rotX: -0.26, collider: false, shootable: false });
            part(0, 2.08, 0.4, 1.25, 0.20, 1.4, pal.white, { collider: false, shootable: false });
            part(-0.68, 0.62, -2.44, 0.34, 0.18, 0.06, pal.headlight, { collider: false, shootable: false });
            part(0.68, 0.62, -2.44, 0.34, 0.18, 0.06, pal.headlight, { collider: false, shootable: false });
            wheel(-0.92, -1.52, 0.34, 0.22); wheel(0.92, -1.52, 0.34, 0.22);
            wheel(-0.92, 1.52, 0.34, 0.22); wheel(0.92, 1.52, 0.34, 0.22);
            return;
        }

        if (type === 'bus_red' || type === 'bus_orange') {
            const isRed = type === 'bus_red';
            const sideMat = isRed ? pal.busRedSide : pal.busOrangeSide;
            const endMat = isRed ? pal.cream : pal.busOrange;
            const roofMat = isRed ? pal.busRed : pal.cream;
            const busMats = [sideMat, sideMat, roofMat, pal.bumper, endMat, endMat];

            part(0, 0.32, 0, 2.60, 2.82, 10.2, busMats);
            part(0, 0.24, -5.08, 2.58, 0.26, 0.18, pal.bumper, { collider: false, shootable: false });
            part(0, 1.38, -5.08, 2.38, 1.06, 0.12, pal.glass, { collider: false, shootable: false });
            part(0, 2.58, -5.08, 1.70, 0.34, 0.10, pal.busSign, { collider: false, shootable: false });
            // Roof AC units & truck-style side mirrors
            part(0, 3.14, -2.1, 1.85, 0.34, 2.2, pal.white, { collider: false, shootable: false });
            part(0, 3.14, 2.1, 1.85, 0.34, 2.2, pal.white, { collider: false, shootable: false });
            part(-1.42, 1.85, -4.85, 0.24, 0.32, 0.14, pal.bumper, { collider: false, shootable: false });
            part(1.42, 1.85, -4.85, 0.24, 0.32, 0.14, pal.bumper, { collider: false, shootable: false });
            part(-0.92, 0.68, -5.12, 0.42, 0.22, 0.06, pal.headlight, { collider: false, shootable: false });
            part(0.92, 0.68, -5.12, 0.42, 0.22, 0.06, pal.headlight, { collider: false, shootable: false });
            part(-0.92, 0.72, 5.12, 0.42, 0.22, 0.06, pal.taillight, { collider: false, shootable: false });
            part(0.92, 0.72, 5.12, 0.42, 0.22, 0.06, pal.taillight, { collider: false, shootable: false });
            for (const lz of [-3.3, 1.8, 3.4]) {
                wheel(-1.24, lz, 0.46, 0.28);
                wheel(1.24, lz, 0.46, 0.28);
            }
            return;
        }

        if (type === 'truck') {
            const cabMat = customBodyMat || pal.white;
            part(0, 0.35, -2.65, 2.36, 1.98, 2.10, cabMat);
            part(0, 0.28, -3.68, 2.34, 0.26, 0.20, pal.bumper, { collider: false, shootable: false });
            part(0, 0.74, -3.70, 1.45, 0.36, 0.08, pal.grille, { collider: false, shootable: false });
            part(0, 1.35, -3.68, 2.14, 0.78, 0.14, pal.glass, { rotX: -0.14, collider: false, shootable: false });
            part(0, 0.52, 1.15, 2.48, 2.58, 5.20, pal.truckCargo);
            part(-0.82, 0.62, -3.72, 0.38, 0.20, 0.06, pal.headlight, { collider: false, shootable: false });
            part(0.82, 0.62, -3.72, 0.38, 0.20, 0.06, pal.headlight, { collider: false, shootable: false });
            for (const lz of [-2.6, 0.9, 2.6]) {
                wheel(-1.16, lz, 0.44, 0.26);
                wheel(1.16, lz, 0.44, 0.26);
            }
            return;
        }

        if (type === 'foodcart') {
            const awningMat = customBodyMat || pal.awningRed;
            part(0, 0.12, 0, 1.45, 1.02, 2.15, pal.steel);
            part(-0.35, 1.14, 0, 0.65, 0.56, 1.35, pal.glass);
            part(0, 2.18, 0, 1.92, 0.18, 2.50, awningMat, { collider: false, noRadar: true });
            for (const [px, pz] of [[-0.66, -0.96], [0.66, -0.96], [-0.66, 0.96], [0.66, 0.96]]) {
                part(px, 1.12, pz, 0.07, 1.08, 0.07, pal.steel, { collider: false, shootable: false });
            }
            wheel(-0.74, 0, 0.28, 0.12);
            wheel(0.74, 0, 0.28, 0.12);
        }
    }

    makeSignMaterial(text, bgColor = '#0f172a', fgColor = '#facc15', accentColor = '#ef4444', drawThaiFlag = false) {
        const c = document.createElement('canvas');
        c.width = 512; c.height = 128;
        const ctx = c.getContext('2d');
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, 512, 128);
        ctx.strokeStyle = accentColor;
        ctx.lineWidth = 8;
        ctx.strokeRect(6, 6, 500, 116);

        let textCenterX = 256;
        let maxTextW = 468;
        if (drawThaiFlag) {
            const fx = 22, fy = 36, fw = 76, fh = 56;
            const bands = [
                [0, 9, '#a51931'], [9, 9, '#f4f5f8'],
                [18, 20, '#2d2a4a'], [38, 9, '#f4f5f8'], [47, 9, '#a51931']
            ];
            for (const [dy, dh, col] of bands) {
                ctx.fillStyle = col;
                ctx.fillRect(fx, fy + dy, fw, dh);
            }
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            ctx.strokeRect(fx, fy, fw, fh);
            textCenterX = 304;
            maxTextW = 372;
        }

        ctx.fillStyle = fgColor;
        ctx.font = 'bold 28px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, textCenterX, 66, maxTextW);
        const tex = new THREE.CanvasTexture(c);
        const mat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.35, emissive: fgColor, emissiveIntensity: 0.08 });
        mat.userData = { noTileRepeat: true };
        return mat;
    }

    buildBangkokBuilding(cfg) {
        const {
            x, z, w, d, h = 4.6, upperH = 6.5,
            wallMat, upperMat, roofMat, crateMat, counterMat,
            openSides = ['N', 'S', 'E', 'W'], doorW = 4.2,
            colonnadeSide = null, interiorMode = 'shophouse',
            signText = '', signBg = '#0f172a', signFg = '#facc15', signAccent = '#ef4444',
            signSide = null, isSkyscraper = false, crownMat = null, awningMat = null
        } = cfg;

        const t = 0.75;
        const has = (side) => openSides.includes(side);

        // Ground-floor perimeter walls with wide enterable doorways
        for (const [side, wz] of [['N', z - d / 2], ['S', z + d / 2]]) {
            if (has(side)) {
                const segW = Math.max(1.4, (w - doorW) / 2);
                this.addBlock(x - w / 2 + segW / 2, 0, wz, segW, h, t, wallMat);
                this.addBlock(x + w / 2 - segW / 2, 0, wz, segW, h, t, wallMat);
            } else {
                this.addBlock(x, 0, wz, w, h, t, wallMat);
            }
        }
        for (const [side, wx] of [['W', x - w / 2], ['E', x + w / 2]]) {
            if (has(side)) {
                const segD = Math.max(1.4, (d - t - doorW) / 2);
                this.addBlock(wx, 0, z - d / 2 + t / 2 + segD / 2, t, h, segD, wallMat);
                this.addBlock(wx, 0, z + d / 2 - t / 2 - segD / 2, t, h, segD, wallMat);
            } else {
                this.addBlock(wx, 0, z, t, h, d - t, wallMat);
            }
        }

        // Ceiling slab + upper stories (noRadar so minimap clearly displays interior rooms!)
        this.addBlock(x, h, z, w + 0.5, 0.55, d + 0.5, roofMat, false, false, { noRadar: true });
        if (upperH > 0) {
            this.addBlock(x, h + 0.55, z, w - 0.2, upperH, d - 0.2, upperMat || wallMat, false, true, { noRadar: true });
            if (isSkyscraper) {
                const topY = h + 0.55 + upperH + 0.38;
                this.addBlock(x, topY, z, w * 0.72, 6.0, d * 0.72, crownMat || upperMat, false, false, { noRadar: true });
                this.addBlock(x, topY + 6.0, z, w * 0.40, 4.5, d * 0.40, roofMat, false, false, { noRadar: true });
                // Rooftop red aviation obstruction warning beacon
                const beacon = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.55, 0.45), new THREE.MeshBasicMaterial({ color: 0xef4444 }));
                beacon.position.set(x, topY + 10.75, z);
                this.scene.add(beacon);
                this.mapObjects.push(beacon);
            }
        }

        // Sidewalk Colonnade Overhang, Plinth Pillars & Angled Shopfront Awnings
        if (colonnadeSide) {
            const overhang = 2.6;
            const cY = h - 0.25;
            if (colonnadeSide === 'E' || colonnadeSide === 'W') {
                const dir = colonnadeSide === 'E' ? 1 : -1;
                const cx = x + dir * (w / 2 + overhang / 2);
                const px = x + dir * (w / 2 + overhang - 0.45);
                this.addBlock(cx, cY, z, overhang, 0.35, d + 0.4, roofMat, false, false, { noRadar: true });
                if (awningMat) {
                    this.addOrientedPart(x + dir * (w / 2 + 1.35), 0, z, 0, 0, cY - 0.45, 0, 2.3, 0.14, d * 0.85, awningMat, {
                        rotZ: -dir * 0.28, collider: false, shootable: false
                    });
                }
                for (const pz of [z - d * 0.38, z, z + d * 0.38]) {
                    this.addBlock(px, 0, pz, 0.88, 0.45, 0.88, roofMat);
                    this.addBlock(px, 0.45, pz, 0.74, cY - 0.45, 0.74, wallMat);
                }
            } else {
                const dir = colonnadeSide === 'S' ? 1 : -1;
                const cz = z + dir * (d / 2 + overhang / 2);
                const pz = z + dir * (d / 2 + overhang - 0.45);
                this.addBlock(x, cY, cz, w + 0.4, 0.35, overhang, roofMat, false, false, { noRadar: true });
                for (const px of [x - w * 0.38, x, x + w * 0.38]) {
                    this.addBlock(px, 0, pz, 0.88, 0.45, 0.88, roofMat);
                    this.addBlock(px, 0.45, pz, 0.74, cY - 0.45, 0.74, wallMat);
                }
            }
        }

        // Street-facing Thai/Bangkok Signboard
        if (signText) {
            const sSide = signSide || colonnadeSide || 'E';
            const signMat = this.makeSignMaterial(signText, signBg, signFg, signAccent);
            const sY = h + 0.75;
            if (sSide === 'E' || sSide === 'W') {
                const dir = sSide === 'E' ? 1 : -1;
                this.addBlock(x + dir * (w / 2 + 0.25), sY, z, 0.28, 1.65, Math.min(d * 0.75, 11), signMat, false, false, { noRadar: true });
            } else {
                const dir = sSide === 'S' ? 1 : -1;
                this.addBlock(x, sY, z + dir * (d / 2 + 0.25), Math.min(w * 0.75, 11), 1.65, 0.28, signMat, false, false, { noRadar: true });
            }
        }

        // Interior Rooms, Shelves, Counters & Blind Ambush Corners
        const cMat = counterMat || crateMat;
        if (interiorMode === 'aisles') {
            this.addBlock(x - 2.6, 0, z - 3.0, 5.2, 1.65, 1.1, cMat, true);
            this.addBlock(x - 2.6, 0, z + 3.0, 5.2, 1.65, 1.1, cMat, true);
            this.addBlock(x + 4.2, 0, z - 3.6, 3.6, 1.15, 1.1, cMat, true);
            this.addBlock(x + 2.6, 0, z - 5.0, 1.1, 1.15, 2.8, cMat, true);
            this.addBlock(x + 4.4, 0, z + 4.4, 1.8, 2.2, 1.8, crateMat, true);
        } else if (interiorMode === 'shophouse') {
            this.addBlock(x, 0, z, Math.max(4.0, w - 7.4), h, 0.65, wallMat);
            this.addBlock(x - w * 0.28, 0, z - d * 0.24, 1.8, 1.55, 1.8, crateMat, true);
            this.addBlock(x + w * 0.28, 0, z + d * 0.24, 2.0, 2.15, 2.0, crateMat, true);
            this.addBlock(x + w * 0.25, 0, z - d * 0.26, 2.8, 1.05, 1.2, cMat, true);
        } else if (interiorMode === 'police') {
            this.addBlock(x - 1.5, 0, z - 3.0, 4.4, 1.22, 1.0, cMat, true);
            this.addBlock(x + 2.5, 0, z, 0.65, h, d * 0.45, wallMat);
            this.addBlock(x + 5.2, 0, z + 4.5, 1.6, 2.3, 1.6, crateMat, true);
            this.addBlock(x - 5.2, 0, z + 4.5, 1.6, 2.3, 1.6, crateMat, true);
        } else if (interiorMode === 'garage') {
            this.addBlock(x - 5.0, 0, z - 6.2, 2.8, 1.2, 1.4, cMat, true);
            this.addBlock(x + 5.0, 0, z + 6.2, 1.9, 2.2, 1.9, crateMat, true);
            this.addBarrelProp(x + 5.6, z - 6.4, 0xb91c1c, true);
            this.addBarrelProp(x + 5.6, z - 5.1, 0x1d4ed8, false);
        } else if (interiorMode === 'bank') {
            for (const [px, pz] of [[-4.2, -5.0], [4.2, -5.0], [-4.2, 5.0], [4.2, 5.0]]) {
                this.addBlock(x + px, 0, z + pz, 1.4, h, 1.4, wallMat);
            }
            this.addBlock(x + 4.8, 0, z, 1.2, 1.25, 8.0, cMat, true);
            this.addBlock(x - 5.2, 0, z - 6.2, 2.2, 2.4, 2.2, crateMat, true);
        } else if (interiorMode === 'terminal') {
            this.addBlock(x - 3.0, 0, z - 4.2, 3.6, 2.7, 3.6, cMat, true);
            this.addBlock(x - 3.0, 0, z + 4.2, 3.6, 2.7, 3.6, cMat, true);
            this.addBlock(x + 3.2, 0, z, 1.4, 0.95, 5.6, crateMat, true);
        } else if (interiorMode === 'lobby') {
            for (const [px, pz] of [[-4.2, -4.2], [4.2, -4.2], [-4.2, 4.2], [4.2, 4.2]]) {
                this.addBlock(x + px, 0, z + pz, 1.5, h, 1.5, wallMat);
            }
            this.addBlock(x, 0, z, 3.6, 1.18, 2.2, cMat, true);
        }
    }

    addNightMarketStall(x, z, rotY, canopyMat, tableMat, crateMat, poleMat) {
        this.addOrientedPart(x, 0, z, rotY, 0, 0, 0, 3.8, 1.05, 1.4, tableMat);
        this.addOrientedPart(x, 0, z, rotY, 1.35, 0, 1.15, 1.25, 1.45, 1.25, crateMat);
        this.addOrientedPart(x, 0, z, rotY, 0, 2.35, 0, 4.4, 0.22, 3.6, canopyMat, { collider: false, noRadar: true });
        for (const [px, pz] of [[-1.95, -1.55], [1.95, -1.55], [-1.95, 1.55], [1.95, 1.55]]) {
            this.addOrientedPart(x, 0, z, rotY, px, 0, pz, 0.12, 2.38, 0.12, poleMat, { collider: false, shootable: false });
        }
    }

    addBangkokTree(x, z, planterMat, trunkMat, leafMat, leafDarkMat) {
        this.addBlock(x, 0, z, 1.85, 0.58, 1.85, planterMat, true);
        const soil = new THREE.Mesh(new THREE.BoxGeometry(1.55, 0.12, 1.55), trunkMat);
        soil.position.set(x, 0.56, z);
        this.scene.add(soil);
        this.mapObjects.push(soil);

        const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.28, 2.75, 10), trunkMat);
        trunk.position.set(x, 1.95, z);
        trunk.castShadow = true;
        this.scene.add(trunk);
        this.mapObjects.push(trunk);
        this.colliders.push({
            minX: x - 0.3, maxX: x + 0.3, minY: 0.58, maxY: 3.3,
            minZ: z - 0.3, maxZ: z + 0.3, isCrate: true
        });

        // Multi-cluster organic tropical canopy (high enough to walk & hide around the trunk)
        const clusters = [
            [0, 4.35, 0, 1.55, leafMat],
            [-0.95, 3.85, 0.55, 1.15, leafDarkMat],
            [0.95, 3.95, -0.55, 1.20, leafDarkMat],
            [0.35, 4.10, 0.95, 1.05, leafMat]
        ];
        for (const [ox, oy, oz, r, mat] of clusters) {
            const cMesh = new THREE.Mesh(new THREE.DodecahedronGeometry(r, 1), mat);
            cMesh.position.set(x + ox, oy, z + oz);
            cMesh.scale.set(1.15, 0.78, 1.15);
            cMesh.castShadow = true;
            this.scene.add(cMesh);
            this.mapObjects.push(cMesh);
        }
    }

    addBangkokStreetLamp(x, z, poleMat) {
        const dir = x < 0 ? 1 : -1;
        const h = 6.2;
        const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.13, h, 10), poleMat);
        pole.position.set(x, h / 2, z);
        pole.castShadow = true;
        this.scene.add(pole);
        this.mapObjects.push(pole);
        this.shootableMeshes.push(pole);

        // Overhanging gooseneck arm reaching over road lanes
        const arm = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.10, 0.10), poleMat);
        arm.position.set(x + dir * 0.95, h - 0.05, z);
        arm.rotation.z = dir * 0.14;
        this.scene.add(arm);
        this.mapObjects.push(arm);

        const head = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.14, 0.34), poleMat);
        head.position.set(x + dir * 1.8, h + 0.06, z);
        this.scene.add(head);
        this.mapObjects.push(head);

        const bulb = new THREE.Mesh(new THREE.BoxGeometry(0.50, 0.05, 0.24), new THREE.MeshBasicMaterial({ color: 0xffedd5 }));
        bulb.position.set(x + dir * 1.8, h - 0.02, z);
        this.scene.add(bulb);
        this.mapObjects.push(bulb);

        const pLight = new THREE.PointLight(0xffdfb0, 0.7, 26);
        pLight.position.set(x + dir * 1.8, h - 0.3, z);
        this.scene.add(pLight);
        this.mapLights.push(pLight);

        this.colliders.push({
            minX: x - 0.26, maxX: x + 0.26, minY: 0, maxY: h,
            minZ: z - 0.26, maxZ: z + 0.26, isCrate: true
        });
    }

    addThaiFlagPole(x, z, poleMat) {
        const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.11, 8.5, 10), poleMat);
        pole.position.set(x, 4.25, z);
        pole.castShadow = true;
        this.scene.add(pole);
        this.mapObjects.push(pole);

        const fc = document.createElement('canvas');
        fc.width = 256; fc.height = 160;
        const fctx = fc.getContext('2d');
        const bands = [
            [0, 26, '#a51931'], [26, 26, '#f4f5f8'],
            [52, 56, '#2d2a4a'], [108, 26, '#f4f5f8'], [134, 26, '#a51931']
        ];
        for (const [by, bh, col] of bands) {
            fctx.fillStyle = col;
            fctx.fillRect(0, by, 256, bh);
        }
        const fTex = new THREE.CanvasTexture(fc);
        const flagMat = new THREE.MeshStandardMaterial({ map: fTex, side: THREE.DoubleSide, roughness: 0.72 });
        const flag = new THREE.Mesh(new THREE.PlaneGeometry(2.8, 1.75), flagMat);
        flag.position.set(x + 1.4, 7.55, z);
        this.scene.add(flag);
        this.mapObjects.push(flag);

        this.colliders.push({
            minX: x - 0.3, maxX: x + 0.3, minY: 0, maxY: 8.5,
            minZ: z - 0.3, maxZ: z + 0.3, isCrate: true
        });
    }

    addBusShelter(x, z, wallMat, roofMat, adText) {
        const signMat = this.makeSignMaterial(adText, '#0f172a', '#38bdf8', '#facc15');
        this.addBlock(x, 0, z, 0.32, 2.4, 5.2, signMat);
        this.addBlock(x, 2.4, z, 2.2, 0.22, 5.6, roofMat, false, false, { noRadar: true });
        this.addBlock(x + (x < 0 ? 0.55 : -0.55), 0, z, 0.65, 0.55, 3.2, wallMat, true);
    }

    addRoadGantrySign(z, steelMat, text) {
        this.addBlock(-23.2, 0, z, 0.68, 6.4, 0.68, steelMat);
        this.addBlock(23.2, 0, z, 0.68, 6.4, 0.68, steelMat);
        this.addBlock(0, 6.0, z, 47.0, 0.45, 0.55, steelMat, false, false, { noRadar: true });
        const gantryMat = this.makeSignMaterial(text, '#065f46', '#ffffff', '#facc15', true);
        this.addBlock(0, 6.38, z, 19.0, 2.2, 0.42, gantryMat, false, false, { noRadar: true });
    }

    addBangkokSkywalk(zPos, stairDirZ, deckMat, railMat, adMat) {
        this.addBlock(0, 3.9, zPos, 52.4, 0.5, 4.4, deckMat);
        const dir = stairDirZ;
        const outerZ = zPos - dir * 2.05;
        const innerZ = zPos + dir * 2.05;
        this.addBlock(0, 4.4, outerZ, 51.6, 1.05, 0.32, railMat);
        this.addBlock(0, 4.4, innerZ, 43.2, 1.05, 0.32, railMat);
        this.addBlock(-10, 4.4, outerZ, 5.4, 2.05, 0.36, adMat);
        this.addBlock(10, 4.4, innerZ, 5.4, 2.05, 0.36, adMat);

        for (const sx of [-24.2, 24.2]) {
            this.addBlock(sx, 0, zPos + dir * 13.4, 3.6, 1.1, 3.2, deckMat);
            this.addBlock(sx, 1.1, zPos + dir * 10.2, 3.6, 1.1, 3.2, deckMat);
            this.addBlock(sx, 2.2, zPos + dir * 7.0, 3.6, 1.1, 3.2, deckMat);
            this.addBlock(sx, 3.3, zPos + dir * 3.8, 3.6, 1.1, 3.2, deckMat);
            this.addBlock(sx + (sx < 0 ? 1.95 : -1.95), 0, zPos + dir * 5.2, 0.35, 3.3, 4.2, railMat);
        }
    }

    addBangkokUtilityPoles(xSide, zList, poleMat, wireMat) {
        for (let i = 0; i < zList.length; i++) {
            const pz = zList[i];
            this.addBlock(xSide, 0, pz, 0.34, 7.2, 0.34, poleMat, true);
            this.addBlock(xSide, 6.5, pz, 1.35, 0.15, 0.15, poleMat, false, false, { noRadar: true });
            if (i > 0) {
                const prevZ = zList[i - 1];
                const midZ = (pz + prevZ) / 2;
                const span = Math.abs(pz - prevZ);
                for (const wy of [5.85, 6.15, 6.45]) {
                    const wire = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.05, span), wireMat);
                    wire.position.set(xSide + (xSide < 0 ? 0.35 : -0.35), wy, midZ);
                    this.scene.add(wire);
                    this.mapObjects.push(wire);
                }
            }
        }
    }

    buildBangkokRoadGround() {
        // 1. Bangkok Sidewalk Paving Tiles (Warm Sandstone-Grey GTM Interlocking Blocks)
        this.buildCanvasFloor('#5c5752', (ctx) => {
            for (let y = 0; y < 512; y += 32) {
                for (let x = 0; x < 512; x += 32) {
                    const odd = ((x + y) / 32) % 2 === 0;
                    const shade = odd ? 94 : 80;
                    ctx.fillStyle = `rgb(${shade + 6}, ${shade}, ${shade - 5})`;
                    ctx.fillRect(x + 1, y + 1, 30, 30);
                    ctx.strokeStyle = 'rgba(20, 18, 16, 0.45)';
                    ctx.lineWidth = 2;
                    ctx.strokeRect(x, y, 32, 32);
                }
            }
            for (let i = 0; i < 12000; i++) {
                ctx.fillStyle = i % 2 === 0 ? 'rgba(0,0,0,0.18)' : 'rgba(255,245,230,0.08)';
                ctx.fillRect(Math.random() * 512, Math.random() * 512, 1.5, 1.5);
            }
        }, 44, 0.07, 0.94);

        // 2. High-Resolution Seamless Fine-Grain Bitumen Asphalt (tiled cleanly without stretching!)
        const makeFineAsphalt = (rx, ry, factor) => {
            const m = this.makeTexMat('#161920', (ctx) => {
                for (let i = 0; i < 24000; i++) {
                    const r = Math.random();
                    ctx.fillStyle = r < 0.45 ? 'rgba(5, 7, 10, 0.55)' : (r < 0.85 ? 'rgba(55, 62, 74, 0.35)' : 'rgba(130, 138, 150, 0.16)');
                    ctx.fillRect(Math.random() * 512, Math.random() * 512, 2, 2);
                }
                // Subtle micro tar crack & surface wear patches
                ctx.strokeStyle = 'rgba(8, 10, 14, 0.55)';
                ctx.lineWidth = 2;
                ctx.beginPath(); ctx.moveTo(40, 110); ctx.lineTo(140, 175); ctx.lineTo(195, 290); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(360, 40); ctx.lineTo(310, 190); ctx.lineTo(410, 340); ctx.stroke();
            }, 1, { bumpScale: 0.08, roughness: 0.94, metalness: 0.02 });
            if (m.map) m.map.repeat.set(rx, ry);
            m.polygonOffset = true;
            m.polygonOffsetFactor = factor;
            return m;
        };

        const mainAsphalt = makeFineAsphalt(10, 48, -1);
        const crossAsphalt = makeFineAsphalt(7, 48, -2);
        const soiAsphalt = makeFineAsphalt(3, 44, -1);

        const dashedLineMat = this.makeTexMat('#e2e8f0', (ctx) => {
            ctx.clearRect(0, 0, 512, 512);
            ctx.fillStyle = 'rgba(241, 245, 249, 0.88)';
            for (let y = 16; y < 512; y += 128) ctx.fillRect(96, y, 320, 68);
        }, 1, { roughness: 0.8 });
        dashedLineMat.transparent = true;
        dashedLineMat.alphaTest = 0.2;
        if (dashedLineMat.map) dashedLineMat.map.repeat.set(1, 24);
        dashedLineMat.polygonOffset = true;
        dashedLineMat.polygonOffsetFactor = -3;

        const redWhiteCurbMat = this.makeTexMat('#e2e8f0', (ctx) => {
            ctx.fillStyle = '#b91c1c';
            for (let y = 0; y < 512; y += 128) ctx.fillRect(0, y, 512, 64);
            for (let i = 0; i < 4000; i++) {
                ctx.fillStyle = 'rgba(0,0,0,0.18)';
                ctx.fillRect(Math.random() * 512, Math.random() * 512, 2, 2);
            }
        }, 1, { roughness: 0.88 });
        if (redWhiteCurbMat.map) redWhiteCurbMat.map.repeat.set(1, 34);

        const zebraMat = this.makeTexMat('#161920', (ctx) => {
            ctx.clearRect(0, 0, 512, 512);
            ctx.fillStyle = 'rgba(241, 245, 249, 0.88)';
            for (let x = 16; x < 512; x += 48) ctx.fillRect(x, 20, 24, 472);
        }, 1, { roughness: 0.85 });
        zebraMat.transparent = true;
        zebraMat.alphaTest = 0.2;
        zebraMat.polygonOffset = true;
        zebraMat.polygonOffsetFactor = -4;

        const yellowLineMat = new THREE.MeshStandardMaterial({ color: 0xeab308, roughness: 0.80 });
        const tactileMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.85 });
        const medianIslandMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.92 });
        const manholeMat = new THREE.MeshStandardMaterial({ color: 0x262930, roughness: 0.55, metalness: 0.72 });

        // Secondary Soi roads & Bombsite Plazas
        this.addGroundStrip(-54, 0.015, 0, 10, 206, soiAsphalt);
        this.addGroundStrip(54, 0.015, 0, 10, 206, soiAsphalt);
        this.addGroundStrip(0, 0.016, 56, 14, 206, soiAsphalt, Math.PI / 2);
        this.addGroundStrip(0, 0.016, -56, 14, 206, soiAsphalt, Math.PI / 2);
        this.addGroundStrip(68, 0.017, -12, 22, 22, soiAsphalt);
        this.addGroundStrip(-68, 0.017, 12, 22, 22, soiAsphalt);

        // Main Sukhumvit Avenue (44m wide) & Asoke Cross-Avenue (32m wide)
        this.addGroundStrip(0, 0.020, 0, 44, 214, mainAsphalt);
        this.addGroundStrip(0, 0.023, 0, 32, 214, crossAsphalt, Math.PI / 2);

        // Crisp White Dashed Road Lane Dividers (4 lanes each direction on Sukhumvit + 2 lanes each on Asoke)
        for (const lx of [-15.5, -9.0, 9.0, 15.5]) {
            this.addGroundStrip(lx, 0.026, -61, 0.24, 86, dashedLineMat);
            this.addGroundStrip(lx, 0.026, 61, 0.24, 86, dashedLineMat);
        }
        for (const lz of [-8.0, 8.0]) {
            this.addGroundStrip(-64, 0.028, lz, 0.24, 82, dashedLineMat, Math.PI / 2);
            this.addGroundStrip(64, 0.028, lz, 0.24, 82, dashedLineMat, Math.PI / 2);
        }

        // Yellow Centerlines on Asoke Cross-Avenue + Stop Bars
        this.addGroundStrip(0, 0.029, -0.28, 212, 0.22, yellowLineMat);
        this.addGroundStrip(0, 0.029, 0.28, 212, 0.22, yellowLineMat);
        this.addGroundStrip(-12, 0.030, 21.2, 19, 0.45, new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.82 }));
        this.addGroundStrip(12, 0.030, -21.2, 19, 0.45, new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.82 }));

        // Physical 3D Raised Painted Curb Strips (non-colliding so players walk seamlessly!) + Sidewalk Yellow Tactile Strip
        this.addOrientedPart(-22.25, 0, 0, 0, 0, 0, 0, 0.46, 0.09, 214, redWhiteCurbMat, { collider: false, shootable: false });
        this.addOrientedPart(22.25, 0, 0, 0, 0, 0, 0, 0.46, 0.09, 214, redWhiteCurbMat, { collider: false, shootable: false });
        this.addGroundStrip(-23.4, 0.025, 0, 0.36, 210, tactileMat);
        this.addGroundStrip(23.4, 0.025, 0, 0.36, 210, tactileMat);

        // Center Median Curb Islands (North & South of central intersection)
        this.addGroundStrip(0, 0.032, 54, 3.4, 72, medianIslandMat);
        this.addGroundStrip(0, 0.032, -54, 3.4, 72, medianIslandMat);
        this.addGroundStrip(-1.75, 0.034, 54, 0.22, 72, yellowLineMat);
        this.addGroundStrip(1.75, 0.034, 54, 0.22, 72, yellowLineMat);
        this.addGroundStrip(-1.75, 0.034, -54, 0.22, 72, yellowLineMat);
        this.addGroundStrip(1.75, 0.034, -54, 0.22, 72, yellowLineMat);

        // Zebra Crosswalks around Central Intersection
        this.addGroundStrip(0, 0.030, -18, 43, 4.0, zebraMat);
        this.addGroundStrip(0, 0.030, 18, 43, 4.0, zebraMat);
        this.addGroundStrip(-24, 0.030, 0, 4.0, 31, zebraMat, Math.PI / 2);
        this.addGroundStrip(24, 0.030, 0, 4.0, 31, zebraMat, Math.PI / 2);

        // Cast-iron Road Manhole Covers along Sukhumvit Gutter
        for (const [mx, mz] of [[-19.5, 62], [19.5, 42], [-19.5, -28], [19.5, -62], [-19.5, 10], [19.5, -10]]) {
            const mh = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 0.02, 12), manholeMat);
            mh.position.set(mx, 0.026, mz);
            this.scene.add(mh);
            this.mapObjects.push(mh);
        }
    }

    buildBangkokThailand() {
        this.buildSky('#0e2a4d', '#3b72a8', '#e8a86b', 730, 162, 'rgba(255, 224, 175, 1.0)');
        this.updateAtmosphericLighting(0x7ab8f5, 0x262930, 0xffe4c4, 0xffdfba, 1.62);
        if (this.game && this.game.sunLight) {
            this.game.sunLight.position.set(55, 78, 36);
        }
        this.setFog(0xb6c4d4, 0.0026);

        this.spawns = {
            T: [
                { x: 0, z: 95, yaw: 0 },
                { x: -11, z: 96, yaw: 0 },
                { x: 11, z: 96, yaw: 0 },
                { x: -20, z: 94, yaw: 0 },
                { x: 20, z: 94, yaw: 0 }
            ],
            CT: [
                { x: 0, z: -95, yaw: Math.PI },
                { x: -11, z: -96, yaw: Math.PI },
                { x: 11, z: -96, yaw: Math.PI },
                { x: -20, z: -94, yaw: Math.PI },
                { x: 20, z: -94, yaw: Math.PI }
            ]
        };

        this.bombsites = {
            A: { x: 68, z: -12, radius: 8.5, label: 'A' },
            B: { x: -68, z: 12, radius: 8.5, label: 'B' }
        };

        this.waypoints = [
            // South Sukhumvit (T side)
            { x: -12, z: 92 }, { x: 12, z: 92 }, { x: -26, z: 86 }, { x: 26, z: 86 },
            { x: -8, z: 64 }, { x: 8, z: 64 }, { x: -26, z: 62 }, { x: 26, z: 62 },
            { x: -9, z: 40 }, { x: 9, z: 40 }, { x: -26, z: 24 }, { x: 26, z: 24 },
            // Central Intersection & Asoke Cross-Avenue
            { x: 0, z: 10 }, { x: 0, z: -10 }, { x: -24, z: 0 }, { x: 24, z: 0 },
            { x: -54, z: 0 }, { x: 54, z: 0 }, { x: -78, z: 0 }, { x: 78, z: 0 },
            // Bombsite B & Night Market (West)
            { x: -68, z: 12 }, { x: -82, z: 24 }, { x: -68, z: 24 }, { x: -76, z: 36.5 }, { x: -54, z: 36 },
            // Bombsite A & Siam Plaza (East)
            { x: 68, z: -12 }, { x: 71, z: 28 }, { x: 82, z: 24 }, { x: 54, z: -36 },
            // West & East Parallel Soi Alleys + Inside Building Corridors
            { x: -54, z: 72 }, { x: -54, z: 56 }, { x: -54, z: -24 }, { x: -54, z: -56 }, { x: -54, z: -76 },
            { x: 54, z: 72 }, { x: 54, z: 56 }, { x: 54, z: 24 }, { x: 54, z: -56 }, { x: 54, z: -76 },
            { x: -40, z: 38 }, { x: 40, z: 38 }, { x: -40, z: -34 }, { x: 40, z: -38 },
            // North Sukhumvit (CT side)
            { x: -9, z: -40 }, { x: 9, z: -40 }, { x: -8, z: -64 }, { x: 8, z: -64 },
            { x: -12, z: -92 }, { x: 12, z: -92 }
        ];

        this.buildBangkokRoadGround();

        // Weathered Architectural Materials
        const concreteWallMat = this.makeTexMat('#878d96', (ctx) => {
            const g = ctx.createLinearGradient(0, 0, 0, 512);
            g.addColorStop(0, '#727882'); g.addColorStop(0.2, '#9298a1');
            g.addColorStop(0.85, '#858b94'); g.addColorStop(1, '#474c54');
            ctx.fillStyle = g; ctx.fillRect(0, 0, 512, 512);
            ctx.strokeStyle = 'rgba(20, 25, 32, 0.38)'; ctx.lineWidth = 3;
            for (let y = 0; y < 512; y += 64) {
                ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(512, y); ctx.stroke();
            }
            for (let i = 0; i < 6000; i++) {
                ctx.fillStyle = i % 2 === 0 ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.06)';
                ctx.fillRect(Math.random() * 512, Math.random() * 512, 2, 2);
            }
        }, 1, { bumpScale: 0.07, roughness: 0.90 });

        const shophouseCream = this.makeTexMat('#dbd0b8', (ctx) => {
            const g = ctx.createLinearGradient(0, 0, 0, 512);
            g.addColorStop(0, '#cfc3aa'); g.addColorStop(0.82, '#dbd0b8'); g.addColorStop(1, '#7c7465');
            ctx.fillStyle = g; ctx.fillRect(0, 0, 512, 512);
            for (let i = 0; i < 6000; i++) {
                ctx.fillStyle = 'rgba(0,0,0,0.08)';
                ctx.fillRect(Math.random() * 512, Math.random() * 512, 2, 2);
            }
            // Metal roller-shutter texture accent on lower portion
            ctx.fillStyle = 'rgba(71, 85, 105, 0.35)';
            ctx.fillRect(48, 220, 416, 260);
            for (let y = 228; y < 480; y += 14) {
                ctx.fillStyle = 'rgba(15, 23, 42, 0.25)'; ctx.fillRect(48, y, 416, 3);
            }
        }, 1, { bumpScale: 0.06, roughness: 0.88 });

        const shophouseTerra = this.makeTexMat('#a45a44', (ctx) => {
            const g = ctx.createLinearGradient(0, 0, 0, 512);
            g.addColorStop(0, '#8f4b37'); g.addColorStop(0.82, '#a45a44'); g.addColorStop(1, '#572f24');
            ctx.fillStyle = g; ctx.fillRect(0, 0, 512, 512);
            for (let y = 0; y < 512; y += 32) {
                ctx.fillStyle = 'rgba(20, 10, 6, 0.16)'; ctx.fillRect(0, y, 512, 3);
            }
        }, 1, { bumpScale: 0.06, roughness: 0.90 });

        const btsConcreteMat = this.makeTexMat('#b8c0cc', (ctx) => {
            ctx.strokeStyle = '#64748b'; ctx.lineWidth = 6; ctx.strokeRect(4, 4, 504, 504);
            for (let i = 0; i < 5000; i++) {
                ctx.fillStyle = 'rgba(0,0,0,0.09)';
                ctx.fillRect(Math.random() * 512, Math.random() * 512, 2, 2);
            }
        }, 1, { bumpScale: 0.06, roughness: 0.88 });

        const glassTowerMat = this.makeTexMat('#0c1524', (ctx) => {
            for (let y = 0; y < 512; y += 32) {
                // Concrete/aluminum floor spandrel band
                ctx.fillStyle = '#334155';
                ctx.fillRect(0, y, 512, 7);
                for (let x = 0; x < 512; x += 24) {
                    const lit = ((x * 7 + y * 13) % 11) > 5;
                    ctx.fillStyle = lit ? (((x + y) % 3 === 0) ? '#fde68a' : '#7dd3fc') : '#152238';
                    ctx.fillRect(x + 2, y + 7, 20, 24);
                    // Reflection diagonal highlight
                    ctx.fillStyle = 'rgba(186, 230, 253, 0.14)';
                    ctx.fillRect(x + 3, y + 8, 7, 22);
                    ctx.strokeStyle = '#090d16'; ctx.lineWidth = 2; ctx.strokeRect(x, y + 6, 24, 26);
                }
            }
        }, 1, { roughness: 0.14, metalness: 0.82 });

        const warmTowerMat = this.makeTexMat('#232b38', (ctx) => {
            for (let y = 0; y < 512; y += 36) {
                ctx.fillStyle = '#475569'; ctx.fillRect(0, y, 512, 8);
                for (let x = 0; x < 512; x += 28) {
                    const lit = ((x * 5 + y * 9) % 10) > 4;
                    ctx.fillStyle = lit ? '#fcd34d' : '#1e293b';
                    ctx.fillRect(x + 3, y + 8, 22, 26);
                    ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 2; ctx.strokeRect(x, y + 6, 28, 30);
                }
            }
        }, 1, { roughness: 0.24, metalness: 0.68 });

        // Detailed Bangkok Upper Shophouse Windows, AC Units & Balconies
        const upperShophouseMat = this.makeTexMat('#cfc7b8', (ctx) => {
            for (let y = 24; y < 480; y += 112) {
                ctx.fillStyle = 'rgba(0,0,0,0.09)'; ctx.fillRect(0, y + 92, 512, 8);
                for (let x = 24; x < 480; x += 96) {
                    ctx.fillStyle = '#1e293b'; ctx.fillRect(x, y, 56, 72);
                    ctx.fillStyle = '#0f172a'; ctx.fillRect(x + 4, y + 4, 48, 64);
                    ctx.fillStyle = '#38bdf8'; ctx.fillRect(x + 6, y + 6, 20, 58);
                    ctx.fillStyle = '#1e3a5f'; ctx.fillRect(x + 30, y + 6, 20, 58);
                    // Exterior AC compressor box beside window
                    ctx.fillStyle = '#e2e8f0'; ctx.fillRect(x + 62, y + 42, 24, 22);
                    ctx.fillStyle = '#334155'; ctx.fillRect(x + 66, y + 46, 12, 12);
                }
            }
        }, 1, { bumpScale: 0.06, roughness: 0.84 });

        const bankMarbleMat = this.makeTexMat('#dbe2ea', (ctx) => {
            ctx.fillStyle = '#1e3a8a'; ctx.fillRect(0, 0, 512, 48);
            ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 3;
            for (let y = 64; y < 512; y += 64) {
                ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(512, y); ctx.stroke();
            }
        }, 1, { roughness: 0.48 });

        const shelfCrateMat = this.makeTexMat('#78350f', (ctx) => {
            ctx.strokeStyle = '#451a03'; ctx.lineWidth = 14; ctx.strokeRect(8, 8, 496, 496);
            ctx.fillStyle = '#f59e0b'; ctx.fillRect(42, 42, 428, 36);
        }, 1, { roughness: 0.85 });

        const counterMat = new THREE.MeshStandardMaterial({ color: 0x0f766e, roughness: 0.55 });
        const roofMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.90 });
        const steelMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.82, roughness: 0.32 });
        const trunkMat = new THREE.MeshStandardMaterial({ color: 0x4b3019, roughness: 0.96 });
        const leafMat = new THREE.MeshStandardMaterial({ color: 0x226835, roughness: 0.86 });
        const leafDarkMat = new THREE.MeshStandardMaterial({ color: 0x164a24, roughness: 0.90 });
        const wireMat = new THREE.MeshBasicMaterial({ color: 0x090d16 });
        const shopAwningRed = new THREE.MeshStandardMaterial({ color: 0x991b1b, roughness: 0.85 });
        const shopAwningBlue = new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.85 });

        this.buildPerimeterWalls(14, 3.0, concreteWallMat);

        // =====================================================================
        // 1. ELEVATED BTS SKYTRAIN VIADUCT, AERODYNAMIC TRAIN & 2 SKYWALKS
        // =====================================================================
        this.addBlock(0, 10.2, 0, 8.6, 1.35, 212, btsConcreteMat, false, false, { noRadar: true });
        this.addBlock(-4.1, 11.55, 0, 0.4, 1.0, 212, btsConcreteMat, false, false, { noRadar: true });
        this.addBlock(4.1, 11.55, 0, 0.4, 1.0, 212, btsConcreteMat, false, false, { noRadar: true });
        this.addBlock(-4.35, 10.55, 0, 0.14, 0.45, 212, steelMat, false, false, { noRadar: true });
        this.addBlock(4.35, 10.55, 0, 0.14, 0.45, 212, steelMat, false, false, { noRadar: true });

        for (const pz of [-84, -60, -32, -19, 19, 32, 60, 84]) {
            this.addBlock(0, 0, pz, 2.7, 0.65, 2.7, roofMat);
            this.addBlock(0, 0.65, pz, 2.35, 9.55, 2.35, btsConcreteMat);
            this.addBlock(0, 8.8, pz, 7.6, 1.4, 2.2, btsConcreteMat, false, false, { noRadar: true });
        }
        for (const bz of [-72, -48, -25, 25, 48, 72]) {
            this.addConcreteBarrier(0, bz, Math.PI / 2);
        }

        // Static 2-Car BTS Skytrain Overhead with Aerodynamic Cabs & Headlights
        const btsTrainMat = this.makeTexMat('#f8fafc', (ctx) => {
            ctx.fillStyle = '#dc2626'; ctx.fillRect(0, 320, 512, 48);
            ctx.fillStyle = '#1e3a8a'; ctx.fillRect(0, 368, 512, 64);
            for (let x = 24; x < 490; x += 64) {
                ctx.fillStyle = '#0f172a'; ctx.fillRect(x, 120, 44, 140);
                ctx.fillStyle = '#bae6fd'; ctx.fillRect(x + 4, 126, 36, 128);
            }
        }, 1, { roughness: 0.28, metalness: 0.45 });
        btsTrainMat.userData = { noTileRepeat: true };
        this.addBlock(0, 11.65, -12, 3.6, 3.2, 20, btsTrainMat, false, false, { noRadar: true });
        this.addBlock(0, 11.65, 12, 3.6, 3.2, 20, btsTrainMat, false, false, { noRadar: true });
        // Sloped front & rear BTS driver noses with LED headlights
        this.addOrientedPart(0, 11.65, 22.4, 0, 0, 0, 0, 3.4, 2.9, 1.6, new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.25 }), { rotX: -0.22, collider: false, shootable: false });
        this.addOrientedPart(0, 11.65, -22.4, 0, 0, 0, 0, 3.4, 2.9, 1.6, new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.25 }), { rotX: 0.22, collider: false, shootable: false });
        this.addOrientedPart(-1.0, 12.1, 23.25, 0, 0, 0, 0, 0.5, 0.25, 0.1, new THREE.MeshBasicMaterial({ color: 0xfffbeb }), { collider: false, shootable: false });
        this.addOrientedPart(1.0, 12.1, 23.25, 0, 0, 0, 0, 0.5, 0.25, 0.1, new THREE.MeshBasicMaterial({ color: 0xfffbeb }), { collider: false, shootable: false });

        const skywalkAdMat = this.makeSignMaterial('BANGKOK, THAILAND • กรุงเทพฯ', '#1e3a8a', '#facc15', '#dc2626', true);
        this.addBangkokSkywalk(44, 1, btsConcreteMat, steelMat, skywalkAdMat);
        this.addBangkokSkywalk(-44, -1, btsConcreteMat, steelMat, skywalkAdMat);

        this.addRoadGantrySign(68, steelMat, 'THAILAND | สุขุมวิท - อโศก - สยาม');
        this.addRoadGantrySign(-68, steelMat, 'BANGKOK | สีลม - อนุสาวรีย์ฯ - BKK');

        // =====================================================================
        // 2. ENTERABLE BANGKOK SHOPHOUSES, 24H MART, POLICE, BANK & SKYSCRAPERS
        // =====================================================================
        this.buildBangkokBuilding({
            x: -40, z: 38, w: 18, d: 20, h: 4.6, upperH: 6.2,
            wallMat: shophouseCream, upperMat: upperShophouseMat, roofMat, crateMat: shelfCrateMat, counterMat,
            openSides: ['N', 'S', 'E', 'W'], colonnadeSide: 'E', interiorMode: 'aisles', awningMat: shopAwningRed,
            signText: '24H MART • สุขุมวิท 24', signBg: '#064e3b', signFg: '#fde047', signAccent: '#f97316'
        });
        this.buildBangkokBuilding({
            x: -40, z: 76, w: 18, d: 22, h: 4.6, upperH: 7.4,
            wallMat: shophouseTerra, upperMat: upperShophouseMat, roofMat, crateMat: shelfCrateMat, counterMat,
            openSides: ['N', 'S', 'E', 'W'], colonnadeSide: 'E', interiorMode: 'shophouse', awningMat: shopAwningBlue,
            signText: 'ก๋วยเตี๋ยวเรือ • ตึกแถว', signBg: '#7f1d1d', signFg: '#fef08a', signAccent: '#facc15'
        });
        this.buildBangkokBuilding({
            x: -40, z: -38, w: 18, d: 20, h: 4.6, upperH: 6.8,
            wallMat: shophouseTerra, upperMat: upperShophouseMat, roofMat, crateMat: shelfCrateMat, counterMat,
            openSides: ['N', 'S', 'E', 'W'], colonnadeSide: 'E', interiorMode: 'shophouse', awningMat: shopAwningRed,
            signText: 'กาแฟโบราณ • SIAM CAFE', signBg: '#451a03', signFg: '#fde68a', signAccent: '#d97706'
        });
        this.buildBangkokBuilding({
            x: -40, z: -76, w: 18, d: 22, h: 4.8, upperH: 5.0,
            wallMat: concreteWallMat, upperMat: concreteWallMat, roofMat, crateMat: shelfCrateMat, counterMat,
            openSides: ['N', 'S', 'E', 'W'], doorW: 5.4, colonnadeSide: 'E', interiorMode: 'garage',
            signText: 'อู่ซ่อมรถ • BKK AUTO', signBg: '#1e293b', signFg: '#fb923c', signAccent: '#38bdf8'
        });

        this.buildBangkokBuilding({
            x: 40, z: -38, w: 18, d: 20, h: 4.6, upperH: 6.2,
            wallMat: shophouseCream, upperMat: upperShophouseMat, roofMat, crateMat: shelfCrateMat, counterMat,
            openSides: ['N', 'S', 'E', 'W'], colonnadeSide: 'W', interiorMode: 'aisles', awningMat: shopAwningBlue,
            signText: '24H PHARMACY • BKK', signBg: '#1e3a8a', signFg: '#ffffff', signAccent: '#22c55e'
        });
        this.buildBangkokBuilding({
            x: 40, z: -76, w: 18, d: 22, h: 4.8, upperH: 20.0, isSkyscraper: true,
            wallMat: concreteWallMat, upperMat: warmTowerMat, roofMat, crateMat: shelfCrateMat, counterMat,
            openSides: ['N', 'S', 'E', 'W'], colonnadeSide: 'W', interiorMode: 'lobby',
            signText: 'SILOM CONDO • สีลม', signBg: '#0f172a', signFg: '#38bdf8', signAccent: '#fbbf24'
        });
        this.buildBangkokBuilding({
            x: 40, z: 38, w: 18, d: 20, h: 4.6, upperH: 6.0,
            wallMat: concreteWallMat, upperMat: concreteWallMat, roofMat, crateMat: shelfCrateMat, counterMat,
            openSides: ['N', 'S', 'E', 'W'], colonnadeSide: 'W', interiorMode: 'police',
            signText: 'สน. อโศก • POLICE 191', signBg: '#7f1d1d', signFg: '#ffffff', signAccent: '#2563eb'
        });
        this.buildBangkokBuilding({
            x: 40, z: 76, w: 18, d: 22, h: 4.6, upperH: 7.4,
            wallMat: shophouseCream, upperMat: upperShophouseMat, roofMat, crateMat: shelfCrateMat, counterMat,
            openSides: ['N', 'S', 'E', 'W'], colonnadeSide: 'W', interiorMode: 'shophouse', awningMat: shopAwningRed,
            signText: 'ฮาร์ดแวร์ • สุขุมวิท', signBg: '#1e293b', signFg: '#facc15', signAccent: '#ef4444'
        });

        this.buildBangkokBuilding({
            x: 90, z: -35, w: 20, d: 22, h: 5.0, upperH: 12.0,
            wallMat: bankMarbleMat, upperMat: bankMarbleMat, roofMat, crateMat: shelfCrateMat, counterMat,
            openSides: ['N', 'S', 'W'], doorW: 5.0, colonnadeSide: 'S', interiorMode: 'bank',
            signText: 'ธนาคารสยาม • SIAM BANK', signBg: '#1e3a8a', signFg: '#fde047', signAccent: '#f8fafc', signSide: 'S'
        });
        this.buildBangkokBuilding({
            x: 95, z: 2, w: 16, d: 22, h: 5.0, upperH: 16.0, isSkyscraper: true,
            wallMat: bankMarbleMat, upperMat: glassTowerMat, roofMat, crateMat: shelfCrateMat, counterMat,
            openSides: ['N', 'S', 'W'], doorW: 5.2, colonnadeSide: 'W', interiorMode: 'lobby',
            signText: 'SIAM PLAZA MALL', signBg: '#0f172a', signFg: '#f472b6', signAccent: '#38bdf8'
        });

        this.buildBangkokBuilding({
            x: -92, z: -2, w: 16, d: 22, h: 4.8, upperH: 4.2,
            wallMat: concreteWallMat, upperMat: btsConcreteMat, roofMat, crateMat: shelfCrateMat, counterMat,
            openSides: ['N', 'S', 'E'], doorW: 5.0, colonnadeSide: 'E', interiorMode: 'terminal',
            signText: 'ท่ารถ ขสมก. • TERMINAL', signBg: '#9a3412', signFg: '#fef08a', signAccent: '#ffffff'
        });
        this.buildBangkokBuilding({
            x: -82, z: -38, w: 22, d: 20, h: 4.8, upperH: 26.0, isSkyscraper: true,
            wallMat: shophouseCream, upperMat: warmTowerMat, roofMat, crateMat: shelfCrateMat, counterMat,
            openSides: ['N', 'S', 'E', 'W'], colonnadeSide: 'E', interiorMode: 'lobby',
            signText: 'ASOKE RESIDENCE • อโศก', signBg: '#1e293b', signFg: '#fde047', signAccent: '#10b981'
        });

        const cornerTowers = [
            { x: -86, z: -78, upperH: 30, uMat: glassTowerMat, sign: 'BANGKOK TOWER W', side: 'E' },
            { x: -86, z: 78, upperH: 26, uMat: warmTowerMat, sign: 'THAILAND PLAZA S', side: 'E' },
            { x: 86, z: -78, upperH: 36, uMat: glassTowerMat, sign: 'MAHANAKHON SKY', side: 'W' },
            { x: 86, z: 78, upperH: 28, uMat: warmTowerMat, sign: 'HOTEL BANGKOK', side: 'W' }
        ];
        for (const ct of cornerTowers) {
            this.buildBangkokBuilding({
                x: ct.x, z: ct.z, w: 24, d: 24, h: 4.8, upperH: ct.upperH, isSkyscraper: true,
                wallMat: concreteWallMat, upperMat: ct.uMat, roofMat, crateMat: shelfCrateMat, counterMat,
                openSides: ['N', 'S', 'E', 'W'], doorW: 4.8, interiorMode: 'lobby',
                signText: ct.sign, signBg: '#020617', signFg: '#38bdf8', signAccent: '#facc15', signSide: ct.side
            });
        }

        // =====================================================================
        // 3. DETAILED 3D VEHICLES ON THE ROADS (TAXIS, TUK-TUKS, BUSES, VANS, TRUCKS)
        // =====================================================================
        const pal = this.createBangkokVehiclePalette();
        this.addThaiVehicle('sedan', -42.5, -76, 0, pal, pal.blue);

        const southTraffic = [
            ['taxi_green', -8, 76, 0],
            ['tuktuk', -16, 72, 0],
            ['pickup', 9, 77, Math.PI],
            ['taxi_pink', 16, 68, Math.PI],
            ['bus_red', -17, 56, 0],
            ['van', -7, 52, 0],
            ['truck', 15, 55, Math.PI],
            ['tuktuk', 7, 48, Math.PI],
            ['taxi_pink', -13, 32, 0],
            ['sedan', -6, 25, 0, pal.charcoal],
            ['bus_orange', 15, 30, Math.PI],
            ['tuktuk', 7, 23, Math.PI]
        ];
        const northTraffic = [
            ['taxi_green', 8, -76, Math.PI],
            ['tuktuk', 16, -72, Math.PI],
            ['pickup', -9, -77, 0, pal.charcoal],
            ['taxi_pink', -16, -68, 0],
            ['bus_red', 17, -56, Math.PI],
            ['van', 7, -52, Math.PI],
            ['truck', -15, -55, 0],
            ['tuktuk', -7, -48, 0],
            ['taxi_green', 13, -32, Math.PI],
            ['sedan', 6, -25, Math.PI, pal.silver],
            ['bus_orange', -15, -30, 0],
            ['tuktuk', -7, -23, 0]
        ];
        const crossTraffic = [
            ['tuktuk', -11, -7, Math.PI / 2],
            ['taxi_pink', 11, 7, -Math.PI / 2],
            ['pickup', -14, 9, Math.PI / 2],
            ['taxi_green', 14, -9, -Math.PI / 2],
            ['bus_red', -38, -7, Math.PI / 2],
            ['truck', -52, 8, Math.PI / 2],
            ['tuktuk', -40, 8, -Math.PI / 2],
            ['taxi_pink', -74, -8, Math.PI / 2],
            ['van', -81, 7, -Math.PI / 2],
            ['bus_orange', 38, 7, -Math.PI / 2],
            ['truck', 52, -8, -Math.PI / 2],
            ['tuktuk', 40, -8, Math.PI / 2],
            ['taxi_green', 74, 8, -Math.PI / 2],
            ['sedan', 81, -7, Math.PI / 2, pal.navy],
            ['tuktuk', -54, 64, 0],
            ['foodcart', -57, 25, Math.PI / 2, pal.awningRed],
            ['foodcart', 57, -25, -Math.PI / 2, pal.awningBlue],
            ['van', 76, -22, Math.PI / 2]
        ];

        for (const [vType, vx, vz, vRot, vCol] of [...southTraffic, ...northTraffic, ...crossTraffic]) {
            this.addThaiVehicle(vType, vx, vz, vRot, pal, vCol || null);
        }

        // =====================================================================
        // 4. NIGHT MARKET STALLS, SIAM PLAZA & TACTICAL HIDING CORNERS
        // =====================================================================
        const marketStalls = [
            [-88, 30, 0, pal.awningRed], [-76, 30, Math.PI, pal.awningBlue], [-64, 30, 0, pal.awningGreen],
            [-88, 43, Math.PI, pal.awningGreen], [-76, 43, 0, pal.awningRed], [-64, 43, Math.PI, pal.awningBlue]
        ];
        for (const [mx, mz, mRot, mMat] of marketStalls) {
            this.addNightMarketStall(mx, mz, mRot, mMat, counterMat, shelfCrateMat, steelMat);
        }
        this.addThaiVehicle('foodcart', -70, 36.5, 0, pal, pal.awningRed);
        this.addThaiVehicle('tuktuk', -82, 36.5, Math.PI / 2, pal);

        this.buildBangkokBuilding({
            x: 82, z: 37, w: 12, d: 11, h: 3.8, upperH: 0,
            wallMat: shophouseCream, roofMat, crateMat: shelfCrateMat, counterMat,
            openSides: ['N', 'S', 'E', 'W'], doorW: 3.4, interiorMode: 'shophouse',
            signText: 'SIAM COFFEE • กาแฟ', signBg: '#1e293b', signFg: '#fde68a', signSide: 'W'
        });
        this.addBlock(66, 0, 32, 5.2, 1.45, 1.1, btsConcreteMat, true);
        this.addBlock(64, 0, 35, 1.1, 1.45, 5.0, btsConcreteMat, true);
        this.addBlock(69, 0, 44, 5.2, 1.45, 1.1, btsConcreteMat, true);
        this.addContainerProp(94, 46, 6.2, 2.6, 2.6, Math.PI / 2, 0x0f766e, 'BKK-PLZ');

        this.addConcreteBarrier(62, -16, 0);
        this.addConcreteBarrier(73, -6, Math.PI / 2);
        this.addBlock(74, 0, -17, 2.0, 2.2, 2.0, shelfCrateMat, true);
        this.addBarrelProp(63, -7, 0xd97706, true);

        this.addConcreteBarrier(-62, 16, 0);
        this.addConcreteBarrier(-73, 6, Math.PI / 2);
        this.addBlock(-74, 0, 17, 2.0, 2.2, 2.0, shelfCrateMat, true);
        this.addBarrelProp(-63, 7, 0x1d4ed8, false);

        this.addConcreteBarrier(-7, 86, 0);
        this.addConcreteBarrier(7, 86, 0);
        this.addConcreteBarrier(-7, -86, 0);
        this.addConcreteBarrier(7, -86, 0);

        // =====================================================================
        // 5. BUS SHELTERS, ORGANIC TREES, TRASH BINS, POLES & STREETLAMPS
        // =====================================================================
        this.addBusShelter(-23.5, 68, concreteWallMat, roofMat, 'ป้ายรถเมล์ • BUS STOP');
        this.addBusShelter(23.5, -68, concreteWallMat, roofMat, 'ป้ายรถเมล์ • BUS STOP');
        this.addBusShelter(-23.5, -24, concreteWallMat, roofMat, 'สยาม • SIAM STATION');
        this.addBusShelter(23.5, 24, concreteWallMat, roofMat, 'อโศก • ASOKE STATION');

        this.addThaiFlagPole(30, -21, steelMat);
        this.addThaiFlagPole(-30, 21, steelMat);

        const treeCoords = [
            [-28.5, 22], [28.5, -22], [-28.5, -22], [28.5, 22],
            [-62, -22], [62, 22], [-62, 56], [62, -56],
            [-29.5, 90], [29.5, -90], [-29.5, -90], [29.5, 90]
        ];
        for (const [tx, tz] of treeCoords) {
            this.addBangkokTree(tx, tz, btsConcreteMat, trunkMat, leafMat, leafDarkMat);
        }

        // Green GTM Municipal Sidewalk Trash Bins & Traffic Cones
        const binMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.65 });
        const coneMat = new THREE.MeshStandardMaterial({ color: 0xea580c, roughness: 0.65 });
        for (const [bx, bz] of [[-23.5, 34], [23.5, 34], [-23.5, -34], [23.5, -34], [-23.5, 76], [23.5, -76]]) {
            this.addBlock(bx, 0, bz, 0.58, 0.95, 0.58, binMat, true);
        }
        for (const [cx, cz] of [[-20.5, 84], [20.5, 84], [-20.5, -84], [20.5, -84], [-21.2, 20], [21.2, -20]]) {
            const cone = new THREE.Mesh(new THREE.ConeGeometry(0.24, 0.72, 10), coneMat);
            cone.position.set(cx, 0.36, cz);
            cone.castShadow = true;
            this.scene.add(cone);
            this.mapObjects.push(cone);
        }

        this.addBangkokUtilityPoles(-23.2, [-88, -62, -34, -18, 18, 34, 62, 88], btsConcreteMat, wireMat);
        this.addBangkokUtilityPoles(23.2, [-88, -62, -34, -18, 18, 34, 62, 88], btsConcreteMat, wireMat);

        const soiClusters = [
            [-54, -40, 2], [54, 40, 2], [-54, 92, 0], [54, -92, 0],
            [-36, 56, 2], [36, -56, 2], [-72, -56, 1], [72, 56, 1]
        ];
        soiClusters.forEach(([cx, cz, v], idx) => {
            this.buildHideCluster(cx, cz, concreteWallMat, shelfCrateMat, idx % 2 === 0 ? 0x0f766e : 0xb45309, `SOI-${idx + 1}`, v);
        });

        for (const [lx, lz] of [[-22.8, 76], [22.8, 76], [-22.8, 28], [22.8, 28], [-22.8, -28], [22.8, -28], [-22.8, -76], [22.8, -76]]) {
            this.addBangkokStreetLamp(lx, lz, steelMat);
        }
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
        const bgKey = `${this.currentMapId}_${width}x${height}_${this.colliders.length}`;
        if (!this._radarBgCanvas || this._radarBgKey !== bgKey) {
            if (!this._radarBgCanvas) {
                this._radarBgCanvas = document.createElement('canvas');
            }
            this._radarBgCanvas.width = width;
            this._radarBgCanvas.height = height;
            const bctx = this._radarBgCanvas.getContext('2d');
            bctx.clearRect(0, 0, width, height);
            bctx.fillStyle = 'rgba(10, 14, 20, 0.94)';
            bctx.fillRect(0, 0, width, height);

            const scale = width / this.mapSize;
            const toX = (wx) => (wx + this.mapSize / 2) * scale;
            const toY = (wz) => (wz + this.mapSize / 2) * scale;

            if (this.currentMapId === 'de_bangkok_thailand') {
                bctx.fillStyle = 'rgba(30, 41, 59, 0.72)';
                bctx.fillRect(toX(-22), 0, 44 * scale, height);
                bctx.fillRect(0, toY(-16), width, 32 * scale);
                bctx.fillStyle = 'rgba(250, 204, 21, 0.35)';
                bctx.fillRect(toX(-0.6), 0, 1.2 * scale, height);
                bctx.fillRect(0, toY(-0.5), width, 1.0 * scale);
            }

            bctx.fillStyle = 'rgba(148, 163, 184, 0.38)';
            for (const c of this.colliders) {
                if (c.noRadar) continue;
                const rx = toX(c.minX);
                const ry = toY(c.minZ);
                const rw = (c.maxX - c.minX) * scale;
                const rh = (c.maxZ - c.minZ) * scale;
                bctx.fillRect(rx, ry, rw, rh);
            }

            for (const key of ['A', 'B']) {
                const site = this.bombsites[key];
                if (!site) continue;
                const sx = toX(site.x);
                const sy = toY(site.z);
                bctx.strokeStyle = '#ef4444';
                bctx.lineWidth = 1.5;
                bctx.strokeRect(sx - 8, sy - 8, 16, 16);
                bctx.fillStyle = '#fca5a5';
                bctx.font = 'bold 10px sans-serif';
                bctx.textAlign = 'center';
                bctx.fillText(key, sx, sy + 3.5);
            }
            this._radarBgKey = bgKey;
        }

        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(this._radarBgCanvas, 0, 0);

        const scale = width / this.mapSize;
        const toRadarX = (wx) => (wx + this.mapSize / 2) * scale;
        const toRadarY = (wz) => (wz + this.mapSize / 2) * scale;

        // Draw Active Planted C4
        if (bombState && bombState.planted) {
            const bx = toRadarX(bombState.x);
            const by = toRadarY(bombState.z);
            ctx.fillStyle = (Math.floor(Date.now() / 250) % 2 === 0) ? '#ef4444' : '#fde047';
            ctx.beginPath();
            ctx.arc(bx, by, 5, 0, Math.PI * 2);
            ctx.fill();
        }

        // Draw Teammates Only (Strictly Same Team as Local Player)
        if (localPlayer) {
            const seenTeammates = new Set();
            for (const ent of entities) {
                if (ent.hp <= 0) continue;
                if (ent.team !== localPlayer.team) continue;
                if (ent.name === localPlayer.name || seenTeammates.has(ent.name)) continue;
                seenTeammates.add(ent.name);

                const ex = toRadarX(ent.x);
                const ey = toRadarY(ent.z);
                ctx.fillStyle = ent.team === 'T' ? '#fbbf24' : '#38bdf8';

                ctx.beginPath();
                ctx.arc(ex, ey, 3.4, 0, Math.PI * 2);
                ctx.fill();
            }
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
