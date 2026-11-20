// Procedural Web Audio Synthesizer for Counter-Strike Web/Mobile (Per-Weapon Ballistic Acoustics)

const WEAPON_SOUND_PROFILES = {
    // --- Pistols ---
    pistol: { // USP-S Silenced
        suppressed: true,
        crackGain: 0.22, crackFreq: 1900,
        blastDur: 0.095, blastStartFreq: 1650, blastEndFreq: 240, blastGain: 0.58,
        midResFreq: 820, midResQ: 2.2, midResGain: 5,
        subStartFreq: 145, subEndFreq: 48, subDur: 0.055, subGain: 0.42,
        mechDelay: 0.012, mechFreq: 3400, mechQ: 5.5, mechDur: 0.032, mechGain: 0.34,
        tailDur: 0.14, tailFreq: 750, tailGain: 0.10, echoDelay: 0
    },
    glock: { // Glock-18 9mm Polymer
        crackGain: 0.72, crackFreq: 2600,
        blastDur: 0.14, blastStartFreq: 3200, blastEndFreq: 320, blastGain: 0.74,
        midResFreq: 1150, midResQ: 1.8, midResGain: 5,
        subStartFreq: 165, subEndFreq: 48, subDur: 0.065, subGain: 0.52,
        mechDelay: 0.018, mechFreq: 3100, mechQ: 4.8, mechDur: 0.035, mechGain: 0.24,
        tailDur: 0.24, tailFreq: 1100, tailGain: 0.20, echoDelay: 0.055
    },
    p250: { // SIG P250 Compact
        crackGain: 0.80, crackFreq: 2450,
        blastDur: 0.16, blastStartFreq: 2900, blastEndFreq: 270, blastGain: 0.82,
        midResFreq: 980, midResQ: 2.0, midResGain: 6,
        subStartFreq: 155, subEndFreq: 44, subDur: 0.075, subGain: 0.62,
        mechDelay: 0.020, mechFreq: 2900, mechQ: 5.0, mechDur: 0.038, mechGain: 0.24,
        tailDur: 0.28, tailFreq: 1050, tailGain: 0.22, echoDelay: 0.06
    },
    dualelites: { // Dual Berettas 9mm
        crackGain: 0.78, crackFreq: 2850,
        blastDur: 0.15, blastStartFreq: 3500, blastEndFreq: 340, blastGain: 0.76,
        midResFreq: 1280, midResQ: 2.1, midResGain: 6,
        subStartFreq: 175, subEndFreq: 52, subDur: 0.065, subGain: 0.50,
        mechDelay: 0.016, mechFreq: 3550, mechQ: 5.5, mechDur: 0.034, mechGain: 0.28,
        tailDur: 0.25, tailFreq: 1200, tailGain: 0.20, echoDelay: 0.055
    },
    fiveseven: { // FN Five-SeveN 5.7mm High-Velocity
        crackGain: 0.94, crackFreq: 3300,
        blastDur: 0.15, blastStartFreq: 3900, blastEndFreq: 360, blastGain: 0.78,
        midResFreq: 1520, midResQ: 2.3, midResGain: 7,
        subStartFreq: 185, subEndFreq: 54, subDur: 0.060, subGain: 0.48,
        mechDelay: 0.018, mechFreq: 3750, mechQ: 5.2, mechDur: 0.032, mechGain: 0.25,
        tailDur: 0.26, tailFreq: 1350, tailGain: 0.22, echoDelay: 0.06
    },
    revolver: { // R8 .357 Magnum Revolver
        crackGain: 1.05, crackFreq: 2150,
        blastDur: 0.30, blastStartFreq: 2450, blastEndFreq: 170, blastGain: 0.98,
        midResFreq: 760, midResQ: 2.2, midResGain: 8,
        subStartFreq: 132, subEndFreq: 34, subDur: 0.115, subGain: 0.85,
        mechDelay: 0.015, mechFreq: 3900, mechQ: 6.5, mechDur: 0.028, mechGain: 0.24,
        tailDur: 0.46, tailFreq: 1150, tailGain: 0.36, echoDelay: 0.075
    },
    deagle: { // Desert Eagle .50 AE Hand Cannon
        crackGain: 1.22, crackFreq: 2050,
        blastDur: 0.34, blastStartFreq: 2600, blastEndFreq: 150, blastGain: 1.08,
        midResFreq: 680, midResQ: 2.4, midResGain: 9,
        subStartFreq: 122, subEndFreq: 30, subDur: 0.135, subGain: 0.96,
        mechDelay: 0.026, mechFreq: 2600, mechQ: 4.5, mechDur: 0.052, mechGain: 0.32,
        tailDur: 0.54, tailFreq: 1250, tailGain: 0.44, echoDelay: 0.08
    },

    // --- Shotguns (12-Gauge) ---
    nova: {
        crackGain: 0.95, crackFreq: 1750,
        blastDur: 0.36, blastStartFreq: 1950, blastEndFreq: 125, blastGain: 1.08,
        midResFreq: 480, midResQ: 1.8, midResGain: 8,
        subStartFreq: 108, subEndFreq: 28, subDur: 0.155, subGain: 0.98,
        mechDelay: 0.022, mechFreq: 2100, mechQ: 4.0, mechDur: 0.048, mechGain: 0.22,
        tailDur: 0.50, tailFreq: 980, tailGain: 0.40, echoDelay: 0.07,
        actionFollowUp: 'pump'
    },
    sawedoff: {
        crackGain: 1.12, crackFreq: 1550,
        blastDur: 0.40, blastStartFreq: 2250, blastEndFreq: 110, blastGain: 1.15,
        midResFreq: 410, midResQ: 1.6, midResGain: 9,
        subStartFreq: 98, subEndFreq: 26, subDur: 0.175, subGain: 1.05,
        mechDelay: 0.024, mechFreq: 1950, mechQ: 3.8, mechDur: 0.050, mechGain: 0.24,
        tailDur: 0.56, tailFreq: 920, tailGain: 0.45, echoDelay: 0.075,
        actionFollowUp: 'pump'
    },
    mag7: {
        crackGain: 1.00, crackFreq: 1900,
        blastDur: 0.32, blastStartFreq: 2150, blastEndFreq: 140, blastGain: 1.04,
        midResFreq: 560, midResQ: 2.1, midResGain: 8,
        subStartFreq: 116, subEndFreq: 30, subDur: 0.140, subGain: 0.92,
        mechDelay: 0.020, mechFreq: 2450, mechQ: 4.5, mechDur: 0.042, mechGain: 0.26,
        tailDur: 0.44, tailFreq: 1050, tailGain: 0.36, echoDelay: 0.065
    },
    shotgun: { // XM1014 Auto Shotgun
        crackGain: 0.92, crackFreq: 1850,
        blastDur: 0.28, blastStartFreq: 2050, blastEndFreq: 145, blastGain: 1.00,
        midResFreq: 520, midResQ: 1.9, midResGain: 7,
        subStartFreq: 118, subEndFreq: 32, subDur: 0.125, subGain: 0.88,
        mechDelay: 0.018, mechFreq: 2300, mechQ: 4.4, mechDur: 0.040, mechGain: 0.24,
        tailDur: 0.38, tailFreq: 1000, tailGain: 0.32, echoDelay: 0.06
    },
    spas12: {
        crackGain: 1.04, crackFreq: 1800,
        blastDur: 0.35, blastStartFreq: 2100, blastEndFreq: 130, blastGain: 1.10,
        midResFreq: 490, midResQ: 2.0, midResGain: 8,
        subStartFreq: 106, subEndFreq: 28, subDur: 0.150, subGain: 0.96,
        mechDelay: 0.020, mechFreq: 2550, mechQ: 4.6, mechDur: 0.044, mechGain: 0.26,
        tailDur: 0.48, tailFreq: 1020, tailGain: 0.38, echoDelay: 0.07
    },

    // --- SMGs ---
    mac10: { // Fast open-bolt SMG
        crackGain: 0.68, crackFreq: 2700,
        blastDur: 0.11, blastStartFreq: 3100, blastEndFreq: 360, blastGain: 0.66,
        midResFreq: 1320, midResQ: 1.9, midResGain: 5,
        subStartFreq: 170, subEndFreq: 55, subDur: 0.050, subGain: 0.44,
        mechDelay: 0.010, mechFreq: 3800, mechQ: 6.0, mechDur: 0.024, mechGain: 0.26,
        tailDur: 0.18, tailFreq: 1200, tailGain: 0.15, echoDelay: 0
    },
    mp9: {
        crackGain: 0.72, crackFreq: 2950,
        blastDur: 0.10, blastStartFreq: 3400, blastEndFreq: 390, blastGain: 0.64,
        midResFreq: 1460, midResQ: 2.0, midResGain: 5,
        subStartFreq: 180, subEndFreq: 58, subDur: 0.045, subGain: 0.40,
        mechDelay: 0.010, mechFreq: 3450, mechQ: 5.5, mechDur: 0.022, mechGain: 0.22,
        tailDur: 0.17, tailFreq: 1250, tailGain: 0.14, echoDelay: 0
    },
    ump45: { // Heavy .45 ACP SMG
        crackGain: 0.72, crackFreq: 2050,
        blastDur: 0.16, blastStartFreq: 2300, blastEndFreq: 220, blastGain: 0.80,
        midResFreq: 760, midResQ: 2.2, midResGain: 7,
        subStartFreq: 140, subEndFreq: 42, subDur: 0.080, subGain: 0.66,
        mechDelay: 0.016, mechFreq: 2450, mechQ: 4.5, mechDur: 0.032, mechGain: 0.24,
        tailDur: 0.26, tailFreq: 950, tailGain: 0.22, echoDelay: 0.045
    },
    bizon: {
        crackGain: 0.65, crackFreq: 2600,
        blastDur: 0.12, blastStartFreq: 2850, blastEndFreq: 310, blastGain: 0.68,
        midResFreq: 1180, midResQ: 1.8, midResGain: 5,
        subStartFreq: 162, subEndFreq: 50, subDur: 0.055, subGain: 0.46,
        mechDelay: 0.012, mechFreq: 3250, mechQ: 5.0, mechDur: 0.026, mechGain: 0.22,
        tailDur: 0.20, tailFreq: 1100, tailGain: 0.16, echoDelay: 0
    },
    mp5: { // MP5-SD Integrally Suppressed
        suppressed: true,
        crackGain: 0.18, crackFreq: 1750,
        blastDur: 0.085, blastStartFreq: 1450, blastEndFreq: 210, blastGain: 0.54,
        midResFreq: 690, midResQ: 2.3, midResGain: 5,
        subStartFreq: 138, subEndFreq: 46, subDur: 0.050, subGain: 0.40,
        mechDelay: 0.010, mechFreq: 3150, mechQ: 5.5, mechDur: 0.025, mechGain: 0.30,
        tailDur: 0.12, tailFreq: 680, tailGain: 0.09, echoDelay: 0
    },
    p90: { // 5.7mm High-Velocity Bullpup SMG
        crackGain: 0.84, crackFreq: 3150,
        blastDur: 0.12, blastStartFreq: 3700, blastEndFreq: 340, blastGain: 0.72,
        midResFreq: 1420, midResQ: 2.1, midResGain: 6,
        subStartFreq: 168, subEndFreq: 50, subDur: 0.055, subGain: 0.48,
        mechDelay: 0.011, mechFreq: 3600, mechQ: 5.2, mechDur: 0.024, mechGain: 0.22,
        tailDur: 0.22, tailFreq: 1300, tailGain: 0.18, echoDelay: 0
    },

    // --- Assault Rifles ---
    ak47: { // Heavy 7.62x39mm Kalashnikov
        crackGain: 1.08, crackFreq: 2100,
        blastDur: 0.26, blastStartFreq: 2650, blastEndFreq: 165, blastGain: 0.98,
        midResFreq: 680, midResQ: 2.1, midResGain: 8,
        subStartFreq: 132, subEndFreq: 34, subDur: 0.105, subGain: 0.84,
        mechDelay: 0.018, mechFreq: 2850, mechQ: 5.0, mechDur: 0.042, mechGain: 0.30,
        tailDur: 0.40, tailFreq: 1150, tailGain: 0.32, echoDelay: 0.065
    },
    galil: { // 5.56mm Raw Metallic AR
        crackGain: 0.96, crackFreq: 2450,
        blastDur: 0.21, blastStartFreq: 2950, blastEndFreq: 210, blastGain: 0.88,
        midResFreq: 960, midResQ: 2.0, midResGain: 7,
        subStartFreq: 148, subEndFreq: 40, subDur: 0.085, subGain: 0.68,
        mechDelay: 0.016, mechFreq: 3150, mechQ: 5.2, mechDur: 0.036, mechGain: 0.26,
        tailDur: 0.34, tailFreq: 1200, tailGain: 0.26, echoDelay: 0.055
    },
    sg553: { // Punchy Swiss Rifle
        crackGain: 0.98, crackFreq: 2350,
        blastDur: 0.22, blastStartFreq: 2800, blastEndFreq: 195, blastGain: 0.90,
        midResFreq: 860, midResQ: 2.1, midResGain: 7,
        subStartFreq: 142, subEndFreq: 38, subDur: 0.090, subGain: 0.72,
        mechDelay: 0.016, mechFreq: 3000, mechQ: 5.0, mechDur: 0.036, mechGain: 0.25,
        tailDur: 0.36, tailFreq: 1180, tailGain: 0.28, echoDelay: 0.06
    },
    m4a4: { // Unsuppressed 5.56mm NATO Carbine
        crackGain: 1.00, crackFreq: 2650,
        blastDur: 0.20, blastStartFreq: 3300, blastEndFreq: 230, blastGain: 0.86,
        midResFreq: 1080, midResQ: 2.2, midResGain: 7,
        subStartFreq: 152, subEndFreq: 42, subDur: 0.080, subGain: 0.66,
        mechDelay: 0.015, mechFreq: 3250, mechQ: 5.4, mechDur: 0.035, mechGain: 0.26,
        tailDur: 0.34, tailFreq: 1280, tailGain: 0.28, echoDelay: 0.055,
        actionFollowUp: 'spring'
    },
    m4a1: { // M4A1-S Silenced Carbine
        suppressed: true,
        crackGain: 0.28, crackFreq: 2150,
        blastDur: 0.11, blastStartFreq: 1750, blastEndFreq: 220, blastGain: 0.62,
        midResFreq: 840, midResQ: 2.4, midResGain: 6,
        subStartFreq: 146, subEndFreq: 44, subDur: 0.062, subGain: 0.48,
        mechDelay: 0.012, mechFreq: 3500, mechQ: 5.8, mechDur: 0.030, mechGain: 0.34,
        tailDur: 0.15, tailFreq: 820, tailGain: 0.12, echoDelay: 0,
        actionFollowUp: 'spring'
    },
    famas: { // French 5.56mm Bullpup
        crackGain: 0.94, crackFreq: 2800,
        blastDur: 0.18, blastStartFreq: 3450, blastEndFreq: 250, blastGain: 0.82,
        midResFreq: 1180, midResQ: 2.1, midResGain: 6,
        subStartFreq: 158, subEndFreq: 44, subDur: 0.072, subGain: 0.60,
        mechDelay: 0.014, mechFreq: 3400, mechQ: 5.4, mechDur: 0.030, mechGain: 0.25,
        tailDur: 0.30, tailFreq: 1320, tailGain: 0.24, echoDelay: 0.05
    },
    aug: { // Steyr AUG Bullpup
        crackGain: 0.96, crackFreq: 2550,
        blastDur: 0.20, blastStartFreq: 3100, blastEndFreq: 220, blastGain: 0.85,
        midResFreq: 1020, midResQ: 2.2, midResGain: 7,
        subStartFreq: 148, subEndFreq: 40, subDur: 0.080, subGain: 0.64,
        mechDelay: 0.015, mechFreq: 3100, mechQ: 5.0, mechDur: 0.034, mechGain: 0.26,
        tailDur: 0.33, tailFreq: 1220, tailGain: 0.26, echoDelay: 0.055
    },

    // --- Machine Guns ---
    negev: { // Fast Belt-Fed LMG
        crackGain: 0.98, crackFreq: 2500,
        blastDur: 0.20, blastStartFreq: 2950, blastEndFreq: 200, blastGain: 0.88,
        midResFreq: 920, midResQ: 2.0, midResGain: 7,
        subStartFreq: 142, subEndFreq: 38, subDur: 0.082, subGain: 0.70,
        mechDelay: 0.010, mechFreq: 3750, mechQ: 6.2, mechDur: 0.028, mechGain: 0.30,
        tailDur: 0.32, tailFreq: 1200, tailGain: 0.24, echoDelay: 0.045,
        actionFollowUp: 'belt'
    },
    m249: { // Heavy SAW LMG
        crackGain: 1.02, crackFreq: 2350,
        blastDur: 0.24, blastStartFreq: 2800, blastEndFreq: 185, blastGain: 0.94,
        midResFreq: 820, midResQ: 2.1, midResGain: 7,
        subStartFreq: 136, subEndFreq: 35, subDur: 0.095, subGain: 0.76,
        mechDelay: 0.012, mechFreq: 3500, mechQ: 5.8, mechDur: 0.034, mechGain: 0.32,
        tailDur: 0.38, tailFreq: 1180, tailGain: 0.28, echoDelay: 0.055,
        actionFollowUp: 'belt'
    },

    // --- Snipers ---
    ssg08: { // 7.62mm Bolt-Action Scout
        crackGain: 1.18, crackFreq: 2400,
        blastDur: 0.34, blastStartFreq: 2900, blastEndFreq: 165, blastGain: 1.00,
        midResFreq: 880, midResQ: 2.2, midResGain: 8,
        subStartFreq: 128, subEndFreq: 32, subDur: 0.130, subGain: 0.86,
        mechDelay: 0.020, mechFreq: 2950, mechQ: 5.0, mechDur: 0.042, mechGain: 0.24,
        tailDur: 0.58, tailFreq: 1300, tailGain: 0.44, echoDelay: 0.085,
        actionFollowUp: 'bolt_light'
    },
    awp: { // .338 Lapua Magnum Thunder Cannon
        crackGain: 1.38, crackFreq: 1950,
        blastDur: 0.56, blastStartFreq: 2550, blastEndFreq: 110, blastGain: 1.24,
        midResFreq: 540, midResQ: 2.3, midResGain: 10,
        subStartFreq: 96, subEndFreq: 24, subDur: 0.220, subGain: 1.12,
        mechDelay: 0.025, mechFreq: 2400, mechQ: 4.5, mechDur: 0.055, mechGain: 0.26,
        tailDur: 0.92, tailFreq: 1350, tailGain: 0.62, echoDelay: 0.10,
        actionFollowUp: 'bolt_heavy'
    },
    scar20: { // 7.62mm Auto-Sniper DMR
        crackGain: 1.14, crackFreq: 2200,
        blastDur: 0.32, blastStartFreq: 2700, blastEndFreq: 160, blastGain: 1.02,
        midResFreq: 740, midResQ: 2.2, midResGain: 8,
        subStartFreq: 120, subEndFreq: 30, subDur: 0.135, subGain: 0.88,
        mechDelay: 0.018, mechFreq: 2800, mechQ: 5.0, mechDur: 0.042, mechGain: 0.28,
        tailDur: 0.50, tailFreq: 1250, tailGain: 0.38, echoDelay: 0.075
    }
};

class SoundSystem {
    constructor() {
        this.ctx = null;
        this.enabled = true;
        this.masterGain = null;
        this.compressor = null;
        this.satCurve = null;
        this.whiteNoiseBuf = null;
        this.pinkNoiseBuf = null;
        this.crackNoiseBuf = null;
        this.lastHeartbeat = 0;
    }

    init() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) {
                this.ctx = new AudioCtx();
                this.masterGain = this.ctx.createGain();
                this.masterGain.gain.value = 0.68;

                this.compressor = this.ctx.createDynamicsCompressor();
                this.compressor.threshold.setValueAtTime(-12, this.ctx.currentTime);
                this.compressor.knee.setValueAtTime(14, this.ctx.currentTime);
                this.compressor.ratio.setValueAtTime(6, this.ctx.currentTime);
                this.compressor.attack.setValueAtTime(0.002, this.ctx.currentTime);
                this.compressor.release.setValueAtTime(0.12, this.ctx.currentTime);

                this.masterGain.connect(this.compressor);
                this.compressor.connect(this.ctx.destination);

                this.initNoiseBuffers();
                this.satCurve = this.createSaturationCurve(3.4);
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    initNoiseBuffers() {
        const sr = this.ctx.sampleRate;
        const len = Math.floor(sr * 1.5);

        // 1. White noise buffer
        const wBuf = this.ctx.createBuffer(1, len, sr);
        const wData = wBuf.getChannelData(0);
        for (let i = 0; i < len; i++) {
            wData[i] = Math.random() * 2 - 1;
        }
        this.whiteNoiseBuf = wBuf;

        // 2. Warm Pink noise buffer (-3 dB/oct natural ballistic acoustic slope)
        const pBuf = this.ctx.createBuffer(1, len, sr);
        const pData = pBuf.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < len; i++) {
            const white = Math.random() * 2 - 1;
            b0 = 0.99886 * b0 + white * 0.0555179;
            b1 = 0.99332 * b1 + white * 0.0750759;
            b2 = 0.96900 * b2 + white * 0.1538520;
            b3 = 0.86650 * b3 + white * 0.3104856;
            b4 = 0.55000 * b4 + white * 0.5329522;
            b5 = -0.7616 * b5 - white * 0.0168980;
            pData[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.14;
            b6 = white * 0.115926;
        }
        this.pinkNoiseBuf = pBuf;

        // 3. Sharp granular propellant crackle buffer
        const cLen = Math.floor(sr * 0.5);
        const cBuf = this.ctx.createBuffer(1, cLen, sr);
        const cData = cBuf.getChannelData(0);
        for (let i = 0; i < cLen; i++) {
            const n = Math.random() * 2 - 1;
            cData[i] = Math.random() < 0.28 ? Math.sign(n) * Math.pow(Math.abs(n), 0.4) : n * 0.35;
        }
        this.crackNoiseBuf = cBuf;
    }

    createSaturationCurve(drive = 3.2) {
        const n = 1024;
        const curve = new Float32Array(n);
        for (let i = 0; i < n; i++) {
            const x = (i * 2) / n - 1;
            // Slightly asymmetric soft clipping mimics real acoustic pressure waves
            curve[i] = Math.tanh(x * drive + 0.08 * x * x);
        }
        return curve;
    }

    createNoiseBuffer(duration = 0.3) {
        const bufferSize = Math.max(1, Math.floor(this.ctx.sampleRate * duration));
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        return buffer;
    }

    playNoiseBurst(buf, startTime, duration, filterType, freqStart, freqEnd, gainPeak, qVal = 1.0) {
        const src = this.ctx.createBufferSource();
        src.buffer = buf;
        const maxOffset = Math.max(0, buf.duration - duration - 0.02);
        const offset = maxOffset > 0 ? Math.random() * maxOffset : 0;

        const filter = this.ctx.createBiquadFilter();
        filter.type = filterType;
        filter.Q.setValueAtTime(qVal, startTime);
        filter.frequency.setValueAtTime(Math.max(40, freqStart), startTime);
        if (freqEnd && freqEnd !== freqStart) {
            filter.frequency.exponentialRampToValueAtTime(Math.max(40, freqEnd), startTime + duration);
        }

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(Math.max(0.001, gainPeak), startTime);
        gain.gain.exponentialRampToValueAtTime(0.0008, startTime + duration);

        src.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);
        const safeDur = Math.min(duration + 0.01, Math.max(0.01, buf.duration - offset));
        src.start(startTime, offset, safeDur);
    }

    playWeaponActionFollowUp(actionType, now, vol) {
        if (actionType === 'pump') {
            // Signature 12-gauge pump-action rack ("chk-chk")
            this.playNoiseBurst(this.whiteNoiseBuf, now + 0.25, 0.048, 'bandpass', 3600, 2400, 0.24 * vol, 4.2);
            this.playNoiseBurst(this.whiteNoiseBuf, now + 0.36, 0.052, 'bandpass', 4100, 2700, 0.28 * vol, 4.8);
        } else if (actionType === 'bolt_heavy') {
            // AWP Magnum bolt handle lift, pull-back zip, and lock forward
            this.playNoiseBurst(this.whiteNoiseBuf, now + 0.36, 0.036, 'bandpass', 3300, 2200, 0.22 * vol, 5.2);
            this.playNoiseBurst(this.pinkNoiseBuf, now + 0.44, 0.070, 'bandpass', 2500, 3800, 0.20 * vol, 3.8);
            this.playNoiseBurst(this.whiteNoiseBuf, now + 0.56, 0.042, 'bandpass', 3600, 2000, 0.26 * vol, 5.5);
        } else if (actionType === 'bolt_light') {
            // SSG 08 fast scout bolt cycle
            this.playNoiseBurst(this.whiteNoiseBuf, now + 0.28, 0.032, 'bandpass', 3800, 2600, 0.18 * vol, 5.0);
            this.playNoiseBurst(this.whiteNoiseBuf, now + 0.39, 0.036, 'bandpass', 4100, 2500, 0.20 * vol, 5.2);
        } else if (actionType === 'spring') {
            // AR-15 / M4 buffer-tube spring subtle metallic resonance
            const spr = this.ctx.createOscillator();
            spr.type = 'sine';
            spr.frequency.setValueAtTime(1480, now + 0.025);
            spr.frequency.exponentialRampToValueAtTime(1120, now + 0.085);
            const sGain = this.ctx.createGain();
            sGain.gain.setValueAtTime(0.055 * vol, now + 0.025);
            sGain.gain.exponentialRampToValueAtTime(0.0008, now + 0.088);
            spr.connect(sGain);
            sGain.connect(this.masterGain);
            spr.start(now + 0.025);
            spr.stop(now + 0.095);
        } else if (actionType === 'belt') {
            // Metallic ammo-belt feed link rattle
            this.playNoiseBurst(this.whiteNoiseBuf, now + 0.015, 0.024, 'bandpass', 5200, 4200, 0.18 * vol, 6.5);
        }
    }

    playShoot(weaponId, volumeScale = 1.0) {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const vol = Math.min(1.0, Math.max(0.05, volumeScale));

        if (weaponId === 'knife' || weaponId === 'knife_slash' || weaponId === 'knife_stab') {
            if (weaponId === 'knife_stab') {
                // Katana 3rd hit: sharp forward lunging thrust + piercing sub-thump
                const noise = this.ctx.createBufferSource();
                noise.buffer = this.createNoiseBuffer(0.18);
                const bp = this.ctx.createBiquadFilter();
                bp.type = 'bandpass';
                bp.frequency.setValueAtTime(2400, now);
                bp.frequency.exponentialRampToValueAtTime(520, now + 0.17);

                const gain = this.ctx.createGain();
                gain.gain.setValueAtTime(0.48 * vol, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.17);
                noise.connect(bp);
                bp.connect(gain);
                gain.connect(this.masterGain);
                noise.start(now);

                const osc = this.ctx.createOscillator();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(340, now);
                osc.frequency.exponentialRampToValueAtTime(90, now + 0.14);
                const oGain = this.ctx.createGain();
                oGain.gain.setValueAtTime(0.32 * vol, now);
                oGain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
                osc.connect(oGain);
                oGain.connect(this.masterGain);
                osc.start(now);
                osc.stop(now + 0.15);
                return;
            }

            // Katana slashes (Hit 1 & Hit 2): fast air whoosh + crisp metallic blade ring
            const noise = this.ctx.createBufferSource();
            noise.buffer = this.createNoiseBuffer(0.15);
            const filter = this.ctx.createBiquadFilter();
            filter.type = 'bandpass';
            filter.frequency.setValueAtTime(1900, now);
            filter.frequency.exponentialRampToValueAtTime(480, now + 0.14);

            const gain = this.ctx.createGain();
            gain.gain.setValueAtTime(0.42 * vol, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
            noise.connect(filter);
            filter.connect(gain);
            gain.connect(this.masterGain);
            noise.start(now);

            const shing = this.ctx.createOscillator();
            shing.type = 'sine';
            shing.frequency.setValueAtTime(3100, now);
            shing.frequency.exponentialRampToValueAtTime(1650, now + 0.12);
            const sGain = this.ctx.createGain();
            sGain.gain.setValueAtTime(0.11 * vol, now);
            sGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
            shing.connect(sGain);
            sGain.connect(this.masterGain);
            shing.start(now);
            shing.stop(now + 0.13);
            return;
        }

        const prof = WEAPON_SOUND_PROFILES[weaponId] || WEAPON_SOUND_PROFILES.ak47;
        // Subtle pitch micro-jitter (+-4%) prevents machine-gun robotic repetition
        const pitchVar = 0.96 + Math.random() * 0.08;
        // Distant gunshots (bots / remote players with low vol) roll off ultra-high transients naturally
        const distAirScale = vol < 0.7 ? (0.55 + vol * 0.65) : 1.0;

        // Layer 1: Supersonic Propellant Transient Crack (0 - 28ms)
        this.playNoiseBurst(
            this.crackNoiseBuf,
            now,
            prof.suppressed ? 0.018 : 0.028,
            prof.suppressed ? 'bandpass' : 'highpass',
            prof.crackFreq * pitchVar * distAirScale,
            prof.suppressed ? prof.crackFreq * 0.65 : prof.crackFreq * 0.85 * distAirScale,
            prof.crackGain * vol * distAirScale,
            prof.suppressed ? 1.8 : 0.9
        );

        // Layer 2: Saturated Combustion Blast Body + Bore Resonance Filter
        const blastSrc = this.ctx.createBufferSource();
        blastSrc.buffer = this.pinkNoiseBuf;
        const maxOff = Math.max(0, this.pinkNoiseBuf.duration - prof.blastDur - 0.02);
        const blastOff = maxOff > 0 ? Math.random() * maxOff : 0;

        const shaper = this.ctx.createWaveShaper();
        shaper.curve = this.satCurve;
        shaper.oversample = 'none';

        const peak = this.ctx.createBiquadFilter();
        peak.type = 'peaking';
        peak.frequency.setValueAtTime(prof.midResFreq * pitchVar, now);
        peak.Q.setValueAtTime(prof.midResQ, now);
        peak.gain.setValueAtTime(prof.midResGain, now);

        const lp = this.ctx.createBiquadFilter();
        lp.type = 'lowpass';
        lp.frequency.setValueAtTime(prof.blastStartFreq * pitchVar * distAirScale, now);
        lp.frequency.exponentialRampToValueAtTime(Math.max(70, prof.blastEndFreq), now + prof.blastDur);

        const blastGain = this.ctx.createGain();
        blastGain.gain.setValueAtTime(Math.max(0.001, prof.blastGain * vol), now);
        blastGain.gain.exponentialRampToValueAtTime(0.0008, now + prof.blastDur);

        blastSrc.connect(shaper);
        shaper.connect(peak);
        peak.connect(lp);
        lp.connect(blastGain);
        blastGain.connect(this.masterGain);
        blastSrc.start(now, blastOff, prof.blastDur + 0.01);

        // Layer 3: Damped Low-End Chest Kick (clean sine impulse tucked inside blast)
        const sub = this.ctx.createOscillator();
        sub.type = 'sine';
        sub.frequency.setValueAtTime(prof.subStartFreq * pitchVar, now);
        sub.frequency.exponentialRampToValueAtTime(Math.max(22, prof.subEndFreq), now + prof.subDur);
        const subGain = this.ctx.createGain();
        subGain.gain.setValueAtTime(Math.max(0.001, prof.subGain * vol), now);
        subGain.gain.exponentialRampToValueAtTime(0.0008, now + prof.subDur);
        sub.connect(subGain);
        subGain.connect(this.masterGain);
        sub.start(now);
        sub.stop(now + prof.subDur + 0.01);

        // Layer 4: Authentic Metallic Bolt / Slide Cycling (only audible near shooter)
        if (vol >= 0.55) {
            this.playNoiseBurst(
                this.whiteNoiseBuf,
                now + prof.mechDelay,
                prof.mechDur,
                'bandpass',
                prof.mechFreq * pitchVar,
                prof.mechFreq * 0.72 * pitchVar,
                prof.mechGain * vol,
                prof.mechQ
            );
        }

        // Layer 5: Environmental Urban / Outdoor Tail & Slapback Reflection
        if (prof.tailDur > 0.10) {
            this.playNoiseBurst(
                this.pinkNoiseBuf,
                now + 0.02,
                prof.tailDur,
                'lowpass',
                prof.tailFreq * distAirScale,
                140,
                prof.tailGain * vol,
                0.7
            );
            if (prof.echoDelay > 0 && !prof.suppressed) {
                this.playNoiseBurst(
                    this.pinkNoiseBuf,
                    now + prof.echoDelay,
                    prof.tailDur * 0.65,
                    'bandpass',
                    prof.tailFreq * 0.72,
                    220,
                    prof.tailGain * 0.48 * vol,
                    1.1
                );
            }
        }

        // Layer 6: Weapon-Specific Action Follow-up (Pump Rack / Sniper Bolt / M4 Spring / Belt Feed)
        if (prof.actionFollowUp && vol >= 0.72) {
            this.playWeaponActionFollowUp(prof.actionFollowUp, now, vol);
        }
    }

    playImpactFlesh(isHeadshot = false) {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;

        // Flesh squelch / biological bullet thud
        const noise = this.ctx.createBufferSource();
        noise.buffer = this.createNoiseBuffer(0.09);
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(680, now);
        filter.frequency.exponentialRampToValueAtTime(140, now + 0.08);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.75, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.085);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);
        noise.start(now);

        if (isHeadshot) {
            // High-velocity helmet steel ring ping + lethal critical crunch
            const bell = this.ctx.createOscillator();
            bell.type = 'sine';
            bell.frequency.setValueAtTime(2150, now);
            bell.frequency.exponentialRampToValueAtTime(850, now + 0.18);

            const bellGain = this.ctx.createGain();
            bellGain.gain.setValueAtTime(0.85, now);
            bellGain.gain.exponentialRampToValueAtTime(0.001, now + 0.20);

            bell.connect(bellGain);
            bellGain.connect(this.masterGain);
            bell.start(now);
            bell.stop(now + 0.21);
        }
    }

    playImpactMetal() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        // High-pitched steel ricochet whiz-ping
        const osc = this.ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(2600 + Math.random() * 400, now);
        osc.frequency.exponentialRampToValueAtTime(1100, now + 0.12);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.48, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.13);

        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 0.14);
    }

    playImpactConcrete() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        // Dull concrete/masonry smack + crumbling grit
        const noise = this.ctx.createBufferSource();
        noise.buffer = this.createNoiseBuffer(0.07);
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(850, now);
        filter.frequency.exponentialRampToValueAtTime(250, now + 0.065);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.42, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);
        noise.start(now);
    }

    playCasingBounce() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        // Spent brass casing clink against floor
        const osc = this.ctx.createOscillator();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(3100 + (Math.random() - 0.5) * 300, now);
        osc.frequency.exponentialRampToValueAtTime(2200, now + 0.035);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.038);

        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 0.04);
    }

    playNearMiss() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        // Supersonic bullet shockwave snap + high-velocity air whiz-by
        this.playNoiseBurst(this.crackNoiseBuf, now, 0.022, 'highpass', 3200, 1800, 0.45, 1.2);
        this.playNoiseBurst(this.pinkNoiseBuf, now + 0.008, 0.085, 'bandpass', 2900, 650, 0.34, 2.4);
    }

    playHeartbeat() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        if (now - this.lastHeartbeat < 0.75) return;
        this.lastHeartbeat = now;

        // Low-frequency heartbeat thump (Lub-Dub)
        [0, 0.16].forEach((offset, idx) => {
            const osc = this.ctx.createOscillator();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(idx === 0 ? 68 : 52, now + offset);
            osc.frequency.exponentialRampToValueAtTime(28, now + offset + 0.12);

            const gain = this.ctx.createGain();
            gain.gain.setValueAtTime(idx === 0 ? 0.65 : 0.45, now + offset);
            gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.13);

            osc.connect(gain);
            gain.connect(this.masterGain);
            osc.start(now + offset);
            osc.stop(now + offset + 0.14);
        });
    }

    playHit(isHeadshot = false) {
        this.playImpactFlesh(isHeadshot);
    }

    playReload() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        // Realistic metallic mag-release click, mag-insert lock, and bolt charging rack
        this.playNoiseBurst(this.whiteNoiseBuf, now + 0.05, 0.035, 'bandpass', 2900, 1900, 0.22, 4.8);
        this.playNoiseBurst(this.pinkNoiseBuf, now + 0.44, 0.060, 'bandpass', 1100, 620, 0.32, 2.8);
        this.playNoiseBurst(this.whiteNoiseBuf, now + 0.46, 0.032, 'bandpass', 3400, 2400, 0.20, 5.2);
        this.playNoiseBurst(this.whiteNoiseBuf, now + 0.90, 0.048, 'bandpass', 3800, 2600, 0.26, 4.6);
        this.playNoiseBurst(this.whiteNoiseBuf, now + 1.00, 0.042, 'bandpass', 4200, 2300, 0.28, 5.4);
    }

    playBombBeep(highPitch = false) {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(highPitch ? 2200 : 1750, now);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.28, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 0.1);
    }

    playExplosion() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        // Heavy military shockwave rumble + high-pressure blast wave
        const noise = this.ctx.createBufferSource();
        noise.buffer = this.createNoiseBuffer(1.2);

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(900, now);
        filter.frequency.exponentialRampToValueAtTime(45, now + 1.15);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(1.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.18);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);
        noise.start(now);

        // Sub-bass crater vibration
        const sub = this.ctx.createOscillator();
        sub.type = 'sine';
        sub.frequency.setValueAtTime(80, now);
        sub.frequency.exponentialRampToValueAtTime(20, now + 0.7);
        const subGain = this.ctx.createGain();
        subGain.gain.setValueAtTime(0.9, now);
        subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.75);
        sub.connect(subGain);
        subGain.connect(this.masterGain);
        sub.start(now);
        sub.stop(now + 0.78);
    }

    playFootstep() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const noise = this.ctx.createBufferSource();
        noise.buffer = this.createNoiseBuffer(0.05);

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(340, now);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.14, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);
        noise.start(now);
    }

    playRoundEnd(win = true) {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const notes = win ? [440, 554.37, 659.25, 880] : [392, 349.23, 329.63, 261.63];
        notes.forEach((freq, i) => {
            const osc = this.ctx.createOscillator();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, now + i * 0.11);

            const gain = this.ctx.createGain();
            gain.gain.setValueAtTime(0.28, now + i * 0.11);
            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.11 + 0.25);

            osc.connect(gain);
            gain.connect(this.masterGain);
            osc.start(now + i * 0.11);
            osc.stop(now + i * 0.11 + 0.26);
        });
    }
}

window.soundFX = new SoundSystem();
