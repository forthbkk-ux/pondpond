// Procedural Web Audio Synthesizer for Counter-Strike Web/Mobile (Tactical & Military Realism)
class SoundSystem {
    constructor() {
        this.ctx = null;
        this.enabled = true;
        this.masterGain = null;
        this.lastHeartbeat = 0;
    }

    init() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) {
                this.ctx = new AudioCtx();
                this.masterGain = this.ctx.createGain();
                this.masterGain.gain.value = 0.50;
                this.masterGain.connect(this.ctx.destination);
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
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

    playShoot(weaponId, volumeScale = 1.0) {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const vol = Math.min(1.0, Math.max(0.05, volumeScale));

        if (weaponId === 'knife') {
            // Knife tactical combat slice
            const noise = this.ctx.createBufferSource();
            noise.buffer = this.createNoiseBuffer(0.14);
            const filter = this.ctx.createBiquadFilter();
            filter.type = 'bandpass';
            filter.frequency.setValueAtTime(1400, now);
            filter.frequency.exponentialRampToValueAtTime(380, now + 0.13);

            const gain = this.ctx.createGain();
            gain.gain.setValueAtTime(0.40 * vol, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.13);

            noise.connect(filter);
            filter.connect(gain);
            gain.connect(this.masterGain);
            noise.start(now);
            return;
        }

        // Heavy Tactical Gunshot: 1) Supersonic Bore Crack, 2) Powder Deflagration Body, 3) Mechanical Bolt Clack, 4) Deep Sub-Bass Punch
        let duration = 0.22;
        let filterFreq = 1600;
        let bassPitch = 165;
        let bassDuration = 0.14;
        let isHeavyRifle = false;
        let isSniper = false;

        if (weaponId === 'awp' || weaponId === 'ssg08' || weaponId === 'scar20') {
            isSniper = true;
            duration = weaponId === 'awp' ? 0.72 : 0.48;
            filterFreq = 950;
            bassPitch = 95;
            bassDuration = 0.28;
        } else if (weaponId === 'nova' || weaponId === 'sawedoff' || weaponId === 'mag7' || weaponId === 'shotgun' || weaponId === 'spas12') {
            duration = 0.42;
            filterFreq = 1200;
            bassPitch = 110;
            bassDuration = 0.22;
        } else if (weaponId === 'ak47' || weaponId === 'galil' || weaponId === 'sg553') {
            isHeavyRifle = true;
            duration = 0.28;
            filterFreq = 1450;
            bassPitch = 140;
            bassDuration = 0.16;
        } else if (weaponId === 'm249' || weaponId === 'negev') {
            duration = 0.26;
            filterFreq = 1500;
            bassPitch = 135;
            bassDuration = 0.16;
        } else if (weaponId === 'deagle' || weaponId === 'revolver') {
            duration = 0.38;
            filterFreq = 1250;
            bassPitch = 120;
            bassDuration = 0.18;
        } else if (weaponId === 'm4a1' || weaponId === 'm4a4' || weaponId === 'aug' || weaponId === 'famas') {
            duration = 0.20;
            filterFreq = 1900;
            bassPitch = 180;
            bassDuration = 0.13;
        } else if (weaponId === 'pistol' || weaponId === 'usp') {
            // Silenced / Tactical Subdued Pop
            duration = 0.14;
            filterFreq = 2600;
            bassPitch = 240;
            bassDuration = 0.09;
        } else {
            // SMG / Pistols
            duration = 0.16;
            filterFreq = 2000;
            bassPitch = 190;
            bassDuration = 0.12;
        }

        // Layer 1: Supersonic Initial Transient (Sharp 10ms bore crack)
        const snap = this.ctx.createBufferSource();
        snap.buffer = this.createNoiseBuffer(0.025);
        const snapFilter = this.ctx.createBiquadFilter();
        snapFilter.type = 'highpass';
        snapFilter.frequency.setValueAtTime(2800, now);
        const snapGain = this.ctx.createGain();
        snapGain.gain.setValueAtTime(1.1 * vol, now);
        snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);
        snap.connect(snapFilter);
        snapFilter.connect(snapGain);
        snapGain.connect(this.masterGain);
        snap.start(now);

        // Layer 2: Main Blast Powder Noise & Barrel Resonance
        const noise = this.ctx.createBufferSource();
        noise.buffer = this.createNoiseBuffer(duration);
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(filterFreq, now);
        filter.frequency.exponentialRampToValueAtTime(160, now + duration);

        const noiseGain = this.ctx.createGain();
        noiseGain.gain.setValueAtTime(0.95 * vol, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

        noise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(this.masterGain);
        noise.start(now);

        // Layer 3: Deep Visceral Sub-Bass Body Punch
        const osc = this.ctx.createOscillator();
        osc.type = isHeavyRifle || isSniper ? 'sawtooth' : 'triangle';
        osc.frequency.setValueAtTime(bassPitch, now);
        osc.frequency.exponentialRampToValueAtTime(28, now + bassDuration);

        const oscGain = this.ctx.createGain();
        oscGain.gain.setValueAtTime(0.85 * vol, now);
        oscGain.gain.exponentialRampToValueAtTime(0.001, now + bassDuration);

        osc.connect(oscGain);
        oscGain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + bassDuration + 0.01);

        // Layer 4: Mechanical Bolt Carrier Clatter (Metal slide cycling)
        const bolt = this.ctx.createOscillator();
        bolt.type = 'square';
        bolt.frequency.setValueAtTime(820, now + 0.04);
        bolt.frequency.exponentialRampToValueAtTime(320, now + 0.08);
        const boltGain = this.ctx.createGain();
        boltGain.gain.setValueAtTime(0.18 * vol, now + 0.04);
        boltGain.gain.exponentialRampToValueAtTime(0.001, now + 0.085);
        bolt.connect(boltGain);
        boltGain.connect(this.masterGain);
        bolt.start(now + 0.04);
        bolt.stop(now + 0.09);
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
        // Supersonic bullet snap / whiz-by close to player
        const osc = this.ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(2400, now);
        osc.frequency.exponentialRampToValueAtTime(450, now + 0.075);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.38, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 0.085);
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
        [0.05, 0.45, 0.95].forEach((offset, idx) => {
            const osc = this.ctx.createOscillator();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(idx === 2 ? 620 : 420, now + offset);
            osc.frequency.exponentialRampToValueAtTime(180, now + offset + 0.06);

            const gain = this.ctx.createGain();
            gain.gain.setValueAtTime(0.28, now + offset);
            gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.06);

            osc.connect(gain);
            gain.connect(this.masterGain);
            osc.start(now + offset);
            osc.stop(now + offset + 0.07);
        });
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
