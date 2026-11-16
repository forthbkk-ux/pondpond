// Expanded Counter-Strike Arsenal (30 Weapons categorized by Type + Realistic 3D Viewmodels)

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
        name: 'M67 Fragmentation Grenade',
        category: 'equip',
        type: 'ระเบิดสังหารแรงอัดสูง (พกได้หลายลูก)',
        slot: 4,
        price: 300,
        damage: 98,
        headshotMult: 1.0,
        fireRate: 0.7,
        auto: false,
        clipSize: 1,
        reserveMax: 3,
        reloadTime: 0.5,
        recoil: 0,
        spread: 0,
        range: 40,
        moveSpeed: 1.05,
        canScope: false
    }
};

let _cachedWeaponTextures = null;
function getWeaponTextures() {
    if (_cachedWeaponTextures) return _cachedWeaponTextures;

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
    const wep = WEAPONS[weaponId] || WEAPONS.ak47;
    const { metalTex, woodTex, fabricTex } = getWeaponTextures();

    const gunMetal = new THREE.MeshStandardMaterial({
        map: metalTex, bumpMap: metalTex, bumpScale: 0.012,
        color: 0x262a2e, roughness: 0.35, metalness: 0.88
    });
    const steelBarrelMat = new THREE.MeshStandardMaterial({
        map: metalTex, bumpMap: metalTex, bumpScale: 0.01,
        color: 0x3b4046, roughness: 0.28, metalness: 0.92
    });
    const chromeMat = new THREE.MeshStandardMaterial({
        map: metalTex, color: 0xb0b8c2, roughness: 0.22, metalness: 0.95
    });
    const tanPolymerMat = new THREE.MeshStandardMaterial({
        map: fabricTex, color: 0x8a795d, roughness: 0.55, metalness: 0.15
    });
    const woodMat = new THREE.MeshStandardMaterial({
        map: woodTex, bumpMap: woodTex, bumpScale: 0.018,
        roughness: 0.58, metalness: 0.06
    });
    const polymerOliveMat = new THREE.MeshStandardMaterial({
        map: fabricTex, bumpMap: fabricTex, bumpScale: 0.01,
        color: 0x3a4432, roughness: 0.55, metalness: 0.18
    });
    const bakeliteMat = new THREE.MeshStandardMaterial({
        map: woodTex, color: 0x7c3314, roughness: 0.42, metalness: 0.22
    });
    const gloveMat = new THREE.MeshStandardMaterial({
        map: fabricTex, bumpMap: fabricTex, bumpScale: 0.015,
        color: 0x1c1e1b, roughness: 0.78, metalness: 0.12
    });
    const sleeveMat = new THREE.MeshStandardMaterial({
        map: fabricTex, bumpMap: fabricTex, bumpScale: 0.02,
        color: 0x333830, roughness: 0.88, metalness: 0.05
    });

    // Right Hand + Forearm
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
        group.add(handle, guard, blade);
        group.position.set(0.23, -0.21, -0.38);
        return group;
    }

    if (weaponId === 'hegrenade') {
        const body = new THREE.Mesh(new THREE.SphereGeometry(0.058, 18, 18), polymerOliveMat);
        const top = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.024, 0.045, 12), steelBarrelMat);
        top.position.set(0, 0.065, 0);
        const spoon = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.075, 0.025), steelBarrelMat);
        spoon.position.set(0.036, 0.025, 0);
        group.add(body, top, spoon);
        group.position.set(0.23, -0.22, -0.38);
        return group;
    }

    // --- PISTOLS ---
    if (wep.category === 'pistol') {
        const buildSinglePistol = (offsetX = 0) => {
            const pGroup = new THREE.Group();
            const isHeavy = weaponId === 'deagle' || weaponId === 'revolver';
            const slideMat = isHeavy ? chromeMat : gunMetal;
            const slide = new THREE.Mesh(
                new THREE.BoxGeometry(isHeavy ? 0.046 : 0.038, isHeavy ? 0.056 : 0.042, isHeavy ? 0.28 : 0.23),
                slideMat
            );
            slide.position.set(offsetX, 0.035, -0.04);

            if (weaponId === 'revolver') {
                const cyl = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.065, 12), gunMetal);
                cyl.rotation.x = Math.PI / 2;
                cyl.position.set(offsetX, 0.025, 0.01);
                pGroup.add(cyl);
            }

            if (weaponId === 'pistol') {
                const supp = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.16, 12), gunMetal);
                supp.rotation.x = Math.PI / 2;
                supp.position.set(offsetX, 0.035, -0.22);
                pGroup.add(supp);
            }

            const grip = new THREE.Mesh(new THREE.BoxGeometry(0.036, 0.125, 0.056), weaponId === 'revolver' ? woodMat : gloveMat);
            grip.position.set(offsetX, -0.045, 0.045);
            grip.rotation.x = 0.26;
            pGroup.add(slide, grip);
            return pGroup;
        };

        group.add(buildSinglePistol(0));
        if (weaponId === 'dualelites') {
            // Second pistol on left side!
            group.add(buildSinglePistol(-0.34));
        }
        attachMuzzleEffects(group, -0.24);
        group.position.set(0.22, -0.22, -0.42);
        return group;
    }

    // Left Support Hand + Forearm for all two-handed guns
    const leftGlove = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.035, 0.11, 10), gloveMat);
    leftGlove.rotation.x = Math.PI / 2;
    leftGlove.position.set(-0.018, -0.032, -0.24);
    const leftArm = new THREE.Mesh(new THREE.CylinderGeometry(0.036, 0.045, 0.34, 12), sleeveMat);
    leftArm.rotation.x = Math.PI / 2 + 0.25;
    leftArm.rotation.z = -0.42;
    leftArm.position.set(-0.14, -0.11, -0.06);
    group.add(leftGlove, leftArm);

    // --- SHOTGUNS ---
    if (wep.category === 'shotgun') {
        const isSawed = weaponId === 'sawedoff';
        const recMat = isSawed ? steelBarrelMat : gunMetal;
        const receiver = new THREE.Mesh(new THREE.BoxGeometry(0.058, 0.082, 0.36), recMat);
        const barrelLen = isSawed ? 0.32 : 0.48;
        const topBarrel = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, barrelLen, 14), steelBarrelMat);
        topBarrel.rotation.x = Math.PI / 2;
        topBarrel.position.set(0, 0.025, -0.18 - barrelLen / 2);

        const tubeMag = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, barrelLen * 0.88, 12), gunMetal);
        tubeMag.rotation.x = Math.PI / 2;
        tubeMag.position.set(0, -0.008, -0.18 - (barrelLen * 0.88) / 2);

        const pumpMat = isSawed ? woodMat : gloveMat;
        const pumpHandle = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.026, 0.20, 12), pumpMat);
        pumpHandle.rotation.x = Math.PI / 2;
        pumpHandle.position.set(0, -0.012, -0.32);

        const stock = new THREE.Mesh(new THREE.BoxGeometry(0.048, 0.085, isSawed ? 0.14 : 0.26), pumpMat);
        stock.position.set(0, -0.03, 0.24);
        stock.rotation.x = -0.12;

        group.add(receiver, topBarrel, tubeMag, pumpHandle, stock);
        attachMuzzleEffects(group, -0.22 - barrelLen);
        group.position.set(0.22, -0.22, -0.44);
        return group;
    }

    // --- HEAVY MACHINE GUNS (M249 / NEGEV) ---
    if (wep.category === 'mg') {
        const receiver = new THREE.Mesh(new THREE.BoxGeometry(0.078, 0.105, 0.46), gunMetal);
        const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.018, 0.46, 14), steelBarrelMat);
        barrel.rotation.x = Math.PI / 2;
        barrel.position.set(0, 0.02, -0.42);
        const shroud = new THREE.Mesh(new THREE.BoxGeometry(0.068, 0.068, 0.26), steelBarrelMat);
        shroud.position.set(0, 0.015, -0.32);
        // Big 150-round Box Magazine hanging underneath
        const boxMag = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.16, 0.14), polymerOliveMat);
        boxMag.position.set(0, -0.12, -0.08);
        const stock = new THREE.Mesh(new THREE.BoxGeometry(0.056, 0.09, 0.25), gunMetal);
        stock.position.set(0, -0.01, 0.28);

        group.add(receiver, barrel, shroud, boxMag, stock);
        attachMuzzleEffects(group, -0.68);
        group.position.set(0.23, -0.23, -0.44);
        return group;
    }

    // --- RIFLES, SMGS & SNIPERS ---
    let bodyMat = gunMetal;
    if (weaponId === 'awp' || weaponId === 'aug') bodyMat = polymerOliveMat;
    else if (weaponId === 'scar20' || weaponId === 'p90') bodyMat = tanPolymerMat;

    const receiver = new THREE.Mesh(new THREE.BoxGeometry(0.058, 0.084, 0.40), bodyMat);
    const pistolGrip = new THREE.Mesh(new THREE.BoxGeometry(0.038, 0.125, 0.055), gloveMat);
    pistolGrip.position.set(0, -0.08, 0.10);
    pistolGrip.rotation.x = 0.28;
    group.add(receiver, pistolGrip);

    const isSniper = wep.category === 'sniper';
    const barrelLen = isSniper ? 0.62 : (wep.category === 'smg' ? 0.24 : 0.38);
    const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.014, barrelLen, 14), steelBarrelMat);
    barrel.rotation.x = Math.PI / 2;
    barrel.position.set(0, 0.018, -0.20 - barrelLen / 2);
    group.add(barrel);

    if (weaponId === 'ak47' || weaponId === 'galil') {
        const handguard = new THREE.Mesh(new THREE.BoxGeometry(0.062, 0.062, 0.22), weaponId === 'ak47' ? woodMat : gloveMat);
        handguard.position.set(0, 0.01, -0.28);
        const stock = new THREE.Mesh(new THREE.BoxGeometry(0.048, 0.082, 0.25), weaponId === 'ak47' ? woodMat : gunMetal);
        stock.position.set(0, -0.025, 0.28);
        const mag = new THREE.Mesh(new THREE.BoxGeometry(0.040, 0.185, 0.070), weaponId === 'ak47' ? bakeliteMat : steelBarrelMat);
        mag.position.set(0, -0.12, -0.08);
        mag.rotation.x = -0.32;
        group.add(handguard, stock, mag);
    } else if (weaponId === 'bizon') {
        // Helical cylindrical magazine under barrel
        const cylMag = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.30, 14), gunMetal);
        cylMag.rotation.x = Math.PI / 2;
        cylMag.position.set(0, -0.04, -0.20);
        group.add(cylMag);
    } else {
        const mag = new THREE.Mesh(new THREE.BoxGeometry(0.038, 0.155, 0.064), steelBarrelMat);
        mag.position.set(0, -0.11, -0.06);
        mag.rotation.x = -0.12;
        const stock = new THREE.Mesh(new THREE.BoxGeometry(0.046, 0.082, 0.23), bodyMat);
        stock.position.set(0, -0.01, 0.26);
        group.add(mag, stock);
    }

    if (weaponId === 'm4a1' || weaponId === 'mp5') {
        const supp = new THREE.Mesh(new THREE.CylinderGeometry(0.021, 0.021, 0.22, 16), steelBarrelMat);
        supp.rotation.x = Math.PI / 2;
        supp.position.set(0, 0.018, -0.35 - barrelLen * 0.5);
        group.add(supp);
    }

    if (wep.canScope) {
        const scopeLen = isSniper ? 0.34 : 0.18;
        const scopeTube = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.026, scopeLen, 16), gunMetal);
        scopeTube.rotation.x = Math.PI / 2;
        scopeTube.position.set(0, 0.088, -0.03);
        group.add(scopeTube);
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

window.WEAPON_CATEGORIES = WEAPON_CATEGORIES;
window.WEAPONS = WEAPONS;
window.createWeaponViewModel = createWeaponViewModel;
window.attachMuzzleEffects = attachMuzzleEffects;
