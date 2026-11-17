// Expanded Counter-Strike Arsenal (30 Weapons) + High-Detail Multi-Part 3D Weapon Smithing Engine

const WEAPON_CATEGORIES = [
    { id: 'all', name: '🔥 ทั้งหมด (All)' },
    { id: 'pistol', name: '🔫 ปืนพก (Pistols)' },
    { id: 'shotgun', name: '💥 ลูกซอง (Shotguns)' },
    { id: 'smg', name: '⚡ ปืนกลเบา (SMGs)' },
    { id: 'mg', name: '🛡️ ปืนกลหนัก (Machine Guns)' },
    { id: 'rifle', name: '🎯 ไรเฟิล (Rifles)' },
    { id: 'sniper', name: '🔭 สไนเปอร์ (Snipers)' },
    { id: 'equip', name: '💣 เกราะ & ระเบิด' }
];

const WEAPONS = {
    // ==================== 1. PISTOLS (SLOT 2) ====================
    pistol: {
        id: 'pistol',
        name: 'USP-S Tactical Silenced',
        category: 'pistol',
        type: 'ปืนพกเก็บเสียง 15 นัด แม่นยำสูง',
        slot: 2,
        price: 200,
        damage: 28,
        headshotMult: 2.8,
        fireRate: 0.14,
        auto: false,
        clipSize: 15,
        reserveMax: 150,
        reloadTime: 1.4,
        recoil: 0.010,
        spread: 0.009,
        range: 130,
        moveSpeed: 1.02,
        canScope: false
    },
    glock: {
        id: 'glock',
        name: 'Glock-18 Auto-Burst',
        category: 'pistol',
        type: 'ปืนพกออสเตรีย 24 นัด ลั่นไกไว',
        slot: 2,
        price: 200,
        damage: 24,
        headshotMult: 2.6,
        fireRate: 0.10,
        auto: true,
        clipSize: 24,
        reserveMax: 180,
        reloadTime: 1.4,
        recoil: 0.011,
        spread: 0.014,
        range: 120,
        moveSpeed: 1.04,
        canScope: false
    },
    p250: {
        id: 'p250',
        name: 'SIG P250 Compact',
        category: 'pistol',
        type: 'ปืนพกเจาะเกราะ 16 นัด ดาเมจแน่น',
        slot: 2,
        price: 300,
        damage: 34,
        headshotMult: 2.7,
        fireRate: 0.14,
        auto: false,
        clipSize: 16,
        reserveMax: 160,
        reloadTime: 1.5,
        recoil: 0.014,
        spread: 0.012,
        range: 130,
        moveSpeed: 1.02,
        canScope: false
    },
    dualelites: {
        id: 'dualelites',
        name: 'Dual Berettas (ปืนพกคู่)',
        category: 'pistol',
        type: 'ปืนพกคู่ซ้าย-ขวา 36 นัด ยิงรัวสะใจ',
        slot: 2,
        price: 400,
        damage: 30,
        headshotMult: 2.6,
        fireRate: 0.085,
        auto: true,
        clipSize: 36,
        reserveMax: 240,
        reloadTime: 2.1,
        recoil: 0.015,
        spread: 0.018,
        range: 125,
        moveSpeed: 1.02,
        canScope: false
    },
    fiveseven: {
        id: 'fiveseven',
        name: 'FN Five-SeveN Tactical',
        category: 'pistol',
        type: 'ปืนพกกระสุนเจาะเกราะ 22 นัด',
        slot: 2,
        price: 500,
        damage: 36,
        headshotMult: 2.8,
        fireRate: 0.13,
        auto: false,
        clipSize: 22,
        reserveMax: 180,
        reloadTime: 1.5,
        recoil: 0.013,
        spread: 0.010,
        range: 135,
        moveSpeed: 1.02,
        canScope: false
    },
    revolver: {
        id: 'revolver',
        name: 'R8 Revolver .357 Magnum',
        category: 'pistol',
        type: 'ปืนพกลูกโม่ยิงหนักหน่วงระดับไรเฟิล',
        slot: 2,
        price: 600,
        damage: 68,
        headshotMult: 3.2,
        fireRate: 0.34,
        auto: false,
        clipSize: 8,
        reserveMax: 96,
        reloadTime: 2.0,
        recoil: 0.045,
        spread: 0.008,
        range: 160,
        moveSpeed: 0.98,
        canScope: false
    },
    deagle: {
        id: 'deagle',
        name: 'Desert Eagle .50 AE',
        category: 'pistol',
        type: 'ปืนพกหนักยอดฮิต ยิงหัวทีเดียวจอด',
        slot: 2,
        price: 700,
        damage: 58,
        headshotMult: 3.3,
        fireRate: 0.26,
        auto: false,
        clipSize: 9,
        reserveMax: 108,
        reloadTime: 1.8,
        recoil: 0.038,
        spread: 0.012,
        range: 155,
        moveSpeed: 0.98,
        canScope: false
    },

    // ==================== 2. SHOTGUNS (SLOT 1) ====================
    nova: {
        id: 'nova',
        name: 'Benelli Nova Pump Shotgun',
        category: 'shotgun',
        type: 'ปืนลูกซองปั๊ม 9 ลูกปราย ระยะประชิดแรงจัด',
        slot: 1,
        price: 1050,
        damage: 22,
        pellets: 9,
        headshotMult: 2.0,
        fireRate: 0.68,
        auto: false,
        clipSize: 8,
        reserveMax: 80,
        reloadTime: 2.3,
        recoil: 0.055,
        spread: 0.048,
        range: 65,
        moveSpeed: 0.96,
        canScope: false
    },
    sawedoff: {
        id: 'sawedoff',
        name: 'Sawed-Off Heavy Shotgun',
        category: 'shotgun',
        type: 'ปืนลูกซองลำกล้องสั้น 11 ลูกปราย ดาเมจโหดสุด',
        slot: 1,
        price: 1100,
        damage: 25,
        pellets: 11,
        headshotMult: 2.0,
        fireRate: 0.72,
        auto: false,
        clipSize: 7,
        reserveMax: 70,
        reloadTime: 2.4,
        recoil: 0.065,
        spread: 0.065,
        range: 52,
        moveSpeed: 0.95,
        canScope: false
    },
    mag7: {
        id: 'mag7',
        name: 'MAG-7 Tactical Shotgun',
        category: 'shotgun',
        type: 'ปืนลูกซองใส่แม็กกาซีน รีโหลดไว คล่องตัว',
        slot: 1,
        price: 1300,
        damage: 23,
        pellets: 9,
        headshotMult: 2.0,
        fireRate: 0.62,
        auto: false,
        clipSize: 6,
        reserveMax: 72,
        reloadTime: 1.7,
        recoil: 0.050,
        spread: 0.050,
        range: 60,
        moveSpeed: 0.98,
        canScope: false
    },
    shotgun: {
        id: 'shotgun',
        name: 'XM1014 Auto Shotgun',
        category: 'shotgun',
        type: 'ปืนลูกซองกึ่งอัตโนมัติ ยิงรัวต่อเนื่อง (8 ลูกปราย)',
        slot: 1,
        price: 2000,
        damage: 19,
        pellets: 8,
        headshotMult: 2.0,
        fireRate: 0.28,
        auto: true,
        clipSize: 10,
        reserveMax: 100,
        reloadTime: 2.2,
        recoil: 0.042,
        spread: 0.052,
        range: 68,
        moveSpeed: 0.95,
        canScope: false
    },
    spas12: {
        id: 'spas12',
        name: 'SPAS-12 Military Shotgun',
        category: 'shotgun',
        type: 'ปืนลูกซองจู่โจมทหาร 10 ลูกปราย แรงและรัว',
        slot: 1,
        price: 2200,
        damage: 21,
        pellets: 10,
        headshotMult: 2.1,
        fireRate: 0.34,
        auto: true,
        clipSize: 10,
        reserveMax: 100,
        reloadTime: 2.3,
        recoil: 0.048,
        spread: 0.046,
        range: 72,
        moveSpeed: 0.94,
        canScope: false
    },

    // ==================== 3. SMGS (SLOT 1) ====================
    mac10: {
        id: 'mac10',
        name: 'Ingram MAC-10 SMG',
        category: 'smg',
        type: 'ปืนกลมือขนาดพกพา ลั่นไกเร็วจัด วิ่งไว',
        slot: 1,
        price: 1050,
        damage: 24,
        headshotMult: 2.1,
        fireRate: 0.065,
        auto: true,
        clipSize: 35,
        reserveMax: 245,
        reloadTime: 1.7,
        recoil: 0.015,
        spread: 0.024,
        range: 100,
        moveSpeed: 1.04,
        canScope: false
    },
    mp9: {
        id: 'mp9',
        name: 'B&T MP9 Tactical SMG',
        category: 'smg',
        type: 'ปืนกลมือหน่วยจู่โจม ยิงรัวเร็วสุดในหมวด SMG',
        slot: 1,
        price: 1250,
        damage: 24,
        headshotMult: 2.2,
        fireRate: 0.062,
        auto: true,
        clipSize: 35,
        reserveMax: 245,
        reloadTime: 1.6,
        recoil: 0.014,
        spread: 0.020,
        range: 105,
        moveSpeed: 1.03,
        canScope: false
    },
    ump45: {
        id: 'ump45',
        name: 'HK UMP-45 Heavy SMG',
        category: 'smg',
        type: 'ปืนกลมือกระสุน .45 ACP ดาเมจหนักแน่น',
        slot: 1,
        price: 1200,
        damage: 31,
        headshotMult: 2.4,
        fireRate: 0.088,
        auto: true,
        clipSize: 30,
        reserveMax: 210,
        reloadTime: 1.8,
        recoil: 0.016,
        spread: 0.016,
        range: 118,
        moveSpeed: 1.0,
        canScope: false
    },
    bizon: {
        id: 'bizon',
        name: 'PP-Bizon Helical (64 นัด)',
        category: 'smg',
        type: 'ปืนกลมือแม็กหลอด 64 นัด ยิงรัวไม่ต้องรีโหลดบ่อย',
        slot: 1,
        price: 1400,
        damage: 23,
        headshotMult: 2.1,
        fireRate: 0.072,
        auto: true,
        clipSize: 64,
        reserveMax: 320,
        reloadTime: 2.0,
        recoil: 0.013,
        spread: 0.022,
        range: 108,
        moveSpeed: 1.01,
        canScope: false
    },
    mp5: {
        id: 'mp5',
        name: 'MP5-SD Silenced SMG',
        category: 'smg',
        type: 'ปืนกลมือเก็บเสียง 9mm นิ่งและแม่นยำ',
        slot: 1,
        price: 1500,
        damage: 26,
        headshotMult: 2.3,
        fireRate: 0.072,
        auto: true,
        clipSize: 35,
        reserveMax: 245,
        reloadTime: 1.8,
        recoil: 0.011,
        spread: 0.016,
        range: 115,
        moveSpeed: 1.01,
        canScope: false
    },
    p90: {
        id: 'p90',
        name: 'FN P90 Tactical (50 นัด)',
        category: 'smg',
        type: 'ปืนกลเบา 50 นัด ยอดฮิตสายวิ่งบุกทะลวง',
        slot: 1,
        price: 2350,
        damage: 26,
        headshotMult: 2.3,
        fireRate: 0.064,
        auto: true,
        clipSize: 50,
        reserveMax: 300,
        reloadTime: 2.1,
        recoil: 0.013,
        spread: 0.018,
        range: 120,
        moveSpeed: 1.0,
        canScope: false
    },

    // ==================== 4. HEAVY MACHINE GUNS (SLOT 1) ====================
    negev: {
        id: 'negev',
        name: 'IWI Negev LMG (150 นัด)',
        category: 'mg',
        type: 'ปืนกลหนัก 150 นัด ยิงรัวเป็นสายน้ำ กดดันศัตรู',
        slot: 1,
        price: 1700,
        damage: 32,
        headshotMult: 2.5,
        fireRate: 0.062,
        auto: true,
        clipSize: 150,
        reserveMax: 450,
        reloadTime: 3.4,
        recoil: 0.018,
        spread: 0.022,
        range: 165,
        moveSpeed: 0.84,
        canScope: false
    },
    m249: {
        id: 'm249',
        name: 'M249 SAW Para (120 นัด)',
        category: 'mg',
        type: 'ปืนกลหนักจู่โจม 120 นัด ดาเมจแรงและแม่นยำ',
        slot: 1,
        price: 5200,
        damage: 35,
        headshotMult: 2.7,
        fireRate: 0.072,
        auto: true,
        clipSize: 120,
        reserveMax: 360,
        reloadTime: 3.2,
        recoil: 0.017,
        spread: 0.016,
        range: 175,
        moveSpeed: 0.86,
        canScope: false
    },

    // ==================== 5. ASSAULT RIFLES (SLOT 1) ====================
    galil: {
        id: 'galil',
        name: 'Galil AR Assault Rifle',
        category: 'rifle',
        type: 'ปืนไรเฟิลจู่โจม 40 นัด คุ้มราคา กระสุนเยอะ',
        slot: 1,
        price: 1800,
        damage: 32,
        headshotMult: 2.7,
        fireRate: 0.088,
        auto: true,
        clipSize: 40,
        reserveMax: 240,
        reloadTime: 2.0,
        recoil: 0.017,
        spread: 0.014,
        range: 170,
        moveSpeed: 0.94,
        canScope: false
    },
    famas: {
        id: 'famas',
        name: 'FAMAS F1 Bullpup Rifle',
        category: 'rifle',
        type: 'ปืนไรเฟิลฝรั่งเศส 35 นัด ลั่นไว แรงดีดต่ำ',
        slot: 1,
        price: 2050,
        damage: 31,
        headshotMult: 2.7,
        fireRate: 0.082,
        auto: true,
        clipSize: 35,
        reserveMax: 210,
        reloadTime: 1.9,
        recoil: 0.014,
        spread: 0.011,
        range: 170,
        moveSpeed: 0.95,
        canScope: false
    },
    ak47: {
        id: 'ak47',
        name: 'CV-47 (AK-47 Kalashnikov)',
        category: 'rifle',
        type: 'ปืนไรเฟิล 7.62mm ดาเมจแรง ยิงหัวทีเดียวจอด',
        slot: 1,
        price: 2700,
        damage: 37,
        headshotMult: 3.1,
        fireRate: 0.098,
        auto: true,
        clipSize: 35,
        reserveMax: 245,
        reloadTime: 2.1,
        recoil: 0.021,
        spread: 0.013,
        range: 185,
        moveSpeed: 0.92,
        canScope: false
    },
    m4a1: {
        id: 'm4a1',
        name: 'M4A1-S Silenced Carbine',
        category: 'rifle',
        type: 'ปืนไรเฟิลเก็บเสียง 5.56mm นิ่งและแม่นยำสูงมาก',
        slot: 1,
        price: 2900,
        damage: 34,
        headshotMult: 2.8,
        fireRate: 0.088,
        auto: true,
        clipSize: 30,
        reserveMax: 210,
        reloadTime: 2.0,
        recoil: 0.013,
        spread: 0.008,
        range: 185,
        moveSpeed: 0.94,
        canScope: false
    },
    m4a4: {
        id: 'm4a4',
        name: 'M4A4 Tactical Carbine',
        category: 'rifle',
        type: 'ปืนไรเฟิลจู่โจม 35 นัด ยิงรัวเร็ว จุกระสุนเยอะ',
        slot: 1,
        price: 3100,
        damage: 34,
        headshotMult: 2.8,
        fireRate: 0.082,
        auto: true,
        clipSize: 35,
        reserveMax: 245,
        reloadTime: 2.0,
        recoil: 0.015,
        spread: 0.010,
        range: 185,
        moveSpeed: 0.94,
        canScope: false
    },
    sg553: {
        id: 'sg553',
        name: 'SG 553 Krieg (ไรเฟิลติดซูม)',
        category: 'rifle',
        type: 'ปืนไรเฟิลเจาะเกราะติดกล้องซูม คลิกขวาซูมยิงได้',
        slot: 1,
        price: 3000,
        damage: 36,
        headshotMult: 3.0,
        fireRate: 0.092,
        auto: true,
        clipSize: 35,
        reserveMax: 245,
        reloadTime: 2.1,
        recoil: 0.016,
        spread: 0.006,
        unscopedSpread: 0.014,
        range: 200,
        moveSpeed: 0.91,
        canScope: true
    },
    aug: {
        id: 'aug',
        name: 'Steyr AUG A3 (ไรเฟิลติดซูม)',
        category: 'rifle',
        type: 'ปืนไรเฟิล Bullpup ติดลำกล้องซูม แม่นราวจับวาง',
        slot: 1,
        price: 3300,
        damage: 34,
        headshotMult: 2.9,
        fireRate: 0.086,
        auto: true,
        clipSize: 35,
        reserveMax: 245,
        reloadTime: 2.1,
        recoil: 0.013,
        spread: 0.005,
        unscopedSpread: 0.012,
        range: 200,
        moveSpeed: 0.92,
        canScope: true
    },

    // ==================== 6. SNIPER RIFLES (SLOT 1) ====================
    ssg08: {
        id: 'ssg08',
        name: 'SSG 08 Scout Sniper',
        category: 'sniper',
        type: 'ปืนสไนเปอร์น้ำหนักเบา วิ่งไว ยิงหัวทีเดียวจอด',
        slot: 1,
        price: 1700,
        damage: 88,
        headshotMult: 3.5,
        fireRate: 0.95,
        auto: false,
        clipSize: 12,
        reserveMax: 120,
        reloadTime: 2.2,
        recoil: 0.05,
        spread: 0.001,
        unscopedSpread: 0.035,
        range: 280,
        moveSpeed: 0.98,
        canScope: true
    },
    awp: {
        id: 'awp',
        name: 'AWP Magnum Sniper',
        category: 'sniper',
        type: 'ปืนสไนเปอร์ .338 มหาประลัย ยิงโดนตัวนัดเดียวจอด',
        slot: 1,
        price: 4750,
        damage: 118,
        headshotMult: 4.0,
        fireRate: 1.20,
        auto: false,
        clipSize: 10,
        reserveMax: 100,
        reloadTime: 2.8,
        recoil: 0.08,
        spread: 0.001,
        unscopedSpread: 0.065,
        range: 300,
        moveSpeed: 0.84,
        canScope: true
    },
    scar20: {
        id: 'scar20',
        name: 'SCAR-20 Auto-Sniper (ยิงรัว)',
        category: 'sniper',
        type: 'ปืนสไนเปอร์กึ่งอัตโนมัติ 20 นัด ซูมยิงรัวต่อเนื่อง!',
        slot: 1,
        price: 5000,
        damage: 66,
        headshotMult: 3.0,
        fireRate: 0.24,
        auto: true,
        clipSize: 20,
        reserveMax: 180,
        reloadTime: 2.5,
        recoil: 0.032,
        spread: 0.002,
        unscopedSpread: 0.045,
        range: 290,
        moveSpeed: 0.86,
        canScope: true
    },

    // ==================== 7. MELEE & GRENADES (SLOT 3 & 4) ====================
    knife: {
        id: 'knife',
        name: 'M9 Bayonet / Combat Knife',
        category: 'melee',
        type: 'มีดปลายปืนจู่โจมระยะประชิด (วิ่งเร็วสุด)',
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
        canScope: false
    },
    hegrenade: {
        id: 'hegrenade',
        name: 'M67 High-Explosive Heavy Grenade (x10 Pack)',
        category: 'equip',
        type: 'ระเบิดสังหารมหาประลัย ซื้อ 1 ครั้งได้ 10 ลูก (พกได้สูงสุด 10 ลูก | ดาเมจ 280 HP)',
        slot: 4,
        price: 300,
        damage: 280,
        headshotMult: 1.0,
        fireRate: 0.55,
        auto: false,
        clipSize: 1,
        reserveMax: 9,
        maxCarry: 10,
        reloadTime: 0.35,
        recoil: 0,
        spread: 0,
        range: 45,
        moveSpeed: 1.05,
        canScope: false
    }
};

let _cachedWeaponTextures = null;
function getWeaponTextures() {
    if (_cachedWeaponTextures) return _cachedWeaponTextures;

    // 1. Anodized Machined Gunmetal Texture (with fine mill marks & edge wear)
    const metalCanvas = document.createElement('canvas');
    metalCanvas.width = 512;
    metalCanvas.height = 512;
    const mCtx = metalCanvas.getContext('2d');
    mCtx.fillStyle = '#1d2125';
    mCtx.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 4000; i++) {
        mCtx.fillStyle = i % 2 === 0 ? 'rgba(255,255,255,0.055)' : 'rgba(0,0,0,0.22)';
        mCtx.fillRect(Math.random() * 512, Math.random() * 512, 24 + Math.random() * 60, 1);
    }
    const metalTex = new THREE.CanvasTexture(metalCanvas);

    // 2. Ventilated Picatinny Rail / Barrel Shroud Texture
    const railCanvas = document.createElement('canvas');
    railCanvas.width = 256;
    railCanvas.height = 256;
    const rCtx = railCanvas.getContext('2d');
    rCtx.fillStyle = '#202428';
    rCtx.fillRect(0, 0, 256, 256);
    for (let x = 8; x < 256; x += 24) {
        rCtx.fillStyle = '#090b0d';
        rCtx.fillRect(x, 30, 12, 55);
        rCtx.fillRect(x, 150, 12, 55);
        rCtx.fillStyle = '#363c42';
        rCtx.fillRect(x, 0, 10, 18);
    }
    const railTex = new THREE.CanvasTexture(railCanvas);
    railTex.wrapS = THREE.RepeatWrapping;
    railTex.wrapT = THREE.RepeatWrapping;

    // 3. Rich Russian Redwood / Walnut Varnished Stock Texture
    const woodCanvas = document.createElement('canvas');
    woodCanvas.width = 512;
    woodCanvas.height = 512;
    const wCtx = woodCanvas.getContext('2d');
    const wGrad = wCtx.createLinearGradient(0, 0, 0, 512);
    wGrad.addColorStop(0, '#5e2c12');
    wGrad.addColorStop(0.5, '#733818');
    wGrad.addColorStop(1, '#47200c');
    wCtx.fillStyle = wGrad;
    wCtx.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 1600; i++) {
        wCtx.fillStyle = i % 2 === 0 ? 'rgba(20, 8, 2, 0.28)' : 'rgba(165, 90, 42, 0.14)';
        wCtx.fillRect(0, Math.random() * 512, 512, 1 + Math.random() * 2.5);
    }
    const woodTex = new THREE.CanvasTexture(woodCanvas);

    // 4. Tactical Kevlar / Cordura Glove Weave Texture
    const fabricCanvas = document.createElement('canvas');
    fabricCanvas.width = 256;
    fabricCanvas.height = 256;
    const fCtx = fabricCanvas.getContext('2d');
    fCtx.fillStyle = '#222521';
    fCtx.fillRect(0, 0, 256, 256);
    for (let y = 0; y < 256; y += 3) {
        for (let x = 0; x < 256; x += 3) {
            if ((x + y) % 6 === 0) {
                fCtx.fillStyle = 'rgba(255,255,255,0.06)';
                fCtx.fillRect(x, y, 1.5, 1.5);
            }
        }
    }
    const fabricTex = new THREE.CanvasTexture(fabricCanvas);

    _cachedWeaponTextures = { metalTex, railTex, woodTex, fabricTex };
    return _cachedWeaponTextures;
}

function createWeaponViewModel(weaponId) {
    const group = new THREE.Group();
    const wep = WEAPONS[weaponId] || WEAPONS.ak47;
    const { metalTex, railTex, woodTex, fabricTex } = getWeaponTextures();

    // High-Realism PBR Materials
    const gunMetal = new THREE.MeshStandardMaterial({
        map: metalTex, bumpMap: metalTex, bumpScale: 0.012,
        color: 0x24292e, roughness: 0.32, metalness: 0.88
    });
    const darkReceiverMat = new THREE.MeshStandardMaterial({
        map: metalTex, bumpMap: metalTex, bumpScale: 0.015,
        color: 0x171a1d, roughness: 0.38, metalness: 0.82
    });
    const railMat = new THREE.MeshStandardMaterial({
        map: railTex, bumpMap: railTex, bumpScale: 0.025,
        color: 0x262b30, roughness: 0.36, metalness: 0.85
    });
    const steelBarrelMat = new THREE.MeshStandardMaterial({
        map: metalTex, bumpMap: metalTex, bumpScale: 0.008,
        color: 0x454c54, roughness: 0.24, metalness: 0.94
    });
    const chromeMat = new THREE.MeshStandardMaterial({
        map: metalTex, color: 0xcbd5e1, roughness: 0.16, metalness: 0.97
    });
    const brassMat = new THREE.MeshStandardMaterial({
        color: 0xd97706, roughness: 0.22, metalness: 0.92
    });
    const shellRedMat = new THREE.MeshStandardMaterial({
        color: 0xb91c1c, roughness: 0.4, metalness: 0.2
    });
    const tanPolymerMat = new THREE.MeshStandardMaterial({
        map: fabricTex, bumpMap: fabricTex, bumpScale: 0.012,
        color: 0x8c7a5b, roughness: 0.52, metalness: 0.18
    });
    const woodMat = new THREE.MeshStandardMaterial({
        map: woodTex, bumpMap: woodTex, bumpScale: 0.018,
        roughness: 0.48, metalness: 0.08
    });
    const polymerOliveMat = new THREE.MeshStandardMaterial({
        map: fabricTex, bumpMap: fabricTex, bumpScale: 0.012,
        color: 0x354230, roughness: 0.50, metalness: 0.18
    });
    const bakeliteMat = new THREE.MeshStandardMaterial({
        map: woodTex, color: 0x853212, roughness: 0.36, metalness: 0.25
    });
    const gloveMat = new THREE.MeshStandardMaterial({
        map: fabricTex, bumpMap: fabricTex, bumpScale: 0.018,
        color: 0x1a1c19, roughness: 0.75, metalness: 0.12
    });
    const sleeveMat = new THREE.MeshStandardMaterial({
        map: fabricTex, bumpMap: fabricTex, bumpScale: 0.022,
        color: 0x30362d, roughness: 0.86, metalness: 0.05
    });
    const tritiumGlowMat = new THREE.MeshBasicMaterial({ color: 0x22c55e });
    const opticLensMat = new THREE.MeshStandardMaterial({
        color: 0x0284c7, roughness: 0.05, metalness: 0.95, transparent: true, opacity: 0.85
    });

    // Helper: Build articulated gloved hand + fingers + forearm
    const buildHandAndArm = (isRight = true, pos = [0, -0.05, 0.08], armRot = [Math.PI / 2 + 0.22, 0, 0.12]) => {
        const hGroup = new THREE.Group();
        const palm = new THREE.Mesh(new THREE.BoxGeometry(0.052, 0.062, 0.095), gloveMat);
        const knucklePlate = new THREE.Mesh(new THREE.BoxGeometry(0.056, 0.018, 0.048), darkReceiverMat);
        knucklePlate.position.set(0, 0.026, -0.01);
        // Wrapped fingers
        for (let f = 0; f < 4; f++) {
            const finger = new THREE.Mesh(new THREE.CylinderGeometry(0.009, 0.008, 0.055, 8), gloveMat);
            finger.rotation.z = Math.PI / 2;
            finger.position.set(isRight ? -0.022 : 0.022, 0.012 - f * 0.014, -0.015 - f * 0.015);
            hGroup.add(finger);
        }
        const wristWatch = new THREE.Mesh(new THREE.CylinderGeometry(0.036, 0.036, 0.025, 12), darkReceiverMat);
        wristWatch.rotation.x = Math.PI / 2;
        wristWatch.position.set(0, 0, 0.06);

        const forearm = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.048, 0.30, 14), sleeveMat);
        forearm.position.set(isRight ? 0.03 : -0.05, -0.04, 0.19);
        forearm.rotation.set(armRot[0], armRot[1], armRot[2]);

        hGroup.add(palm, knucklePlate, wristWatch, forearm);
        hGroup.position.set(pos[0], pos[1], pos[2]);
        return hGroup;
    };

    // Helper: Add Trigger Guard & Curved Trigger to any gun
    const addTriggerAssembly = (parent, x = 0, y = -0.045, z = 0.05) => {
        const guardBottom = new THREE.Mesh(new THREE.BoxGeometry(0.016, 0.006, 0.06), darkReceiverMat);
        guardBottom.position.set(x, y - 0.018, z);
        const guardFront = new THREE.Mesh(new THREE.BoxGeometry(0.016, 0.036, 0.006), darkReceiverMat);
        guardFront.position.set(x, y, z - 0.028);
        const trigger = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.003, 0.028, 6), steelBarrelMat);
        trigger.position.set(x, y + 0.002, z + 0.005);
        trigger.rotation.x = 0.35;
        parent.add(guardBottom, guardFront, trigger);
    };

    // ==================== MELEE: M9 BAYONET COMBAT KNIFE ====================
    if (weaponId === 'knife') {
        group.add(buildHandAndArm(true, [0, -0.04, 0.06]));
        const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.020, 0.022, 0.135, 14), polymerOliveMat);
        handle.rotation.x = Math.PI / 2;
        // Handle grip rings
        for (let r = -2; r <= 2; r++) {
            const groove = new THREE.Mesh(new THREE.TorusGeometry(0.021, 0.0025, 6, 14), darkReceiverMat);
            groove.position.set(0, 0, r * 0.02);
            group.add(groove);
        }
        const pommel = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.022, 0.018, 12), gunMetal);
        pommel.rotation.x = Math.PI / 2;
        pommel.position.set(0, 0, 0.075);

        const guard = new THREE.Mesh(new THREE.BoxGeometry(0.022, 0.088, 0.014), gunMetal);
        guard.position.set(0, 0.008, -0.072);
        const barrelRing = new THREE.Mesh(new THREE.TorusGeometry(0.014, 0.004, 8, 14), gunMetal);
        barrelRing.position.set(0, 0.036, -0.072);

        const blade = new THREE.Mesh(new THREE.BoxGeometry(0.006, 0.040, 0.25), chromeMat);
        blade.position.set(0, 0.006, -0.20);
        const bladeTip = new THREE.Mesh(new THREE.ConeGeometry(0.020, 0.065, 4), chromeMat);
        bladeTip.rotation.x = -Math.PI / 2;
        bladeTip.rotation.z = Math.PI / 4;
        bladeTip.scale.set(0.3, 1, 1);
        bladeTip.position.set(0, 0.006, -0.35);

        const fuller = new THREE.Mesh(new THREE.BoxGeometry(0.008, 0.009, 0.17), darkReceiverMat);
        fuller.position.set(0, 0.012, -0.17);

        group.add(handle, pommel, guard, barrelRing, blade, bladeTip, fuller);
        group.rotation.set(0.15, 0.22, -0.12);
        group.position.set(0.22, -0.20, -0.36);
        return group;
    }

    // ==================== GRENADE: M67 FRAG ====================
    if (weaponId === 'hegrenade') {
        group.add(buildHandAndArm(true, [0, -0.04, 0.06]));
        const body = new THREE.Mesh(new THREE.SphereGeometry(0.058, 20, 20), polymerOliveMat);
        const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.059, 0.059, 0.014, 20), brassMat);
        const fuseHead = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.025, 0.046, 12), steelBarrelMat);
        fuseHead.position.set(0, 0.065, 0);
        const spoon = new THREE.Mesh(new THREE.BoxGeometry(0.014, 0.082, 0.022), gunMetal);
        spoon.position.set(0.038, 0.024, 0);
        spoon.rotation.z = 0.15;
        const pinRing = new THREE.Mesh(new THREE.TorusGeometry(0.018, 0.003, 8, 16), chromeMat);
        pinRing.position.set(-0.025, 0.065, 0.01);
        group.add(body, collar, fuseHead, spoon, pinRing);
        group.position.set(0.22, -0.21, -0.38);
        return group;
    }

    // ==================== PISTOLS ====================
    if (wep.category === 'pistol') {
        const buildDetailedPistol = (offsetX = 0) => {
            const pGroup = new THREE.Group();
            const isDeagle = weaponId === 'deagle';
            const isRevolver = weaponId === 'revolver';
            const slideMat = (isDeagle || isRevolver) ? chromeMat : (weaponId === 'glock' ? darkReceiverMat : gunMetal);

            // Lower Frame + Under-barrel Accessory Rail
            const frameLen = isDeagle ? 0.25 : 0.20;
            const frame = new THREE.Mesh(new THREE.BoxGeometry(0.036, 0.024, frameLen), darkReceiverMat);
            frame.position.set(offsetX, 0.006, -0.02);

            const tacLaser = new THREE.Mesh(new THREE.BoxGeometry(0.028, 0.018, 0.065), gunMetal);
            tacLaser.position.set(offsetX, -0.012, -0.08);
            const laserLens = new THREE.Mesh(new THREE.CylinderGeometry(0.005, 0.005, 0.005, 8), new THREE.MeshBasicMaterial({ color: 0xef4444 }));
            laserLens.rotation.x = Math.PI / 2;
            laserLens.position.set(offsetX, -0.012, -0.115);

            // Upper Slide with Beveled Top & Ejection Port
            const slideW = isDeagle ? 0.045 : 0.038;
            const slideH = isDeagle ? 0.048 : 0.038;
            const slideL = isDeagle ? 0.28 : 0.225;
            const slide = new THREE.Mesh(new THREE.BoxGeometry(slideW, slideH, slideL), slideMat);
            slide.position.set(offsetX, 0.036, -0.035);

            const slideTop = new THREE.Mesh(new THREE.CylinderGeometry(slideW * 0.45, slideW * 0.5, slideL, 8), slideMat);
            slideTop.rotation.x = Math.PI / 2;
            slideTop.scale.set(1, 0.45, 1);
            slideTop.position.set(offsetX, 0.060, -0.035);

            // Silver Ejection Port on right side of slide
            const ejPort = new THREE.Mesh(new THREE.BoxGeometry(0.004, 0.018, 0.045), chromeMat);
            ejPort.position.set(offsetX + slideW / 2, 0.042, -0.01);

            // Inner Barrel + Dark Muzzle Crown
            const muzzleBore = new THREE.Mesh(new THREE.CylinderGeometry(0.010, 0.010, 0.03, 12), darkReceiverMat);
            muzzleBore.rotation.x = Math.PI / 2;
            muzzleBore.position.set(offsetX, 0.036, -0.035 - slideL / 2);

            if (isRevolver) {
                const cyl = new THREE.Mesh(new THREE.CylinderGeometry(0.030, 0.030, 0.072, 12), chromeMat);
                cyl.rotation.x = Math.PI / 2;
                cyl.position.set(offsetX, 0.032, 0.015);
                pGroup.add(cyl);
            }

            if (weaponId === 'pistol') {
                // USP-S Knurled Suppressor
                const supp = new THREE.Mesh(new THREE.CylinderGeometry(0.017, 0.017, 0.17, 16), darkReceiverMat);
                supp.rotation.x = Math.PI / 2;
                supp.position.set(offsetX, 0.036, -0.23);
                pGroup.add(supp);
            }

            // Contoured Ergonomic Grip + Mag Baseplate
            const gripMat = isRevolver ? woodMat : gloveMat;
            const grip = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.125, 0.054), gripMat);
            grip.position.set(offsetX, -0.048, 0.048);
            grip.rotation.x = 0.28;
            const baseplate = new THREE.Mesh(new THREE.BoxGeometry(0.038, 0.012, 0.062), darkReceiverMat);
            baseplate.position.set(offsetX, -0.108, 0.065);
            baseplate.rotation.x = 0.28;

            // Glowing 3-Dot Tritium Night Sights + Hammer
            const rearSight = new THREE.Mesh(new THREE.BoxGeometry(0.032, 0.012, 0.014), darkReceiverMat);
            rearSight.position.set(offsetX, 0.068, 0.065);
            const dotL = new THREE.Mesh(new THREE.SphereGeometry(0.0025, 6, 6), tritiumGlowMat);
            dotL.position.set(offsetX - 0.008, 0.069, 0.073);
            const dotR = new THREE.Mesh(new THREE.SphereGeometry(0.0025, 6, 6), tritiumGlowMat);
            dotR.position.set(offsetX + 0.008, 0.069, 0.073);

            const frontSight = new THREE.Mesh(new THREE.BoxGeometry(0.007, 0.013, 0.014), darkReceiverMat);
            frontSight.position.set(offsetX, 0.068, -0.025 - slideL / 2);
            const dotF = new THREE.Mesh(new THREE.SphereGeometry(0.0028, 6, 6), tritiumGlowMat);
            dotF.position.set(offsetX, 0.070, -0.020 - slideL / 2);

            const hammer = new THREE.Mesh(new THREE.BoxGeometry(0.008, 0.018, 0.018), steelBarrelMat);
            hammer.position.set(offsetX, 0.048, 0.082);
            hammer.rotation.x = -0.4;

            addTriggerAssembly(pGroup, offsetX, -0.015, 0.01);

            pGroup.add(frame, tacLaser, laserLens, slide, slideTop, ejPort, muzzleBore, grip, baseplate, rearSight, dotL, dotR, frontSight, dotF, hammer);
            return pGroup;
        };

        group.add(buildHandAndArm(true, [0, -0.055, 0.085]));
        group.add(buildDetailedPistol(0));
        if (weaponId === 'dualelites') {
            group.add(buildHandAndArm(false, [-0.34, -0.055, 0.085], [Math.PI / 2 + 0.22, 0, -0.12]));
            group.add(buildDetailedPistol(-0.34));
        } else {
            // Two-handed tactical pistol grip support hand
            group.add(buildHandAndArm(false, [-0.025, -0.065, 0.065], [Math.PI / 2 + 0.28, 0, -0.28]));
        }

        attachMuzzleEffects(group, weaponId === 'pistol' ? -0.32 : -0.22);
        group.rotation.set(0.02, 0.05, 0);
        group.position.set(0.20, -0.20, -0.39);
        return group;
    }

    // ==================== TWO-HANDED LONG GUNS (Hands Setup) ====================
    group.add(buildHandAndArm(true, [0, -0.075, 0.11]));
    group.add(buildHandAndArm(false, [-0.018, -0.032, -0.25], [Math.PI / 2 + 0.25, 0, -0.42]));

    // ==================== SHOTGUNS (NOVA, SAWED-OFF, MAG-7, XM1014, SPAS-12) ====================
    if (wep.category === 'shotgun') {
        const isSawed = weaponId === 'sawedoff';
        const isSpas = weaponId === 'spas12';
        const receiver = new THREE.Mesh(new THREE.BoxGeometry(0.056, 0.082, 0.36), isSawed ? steelBarrelMat : gunMetal);
        const upperRound = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.36, 12), isSawed ? steelBarrelMat : gunMetal);
        upperRound.rotation.x = Math.PI / 2;
        upperRound.position.set(0, 0.041, 0);

        // Silver Bolt / Ejection Port
        const boltPort = new THREE.Mesh(new THREE.BoxGeometry(0.005, 0.022, 0.085), chromeMat);
        boltPort.position.set(0.028, 0.022, -0.02);

        // Side-Saddle Tactical Shell Holder with 4 Red 12-Gauge Shells!
        for (let s = 0; s < 4; s++) {
            const shellBody = new THREE.Mesh(new THREE.CylinderGeometry(0.0085, 0.0085, 0.048, 10), shellRedMat);
            shellBody.position.set(-0.033, 0.015, 0.06 - s * 0.025);
            const shellBrass = new THREE.Mesh(new THREE.CylinderGeometry(0.009, 0.009, 0.014, 10), brassMat);
            shellBrass.position.set(-0.033, 0.038, 0.06 - s * 0.025);
            group.add(shellBody, shellBrass);
        }

        const barrelLen = isSawed ? 0.32 : 0.52;
        const topBarrel = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, barrelLen, 16), steelBarrelMat);
        topBarrel.rotation.x = Math.PI / 2;
        topBarrel.position.set(0, 0.032, -0.18 - barrelLen / 2);

        // Ventilated Sight Rib on top of shotgun barrel
        const ventRib = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.008, barrelLen * 0.95), railMat);
        ventRib.position.set(0, 0.048, -0.18 - barrelLen / 2);

        if (isSpas || weaponId === 'shotgun') {
            const heatShield = new THREE.Mesh(new THREE.CylinderGeometry(0.020, 0.020, barrelLen * 0.65, 12), railMat);
            heatShield.rotation.x = Math.PI / 2;
            heatShield.position.set(0, 0.034, -0.32);
            group.add(heatShield);
        }

        const tubeMag = new THREE.Mesh(new THREE.CylinderGeometry(0.013, 0.013, barrelLen * 0.90, 14), darkReceiverMat);
        tubeMag.rotation.x = Math.PI / 2;
        tubeMag.position.set(0, 0.002, -0.18 - (barrelLen * 0.90) / 2);

        // Ribbed Pump-Action Forend
        const pumpMat = isSawed ? woodMat : gloveMat;
        const pumpHandle = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.026, 0.21, 14), pumpMat);
        pumpHandle.rotation.x = Math.PI / 2;
        pumpHandle.position.set(0, -0.004, -0.31);

        const pistolGrip = new THREE.Mesh(new THREE.BoxGeometry(0.038, 0.12, 0.052), pumpMat);
        pistolGrip.position.set(0, -0.075, 0.11);
        pistolGrip.rotation.x = 0.28;

        const stock = new THREE.Mesh(new THREE.BoxGeometry(0.046, 0.088, isSawed ? 0.12 : 0.27), pumpMat);
        stock.position.set(0, -0.022, isSawed ? 0.20 : 0.27);
        stock.rotation.x = -0.10;

        addTriggerAssembly(group, 0, -0.042, 0.06);
        group.add(receiver, upperRound, boltPort, topBarrel, ventRib, tubeMag, pumpHandle, pistolGrip, stock);
        attachMuzzleEffects(group, -0.22 - barrelLen);
        group.rotation.set(0.02, 0.06, 0);
        group.position.set(0.21, -0.21, -0.39);
        return group;
    }

    // ==================== HEAVY MACHINE GUNS (M249 SAW / NEGEV LMG) ====================
    if (wep.category === 'mg') {
        const receiver = new THREE.Mesh(new THREE.BoxGeometry(0.074, 0.102, 0.46), gunMetal);
        const topFeedCover = new THREE.Mesh(new THREE.BoxGeometry(0.068, 0.022, 0.28), darkReceiverMat);
        topFeedCover.position.set(0, 0.060, -0.02);

        const rearSight = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.028, 0.025), darkReceiverMat);
        rearSight.position.set(0, 0.082, 0.10);

        const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.017, 0.48, 16), steelBarrelMat);
        barrel.rotation.x = Math.PI / 2;
        barrel.position.set(0, 0.022, -0.44);

        const heatShroud = new THREE.Mesh(new THREE.BoxGeometry(0.068, 0.068, 0.28), railMat);
        heatShroud.position.set(0, 0.016, -0.33);

        // Carry Handle
        const carryBar = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.11, 8), darkReceiverMat);
        carryBar.rotation.x = Math.PI / 2;
        carryBar.position.set(0.045, 0.085, -0.16);

        // Big 150-Round Box Magazine + Brass Bullet Belt feeding into receiver!
        const boxMag = new THREE.Mesh(new THREE.BoxGeometry(0.115, 0.165, 0.145), weaponId === 'negev' ? tanPolymerMat : polymerOliveMat);
        boxMag.position.set(0, -0.125, -0.08);

        for (let b = 0; b < 6; b++) {
            const cartridge = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.048, 8), brassMat);
            cartridge.rotation.z = Math.PI / 2 - b * 0.12;
            cartridge.position.set(-0.052, -0.03 + b * 0.012, -0.06 - b * 0.012);
            group.add(cartridge);
        }

        // Folded Bipod Legs under barrel
        const bipodL = new THREE.Mesh(new THREE.CylinderGeometry(0.007, 0.007, 0.24, 8), darkReceiverMat);
        bipodL.rotation.x = Math.PI / 2;
        bipodL.position.set(-0.028, -0.032, -0.36);
        const bipodR = new THREE.Mesh(new THREE.CylinderGeometry(0.007, 0.007, 0.24, 8), darkReceiverMat);
        bipodR.rotation.x = Math.PI / 2;
        bipodR.position.set(0.028, -0.032, -0.36);

        const pistolGrip = new THREE.Mesh(new THREE.BoxGeometry(0.040, 0.125, 0.055), gloveMat);
        pistolGrip.position.set(0, -0.08, 0.11);
        pistolGrip.rotation.x = 0.28;

        const stock = new THREE.Mesh(new THREE.BoxGeometry(0.054, 0.095, 0.25), darkReceiverMat);
        stock.position.set(0, -0.012, 0.28);

        addTriggerAssembly(group, 0, -0.048, 0.06);
        group.add(receiver, topFeedCover, rearSight, barrel, heatShroud, carryBar, boxMag, bipodL, bipodR, pistolGrip, stock);
        attachMuzzleEffects(group, -0.70);
        group.rotation.set(0.02, 0.06, 0);
        group.position.set(0.22, -0.22, -0.39);
        return group;
    }

    // ==================== RIFLES, SMGS & SNIPERS ====================
    let bodyMat = gunMetal;
    if (weaponId === 'awp' || weaponId === 'aug' || weaponId === 'sg553') bodyMat = polymerOliveMat;
    else if (weaponId === 'scar20' || weaponId === 'p90') bodyMat = tanPolymerMat;

    const receiver = new THREE.Mesh(new THREE.BoxGeometry(0.056, 0.080, 0.39), bodyMat);
    const upperCover = new THREE.Mesh(new THREE.CylinderGeometry(0.027, 0.028, 0.38, 12), darkReceiverMat);
    upperCover.rotation.x = Math.PI / 2;
    upperCover.position.set(0, 0.040, -0.005);

    // Top Picatinny Rail
    const topRail = new THREE.Mesh(new THREE.BoxGeometry(0.030, 0.010, 0.32), railMat);
    topRail.position.set(0, 0.066, -0.01);

    // Silver Bolt Carrier / Ejection Port + Charging Handle on right side
    const ejPort = new THREE.Mesh(new THREE.BoxGeometry(0.005, 0.020, 0.075), chromeMat);
    ejPort.position.set(0.028, 0.028, -0.03);
    const chargingHandle = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.032, 8), steelBarrelMat);
    chargingHandle.rotation.z = Math.PI / 2;
    chargingHandle.position.set(0.040, 0.030, -0.06);

    const pistolGrip = new THREE.Mesh(new THREE.BoxGeometry(0.038, 0.125, 0.055), gloveMat);
    pistolGrip.position.set(0, -0.08, 0.11);
    pistolGrip.rotation.x = 0.28;

    addTriggerAssembly(group, 0, -0.042, 0.06);
    group.add(receiver, upperCover, topRail, ejPort, chargingHandle, pistolGrip);

    const isSniper = wep.category === 'sniper';
    const barrelLen = isSniper ? 0.64 : (wep.category === 'smg' ? 0.24 : 0.38);
    const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.014, barrelLen, 16), steelBarrelMat);
    barrel.rotation.x = Math.PI / 2;
    barrel.position.set(0, 0.020, -0.19 - barrelLen / 2);

    // Muzzle Brake / Flash Hider at tip of barrel
    const muzzleBrake = new THREE.Mesh(
        new THREE.BoxGeometry(isSniper ? 0.034 : 0.022, isSniper ? 0.028 : 0.022, isSniper ? 0.065 : 0.045),
        darkReceiverMat
    );
    muzzleBrake.position.set(0, 0.020, -0.19 - barrelLen);
    group.add(barrel, muzzleBrake);

    // Front & Rear Iron Sights (with glowing Tritium dot!)
    const rearSight = new THREE.Mesh(new THREE.BoxGeometry(0.034, 0.024, 0.024), darkReceiverMat);
    rearSight.position.set(0, 0.078, 0.11);
    const frontPost = new THREE.Mesh(new THREE.BoxGeometry(0.010, 0.052, 0.020), darkReceiverMat);
    frontPost.position.set(0, 0.048, -0.18 - barrelLen * 0.72);
    const frontGlow = new THREE.Mesh(new THREE.SphereGeometry(0.003, 6, 6), tritiumGlowMat);
    frontGlow.position.set(0, 0.072, -0.17 - barrelLen * 0.72);
    group.add(rearSight, frontPost, frontGlow);

    if (weaponId === 'ak47' || weaponId === 'galil') {
        const isAK = weaponId === 'ak47';
        const furnMat = isAK ? woodMat : gloveMat;

        // AK Gas Tube & Upper/Lower Handguard
        const gasTube = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.25, 12), darkReceiverMat);
        gasTube.rotation.x = Math.PI / 2;
        gasTube.position.set(0, 0.046, -0.30);

        const upperHg = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.026, 0.18, 10), furnMat);
        upperHg.rotation.x = Math.PI / 2;
        upperHg.position.set(0, 0.038, -0.28);

        const lowerHg = new THREE.Mesh(new THREE.BoxGeometry(0.058, 0.048, 0.22), furnMat);
        lowerHg.position.set(0, 0.004, -0.28);

        // Cleaning rod under barrel
        const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.0035, 0.0035, 0.34, 8), steelBarrelMat);
        rod.rotation.x = Math.PI / 2;
        rod.position.set(0, 0.005, -0.36);

        // Contoured Buttstock
        const stock = new THREE.Mesh(new THREE.BoxGeometry(0.046, 0.085, 0.26), furnMat);
        stock.position.set(0, -0.026, 0.28);
        stock.rotation.x = -0.10;

        // Multi-Segment Curved Banana Magazine!
        const magMat = isAK ? bakeliteMat : steelBarrelMat;
        const magSeg1 = new THREE.Mesh(new THREE.BoxGeometry(0.038, 0.085, 0.066), magMat);
        magSeg1.position.set(0, -0.065, -0.06);
        magSeg1.rotation.x = -0.15;
        const magSeg2 = new THREE.Mesh(new THREE.BoxGeometry(0.038, 0.085, 0.066), magMat);
        magSeg2.position.set(0, -0.135, -0.08);
        magSeg2.rotation.x = -0.35;
        const magSeg3 = new THREE.Mesh(new THREE.BoxGeometry(0.038, 0.075, 0.066), magMat);
        magSeg3.position.set(0, -0.195, -0.115);
        magSeg3.rotation.x = -0.55;

        group.add(gasTube, upperHg, lowerHg, rod, stock, magSeg1, magSeg2, magSeg3);
    } else if (weaponId === 'p90') {
        // P90 Top Translucent Amber Magazine + Reflex Sight Housing
        const topMag = new THREE.Mesh(new THREE.BoxGeometry(0.052, 0.024, 0.28), bakeliteMat);
        topMag.position.set(0, 0.058, -0.04);
        const sightArch = new THREE.Mesh(new THREE.BoxGeometry(0.044, 0.055, 0.12), darkReceiverMat);
        sightArch.position.set(0, 0.085, -0.10);
        group.add(topMag, sightArch);
    } else if (weaponId === 'bizon') {
        // PP-Bizon Helical Cylindrical Under-Barrel Magazine
        const cylMag = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.30, 16), railMat);
        cylMag.rotation.x = Math.PI / 2;
        cylMag.position.set(0, -0.038, -0.20);
        const stock = new THREE.Mesh(new THREE.BoxGeometry(0.042, 0.075, 0.22), darkReceiverMat);
        stock.position.set(0, -0.01, 0.25);
        group.add(cylMag, stock);
    } else {
        // Tactical Ventilated Quad-Rail Handguard + Vertical Foregrip + Curved STANAG Mag + Crane Stock
        const quadRail = new THREE.Mesh(new THREE.CylinderGeometry(0.033, 0.033, 0.24, 8), railMat);
        quadRail.rotation.x = Math.PI / 2;
        quadRail.rotation.z = Math.PI / 8;
        quadRail.position.set(0, 0.020, -0.28);

        const foregrip = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.014, 0.095, 10), gloveMat);
        foregrip.position.set(0, -0.048, -0.25);

        const magSeg1 = new THREE.Mesh(new THREE.BoxGeometry(0.036, 0.09, 0.062), steelBarrelMat);
        magSeg1.position.set(0, -0.065, -0.06);
        magSeg1.rotation.x = -0.10;
        const magSeg2 = new THREE.Mesh(new THREE.BoxGeometry(0.036, 0.09, 0.062), steelBarrelMat);
        magSeg2.position.set(0, -0.140, -0.075);
        magSeg2.rotation.x = -0.24;

        const bufferTube = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.24, 12), darkReceiverMat);
        bufferTube.rotation.x = Math.PI / 2;
        bufferTube.position.set(0, 0.022, 0.25);
        const stock = new THREE.Mesh(new THREE.BoxGeometry(0.048, 0.092, 0.18), bodyMat);
        stock.position.set(0, -0.012, 0.28);

        group.add(quadRail, foregrip, magSeg1, magSeg2, bufferTube, stock);
    }

    if (weaponId === 'm4a1' || weaponId === 'mp5') {
        const supp = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.23, 18), darkReceiverMat);
        supp.rotation.x = Math.PI / 2;
        supp.position.set(0, 0.020, -0.35 - barrelLen * 0.5);
        group.add(supp);
    }

    // Multi-Element Telescopic Sniper / ACOG Optical Scope
    if (wep.canScope) {
        const scopeGroup = new THREE.Group();
        const mount1 = new THREE.Mesh(new THREE.BoxGeometry(0.028, 0.032, 0.026), darkReceiverMat);
        mount1.position.set(0, 0.072, 0.04);
        const mount2 = new THREE.Mesh(new THREE.BoxGeometry(0.028, 0.032, 0.026), darkReceiverMat);
        mount2.position.set(0, 0.072, -0.09);

        const tubeLen = isSniper ? 0.30 : 0.16;
        const mainTube = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, tubeLen, 16), darkReceiverMat);
        mainTube.rotation.x = Math.PI / 2;
        mainTube.position.set(0, 0.096, -0.03);

        // Front Objective Bell & Rear Ocular Eyepiece
        const frontBell = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.018, 0.08, 18), darkReceiverMat);
        frontBell.rotation.x = Math.PI / 2;
        frontBell.position.set(0, 0.096, -0.03 - tubeLen / 2 - 0.03);

        const rearBell = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.025, 0.06, 18), darkReceiverMat);
        rearBell.rotation.x = Math.PI / 2;
        rearBell.position.set(0, 0.096, -0.03 + tubeLen / 2 + 0.02);

        const rearLens = new THREE.Mesh(new THREE.CylinderGeometry(0.021, 0.021, 0.004, 16), opticLensMat);
        rearLens.rotation.x = Math.PI / 2;
        rearLens.position.set(0, 0.096, -0.03 + tubeLen / 2 + 0.05);

        // Elevation & Windage Turret Knobs
        const topTurret = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.022, 12), steelBarrelMat);
        topTurret.position.set(0, 0.118, -0.03);
        const sideTurret = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.022, 12), steelBarrelMat);
        sideTurret.rotation.z = Math.PI / 2;
        sideTurret.position.set(0.022, 0.096, -0.03);

        scopeGroup.add(mount1, mount2, mainTube, frontBell, rearBell, rearLens, topTurret, sideTurret);
        group.add(scopeGroup);

        if (isSniper) {
            // Sniper Bolt Handle with Spherical Knob
            const boltStem = new THREE.Mesh(new THREE.CylinderGeometry(0.005, 0.005, 0.055, 8), chromeMat);
            boltStem.rotation.z = Math.PI / 2;
            boltStem.position.set(0.042, 0.030, 0.06);
            const boltBall = new THREE.Mesh(new THREE.SphereGeometry(0.012, 10, 10), darkReceiverMat);
            boltBall.position.set(0.068, 0.025, 0.06);
            group.add(boltStem, boltBall);
        }
    }

    attachMuzzleEffects(group, -0.25 - barrelLen);
    // Natural CS2 First-Person Viewmodel Angle (reveals side receiver details in 3D!)
    group.rotation.set(0.02, 0.065, 0);
    group.position.set(0.21, -0.21, -0.39);
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

window.WEAPON_CATEGORIES = WEAPON_CATEGORIES;
window.WEAPONS = WEAPONS;
window.createWeaponViewModel = createWeaponViewModel;
window.attachMuzzleEffects = attachMuzzleEffects;
