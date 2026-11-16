// Photorealistic Weapon Definitions & 3D Viewmodel Builder (PBR Gunmetal, Walnut Grain & Tactical Gloves)

const WEAPONS = {
    ak47: {
        id: 'ak47',
        name: 'CV-47 (AK-47)',
        type: 'ปืนไรเฟิลจู่โจม 7.62mm',
        slot: 1,
        price: 2700,
        damage: 36,
        headshotMult: 3.1,
        fireRate: 0.10,
        auto: true,
        clipSize: 30,
        reserveMax: 90,
        reloadTime: 2.2,
        recoil: 0.022,
        spread: 0.015,
        range: 180,
        moveSpeed: 0.92,
        canScope: false,
        color: 0x5c3a21
    },
    m4a1: {
        id: 'm4a1',
        name: 'M4A1-S Tactical',
        type: 'ปืนไรเฟิลจู่โจมเก็บเสียง 5.56mm',
        slot: 1,
        price: 2900,
        damage: 33,
        headshotMult: 2.8,
        fireRate: 0.09,
        auto: true,
        clipSize: 25,
        reserveMax: 75,
        reloadTime: 2.1,
        recoil: 0.015,
        spread: 0.009,
        range: 180,
        moveSpeed: 0.94,
        canScope: false,
        color: 0x272b30
    },
    awp: {
        id: 'awp',
        name: 'AWP Magnum Sniper',
        type: 'ปืนสไนเปอร์ .338 Lapua Magnum',
        slot: 1,
        price: 4750,
        damage: 115,
        headshotMult: 4.0,
        fireRate: 1.25,
        auto: false,
        clipSize: 10,
        reserveMax: 30,
        reloadTime: 3.0,
        recoil: 0.08,
        spread: 0.001,
        unscopedSpread: 0.065,
        range: 300,
        moveSpeed: 0.82,
        canScope: true,
        color: 0x3b4534
    },
    mp5: {
        id: 'mp5',
        name: 'MP5-SD Submachine',
        type: 'ปืนกลมือเก็บเสียง 9mm',
        slot: 1,
        price: 1500,
        damage: 25,
        headshotMult: 2.2,
        fireRate: 0.075,
        auto: true,
        clipSize: 30,
        reserveMax: 120,
        reloadTime: 1.8,
        recoil: 0.012,
        spread: 0.02,
        range: 110,
        moveSpeed: 1.0,
        canScope: false,
        color: 0x1e2226
    },
    shotgun: {
        id: 'shotgun',
        name: 'XM1014 Combat Shotgun',
        type: 'ปืนลูกซองกึ่งอัตโนมัติ 12-Gauge',
        slot: 1,
        price: 2000,
        damage: 18,
        pellets: 7,
        headshotMult: 2.0,
        fireRate: 0.35,
        auto: true,
        clipSize: 7,
        reserveMax: 32,
        reloadTime: 2.4,
        recoil: 0.045,
        spread: 0.055,
        range: 65,
        moveSpeed: 0.95,
        canScope: false,
        color: 0x32383e
    },
    pistol: {
        id: 'pistol',
        name: 'USP-S / Glock-18',
        type: 'ปืนพกยุทธวิธี 9mm / .45 ACP',
        slot: 2,
        price: 200,
        damage: 26,
        headshotMult: 2.7,
        fireRate: 0.15,
        auto: false,
        clipSize: 18,
        reserveMax: 72,
        reloadTime: 1.5,
        recoil: 0.011,
        spread: 0.012,
        range: 120,
        moveSpeed: 1.02,
        canScope: false,
        color: 0x2b3036
    },
    deagle: {
        id: 'deagle',
        name: 'Desert Eagle .50 AE',
        type: 'ปืนพกหนักอานุภาพทำลายล้างสูง',
        slot: 2,
        price: 700,
        damage: 54,
        headshotMult: 3.2,
        fireRate: 0.28,
        auto: false,
        clipSize: 7,
        reserveMax: 35,
        reloadTime: 1.9,
        recoil: 0.04,
        spread: 0.014,
        range: 150,
        moveSpeed: 0.98,
        canScope: false,
        color: 0x9ca3af
    },
    knife: {
        id: 'knife',
        name: 'M9 Bayonet / Combat Knife',
        type: 'มีดปลายปืนจู่โจมระยะประชิด',
        slot: 3,
        price: 0,
        damage: 55,
        headshotMult: 1.8,
        fireRate: 0.4,
        auto: true,
        clipSize: 1,
        reserveMax: 1,
        reloadTime: 0,
        recoil: 0,
        spread: 0,
        range: 3.4,
        moveSpeed: 1.15,
        canScope: false,
        color: 0x64748b
    },
    hegrenade: {
        id: 'hegrenade',
        name: 'M67 Fragmentation Grenade',
        type: 'ระเบิดสังหารแรงอัดสูง',
        slot: 4,
        price: 300,
        damage: 95,
        headshotMult: 1.0,
        fireRate: 0.8,
        auto: false,
        clipSize: 1,
        reserveMax: 0,
        reloadTime: 0,
        recoil: 0,
        spread: 0,
        range: 40,
        moveSpeed: 1.05,
        canScope: false,
        color: 0x3b4726
    }
};

// Cached procedural realistic weapon textures
let _cachedWeaponTextures = null;
function getWeaponTextures() {
    if (_cachedWeaponTextures) return _cachedWeaponTextures;

    // 1. Brushed & Scratched Gunmetal Texture
    const metalCanvas = document.createElement('canvas');
    metalCanvas.width = 256;
    metalCanvas.height = 256;
    const mCtx = metalCanvas.getContext('2d');
    mCtx.fillStyle = '#22262a';
    mCtx.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 1200; i++) {
        mCtx.fillStyle = i % 2 === 0 ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.18)';
        mCtx.fillRect(Math.random() * 256, Math.random() * 256, 18 + Math.random() * 30, 1);
    }
    const metalTex = new THREE.CanvasTexture(metalCanvas);

    // 2. Dark Walnut Wood Stock Texture
    const woodCanvas = document.createElement('canvas');
    woodCanvas.width = 256;
    woodCanvas.height = 256;
    const wCtx = woodCanvas.getContext('2d');
    wCtx.fillStyle = '#522d16';
    wCtx.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 600; i++) {
        wCtx.fillStyle = i % 2 === 0 ? 'rgba(25, 10, 4, 0.25)' : 'rgba(130, 75, 35, 0.14)';
        wCtx.fillRect(0, Math.random() * 256, 256, 1 + Math.random() * 2);
    }
    const woodTex = new THREE.CanvasTexture(woodCanvas);

    // 3. Tactical Fabric & Leather Glove Texture
    const fabricCanvas = document.createElement('canvas');
    fabricCanvas.width = 128;
    fabricCanvas.height = 128;
    const fCtx = fabricCanvas.getContext('2d');
    fCtx.fillStyle = '#262925';
    fCtx.fillRect(0, 0, 128, 128);
    for (let y = 0; y < 128; y += 2) {
        for (let x = 0; x < 128; x += 2) {
            if ((x + y) % 4 === 0) {
                fCtx.fillStyle = 'rgba(255,255,255,0.05)';
                fCtx.fillRect(x, y, 1, 1);
            }
        }
    }
    const fabricTex = new THREE.CanvasTexture(fabricCanvas);

    _cachedWeaponTextures = { metalTex, woodTex, fabricTex };
    return _cachedWeaponTextures;
}

function createWeaponViewModel(weaponId) {
    const group = new THREE.Group();
    const { metalTex, woodTex, fabricTex } = getWeaponTextures();

    const gunMetal = new THREE.MeshStandardMaterial({
        map: metalTex,
        bumpMap: metalTex,
        bumpScale: 0.012,
        color: 0x262a2e,
        roughness: 0.35,
        metalness: 0.88
    });
    const steelBarrelMat = new THREE.MeshStandardMaterial({
        map: metalTex,
        bumpMap: metalTex,
        bumpScale: 0.01,
        color: 0x3b4046,
        roughness: 0.28,
        metalness: 0.92
    });
    const chromeMat = new THREE.MeshStandardMaterial({
        map: metalTex,
        color: 0xb0b8c2,
        roughness: 0.22,
        metalness: 0.95
    });
    const woodMat = new THREE.MeshStandardMaterial({
        map: woodTex,
        bumpMap: woodTex,
        bumpScale: 0.018,
        roughness: 0.58,
        metalness: 0.06
    });
    const polymerOliveMat = new THREE.MeshStandardMaterial({
        map: fabricTex,
        bumpMap: fabricTex,
        bumpScale: 0.01,
        color: 0x3a4432,
        roughness: 0.55,
        metalness: 0.18
    });
    const bakeliteMat = new THREE.MeshStandardMaterial({
        map: woodTex,
        color: 0x7c3314,
        roughness: 0.42,
        metalness: 0.22
    });
    const gloveMat = new THREE.MeshStandardMaterial({
        map: fabricTex,
        bumpMap: fabricTex,
        bumpScale: 0.015,
        color: 0x1c1e1b,
        roughness: 0.78,
        metalness: 0.12
    });
    const sleeveMat = new THREE.MeshStandardMaterial({
        map: fabricTex,
        bumpMap: fabricTex,
        bumpScale: 0.02,
        color: 0x333830,
        roughness: 0.88,
        metalness: 0.05
    });

    // Realistic Contoured First-Person Right Hand + Forearm
    const rightGlove = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.036, 0.11, 10), gloveMat);
    rightGlove.rotation.x = Math.PI / 2;
    rightGlove.position.set(0, -0.05, 0.08);

    const knuckleGuard = new THREE.Mesh(new THREE.BoxGeometry(0.052, 0.02, 0.045), gunMetal);
    knuckleGuard.position.set(0, -0.025, 0.06);

    const rightArm = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.046, 0.30, 12), sleeveMat);
    rightArm.rotation.x = Math.PI / 2 + 0.22;
    rightArm.rotation.z = 0.12;
    rightArm.position.set(0.04, -0.10, 0.25);
    group.add(rightGlove, knuckleGuard, rightArm);

    if (weaponId === 'knife') {
        const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.021, 0.14, 12), gloveMat);
        handle.rotation.x = Math.PI / 2;
        const guard = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.075, 0.016), gunMetal);
        guard.position.set(0, 0, -0.075);
        const blade = new THREE.Mesh(new THREE.BoxGeometry(0.005, 0.036, 0.25), chromeMat);
        blade.position.set(0, 0.006, -0.20);
        const fuller = new THREE.Mesh(new THREE.BoxGeometry(0.007, 0.008, 0.18), gunMetal);
        fuller.position.set(0, 0.012, -0.17);
        group.add(handle, guard, blade, fuller);
        group.position.set(0.23, -0.21, -0.38);
        return group;
    }

    if (weaponId === 'hegrenade') {
        const body = new THREE.Mesh(new THREE.SphereGeometry(0.058, 18, 18), polymerOliveMat);
        const top = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.024, 0.045, 12), steelBarrelMat);
        top.position.set(0, 0.065, 0);
        const spoon = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.075, 0.025), steelBarrelMat);
        spoon.position.set(0.036, 0.025, 0);
        const pinRing = new THREE.Mesh(new THREE.TorusGeometry(0.016, 0.003, 8, 16), chromeMat);
        pinRing.position.set(-0.025, 0.065, 0);
        group.add(body, top, spoon, pinRing);
        group.position.set(0.23, -0.22, -0.38);
        return group;
    }

    if (weaponId === 'pistol' || weaponId === 'deagle') {
        const isDeagle = weaponId === 'deagle';
        const slideMat = isDeagle ? chromeMat : gunMetal;
        const slide = new THREE.Mesh(
            new THREE.BoxGeometry(isDeagle ? 0.046 : 0.038, isDeagle ? 0.056 : 0.042, isDeagle ? 0.28 : 0.23),
            slideMat
        );
        slide.position.set(0, 0.035, -0.04);

        const frame = new THREE.Mesh(
            new THREE.BoxGeometry(isDeagle ? 0.042 : 0.035, 0.022, isDeagle ? 0.24 : 0.20),
            gunMetal
        );
        frame.position.set(0, 0.005, -0.02);

        const grip = new THREE.Mesh(new THREE.BoxGeometry(0.036, 0.125, 0.056), gloveMat);
        grip.position.set(0, -0.045, 0.045);
        grip.rotation.x = 0.26;

        const rearSight = new THREE.Mesh(new THREE.BoxGeometry(0.032, 0.012, 0.014), gunMetal);
        rearSight.position.set(0, 0.068, 0.06);
        const frontSight = new THREE.Mesh(new THREE.BoxGeometry(0.008, 0.012, 0.014), gunMetal);
        frontSight.position.set(0, 0.068, isDeagle ? -0.16 : -0.14);

        group.add(slide, frame, grip, rearSight, frontSight);
        attachMuzzleEffects(group, isDeagle ? -0.24 : -0.20);
        group.position.set(0.22, -0.22, -0.42);
        return group;
    }

    // Left Support Hand + Forearm holding the rifle handguard
    const leftGlove = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.035, 0.11, 10), gloveMat);
    leftGlove.rotation.x = Math.PI / 2;
    leftGlove.position.set(-0.018, -0.032, -0.24);
    const leftArm = new THREE.Mesh(new THREE.CylinderGeometry(0.036, 0.045, 0.34, 12), sleeveMat);
    leftArm.rotation.x = Math.PI / 2 + 0.25;
    leftArm.rotation.z = -0.42;
    leftArm.position.set(-0.14, -0.11, -0.06);
    group.add(leftGlove, leftArm);

    // Rifles / SMG / Sniper / Shotgun
    const bodyMat = weaponId === 'awp' ? polymerOliveMat : gunMetal;
    const receiver = new THREE.Mesh(new THREE.BoxGeometry(0.056, 0.082, 0.40), bodyMat);
    group.add(receiver);

    // Upper Dust Cover & Picatinny Rail
    const upperCover = new THREE.Mesh(new THREE.CylinderGeometry(0.027, 0.028, 0.38, 10), gunMetal);
    upperCover.rotation.x = Math.PI / 2;
    upperCover.position.set(0, 0.038, -0.01);

    const pistolGrip = new THREE.Mesh(new THREE.BoxGeometry(0.038, 0.125, 0.055), gloveMat);
    pistolGrip.position.set(0, -0.08, 0.10);
    pistolGrip.rotation.x = 0.28;
    group.add(upperCover, pistolGrip);

    // Precision Steel Barrel
    const barrelLen = weaponId === 'awp' ? 0.64 : 0.38;
    const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.014, barrelLen, 14), steelBarrelMat);
    barrel.rotation.x = Math.PI / 2;
    barrel.position.set(0, 0.018, -0.20 - barrelLen / 2);
    group.add(barrel);

    // Front Sight Post & Rear Sight Aperture
    const frontPost = new THREE.Mesh(new THREE.BoxGeometry(0.01, 0.048, 0.018), gunMetal);
    frontPost.position.set(0, 0.046, -0.18 - barrelLen * 0.78);
    const rearSight = new THREE.Mesh(new THREE.BoxGeometry(0.034, 0.022, 0.025), gunMetal);
    rearSight.position.set(0, 0.062, 0.08);
    group.add(frontPost, rearSight);

    if (weaponId === 'ak47') {
        const gasTube = new THREE.Mesh(new THREE.CylinderGeometry(0.011, 0.011, 0.25, 10), steelBarrelMat);
        gasTube.rotation.x = Math.PI / 2;
        gasTube.position.set(0, 0.042, -0.31);

        const handguard = new THREE.Mesh(new THREE.BoxGeometry(0.062, 0.062, 0.22), woodMat);
        handguard.position.set(0, 0.01, -0.28);

        const stock = new THREE.Mesh(new THREE.BoxGeometry(0.048, 0.082, 0.25), woodMat);
        stock.position.set(0, -0.025, 0.28);
        stock.rotation.x = -0.08;

        const mag = new THREE.Mesh(new THREE.BoxGeometry(0.040, 0.185, 0.070), bakeliteMat);
        mag.position.set(0, -0.12, -0.08);
        mag.rotation.x = -0.34;

        group.add(gasTube, handguard, stock, mag);
    } else if (weaponId === 'm4a1') {
        const handguard = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.032, 0.24, 14), gunMetal);
        handguard.rotation.x = Math.PI / 2;
        handguard.position.set(0, 0.018, -0.28);

        const supp = new THREE.Mesh(new THREE.CylinderGeometry(0.021, 0.021, 0.23, 16), steelBarrelMat);
        supp.rotation.x = Math.PI / 2;
        supp.position.set(0, 0.018, -0.56);

        const stock = new THREE.Mesh(new THREE.BoxGeometry(0.046, 0.082, 0.22), gunMetal);
        stock.position.set(0, -0.01, 0.26);

        const mag = new THREE.Mesh(new THREE.BoxGeometry(0.038, 0.155, 0.064), steelBarrelMat);
        mag.position.set(0, -0.11, -0.06);
        mag.rotation.x = -0.12;

        group.add(handguard, supp, stock, mag);
    } else if (weaponId === 'awp') {
        const scopeMount1 = new THREE.Mesh(new THREE.BoxGeometry(0.026, 0.038, 0.028), gunMetal);
        scopeMount1.position.set(0, 0.065, 0.04);
        const scopeMount2 = new THREE.Mesh(new THREE.BoxGeometry(0.026, 0.038, 0.028), gunMetal);
        scopeMount2.position.set(0, 0.065, -0.10);

        const scopeTube = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.028, 0.34, 18), gunMetal);
        scopeTube.rotation.x = Math.PI / 2;
        scopeTube.position.set(0, 0.092, -0.04);

        const lensMat = new THREE.MeshStandardMaterial({ color: 0x0ea5e9, roughness: 0.05, metalness: 0.95 });
        const lens = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.005, 16), lensMat);
        lens.rotation.x = Math.PI / 2;
        lens.position.set(0, 0.092, 0.13);

        const boltHandle = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.06, 8), chromeMat);
        boltHandle.rotation.z = Math.PI / 2;
        boltHandle.position.set(0.042, 0.03, 0.05);

        const stock = new THREE.Mesh(new THREE.BoxGeometry(0.050, 0.092, 0.26), polymerOliveMat);
        stock.position.set(0, -0.015, 0.28);

        group.add(scopeMount1, scopeMount2, scopeTube, lens, boltHandle, stock);
    } else {
        const mag = new THREE.Mesh(new THREE.BoxGeometry(0.034, 0.15, 0.052), steelBarrelMat);
        mag.position.set(0, -0.10, -0.06);
        group.add(mag);
    }

    attachMuzzleEffects(group, -0.25 - barrelLen);
    group.position.set(0.22, -0.22, -0.44);
    return group;
}

function attachMuzzleEffects(group, zPos) {
    const flashGroup = new THREE.Group();
    const flashMat = new THREE.MeshBasicMaterial({ color: 0xffe699, transparent: true, opacity: 0.88 });
    const core = new THREE.Mesh(new THREE.ConeGeometry(0.055, 0.18, 8), flashMat);
    core.rotation.x = -Math.PI / 2;
    const star1 = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.02, 0.015), flashMat);
    const star2 = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.18, 0.015), flashMat);
    flashGroup.add(core, star1, star2);

    const light = new THREE.PointLight(0xffd27d, 2.6, 10);
    flashGroup.add(light);

    flashGroup.position.set(0, 0.02, zPos);
    flashGroup.visible = false;
    flashGroup.name = 'muzzleFlash';
    group.add(flashGroup);
}

window.WEAPONS = WEAPONS;
window.createWeaponViewModel = createWeaponViewModel;
window.attachMuzzleEffects = attachMuzzleEffects;
