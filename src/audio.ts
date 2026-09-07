// Web Audio API realistic paper turning sound generator

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  try {
    if (!audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        audioCtx = new AudioCtxClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }
    return audioCtx;
  } catch {
    return null;
  }
}

/**
 * Play a realistic physical paper flip sound
 * Uses shaped noise and bandpass filters to mimic the crisp rustle of archival parchment.
 */
export function playPageTurnSound(volume = 0.6, isReverse = false): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const duration = 0.38;

    // Buffer of shaped noise
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0.0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // Pink-ish noise filter
      lastOut = lastOut * 0.9 + white * 0.1;
      data[i] = lastOut;
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = buffer;

    // Dual bandpass filter sweeping to simulate paper friction
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.Q.setValueAtTime(2.2, now);

    if (isReverse) {
      filter.frequency.setValueAtTime(2400, now);
      filter.frequency.exponentialRampToValueAtTime(800, now + duration * 0.65);
      filter.frequency.exponentialRampToValueAtTime(1400, now + duration);
    } else {
      filter.frequency.setValueAtTime(900, now);
      filter.frequency.exponentialRampToValueAtTime(2600, now + duration * 0.55);
      filter.frequency.exponentialRampToValueAtTime(700, now + duration);
    }

    // Secondary subtle lowpass for body/mass of the book page
    const lowpass = ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.setValueAtTime(3200, now);

    // Gain envelope
    const gain = ctx.createGain();
    const effectiveVol = Math.max(0.01, Math.min(volume, 1.0)) * 0.45;

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(effectiveVol, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(effectiveVol * 0.65, now + 0.15);
    gain.gain.linearRampToValueAtTime(effectiveVol * 0.9, now + 0.22); // second rustle as page lands
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    // Subtle low thud as page settles on the stack
    const thudOsc = ctx.createOscillator();
    const thudGain = ctx.createGain();
    thudOsc.type = 'sine';
    thudOsc.frequency.setValueAtTime(120, now + 0.18);
    thudOsc.frequency.exponentialRampToValueAtTime(45, now + duration);
    thudGain.gain.setValueAtTime(0.001, now);
    thudGain.gain.setValueAtTime(effectiveVol * 0.25, now + 0.2);
    thudGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    thudOsc.connect(thudGain);
    thudGain.connect(ctx.destination);
    thudOsc.start(now + 0.18);
    thudOsc.stop(now + duration);

    noiseSource.connect(filter);
    filter.connect(lowpass);
    lowpass.connect(gain);
    gain.connect(ctx.destination);

    noiseSource.start(now);
    noiseSource.stop(now + duration);
  } catch (err) {
    console.warn('Paper turn audio failed:', err);
  }
}

/**
 * Play a delicate pen/pencil tap sound on action
 */
export function playPenSound(volume = 0.3): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(540, now);
    osc.frequency.exponentialRampToValueAtTime(220, now + 0.05);

    const effVol = Math.max(0.01, Math.min(volume, 1.0)) * 0.15;
    gain.gain.setValueAtTime(effVol, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.05);
  } catch {}
}
