import { SoundBoard } from "@/components/SoundBoard";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-zinc-950 font-sans">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(120,80,255,0.28),_rgba(10,10,10,0.9))]" />
      <div className="pointer-events-none absolute inset-y-0 left-[10%] -z-10 w-[40rem] bg-[radial-gradient(circle,_rgba(45,212,191,0.18),_rgba(5,5,5,0))]" />
      <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col">
        <SoundBoard />
      </main>
    </div>
  );
}
