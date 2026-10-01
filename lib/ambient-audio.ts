// Audio starts only after a headset action. File credits live beside the player.
export const headsetTracks = [
  {
    id: "lofi-study",
    name: "Lofi Study",
    kind: "Lo-fi",
    artist: "FASSounds",
    media: "file",
    src: "/audio/lofi-study.mp3",
    source:
      "https://pixabay.com/music/beats-lofi-study-calm-peaceful-chill-hop-112191/",
    license: "Pixabay",
  },
  {
    id: "lofi-chill-2",
    name: "Lofi Chill 2",
    kind: "Lo-fi",
    artist: "DELOSound",
    media: "file",
    src: "/audio/lofi-chill-2.mp3",
    source: "https://pixabay.com/music/lofi-lofi-chill-2-462279/",
    license: "Pixabay",
  },
  {
    id: "good-night",
    name: "Good Night",
    kind: "Lo-fi",
    artist: "FASSounds",
    media: "file",
    src: "/audio/good-night.mp3",
    source:
      "https://pixabay.com/music/beats-good-night-lofi-cozy-chill-music-160166/",
    license: "Pixabay",
  },
  {
    id: "cat-caffe",
    name: "Cat Caffe",
    kind: "Lo-fi",
    artist: "TAD",
    media: "file",
    src: "/audio/cat-caffe.mp3",
    source: "https://opengameart.org/content/lofi-compilation",
    license: "CC0",
  },
  {
    id: "countryside",
    name: "Countryside",
    kind: "Lo-fi",
    artist: "TAD",
    media: "file",
    src: "/audio/countryside.mp3",
    source: "https://opengameart.org/content/lofi-compilation",
    license: "CC0",
  },
  {
    id: "oceanside",
    name: "Oceanside",
    kind: "Lo-fi",
    artist: "TAD",
    media: "file",
    src: "/audio/oceanside.mp3",
    source: "https://opengameart.org/content/lofi-compilation",
    license: "CC0",
  },
  {
    id: "florist",
    name: "Florist",
    kind: "Lo-fi",
    artist: "TAD",
    media: "file",
    src: "/audio/florist.mp3",
    source: "https://opengameart.org/content/lofi-compilation",
    license: "CC0",
  },
  {
    id: "rainy-forest",
    name: "Rainy Forest",
    kind: "Lo-fi",
    artist: "TAD",
    media: "file",
    src: "/audio/rainy-forest.mp3",
    source: "https://opengameart.org/content/lofi-compilation",
    license: "CC0",
  },
  {
    id: "lofi-hiphop",
    name: "Lofi Hip Hop",
    kind: "Lo-fi",
    artist: "omfgdude",
    media: "file",
    src: "/audio/lofi-hiphop.ogg",
    source: "https://opengameart.org/content/lofi-hip-hop",
    license: "CC0",
  },
  {
    id: "lofi-again",
    name: "Lofi Again",
    kind: "Lo-fi",
    artist: "omfgdude",
    media: "file",
    src: "/audio/lofiagain.ogg",
    source: "https://opengameart.org/content/lofi-again",
    license: "CC0",
  },
  {
    id: "rain",
    name: "Chuva suave",
    kind: "Ambiente",
    artist: "Síntese local",
    media: "synth",
  },
  {
    id: "ocean",
    name: "Mar calmo",
    kind: "Ambiente",
    artist: "Síntese local",
    media: "synth",
  },
  {
    id: "focus",
    name: "Foco leve",
    kind: "Instrumental",
    artist: "Síntese local",
    media: "synth",
  },
  {
    id: "night",
    name: "Noite calma",
    kind: "Instrumental",
    artist: "Síntese local",
    media: "synth",
  },
  {
    id: "waterfall",
    name: "Cachoeira",
    kind: "Natureza",
    artist: "kurt",
    media: "file",
    src: "/audio/waterfall.ogg",
    source: "https://opengameart.org/content/stream-sounds",
    license: "CC BY 3.0",
  },
  {
    id: "stream",
    name: "Riacho",
    kind: "Natureza",
    artist: "kurt",
    media: "file",
    src: "/audio/stream.ogg",
    source: "https://opengameart.org/content/stream-sounds",
    license: "CC BY 3.0",
  },
] as const;

export type HeadsetTrack = (typeof headsetTracks)[number]["id"];
export const defaultHeadsetTrack = "lofi-study" satisfies HeadsetTrack;
export const headsetLicenseUrls = {
  CC0: "https://creativecommons.org/publicdomain/zero/1.0/",
  "CC BY 3.0": "https://creativecommons.org/licenses/by/3.0/",
  Pixabay: "https://pixabay.com/service/license-summary/",
} as const;
export type SynthTrack = Extract<
  (typeof headsetTracks)[number],
  { media: "synth" }
>["id"];

export const headsetLoopSeconds = 16;

function fillNature(samples: Float32Array, rate: number, ocean: boolean) {
  let filtered = 0;
  for (let i = 0; i < samples.length; i++) {
    const t = i / rate;
    const noise = Math.random() * 2 - 1;
    filtered += (noise - filtered) * (ocean ? 0.012 : 0.085);
    const wave = ocean ? 0.3 + 0.7 * (0.5 - 0.5 * Math.cos(Math.PI * t)) : 0.7;
    const seam = Math.min(1, t * 14, (headsetLoopSeconds - t) * 14);
    samples[i] =
      (filtered * (ocean ? 1.2 : 0.8) + noise * (ocean ? 0.012 : 0.045)) *
      wave *
      seam;
  }
}

function fillMusic(samples: Float32Array, rate: number, night: boolean) {
  const chords = night
    ? [
        [146.83, 174.61, 220],
        [130.81, 174.61, 220],
        [110, 146.83, 174.61],
        [130.81, 164.81, 196],
      ]
    : [
        [130.81, 164.81, 196],
        [110, 130.81, 164.81],
        [174.61, 220, 261.63],
        [196, 246.94, 293.66],
      ];
  const melody = night
    ? [293.66, 349.23, 440, 349.23, 261.63, 349.23, 440, 349.23]
    : [261.63, 329.63, 392, 329.63, 220, 261.63, 329.63, 261.63];

  for (let i = 0; i < samples.length; i++) {
    const t = i / rate;
    const chord = chords[Math.floor(t / 2) % chords.length];
    const chordTime = t % 2;
    const padEnvelope = Math.min(1, chordTime * 3, (2 - chordTime) * 3);
    const pad = chord.reduce(
      (sum, frequency) => sum + Math.sin(2 * Math.PI * frequency * t),
      0,
    );
    const noteIndex = Math.floor(t * 2);
    const noteTime = t % 0.5;
    const frequency = melody[noteIndex % melody.length];
    const noteEnvelope =
      Math.min(1, noteTime * 35) * Math.exp(-(night ? 5 : 9) * noteTime);
    const note =
      Math.sin(2 * Math.PI * frequency * t) +
      0.22 * Math.sin(4 * Math.PI * frequency * t);
    const seam = Math.min(1, t * 12, (headsetLoopSeconds - t) * 12);
    samples[i] =
      (pad * padEnvelope * (night ? 0.075 : 0.055) +
        note * noteEnvelope * (night ? 0.12 : 0.16)) *
      seam;
  }
}

export function createAmbientAudio(initialTrack: SynthTrack = "rain") {
  const context = new AudioContext();
  const master = context.createGain();
  master.gain.value = 0;
  master.connect(context.destination);
  const buffers = new Map<SynthTrack, AudioBuffer>();
  const activeSources = new Set<AudioBufferSourceNode>();
  let track = initialTrack;
  let current: { source: AudioBufferSourceNode; gain: GainNode } | null = null;
  let trackStartedAt = 0;
  let pauseTimer: ReturnType<typeof setTimeout> | undefined;

  const bufferFor = (id: SynthTrack) => {
    const cached = buffers.get(id);
    if (cached) return cached;
    const buffer = context.createBuffer(
      2,
      context.sampleRate * headsetLoopSeconds,
      context.sampleRate,
    );
    for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
      const samples = buffer.getChannelData(channel);
      if (id === "rain" || id === "ocean")
        fillNature(samples, context.sampleRate, id === "ocean");
      else fillMusic(samples, context.sampleRate, id === "night");
    }
    buffers.set(id, buffer);
    return buffer;
  };

  const startTrack = (offset = 0) => {
    const buffer = bufferFor(track);
    const now = context.currentTime;
    if (current) {
      current.gain.gain.setTargetAtTime(0, now, 0.06);
      current.source.stop(now + 0.4);
    }
    const source = context.createBufferSource();
    const gain = context.createGain();
    source.buffer = buffer;
    source.loop = true;
    gain.gain.value = 0;
    source.connect(gain).connect(master);
    source.onended = () => {
      source.disconnect();
      gain.disconnect();
      activeSources.delete(source);
    };
    activeSources.add(source);
    source.start(0, offset);
    trackStartedAt = now - offset;
    gain.gain.setTargetAtTime(1, now, 0.08);
    current = { source, gain };
  };

  const setVolume = (volume: number) => {
    master.gain.cancelScheduledValues(context.currentTime);
    master.gain.setTargetAtTime(
      Math.max(0, Math.min(1, volume)) * 0.8,
      context.currentTime,
      0.08,
    );
  };

  return {
    async play(volume: number) {
      clearTimeout(pauseTimer);
      await context.resume();
      if (!current) startTrack();
      setVolume(volume);
    },
    pause() {
      clearTimeout(pauseTimer);
      setVolume(0);
      pauseTimer = setTimeout(() => {
        if (context.state !== "closed") void context.suspend().catch(() => {});
      }, 300);
    },
    setTrack(next: SynthTrack) {
      if (next === track) return;
      track = next;
      if (current) startTrack();
    },
    seek(seconds: number) {
      if (!current) return;
      startTrack(Math.max(0, Math.min(headsetLoopSeconds - 0.01, seconds)));
    },
    getProgress() {
      return (
        (((context.currentTime - trackStartedAt) % headsetLoopSeconds) +
          headsetLoopSeconds) %
        headsetLoopSeconds
      );
    },
    setVolume,
    dispose() {
      clearTimeout(pauseTimer);
      for (const source of activeSources) source.stop();
      activeSources.clear();
      current = null;
      master.disconnect();
      void context.close().catch(() => {});
    },
  };
}
