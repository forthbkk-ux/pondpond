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

    const setSRGB = (tex) => {
        if (THREE.sRGBEncoding !== undefined) tex.encoding = THREE.sRGBEncoding;
        tex.anisotropy = 4;
        return tex;
    };

    // 1. Terrorist Light-Gray Tactical Vest Texture (512x512 HD with MOLLE & seams)
    const tVestCanvas = document.createElement('canvas');
    tVestCanvas.width = 512;
    tVestCanvas.height = 512;
    const tvCtx = tVestCanvas.getContext('2d');
    const tvGrad = tvCtx.createLinearGradient(0, 0, 512, 512);
    tvGrad.addColorStop(0, '#969890');
    tvGrad.addColorStop(0.5, '#858780');
    tvGrad.addColorStop(1, '#6e706a');
    tvCtx.fillStyle = tvGrad;
    tvCtx.fillRect(0, 0, 512, 512);
    tvCtx.fillStyle = 'rgba(0,0,0,0.07)';
    for (let y = 0; y < 512; y += 4) tvCtx.fillRect(0, y, 512, 1.5);
    tvCtx.fillStyle = '#2d3033';
    tvCtx.fillRect(45, 0, 70, 180);
    tvCtx.fillRect(397, 0, 70, 180);
    tvCtx.strokeStyle = '#3c3f42';
    tvCtx.lineWidth = 7;
    tvCtx.strokeRect(35, 160, 442, 310);
    for (let y = 195; y < 440; y += 42) {
        tvCtx.fillStyle = '#686a64';
        tvCtx.fillRect(48, y, 416, 13);
        tvCtx.fillStyle = '#454743';
        tvCtx.fillRect(48, y + 13, 416, 3);
        for (let x = 75; x < 450; x += 55) {
            tvCtx.fillRect(x, y - 2, 4, 17);
        }
    }
    const tVestTex = setSRGB(new THREE.CanvasTexture(tVestCanvas));

    // 2. Terrorist Dusty-Pink Collared Shirt Fabric Texture
    const tShirtCanvas = document.createElement('canvas');
    tShirtCanvas.width = 256;
    tShirtCanvas.height = 256;
    const tsCtx = tShirtCanvas.getContext('2d');
    const tsGrad = tsCtx.createLinearGradient(0, 0, 256, 256);
    tsGrad.addColorStop(0, '#dcb0b5');
    tsGrad.addColorStop(0.5, '#c9989e');
    tsGrad.addColorStop(1, '#ae7d83');
    tsCtx.fillStyle = tsGrad;
    tsCtx.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 16; i++) {
        tsCtx.fillStyle = i % 2 === 0 ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)';
        tsCtx.fillRect(0, i * 16, 256, 5);
    }
    const tShirtTex = setSRGB(new THREE.CanvasTexture(tShirtCanvas));

    // 3. Terrorist Dark Olive Cargo Pants Texture
    const tPantsCanvas = document.createElement('canvas');
    tPantsCanvas.width = 256;
    tPantsCanvas.height = 256;
    const tpCtx = tPantsCanvas.getContext('2d');
    const tpGrad = tpCtx.createLinearGradient(0, 0, 256, 256);
    tpGrad.addColorStop(0, '#4a4d45');
    tpGrad.addColorStop(0.5, '#3d4039');
    tpGrad.addColorStop(1, '#2d302a');
    tpCtx.fillStyle = tpGrad;
    tpCtx.fillRect(0, 0, 256, 256);
    tpCtx.fillStyle = 'rgba(0,0,0,0.18)';
    tpCtx.fillRect(126, 0, 3, 256);
    tpCtx.fillRect(20, 115, 216, 3);
    tpCtx.fillRect(30, 125, 196, 3);
    const tPantsTex = setSRGB(new THREE.CanvasTexture(tPantsCanvas));

    // 4. CT FBI Black Plate Carrier Chest Patch Texture (512x256 "FBI")
    const fbiPatchCanvas = document.createElement('canvas');
    fbiPatchCanvas.width = 512;
    fbiPatchCanvas.height = 256;
    const fpCtx = fbiPatchCanvas.getContext('2d');
    fpCtx.fillStyle = '#181c22';
    fpCtx.fillRect(0, 0, 512, 256);
    fpCtx.strokeStyle = '#38404a';
    fpCtx.lineWidth = 8;
    fpCtx.strokeRect(8, 8, 496, 240);
    fpCtx.fillStyle = '#facc15';
    fpCtx.font = '900 166px "Arial Black", Impact, sans-serif';
    fpCtx.textAlign = 'center';
    fpCtx.textBaseline = 'middle';
    fpCtx.fillText('FBI', 256, 134);
    const fbiChestTex = setSRGB(new THREE.CanvasTexture(fbiPatchCanvas));

    // 5. CT FBI Cap Front Crown Patch Texture (256x128 "FBI")
    const fbiCapCanvas = document.createElement('canvas');
    fbiCapCanvas.width = 256;
    fbiCapCanvas.height = 128;
    const fcCtx = fbiCapCanvas.getContext('2d');
    fcCtx.fillStyle = '#222a32';
    fcCtx.fillRect(0, 0, 256, 128);
    fcCtx.fillStyle = '#facc15';
    fcCtx.font = '900 86px "Arial Black", Impact, sans-serif';
    fcCtx.textAlign = 'center';
    fcCtx.textBaseline = 'middle';
    fcCtx.fillText('FBI', 128, 68);
    const fbiCapTex = setSRGB(new THREE.CanvasTexture(fbiCapCanvas));

    // 6. CT Royal Blue FBI Jacket Texture
    const ctJacketCanvas = document.createElement('canvas');
    ctJacketCanvas.width = 256;
    ctJacketCanvas.height = 256;
    const cjCtx = ctJacketCanvas.getContext('2d');
    const cjGrad = cjCtx.createLinearGradient(0, 0, 256, 256);
    cjGrad.addColorStop(0, '#3466b0');
    cjGrad.addColorStop(0.5, '#275191');
    cjGrad.addColorStop(1, '#1c3d72');
    cjCtx.fillStyle = cjGrad;
    cjCtx.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 12; i++) {
        cjCtx.fillStyle = i % 2 === 0 ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.05)';
        cjCtx.fillRect(0, i * 21, 256, 6);
    }
    const ctJacketTex = setSRGB(new THREE.CanvasTexture(ctJacketCanvas));

    // 7. CT Dark Slate-Denim Jeans/Trousers Texture
    const ctPantsCanvas = document.createElement('canvas');
    ctPantsCanvas.width = 256;
    ctPantsCanvas.height = 256;
    const cpCtx = ctPantsCanvas.getContext('2d');
    const cpGrad = cpCtx.createLinearGradient(0, 0, 256, 256);
    cpGrad.addColorStop(0, '#435666');
    cpGrad.addColorStop(0.5, '#354552');
    cpGrad.addColorStop(1, '#26333d');
    cpCtx.fillStyle = cpGrad;
    cpCtx.fillRect(0, 0, 256, 256);
    cpCtx.fillStyle = 'rgba(0,0,0,0.20)';
    cpCtx.fillRect(126, 0, 3, 256);
    cpCtx.fillRect(25, 120, 206, 3);
    const ctPantsTex = setSRGB(new THREE.CanvasTexture(ctPantsCanvas));

    // 8. Terrorist 3-Hole Knitted Balaclava Head Texture (512x512)
    const tHeadCanvas = document.createElement('canvas');
    tHeadCanvas.width = 512;
    tHeadCanvas.height = 512;
    const thCtx = tHeadCanvas.getContext('2d');
    const thGrad = thCtx.createLinearGradient(0, 0, 0, 512);
    thGrad.addColorStop(0, '#45352b');
    thGrad.addColorStop(0.5, '#382a22');
    thGrad.addColorStop(1, '#281d17');
    thCtx.fillStyle = thGrad;
    thCtx.fillRect(0, 0, 512, 512);
    thCtx.fillStyle = 'rgba(0,0,0,0.16)';
    for (let x = 0; x < 512; x += 4) thCtx.fillRect(x, 0, 2, 512);
    for (let y = 0; y < 512; y += 5) thCtx.fillRect(0, y, 512, 2);
    const drawBalaclavaEye = (cx, cy) => {
        thCtx.fillStyle = '#1c130e';
        thCtx.beginPath(); thCtx.ellipse(cx, cy, 22, 13, 0, 0, Math.PI * 2); thCtx.fill();
        thCtx.fillStyle = '#dfa37e';
        thCtx.beginPath(); thCtx.ellipse(cx, cy, 18.5, 10, 0, 0, Math.PI * 2); thCtx.fill();
        thCtx.fillStyle = '#3b2416';
        thCtx.fillRect(cx - 16, cy - 9, 32, 4);
        thCtx.fillStyle = '#f8fafc';
        thCtx.beginPath(); thCtx.ellipse(cx, cy + 1, 12, 5.5, 0, 0, Math.PI * 2); thCtx.fill();
        thCtx.fillStyle = '#241811';
        thCtx.beginPath(); thCtx.arc(cx, cy + 1, 5.2, 0, Math.PI * 2); thCtx.fill();
        thCtx.fillStyle = '#ffffff';
        thCtx.beginPath(); thCtx.arc(cx - 1.8, cy - 0.8, 1.6, 0, Math.PI * 2); thCtx.fill();
    };
    drawBalaclavaEye(223, 238);
    drawBalaclavaEye(289, 238);
    thCtx.fillStyle = '#1c130e';
    thCtx.beginPath(); thCtx.ellipse(256, 309, 23, 12.5, 0, 0, Math.PI * 2); thCtx.fill();
    thCtx.fillStyle = '#d49876';
    thCtx.beginPath(); thCtx.ellipse(256, 309, 18.5, 8.5, 0, 0, Math.PI * 2); thCtx.fill();
    thCtx.fillStyle = '#753f31';
    thCtx.fillRect(242, 308, 28, 3);
    const tHeadTex = setSRGB(new THREE.CanvasTexture(tHeadCanvas));

    // 9. CT FBI Operator Face Texture (512x512)
    const ctHeadCanvas = document.createElement('canvas');
    ctHeadCanvas.width = 512;
    ctHeadCanvas.height = 512;
    const chCtx = ctHeadCanvas.getContext('2d');
    const skinGrad = chCtx.createLinearGradient(0, 0, 0, 512);
    skinGrad.addColorStop(0, '#dfa07c');
    skinGrad.addColorStop(0.55, '#d89672');
    skinGrad.addColorStop(1, '#b87654');
    chCtx.fillStyle = skinGrad;
    chCtx.fillRect(0, 0, 512, 512);
    chCtx.fillStyle = 'rgba(58, 38, 28, 0.25)';
    chCtx.beginPath(); chCtx.ellipse(256, 320, 70, 55, 0, 0, Math.PI * 2); chCtx.fill();
    chCtx.fillStyle = '#472e1e';
    chCtx.fillRect(202, 215, 38, 6);
    chCtx.fillRect(272, 215, 38, 6);
    chCtx.fillStyle = 'rgba(62, 40, 28, 0.45)';
    chCtx.fillRect(233, 297, 46, 8);
    chCtx.fillStyle = '#8c4c3c';
    chCtx.fillRect(236, 307, 40, 5.5);
    chCtx.fillStyle = '#54281c';
    chCtx.fillRect(238, 309, 36, 2);
    const ctHeadTex = setSRGB(new THREE.CanvasTexture(ctHeadCanvas));

    _cachedCharTextures = {
        tVestTex, tShirtTex, tPantsTex,
        fbiChestTex, fbiCapTex, ctJacketTex, ctPantsTex,
        tHeadTex, ctHeadTex
    };
    return _cachedCharTextures;
}

let _cachedCharMaterials = null;
function getCharacterMaterials() {
    if (_cachedCharMaterials) return _cachedCharMaterials;
    const tx = getCharacterTextures();
    const srgb = (hex) => {
        const c = new THREE.Color(hex);
        return (typeof c.convertSRGBToLinear === 'function') ? c.convertSRGBToLinear() : c;
    };
    _cachedCharMaterials = {
        skinMat: new THREE.MeshStandardMaterial({ color: srgb(0xdfa582), roughness: 0.54, metalness: 0.04 }),
        gunMat: new THREE.MeshStandardMaterial({ color: srgb(0x22272e), roughness: 0.32, metalness: 0.45 }),
        gunWoodMat: new THREE.MeshStandardMaterial({ color: srgb(0x7c3618), roughness: 0.42, metalness: 0.08 }),
        t: {
            balaclavaHeadMat: new THREE.MeshStandardMaterial({ map: tx.tHeadTex, roughness: 0.78, metalness: 0.04 }),
            balaclavaPlainMat: new THREE.MeshStandardMaterial({ color: srgb(0x3a2c24), roughness: 0.80, metalness: 0.04 }),
            pinkShirtMat: new THREE.MeshStandardMaterial({ map: tx.tShirtTex, roughness: 0.74, metalness: 0.04 }),
            grayVestMat: new THREE.MeshStandardMaterial({ map: tx.tVestTex, roughness: 0.68, metalness: 0.08 }),
            darkStrapMat: new THREE.MeshStandardMaterial({ color: srgb(0x2b2e33), roughness: 0.68, metalness: 0.12 }),
            leatherPouchMat: new THREE.MeshStandardMaterial({ color: srgb(0x5e3820), roughness: 0.52, metalness: 0.12 }),
            cargoPantsMat: new THREE.MeshStandardMaterial({ map: tx.tPantsTex, roughness: 0.78, metalness: 0.05 }),
            brownBootMat: new THREE.MeshStandardMaterial({ color: srgb(0x543824), roughness: 0.48, metalness: 0.16 }),
            gloveMat: new THREE.MeshStandardMaterial({ color: srgb(0x1f2227), roughness: 0.62, metalness: 0.12 })
        },
        ct: {
            ctFaceMat: new THREE.MeshStandardMaterial({ map: tx.ctHeadTex, roughness: 0.54, metalness: 0.04 }),
            blueJacketMat: new THREE.MeshStandardMaterial({ map: tx.ctJacketTex, roughness: 0.65, metalness: 0.08 }),
            blackVestMat: new THREE.MeshStandardMaterial({ color: srgb(0x1f242b), roughness: 0.58, metalness: 0.16 }),
            pouchGrayMat: new THREE.MeshStandardMaterial({ color: srgb(0x323942), roughness: 0.60, metalness: 0.14 }),
            fbiChestMat: new THREE.MeshStandardMaterial({ map: tx.fbiChestTex, roughness: 0.48, metalness: 0.12, side: THREE.DoubleSide }),
            fbiCapFrontMat: new THREE.MeshStandardMaterial({ map: tx.fbiCapTex, roughness: 0.58, metalness: 0.08, side: THREE.DoubleSide }),
            capDarkMat: new THREE.MeshStandardMaterial({ color: srgb(0x222a32), roughness: 0.68, metalness: 0.08, side: THREE.DoubleSide }),
            denimPantsMat: new THREE.MeshStandardMaterial({ map: tx.ctPantsTex, roughness: 0.76, metalness: 0.06 }),
            grayBootMat: new THREE.MeshStandardMaterial({ color: srgb(0x3a3f45), roughness: 0.52, metalness: 0.18 }),
            grayGloveMat: new THREE.MeshStandardMaterial({ color: srgb(0x525a64), roughness: 0.62, metalness: 0.10 }),
            goldBadgeMat: new THREE.MeshStandardMaterial({ color: srgb(0xfacc15), roughness: 0.22, metalness: 0.65 }),
            sunglassLensMat: new THREE.MeshStandardMaterial({ color: srgb(0x0c2630), roughness: 0.10, metalness: 0.78 }),
            glassFrameMat: new THREE.MeshStandardMaterial({ color: srgb(0x111418), roughness: 0.3 })
        }
    };
    return _cachedCharMaterials;
}

function createCharacterMesh(team, name, isAlly = false) {
    const group = new THREE.Group();
    const isT = team === 'T';
    const mats = getCharacterMaterials();
    const { skinMat, gunMat, gunWoodMat } = mats;

    const buildConnectedLimb = (p1, p2, rTop, rBot, mat, addEndSphere = true) => {
        const limbGroup = new THREE.Group();
        const v1 = new THREE.Vector3(...p1);
        const v2 = new THREE.Vector3(...p2);
        const dir = new THREE.Vector3().subVectors(v2, v1);
        const len = dir.length();
        const mid = new THREE.Vector3().addVectors(v1, v2).multiplyScalar(0.5);

        const cyl = new THREE.Mesh(new THREE.CylinderGeometry(rBot, rTop, len, 12), mat);
        cyl.position.copy(mid);
        cyl.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
        cyl.userData = { part: 'body' };
        limbGroup.add(cyl);

        const j1 = new THREE.Mesh(new THREE.SphereGeometry(rTop * 0.98, 10, 8), mat);
        j1.position.copy(v1);
        j1.userData = { part: 'body' };
        limbGroup.add(j1);

        if (addEndSphere) {
            const j2 = new THREE.Mesh(new THREE.SphereGeometry(rBot * 0.98, 10, 8), mat);
            j2.position.copy(v2);
            j2.userData = { part: 'body' };
            limbGroup.add(j2);
        }
        return limbGroup;
    };

    if (isT) {
        // ==================== TERRORIST (รูปที่ 1: Brown Balaclava, Pink Short-Sleeve Shirt, Light-Gray Vest, Brown Waist Pouches, Bare Forearms, Black Gloves, Dark Olive Cargo Pants, Brown Boots) ====================
        const {
            balaclavaHeadMat, balaclavaPlainMat, pinkShirtMat, grayVestMat,
            darkStrapMat, leatherPouchMat, cargoPantsMat, brownBootMat, gloveMat
        } = mats.t;

        // 1. Legs: Textured Dark Olive Cargo Pants + Side Cargo Pockets + Brown Combat Boots
        const buildTLeg = (xOffset, isRight) => {
            const legPivot = new THREE.Group();
            legPivot.position.set(xOffset, 0.84, 0);

            const thigh = new THREE.Mesh(new THREE.CylinderGeometry(0.114, 0.100, 0.38, 16), cargoPantsMat);
            thigh.position.set(0, -0.19, 0);
            thigh.castShadow = true;
            thigh.userData = { part: 'leg' };

            const pocket = new THREE.Mesh(new THREE.BoxGeometry(0.044, 0.145, 0.125), cargoPantsMat);
            pocket.position.set(isRight ? 0.098 : -0.098, -0.20, 0);
            pocket.userData = { part: 'leg' };
            const pocketFlap = new THREE.Mesh(new THREE.BoxGeometry(0.048, 0.035, 0.13), darkStrapMat);
            pocketFlap.position.set(isRight ? 0.099 : -0.099, -0.135, 0);
            pocketFlap.userData = { part: 'leg' };

            const knee = new THREE.Mesh(new THREE.SphereGeometry(0.096, 14, 12), cargoPantsMat);
            knee.position.set(0, -0.38, -0.012);
            knee.userData = { part: 'leg' };

            const calf = new THREE.Mesh(new THREE.CylinderGeometry(0.096, 0.082, 0.36, 16), cargoPantsMat);
            calf.position.set(0, -0.55, 0.01);
            calf.castShadow = true;
            calf.userData = { part: 'leg' };

            const bootAnkle = new THREE.Mesh(new THREE.CylinderGeometry(0.080, 0.084, 0.10, 14), brownBootMat);
            bootAnkle.position.set(0, -0.71, 0.01);
            bootAnkle.userData = { part: 'leg' };

            const bootFoot = new THREE.Mesh(new THREE.BoxGeometry(0.145, 0.10, 0.25), brownBootMat);
            bootFoot.position.set(0, -0.77, -0.035);
            bootFoot.castShadow = true;
            bootFoot.userData = { part: 'leg' };

            const bootSole = new THREE.Mesh(new THREE.BoxGeometry(0.152, 0.025, 0.26), darkStrapMat);
            bootSole.position.set(0, -0.815, -0.035);
            bootSole.userData = { part: 'leg' };

            legPivot.add(thigh, pocket, pocketFlap, knee, calf, bootAnkle, bootFoot, bootSole);
            return legPivot;
        };

        const leftLegGroup = buildTLeg(-0.132, false);
        const rightLegGroup = buildTLeg(0.132, true);

        // 2. Pelvis, Brown Leather Pouch Belt, Pink Collared Shirt & Light-Gray Tactical Vest
        const pelvis = new THREE.Mesh(new THREE.CylinderGeometry(0.195, 0.185, 0.19, 16), cargoPantsMat);
        pelvis.scale.set(1.12, 1, 0.72);
        pelvis.position.set(0, 0.86, 0);
        pelvis.castShadow = true;
        pelvis.userData = { part: 'body' };

        const belt = new THREE.Mesh(new THREE.CylinderGeometry(0.204, 0.204, 0.062, 16), darkStrapMat);
        belt.scale.set(1.14, 1, 0.74);
        belt.position.set(0, 0.95, 0);
        belt.userData = { part: 'body' };

        const pouchPositions = [
            [-0.15, 0.96, -0.135, 0.25],
            [-0.052, 0.96, -0.158, 0.08],
            [0.052, 0.96, -0.158, -0.08],
            [0.15, 0.96, -0.135, -0.25],
            [-0.215, 0.95, -0.01, 1.35],
            [0.215, 0.95, -0.01, -1.35]
        ];
        for (const [px, py, pz, ry] of pouchPositions) {
            const p = new THREE.Mesh(new THREE.BoxGeometry(0.080, 0.105, 0.056), leatherPouchMat);
            p.position.set(px, py, pz);
            p.rotation.y = ry;
            p.userData = { part: 'body' };
            group.add(p);
        }

        // Anatomical Upper Torso + Sloped Shoulder Arch in Pink Shirt
        const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.192, 0.178, 0.48, 16), pinkShirtMat);
        torso.scale.set(1.12, 1, 0.68);
        torso.position.set(0, 1.18, 0);
        torso.castShadow = true;
        torso.userData = { part: 'body' };

        const shoulderArch = new THREE.Mesh(new THREE.SphereGeometry(0.198, 16, 12), pinkShirtMat);
        shoulderArch.scale.set(1.16, 0.42, 0.68);
        shoulderArch.position.set(0, 1.41, 0);
        shoulderArch.userData = { part: 'body' };

        // Light-Gray Tactical Vest
        const vestBody = new THREE.Mesh(new THREE.BoxGeometry(0.385, 0.36, 0.29), grayVestMat);
        vestBody.position.set(0, 1.18, 0);
        vestBody.castShadow = true;
        vestBody.userData = { part: 'body' };

        const strapL = new THREE.Mesh(new THREE.BoxGeometry(0.068, 0.11, 0.265), darkStrapMat);
        strapL.position.set(-0.125, 1.39, 0);
        strapL.userData = { part: 'body' };
        const strapR = new THREE.Mesh(new THREE.BoxGeometry(0.068, 0.11, 0.265), darkStrapMat);
        strapR.position.set(0.125, 1.39, 0);
        strapR.userData = { part: 'body' };

        const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.096, 0.112, 0.07, 14), pinkShirtMat);
        collar.position.set(0, 1.46, 0);
        collar.userData = { part: 'body' };

        // 3. Realistic Human Proportioned Neck & 3-Hole Brown Balaclava Head (1:7.5 Anatomical Scale!)
        const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.068, 0.078, 0.10, 14), balaclavaPlainMat);
        neck.position.set(0, 1.50, 0);
        neck.userData = { part: 'head' };

        const head = new THREE.Mesh(new THREE.SphereGeometry(0.138, 28, 28), balaclavaHeadMat);
        head.scale.set(0.88, 1.12, 0.98);
        head.rotation.y = Math.PI / 2;
        head.position.set(0, 1.645, 0);
        head.castShadow = true;
        head.userData = { part: 'head' };

        const nose = new THREE.Mesh(new THREE.ConeGeometry(0.017, 0.042, 8), balaclavaPlainMat);
        nose.rotation.x = -Math.PI / 2 + 0.2;
        nose.position.set(0, 1.638, -0.138);
        nose.userData = { part: 'head' };

        // 4. Connected Anatomical Arms: Pink Short Sleeves -> Bare Skin Forearms -> Black Gloved Hands
        const shL = [-0.225, 1.35, -0.01];
        const elL = [-0.21, 1.15, -0.17];
        const haL = [-0.02, 1.15, -0.44];

        const shR = [0.225, 1.35, -0.01];
        const elR = [0.23, 1.14, -0.14];
        const haR = [0.11, 1.13, -0.30];

        group.add(buildConnectedLimb(shL, elL, 0.078, 0.068, pinkShirtMat, false));
        group.add(buildConnectedLimb(elL, haL, 0.060, 0.046, skinMat, false));
        group.add(buildConnectedLimb(shR, elR, 0.078, 0.068, pinkShirtMat, false));
        group.add(buildConnectedLimb(elR, haR, 0.060, 0.046, skinMat, false));

        const leftHand = new THREE.Mesh(new THREE.SphereGeometry(0.052, 12, 10), gloveMat);
        leftHand.scale.set(0.9, 1.0, 1.25);
        leftHand.position.set(...haL);
        leftHand.userData = { part: 'body' };

        const rightHand = new THREE.Mesh(new THREE.SphereGeometry(0.052, 12, 10), gloveMat);
        rightHand.scale.set(0.9, 1.0, 1.25);
        rightHand.position.set(...haR);
        rightHand.userData = { part: 'body' };

        // 5. Detailed Third-Person AK-47 Rifle
        const gunGroup = new THREE.Group();
        const gunReceiver = new THREE.Mesh(new THREE.BoxGeometry(0.044, 0.074, 0.36), gunMat);
        gunReceiver.castShadow = true;
        gunReceiver.userData = { part: 'body' };
        const gunStock = new THREE.Mesh(new THREE.BoxGeometry(0.038, 0.068, 0.19), gunWoodMat);
        gunStock.position.set(0, -0.018, 0.24);
        gunStock.rotation.x = -0.12;
        gunStock.userData = { part: 'body' };
        const gunHandguard = new THREE.Mesh(new THREE.BoxGeometry(0.046, 0.056, 0.19), gunWoodMat);
        gunHandguard.position.set(0, 0.0, -0.24);
        gunHandguard.userData = { part: 'body' };
        const gunBarrel = new THREE.Mesh(new THREE.CylinderGeometry(0.011, 0.013, 0.30, 10), gunMat);
        gunBarrel.rotation.x = Math.PI / 2;
        gunBarrel.position.set(0, 0.016, -0.41);
        gunBarrel.userData = { part: 'body' };
        const gunMag = new THREE.Mesh(new THREE.BoxGeometry(0.034, 0.15, 0.054), gunMat);
        gunMag.position.set(0, -0.105, -0.07);
        gunMag.rotation.x = 0.28;
        gunMag.userData = { part: 'body' };
        gunGroup.add(gunReceiver, gunStock, gunHandguard, gunBarrel, gunMag);
        gunGroup.position.set(0.06, 1.17, -0.34);
        gunGroup.rotation.y = 0.22;

        group.add(
            leftLegGroup, rightLegGroup, pelvis, belt, torso, shoulderArch,
            vestBody, strapL, strapR, collar, neck, head, nose,
            leftHand, rightHand, gunGroup
        );
        group.userData.leftLegGroup = leftLegGroup;
        group.userData.rightLegGroup = rightLegGroup;
        group.userData.walkCycle = 0;
    } else {
        // ==================== COUNTER-TERRORIST: FBI OPERATOR (รูปที่ 2: Dark FBI Cap, Sunglasses, Headset & Boom Mic, Royal Blue FBI Jacket, Black "FBI" Plate Carrier, 4 Mag Pouches, Gold Belt Badge, Drop-Leg Holster, Slate-Denim Trousers) ====================
        const {
            ctFaceMat, blueJacketMat, blackVestMat, pouchGrayMat,
            fbiChestMat, fbiCapFrontMat, capDarkMat, denimPantsMat,
            grayBootMat, grayGloveMat, goldBadgeMat, sunglassLensMat, glassFrameMat
        } = mats.ct;

        // 1. Legs: Textured Slate-Denim Trousers + Right Thigh Drop-Leg Pistol Holster + Gray-Black Tactical Boots
        const buildCTLeg = (xOffset, isRight) => {
            const legPivot = new THREE.Group();
            legPivot.position.set(xOffset, 0.84, 0);

            const thigh = new THREE.Mesh(new THREE.CylinderGeometry(0.114, 0.098, 0.38, 16), denimPantsMat);
            thigh.position.set(0, -0.19, 0);
            thigh.castShadow = true;
            thigh.userData = { part: 'leg' };

            if (isRight) {
                const strap1 = new THREE.Mesh(new THREE.CylinderGeometry(0.119, 0.116, 0.032, 16), blackVestMat);
                strap1.position.set(0, -0.15, 0);
                strap1.userData = { part: 'leg' };
                const strap2 = new THREE.Mesh(new THREE.CylinderGeometry(0.112, 0.108, 0.032, 16), blackVestMat);
                strap2.position.set(0, -0.25, 0);
                strap2.userData = { part: 'leg' };
                const holsterBody = new THREE.Mesh(new THREE.BoxGeometry(0.058, 0.17, 0.10), blackVestMat);
                holsterBody.position.set(0.108, -0.19, -0.01);
                holsterBody.userData = { part: 'leg' };
                const sidearmGrip = new THREE.Mesh(new THREE.BoxGeometry(0.038, 0.075, 0.065), pouchGrayMat);
                sidearmGrip.position.set(0.118, -0.085, 0.01);
                sidearmGrip.rotation.x = -0.25;
                sidearmGrip.userData = { part: 'leg' };
                legPivot.add(strap1, strap2, holsterBody, sidearmGrip);
            }

            const knee = new THREE.Mesh(new THREE.SphereGeometry(0.095, 14, 12), denimPantsMat);
            knee.position.set(0, -0.38, -0.01);
            knee.userData = { part: 'leg' };

            const calf = new THREE.Mesh(new THREE.CylinderGeometry(0.096, 0.080, 0.36, 16), denimPantsMat);
            calf.position.set(0, -0.55, 0.01);
            calf.castShadow = true;
            calf.userData = { part: 'leg' };

            const boot = new THREE.Mesh(new THREE.BoxGeometry(0.145, 0.115, 0.25), grayBootMat);
            boot.position.set(0, -0.76, -0.035);
            boot.castShadow = true;
            boot.userData = { part: 'leg' };

            const bootSole = new THREE.Mesh(new THREE.BoxGeometry(0.152, 0.025, 0.26), blackVestMat);
            bootSole.position.set(0, -0.815, -0.035);
            bootSole.userData = { part: 'leg' };

            legPivot.add(thigh, knee, calf, boot, bootSole);
            return legPivot;
        };

        const leftLegGroup = buildCTLeg(-0.132, false);
        const rightLegGroup = buildCTLeg(0.132, true);

        // 2. Pelvis, Duty Belt with Gold FBI Shield Badge, Royal Blue FBI Jacket & Black "FBI" Plate Carrier
        const pelvis = new THREE.Mesh(new THREE.CylinderGeometry(0.195, 0.185, 0.19, 16), denimPantsMat);
        pelvis.scale.set(1.12, 1, 0.72);
        pelvis.position.set(0, 0.86, 0);
        pelvis.castShadow = true;
        pelvis.userData = { part: 'body' };

        const belt = new THREE.Mesh(new THREE.CylinderGeometry(0.204, 0.204, 0.06, 16), blackVestMat);
        belt.scale.set(1.14, 1, 0.74);
        belt.position.set(0, 0.94, 0);
        belt.userData = { part: 'body' };

        const goldBadge = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.022, 0.018, 12), goldBadgeMat);
        goldBadge.rotation.x = Math.PI / 2;
        goldBadge.position.set(0.115, 0.95, -0.154);
        goldBadge.userData = { part: 'body' };

        // Anatomical Upper Torso + Sloped Shoulder Arch in Royal Blue FBI Jacket
        const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.192, 0.178, 0.48, 16), blueJacketMat);
        torso.scale.set(1.12, 1, 0.68);
        torso.position.set(0, 1.18, 0);
        torso.castShadow = true;
        torso.userData = { part: 'body' };

        const shoulderArch = new THREE.Mesh(new THREE.SphereGeometry(0.198, 16, 12), blueJacketMat);
        shoulderArch.scale.set(1.16, 0.42, 0.68);
        shoulderArch.position.set(0, 1.41, 0);
        shoulderArch.userData = { part: 'body' };

        const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.096, 0.112, 0.07, 14), blueJacketMat);
        collar.position.set(0, 1.46, 0);
        collar.userData = { part: 'body' };

        // Black Ballistic Plate Carrier Vest
        const vestBody = new THREE.Mesh(new THREE.BoxGeometry(0.385, 0.37, 0.29), blackVestMat);
        vestBody.position.set(0, 1.19, 0);
        vestBody.castShadow = true;
        vestBody.userData = { part: 'body' };

        const strapL = new THREE.Mesh(new THREE.BoxGeometry(0.068, 0.11, 0.265), blackVestMat);
        strapL.position.set(-0.125, 1.39, 0);
        strapL.userData = { part: 'body' };
        const strapR = new THREE.Mesh(new THREE.BoxGeometry(0.068, 0.11, 0.265), blackVestMat);
        strapR.position.set(0.125, 1.39, 0);
        strapR.userData = { part: 'body' };

        // Bold Yellow "FBI" Chest Patch Panel on Front & Back of Vest
        const fbiFrontPanel = new THREE.Mesh(new THREE.PlaneGeometry(0.215, 0.102), fbiChestMat);
        fbiFrontPanel.rotation.y = Math.PI;
        fbiFrontPanel.position.set(0, 1.285, -0.148);
        fbiFrontPanel.userData = { part: 'body' };

        const fbiBackPanel = new THREE.Mesh(new THREE.PlaneGeometry(0.23, 0.11), fbiChestMat);
        fbiBackPanel.position.set(0, 1.27, 0.148);
        fbiBackPanel.userData = { part: 'body' };

        // 4 Thick Front Magazine Pouches across lower chest/abdomen (Image 2)
        for (let m = 0; m < 4; m++) {
            const mx = -0.138 + m * 0.092;
            const pouch = new THREE.Mesh(new THREE.BoxGeometry(0.082, 0.135, 0.060), pouchGrayMat);
            pouch.position.set(mx, 1.09, -0.165);
            pouch.userData = { part: 'body' };
            const flap = new THREE.Mesh(new THREE.BoxGeometry(0.086, 0.050, 0.064), blackVestMat);
            flap.position.set(mx, 1.132, -0.165);
            flap.userData = { part: 'body' };
            group.add(pouch, flap);
        }

        // Chest Radio on upper-left & Yellow Chem-Light on upper-right (Image 2)
        const chestRadio = new THREE.Mesh(new THREE.BoxGeometry(0.062, 0.095, 0.040), pouchGrayMat);
        chestRadio.position.set(-0.142, 1.32, -0.158);
        chestRadio.userData = { part: 'body' };
        const radioAnt = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.003, 0.11, 6), blackVestMat);
        radioAnt.position.set(-0.158, 1.42, -0.158);
        radioAnt.userData = { part: 'body' };

        const chemLight = new THREE.Mesh(new THREE.CylinderGeometry(0.009, 0.009, 0.092, 8), goldBadgeMat);
        chemLight.position.set(0.142, 1.29, -0.155);
        chemLight.userData = { part: 'body' };

        // 3. Realistic Human Proportioned Neck, Exposed Face, Tactical Sunglasses, Comms Headset + Boom Mic, and "FBI" Baseball Cap
        const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.068, 0.078, 0.10, 14), skinMat);
        neck.position.set(0, 1.50, 0);
        neck.userData = { part: 'head' };

        const head = new THREE.Mesh(new THREE.SphereGeometry(0.136, 28, 28), ctFaceMat);
        head.scale.set(0.88, 1.12, 0.98);
        head.rotation.y = Math.PI / 2;
        head.position.set(0, 1.645, 0);
        head.castShadow = true;
        head.userData = { part: 'head' };

        const nose = new THREE.Mesh(new THREE.ConeGeometry(0.017, 0.042, 8), skinMat);
        nose.rotation.x = -Math.PI / 2 + 0.18;
        nose.position.set(0, 1.638, -0.136);
        nose.userData = { part: 'head' };

        // Sleek Wrap-Around Tactical Sunglasses
        const glassFrame = new THREE.Mesh(new THREE.BoxGeometry(0.21, 0.042, 0.065), glassFrameMat);
        glassFrame.position.set(0, 1.662, -0.105);
        glassFrame.userData = { part: 'head' };
        const lensL = new THREE.Mesh(new THREE.BoxGeometry(0.082, 0.034, 0.018), sunglassLensMat);
        lensL.position.set(-0.046, 1.662, -0.134);
        lensL.rotation.y = 0.14;
        lensL.userData = { part: 'head' };
        const lensR = new THREE.Mesh(new THREE.BoxGeometry(0.082, 0.034, 0.018), sunglassLensMat);
        lensR.position.set(0.046, 1.662, -0.134);
        lensR.rotation.y = -0.14;
        lensR.userData = { part: 'head' };

        // Tactical Headset Earcups + Boom Microphone
        const earL = new THREE.Mesh(new THREE.CylinderGeometry(0.046, 0.046, 0.036, 14), blackVestMat);
        earL.rotation.z = Math.PI / 2;
        earL.position.set(-0.128, 1.645, 0.0);
        earL.userData = { part: 'head' };
        const earR = new THREE.Mesh(new THREE.CylinderGeometry(0.046, 0.046, 0.036, 14), blackVestMat);
        earR.rotation.z = Math.PI / 2;
        earR.position.set(0.128, 1.645, 0.0);
        earR.userData = { part: 'head' };

        const micBoom = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.004, 0.14, 8), blackVestMat);
        micBoom.rotation.set(Math.PI / 2, 0.48, 0);
        micBoom.position.set(-0.075, 1.595, -0.10);
        micBoom.userData = { part: 'head' };
        const micTip = new THREE.Mesh(new THREE.SphereGeometry(0.011, 8, 8), pouchGrayMat);
        micTip.position.set(-0.018, 1.59, -0.145);
        micTip.userData = { part: 'head' };

        // Dark Navy/Charcoal "FBI" Baseball Cap + Curved Visor Brim
        const capCrown = new THREE.Mesh(new THREE.SphereGeometry(0.144, 22, 16, 0, Math.PI * 2, 0, Math.PI * 0.56), capDarkMat);
        capCrown.scale.set(0.90, 1.05, 1.0);
        capCrown.position.set(0, 1.67, 0.0);
        capCrown.castShadow = true;
        capCrown.userData = { part: 'head' };

        const capPatch = new THREE.Mesh(new THREE.PlaneGeometry(0.115, 0.056), fbiCapFrontMat);
        capPatch.rotation.set(0.16, Math.PI, 0);
        capPatch.position.set(0, 1.732, -0.132);
        capPatch.userData = { part: 'head' };

        const capBrim = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.012, 0.10), capDarkMat);
        capBrim.position.set(0, 1.695, -0.145);
        capBrim.rotation.x = 0.08;
        capBrim.userData = { part: 'head' };

        // 4. Connected Anatomical Arms in Royal Blue FBI Jacket Sleeves + Yellow "FBI" Sleeve Patches + Gray Gloves
        const shL = [-0.225, 1.35, -0.01];
        const elL = [-0.21, 1.15, -0.17];
        const haL = [-0.02, 1.13, -0.43];

        const shR = [0.225, 1.35, -0.01];
        const elR = [0.23, 1.14, -0.14];
        const haR = [0.11, 1.12, -0.29];

        group.add(buildConnectedLimb(shL, elL, 0.078, 0.068, blueJacketMat, false));
        group.add(buildConnectedLimb(elL, haL, 0.066, 0.052, blueJacketMat, false));
        group.add(buildConnectedLimb(shR, elR, 0.078, 0.068, blueJacketMat, false));
        group.add(buildConnectedLimb(elR, haR, 0.066, 0.052, blueJacketMat, false));

        const sleevePatchL = new THREE.Mesh(new THREE.PlaneGeometry(0.070, 0.038), fbiChestMat);
        sleevePatchL.rotation.y = -Math.PI / 2 - 0.15;
        sleevePatchL.position.set(-0.298, 1.28, -0.07);
        sleevePatchL.userData = { part: 'body' };
        const sleevePatchR = new THREE.Mesh(new THREE.PlaneGeometry(0.070, 0.038), fbiChestMat);
        sleevePatchR.rotation.y = Math.PI / 2 + 0.15;
        sleevePatchR.position.set(0.30, 1.28, -0.06);
        sleevePatchR.userData = { part: 'body' };

        const leftHand = new THREE.Mesh(new THREE.SphereGeometry(0.052, 12, 10), grayGloveMat);
        leftHand.scale.set(0.9, 1.0, 1.25);
        leftHand.position.set(...haL);
        leftHand.userData = { part: 'body' };
        const rightHand = new THREE.Mesh(new THREE.SphereGeometry(0.052, 12, 10), grayGloveMat);
        rightHand.scale.set(0.9, 1.0, 1.25);
        rightHand.position.set(...haR);
        rightHand.userData = { part: 'body' };

        // 5. Third-Person M4A1-S Silenced Carbine
        const gunGroup = new THREE.Group();
        const gunReceiver = new THREE.Mesh(new THREE.BoxGeometry(0.044, 0.076, 0.34), gunMat);
        gunReceiver.castShadow = true;
        gunReceiver.userData = { part: 'body' };
        const gunBarrel = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.42, 10), gunMat);
        gunBarrel.rotation.x = Math.PI / 2;
        gunBarrel.position.set(0, 0.016, -0.34);
        gunBarrel.userData = { part: 'body' };
        const gunMag = new THREE.Mesh(new THREE.BoxGeometry(0.034, 0.145, 0.054), pouchGrayMat);
        gunMag.position.set(0, -0.095, -0.06);
        gunMag.rotation.x = 0.22;
        gunMag.userData = { part: 'body' };
        gunGroup.add(gunReceiver, gunBarrel, gunMag);
        gunGroup.position.set(0.06, 1.14, -0.33);
        gunGroup.rotation.y = 0.22;

        group.add(
            leftLegGroup, rightLegGroup, pelvis, belt, goldBadge, torso, shoulderArch, collar,
            vestBody, strapL, strapR, fbiFrontPanel, fbiBackPanel, chestRadio, radioAnt, chemLight,
            neck, head, nose, glassFrame, lensL, lensR, earL, earR, micBoom, micTip,
            capCrown, capPatch, capBrim,
            sleevePatchL, sleevePatchR, leftHand, rightHand, gunGroup
        );
        group.userData.leftLegGroup = leftLegGroup;
        group.userData.rightLegGroup = rightLegGroup;
        group.userData.walkCycle = 0;
    }

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
        this._origin = new THREE.Vector3();
        this._targetPos = new THREE.Vector3();
        this._dir = new THREE.Vector3();
        this._ray = new THREE.Raycaster();
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

            // Anti-stuck check: if bot hasn't progressed at least 0.6m in 0.8s, pick a fresh random waypoint
            bot.stuckCheckTimer = (bot.stuckCheckTimer || 0) + dt;
            if (bot.stuckCheckTimer >= 0.8) {
                const movedDist = Math.hypot(bot.x - (bot.lastCheckX || 0), bot.z - (bot.lastCheckZ || 0));
                bot.lastCheckX = bot.x;
                bot.lastCheckZ = bot.z;
                bot.stuckCheckTimer = 0;
                if (movedDist < 0.6) {
                    const wp = waypoints[Math.floor(Math.random() * waypoints.length)];
                    bot.targetWP = { x: wp.x + (Math.random() - 0.5) * 2, z: wp.z + (Math.random() - 0.5) * 2 };
                }
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

            // Staggered 10Hz AI line-of-sight scan so 8-16 bots never stall FPS on big maps
            bot.senseTimer = (bot.senseTimer !== undefined) ? (bot.senseTimer - dt) : (Math.random() * 0.10);
            const cachedDead = bot.cachedEnemy && (bot.cachedEnemy.isLocalPlayer ? this.game.player.hp <= 0 : bot.cachedEnemy.hp <= 0);
            if (bot.senseTimer <= 0 || cachedDead) {
                bot.senseTimer = 0.09 + Math.random() * 0.04;
                bot.cachedEnemy = this.findVisibleEnemy(bot, cfg.sightRange);
            } else if (bot.cachedEnemy && bot.cachedEnemy.isLocalPlayer) {
                bot.cachedEnemy.x = this.game.player.x;
                bot.cachedEnemy.y = this.game.player.y;
                bot.cachedEnemy.z = this.game.player.z;
                bot.cachedEnemy.hp = this.game.player.hp;
            }
            const enemy = bot.cachedEnemy;
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
            const d = Math.hypot(this.game.player.x - bot.x, this.game.player.z - bot.z);
            if (d < maxSightRange) {
                candidates.push({
                    dist: d,
                    ent: {
                        isLocalPlayer: true,
                        x: this.game.player.x,
                        y: this.game.player.y,
                        z: this.game.player.z,
                        hp: this.game.player.hp,
                        name: this.game.player.name,
                        team: this.game.player.team
                    }
                });
            }
        }

        for (const ent of this.game.entities) {
            if (ent.id !== bot.id && ent.hp > 0 && ent.team !== bot.team) {
                const d = Math.hypot(ent.x - bot.x, ent.z - bot.z);
                if (d < maxSightRange) {
                    candidates.push({ dist: d, ent });
                }
            }
        }

        if (candidates.length === 0) return null;
        candidates.sort((a, b) => a.dist - b.dist);

        this._origin.set(bot.x, bot.y + 1.5, bot.z);
        for (const item of candidates) {
            const c = item.ent;
            this._targetPos.set(c.x, c.y + 1.3, c.z);
            this._dir.subVectors(this._targetPos, this._origin).normalize();
            this._ray.set(this._origin, this._dir);
            this._ray.near = 0.2;
            this._ray.far = item.dist;
            const hits = this._ray.intersectObjects(this.game.map.shootableMeshes, false);
            if (hits.length === 0) {
                return c;
            }
        }
        return null;
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
        } else {
            // Tactical: supersonic near-miss whiz-by audio if bullet snaps close to player
            if (target.isLocalPlayer && window.soundFX && window.soundFX.playNearMiss) {
                const playerPos = new THREE.Vector3(target.x, target.y + 1.2, target.z);
                const rayLine = new THREE.Line3(start, end);
                const closestPoint = new THREE.Vector3();
                rayLine.closestPointToPoint(playerPos, true, closestPoint);
                if (closestPoint.distanceTo(playerPos) < 2.5) {
                    window.soundFX.playNearMiss();
                }
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
