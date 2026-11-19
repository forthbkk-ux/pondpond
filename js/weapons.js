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

    const setHD = (tex) => {
        if (THREE.sRGBEncoding !== undefined) tex.encoding = THREE.sRGBEncoding;
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;
        tex.anisotropy = 16;
        return tex;
    };
    const setBump = (tex, rx = 1, ry = 1) => {
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;
        tex.repeat.set(rx, ry);
        tex.anisotropy = 8;
        return tex;
    };

    // 1. Ultra-HD 1024x512 Satin Parkerized Gunmetal Texture (smooth directional brushed grain, zero moiré stripes)
    const metalCanvas = document.createElement('canvas');
    metalCanvas.width = 1024;
    metalCanvas.height = 512;
    const mCtx = metalCanvas.getContext('2d');
    const mGrad = mCtx.createLinearGradient(0, 0, 0, 512);
    mGrad.addColorStop(0, '#363d47');
    mGrad.addColorStop(0.15, '#282e36');
    mGrad.addColorStop(0.5, '#1e232a');
    mGrad.addColorStop(0.85, '#171b20');
    mGrad.addColorStop(1, '#2b323b');
    mCtx.fillStyle = mGrad;
    mCtx.fillRect(0, 0, 1024, 512);
    for (let y = 0; y < 512; y += 3) {
        mCtx.fillStyle = (Math.random() > 0.5) ? 'rgba(255,255,255,0.018)' : 'rgba(0,0,0,0.032)';
        mCtx.fillRect(0, y, 1024, 1);
    }
    mCtx.fillStyle = 'rgba(0,0,0,0.22)';
    mCtx.fillRect(190, 215, 310, 125);
    // Stamped receiver rivets & pin heads with subtle rim
    const rivets = [[110, 130], [110, 380], [540, 130], [540, 370], [790, 145], [875, 360]];
    for (const [rx, ry] of rivets) {
        mCtx.fillStyle = '#0c0e12';
        mCtx.beginPath(); mCtx.arc(rx, ry, 11, 0, Math.PI * 2); mCtx.fill();
        mCtx.fillStyle = '#404854';
        mCtx.beginPath(); mCtx.arc(rx - 1.5, ry - 1.5, 8.5, 0, Math.PI * 2); mCtx.fill();
    }
    const metalTex = setHD(new THREE.CanvasTexture(metalCanvas));

    // 2. Ultra-HD 1024x512 Deep Anodized Obsidian Receiver Texture
    const darkMetalCanvas = document.createElement('canvas');
    darkMetalCanvas.width = 1024;
    darkMetalCanvas.height = 512;
    const dmCtx = darkMetalCanvas.getContext('2d');
    const dmGrad = dmCtx.createLinearGradient(0, 0, 0, 512);
    dmGrad.addColorStop(0, '#272d35');
    dmGrad.addColorStop(0.15, '#1b1f26');
    dmGrad.addColorStop(0.5, '#14171c');
    dmGrad.addColorStop(0.85, '#0f1115');
    dmGrad.addColorStop(1, '#1e232b');
    dmCtx.fillStyle = dmGrad;
    dmCtx.fillRect(0, 0, 1024, 512);
    for (let y = 0; y < 512; y += 3) {
        dmCtx.fillStyle = (Math.random() > 0.5) ? 'rgba(255,255,255,0.014)' : 'rgba(0,0,0,0.028)';
        dmCtx.fillRect(0, y, 1024, 1);
    }
    for (const [rx, ry] of rivets) {
        dmCtx.fillStyle = '#090b0d';
        dmCtx.beginPath(); dmCtx.arc(rx, ry, 10, 0, Math.PI * 2); dmCtx.fill();
        dmCtx.fillStyle = '#2e353f';
        dmCtx.beginPath(); dmCtx.arc(rx - 1.5, ry - 1.5, 7.5, 0, Math.PI * 2); dmCtx.fill();
    }
    const darkMetalTex = setHD(new THREE.CanvasTexture(darkMetalCanvas));

    // 3. Ultra-HD 1024x512 Lacquered Russian Walnut / Mahogany Wood Texture
    const woodCanvas = document.createElement('canvas');
    woodCanvas.width = 1024;
    woodCanvas.height = 512;
    const wCtx = woodCanvas.getContext('2d');
    const wGrad = wCtx.createLinearGradient(0, 0, 0, 512);
    wGrad.addColorStop(0, '#853817');
    wGrad.addColorStop(0.28, '#9e441e');
    wGrad.addColorStop(0.62, '#6b2b0f');
    wGrad.addColorStop(1, '#4a1b08');
    wCtx.fillStyle = wGrad;
    wCtx.fillRect(0, 0, 1024, 512);
    for (let y = 0; y < 512; y += 3) {
        wCtx.fillStyle = y % 6 === 0 ? 'rgba(28, 8, 2, 0.28)' : 'rgba(215, 118, 58, 0.14)';
        wCtx.fillRect(0, y, 1024, 1.5);
    }
    wCtx.strokeStyle = 'rgba(255, 185, 130, 0.16)';
    wCtx.lineWidth = 4;
    wCtx.strokeRect(8, 8, 1008, 496);
    const woodTex = setHD(new THREE.CanvasTexture(woodCanvas));

    // 4. Stamped Ribbed Steel Magazine Texture (512x512 HD)
    const magCanvas = document.createElement('canvas');
    magCanvas.width = 512;
    magCanvas.height = 512;
    const mgCtx = magCanvas.getContext('2d');
    const mgGrad = mgCtx.createLinearGradient(0, 0, 512, 0);
    mgGrad.addColorStop(0, '#2a3038');
    mgGrad.addColorStop(0.5, '#1d2229');
    mgGrad.addColorStop(1, '#14171d');
    mgCtx.fillStyle = mgGrad;
    mgCtx.fillRect(0, 0, 512, 512);
    for (let y = 36; y < 480; y += 52) {
        mgCtx.fillStyle = '#0f1216';
        mgCtx.fillRect(36, y, 440, 16);
        mgCtx.fillStyle = '#404a57';
        mgCtx.fillRect(36, y + 16, 440, 6);
    }
    const magTex = setHD(new THREE.CanvasTexture(magCanvas));

    // 5. Silky Matte Tactical Polymer Textures (512x512 HD - fine isotropic polymer micro-texture, zero grid artifacts)
    const makePolymerTex = (cTop, cMid, cBot) => {
        const c = document.createElement('canvas');
        c.width = 512; c.height = 512;
        const ctx = c.getContext('2d');
        const g = ctx.createLinearGradient(0, 0, 0, 512);
        g.addColorStop(0, cTop); g.addColorStop(0.45, cMid); g.addColorStop(1, cBot);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, 512, 512);
        for (let i = 0; i < 9000; i++) {
            const px = Math.random() * 512;
            const py = Math.random() * 512;
            ctx.fillStyle = (i % 2 === 0) ? 'rgba(0,0,0,0.055)' : 'rgba(255,255,255,0.022)';
            ctx.fillRect(px, py, 1.5, 1.5);
        }
        return setHD(new THREE.CanvasTexture(c));
    };
    const oliveTex = makePolymerTex('#323e24', '#252f1a', '#192011');
    const tanTex = makePolymerTex('#7d613e', '#614a2e', '#45341f');

    // 6. Brushed Stainless Steel Texture (512x256 HD)
    const steelCanvas = document.createElement('canvas');
    steelCanvas.width = 512; steelCanvas.height = 256;
    const stCtx = steelCanvas.getContext('2d');
    const stGrad = stCtx.createLinearGradient(0, 0, 0, 256);
    stGrad.addColorStop(0, '#727d8c');
    stGrad.addColorStop(0.25, '#545e6c');
    stGrad.addColorStop(0.55, '#434c58');
    stGrad.addColorStop(1, '#616c7a');
    stCtx.fillStyle = stGrad;
    stCtx.fillRect(0, 0, 512, 256);
    for (let y = 0; y < 256; y += 2) {
        stCtx.fillStyle = (Math.random() > 0.5) ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.04)';
        stCtx.fillRect(0, y, 512, 1);
    }
    const steelTex = setHD(new THREE.CanvasTexture(steelCanvas));

    // 7. Subtle Linear PBR Micro-Detail Bump Maps (no harsh scanline aliasing or checkerboard grid)
    const metalBumpC = document.createElement('canvas');
    metalBumpC.width = 512; metalBumpC.height = 512;
    const mbCtx = metalBumpC.getContext('2d');
    mbCtx.fillStyle = '#808080';
    mbCtx.fillRect(0, 0, 512, 512);
    for (let y = 0; y < 512; y += 2) {
        const shade = Math.floor(120 + Math.random() * 18);
        mbCtx.fillStyle = `rgb(${shade},${shade},${shade})`;
        mbCtx.fillRect(0, y, 512, 1);
    }
    const metalBumpTex = setBump(new THREE.CanvasTexture(metalBumpC), 1, 1);

    const polyBumpC = document.createElement('canvas');
    polyBumpC.width = 256; polyBumpC.height = 256;
    const pbCtx = polyBumpC.getContext('2d');
    pbCtx.fillStyle = '#808080';
    pbCtx.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 6000; i++) {
        const v = (i % 2 === 0) ? 142 : 114;
        pbCtx.fillStyle = `rgb(${v},${v},${v})`;
        pbCtx.fillRect(Math.random() * 256, Math.random() * 256, 1.5, 1.5);
    }
    const polyBumpTex = setBump(new THREE.CanvasTexture(polyBumpC), 2, 2);

    const woodBumpC = document.createElement('canvas');
    woodBumpC.width = 512; woodBumpC.height = 256;
    const wbCtx = woodBumpC.getContext('2d');
    wbCtx.fillStyle = '#808080';
    wbCtx.fillRect(0, 0, 512, 256);
    for (let y = 0; y < 256; y += 3) {
        const v = Math.floor(114 + Math.random() * 26);
        wbCtx.fillStyle = `rgb(${v},${v},${v})`;
        wbCtx.fillRect(0, y, 512, 1.5);
    }
    const woodBumpTex = setBump(new THREE.CanvasTexture(woodBumpC), 1, 1);

    // 8. Tactical Cordura Nylon Glove Texture (256x256 HD woven pattern + stitching)
    const gloveCanvas = document.createElement('canvas');
    gloveCanvas.width = 256; gloveCanvas.height = 256;
    const gCtx = gloveCanvas.getContext('2d');
    gCtx.fillStyle = '#1f252e';
    gCtx.fillRect(0, 0, 256, 256);
    for (let y = 0; y < 256; y += 4) {
        for (let x = 0; x < 256; x += 4) {
            gCtx.fillStyle = ((x + y) % 8 === 0) ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.22)';
            gCtx.fillRect(x, y, 2, 2);
        }
    }
    gCtx.strokeStyle = 'rgba(255,255,255,0.12)';
    gCtx.lineWidth = 2;
    gCtx.setLineDash([6, 4]);
    gCtx.strokeRect(10, 10, 236, 236);
    const gloveTex = setHD(new THREE.CanvasTexture(gloveCanvas));

    // 9. Holographic Sight Lens Reticle
    const holoCanvas = document.createElement('canvas');
    holoCanvas.width = 128;
    holoCanvas.height = 128;
    const hCtx = holoCanvas.getContext('2d');
    hCtx.clearRect(0, 0, 128, 128);
    hCtx.strokeStyle = 'rgba(239, 68, 68, 0.92)';
    hCtx.lineWidth = 3;
    hCtx.beginPath();
    hCtx.arc(64, 64, 34, 0, Math.PI * 2);
    hCtx.stroke();
    hCtx.fillStyle = '#ff2b2b';
    hCtx.beginPath();
    hCtx.arc(64, 64, 5, 0, Math.PI * 2);
    hCtx.fill();
    const holoLensTex = new THREE.CanvasTexture(holoCanvas);

    _cachedWeaponTextures = { metalTex, darkMetalTex, woodTex, magTex, oliveTex, tanTex, steelTex, gloveTex, metalBumpTex, polyBumpTex, woodBumpTex, holoLensTex };
    return _cachedWeaponTextures;
}

function createWeaponViewModel(weaponId) {
    const group = new THREE.Group();
    const wep = WEAPONS[weaponId] || WEAPONS.ak47;
    const {
        metalTex, darkMetalTex, woodTex, magTex, oliveTex, tanTex,
        steelTex, gloveTex, metalBumpTex, polyBumpTex, woodBumpTex, holoLensTex
    } = getWeaponTextures();

    const srgb = (hex) => {
        const c = new THREE.Color(hex);
        return (typeof c.convertSRGBToLinear === 'function') ? c.convertSRGBToLinear() : c;
    };

    // Lighting is handled globally by vmScene's High-Contrast 3-Point Studio Rig + Obsidian PMREM environment map
    // (no per-weapon PointLights here, preventing WebGL shader recompilation freezes on switch).

    const gunMetal = new THREE.MeshStandardMaterial({
        map: metalTex, color: 0xffffff, bumpMap: metalBumpTex, bumpScale: 0.0008,
        roughness: 0.30, metalness: 0.65, envMapIntensity: 1.50, fog: false
    });
    const darkReceiverMat = new THREE.MeshStandardMaterial({
        map: darkMetalTex, color: 0xffffff, bumpMap: metalBumpTex, bumpScale: 0.0007,
        roughness: 0.36, metalness: 0.56, envMapIntensity: 1.40, fog: false
    });
    const matteBlackMat = new THREE.MeshStandardMaterial({
        color: srgb(0x161a20), bumpMap: polyBumpTex, bumpScale: 0.0008,
        roughness: 0.56, metalness: 0.14, envMapIntensity: 1.0, fog: false
    });
    const boreBlackMat = new THREE.MeshBasicMaterial({ color: srgb(0x040507), fog: false });
    const steelBarrelMat = new THREE.MeshStandardMaterial({
        map: steelTex, color: 0xffffff, bumpMap: metalBumpTex, bumpScale: 0.0007,
        roughness: 0.24, metalness: 0.78, envMapIntensity: 1.60, fog: false
    });
    const chromeMat = new THREE.MeshStandardMaterial({
        map: steelTex, color: srgb(0xdbe3ec), bumpMap: metalBumpTex, bumpScale: 0.0005,
        roughness: 0.16, metalness: 0.88, envMapIntensity: 1.80, fog: false
    });
    const brassMat = new THREE.MeshStandardMaterial({
        color: srgb(0xeab308), roughness: 0.20, metalness: 0.86, envMapIntensity: 1.65, fog: false
    });
    const tanPolymerMat = new THREE.MeshStandardMaterial({
        map: tanTex, color: 0xffffff, bumpMap: polyBumpTex, bumpScale: 0.0009,
        roughness: 0.50, metalness: 0.10, envMapIntensity: 1.0, fog: false
    });
    const woodMat = new THREE.MeshStandardMaterial({
        map: woodTex, color: 0xffffff, bumpMap: woodBumpTex, bumpScale: 0.0012,
        roughness: 0.36, metalness: 0.06, envMapIntensity: 1.15, fog: false
    });
    const polymerOliveMat = new THREE.MeshStandardMaterial({
        map: oliveTex, color: 0xffffff, bumpMap: polyBumpTex, bumpScale: 0.0009,
        roughness: 0.52, metalness: 0.10, envMapIntensity: 1.0, fog: false
    });
    const bakeliteMat = new THREE.MeshStandardMaterial({
        map: magTex, color: 0xffffff, bumpMap: metalBumpTex, bumpScale: 0.0008,
        roughness: 0.36, metalness: 0.42, envMapIntensity: 1.35, fog: false
    });
    const smokedPolyMat = new THREE.MeshStandardMaterial({
        color: srgb(0x2d2116), transparent: true, opacity: 0.68,
        roughness: 0.16, metalness: 0.18, envMapIntensity: 1.55, fog: false
    });
    const gloveMat = new THREE.MeshStandardMaterial({
        map: gloveTex, color: 0xffffff, bumpMap: polyBumpTex, bumpScale: 0.0026,
        roughness: 0.76, metalness: 0.05, envMapIntensity: 0.85, fog: false
    });
    const glovePadMat = new THREE.MeshStandardMaterial({
        color: srgb(0x363f4a), bumpMap: polyBumpTex, bumpScale: 0.0022,
        roughness: 0.36, metalness: 0.32, envMapIntensity: 1.35, fog: false
    });
    const sleeveMat = new THREE.MeshStandardMaterial({
        color: srgb(0x232830), bumpMap: polyBumpTex, bumpScale: 0.0020,
        roughness: 0.84, metalness: 0.04, envMapIntensity: 0.72, fog: false
    });
    const tritiumGlowMat = new THREE.MeshBasicMaterial({ color: srgb(0x4ade80), fog: false });
    const redDotGlowMat = new THREE.MeshBasicMaterial({ color: srgb(0xff2a2a), fog: false });
    const holoReticleMat = new THREE.MeshBasicMaterial({ map: holoLensTex, transparent: true, depthWrite: false, fog: false });
    const opticLensMat = new THREE.MeshStandardMaterial({
        color: srgb(0x0b325c), roughness: 0.04, metalness: 0.88, envMapIntensity: 2.1, fog: false
    });

    // Helper: Clean tri-planar UV normalization on ExtrudeGeometry so HD metal/wood/stipple textures stay sharp without stretching
    const normalizeExtrudeUVs = (geo) => {
        geo.computeBoundingBox();
        const bb = geo.boundingBox;
        const pos = geo.attributes.position;
        const uv = geo.attributes.uv;
        const norm = geo.attributes.normal;
        if (!pos || !uv || !norm || !bb) return geo;
        const sx = Math.max(0.001, bb.max.x - bb.min.x);
        const sy = Math.max(0.001, bb.max.y - bb.min.y);
        const sz = Math.max(0.001, bb.max.z - bb.min.z);
        for (let i = 0; i < pos.count; i++) {
            const nx = Math.abs(norm.getX(i));
            const ny = Math.abs(norm.getY(i));
            const nz = Math.abs(norm.getZ(i));
            let u, v;
            if (nz >= nx && nz >= ny) {
                u = (pos.getX(i) - bb.min.x) / sx;
                v = (pos.getY(i) - bb.min.y) / sy;
            } else if (nx >= ny && nx >= nz) {
                u = (pos.getZ(i) - bb.min.z) / sz;
                v = (pos.getY(i) - bb.min.y) / sy;
            } else {
                u = (pos.getX(i) - bb.min.x) / sx;
                v = (pos.getZ(i) - bb.min.z) / sz;
            }
            uv.setXY(i, u, v);
        }
        uv.needsUpdate = true;
        return geo;
    };

    // Helper: Drop-in Chamfered/Beveled Box replacing blocky 90-degree BoxGeometry so every receiver/slide catches crisp edge specular!
    const buildBeveledBox = (w, h, len, mat, bevel = 0.0022, segs = 2) => {
        const b = Math.min(bevel, w * 0.25, h * 0.25, len * 0.25);
        const hw = Math.max(0.0005, w / 2 - b);
        const hh = Math.max(0.0005, h / 2 - b);
        const shape = new THREE.Shape();
        shape.moveTo(-hw, -hh);
        shape.lineTo(hw, -hh);
        shape.lineTo(hw, hh);
        shape.lineTo(-hw, hh);
        shape.closePath();
        const d = Math.max(0.001, len - b * 2);
        const geo = new THREE.ExtrudeGeometry(shape, {
            depth: d,
            bevelEnabled: true,
            bevelThickness: b,
            bevelSize: b,
            bevelSegments: segs
        });
        geo.translate(0, 0, -d / 2);
        normalizeExtrudeUVs(geo);
        return new THREE.Mesh(geo, mat);
    };

    // Helper: Dark Recessed Barrel Bore Crown at Muzzle Tip (eliminates flat solid cylinder ends)
    const addMuzzleCrown = (parent, x = 0, y = 0.018, z = -0.56, boreR = 0.0068) => {
        const bore = new THREE.Mesh(new THREE.CylinderGeometry(boreR, boreR, 0.008, 12), boreBlackMat);
        bore.rotation.x = Math.PI / 2;
        bore.position.set(x, y, z);
        const rim = new THREE.Mesh(new THREE.TorusGeometry(boreR + 0.002, 0.0014, 6, 14), gunMetal);
        rim.position.set(x, y, z + 0.001);
        parent.add(bore, rim);
    };

    // Helper: Build Smooth Continuous Curved 3D Banana/STANAG Magazine using ExtrudeGeometry with Chamfered Bevels!
    const buildCurvedMagazine = (mat, width = 0.032, len = 0.18, curve = 0.055, zPos = -0.068, yPos = -0.025) => {
        const shape = new THREE.Shape();
        // Side profile in (X = Z_gun, Y = Y_gun)
        const w = 0.056;
        shape.moveTo(-w / 2, 0);
        shape.lineTo(w / 2, 0);
        shape.quadraticCurveTo(w / 2 - curve * 0.35, -len * 0.55, w / 2 - curve, -len + 0.012);
        shape.lineTo(-w / 2 - curve, -len);
        shape.quadraticCurveTo(-w / 2 - curve * 0.35, -len * 0.50, -w / 2, 0);

        const extGeo = normalizeExtrudeUVs(new THREE.ExtrudeGeometry(shape, {
            depth: width,
            bevelEnabled: true,
            bevelThickness: 0.0025,
            bevelSize: 0.0022,
            bevelSegments: 3,
            curveSegments: 14
        }));
        const mesh = new THREE.Mesh(extGeo, mat);
        // Rotate so Shape X maps to +Z and Extrude Z maps to +X centered at x=0
        mesh.rotation.y = -Math.PI / 2;
        mesh.position.set(width / 2, yPos, zPos);
        return mesh;
    };

    // Helper: Build Smooth Contoured Anatomical Buttstock using ExtrudeGeometry with Rounded Bevels!
    const buildContouredStock = (mat, width = 0.038, isTactical = false, zStart = 0.16) => {
        const sGroup = new THREE.Group();
        const shape = new THREE.Shape();
        if (isTactical) {
            // M4 / Tactical Crane Buttstock profile
            shape.moveTo(0, 0.034);
            shape.lineTo(0.21, 0.034);
            shape.lineTo(0.22, -0.075);
            shape.lineTo(0.185, -0.078);
            shape.lineTo(0.06, -0.015);
            shape.lineTo(0, -0.015);
            shape.closePath();
        } else {
            // Classic AK-47 / Galil / Shotgun Contoured Comb & Wrist Stock profile
            shape.moveTo(0, 0.026);
            shape.lineTo(0.055, 0.014);
            shape.quadraticCurveTo(0.13, 0.012, 0.22, -0.004);
            shape.lineTo(0.225, -0.086);
            shape.lineTo(0.20, -0.090);
            shape.quadraticCurveTo(0.11, -0.055, 0.045, -0.024);
            shape.lineTo(0, -0.020);
            shape.closePath();
        }
        const extGeo = normalizeExtrudeUVs(new THREE.ExtrudeGeometry(shape, {
            depth: width,
            bevelEnabled: true,
            bevelThickness: 0.004,
            bevelSize: 0.0035,
            bevelSegments: 3
        }));
        const stockMesh = new THREE.Mesh(extGeo, mat);
        stockMesh.rotation.y = -Math.PI / 2;
        stockMesh.position.set(width / 2, 0, zStart);
        sGroup.add(stockMesh);

        // Dark rubberized recoil buttpad at rear of stock
        const pad = buildBeveledBox(width + 0.005, 0.090, 0.016, matteBlackMat, 0.0025, 2);
        pad.position.set(0, isTactical ? -0.020 : -0.044, zStart + 0.222);
        sGroup.add(pad);
        return sGroup;
    };

    // Helper: Build Contoured Ergonomic Pistol Grip with Bevels
    const buildErgonomicGrip = (mat, zPos = 0.095, yPos = -0.026) => {
        const shape = new THREE.Shape();
        shape.moveTo(-0.022, 0);
        shape.lineTo(0.024, 0);
        shape.quadraticCurveTo(0.048, -0.045, 0.058, -0.105);
        shape.lineTo(0.012, -0.112);
        shape.quadraticCurveTo(-0.002, -0.055, -0.022, 0);
        const extGeo = normalizeExtrudeUVs(new THREE.ExtrudeGeometry(shape, {
            depth: 0.030,
            bevelEnabled: true,
            bevelThickness: 0.003,
            bevelSize: 0.0025,
            bevelSegments: 3
        }));
        const mesh = new THREE.Mesh(extGeo, mat);
        mesh.rotation.y = -Math.PI / 2;
        mesh.position.set(0.015, yPos, zPos);
        return mesh;
    };

    // Helper: Build Recessed Metallic Ejection Port + Fluted Cylindrical Bolt + 3D Charging Handle
    const addBoltAndChargingHandle = (parent, yPos = 0.024, zPos = -0.045, width = 0.052, upBentHandle = false) => {
        const recess = new THREE.Mesh(new THREE.BoxGeometry(width + 0.0012, 0.015, 0.072), matteBlackMat);
        recess.position.set(0, yPos, zPos);

        // Inset rounded steel bolt carrier (recessed inside port so it catches rim specular without flat sticker glare)
        const boltCyl = new THREE.Mesh(new THREE.CylinderGeometry(0.0065, 0.0065, 0.062, 12), gunMetal);
        boltCyl.rotation.x = Math.PI / 2;
        boltCyl.position.set(-width / 2 + 0.0045, yPos, zPos);
        const boltCylR = boltCyl.clone();
        boltCylR.position.x = width / 2 - 0.0045;

        const extractor = new THREE.Mesh(new THREE.BoxGeometry(width + 0.0016, 0.003, 0.036), steelBarrelMat);
        extractor.position.set(0, yPos + 0.002, zPos - 0.005);

        // 3D Charging Handle Rod & Knurled Knob (Galil uses iconic upward-bent vertical handle)
        const handleStem = new THREE.Mesh(new THREE.CylinderGeometry(0.0036, 0.0036, 0.026, 8), darkReceiverMat);
        handleStem.rotation.z = Math.PI / 2;
        handleStem.position.set(-width / 2 - 0.009, yPos, zPos - 0.020);
        const handleKnob = new THREE.Mesh(
            new THREE.CylinderGeometry(0.0052, 0.0045, upBentHandle ? 0.026 : 0.015, 10),
            matteBlackMat
        );
        if (upBentHandle) {
            handleKnob.position.set(-width / 2 - 0.021, yPos + 0.010, zPos - 0.020);
        } else {
            handleKnob.rotation.z = Math.PI / 2;
            handleKnob.position.set(-width / 2 - 0.019, yPos, zPos - 0.020);
        }

        parent.add(recess, boltCyl, boltCylR, extractor, handleStem, handleKnob);
    };

    // Helper: Build Crisp Slotted MIL-STD-1913 Picatinny Tactical Rail
    const addPicatinnyRail = (parent, width = 0.022, length = 0.22, x = 0, y = 0.044, z = -0.02, orient = 'top', maxTeeth = 14) => {
        const railGroup = new THREE.Group();
        const spine = new THREE.Mesh(new THREE.BoxGeometry(width * 0.72, 0.0045, length), matteBlackMat);
        spine.position.set(0, 0, 0);
        railGroup.add(spine);

        const count = Math.min(maxTeeth, Math.max(3, Math.floor(length / 0.015)));
        const step = length / count;
        const toothGeo = new THREE.BoxGeometry(width, 0.0048, step * 0.56);
        for (let i = 0; i < count; i++) {
            const tooth = new THREE.Mesh(toothGeo, darkReceiverMat);
            tooth.position.set(0, 0.0035, -length / 2 + (i + 0.5) * step);
            railGroup.add(tooth);
        }
        railGroup.position.set(x, y, z);
        if (orient === 'left') railGroup.rotation.z = Math.PI / 2;
        else if (orient === 'right') railGroup.rotation.z = -Math.PI / 2;
        else if (orient === 'bottom') railGroup.rotation.z = Math.PI;
        parent.add(railGroup);
    };

    // Helper: Continuous Realistic First-Person Tactile Gloves & Forearm Sleeves aligned mathematically wrist -> elbow
    const buildGripHand = (isRight = true, pos = [0, -0.08, 0.10], isSupport = false) => {
        const hGroup = new THREE.Group();
        const upAxis = new THREE.Vector3(0, 1, 0);
        const addAlignedArm = (wristV, elbowV, rWrist, rElbow) => {
            const len = wristV.distanceTo(elbowV);
            const dir = wristV.clone().sub(elbowV).normalize();
            const q = new THREE.Quaternion().setFromUnitVectors(upAxis, dir);

            const arm = new THREE.Mesh(new THREE.CylinderGeometry(rWrist, rElbow, len, 16), sleeveMat);
            arm.position.copy(wristV).add(elbowV).multiplyScalar(0.5);
            arm.quaternion.copy(q);

            const cuff = new THREE.Mesh(new THREE.CylinderGeometry(rWrist * 1.04, rWrist * 1.08, 0.028, 16), glovePadMat);
            cuff.position.copy(wristV).addScaledVector(dir, -0.010);
            cuff.quaternion.copy(q);

            hGroup.add(arm, cuff);
        };

        if (isSupport) {
            const palm = buildBeveledBox(0.044, 0.018, 0.056, gloveMat, 0.004, 2);
            palm.position.set(0.002, 0.022, 0);
            const thumb = new THREE.Mesh(new THREE.CylinderGeometry(0.0065, 0.0058, 0.036, 8), gloveMat);
            thumb.rotation.x = Math.PI / 2 - 0.18;
            thumb.position.set(-0.020, 0.035, -0.012);
            for (let f = 0; f < 4; f++) {
                const knuckle = buildBeveledBox(0.009, 0.014, 0.011, glovePadMat, 0.002, 2);
                knuckle.position.set(0.021, 0.026, -0.018 + f * 0.013);
                const tip = new THREE.Mesh(new THREE.CylinderGeometry(0.0052, 0.0046, 0.022, 8), gloveMat);
                tip.position.set(0.023, 0.038, -0.018 + f * 0.013);
                tip.rotation.z = 0.20;
                hGroup.add(knuckle, tip);
            }
            addAlignedArm(
                new THREE.Vector3(-0.006, 0.015, 0.024),
                new THREE.Vector3(-0.18, -0.17, 0.44),
                0.022, 0.038
            );
            hGroup.add(palm, thumb);
        } else {
            const palm = buildBeveledBox(0.040, 0.050, 0.056, gloveMat, 0.005, 2);
            const knuckle = buildBeveledBox(0.043, 0.014, 0.036, glovePadMat, 0.003, 2);
            knuckle.position.set(0, 0.020, -0.006);
            for (let f = 0; f < 4; f++) {
                const finger = new THREE.Mesh(new THREE.CylinderGeometry(0.0060, 0.0050, 0.038, 8), gloveMat);
                finger.rotation.z = Math.PI / 2;
                finger.position.set(isRight ? -0.016 : 0.016, 0.011 - f * 0.011, -0.011 - f * 0.009);
                hGroup.add(finger);
            }
            addAlignedArm(
                new THREE.Vector3(isRight ? 0.006 : -0.006, -0.004, 0.026),
                new THREE.Vector3(isRight ? 0.14 : -0.14, -0.17, 0.42),
                0.022, 0.036
            );
            hGroup.add(palm, knuckle);
        }
        hGroup.position.set(pos[0], pos[1], pos[2]);
        return hGroup;
    };

    const addTriggerAssembly = (parent, x = 0, y = -0.042, z = 0.05) => {
        const guardBottom = new THREE.Mesh(new THREE.BoxGeometry(0.014, 0.005, 0.052), darkReceiverMat);
        guardBottom.position.set(x, y - 0.016, z);
        const guardFront = new THREE.Mesh(new THREE.BoxGeometry(0.014, 0.032, 0.005), darkReceiverMat);
        guardFront.position.set(x, y, z - 0.024);
        const trigger = new THREE.Mesh(new THREE.CylinderGeometry(0.003, 0.0025, 0.024, 6), steelBarrelMat);
        trigger.position.set(x, y + 0.002, z + 0.006);
        trigger.rotation.x = 0.35;
        parent.add(guardBottom, guardFront, trigger);
    };

    const addBipod = (parent, zPos = -0.36, yPos = -0.028) => {
        const mount = new THREE.Mesh(new THREE.BoxGeometry(0.032, 0.018, 0.032), darkReceiverMat);
        mount.position.set(0, yPos + 0.008, zPos);
        // Deployed / semi-angled bipod legs matching Image 1
        const legL = new THREE.Mesh(new THREE.CylinderGeometry(0.005, 0.004, 0.16, 8), darkReceiverMat);
        legL.position.set(-0.026, yPos - 0.055, zPos - 0.03);
        legL.rotation.set(0.45, 0, -0.22);
        const legR = new THREE.Mesh(new THREE.CylinderGeometry(0.005, 0.004, 0.16, 8), darkReceiverMat);
        legR.position.set(0.026, yPos - 0.055, zPos - 0.03);
        legR.rotation.set(0.45, 0, 0.22);
        parent.add(mount, legL, legR);
    };

    const addScope = (parent, isLongSniper = true, yBase = 0.068, zCenter = -0.03) => {
        const sGroup = new THREE.Group();
        const m1 = buildBeveledBox(0.026, 0.024, 0.022, matteBlackMat, 0.002, 2);
        m1.position.set(0, yBase, zCenter + 0.045);
        const m2 = buildBeveledBox(0.026, 0.024, 0.022, matteBlackMat, 0.002, 2);
        m2.position.set(0, yBase, zCenter - 0.055);
        // Chamfered heavy scope ring caps
        const ringCap1 = new THREE.Mesh(new THREE.TorusGeometry(0.0175, 0.0032, 8, 16), gunMetal);
        ringCap1.position.set(0, yBase + 0.020, zCenter + 0.045);
        const ringCap2 = ringCap1.clone();
        ringCap2.position.z = zCenter - 0.055;

        const tubeLen = isLongSniper ? 0.27 : 0.14;
        const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, tubeLen, 16), matteBlackMat);
        tube.rotation.x = Math.PI / 2;
        tube.position.set(0, yBase + 0.020, zCenter);

        // Knurled Zoom Magnification Ring
        const zoomRing = new THREE.Mesh(new THREE.CylinderGeometry(0.0185, 0.0185, 0.022, 16), darkReceiverMat);
        zoomRing.rotation.x = Math.PI / 2;
        zoomRing.position.set(0, yBase + 0.020, zCenter + tubeLen * 0.28);

        const frontBell = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.015, 0.065, 18), matteBlackMat);
        frontBell.rotation.x = Math.PI / 2;
        frontBell.position.set(0, yBase + 0.020, zCenter - tubeLen / 2 - 0.025);

        const rearBell = new THREE.Mesh(new THREE.CylinderGeometry(0.019, 0.021, 0.048, 18), matteBlackMat);
        rearBell.rotation.x = Math.PI / 2;
        rearBell.position.set(0, yBase + 0.020, zCenter + tubeLen / 2 + 0.018);

        const eyeRim = new THREE.Mesh(new THREE.TorusGeometry(0.0188, 0.0024, 8, 18), gunMetal);
        eyeRim.position.set(0, yBase + 0.020, zCenter + tubeLen / 2 + 0.042);

        const lens = new THREE.Mesh(new THREE.CylinderGeometry(0.017, 0.017, 0.004, 16), opticLensMat);
        lens.rotation.x = Math.PI / 2;
        lens.position.set(0, yBase + 0.020, zCenter + tubeLen / 2 + 0.040);

        const turretTop = new THREE.Mesh(new THREE.CylinderGeometry(0.009, 0.009, 0.016, 12), gunMetal);
        turretTop.position.set(0, yBase + 0.038, zCenter);
        const turretSide = new THREE.Mesh(new THREE.CylinderGeometry(0.009, 0.009, 0.016, 12), gunMetal);
        turretSide.rotation.z = Math.PI / 2;
        turretSide.position.set(-0.018, yBase + 0.020, zCenter);

        sGroup.add(m1, m2, ringCap1, ringCap2, tube, zoomRing, frontBell, rearBell, eyeRim, lens, turretTop, turretSide);
        parent.add(sGroup);
    };

    // ==================== 1. MELEE: M9 BAYONET COMBAT KNIFE ====================
    if (weaponId === 'knife') {
        group.add(buildGripHand(true, [0, -0.05, 0.06], false));
        const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.019, 0.021, 0.13, 14), polymerOliveMat);
        handle.rotation.x = Math.PI / 2;
        for (let r = -2; r <= 2; r++) {
            const groove = new THREE.Mesh(new THREE.TorusGeometry(0.020, 0.002, 6, 14), darkReceiverMat);
            groove.position.set(0, 0, r * 0.02);
            group.add(groove);
        }
        const pommel = new THREE.Mesh(new THREE.CylinderGeometry(0.023, 0.021, 0.016, 12), gunMetal);
        pommel.rotation.x = Math.PI / 2;
        pommel.position.set(0, 0, 0.072);

        const guard = new THREE.Mesh(new THREE.BoxGeometry(0.020, 0.082, 0.012), gunMetal);
        guard.position.set(0, 0.006, -0.068);
        const barrelRing = new THREE.Mesh(new THREE.TorusGeometry(0.013, 0.0035, 8, 14), gunMetal);
        barrelRing.position.set(0, 0.034, -0.068);

        const blade = new THREE.Mesh(new THREE.BoxGeometry(0.005, 0.038, 0.24), chromeMat);
        blade.position.set(0, 0.005, -0.19);
        const bladeTip = new THREE.Mesh(new THREE.ConeGeometry(0.019, 0.062, 4), chromeMat);
        bladeTip.rotation.x = -Math.PI / 2;
        bladeTip.rotation.z = Math.PI / 4;
        bladeTip.scale.set(0.28, 1, 1);
        bladeTip.position.set(0, 0.005, -0.34);

        const fuller = new THREE.Mesh(new THREE.BoxGeometry(0.007, 0.008, 0.16), steelBarrelMat);
        fuller.position.set(0, 0.011, -0.16);

        group.add(handle, pommel, guard, barrelRing, blade, bladeTip, fuller);
        group.rotation.set(0.14, 0.20, -0.10);
        group.position.set(0.21, -0.20, -0.36);
        return group;
    }

    // ==================== 2. GRENADE: M67 FRAG ====================
    if (weaponId === 'hegrenade') {
        group.add(buildGripHand(true, [0, -0.05, 0.06], false));
        const body = new THREE.Mesh(new THREE.SphereGeometry(0.056, 20, 20), polymerOliveMat);
        const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.057, 0.057, 0.012, 20), brassMat);
        const fuseHead = new THREE.Mesh(new THREE.CylinderGeometry(0.017, 0.024, 0.044, 12), steelBarrelMat);
        fuseHead.position.set(0, 0.063, 0);
        const spoon = new THREE.Mesh(new THREE.BoxGeometry(0.013, 0.080, 0.020), gunMetal);
        spoon.position.set(0.036, 0.022, 0);
        spoon.rotation.z = 0.15;
        const pinRing = new THREE.Mesh(new THREE.TorusGeometry(0.017, 0.003, 8, 16), chromeMat);
        pinRing.position.set(-0.024, 0.063, 0.01);
        group.add(body, collar, fuseHead, spoon, pinRing);
        group.position.set(0.21, -0.21, -0.38);
        return group;
    }

    // ==================== 3. PISTOLS (7 DISTINCT MODELS MATCHING IMAGE 1) ====================
    if (wep.category === 'pistol') {
        const buildPistolModel = (offsetX = 0) => {
            const pGroup = new THREE.Group();
            const isDeagle = weaponId === 'deagle';
            const isRevolver = weaponId === 'revolver';
            const isFiveSeven = weaponId === 'fiveseven';
            const isGlock = weaponId === 'glock';
            const isDual = weaponId === 'dualelites';
            const isUsp = weaponId === 'pistol';

            const frameMat = isFiveSeven ? polymerOliveMat : (isDeagle ? matteBlackMat : darkReceiverMat);
            const slideMat = isDeagle ? chromeMat : (isGlock || isFiveSeven ? matteBlackMat : gunMetal);

            if (isRevolver) {
                // R8 Revolver .357 Magnum: Chamfered frame, Fluted 6-shot cylinder, vented top rib barrel with under-lug rail
                const frame = buildBeveledBox(0.032, 0.055, 0.12, darkReceiverMat, 0.0028, 3);
                frame.position.set(offsetX, 0.018, 0.01);
                const cyl = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.066, 16), gunMetal);
                cyl.rotation.x = Math.PI / 2;
                cyl.position.set(offsetX, 0.024, 0.005);
                for (let fl = 0; fl < 6; fl++) {
                    const ang = (fl / 6) * Math.PI * 2;
                    const flute = new THREE.Mesh(new THREE.BoxGeometry(0.006, 0.006, 0.052), matteBlackMat);
                    flute.position.set(offsetX + Math.cos(ang) * 0.027, 0.024 + Math.sin(ang) * 0.027, 0.005);
                    flute.rotation.z = ang;
                    pGroup.add(flute);
                }

                const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.011, 0.011, 0.18, 14), steelBarrelMat);
                barrel.rotation.x = Math.PI / 2;
                barrel.position.set(offsetX, 0.036, -0.12);
                const shroud = buildBeveledBox(0.026, 0.038, 0.175, gunMetal, 0.0022, 2);
                shroud.position.set(offsetX, 0.028, -0.118);
                const topRib = buildBeveledBox(0.016, 0.008, 0.19, matteBlackMat, 0.0014, 2);
                topRib.position.set(offsetX, 0.050, -0.11);
                addPicatinnyRail(pGroup, 0.018, 0.10, offsetX, 0.006, -0.14, 'bottom', 6);
                addMuzzleCrown(pGroup, offsetX, 0.036, -0.212, 0.0065);

                const grip = buildBeveledBox(0.034, 0.115, 0.048, matteBlackMat, 0.004, 3);
                grip.position.set(offsetX, -0.052, 0.068);
                grip.rotation.x = 0.35;
                const hammer = new THREE.Mesh(new THREE.BoxGeometry(0.008, 0.022, 0.020), steelBarrelMat);
                hammer.position.set(offsetX, 0.046, 0.072);
                hammer.rotation.x = -0.45;

                addTriggerAssembly(pGroup, offsetX, -0.016, 0.025);
                pGroup.add(frame, cyl, barrel, shroud, topRib, grip, hammer);
                return pGroup;
            }

            // Standard Chamfered Semi-Auto Pistol Frame + Beavertail Tang + Under-Barrel Picatinny Rail
            const frameLen = isDeagle ? 0.24 : 0.19;
            const frame = buildBeveledBox(0.034, 0.022, frameLen, frameMat, 0.0026, 2);
            frame.position.set(offsetX, 0.006, -0.02);
            const beaverTail = buildBeveledBox(0.028, 0.011, 0.028, frameMat, 0.002, 2);
            beaverTail.position.set(offsetX, 0.012, 0.068);
            pGroup.add(beaverTail);
            if (!isRevolver) {
                addPicatinnyRail(pGroup, 0.022, 0.065, offsetX, -0.007, -0.085, 'bottom', 4);
            }

            const slideW = isDeagle ? 0.042 : 0.035;
            const slideH = isDeagle ? 0.044 : 0.034;
            const slideL = isDeagle ? 0.26 : 0.21;

            if (isDual) {
                // Beretta 92FS open-top cutaway slide exposing silver/steel barrel
                const slideRear = buildBeveledBox(slideW, slideH, 0.095, gunMetal, 0.0028, 2);
                slideRear.position.set(offsetX, 0.034, 0.025);
                const slideLow = buildBeveledBox(slideW, 0.018, 0.13, gunMetal, 0.0022, 2);
                slideLow.position.set(offsetX, 0.025, -0.08);
                const exposedBarrel = new THREE.Mesh(new THREE.CylinderGeometry(0.011, 0.011, 0.15, 14), steelBarrelMat);
                exposedBarrel.rotation.x = Math.PI / 2;
                exposedBarrel.position.set(offsetX, 0.038, -0.075);
                pGroup.add(slideRear, slideLow, exposedBarrel);
            } else {
                const slide = buildBeveledBox(slideW, slideH, slideL, slideMat, 0.0034, 3);
                slide.position.set(offsetX, 0.034, -0.03);
                if (!isGlock) {
                    const slideTop = buildBeveledBox(slideW * 0.78, 0.006, slideL * 0.96, slideMat, 0.0015, 2);
                    slideTop.position.set(offsetX, 0.034 + slideH / 2 + 0.002, -0.03);
                    pGroup.add(slideTop);
                }
                // Dark recessed ejection port + brushed steel barrel chamber hood
                const portRecess = new THREE.Mesh(new THREE.BoxGeometry(slideW + 0.001, 0.012, 0.044), matteBlackMat);
                portRecess.position.set(offsetX, 0.042, -0.005);
                const hood = new THREE.Mesh(new THREE.CylinderGeometry(slideW * 0.36, slideW * 0.36, 0.038, 12), isDeagle ? darkReceiverMat : steelBarrelMat);
                hood.rotation.x = Math.PI / 2;
                hood.position.set(offsetX, 0.042, -0.005);
                // Rear slide cocking serrations (5 crisp vertical ribs)
                for (let sr = 0; sr < 5; sr++) {
                    const rib = new THREE.Mesh(new THREE.BoxGeometry(slideW + 0.0018, slideH * 0.68, 0.0030), matteBlackMat);
                    rib.position.set(offsetX, 0.033, 0.046 + sr * 0.0065);
                    pGroup.add(rib);
                }
                pGroup.add(slide, portRecess, hood);
            }

            if (isUsp) {
                // USP-S Long Matte Black Cylindrical Suppressor + Collar Baffle Rings + Hollow Bore
                const supp = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.175, 18), matteBlackMat);
                supp.rotation.x = Math.PI / 2;
                supp.position.set(offsetX, 0.034, -0.22);
                const suppCollar = new THREE.Mesh(new THREE.CylinderGeometry(0.0175, 0.0175, 0.016, 18), gunMetal);
                suppCollar.rotation.x = Math.PI / 2;
                suppCollar.position.set(offsetX, 0.034, -0.145);
                addMuzzleCrown(pGroup, offsetX, 0.034, -0.308, 0.0072);
                pGroup.add(supp, suppCollar);
            } else {
                const muzzle = new THREE.Mesh(new THREE.CylinderGeometry(0.009, 0.009, 0.02, 14), steelBarrelMat);
                muzzle.rotation.x = Math.PI / 2;
                muzzle.position.set(offsetX, 0.034, -0.03 - slideL / 2);
                addMuzzleCrown(pGroup, offsetX, 0.034, -0.040 - slideL / 2, 0.0060);
                pGroup.add(muzzle);
            }

            const gripMat = isFiveSeven ? polymerOliveMat : matteBlackMat;
            const grip = buildBeveledBox(0.033, 0.118, 0.048, gripMat, 0.0038, 3);
            grip.position.set(offsetX, -0.048, 0.046);
            grip.rotation.x = 0.26;
            if (isDeagle) {
                const insert = buildBeveledBox(0.035, 0.095, 0.036, darkReceiverMat, 0.002, 2);
                insert.position.set(offsetX, -0.048, 0.048);
                insert.rotation.x = 0.26;
                pGroup.add(insert);
            }

            const rearSight = new THREE.Mesh(new THREE.BoxGeometry(0.028, 0.010, 0.012), matteBlackMat);
            rearSight.position.set(offsetX, 0.056, 0.062);
            const dotL = new THREE.Mesh(new THREE.SphereGeometry(0.0022, 6, 6), tritiumGlowMat);
            dotL.position.set(offsetX - 0.007, 0.057, 0.069);
            const dotR = new THREE.Mesh(new THREE.SphereGeometry(0.0022, 6, 6), tritiumGlowMat);
            dotR.position.set(offsetX + 0.007, 0.057, 0.069);

            const frontSight = new THREE.Mesh(new THREE.BoxGeometry(0.006, 0.011, 0.012), matteBlackMat);
            frontSight.position.set(offsetX, 0.056, -0.02 - slideL / 2);

            addTriggerAssembly(pGroup, offsetX, -0.014, 0.008);
            pGroup.add(frame, grip, rearSight, dotL, dotR, frontSight);
            return pGroup;
        };

        group.add(buildGripHand(true, [0, -0.065, 0.07], false));
        group.add(buildPistolModel(0));
        if (weaponId === 'dualelites') {
            group.add(buildGripHand(false, [-0.30, -0.065, 0.07], false));
            group.add(buildPistolModel(-0.30));
        }

        attachMuzzleEffects(group, weaponId === 'pistol' ? -0.32 : -0.22);
        group.rotation.set(0.025, 0.115, 0);
        group.position.set(0.24, -0.19, -0.52);
        return group;
    }

    // ==================== 4. SHOTGUNS (NOVA, SAWED-OFF, MAG-7, XM1014, SPAS-12) ====================
    if (wep.category === 'shotgun') {
        const isSawed = weaponId === 'sawedoff';
        const isMag7 = weaponId === 'mag7';
        const isSpas = weaponId === 'spas12';
        const isXm = weaponId === 'shotgun';

        group.add(buildGripHand(true, [0, -0.08, isMag7 ? -0.02 : 0.11], false));
        group.add(buildGripHand(false, [-0.012, -0.055, isMag7 ? -0.22 : -0.28], true));

        if (isMag7) {
            // MAG-7 Tactical Shotgun: Chamfered steel receiver, central pistol grip with box mag, short pump forend
            const receiver = buildBeveledBox(0.052, 0.078, 0.30, gunMetal, 0.003, 3);
            receiver.position.set(0, 0.015, -0.06);
            const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.24, 16), steelBarrelMat);
            barrel.rotation.x = Math.PI / 2;
            barrel.position.set(0, 0.028, -0.28);
            addMuzzleCrown(group, 0, 0.028, -0.402, 0.0095);
            const forend = buildBeveledBox(0.048, 0.052, 0.14, matteBlackMat, 0.003, 2);
            forend.position.set(0, -0.008, -0.23);
            const gripMag = buildBeveledBox(0.038, 0.15, 0.056, matteBlackMat, 0.0028, 2);
            gripMag.position.set(0, -0.075, -0.02);
            gripMag.rotation.x = 0.22;
            const rearSight = buildBeveledBox(0.032, 0.018, 0.02, darkReceiverMat, 0.002, 2);
            rearSight.position.set(0, 0.062, 0.07);
            addTriggerAssembly(group, 0, -0.032, -0.06);
            addPicatinnyRail(group, 0.022, 0.18, 0, 0.057, -0.06, 'top', 10);
            group.add(receiver, barrel, forend, gripMag, rearSight);
            attachMuzzleEffects(group, -0.42);
            group.rotation.set(0.025, 0.115, 0);
            group.position.set(0.24, -0.19, -0.52);
            return group;
        }

        const recMat = isSawed ? darkReceiverMat : gunMetal;
        const furnMat = isSawed ? woodMat : matteBlackMat;

        const receiver = buildBeveledBox(0.052, 0.076, 0.32, recMat, 0.0032, 3);
        // Dark recessed shotgun ejection port + rounded brushed-steel bolt cylinder inside
        const sgPort = new THREE.Mesh(new THREE.BoxGeometry(0.053, 0.016, 0.072), matteBlackMat);
        sgPort.position.set(0, 0.018, -0.02);
        const sgBolt = new THREE.Mesh(new THREE.CylinderGeometry(0.0072, 0.0072, 0.066, 12), steelBarrelMat);
        sgBolt.rotation.x = Math.PI / 2;
        sgBolt.position.set(-0.021, 0.018, -0.02);

        const barrelLen = isSawed ? 0.34 : 0.50;
        const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, barrelLen, 16), darkReceiverMat);
        barrel.rotation.x = Math.PI / 2;
        barrel.position.set(0, 0.028, -0.16 - barrelLen / 2);
        addMuzzleCrown(group, 0, 0.028, -0.16 - barrelLen - 0.001, 0.0095);
        // Ventilated rib + high-visibility fiber-optic red front sight bead
        const ventRib = buildBeveledBox(0.010, 0.006, barrelLen * 0.94, darkReceiverMat, 0.001, 2);
        ventRib.position.set(0, 0.044, -0.16 - barrelLen / 2);
        const fiberBead = new THREE.Mesh(new THREE.CylinderGeometry(0.0022, 0.0022, 0.012, 8), redDotGlowMat);
        fiberBead.rotation.x = Math.PI / 2;
        fiberBead.position.set(0, 0.049, -0.16 - barrelLen + 0.018);
        group.add(ventRib, fiberBead);

        const tubeLen = barrelLen * 0.92;
        const tubeMag = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, tubeLen, 14), gunMetal);
        tubeMag.rotation.x = Math.PI / 2;
        tubeMag.position.set(0, 0.002, -0.16 - tubeLen / 2);

        if (isXm) {
            addPicatinnyRail(group, 0.022, 0.22, 0, 0.041, -0.02, 'top', 12);
        }
        if (isSpas) {
            // SPAS-12 Chamfered Perforated Heat-Shield Shroud + Vented Top Slots
            const shroud = buildBeveledBox(0.044, 0.048, 0.30, gunMetal, 0.0026, 2);
            shroud.position.set(0, 0.020, -0.31);
            group.add(shroud);
            for (let v = 0; v < 6; v++) {
                const slot = new THREE.Mesh(new THREE.BoxGeometry(0.046, 0.012, 0.022), matteBlackMat);
                slot.position.set(0, 0.028, -0.20 - v * 0.042);
                group.add(slot);
            }
        }

        const pump = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, 0.20, 16), furnMat);
        pump.rotation.x = Math.PI / 2;
        pump.position.set(0, -0.004, -0.28);
        for (let pRib = -3; pRib <= 3; pRib++) {
            const groove = new THREE.Mesh(new THREE.TorusGeometry(0.0245, 0.0018, 6, 14), darkReceiverMat);
            groove.position.set(0, -0.004, -0.28 + pRib * 0.022);
            group.add(groove);
        }

        if (isSawed) {
            // Sawed-Off wooden chopped beveled bird's-head grip stock
            const woodStock = buildBeveledBox(0.042, 0.062, 0.19, woodMat, 0.004, 3);
            woodStock.position.set(0, -0.036, 0.21);
            woodStock.rotation.x = -0.32;
            group.add(woodStock);
        } else {
            group.add(buildErgonomicGrip(matteBlackMat, 0.10, -0.024));
            group.add(buildContouredStock(isXm ? darkReceiverMat : matteBlackMat, 0.038, false, 0.15));
        }

        addTriggerAssembly(group, 0, -0.038, 0.06);
        group.add(receiver, sgPort, sgBolt, barrel, tubeMag, pump);
        attachMuzzleEffects(group, -0.18 - barrelLen);
        group.rotation.set(0.025, 0.115, 0);
        group.position.set(0.24, -0.19, -0.52);
        return group;
    }

    // ==================== 5. SMGS (MAC-10, MP9, UMP-45, BIZON, MP5-SD, P90) ====================
    if (wep.category === 'smg') {
        if (weaponId === 'mac10' || weaponId === 'mp9') {
            const isMac = weaponId === 'mac10';
            group.add(buildGripHand(true, [0, -0.075, 0.02], false));
            group.add(buildGripHand(false, [-0.01, -0.065, -0.14], true));

            const rec = buildBeveledBox(0.048, 0.068, isMac ? 0.22 : 0.25, isMac ? gunMetal : darkReceiverMat, 0.0028, 3);
            rec.position.set(0, 0.02, -0.04);
            addBoltAndChargingHandle(group, 0.028, -0.04, 0.048);

            const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.10, 14), steelBarrelMat);
            barrel.rotation.x = Math.PI / 2;
            barrel.position.set(0, 0.018, -0.18);
            addMuzzleCrown(group, 0, 0.018, -0.232, 0.0068);

            const grip = buildBeveledBox(0.036, 0.10, 0.048, matteBlackMat, 0.003, 2);
            grip.position.set(0, -0.05, 0.02);
            const extMag = buildBeveledBox(0.028, 0.17, 0.036, bakeliteMat, 0.002, 2);
            extMag.position.set(0, -0.12, 0.02);

            if (isMac) {
                const strapRing = new THREE.Mesh(new THREE.TorusGeometry(0.014, 0.003, 6, 12), steelBarrelMat);
                strapRing.position.set(0, -0.01, -0.17);
                const strap = buildBeveledBox(0.018, 0.11, 0.008, matteBlackMat, 0.001, 1);
                strap.position.set(0, -0.07, -0.17);
                group.add(strapRing, strap);
            } else {
                const vGrip = new THREE.Mesh(new THREE.CylinderGeometry(0.013, 0.012, 0.085, 12), matteBlackMat);
                vGrip.position.set(0, -0.045, -0.13);
                const wireStock = buildBeveledBox(0.016, 0.022, 0.18, darkReceiverMat, 0.002, 2);
                wireStock.position.set(0, 0.025, 0.16);
                const buttPad = buildBeveledBox(0.028, 0.075, 0.016, matteBlackMat, 0.0025, 2);
                buttPad.position.set(0, 0.01, 0.25);
                group.add(vGrip, wireStock, buttPad);
            }

            addTriggerAssembly(group, 0, -0.025, -0.02);
            if (!isMac) addPicatinnyRail(group, 0.020, 0.16, 0, 0.057, -0.04, 'top', 10);
            group.add(rec, barrel, grip, extMag);
            attachMuzzleEffects(group, -0.25);
            group.rotation.set(0.025, 0.115, 0);
            group.position.set(0.24, -0.19, -0.52);
            return group;
        }

        if (weaponId === 'p90') {
            // Authentic FN P90 Tactical: Pierced Thumbhole Polymer Chassis, Translucent 50-rd Mag w/ 5.7mm Rounds, Open Ring Reflex Sight
            group.add(buildGripHand(true, [0.002, -0.068, -0.036], false));
            group.add(buildGripHand(false, [-0.008, -0.052, -0.162], true));

            const p90Shape = new THREE.Shape();
            p90Shape.moveTo(0.210, 0.030);
            p90Shape.lineTo(0.140, 0.028);
            p90Shape.lineTo(-0.115, 0.028);
            p90Shape.lineTo(-0.145, 0.040);
            p90Shape.lineTo(-0.218, 0.030);
            p90Shape.lineTo(-0.228, 0.002);
            p90Shape.lineTo(-0.205, -0.032);
            p90Shape.lineTo(-0.175, -0.048);
            p90Shape.lineTo(-0.140, -0.044);
            p90Shape.lineTo(-0.112, -0.074);
            p90Shape.lineTo(-0.072, -0.074);
            p90Shape.lineTo(-0.052, -0.106);
            p90Shape.lineTo(-0.012, -0.102);
            p90Shape.lineTo(-0.022, -0.034);
            p90Shape.lineTo(0.052, -0.068);
            p90Shape.lineTo(0.212, -0.090);
            p90Shape.closePath();

            // Pierced Thumbhole Cutout inside rear stock
            const thumbHole = new THREE.Path();
            thumbHole.moveTo(0.022, -0.002);
            thumbHole.lineTo(0.112, -0.004);
            thumbHole.lineTo(0.125, -0.048);
            thumbHole.lineTo(0.038, -0.042);
            thumbHole.closePath();
            p90Shape.holes.push(thumbHole);

            // Trigger finger aperture
            const trigHole = new THREE.Path();
            trigHole.moveTo(-0.102, -0.014);
            trigHole.lineTo(-0.046, -0.014);
            trigHole.lineTo(-0.054, -0.058);
            trigHole.lineTo(-0.098, -0.058);
            trigHole.closePath();
            p90Shape.holes.push(trigHole);

            const chassisGeo = normalizeExtrudeUVs(new THREE.ExtrudeGeometry(p90Shape, {
                depth: 0.046,
                bevelEnabled: true,
                bevelThickness: 0.0035,
                bevelSize: 0.0032,
                bevelSegments: 3
            }));
            const chassis = new THREE.Mesh(chassisGeo, polymerOliveMat);
            chassis.rotation.y = -Math.PI / 2;
            chassis.position.set(0.023, 0, 0);

            // Textured Rubber Recoil Buttpad
            const buttPad = buildBeveledBox(0.052, 0.124, 0.018, matteBlackMat, 0.003, 2);
            buttPad.position.set(0, -0.030, 0.216);

            // Dark Alloy Upper Receiver Bridge + Left/Right Picatinny Rails + Dual Cocking Knobs
            const upperBridge = buildBeveledBox(0.042, 0.030, 0.155, darkReceiverMat, 0.003, 2);
            upperBridge.position.set(0, 0.046, -0.145);
            addPicatinnyRail(group, 0.015, 0.115, -0.024, 0.040, -0.15, 'left', 7);
            addPicatinnyRail(group, 0.015, 0.115, 0.024, 0.040, -0.15, 'right', 7);
            const cockL = new THREE.Mesh(new THREE.CylinderGeometry(0.0055, 0.0055, 0.062, 10), gunMetal);
            cockL.rotation.z = Math.PI / 2;
            cockL.position.set(0, 0.018, -0.155);

            // Integrated Open Arched P90 Reflex Ring Sight (Hollow optical window + Red-Dot Ring Reticle - NO solid grey block!)
            const opticPillarL = buildBeveledBox(0.005, 0.024, 0.046, matteBlackMat, 0.0012, 2);
            opticPillarL.position.set(-0.014, 0.072, -0.118);
            const opticPillarR = opticPillarL.clone();
            opticPillarR.position.x = 0.014;
            const opticHood = buildBeveledBox(0.033, 0.006, 0.048, darkReceiverMat, 0.0018, 2);
            opticHood.position.set(0, 0.086, -0.118);
            const opticBase = buildBeveledBox(0.032, 0.007, 0.052, darkReceiverMat, 0.0015, 2);
            opticBase.position.set(0, 0.062, -0.118);
            const opticGlass = new THREE.Mesh(new THREE.PlaneGeometry(0.022, 0.018), holoReticleMat);
            opticGlass.position.set(0, 0.074, -0.116);
            const opticGlassBack = opticGlass.clone();
            opticGlassBack.rotation.y = Math.PI;
            opticGlassBack.position.z = -0.120;
            const opticDrum = new THREE.Mesh(new THREE.CylinderGeometry(0.0065, 0.0065, 0.008, 10), gunMetal);
            opticDrum.rotation.z = Math.PI / 2;
            opticDrum.position.set(-0.019, 0.073, -0.118);

            // Translucent Smoked-Amber 50-Round Top Magazine + Visible Brass 5.7x28mm Cartridges Inside!
            const magShell = buildBeveledBox(0.042, 0.018, 0.275, smokedPolyMat, 0.003, 2);
            magShell.position.set(0, 0.038, 0.025);
            const magLatch = buildBeveledBox(0.046, 0.014, 0.028, matteBlackMat, 0.002, 2);
            magLatch.position.set(0, 0.039, 0.165);
            for (let rd = 0; rd < 14; rd++) {
                const cartridge = new THREE.Mesh(new THREE.CylinderGeometry(0.0032, 0.0032, 0.034, 8), brassMat);
                cartridge.rotation.z = Math.PI / 2;
                cartridge.position.set(0, 0.037, -0.088 + rd * 0.0175);
                group.add(cartridge);
            }

            // Trigger & Fluted Barrel + Angled P90 Birdcage Compensator + Hollow Bore Crown
            const trigger = new THREE.Mesh(new THREE.CylinderGeometry(0.0032, 0.0026, 0.024, 8), steelBarrelMat);
            trigger.position.set(0, -0.028, -0.074);
            trigger.rotation.x = 0.28;

            const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.010, 0.011, 0.10, 14), steelBarrelMat);
            barrel.rotation.x = Math.PI / 2;
            barrel.position.set(0, 0.020, -0.245);
            const comp = new THREE.Mesh(new THREE.CylinderGeometry(0.0125, 0.0125, 0.038, 14), matteBlackMat);
            comp.rotation.x = Math.PI / 2;
            comp.position.set(0, 0.020, -0.282);
            addMuzzleCrown(group, 0, 0.020, -0.302, 0.0062);

            group.add(
                chassis, buttPad, upperBridge, cockL,
                opticPillarL, opticPillarR, opticHood, opticBase, opticGlass, opticGlassBack, opticDrum,
                magShell, magLatch, trigger, barrel, comp
            );
            attachMuzzleEffects(group, -0.32);
            group.rotation.set(0.025, 0.115, 0);
            group.position.set(0.24, -0.19, -0.52);
            return group;
        }

        group.add(buildGripHand(true, [0, -0.08, 0.10], false));
        group.add(buildGripHand(false, [-0.012, -0.055, -0.22], true));

        // UMP-45, PP-Bizon, MP5-SD with chamfered beveled receivers
        const receiver = buildBeveledBox(0.050, 0.072, 0.32, gunMetal, 0.003, 3);
        addBoltAndChargingHandle(group, 0.022, -0.04, 0.050);
        const grip = buildErgonomicGrip(matteBlackMat, 0.095, -0.024);
        const stock = buildContouredStock(darkReceiverMat, 0.036, true, 0.15);
        addTriggerAssembly(group, 0, -0.038, 0.05);
        group.add(receiver, grip, stock);

        if (weaponId === 'bizon') {
            const cylMag = new THREE.Mesh(new THREE.CylinderGeometry(0.027, 0.027, 0.29, 18), bakeliteMat);
            cylMag.rotation.x = Math.PI / 2;
            cylMag.position.set(0, -0.035, -0.20);
            const hg = buildBeveledBox(0.048, 0.045, 0.18, darkReceiverMat, 0.0025, 2);
            hg.position.set(0, 0.012, -0.23);
            const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.011, 0.011, 0.16, 14), steelBarrelMat);
            barrel.rotation.x = Math.PI / 2;
            barrel.position.set(0, 0.018, -0.36);
            addMuzzleCrown(group, 0, 0.018, -0.442, 0.0064);
            group.add(cylMag, hg, barrel);
            attachMuzzleEffects(group, -0.45);
        } else if (weaponId === 'mp5') {
            const sdHandguard = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.026, 0.18, 18), matteBlackMat);
            sdHandguard.rotation.x = Math.PI / 2;
            sdHandguard.position.set(0, 0.015, -0.23);
            for (let r = -3; r <= 3; r++) {
                const rib = new THREE.Mesh(new THREE.TorusGeometry(0.0265, 0.0018, 6, 16), darkReceiverMat);
                rib.position.set(0, 0.015, -0.23 + r * 0.022);
                group.add(rib);
            }
            const sdSupp = new THREE.Mesh(new THREE.CylinderGeometry(0.021, 0.021, 0.22, 18), darkReceiverMat);
            sdSupp.rotation.x = Math.PI / 2;
            sdSupp.position.set(0, 0.015, -0.38);
            addMuzzleCrown(group, 0, 0.015, -0.491, 0.0075);
            const mag = buildCurvedMagazine(bakeliteMat, 0.024, 0.15, 0.038, -0.06, -0.025);
            group.add(sdHandguard, sdSupp, mag);
            attachMuzzleEffects(group, -0.50);
        } else {
            // UMP-45 with Top Rail & Forend Quad Rails
            addPicatinnyRail(group, 0.022, 0.24, 0, 0.039, -0.02, 'top', 14);
            addPicatinnyRail(group, 0.016, 0.14, -0.026, 0.012, -0.23, 'left', 8);
            addPicatinnyRail(group, 0.016, 0.14, 0.026, 0.012, -0.23, 'right', 8);
            const hg = buildBeveledBox(0.048, 0.056, 0.18, darkReceiverMat, 0.0028, 2);
            hg.position.set(0, 0.010, -0.23);
            const vGrip = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.013, 0.085, 12), matteBlackMat);
            vGrip.position.set(0, -0.052, -0.23);
            const straightMag = buildBeveledBox(0.028, 0.16, 0.040, bakeliteMat, 0.0022, 2);
            straightMag.position.set(0, -0.105, -0.06);
            straightMag.rotation.x = 0.06;
            const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.011, 0.011, 0.14, 14), steelBarrelMat);
            barrel.rotation.x = Math.PI / 2;
            barrel.position.set(0, 0.015, -0.36);
            addMuzzleCrown(group, 0, 0.015, -0.432, 0.0068);
            group.add(hg, vGrip, straightMag, barrel);
            attachMuzzleEffects(group, -0.44);
        }

        group.rotation.set(0.025, 0.115, 0);
        group.position.set(0.24, -0.19, -0.52);
        return group;
    }

    // ==================== 6. HEAVY MACHINE GUNS (NEGEV & M249 SAW) ====================
    if (wep.category === 'mg') {
        group.add(buildGripHand(true, [0, -0.08, 0.11], false));
        group.add(buildGripHand(false, [-0.015, -0.06, -0.26], true));

        const receiver = buildBeveledBox(0.066, 0.090, 0.42, gunMetal, 0.0035, 3);
        const topCover = buildBeveledBox(0.060, 0.020, 0.26, darkReceiverMat, 0.0028, 2);
        topCover.position.set(0, 0.054, -0.02);
        addPicatinnyRail(group, 0.024, 0.24, 0, 0.066, -0.02, 'top', 14);
        addBoltAndChargingHandle(group, 0.022, -0.04, 0.066);

        const shroud = buildBeveledBox(0.058, 0.060, 0.24, darkReceiverMat, 0.003, 2);
        shroud.position.set(0, 0.012, -0.31);
        for (let hSlot = 0; hSlot < 5; hSlot++) {
            const vent = new THREE.Mesh(new THREE.BoxGeometry(0.060, 0.014, 0.024), matteBlackMat);
            vent.position.set(0, 0.018, -0.22 - hSlot * 0.044);
            group.add(vent);
        }
        const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.015, 0.44, 16), steelBarrelMat);
        barrel.rotation.x = Math.PI / 2;
        barrel.position.set(0, 0.020, -0.42);
        addMuzzleCrown(group, 0, 0.020, -0.642, 0.0072);

        const boxMag = buildBeveledBox(0.102, 0.142, 0.128, polymerOliveMat, 0.004, 3);
        boxMag.position.set(0, -0.112, -0.08);
        for (let b = 0; b < 5; b++) {
            const bullet = new THREE.Mesh(new THREE.CylinderGeometry(0.0046, 0.0050, 0.042, 8), brassMat);
            bullet.rotation.z = Math.PI / 2 - b * 0.1;
            bullet.position.set(-0.045, -0.025 + b * 0.011, -0.06 - b * 0.01);
            const link = new THREE.Mesh(new THREE.BoxGeometry(0.016, 0.008, 0.009), matteBlackMat);
            link.position.set(-0.045, -0.025 + b * 0.011, -0.06 - b * 0.01);
            group.add(bullet, link);
        }

        addBipod(group, -0.34, -0.022);

        const grip = buildErgonomicGrip(matteBlackMat, 0.105, -0.032);
        const stock = buildContouredStock(darkReceiverMat, 0.042, true, 0.20);

        addTriggerAssembly(group, 0, -0.042, 0.06);
        group.add(receiver, topCover, shroud, barrel, boxMag, grip, stock);
        attachMuzzleEffects(group, -0.66);
        group.rotation.set(0.025, 0.115, 0);
        group.position.set(0.24, -0.19, -0.52);
        return group;
    }

    // ==================== 7. ASSAULT RIFLES & SNIPER RIFLES ====================
    group.add(buildGripHand(true, [0, -0.08, 0.11], false));
    group.add(buildGripHand(false, [-0.012, -0.055, -0.25], true));

    // --- 7A. CV-47 (AK-47 KALASHNIKOV) & GALIL AR ---
    if (weaponId === 'ak47' || weaponId === 'galil') {
        const isAK = weaponId === 'ak47';
        const furnMat = isAK ? woodMat : matteBlackMat;

        // Authentic Chamfered Stamped Steel Receiver + Smooth Curved Ribbed Dust Cover
        const receiver = buildBeveledBox(0.050, 0.066, 0.34, darkReceiverMat, 0.003, 3);
        receiver.position.set(0, 0.005, -0.01);
        const dustCover = new THREE.Mesh(new THREE.CylinderGeometry(0.0245, 0.025, 0.28, 18), gunMetal);
        dustCover.rotation.x = Math.PI / 2;
        dustCover.position.set(0, 0.037, 0.01);
        for (let r = 0; r < 3; r++) {
            const rib = new THREE.Mesh(new THREE.TorusGeometry(0.0252, 0.0016, 6, 16, Math.PI), darkReceiverMat);
            rib.position.set(0, 0.037, -0.06 + r * 0.065);
            group.add(rib);
        }

        // Fire-Selector Lever Bar & Pivot Pin on Receiver Sides
        const selectorBar = buildBeveledBox(0.053, 0.010, 0.11, gunMetal, 0.0015, 2);
        selectorBar.position.set(0, 0.010, 0.04);
        selectorBar.rotation.x = 0.08;
        const selectorPin = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.055, 10), matteBlackMat);
        selectorPin.rotation.z = Math.PI / 2;
        selectorPin.position.set(0, 0.006, 0.09);

        // Recessed Metallic Bolt Carrier & 3D Charging Handle (Galil has authentic upward-bent cocking handle)
        addBoltAndChargingHandle(group, 0.025, -0.05, 0.050, !isAK);

        // Dark Tangent Leaf Sight Block (no bright white block glare!)
        const rearSightBlock = buildBeveledBox(0.034, 0.024, 0.054, matteBlackMat, 0.002, 2);
        rearSightBlock.position.set(0, 0.043, -0.15);
        const sightLeaf = buildBeveledBox(0.018, 0.006, 0.044, darkReceiverMat, 0.001, 1);
        sightLeaf.position.set(0, 0.056, -0.15);
        if (!isAK) {
            const rearFlipSight = buildBeveledBox(0.024, 0.016, 0.022, matteBlackMat, 0.0018, 2);
            rearFlipSight.position.set(0, 0.064, 0.125);
            group.add(rearFlipSight);
        }

        // Handguards: Lacquered Walnut on AK-47 vs Ventilated Tactical Polymer on Galil AR
        const lowerHg = buildBeveledBox(0.050, 0.038, 0.21, furnMat, 0.0035, 3);
        lowerHg.position.set(0, 0.003, -0.27);
        if (!isAK) {
            for (let sl = 0; sl < 4; sl++) {
                const coolSlot = new THREE.Mesh(new THREE.BoxGeometry(0.052, 0.011, 0.024), darkReceiverMat);
                coolSlot.position.set(0, 0.005, -0.205 - sl * 0.042);
                group.add(coolSlot);
            }
        }
        const ventGap = new THREE.Mesh(new THREE.BoxGeometry(0.046, 0.008, 0.175), matteBlackMat);
        ventGap.position.set(0, 0.024, -0.265);
        const upperHg = new THREE.Mesh(new THREE.CylinderGeometry(0.0235, 0.0235, 0.165, 18), isAK ? woodMat : darkReceiverMat);
        upperHg.rotation.x = Math.PI / 2;
        upperHg.position.set(0, 0.036, -0.265);

        const ferruleRear = buildBeveledBox(0.052, 0.046, 0.012, matteBlackMat, 0.0015, 2);
        ferruleRear.position.set(0, 0.012, -0.168);
        const ferruleFront = buildBeveledBox(0.052, 0.044, 0.014, matteBlackMat, 0.0015, 2);
        ferruleFront.position.set(0, 0.010, -0.372);

        // Steel Gas Tube & Slanted Gas Block
        const gasTube = new THREE.Mesh(new THREE.CylinderGeometry(0.0115, 0.0115, 0.24, 14), gunMetal);
        gasTube.rotation.x = Math.PI / 2;
        gasTube.position.set(0, 0.039, -0.29);
        const gasBlock = buildBeveledBox(0.022, 0.036, 0.032, gunMetal, 0.002, 2);
        gasBlock.position.set(0, 0.027, -0.40);
        gasBlock.rotation.x = 0.35;

        // Rifle Barrel + Under-barrel Cleaning Rod + Triangular Front Sight Tower & Slant Brake w/ Bore Crown
        const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.011, 0.012, 0.43, 16), steelBarrelMat);
        barrel.rotation.x = Math.PI / 2;
        barrel.position.set(0, 0.014, -0.375);
        const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.0032, 0.0032, 0.36, 8), darkReceiverMat);
        rod.rotation.x = Math.PI / 2;
        rod.position.set(0, 0.001, -0.36);

        const frontSightTower = buildBeveledBox(0.014, 0.048, 0.024, matteBlackMat, 0.0018, 2);
        frontSightTower.position.set(0, 0.036, -0.53);
        const frontPostDot = new THREE.Mesh(new THREE.SphereGeometry(0.0025, 6, 6), tritiumGlowMat);
        frontPostDot.position.set(0, 0.058, -0.53);
        const slantBrake = new THREE.Mesh(new THREE.CylinderGeometry(0.013, 0.014, 0.036, 14), matteBlackMat);
        slantBrake.rotation.x = Math.PI / 2;
        slantBrake.position.set(0, 0.014, -0.585);
        addMuzzleCrown(group, 0, 0.014, -0.604, 0.0068);

        // Stock: Contoured Walnut on AK-47 vs Authentic Tubular Folding Skeleton Stock on Galil AR
        if (isAK) {
            group.add(buildContouredStock(woodMat, 0.038, false, 0.155));
        } else {
            const hinge = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.048, 12), darkReceiverMat);
            hinge.position.set(0, 0.012, 0.165);
            const topTube = new THREE.Mesh(new THREE.CylinderGeometry(0.0085, 0.0085, 0.22, 12), gunMetal);
            topTube.rotation.x = Math.PI / 2;
            topTube.position.set(0, 0.022, 0.27);
            const botStrut = new THREE.Mesh(new THREE.CylinderGeometry(0.0075, 0.0075, 0.23, 12), gunMetal);
            botStrut.rotation.x = Math.PI / 2 + 0.22;
            botStrut.position.set(0, -0.020, 0.27);
            const buttPad = buildBeveledBox(0.032, 0.095, 0.022, matteBlackMat, 0.0025, 2);
            buttPad.position.set(0, -0.012, 0.382);
            group.add(hinge, topTube, botStrut, buttPad);
        }
        const grip = buildErgonomicGrip(isAK ? woodMat : matteBlackMat, 0.095, -0.022);
        const bananaMag = buildCurvedMagazine(bakeliteMat, 0.030, 0.195, isAK ? 0.062 : 0.044, -0.068, -0.022);

        addTriggerAssembly(group, 0, -0.036, 0.05);
        group.add(
            receiver, dustCover, selectorBar, selectorPin, rearSightBlock, sightLeaf,
            lowerHg, ventGap, upperHg, ferruleRear, ferruleFront, gasTube, gasBlock, barrel, rod,
            frontSightTower, frontPostDot, slantBrake, grip, bananaMag
        );
        attachMuzzleEffects(group, -0.60);
        group.rotation.set(0.025, 0.115, 0);
        group.position.set(0.24, -0.19, -0.52);
        return group;
    }

    // --- 7B. BULLPUP RIFLES: FAMAS F1 & STEYR AUG A3 ---
    if (weaponId === 'famas' || weaponId === 'aug') {
        const isAug = weaponId === 'aug';
        const bodyMat = isAug ? polymerOliveMat : darkReceiverMat;

        const chassis = buildBeveledBox(0.052, 0.086, 0.48, bodyMat, 0.004, 3);
        chassis.position.set(0, 0.0, 0.04);
        const buttPad = buildBeveledBox(0.056, 0.096, 0.018, matteBlackMat, 0.003, 2);
        buttPad.position.set(0, -0.002, 0.284);
        addBoltAndChargingHandle(group, 0.024, -0.10, 0.052);

        const grip = buildErgonomicGrip(isAug ? polymerOliveMat : matteBlackMat, -0.02, -0.026);
        const rearMag = buildCurvedMagazine(bakeliteMat, 0.028, 0.165, 0.028, 0.16, -0.025);

        const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.011, 0.012, 0.36, 16), steelBarrelMat);
        barrel.rotation.x = Math.PI / 2;
        barrel.position.set(0, 0.018, -0.32);
        addMuzzleCrown(group, 0, 0.018, -0.502, 0.0066);

        if (isAug) {
            const foregrip = new THREE.Mesh(new THREE.CylinderGeometry(0.013, 0.012, 0.09, 12), polymerOliveMat);
            foregrip.position.set(0, -0.055, -0.22);
            foregrip.rotation.x = 0.15;
            addPicatinnyRail(group, 0.022, 0.22, 0, 0.046, -0.04, 'top', 14);
            group.add(foregrip);
            addScope(group, false, 0.054, -0.04);
        } else {
            // Sculpted Sloped French FAMAS Carry-Handle Arch Frame via ExtrudeGeometry
            const clarion = new THREE.Shape();
            clarion.moveTo(-0.18, 0.040);
            clarion.lineTo(-0.13, 0.092);
            clarion.lineTo(0.15, 0.092);
            clarion.lineTo(0.19, 0.040);
            clarion.closePath();
            const cHole = new THREE.Path();
            cHole.moveTo(-0.135, 0.046);
            cHole.lineTo(-0.105, 0.074);
            cHole.lineTo(0.125, 0.074);
            cHole.lineTo(0.150, 0.046);
            cHole.closePath();
            clarion.holes.push(cHole);
            const clarionGeo = normalizeExtrudeUVs(new THREE.ExtrudeGeometry(clarion, {
                depth: 0.038, bevelEnabled: true, bevelThickness: 0.0022, bevelSize: 0.002, bevelSegments: 2
            }));
            const clarionMesh = new THREE.Mesh(clarionGeo, gunMetal);
            clarionMesh.rotation.y = -Math.PI / 2;
            clarionMesh.position.set(0.019, 0, 0);
            group.add(clarionMesh);
        }

        addTriggerAssembly(group, 0, -0.042, -0.06);
        group.add(chassis, buttPad, grip, rearMag, barrel);
        attachMuzzleEffects(group, -0.52);
        group.rotation.set(0.025, 0.115, 0);
        group.position.set(0.24, -0.19, -0.52);
        return group;
    }

    // --- 7C. SNIPER RIFLES: SSG 08 SCOUT, AWP MAGNUM, SCAR-20 AUTO-SNIPER ---
    if (wep.category === 'sniper') {
        const isAwp = weaponId === 'awp';
        const isScar = weaponId === 'scar20';
        const bodyMat = isAwp ? polymerOliveMat : (isScar ? tanPolymerMat : gunMetal);

        const chassis = buildBeveledBox(0.054, 0.074, 0.44, bodyMat, 0.0038, 3);
        chassis.position.set(0, 0.008, -0.03);
        const upperReceiver = buildBeveledBox(0.046, 0.034, 0.32, isScar ? tanPolymerMat : darkReceiverMat, 0.003, 3);
        upperReceiver.position.set(0, 0.048, -0.01);
        addPicatinnyRail(group, 0.024, isScar ? 0.40 : 0.24, 0, 0.067, isScar ? -0.04 : -0.01, 'top', isScar ? 18 : 14);
        if (isScar) {
            addPicatinnyRail(group, 0.016, 0.18, -0.028, 0.024, -0.17, 'left', 10);
            addPicatinnyRail(group, 0.016, 0.18, 0.028, 0.024, -0.17, 'right', 10);
        }
        addBoltAndChargingHandle(group, 0.042, 0.02, 0.048);

        const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.013, 0.015, 0.58, 16), steelBarrelMat);
        barrel.rotation.x = Math.PI / 2;
        barrel.position.set(0, 0.026, -0.46);
        const muzzleBrake = buildBeveledBox(0.028, 0.024, 0.058, matteBlackMat, 0.0022, 2);
        muzzleBrake.position.set(0, 0.026, -0.76);
        const brakeSlotF = new THREE.Mesh(new THREE.BoxGeometry(0.030, 0.012, 0.014), darkReceiverMat);
        brakeSlotF.position.set(0, 0.026, -0.772);
        const brakeSlotR = brakeSlotF.clone();
        brakeSlotR.position.z = -0.746;
        addMuzzleCrown(group, 0, 0.026, -0.790, 0.0072);

        const mag = buildBeveledBox(0.034, isScar ? 0.125 : 0.085, 0.070, bakeliteMat, 0.0025, 2);
        mag.position.set(0, -0.065, -0.05);

        if (isAwp) {
            // Iconic Arctic Warfare Police Pierced Thumbhole Polymer Stock
            const awpStock = new THREE.Shape();
            awpStock.moveTo(0.16, 0.034);
            awpStock.lineTo(0.39, 0.032);
            awpStock.lineTo(0.39, -0.082);
            awpStock.lineTo(0.35, -0.084);
            awpStock.lineTo(0.19, -0.042);
            awpStock.lineTo(0.16, -0.022);
            awpStock.closePath();
            const awpHole = new THREE.Path();
            awpHole.moveTo(0.20, 0.008);
            awpHole.lineTo(0.285, 0.006);
            awpHole.lineTo(0.295, -0.036);
            awpHole.lineTo(0.205, -0.024);
            awpHole.closePath();
            awpStock.holes.push(awpHole);
            const awpGeo = normalizeExtrudeUVs(new THREE.ExtrudeGeometry(awpStock, {
                depth: 0.044, bevelEnabled: true, bevelThickness: 0.0035, bevelSize: 0.0032, bevelSegments: 3
            }));
            const awpMesh = new THREE.Mesh(awpGeo, polymerOliveMat);
            awpMesh.rotation.y = -Math.PI / 2;
            awpMesh.position.set(0.022, 0, 0);
            const awpPad = buildBeveledBox(0.048, 0.114, 0.018, matteBlackMat, 0.003, 2);
            awpPad.position.set(0, -0.025, 0.396);
            group.add(awpMesh, awpPad);
        } else {
            group.add(buildContouredStock(bodyMat, 0.042, true, 0.18));
        }
        const cheekPad = buildBeveledBox(0.046, 0.022, 0.14, matteBlackMat, 0.003, 2);
        cheekPad.position.set(0, 0.042, 0.28);

        const grip = buildErgonomicGrip(isAwp ? polymerOliveMat : matteBlackMat, 0.105, -0.024);

        addBipod(group, -0.28, -0.022);
        addScope(group, true, 0.074, -0.02);

        addTriggerAssembly(group, 0, -0.038, 0.06);
        group.add(chassis, upperReceiver, barrel, muzzleBrake, brakeSlotF, brakeSlotR, mag, cheekPad, grip);
        attachMuzzleEffects(group, -0.80);
        group.rotation.set(0.025, 0.115, 0);
        group.position.set(0.24, -0.19, -0.52);
        return group;
    }

    // --- 7D. M4A1-S, M4A4 & SG 553 KRIEG ---
    const isM4A1 = weaponId === 'm4a1';
    const isSG = weaponId === 'sg553';

    const receiver = buildBeveledBox(0.052, 0.074, 0.34, gunMetal, 0.0032, 3);
    const upperRound = new THREE.Mesh(new THREE.CylinderGeometry(0.0245, 0.0245, 0.33, 18), darkReceiverMat);
    upperRound.rotation.x = Math.PI / 2;
    upperRound.position.set(0, 0.037, 0);

    addBoltAndChargingHandle(group, 0.024, -0.03, 0.052);
    // AR Brass Deflector & Forward Assist Plunger on right side + Rear T-Charging Latch
    const deflector = buildBeveledBox(0.012, 0.022, 0.024, gunMetal, 0.0018, 2);
    deflector.position.set(0.030, 0.034, 0.015);
    const forwardAssist = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.007, 0.026, 10), matteBlackMat);
    forwardAssist.rotation.x = Math.PI / 2;
    forwardAssist.rotation.z = -0.35;
    forwardAssist.position.set(0.028, 0.026, 0.055);
    const tLatch = buildBeveledBox(0.028, 0.009, 0.014, darkReceiverMat, 0.0015, 2);
    tLatch.position.set(0, 0.054, 0.170);
    group.add(deflector, forwardAssist, tLatch);

    // Ribbed Handguard + Quad Rails on M4A4 + Rifle Barrel
    const handguard = isM4A1
        ? new THREE.Mesh(new THREE.CylinderGeometry(0.029, 0.029, 0.22, 18), darkReceiverMat)
        : buildBeveledBox(0.052, 0.056, 0.23, darkReceiverMat, 0.003, 2);
    if (isM4A1) handguard.rotation.x = Math.PI / 2;
    handguard.position.set(0, 0.018, -0.27);
    if (!isM4A1 && !isSG) {
        addPicatinnyRail(group, 0.022, 0.31, 0, 0.062, -0.01, 'top', 16);
        addPicatinnyRail(group, 0.020, 0.21, 0, 0.048, -0.27, 'top', 12);
        addPicatinnyRail(group, 0.018, 0.20, -0.028, 0.018, -0.27, 'left', 11);
        addPicatinnyRail(group, 0.018, 0.20, 0.028, 0.018, -0.27, 'right', 11);
        addPicatinnyRail(group, 0.018, 0.20, 0, -0.012, -0.27, 'bottom', 11);
    } else if (isSG) {
        addPicatinnyRail(group, 0.022, 0.28, 0, 0.062, -0.02, 'top', 14);
        for (let sl = 0; sl < 4; sl++) {
            const sgSlot = new THREE.Mesh(new THREE.BoxGeometry(0.054, 0.010, 0.026), matteBlackMat);
            sgSlot.position.set(0, 0.020, -0.20 - sl * 0.045);
            group.add(sgSlot);
        }
    }

    // Handguard Delta Ring & Barrel Nut
    const deltaRing = new THREE.Mesh(new THREE.CylinderGeometry(0.031, 0.031, 0.024, 16), matteBlackMat);
    deltaRing.rotation.x = Math.PI / 2;
    deltaRing.position.set(0, 0.018, -0.165);

    const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.011, 0.012, 0.38, 16), steelBarrelMat);
    barrel.rotation.x = Math.PI / 2;
    barrel.position.set(0, 0.018, -0.36);

    // Triangular A-Frame Front Sight Post (M4A1-S / M4A4)
    const frontAFrame = buildBeveledBox(0.012, 0.050, 0.026, matteBlackMat, 0.0018, 2);
    frontAFrame.position.set(0, 0.044, -0.41);

    if (isM4A1) {
        const chFront = buildBeveledBox(0.024, 0.026, 0.024, darkReceiverMat, 0.002, 2);
        chFront.position.set(0, 0.062, -0.09);
        const chRear = buildBeveledBox(0.024, 0.028, 0.028, darkReceiverMat, 0.002, 2);
        chRear.position.set(0, 0.062, 0.09);
        const chBar = buildBeveledBox(0.026, 0.016, 0.21, gunMetal, 0.0022, 2);
        chBar.position.set(0, 0.078, 0.0);
        const chDrum = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.014, 10), matteBlackMat);
        chDrum.rotation.x = Math.PI / 2;
        chDrum.position.set(0, 0.078, 0.11);

        const supp = new THREE.Mesh(new THREE.CylinderGeometry(0.020, 0.020, 0.22, 18), matteBlackMat);
        supp.rotation.x = Math.PI / 2;
        supp.position.set(0, 0.018, -0.56);
        const suppMount = new THREE.Mesh(new THREE.CylinderGeometry(0.0215, 0.0215, 0.024, 18), gunMetal);
        suppMount.rotation.x = Math.PI / 2;
        suppMount.position.set(0, 0.018, -0.465);
        addMuzzleCrown(group, 0, 0.018, -0.671, 0.0072);
        group.add(chFront, chRear, chBar, chDrum, supp, suppMount);
    } else if (isSG) {
        addScope(group, false, 0.066, -0.02);
        addMuzzleCrown(group, 0, 0.018, -0.551, 0.0068);
    } else {
        const rearFlip = buildBeveledBox(0.028, 0.024, 0.022, darkReceiverMat, 0.002, 2);
        rearFlip.position.set(0, 0.072, 0.11);
        const birdcage = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.042, 14), matteBlackMat);
        birdcage.rotation.x = Math.PI / 2;
        birdcage.position.set(0, 0.018, -0.555);
        for (let bSlot = 0; bSlot < 3; bSlot++) {
            const cRing = new THREE.Mesh(new THREE.TorusGeometry(0.0142, 0.0014, 6, 14), gunMetal);
            cRing.position.set(0, 0.018, -0.542 - bSlot * 0.011);
            group.add(cRing);
        }
        addMuzzleCrown(group, 0, 0.018, -0.577, 0.0068);
        group.add(rearFlip, birdcage);
    }

    // Seamless Curved 30-Round STANAG Magazine, Contoured Crane Buttstock & Ergonomic Pistol Grip
    const stanagMag = buildCurvedMagazine(bakeliteMat, 0.028, 0.175, 0.042, -0.062, -0.024);
    const bufferTube = new THREE.Mesh(new THREE.CylinderGeometry(0.017, 0.017, 0.18, 12), darkReceiverMat);
    bufferTube.rotation.x = Math.PI / 2;
    bufferTube.position.set(0, 0.020, 0.22);
    const stock = buildContouredStock(darkReceiverMat, 0.040, true, 0.17);
    const grip = buildErgonomicGrip(matteBlackMat, 0.105, -0.026);

    addTriggerAssembly(group, 0, -0.038, 0.06);
    group.add(receiver, upperRound, handguard, deltaRing, barrel, frontAFrame, stanagMag, bufferTube, stock, grip);
    attachMuzzleEffects(group, isM4A1 ? -0.68 : -0.56);
    group.rotation.set(0.025, 0.115, 0);
    group.position.set(0.24, -0.19, -0.52);
    return group;
}

function attachMuzzleEffects(group, zPos) {
    const flashGroup = new THREE.Group();

    // 1. Blinding incandescent white-hot inner cone
    const whiteCoreMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.95 });
    const core = new THREE.Mesh(new THREE.ConeGeometry(0.065, 0.22, 10), whiteCoreMat);
    core.rotation.x = -Math.PI / 2;

    // 2. High-energy fiery orange 4-petal expansion star
    const flameMat = new THREE.MeshBasicMaterial({ color: 0xf97316, transparent: true, opacity: 0.85 });
    const star1 = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.022, 0.02), flameMat);
    const star2 = new THREE.Mesh(new THREE.BoxGeometry(0.022, 0.24, 0.02), flameMat);

    // 3. 45-degree diagonal golden yellow flash fins
    const yellowMat = new THREE.MeshBasicMaterial({ color: 0xfde047, transparent: true, opacity: 0.75 });
    const diag1 = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.016, 0.02), yellowMat);
    diag1.rotation.z = Math.PI / 4;
    const diag2 = new THREE.Mesh(new THREE.BoxGeometry(0.016, 0.18, 0.02), yellowMat);
    diag2.rotation.z = Math.PI / 4;

    // 4. Outer gaseous halo ring
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xea580c, transparent: true, opacity: 0.45, side: THREE.DoubleSide });
    const halo = new THREE.Mesh(new THREE.RingGeometry(0.05, 0.14, 12), ringMat);

    flashGroup.add(core, star1, star2, diag1, diag2, halo);

    flashGroup.position.set(0, 0.02, zPos);
    flashGroup.visible = false;
    flashGroup.name = 'muzzleFlash';
    group.add(flashGroup);
}

window.WEAPON_CATEGORIES = WEAPON_CATEGORIES;
window.WEAPONS = WEAPONS;
window.createWeaponViewModel = createWeaponViewModel;
window.attachMuzzleEffects = attachMuzzleEffects;
