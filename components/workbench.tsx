"use client";

import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
  Component,
  type ReactNode,
  type RefObject,
} from "react";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import type { SceneItem } from "@/lib/portfolio";

type Theme = "dark" | "light";
type Props = {
  theme: Theme;
  notebookOpen: boolean;
  coffeePulse: number;
  audioPlaying: boolean;
  onSelect: (area: SceneItem) => void;
  reducedMotion: boolean;
  active: boolean;
};
type ActionRefs = RefObject<
  Partial<Record<SceneItem, HTMLButtonElement | null>>
>;
type SceneProps = Props & {
  highlighted: SceneItem | null;
  onHover: (item: SceneItem | null) => void;
  actionRefs: ActionRefs;
};
const blue = "#3584ff";
function Block({
  position = [0, 0, 0],
  size,
  color,
  radius = 0.04,
  metalness = 0.15,
  ...props
}: {
  position?: [number, number, number];
  size: [number, number, number];
  color: string;
  radius?: number;
  metalness?: number;
  rotation?: [number, number, number];
}) {
  return (
    <RoundedBox
      args={size}
      radius={Math.min(radius, ...size.map((value) => value / 2)) * 0.98}
      smoothness={2}
      position={position}
      castShadow
      receiveShadow
      {...props}
    >
      <meshStandardMaterial
        color={color}
        roughness={0.42}
        metalness={metalness}
      />
    </RoundedBox>
  );
}
function codeTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 650;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#0c1422";
  ctx.fillRect(0, 0, 1024, 650);
  ctx.fillStyle = "#182336";
  ctx.fillRect(0, 0, 1024, 52);
  ["#fc7770", "#ffc563", "#59c696"].forEach((c, i) => {
    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.arc(25 + i * 25, 25, 6, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.font = "18px monospace";
  ctx.fillStyle = "#adbbce";
  ctx.fillText("pedro / projetos.ts", 340, 33);
  ctx.fillStyle = "#101b2c";
  ctx.fillRect(0, 52, 205, 598);
  ctx.font = "17px monospace";
  [
    "PROJETOS",
    "",
    "  ija-system",
    "  pose-lab",
    "  mente-saudavel",
    "  higiflow",
    "  copa-2026",
    "  ecotron",
  ].forEach((line, i) => {
    ctx.fillStyle = i === 2 || i === 3 ? "#91bfff" : "#96a8be";
    ctx.fillText(line, 20, 91 + i * 31);
  });
  const lines = [
    ["#a1b4cb", "// gestão de operações / anatomia 3D"],
    ["#91bfff", ""],
    ["#a69aff", "export const selectedProjects = ["],
    ["#d1dfef", "  {"],
    ["#7fceae", "    name: 'IJA System',"],
    ["#d1dfef", "    stack: ['Python', 'Flask', 'PostgreSQL']"],
    ["#d1dfef", "  },"],
    ["#d1dfef", "  {"],
    ["#7fceae", "    name: 'Pose Lab',"],
    ["#d1dfef", "    stack: ['Three.js', 'WebGL']"],
    ["#d1dfef", "  },"],
    ["#a69aff", "];"],
  ];
  ctx.font = "22px monospace";
  lines.forEach(([c, l], i) => {
    ctx.fillStyle = "#475a72";
    ctx.fillText(String(i + 1).padStart(2, " "), 222, 103 + i * 35);
    ctx.fillStyle = c;
    ctx.fillText(l, 272, 103 + i * 35);
  });
  ctx.fillStyle = "#2361bc";
  ctx.fillRect(0, 624, 1024, 26);
  ctx.fillStyle = "#e2edff";
  ctx.font = "15px monospace";
  ctx.fillText(
    "pedro-cruzz    projetos.ts                               UTF-8",
    25,
    643,
  );
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}
function Laptop({
  open,
  reducedMotion,
}: {
  open: boolean;
  reducedMotion: boolean;
}) {
  const lid = useRef<THREE.Group>(null);
  const texture = useMemo(codeTexture, []);
  useEffect(() => () => texture.dispose(), [texture]);
  useFrame((_, delta) => {
    if (lid.current) {
      lid.current.rotation.x = THREE.MathUtils.damp(
        lid.current.rotation.x,
        open ? -0.62 : -0.17,
        7,
        reducedMotion ? 1 : Math.min(delta, 0.1),
      );
    }
  });
  return (
    <group>
      <Block size={[3.1, 0.12, 2.04]} color="#485469" metalness={0.8} />
      <Block
        position={[0, 0.078, -0.2]}
        size={[2.78, 0.025, 0.91]}
        color="#131c29"
        radius={0.012}
      />
      {Array.from({ length: 5 }, (_, row) =>
        Array.from({ length: 12 }, (_, col) => (
          <Block
            key={`${row}-${col}`}
            position={[-1.24 + col * 0.226, 0.105, -0.55 + row * 0.168]}
            size={[0.174, 0.025, 0.115]}
            radius={0.009}
            color={row === 0 && col === 0 ? blue : "#343f50"}
          />
        )),
      )}
      <Block
        position={[0, 0.075, 0.62]}
        size={[1, 0.012, 0.53]}
        radius={0.03}
        color="#647085"
      />
      <group ref={lid} position={[0, 0.09, -0.91]} rotation={[-0.17, 0, 0]}>
        <Block
          position={[0, 1.02, 0]}
          size={[3.12, 2.06, 0.105]}
          color="#344153"
          metalness={0.85}
        />
        <mesh position={[0, 1.02, 0.056]}>
          <planeGeometry args={[2.94, 1.85]} />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
        <mesh position={[0, 2.017, 0.057]}>
          <circleGeometry args={[0.018, 12]} />
          <meshBasicMaterial color="#070b11" />
        </mesh>
      </group>
    </group>
  );
}
function Headset({ playing }: { playing: boolean }) {
  return (
    <group rotation={[0, -0.3, 0]}>
      <Block
        position={[0, 0.055, 0]}
        size={[1.12, 0.09, 0.8]}
        color="#394b63"
        radius={0.09}
        metalness={0.75}
      />
      <mesh position={[0, 0.8, -0.05]} castShadow>
        <cylinderGeometry args={[0.045, 0.065, 1.5, 20]} />
        <meshStandardMaterial
          color="#a2b3c7"
          metalness={0.85}
          roughness={0.25}
        />
      </mesh>
      <Block
        position={[0, 1.56, 0]}
        size={[0.38, 0.11, 0.3]}
        color="#27394f"
        radius={0.04}
      />
      <mesh position={[0, 1.29, 0]} castShadow>
        <torusGeometry args={[0.59, 0.06, 14, 48, Math.PI]} />
        <meshStandardMaterial
          color="#526783"
          metalness={0.6}
          roughness={0.35}
        />
      </mesh>
      <mesh position={[0, 1.29, 0]} castShadow>
        <torusGeometry args={[0.51, 0.043, 12, 48, Math.PI]} />
        <meshStandardMaterial color="#1b2637" roughness={0.9} />
      </mesh>
      {[-1, 1].map((side) => (
        <group
          key={side}
          position={[side * 0.59, 1.08, 0]}
          rotation={[0, 0, side * 0.12]}
        >
          <Block
            size={[0.18, 0.49, 0.38]}
            color="#3e526d"
            radius={0.085}
            metalness={0.5}
          />
          <Block
            position={[-side * 0.11, 0, 0]}
            size={[0.13, 0.45, 0.33]}
            color="#111c2a"
            radius={0.06}
          />
          <mesh position={[side * 0.096, 0, 0]}>
            <boxGeometry args={[0.012, 0.24, 0.04]} />
            <meshStandardMaterial
              color={blue}
              emissive={blue}
              emissiveIntensity={playing ? 2 : 0.1}
            />
          </mesh>
        </group>
      ))}
      <Block
        position={[0.72, 0.8, 0.19]}
        rotation={[-0.52, 0, 0]}
        size={[0.035, 0.05, 0.47]}
        color="#536c8b"
        radius={0.015}
      />
      <Block
        position={[0.72, 0.68, 0.39]}
        size={[0.075, 0.075, 0.12]}
        color="#151e2e"
        radius={0.025}
      />
    </group>
  );
}
function steamTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 64;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, "rgba(255,255,255,0.8)");
  gradient.addColorStop(0.4, "rgba(255,255,255,0.3)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(canvas);
}

function Mug({
  pulse,
  reducedMotion,
  theme,
}: {
  pulse: number;
  reducedMotion: boolean;
  theme: Theme;
}) {
  const mug = useRef<THREE.Group>(null);
  const steam = useRef<THREE.Group>(null);
  const started = useRef<number | null>(null);
  const texture = useMemo(steamTexture, []);
  useEffect(() => () => texture.dispose(), [texture]);
  useEffect(() => {
    if (pulse) started.current = performance.now();
  }, [pulse]);
  useFrame(() => {
    if (!mug.current || !steam.current) return;
    const elapsed =
      started.current === null
        ? 4
        : (performance.now() - started.current) / 1000;
    const active = elapsed < 3.2;
    const turn =
      active && !reducedMotion
        ? Math.sin(Math.min(1, elapsed / 2.4) * Math.PI)
        : 0;
    mug.current.rotation.y = turn * 0.7;
    mug.current.position.y = turn * 0.045;
    steam.current.visible = active;
    steam.current.children.forEach((child, i) => {
      const puff = child as THREE.Sprite;
      const age = reducedMotion ? 0.3 + i * 0.12 : (elapsed - i * 0.22) / 2.1;
      const visible = age > 0 && age < 1 && active;
      puff.visible = visible;
      if (!visible) return;
      puff.position.set(
        Math.sin(age * 5 + i) * 0.095,
        0.45 + age * 0.85,
        Math.cos(age * 4 + i) * 0.06,
      );
      puff.scale.setScalar(0.17 + age * 0.31);
      puff.material.opacity =
        Math.sin(age * Math.PI) * (theme === "light" ? 0.42 : 0.32);
    });
  });
  return (
    <group>
      <group ref={mug}>
        <mesh position={[0, 0.21, 0]} castShadow>
          <cylinderGeometry args={[0.23, 0.22, 0.42, 32, 1, true]} />
          <meshStandardMaterial color="#77899d" side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 0.365, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.208, 32]} />
          <meshStandardMaterial color="#1a1514" />
        </mesh>
        <mesh position={[0.24, 0.23, 0]}>
          <torusGeometry args={[0.14, 0.035, 10, 24]} />
          <meshStandardMaterial color="#77899d" />
        </mesh>
      </group>
      <group ref={steam} visible={false}>
        {Array.from({ length: 5 }, (_, i) => (
          <sprite key={i} raycast={() => {}}>
            <spriteMaterial
              map={texture}
              transparent
              opacity={0}
              depthWrite={false}
              color={theme === "light" ? "#6d809b" : "#dae8fc"}
            />
          </sprite>
        ))}
      </group>
    </group>
  );
}
function Selectable({
  area,
  position,
  onSelect,
  children,
  reducedMotion,
  highlighted,
  onHover,
  actionRefs,
}: {
  area: SceneItem;
  position: [number, number, number];
  onSelect: Props["onSelect"];
  children: ReactNode;
  reducedMotion: boolean;
  highlighted: SceneItem | null;
  onHover: SceneProps["onHover"];
  actionRefs: ActionRefs;
}) {
  const ref = useRef<THREE.Group>(null);
  const anchorRef = useRef<THREE.Group>(null);
  const projected = useMemo(() => new THREE.Vector3(), []);
  const anchor: [number, number, number] =
    area === "notebook"
      ? [-0.3, 1.1, -1.05]
      : area === "coffee"
        ? [0, 0.32, 0]
        : [0, 1.5, 0];
  useFrame(({ camera, size }, delta) => {
    if (!ref.current) return;
    const focus = highlighted === area && !reducedMotion;
    const t = reducedMotion ? 1 : 1 - Math.exp(-delta * 7);
    ref.current.position.y = THREE.MathUtils.lerp(
      ref.current.position.y,
      position[1] + (focus ? 0.035 : 0),
      t,
    );
    ref.current.scale.setScalar(
      THREE.MathUtils.lerp(ref.current.scale.x, focus ? 1.012 : 1, t),
    );
    // Project into a single DOM overlay, keeping buttons in the page's React root.
    const button = actionRefs.current[area];
    if (anchorRef.current && button) {
      anchorRef.current.getWorldPosition(projected).project(camera);
      button.style.transform = `translate3d(${((projected.x + 1) * size.width) / 2}px, ${((-projected.y + 1) * size.height) / 2}px, 0) translate(-50%, -50%)`;
      button.style.visibility = "visible";
    }
  });
  return (
    <group
      ref={ref}
      position={position}
      onPointerOver={(event: ThreeEvent<PointerEvent>) => {
        event.stopPropagation();
        onHover(area);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        onHover(null);
        document.body.style.cursor = "";
      }}
      onClick={(event) => {
        event.stopPropagation();
        onSelect(area);
      }}
    >
      {children}
      <group ref={anchorRef} position={anchor} />
    </group>
  );
}
function Scene(props: SceneProps) {
  const ref = useRef<THREE.Group>(null);
  const light = props.theme === "light";
  useFrame(({ pointer }, delta) => {
    if (!ref.current) return;
    const t = 1 - Math.exp(-delta * 2.8);
    ref.current.rotation.y = THREE.MathUtils.lerp(
      ref.current.rotation.y,
      -0.12 + (props.reducedMotion ? 0 : pointer.x * 0.085),
      t,
    );
    ref.current.rotation.x = THREE.MathUtils.lerp(
      ref.current.rotation.x,
      props.reducedMotion ? 0 : -pointer.y * 0.025,
      t,
    );
  });
  useEffect(
    () => () => {
      document.body.style.cursor = "";
    },
    [],
  );
  return (
    <>
      <ambientLight intensity={light ? 1.5 : 1.05} />
      <hemisphereLight
        args={[
          light ? "#dcecff" : "#779bc7",
          light ? "#738095" : "#182b45",
          1.6,
        ]}
      />
      <directionalLight
        position={[-3, 8, 5]}
        intensity={light ? 3 : 2.8}
        color={light ? "#fff9ee" : "#c0daff"}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-7}
        shadow-camera-right={7}
        shadow-camera-top={7}
        shadow-camera-bottom={-7}
        shadow-normalBias={0.04}
      />
      <pointLight
        position={[-4, 2, 0]}
        intensity={light ? 5 : 9}
        color="#2878ff"
        distance={9}
      />
      <pointLight
        position={[4, 4, -3]}
        intensity={10}
        color={light ? "#ffffff" : "#89b7ff"}
      />
      <group ref={ref}>
        <Block
          position={[0, -0.02, 0]}
          size={[6.8, 0.16, 4.25]}
          color={light ? "#dbe3ec" : "#1b293b"}
          radius={0.12}
          metalness={0.4}
        />
        <Block
          position={[0, 0.069, 0]}
          size={[5.95, 0.012, 3.55]}
          color={light ? "#cad5e0" : "#162131"}
          radius={0.1}
          metalness={0}
        />
        <Selectable area="notebook" position={[-0.58, 0.18, -0.16]} {...props}>
          <group scale={1.12}>
            <Laptop
              open={props.notebookOpen}
              reducedMotion={props.reducedMotion}
            />
          </group>
        </Selectable>
        <Selectable area="headset" position={[2.15, 0.12, -0.4]} {...props}>
          <Headset playing={props.audioPlaying} />
        </Selectable>
        <Selectable area="coffee" position={[-2.42, 0.13, 1.03]} {...props}>
          <group scale={1.35}>
            <Mug
              pulse={props.coffeePulse}
              reducedMotion={props.reducedMotion}
              theme={props.theme}
            />
          </group>
        </Selectable>
      </group>
    </>
  );
}
class SceneBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <div className="scene-fallback">
        <span>⌘</span>
        <small>Conheça os trabalhos na seção de projetos.</small>
      </div>
    ) : (
      this.props.children
    );
  }
}
export default function Workbench(props: Props) {
  const actionRefs = useRef<
    Partial<Record<SceneItem, HTMLButtonElement | null>>
  >({});
  const [hovered, setHovered] = useState<SceneItem | null>(null);
  const [focused, setFocused] = useState<SceneItem | null>(null);
  const highlighted = hovered ?? focused;
  return (
    <SceneBoundary>
      <div className="workbench-canvas">
        <Canvas
          shadows
          dpr={[1, 1.6]}
          orthographic
          camera={{ position: [6, 6.1, 10.2], zoom: 57, near: 0.1, far: 60 }}
          frameloop={props.active ? "always" : "never"}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          onCreated={({ camera, gl }) => {
            camera.lookAt(0, 0.5, 0);
            gl.setClearColor(0, 0);
          }}
          fallback={
            <div className="scene-fallback">
              Conheça os trabalhos na seção de projetos.
            </div>
          }
          aria-label="Bancada 3D com notebook, café e headset"
        >
          <Suspense fallback={null}>
            <ResponsiveCamera />
            <Scene
              {...props}
              highlighted={highlighted}
              onHover={setHovered}
              actionRefs={actionRefs}
            />
          </Suspense>
        </Canvas>
        <div className="workbench-hotspots">
          {(["notebook", "headset", "coffee"] as const).map((area) => {
            const hint =
              area === "notebook"
                ? "Explorar projetos"
                : area === "coffee"
                  ? "Uma pausa para o café"
                  : props.audioPlaying
                    ? "Desligar áudio"
                    : "Ouvir sons e música";
            const label =
              area === "notebook"
                ? "Abrir notebook e explorar projetos"
                : area === "coffee"
                  ? "Animar café"
                  : props.audioPlaying
                    ? "Desligar som pelo headset"
                    : "Ativar som pelo headset";
            return (
              <button
                key={area}
                ref={(element) => {
                  actionRefs.current[area] = element;
                }}
                type="button"
                className="workbench-hotspot"
                data-item={area}
                data-highlighted={highlighted === area}
                aria-label={label}
                aria-describedby="workbench-guide"
                aria-pressed={
                  area === "headset" ? props.audioPlaying : undefined
                }
                onPointerEnter={() => setHovered(area)}
                onPointerLeave={() => setHovered(null)}
                onFocus={() => setFocused(area)}
                onBlur={() => setFocused(null)}
                onClick={() => props.onSelect(area)}
              >
                <span className="hotspot-hint" aria-hidden="true">
                  {hint}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </SceneBoundary>
  );
}
function ResponsiveCamera() {
  const size = useRef(0);
  useFrame(({ camera, size: viewport }) => {
    if (
      size.current !== viewport.width &&
      camera instanceof THREE.OrthographicCamera
    ) {
      camera.zoom = Math.min(viewport.width / 8.8, viewport.height / 6.4);
      camera.updateProjectionMatrix();
      size.current = viewport.width;
    }
  });
  return null;
}
