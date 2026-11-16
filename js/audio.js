// Procedural Web Audio Synthesizer for Counter-Strike Web/Mobile
class SoundSystem {
    constructor() {
        this.ctx = null;
        this.enabled = true;
        this.masterGain = null;
    }

    init() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) {
                this.ctx = new AudioCtx();
                this.masterGain = this.ctx.createGain();
                this.masterGain.gain.value = 0.45;
                this.masterGain.connect(this.ctx.destination);
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    createNoiseBuffer(duration = 0.3) {
        const bufferSize = this.ctx.sampleRate * duration;
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
            // Knife swoosh
            const noise = this.ctx.createBufferSource();
            noise.buffer = this.createNoiseBuffer(0.14);
            const filter = this.ctx.createBiquadFilter();
            filter.type = 'bandpass';
            filter.frequency.setValueAtTime(1200, now);
            filter.frequency.exponentialRampToValueAtTime(400, now + 0.13);

            const gain = this.ctx.createGain();
            gain.gain.setValueAtTime(0.35 * vol, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.13);

            noise.connect(filter);
            filter.connect(gain);
            gain.connect(this.masterGain);
            noise.start(now);
            return;
        }

        // Gunshot noise burst + low punch
        let duration = 0.18;
        let filterFreq = 1600;
        let pitchStart = 180;

        if (weaponId === 'awp' || weaponId === 'ssg08' || weaponId === 'scar20') {
            duration = weaponId === 'awp' ? 0.58 : 0.42;
            filterFreq = 950;
            pitchStart = 105;
        } else if (weaponId === 'nova' || weaponId === 'sawedoff' || weaponId === 'mag7' || weaponId === 'shotgun' || weaponId === 'spas12') {
            duration = 0.36;
            filterFreq = 1100;
            pitchStart = 120;
        } else if (weaponId === 'm249' || weaponId === 'negev') {
            duration = 0.22;
            filterFreq = 1550;
            pitchStart = 145;
        } else if (weaponId === 'ak47' || weaponId === 'galil' || weaponId === 'sg553') {
            duration = 0.24;
            filterFreq = 1400;
            pitchStart = 150;
        } else if (weaponId === 'm4a1' || weaponId === 'mp5' || weaponId === 'pistol') {
            duration = 0.16;
            filterFreq = 2200;
            pitchStart = 220;
        } else if (weaponId === 'deagle' || weaponId === 'revolver') {
            duration = 0.32;
            filterFreq = 1200;
            pitchStart = 130;
        } else if (weaponId === 'p90' || weaponId === 'bizon' || weaponId === 'mac10' || weaponId === 'mp9' || weaponId === 'ump45') {
            duration = 0.14;
            filterFreq = 1850;
            pitchStart = 195;
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = this.createNoiseBuffer(duration);

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(filterFreq, now);
        filter.frequency.exponentialRampToValueAtTime(220, now + duration);

        const noiseGain = this.ctx.createGain();
        noiseGain.gain.setValueAtTime(0.8 * vol, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

        noise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(this.masterGain);
        noise.start(now);

        // Low-end punch oscillator
        const osc = this.ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(pitchStart, now);
        osc.frequency.exponentialRampToValueAtTime(35, now + 0.12);

        const oscGain = this.ctx.createGain();
        oscGain.gain.setValueAtTime(0.65 * vol, now);
        oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

        osc.connect(oscGain);
        oscGain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 0.13);
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
            gain.gain.setValueAtTime(0.25, now + offset);
            gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.06);

            osc.connect(gain);
            gain.connect(this.masterGain);
            osc.start(now + offset);
            osc.stop(now + offset + 0.07);
        });
    }

    playHit(isHeadshot = false) {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        osc.type = isHeadshot ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(isHeadshot ? 1350 : 320, now);
        osc.frequency.exponentialRampToValueAtTime(isHeadshot ? 880 : 120, now + (isHeadshot ? 0.14 : 0.07));

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(isHeadshot ? 0.5 : 0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + (isHeadshot ? 0.15 : 0.08));

        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 0.16);
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
        const noise = this.ctx.createBufferSource();
        noise.buffer = this.createNoiseBuffer(0.9);

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(650, now);
        filter.frequency.exponentialRampToValueAtTime(60, now + 0.85);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(1.0, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.88);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);
        noise.start(now);
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
        gain.gain.setValueAtTime(0.12, now);
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
