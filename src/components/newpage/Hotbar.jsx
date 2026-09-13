import { useState, useEffect } from "react";

const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const NAV_ITEMS = new Array(9).fill(null);

const CLICKABLE_COUNT = SECTIONS.length;

const SLOT_ICONS = {
  0: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAA6ElEQVR4nO3bUQqCQBRA0YxW4P7X6Bbqp8/kOqEVds4CBrk83iDidDnIsiz3o85+ZZ7n6Yhzr0cceiYCBYGCQEGgsMvm//SNtdUeN5sJCgIFgYJAYWiJ/eoyHjWyvE1QECgIFAQKAoXVbX6WG2urtZvNBAWBgkBBoDD92zIeZYKCQEGgIFAQKHjVePKq8SaBgkBBoCBQECgIFAQKAgWBgkBBoCBQECgIFAQKAgWBgkBBoCBQECgIFAQKAgWBwu3bDzBq5D+LPT6fm6AgUBAoCBQECgIFgYJAQaAgUBAoCBQECgIFgYJA4QE5mhxWiWJukAAAAABJRU5ErkJggg==",
  1: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAA40lEQVR4nO3aQQ6CQBAAQfAJ+/838gW966FMYFGx6240nWFcxHU52bZt9z2vH2OsR32Wd9zOfLNfVCAoEEy/nvfuHJm9k5ogKBAUCA6/fmfvHDl6JzVBUCAoEBQICgQFggJBgaBAUCAoEBQICgQFggJBv0lDEwQFggLBqc+5l6Vn85dTIChQknyx7sWgbzEoEBQI+n8QNEFQICgQ8Hr99E6ZTTurCYICQYGgQFAgKBAUCF7OAFc/98jzuagJggJBgaBAUCAoEBQICgQFggJBgWD993svaYKgQFAgKBAUCAoEBYIHvKIoSNMoR4EAAAAASUVORK5CYII=",
  2: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAAyElEQVR4nO3ZuwnEMBBAwfNxFaj/GtWCnRoueIE/YDOTKRASj812+bzMnHM9cn+MsezP32PfeT+BgkBBoCBQECgIFAQKAgWBgkBBoCBQECgIFAQKAgWBgkBBoCBQECgIFH53P3j23upqJigIFAQKAgWBgkBBoCBQECgIFAQKAgWBgkBBoCBQECgIFAQKAgWBgkBBoPC3F3va3upqJigIFAQKAgWBgkBBoCBQECgIFAQKAgWBgkBBoCBQECgIFAQKAgWBgkBBoLABr/wMlKu6TGYAAAAASUVORK5CYII=",
  3: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAA5UlEQVR4nO3cwQmEQBAAQb0QzD9GU7j776cRGTmkKoB9NOM8lsV9G3ae53fy/OM49snzP5OHv4FAQaBw+fud3inTru4sExQECgIFgYJAQaAgUBAoCBQECgIFgYJAQaAgULh9n/vv90N376xNUBAoCBQECgIFgYJAQaAgUBAoCBRG39Zsm/dBrydQECiM76DV3Z00vXNWJigIFAQKj++gVe2kp3fOygQFgYJAQaAgUBAoCBQECgIFgYJAwZ10MEFBoCBQECgIFAQKAgXvpIMJCgIFgYJAQaAgUBAo+H9QMEFBoCBQ+AGZKiSIEEz+kAAAAABJRU5ErkJggg==",
  4: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAA0ElEQVR4nO3bQQqDMBRAQS09gfc/o1do9+niUaJU7MwBQnx8QhZxWQB+Z51dYN/31xEbOcu2bVPf+DhqI3clUBAoCBQECgIFgcLHHeHq95qzjfcmExQECgKF9d/PnGKCgkBBoCBQECgIFAQKAgWBgkBBoCBQECgIFAQKAgWBgkBBoCBQECgIFAQKAgWBgkBBoCBQECgIFAQKAgWBgkBBoOCd9MA76S8JFAQKz6MXnP1H9GpMUBAoCBSmz6C7nTkjExQECgIFgYJAQaAgEMCFvQGIzBC49IRybAAAAABJRU5ErkJggg==",
};

const HEART_ICON =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAoElEQVR4nGNkwA7+YxFjJEIODphwGEwxQLYJ7pK3MioYCoWf3CEoh2wmzVxM06D4z8CA6kWhx7cZGBgYGN7JqpJsICxYaOZiFmyC5LgUHQy9yIMHxZonPHDBEJkvJBmCrBcG6JvzZjIYMDAwEO/y4ZPzsIH/DAyIIGFgQAQLckSlM1zAaQ7dXQwDGBGK5Eq8+ode5JEC/jNgr++wApq5GAA/iSXyDHLPPQAAAABJRU5ErkJggg==";

const HUNGER_ICON =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAA4UlEQVR4nN2VMQ4BQRRA38qSSKyIqBSiEXEAhYpKqVHZs1AIZ6HSuIHKEUS22QaNQmynGQVmNnY2m5VMhFf+/2fy/vzJjIUeoYlZMbVaMmmK0xC2kJaHThuAzeUqk+5ur1sTizFjo0chQLUPUF1OADiOZjLm9W0AetPt+3ot5o0XraYMdktFQFkCnIMbABUnJ2Mh+4j57w3P5tmGu9vLezweNgConfKysFzIAupIkjBq/EIOYL7yBCjzT/i94SU9KLrnUyX99WOT+iCS+5pxEgJABL7a0KkD/zi8JGL/RmPGd3i0LTDo2YZoAAAAAElFTkSuQmCC";

const XP_TILE =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAICAYAAADwdn+XAAABCGlDQ1BJQ0MgUHJvZmlsZQAAeJxjYGA8wQAELAYMDLl5JUVB7k4KEZFRCuwPGBiBEAwSk4sLGHADoKpv1yBqL+viUYcLcKakFicD6Q9ArFIEtBxopAiQLZIOYWuA2EkQtg2IXV5SUAJkB4DYRSFBzkB2CpCtkY7ETkJiJxcUgdT3ANk2uTmlyQh3M/Ck5oUGA2kOIJZhKGYIYnBncAL5H6IkfxEDg8VXBgbmCQixpJkMDNtbGRgkbiHEVBYwMPC3MDBsO48QQ4RJQWJRIliIBYiZ0tIYGD4tZ2DgjWRgEL7AwMAVDQsIHG5TALvNnSEfCNMZchhSgSKeDHkMyQx6QJYRgwGDIYMZAKbWPz9HbOBQAAAA00lEQVR4nKWRPUoEURCEv+p5GxmYq4E3MDPzFAqCFzFfLyIIZgYeQiNBPIDiD5q4oMmOOvNet8FbZllcDLSioqu7i67WaH01QsFfkUrzBb5C4/NiCMABm1UqX/RxsA901e5Fcjh5vB6kg82tpW6n9zcDPx/f0r2Cdo83IiEO97cHUR64Kj86uyAVm3kGrszd5YTuCdpPI0k9GUNeFu0iYWE0DsUyBgiQat/U64HaGY+WJvj+0vNbtm8PoM5I+XkNqFtDDEN5MmUe4k+oL+Q2of++8RsN/FE+9zv3iAAAAABJRU5ErkJggg==";

export default function Hotbar() {
  const [active, setActive] = useState(0);
  const [xpPercent, setXpPercent] = useState(0);

  const goTo = (i) => {
    const el = document.getElementById(SECTIONS[i].id);
    if (!el) return;

    const root = document.documentElement;
    const restore = () => {
      root.style.scrollSnapType = "";
    };
    root.style.scrollSnapType = "none";
    window.addEventListener("scrollend", restore, { once: true });
    setTimeout(restore, 1000);

    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const handleKey = (e) => {
      const n = parseInt(e.key, 10);
      if (n >= 1 && n <= CLICKABLE_COUNT) goTo(n - 1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    let rafId = null;

    const update = () => {
      rafId = null;
      const mid = window.innerHeight / 2;
      let current = 0;
      for (let i = 0; i < CLICKABLE_COUNT; i++) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.getBoundingClientRect().top <= mid) current = i;
      }
      setActive(current);

      // overall page scroll progress drives the XP bar, 0-100
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      setXpPercent(Math.min(100, Math.max(0, pct)));
    };
    const onScroll = () => {
      if (rafId === null) rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        bottom: "1.25rem",
        width: "100%",
        background: "transparent",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Press Start 2P', monospace",
        imageRendering: "pixelated",
        zIndex: 20,
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

        .slot {
          position: relative;
          width: 52px;
          height: 52px;
          background: #8b8b8b;
          background-image:
            linear-gradient(135deg, rgba(255,255,255,0.35) 0%, transparent 8%, transparent 92%, rgba(0,0,0,0.35) 100%);
          border-style: solid;
          border-width: 3px;
          border-top-color: #373737;
          border-left-color: #373737;
          border-right-color: #ffffff;
          border-bottom-color: #ffffff;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.05s ease;
        }

        .slot-inner {
          width: 100%;
          height: 100%;
          background: #3d3d3d;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .slot:hover .slot-inner {
          background: #4a4a4a;
        }

        .slot:active {
          transform: scale(0.95);
        }

        .slot-disabled:hover .slot-inner {
          background: #3d3d3d;
        }

        .hotbar-frame {
          background: #545454;
          border: 4px solid #262626;
          box-shadow:
            inset 2px 2px 0 rgba(255,255,255,0.25),
            inset -2px -2px 0 rgba(0,0,0,0.4),
            0 6px 0 rgba(0,0,0,0.25);
          padding: 5px;
          display: flex;
          gap: 4px;
          border-radius: 2px;
        }

        .kbd {
          position: absolute;
          top: 1px;
          left: 3px;
          font-size: 7px;
          color: #e8e8e8;
          text-shadow: 1px 1px 0 #000;
          user-select: none;
        }

        @keyframes heart-ripple-bounce {
          0%, 20%, 100% {
            transform: translateY(0);
          }
          8% {
            transform: translateY(-6px);
          }
          16% {
            transform: translateY(0);
          }
        }

        .vitals-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }

        .icon-group {
          display: flex;
          gap: 0;
        }

        .heart-icon {
          width: 22px;
          height: 22px;
          image-rendering: pixelated;
          animation: heart-ripple-bounce 2.4s ease-in-out infinite;
        }

        .hunger-icon {
          width: 22px;
          height: 22px;
          image-rendering: pixelated;
        }

        .xp-wrap {
          position: relative;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .xp-level {
          font-size: 11px;
          color: #6fff2b;
          text-shadow:
            1px 0 #2a5c00,
            -1px 0 #2a5c00,
            0 1px #2a5c00,
            0 -1px #2a5c00;
          margin-bottom: 2px;
          user-select: none;
        }

        .xp-bar-track {
          position: relative;
          width: 100%;
          height: 8px;
          background: #04150a;
          border: 2px solid #000;
          box-sizing: border-box;
          overflow: hidden;
        }

        .xp-bar-fill {
          height: 100%;
          background-image: url(${XP_TILE});
          background-repeat: repeat-x;
          background-size: 16px 100%;
          image-rendering: pixelated;
          transition: width 0.15s ease-out;
        }

      `}</style>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          gap: "6px",
          transform: "scale(0.8)",
          transformOrigin: "bottom center",
        }}
      >
        <div className="vitals-row" style={{ marginBottom: "-9px", transform: "translateY(6px)" }}>
          <div className="icon-group">
            {Array.from({ length: 10 }).map((_, i) => (
              <img
                key={i}
                src={HEART_ICON}
                alt="heart"
                className="heart-icon"
                style={{ animationDelay: `${i * 0.08}s` }}
              />
            ))}
          </div>
          <div className="icon-group">
            {Array.from({ length: 10 }).map((_, i) => (
              <img
                key={i}
                src={HUNGER_ICON}
                alt="hunger"
                className="hunger-icon"
                style={i > 0 ? { marginLeft: "-2px" } : undefined}
              />
            ))}
          </div>
        </div>

        <div className="xp-wrap">
          <span className="xp-level">{active + 1}</span>
          <div className="xp-bar-track">
            <div className="xp-bar-fill" style={{ width: `${xpPercent}%` }} />
          </div>
        </div>

        <div className="hotbar-frame" aria-label="Section navigation">
          {NAV_ITEMS.map((_, i) => {
            const isClickable = i < CLICKABLE_COUNT;
            const isActive = isClickable && active === i;
            return (
              <div
                key={i}
                className={`slot${isClickable ? "" : " slot-disabled"}`}
                onClick={isClickable ? () => goTo(i) : undefined}
                aria-label={isClickable ? SECTIONS[i].label : undefined}
                style={
                  isActive
                    ? {
                        borderTopColor: "#ffffff",
                        borderLeftColor: "#ffffff",
                        borderRightColor: "#dcdcdc",
                        borderBottomColor: "#dcdcdc",
                        boxShadow: "0 0 0 2px #ffffff, 0 0 10px 2px rgba(255,255,255,0.7)",
                      }
                    : undefined
                }
              >
                {isClickable && <span className="kbd">{i + 1}</span>}
                <div className="slot-inner">
                  {SLOT_ICONS[i] && (
                    <img
                      src={SLOT_ICONS[i]}
                      alt="item"
                      style={{
                        width: "75%",
                        height: "75%",
                        objectFit: "contain",
                        imageRendering: "pixelated",
                      }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
