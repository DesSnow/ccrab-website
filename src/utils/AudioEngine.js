class AudioEngine {
  constructor() {
    this.context = null;
    this.enabled = false;
    this.ambientOsc = null;
    this.ambientGain = null;
  }

  init() {
    if (this.context) return;
    this.context = new (window.AudioContext || window.webkitAudioContext)();
    this.enabled = true;
    this.startAmbientHum();
  }

  setEnabled(state) {
    this.enabled = state;
    if (state) {
      if (!this.context) this.init();
      else this.context.resume();
      this.startAmbientHum();
    } else {
      if (this.context) this.context.suspend();
      this.stopAmbientHum();
    }
  }

  // A futuristic short beep
  playUiBeep(freq = 880, type = 'square', duration = 0.05) {
    if (!this.enabled || !this.context) return;

    const osc = this.context.createOscillator();
    const gain = this.context.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.context.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.5, this.context.currentTime + duration);

    gain.gain.setValueAtTime(0.05, this.context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.context.currentTime + duration);

    osc.connect(gain);
    gain.connect(this.context.destination);

    osc.start();
    osc.stop(this.context.currentTime + duration);
  }

  // Low frequency background ship hum
  startAmbientHum() {
    if (!this.enabled || !this.context || this.ambientOsc) return;

    this.ambientOsc = this.context.createOscillator();
    this.ambientGain = this.context.createGain();

    this.ambientOsc.type = 'sine';
    this.ambientOsc.frequency.setValueAtTime(40, this.context.currentTime); // Low rumble

    this.ambientGain.gain.setValueAtTime(0, this.context.currentTime);
    this.ambientGain.gain.linearRampToValueAtTime(0.02, this.context.currentTime + 2); // Fade in

    this.ambientOsc.connect(this.ambientGain);
    this.ambientGain.connect(this.context.destination);

    this.ambientOsc.start();
  }

  stopAmbientHum() {
    if (this.ambientGain) {
      this.ambientGain.gain.linearRampToValueAtTime(0, this.context.currentTime + 0.5);
      setTimeout(() => {
        if (this.ambientOsc) {
          this.ambientOsc.stop();
          this.ambientOsc = null;
          this.ambientGain = null;
        }
      }, 500);
    }
  }

  playWarpSound() {
    if (!this.enabled || !this.context) return;
    const duration = 1.0;
    const osc = this.context.createOscillator();
    const gain = this.context.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(100, this.context.currentTime);
    osc.frequency.exponentialRampToValueAtTime(2000, this.context.currentTime + duration);

    gain.gain.setValueAtTime(0.1, this.context.currentTime);
    gain.gain.linearRampToValueAtTime(0, this.context.currentTime + duration);

    osc.connect(gain);
    gain.connect(this.context.destination);

    osc.start();
    osc.stop(this.context.currentTime + duration);
  }

  // Critical system alarm
  playAlarm() {
    if (!this.enabled || !this.context) return;
    const duration = 2.0;
    const osc1 = this.context.createOscillator();
    const osc2 = this.context.createOscillator();
    const gain = this.context.createGain();

    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(400, this.context.currentTime);
    osc1.frequency.linearRampToValueAtTime(800, this.context.currentTime + 0.5);
    osc1.frequency.linearRampToValueAtTime(400, this.context.currentTime + 1.0);
    osc1.frequency.linearRampToValueAtTime(800, this.context.currentTime + 1.5);
    osc1.frequency.linearRampToValueAtTime(400, this.context.currentTime + 2.0);

    osc2.type = 'square';
    osc2.frequency.setValueAtTime(100, this.context.currentTime);

    gain.gain.setValueAtTime(0.1, this.context.currentTime);
    gain.gain.linearRampToValueAtTime(0.1, this.context.currentTime + duration - 0.1);
    gain.gain.linearRampToValueAtTime(0, this.context.currentTime + duration);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.context.destination);

    osc1.start();
    osc2.start();
    osc1.stop(this.context.currentTime + duration);
    osc2.stop(this.context.currentTime + duration);
  }
}

export const hudAudio = new AudioEngine();
