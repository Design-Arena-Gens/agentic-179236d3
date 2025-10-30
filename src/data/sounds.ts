export type AmbientSound = {
  id: string;
  title: string;
  description: string;
  url: string;
  color: string;
  attribution: string;
};

export const ambientSounds: AmbientSound[] = [
  {
    id: "ocean",
    title: "Ocean Waves",
    description: "Rolling surf and distant gulls for a coastal escape.",
    url: "https://cdn.pixabay.com/download/audio/2021/09/02/audio_845b844a74.mp3?filename=waves-sea-ambient-113524.mp3",
    color: "from-sky-500/30 via-cyan-400/20 to-indigo-500/30",
    attribution: "Pixabay — Waves Sea Ambient",
  },
  {
    id: "rain",
    title: "Gentle Rain",
    description: "Soft rainfall on leaves to help you unwind and focus.",
    url: "https://cdn.pixabay.com/download/audio/2021/08/04/audio_b6bccc50e9.mp3?filename=light-rain-ambient-110418.mp3",
    color: "from-blue-500/30 via-teal-400/20 to-emerald-500/30",
    attribution: "Pixabay — Light Rain Ambient",
  },
  {
    id: "forest",
    title: "Forest Birds",
    description: "Morning birdsong and rustling trees in a lush forest.",
    url: "https://cdn.pixabay.com/download/audio/2021/08/08/audio_962f8d833b.mp3?filename=forest-birds-ambience-110777.mp3",
    color: "from-emerald-600/30 via-lime-500/20 to-amber-400/30",
    attribution: "Pixabay — Forest Birds Ambience",
  },
  {
    id: "fireplace",
    title: "Fireplace Crackle",
    description: "Warm crackling fire to bring cozy fireplace vibes.",
    url: "https://cdn.pixabay.com/download/audio/2021/10/27/audio_34e65e073f.mp3?filename=fireplace-crackling-ambience-124516.mp3",
    color: "from-amber-500/30 via-orange-500/20 to-rose-500/30",
    attribution: "Pixabay — Fireplace Crackling Ambience",
  },
  {
    id: "cafe",
    title: "City Café",
    description: "Urban cafe hum with soft chatter and the clink of mugs.",
    url: "https://cdn.pixabay.com/download/audio/2021/09/07/audio_db2666ebf2.mp3?filename=cafe-ambience-113501.mp3",
    color: "from-purple-500/30 via-violet-400/20 to-fuchsia-500/30",
    attribution: "Pixabay — Cafe Ambience",
  },
  {
    id: "white-noise",
    title: "Airy Noise",
    description: "Balanced white noise to help mask distractions.",
    url: "https://cdn.pixabay.com/download/audio/2022/01/13/audio_65b6d85d74.mp3?filename=white-noise-ambient-15287.mp3",
    color: "from-zinc-500/30 via-slate-400/20 to-neutral-500/30",
    attribution: "Pixabay — White Noise Ambient",
  },
];
