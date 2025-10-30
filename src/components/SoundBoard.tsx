"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ambientSounds } from "@/data/sounds";

type SoundState = {
  volume: number;
  isPlaying: boolean;
  isLooping: boolean;
};

type SoundStateMap = Record<string, SoundState>;

const DEFAULT_VOLUME = 0.6;

const buildInitialState = (): SoundStateMap =>
  ambientSounds.reduce<SoundStateMap>((acc, sound) => {
    acc[sound.id] = {
      volume: DEFAULT_VOLUME,
      isPlaying: false,
      isLooping: true,
    };
    return acc;
  }, {});

export function SoundBoard() {
  const [soundState, setSoundState] = useState<SoundStateMap>(
    () => buildInitialState(),
  );
  const audioRefs = useRef<Map<string, HTMLAudioElement>>(new Map());

  const ensureAudio = (soundId: string, url: string) => {
    let audio = audioRefs.current.get(soundId);
    if (!audio) {
      audio = new Audio(url);
      audio.loop = true;
      audio.volume = DEFAULT_VOLUME;
      audioRefs.current.set(soundId, audio);
    }
    return audio;
  };

  useEffect(() => {
    const refs = audioRefs.current;
    return () => {
      refs.forEach((audio) => {
        audio.pause();
        // Reset src so the browser can garbage collect stream
        audio.src = "";
      });
      refs.clear();
    };
  }, []);

  const handleToggle = (soundId: string, url: string) => {
    setSoundState((prev) => {
      const current = prev[soundId];
      const nextPlaying = !current.isPlaying;
      const audio = ensureAudio(soundId, url);
      audio.loop = current.isLooping;
      audio.volume = current.volume;
      if (nextPlaying) {
        void audio.play().catch(() => {
          // Ignore autoplay rejections triggered by user agents
        });
      } else {
        audio.pause();
      }
      return {
        ...prev,
        [soundId]: {
          ...current,
          isPlaying: nextPlaying,
        },
      };
    });
  };

  const handleVolume = (soundId: string, value: number, url: string) => {
    setSoundState((prev) => {
      const current = prev[soundId];
      const audio = ensureAudio(soundId, url);
      audio.volume = value;
      return {
        ...prev,
        [soundId]: {
          ...current,
          volume: value,
        },
      };
    });
  };

  const handleLoopToggle = (soundId: string, url: string) => {
    setSoundState((prev) => {
      const current = prev[soundId];
      const nextLooping = !current.isLooping;
      const audio = ensureAudio(soundId, url);
      audio.loop = nextLooping;
      return {
        ...prev,
        [soundId]: {
          ...current,
          isLooping: nextLooping,
        },
      };
    });
  };

  const stopAll = () => {
    audioRefs.current.forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });
    setSoundState(buildInitialState());
  };

  const activeMix = useMemo(() => {
    return ambientSounds
      .filter((sound) => soundState[sound.id]?.isPlaying)
      .map((sound) => sound.title);
  }, [soundState]);

  const activeCount = activeMix.length;

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 pb-24">
      <header className="flex flex-col gap-6 pt-8 text-center md:pt-12">
        <span className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm text-white/80 backdrop-blur">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          Live soundscapes
        </span>
        <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
          Build your perfect ambient mix.
        </h1>
        <p className="mx-auto max-w-2xl text-base text-white/70 md:text-lg">
          Layer calming loops, adjust volumes, and craft a custom atmosphere for
          deep work, sleep, or winding down. Every loop is royalty-free and
          streams instantly in your browser.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-white/70">
          <div className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2">
            <span className="font-semibold text-white">{activeCount}</span>
            sound{activeCount === 1 ? "" : "s"} active
          </div>
          {activeCount > 0 ? (
            <div className="flex max-w-full flex-wrap items-center justify-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-emerald-200">
              {activeMix.map((title) => (
                <span
                  key={title}
                  className="rounded-full bg-emerald-300/20 px-3 py-1 text-xs uppercase tracking-wide text-emerald-50"
                >
                  {title}
                </span>
              ))}
            </div>
          ) : (
            <div className="rounded-full border border-white/10 px-4 py-2 text-white/60">
              Tap play on any card to begin
            </div>
          )}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={stopAll}
            className="rounded-full border border-white/10 bg-white/10 px-6 py-2 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/20"
          >
            Stop all sounds
          </button>
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {ambientSounds.map((sound) => {
          const state = soundState[sound.id];
          return (
            <article
              key={sound.id}
              className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br ${sound.color} p-[1px] transition hover:border-white/20`}
            >
              <div className="relative flex h-full flex-col gap-6 rounded-[calc(theme(borderRadius.3xl)-1px)] bg-zinc-950/70 p-6 backdrop-blur">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_rgba(10,10,10,0))]" />
                <header className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      {sound.title}
                    </h2>
                    <p className="mt-2 text-sm text-white/70">
                      {sound.description}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleToggle(sound.id, sound.url)}
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 transition ${
                      state.isPlaying
                        ? "bg-white text-zinc-900 hover:bg-white/90"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                    aria-label={
                      state.isPlaying
                        ? `Pause ${sound.title}`
                        : `Play ${sound.title}`
                    }
                  >
                    {state.isPlaying ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.8}
                        stroke="currentColor"
                        className="h-5 w-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 5.25v13.5m-7.5-13.5v13.5"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="h-5 w-5"
                      >
                        <path d="M5 4.727v14.546c0 1.174 1.274 1.908 2.285 1.326l12.153-7.273c.999-.598.999-2.053 0-2.651L7.285 3.4C6.274 2.818 5 3.553 5 4.727z" />
                      </svg>
                    )}
                  </button>
                </header>

                <div className="flex flex-col gap-4">
                  <label className="flex flex-col gap-2 text-sm text-white/70">
                    Volume
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.01}
                      value={state.volume}
                      onChange={(event) =>
                        handleVolume(
                          sound.id,
                          Number(event.target.value),
                          sound.url,
                        )
                      }
                      className="h-1 cursor-pointer appearance-none rounded-full bg-white/20 accent-white"
                    />
                  </label>

                  <button
                    type="button"
                    onClick={() => handleLoopToggle(sound.id, sound.url)}
                    className={`flex items-center justify-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
                      state.isLooping
                        ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-100 hover:border-emerald-300/60 hover:bg-emerald-400/20"
                        : "border-white/10 bg-white/5 text-white/70 hover:border-white/20 hover:bg-white/10"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.6}
                      stroke="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 4v5h.582c.361-1.286 1.09-2.398 2.075-3.23C7.66 5.49 8.935 5 10.334 5c2.764 0 4.966 1.908 4.966 4.263h-1.5l2.5 3 2.5-3h-1.5C17.3 6.333 14.196 3.5 10.334 3.5 7.96 3.5 5.885 4.5 4.5 6.05V4H4Zm16 16v-5h-.582a7.18 7.18 0 0 1-2.075 3.23C15.34 18.51 14.065 19 12.666 19c-2.764 0-4.966-1.908-4.966-4.263h1.5l-2.5-3-2.5 3h1.5C6.7 17.667 9.804 20.5 13.666 20.5c2.374 0 4.449-1 5.834-2.55V20h.5Z"
                      />
                    </svg>
                    {state.isLooping ? "Looping enabled" : "Loop disabled"}
                  </button>
                </div>

                <footer className="flex items-center justify-between border-t border-white/5 pt-4 text-xs text-white/50">
                  <span>{state.isPlaying ? "Now playing" : "Paused"}</span>
                  <span>{sound.attribution}</span>
                </footer>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
