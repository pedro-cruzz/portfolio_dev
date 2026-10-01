"use client";

import { useState } from "react";
import {
  AudioLines,
  ListMusic,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { headsetTracks, type HeadsetTrack } from "@/lib/ambient-audio";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds <= 0) return "0:00";
  const whole = Math.floor(seconds);
  return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, "0")}`;
}

export default function AmbientControl({
  track,
  paused,
  progress,
  duration,
  volume,
  onTrack,
  onStep,
  onTogglePlayback,
  onSeek,
  onVolume,
  onStop,
}: {
  track: HeadsetTrack;
  paused: boolean;
  progress: number;
  duration: number;
  volume: number;
  onTrack: (value: HeadsetTrack) => void;
  onStep: (step: number) => void;
  onTogglePlayback: () => void;
  onSeek: (seconds: number) => void;
  onVolume: (value: number) => void;
  onStop: () => void;
}) {
  const [listOpen, setListOpen] = useState(false);
  const selected = headsetTracks.find((item) => item.id === track)!;

  return (
    <aside
      className="ambient-control"
      aria-label="Controle do áudio do headset"
    >
      <div className="player-heading">
        <span className="mono">HEADSET / TRILHA SONORA</span>
        <button
          type="button"
          onClick={onStop}
          aria-label="Desligar áudio do headset"
        >
          <X size={16} />
        </button>
      </div>
      <div className="player-now">
        <span className="player-art" data-track={track} aria-hidden="true">
          <AudioLines size={25} strokeWidth={1.5} />
        </span>
        <div>
          <span className="mono player-status">
            {paused ? "PAUSADO" : "TOCANDO AGORA"}
          </span>
          <strong>{selected.name}</strong>
          <small>
            {selected.artist} · {selected.kind}
          </small>
        </div>
      </div>
      {selected.media === "file" && (
        <p className="player-credit">
          Crédito: {selected.artist} ·{" "}
          <a href={selected.source} target="_blank" rel="noreferrer">
            origem
          </a>{" "}
          ·{" "}
          <a
            href={
              selected.license === "CC0"
                ? "https://creativecommons.org/publicdomain/zero/1.0/"
                : "https://creativecommons.org/licenses/by/3.0/"
            }
            target="_blank"
            rel="noreferrer"
          >
            {selected.license}
          </a>
        </p>
      )}
      <div className="player-timeline">
        <input
          type="range"
          min="0"
          max={duration || 1}
          step="0.1"
          value={Math.min(progress, duration || 1)}
          onChange={(event) => onSeek(Number(event.target.value))}
          aria-label="Progresso da faixa"
          aria-valuetext={`${formatTime(progress)} de ${duration ? formatTime(duration) : "--:--"}`}
        />
        <div className="mono">
          <span>{formatTime(progress)}</span>
          <span>{duration ? formatTime(duration) : "--:--"}</span>
        </div>
      </div>
      <div className="player-controls">
        <button
          type="button"
          className="player-list-button"
          onClick={() => setListOpen((open) => !open)}
          aria-label={
            listOpen ? "Ocultar lista de faixas" : "Ver lista de faixas"
          }
          aria-expanded={listOpen}
          aria-controls="headset-track-list"
        >
          <ListMusic size={18} />
        </button>
        <div className="player-transport">
          <button
            type="button"
            onClick={() => onStep(-1)}
            aria-label="Faixa anterior"
          >
            <SkipBack size={18} fill="currentColor" />
          </button>
          <button
            type="button"
            className="player-play"
            onClick={onTogglePlayback}
            aria-label={paused ? "Reproduzir áudio" : "Pausar áudio"}
          >
            {paused ? (
              <Play size={17} fill="currentColor" />
            ) : (
              <Pause size={17} fill="currentColor" />
            )}
          </button>
          <button
            type="button"
            onClick={() => onStep(1)}
            aria-label="Próxima faixa"
          >
            <SkipForward size={18} fill="currentColor" />
          </button>
        </div>
        <div className="player-volume">
          {volume ? <Volume2 size={17} /> : <VolumeX size={17} />}
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(event) => onVolume(Number(event.target.value))}
            aria-label="Volume do headset"
            aria-valuetext={`${volume}%`}
          />
        </div>
      </div>
      <div
        className="player-track-list"
        id="headset-track-list"
        hidden={!listOpen}
      >
        {headsetTracks.map((item, index) => (
          <button
            key={item.id}
            type="button"
            className={item.id === track ? "is-current" : undefined}
            onClick={() => onTrack(item.id)}
            aria-label={`Selecionar ${item.name}`}
            aria-current={item.id === track ? "true" : undefined}
          >
            <span className="mono">{String(index + 1).padStart(2, "0")}</span>
            <span>
              <strong>{item.name}</strong>
              <small>{item.kind}</small>
            </span>
            {item.id === track && <AudioLines size={15} aria-hidden="true" />}
          </button>
        ))}
      </div>
    </aside>
  );
}
