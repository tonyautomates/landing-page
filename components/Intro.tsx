"use client";

import {
  useEffect,
  useRef,
  useSyncExternalStore,
  type CSSProperties,
} from "react";
import { INTRO_PHOTOS } from "./introPhotos";

/*
  Intro: four photo boxes flash through the photos, then fade into the name
  "Marta Romão". The boxes never move, turn or change size.

  It plays once per visit. The small script in app/layout.tsx decides before
  the first paint and writes the answer to <html data-intro="play | done">.
  The whole choreography is CSS (app/intro.css), so it starts with the first
  paint and does not wait for React. This component only removes the overlay
  when it has finished and handles skipping.
*/

const NAME = "Marta Romão";
const SUBTITLE = "Przewodniczka · Portugalia inaczej";

// The four boxes, clockwise from the top left.
const BOXES = [
  { col: 0, row: 0 },
  { col: 1, row: 0 },
  { col: 1, row: 1 },
  { col: 0, row: 1 },
];

const SCROLL_KEYS = new Set([
  "ArrowUp",
  "ArrowDown",
  "PageUp",
  "PageDown",
  "Home",
  "End",
]);

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-intro"],
  });
  return () => observer.disconnect();
}
const getState = () => document.documentElement.dataset.intro ?? "done";
const getServerState = () => "play";

function finish() {
  document.documentElement.dataset.intro = "done";
}
function skip() {
  const root = document.documentElement;
  if (root.dataset.intro === "play") root.dataset.intro = "skip";
}

export default function Intro() {
  const state = useSyncExternalStore(subscribe, getState, getServerState);
  const active = state === "play" || state === "skip";
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!active || !root) return;

    // Keep the page still underneath while the intro is up.
    const block = (e: Event) => e.preventDefault();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        skip();
      } else if (SCROLL_KEYS.has(e.key)) {
        e.preventDefault();
      }
    };
    window.addEventListener("wheel", block, { passive: false });
    window.addEventListener("touchmove", block, { passive: false });
    window.addEventListener("keydown", onKey);

    // Safety net in case the end event is missed (for example when the
    // animation ended before React loaded): finish once the overlay's own
    // exit animation is over. Polling respects the background-tab pause.
    const safety = window.setInterval(() => {
      const own = root.getAnimations();
      if (own.every((a) => a.playState === "finished")) finish();
    }, 400);

    return () => {
      window.removeEventListener("wheel", block);
      window.removeEventListener("touchmove", block);
      window.removeEventListener("keydown", onKey);
      window.clearInterval(safety);
    };
  }, [active, state]);

  if (!active) return null;

  return (
    <div
      ref={rootRef}
      className="intro"
      onClick={skip}
      onAnimationEnd={(e) => {
        if (e.target !== e.currentTarget) return;
        if (
          e.animationName === "intro-exit" ||
          e.animationName === "intro-skip"
        ) {
          finish();
        }
      }}
    >
      <div className="intro-stage">
        <div className="intro-grid" aria-hidden="true">
          {BOXES.map((box, i) => (
            <div
              key={i}
              className="intro-box"
              style={
                { "--i": i, "--c": box.col, "--r": box.row } as CSSProperties
              }
            >
              {/* Every box shows all the photos in turn, two steps apart
                  from its neighbour, so no two boxes ever match. */}
              {INTRO_PHOTOS.map((_, k) => {
                const photo = INTRO_PHOTOS[(i * 2 + k) % INTRO_PHOTOS.length];
                return (
                  <div
                    key={k}
                    className="intro-photo"
                    data-filled={photo.src ? "" : undefined}
                    style={
                      {
                        "--k": k,
                        backgroundColor: photo.tone,
                        backgroundImage: photo.src
                          ? `url("${photo.src}")`
                          : undefined,
                      } as CSSProperties
                    }
                  >
                    {!photo.src && (
                      <span className="intro-photo-label">{photo.label}</span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="intro-title">
          <div className="intro-name-mask">
            <div className="intro-name" aria-label={NAME}>
              {Array.from(NAME, (char, n) => (
                <span
                  key={n}
                  aria-hidden="true"
                  className={char === " " ? "intro-space" : undefined}
                  style={{ "--n": n } as CSSProperties}
                >
                  {char}
                </span>
              ))}
            </div>
          </div>
          <div className="intro-line" />
          <div className="intro-sub-mask">
            <div className="intro-sub">{SUBTITLE}</div>
          </div>
        </div>
      </div>

      <button type="button" className="intro-skip" onClick={skip}>
        Pomiń
      </button>
    </div>
  );
}
