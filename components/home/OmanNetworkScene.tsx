import type { CSSProperties } from "react";

import styles from "./OmanNetworkScene.module.css";

export type RegionName = "GCC" | "ASIA" | "EUROPE" | "AFRICA";

type Geometry = {
  path: string;
  node: [number, number];
  label: [number, number];
  map: { x: number; y: number; width: number; height: number };
};

type Route = {
  name: RegionName;
  asset: string;
  desktop: Geometry;
  mobile: Geometry;
  strength: { fill: number; outline: number; activeFill: number; activeOutline: number };
};

const routes: Route[] = [
  {
    name: "GCC",
    asset: "/sa.svg",
    strength: { fill: 0.16, outline: 0.52, activeFill: 0.23, activeOutline: 0.7 },
    desktop: {
      path: "M735 240C660 235 588 252 500 282",
      node: [500, 282],
      label: [374, 216],
      map: { x: 360, y: 226, width: 145, height: 119 },
    },
    mobile: {
      path: "M240 115C210 113 177 118 145 126",
      node: [145, 126],
      label: [92, 99],
      map: { x: 88, y: 104, width: 62, height: 51 },
    },
  },
  {
    name: "ASIA",
    asset: "/azie.svg",
    strength: { fill: 0.14, outline: 0.46, activeFill: 0.21, activeOutline: 0.64 },
    desktop: {
      path: "M735 240C772 211 796 169 800 126",
      node: [800, 126],
      label: [779, 23],
      map: { x: 745, y: 31, width: 145, height: 113 },
    },
    mobile: {
      path: "M240 115C270 101 292 88 305 76",
      node: [305, 76],
      label: [297, 25],
      map: { x: 282, y: 34, width: 78, height: 61 },
    },
  },
  {
    name: "EUROPE",
    asset: "/europe.svg",
    strength: { fill: 0.12, outline: 0.4, activeFill: 0.19, activeOutline: 0.59 },
    desktop: {
      path: "M735 240C660 151 536 130 405 170",
      node: [405, 170],
      label: [235, 43],
      map: { x: 210, y: 55, width: 215, height: 147 },
    },
    mobile: {
      path: "M240 115C196 78 151 65 101 69",
      node: [101, 69],
      label: [38, 25],
      map: { x: 27, y: 34, width: 82, height: 56 },
    },
  },
  {
    name: "AFRICA",
    asset: "/africa.svg",
    strength: { fill: 0.1, outline: 0.36, activeFill: 0.17, activeOutline: 0.55 },
    desktop: {
      path: "M735 240C635 325 512 375 375 397",
      node: [375, 397],
      label: [235, 336],
      map: { x: 210, y: 345, width: 185, height: 185 },
    },
    mobile: {
      path: "M240 115C195 151 155 168 110 177",
      node: [110, 177],
      label: [47, 241],
      map: { x: 42, y: 159, width: 74, height: 74 },
    },
  },
];

const omanGeometry = {
  desktop: {
    map: { x: 485, y: 116, width: 315, height: 315 },
    origin: [735, 240] as [number, number],
    halo: { cx: 650, cy: 296, rx: 215, ry: 240 },
  },
  mobile: {
    map: { x: 145, y: 68, width: 120, height: 120 },
    origin: [240, 115] as [number, number],
    halo: { cx: 210, cy: 130, rx: 84, ry: 92 },
  },
};

type NetworkDiagramProps = {
  mode: "desktop" | "mobile";
  activeRegion: RegionName | null;
  routeFocusRegion: RegionName | null;
  pulseRegion: RegionName | null;
  pulseKey: number;
  started: boolean;
  onRegionEnter?: (region: RegionName) => void;
  onRegionLeave?: () => void;
  onRegionSelect?: (region: RegionName) => void;
};

function NetworkDiagram({
  mode,
  activeRegion,
  routeFocusRegion,
  pulseRegion,
  pulseKey,
  started,
  onRegionEnter,
  onRegionLeave,
  onRegionSelect,
}: NetworkDiagramProps) {
  const isMobile = mode === "mobile";
  const oman = omanGeometry[mode];
  const prefix = `oman-${mode}`;
  const routeDelays = isMobile ? [1250, 1500, 1750, 2000] : [2200, 2500, 2800, 3100];
  const entranceTravelDuration = isMobile ? 950 : 1400;
  const interactiveTravelDuration = isMobile ? 1450 : 2100;

  return (
    <svg
      className={isMobile ? styles.mobileNetwork : styles.desktopNetwork}
      viewBox={isMobile ? "0 0 390 260" : "0 0 900 620"}
      preserveAspectRatio="xMidYMid meet"
      role="group"
      aria-label="Oman connections to the GCC, Asia, Europe and Africa"
    >
      <defs>
        <radialGradient id={`${prefix}-halo`}>
          <stop offset="0" stopColor="#e1b766" stopOpacity=".15" />
          <stop offset=".5" stopColor="#c9953d" stopOpacity=".05" />
          <stop offset="1" stopColor="#c9953d" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${prefix}-destination-glow`}>
          <stop offset="0" stopColor="#d8ad5d" stopOpacity=".12" />
          <stop offset=".55" stopColor="#c9953d" stopOpacity=".035" />
          <stop offset="1" stopColor="#c9953d" stopOpacity="0" />
        </radialGradient>
        <filter id={`${prefix}-outline`} x="-8%" y="-8%" width="116%" height="116%" colorInterpolationFilters="sRGB">
          <feMorphology in="SourceAlpha" operator="dilate" radius={isMobile ? "0.65" : "0.9"} result="expanded" />
          <feComposite in="expanded" in2="SourceAlpha" operator="out" result="edge" />
          <feFlood floodColor="#c2a36b" floodOpacity=".9" result="bronze" />
          <feComposite in="bronze" in2="edge" operator="in" />
        </filter>
        <filter id={`${prefix}-node-glow`} x="-180%" y="-180%" width="460%" height="460%">
          <feGaussianBlur stdDeviation={isMobile ? "1.8" : "2.4"} result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        {routes.map((route, index) => (
          <linearGradient
            key={route.name}
            id={`${prefix}-route-${index}`}
            gradientUnits="userSpaceOnUse"
            x1={oman.origin[0]}
            y1={oman.origin[1]}
            x2={route[mode].node[0]}
            y2={route[mode].node[1]}
          >
            <stop offset="0" stopColor="#d7ad5d" />
            <stop offset="1" stopColor="#9f855c" />
          </linearGradient>
        ))}
      </defs>

      <ellipse className={styles.mapHalo} cx={oman.halo.cx} cy={oman.halo.cy} rx={oman.halo.rx} ry={oman.halo.ry} fill={`url(#${prefix}-halo)`} />

      <g className={styles.mapGroup}>
        <image className={styles.omanFill} href="/om.svg" {...oman.map} preserveAspectRatio="xMidYMid meet" />
        <image className={styles.omanDetail} href="/om.svg" {...oman.map} preserveAspectRatio="xMidYMid meet" />
        <image className={styles.omanOutline} href="/om.svg" {...oman.map} preserveAspectRatio="xMidYMid meet" filter={`url(#${prefix}-outline)`} />
      </g>

      <g className={styles.routeSystem}>
        {routes.map((route, index) => {
          const geometry = route[mode];
          const routeDelay = routeDelays[index];
          const destinationDelay = routeDelay + entranceTravelDuration;
          const selected = activeRegion === route.name;
          const routeFocused = routeFocusRegion === route.name || pulseRegion === route.name;
          const muted = (activeRegion !== null || routeFocusRegion !== null) && !selected && !routeFocused;
          const mapStyle = {
            "--map-fill": route.strength.fill,
            "--map-outline": route.strength.outline,
            "--map-fill-active": route.strength.activeFill,
            "--map-outline-active": route.strength.activeOutline,
          } as CSSProperties;
          const routeStyle = {
            animationDelay: `${routeDelay}ms`,
            "--route-rest": route.name === "GCC" ? 0.34 : 0.29,
          } as CSSProperties;

          return (
            <g
              key={route.name}
              className={`${styles.routeGroup} ${selected ? styles.regionActive : ""} ${routeFocused ? styles.routeFocused : ""} ${muted ? styles.regionMuted : ""}`}
              data-region={route.name.toLowerCase()}
              role="button"
              tabIndex={0}
              aria-label={`Highlight ${route.name} connection`}
              aria-pressed={selected}
              onPointerEnter={() => onRegionEnter?.(route.name)}
              onPointerLeave={() => onRegionLeave?.()}
              onFocus={() => onRegionEnter?.(route.name)}
              onBlur={() => onRegionLeave?.()}
              onClick={() => onRegionSelect?.(route.name)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onRegionSelect?.(route.name);
                }
              }}
            >
              <circle
                className={styles.destinationGlow}
                cx={geometry.node[0]}
                cy={geometry.node[1]}
                r={isMobile ? "30" : "58"}
                fill={`url(#${prefix}-destination-glow)`}
              />
              <g className={styles.destination} style={{ animationDelay: `${destinationDelay}ms` }}>
                <image className={styles.destinationFill} href={route.asset} {...geometry.map} preserveAspectRatio="xMidYMid meet" style={mapStyle} />
                <image className={styles.destinationOutline} href={route.asset} {...geometry.map} preserveAspectRatio="xMidYMid meet" filter={`url(#${prefix}-outline)`} style={mapStyle} />
              </g>
              <path className={styles.baseRoute} d={geometry.path} pathLength="1" style={routeStyle} />
              <path className={styles.activeRoute} d={geometry.path} pathLength="1" stroke={`url(#${prefix}-route-${index})`} style={routeStyle} />
              <circle className={styles.endpoint} cx={geometry.node[0]} cy={geometry.node[1]} r={isMobile ? "1.8" : "2.1"} style={{ animationDelay: `${destinationDelay}ms` }} />
              <circle
                className={styles.destinationRipple}
                cx={geometry.node[0]}
                cy={geometry.node[1]}
                r={isMobile ? "4.5" : "6"}
                style={{ animationDelay: `${destinationDelay}ms` }}
              />
              <g className={styles.routeLabel} style={{ animationDelay: `${destinationDelay + (isMobile ? 140 : 300)}ms` }}>
                <path d={`M${geometry.label[0]} ${geometry.label[1] + (isMobile ? 6 : 8)}h${isMobile ? 16 : 22}`} />
                <text x={geometry.label[0]} y={geometry.label[1]}>{route.name}</text>
              </g>

              {started ? (
                <g className={styles.entrancePulse}>
                  <circle className={styles.pulseTail} r={isMobile ? "2.2" : "3.2"}>
                    <animate attributeName="opacity" values="0;0.22;0.18;0" keyTimes="0;0.12;0.78;1" dur={`${entranceTravelDuration}ms`} begin={`${routeDelay + 90}ms`} fill="freeze" />
                    <animateMotion path={geometry.path} dur={`${entranceTravelDuration}ms`} begin={`${routeDelay + 90}ms`} fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="0.2 0 0.2 1" />
                  </circle>
                  <circle className={styles.pulseCore} r={isMobile ? "1.7" : "2.25"}>
                    <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.88;1" dur={`${entranceTravelDuration}ms`} begin={`${routeDelay}ms`} fill="freeze" />
                    <animateMotion path={geometry.path} dur={`${entranceTravelDuration}ms`} begin={`${routeDelay}ms`} fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="0.2 0 0.2 1" />
                  </circle>
                </g>
              ) : null}

              {pulseRegion === route.name ? (
                <g key={`${route.name}-${pulseKey}`} className={styles.travelPulse}>
                  {!isMobile ? (
                    <circle className={styles.pulseTail} r="3.2">
                      <animate attributeName="opacity" values="0;0.22;0.18;0" keyTimes="0;0.12;0.78;1" dur={`${interactiveTravelDuration}ms`} begin="90ms" fill="freeze" />
                      <animateMotion path={geometry.path} dur={`${interactiveTravelDuration}ms`} begin="90ms" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="0.2 0 0.2 1" />
                    </circle>
                  ) : null}
                  <circle className={styles.pulseCore} r={isMobile ? "1.8" : "2.25"}>
                    <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.07;0.9;1" dur={`${interactiveTravelDuration}ms`} begin="0s" fill="freeze" />
                    <animateMotion path={geometry.path} dur={`${interactiveTravelDuration}ms`} begin="0s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="0.2 0 0.2 1" />
                  </circle>
                  <circle
                    className={styles.pulseArrivalRipple}
                    cx={geometry.node[0]}
                    cy={geometry.node[1]}
                    r={isMobile ? "3" : "4"}
                  >
                    <animate attributeName="opacity" values="0;0.4;0" keyTimes="0;0.18;1" dur={isMobile ? "450ms" : "620ms"} begin={`${interactiveTravelDuration}ms`} fill="freeze" />
                    <animate attributeName="r" values={isMobile ? "3;7" : "4;10"} dur={isMobile ? "450ms" : "620ms"} begin={`${interactiveTravelDuration}ms`} fill="freeze" />
                  </circle>
                </g>
              ) : null}
            </g>
          );
        })}
      </g>

      <g className={styles.originGroup}>
        <circle className={styles.originPulse} cx={oman.origin[0]} cy={oman.origin[1]} r={isMobile ? "9" : "12"} />
        <circle className={styles.originRing} cx={oman.origin[0]} cy={oman.origin[1]} r={isMobile ? "4.8" : "6"} />
        <circle className={styles.originCore} cx={oman.origin[0]} cy={oman.origin[1]} r={isMobile ? "2.3" : "2.8"} filter={`url(#${prefix}-node-glow)`} />
      </g>
    </svg>
  );
}

export default function OmanNetworkScene({
  started = false,
  activeRegion = null,
  routeFocusRegion = null,
  pulseRegion = null,
  pulseKey = 0,
  onRegionEnter,
  onRegionLeave,
  onRegionSelect,
}: {
  started?: boolean;
  activeRegion?: RegionName | null;
  routeFocusRegion?: RegionName | null;
  pulseRegion?: RegionName | null;
  pulseKey?: number;
  onRegionEnter?: (region: RegionName) => void;
  onRegionLeave?: () => void;
  onRegionSelect?: (region: RegionName) => void;
}) {
  return (
    <div className={`${styles.scene} ${started ? styles.started : ""}`}>
      <div className={styles.tonalBackdrop} aria-hidden="true" />
      <NetworkDiagram
        mode="desktop"
        activeRegion={activeRegion}
        routeFocusRegion={routeFocusRegion}
        pulseRegion={pulseRegion}
        pulseKey={pulseKey}
        started={started}
        onRegionEnter={onRegionEnter}
        onRegionLeave={onRegionLeave}
        onRegionSelect={onRegionSelect}
      />
      <NetworkDiagram
        mode="mobile"
        activeRegion={activeRegion}
        routeFocusRegion={routeFocusRegion}
        pulseRegion={pulseRegion}
        pulseKey={pulseKey}
        started={started}
        onRegionEnter={onRegionEnter}
        onRegionLeave={onRegionLeave}
        onRegionSelect={onRegionSelect}
      />
    </div>
  );
}
