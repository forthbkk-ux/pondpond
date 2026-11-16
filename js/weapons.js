// Counter-Strike Weapon Definitions & 3D Viewmodel Builder

const WEAPONS = {
    ak47: {
        id: 'ak47',
        name: 'CV-47 (AK-47)',
        type: 'ปืนไรเฟิลจู่โจม',
        slot: 1,
        price: 2700,
        damage: 36,
        headshotMult: 3.1,
        fireRate: 0.10, // seconds per shot (600 RPM)
        auto: true,
        clipSize: 30,
        reserveMax: 90,
        reloadTime: 2.2,
        recoil: 0.022,
        spread: 0.015,
        range: 180,
        moveSpeed: 0.92,
        canScope: false,
        color: 0x8b4513
    },
    m4a1: {
        id: 'm4a1',
        name: 'M4A1-S Tactical',
        type: 'ปืนไรเฟิลเก็บเสียง',
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
        color: 0x334155
    },
    awp: {
        id: 'awp',
        name: 'AWP Magnum Sniper',
        type: 'ปืนสไนเปอร์ซูมยิงนัดเดียวจอด',
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
        color: 0x2e4f2f
    },
    mp5: {
        id: 'mp5',
        name: 'MP5-SD Submachine',
        type: 'ปืนกลมือยิงรัวคล่องตัว',
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
        color: 0x1e293b
    },
    shotgun: {
        id: 'shotgun',
        name: 'XM1014 Auto Shotgun',
        type: 'ปืนลูกซองระยะประชิด (8 ลูกปราย)',
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
        color: 0x475569
    },
    pistol: {
        id: 'pistol',
        name: 'USP-S / Glock-18',
        type: 'ปืนพกมาตรฐาน',
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
        color: 0x4b5563
    },
    deagle: {
        id: 'deagle',
        name: 'Night Hawk .50C (Deagle)',
        type: 'ปืนพกหนักอานุภาพสูง',
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
        color: 0xcbd5e1
    },
    knife: {
        id: 'knife',
        name: 'Karambit / Combat Knife',
        type: 'มีดต่อสู้ระยะประชิด (วิ่งเร็วสุด)',
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
        color: 0x94a3b8
    },
    hegrenade: {
        id: 'hegrenade',
        name: 'HE Grenade (ระเบิดมือ)',
        type: 'ระเบิดสังหารทำลายล้างเป็นวงกว้าง',
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
        color: 0x3f6212
    }
};

function createWeaponViewModel(weaponId) {
    const group = new THREE.Group();
    const darkMetal = new THREE.MeshStandardMaterial({ color: 0x22272e, roughness: 0.4, metalness: 0.7 });
    const steelMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.3, metalness: 0.85 });
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x854d0e, roughness: 0.7, metalness: 0.1 });
    const oliveMat = new THREE.MeshStandardMaterial({ color: 0x365314, roughness: 0.5, metalness: 0.3 });
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.3, metalness: 0.8 });

    if (weaponId === 'knife') {
        const handle = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.05, 0.16), darkMetal);
        const guard = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.08, 0.02), goldMat);
        guard.position.set(0, 0, -0.09);
        const blade = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.045, 0.24), steelMat);
        blade.position.set(0, 0.01, -0.21);
        group.add(handle, guard, blade);
        group.position.set(0.24, -0.22, -0.38);
        return group;
    }

    if (weaponId === 'hegrenade') {
        const body = new THREE.Mesh(new THREE.SphereGeometry(0.065, 12, 12), oliveMat);
        const top = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.03, 0.05, 8), steelMat);
        top.position.set(0, 0.07, 0);
        group.add(body, top);
        group.position.set(0.24, -0.22, -0.38);
        return group;
    }

    if (weaponId === 'pistol' || weaponId === 'deagle') {
        const isDeagle = weaponId === 'deagle';
        const slideMat = isDeagle ? steelMat : darkMetal;
        const slide = new THREE.Mesh(new THREE.BoxGeometry(isDeagle ? 0.055 : 0.045, isDeagle ? 0.065 : 0.05, isDeagle ? 0.28 : 0.23), slideMat);
        slide.position.set(0, 0.03, -0.05);
        const grip = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.12, 0.06), darkMetal);
        grip.position.set(0, -0.04, 0.04);
        grip.rotation.x = 0.22;
        group.add(slide, grip);
        group.position.set(0.24, -0.22, -0.42);
        return group;
    }

    // Rifles / SMG / Sniper
    const bodyMat = weaponId === 'awp' ? oliveMat : darkMetal;
    const receiver = new THREE.Mesh(new THREE.BoxGeometry(0.065, 0.085, 0.42), bodyMat);
    group.add(receiver);

    // Barrel
    const barrelLen = weaponId === 'awp' ? 0.58 : 0.36;
    const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, barrelLen, 8), darkMetal);
    barrel.rotation.x = Math.PI / 2;
    barrel.position.set(0, 0.015, -0.21 - barrelLen / 2);
    group.add(barrel);

    // Handguard / Wood furniture for AK-47
    if (weaponId === 'ak47') {
        const handguard = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.065, 0.22), woodMat);
        handguard.position.set(0, 0.01, -0.26);
        const stock = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.075, 0.22), woodMat);
        stock.position.set(0, -0.02, 0.25);
        const mag = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.17, 0.075), goldMat);
        mag.position.set(0, -0.11, -0.08);
        mag.rotation.x = -0.32;
        group.add(handguard, stock, mag);
    } else if (weaponId === 'm4a1') {
        // Suppressor
        const supp = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.20, 10), darkMetal);
        supp.rotation.x = Math.PI / 2;
        supp.position.set(0, 0.015, -0.52);
        const mag = new THREE.Mesh(new THREE.BoxGeometry(0.042, 0.15, 0.07), darkMetal);
        mag.position.set(0, -0.10, -0.06);
        group.add(supp, mag);
    } else if (weaponId === 'awp') {
        // Sniper Scope
        const scopeTube = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.028, 0.28, 12), darkMetal);
        scopeTube.rotation.x = Math.PI / 2;
        scopeTube.position.set(0, 0.075, -0.04);
        group.add(scopeTube);
    } else {
        const mag = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.14, 0.06), darkMetal);
        mag.position.set(0, -0.09, -0.06);
        group.add(mag);
    }

    // Muzzle Flash mesh (hidden by default)
    const flashGeo = new THREE.ConeGeometry(0.06, 0.16, 6);
    const flashMat = new THREE.MeshBasicMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.9 });
    const muzzleFlash = new THREE.Mesh(flashGeo, flashMat);
    muzzleFlash.rotation.x = -Math.PI / 2;
    muzzleFlash.position.set(0, 0.015, -0.25 - barrelLen);
    muzzleFlash.visible = false;
    muzzleFlash.name = 'muzzleFlash';
    group.add(muzzleFlash);

    group.position.set(0.25, -0.23, -0.45);
    return group;
}

window.WEAPONS = WEAPONS;
window.createWeaponViewModel = createWeaponViewModel;
