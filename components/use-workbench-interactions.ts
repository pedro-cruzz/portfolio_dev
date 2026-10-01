"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  createAmbientAudio,
  headsetLoopSeconds,
  headsetTracks,
  type HeadsetTrack,
} from "@/lib/ambient-audio";
import type { SceneItem } from "@/lib/portfolio";
import { withBasePath } from "@/lib/site-path";

const defaultMessage = "Clique, toque ou use Tab e Enter nos objetos.";

export default function useWorkbenchInteractions(reducedMotion: boolean) {
  const [notebookOpen, setNotebookOpen] = useState(false);
  const [coffeePulse, setCoffeePulse] = useState(0);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioPaused, setAudioPaused] = useState(false);
  const [track, setTrackState] = useState<HeadsetTrack>("rain");
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(headsetLoopSeconds);
  const [volume, setVolumeState] = useState(35);
  const [message, setMessage] = useState(defaultMessage);
  const engine = useRef<ReturnType<typeof createAmbientAudio> | null>(null);
  const media = useRef<HTMLAudioElement | null>(null);
  const mediaSource = useRef("");
  const wantedAudio = useRef(false);
  const paused = useRef(false);
  const mounted = useRef(true);
  const volumeRef = useRef(35);
  const trackRef = useRef<HeadsetTrack>("rain");
  const navigationTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const messageTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  const announce = useCallback((text: string) => {
    clearTimeout(messageTimer.current);
    setMessage(text);
    messageTimer.current = setTimeout(() => setMessage(defaultMessage), 4500);
  }, []);

  const stopAudio = useCallback(() => {
    wantedAudio.current = false;
    engine.current?.pause();
    media.current?.pause();
    paused.current = false;
    setAudioPlaying(false);
    setAudioPaused(false);
    announce("Áudio do headset desligado.");
  }, [announce]);

  useEffect(() => {
    mounted.current = true;
    const hide = () => {
      if (document.hidden && wantedAudio.current) stopAudio();
    };
    document.addEventListener("visibilitychange", hide);
    return () => {
      mounted.current = false;
      wantedAudio.current = false;
      clearTimeout(navigationTimer.current);
      clearTimeout(messageTimer.current);
      document.removeEventListener("visibilitychange", hide);
      engine.current?.dispose();
      engine.current = null;
      media.current?.pause();
      media.current?.removeAttribute("src");
      media.current = null;
    };
  }, [stopAudio]);

  useEffect(() => {
    if (!audioPlaying || audioPaused) return;
    const update = () => {
      const selected = headsetTracks.find(
        (item) => item.id === trackRef.current,
      );
      setProgress(
        selected?.media === "file"
          ? (media.current?.currentTime ?? 0)
          : (engine.current?.getProgress() ?? 0),
      );
    };
    update();
    const timer = setInterval(update, 250);
    return () => clearInterval(timer);
  }, [audioPlaying, audioPaused]);

  const prepareMedia = useCallback(
    (src: string) => {
      const audio = media.current ?? new Audio();
      media.current = audio;
      audio.loop = true;
      audio.preload = "metadata";
      audio.volume = volumeRef.current / 100;
      audio.onloadedmetadata = () => {
        if (mediaSource.current === src && Number.isFinite(audio.duration))
          setDuration(audio.duration);
      };
      audio.onerror = () => {
        if (wantedAudio.current && mediaSource.current === src) {
          paused.current = true;
          setAudioPaused(true);
          announce(
            "Não foi possível carregar esta faixa. Escolha outra na lista.",
          );
        }
      };
      if (mediaSource.current !== src) {
        audio.pause();
        mediaSource.current = src;
        audio.src = withBasePath(src);
        audio.load();
      }
      if (Number.isFinite(audio.duration)) setDuration(audio.duration);
      return audio;
    },
    [announce],
  );

  const playSelected = useCallback(async () => {
    const selected = headsetTracks.find(
      (item) => item.id === trackRef.current,
    )!;
    if (selected.media === "file") {
      engine.current?.pause();
      await prepareMedia(selected.src).play();
    } else {
      media.current?.pause();
      engine.current ??= createAmbientAudio(selected.id);
      engine.current.setTrack(selected.id);
      await engine.current.play(volumeRef.current / 100);
    }
  }, [prepareMedia]);

  const toggleAudio = useCallback(async () => {
    if (wantedAudio.current) {
      stopAudio();
      return;
    }
    wantedAudio.current = true;
    try {
      // Start the selected source inside the click/keyboard gesture.
      await playSelected();
      if (!mounted.current) return;
      if (!wantedAudio.current) {
        engine.current?.pause();
        return;
      }
      setAudioPlaying(true);
      setAudioPaused(false);
      paused.current = false;
      const selected = headsetTracks.find(
        (item) => item.id === trackRef.current,
      );
      announce(
        `${selected?.name ?? "Áudio"} ligado. Escolha a faixa no canto da tela.`,
      );
    } catch {
      if (!mounted.current) return;
      wantedAudio.current = false;
      setAudioPlaying(false);
      setAudioPaused(false);
      announce("O som não iniciou. Toque no headset para tentar novamente.");
    }
  }, [announce, playSelected, stopAudio]);

  const interact = useCallback(
    (item: SceneItem) => {
      if (item === "headset") {
        void toggleAudio();
      } else if (item === "coffee") {
        setCoffeePulse((pulse) => pulse + 1);
        announce("Uma pausa para o café. Depois, mais código.");
      } else {
        clearTimeout(navigationTimer.current);
        setNotebookOpen(true);
        announce("Abrindo os projetos…");
        navigationTimer.current = setTimeout(
          () => {
            const projects = document.getElementById("projetos");
            if (projects) {
              if (location.hash !== "#projetos")
                history.pushState(null, "", "#projetos");
              document
                .getElementById("projects-title")
                ?.focus({ preventScroll: true });
              projects.scrollIntoView({
                behavior: reducedMotion ? "instant" : "smooth",
                block: "start",
              });
            }
            setNotebookOpen(false);
          },
          reducedMotion ? 0 : 700,
        );
      }
    },
    [announce, reducedMotion, toggleAudio],
  );

  const setVolume = useCallback((value: number) => {
    const next = Math.max(0, Math.min(100, value));
    volumeRef.current = next;
    setVolumeState(next);
    engine.current?.setVolume(next / 100);
    if (media.current) media.current.volume = next / 100;
  }, []);

  const setTrack = useCallback(
    (next: HeadsetTrack) => {
      if (!headsetTracks.some((item) => item.id === next)) return;
      trackRef.current = next;
      setTrackState(next);
      const selected = headsetTracks.find((item) => item.id === next)!;
      if (selected.media === "file") {
        engine.current?.pause();
        setDuration(0);
        prepareMedia(selected.src);
      } else {
        media.current?.pause();
        setDuration(headsetLoopSeconds);
        engine.current?.setTrack(selected.id);
      }
      setProgress(0);
      if (wantedAudio.current && !paused.current) {
        void playSelected().catch(() => {
          if (trackRef.current !== next) return;
          paused.current = true;
          setAudioPaused(true);
          announce(
            "Não foi possível tocar esta faixa. Escolha outra na lista.",
          );
        });
      }
      if (selected) announce(`${selected.name} selecionado.`);
    },
    [announce, playSelected, prepareMedia],
  );

  const stepTrack = useCallback(
    (step: number) => {
      const currentIndex = headsetTracks.findIndex(
        (item) => item.id === trackRef.current,
      );
      const next =
        headsetTracks[
          (currentIndex + step + headsetTracks.length) % headsetTracks.length
        ];
      setTrack(next.id);
    },
    [setTrack],
  );

  const togglePlayback = useCallback(async () => {
    if (!wantedAudio.current) return;
    if (audioPaused) {
      try {
        await playSelected();
        if (mounted.current && wantedAudio.current) {
          paused.current = false;
          setAudioPaused(false);
        }
      } catch {
        announce("O áudio não reiniciou. Tente novamente pelo headset.");
      }
    } else {
      engine.current?.pause();
      media.current?.pause();
      paused.current = true;
      setAudioPaused(true);
    }
  }, [announce, audioPaused, playSelected]);

  const seekAudio = useCallback((seconds: number) => {
    const selected = headsetTracks.find((item) => item.id === trackRef.current);
    if (selected?.media === "file" && media.current)
      media.current.currentTime = seconds;
    else engine.current?.seek(seconds);
    setProgress(seconds);
  }, []);

  return {
    notebookOpen,
    coffeePulse,
    audioPlaying,
    audioPaused,
    track,
    progress,
    duration,
    volume,
    message,
    interact,
    setVolume,
    setTrack,
    stepTrack,
    togglePlayback,
    seekAudio,
    stopAudio,
  };
}
