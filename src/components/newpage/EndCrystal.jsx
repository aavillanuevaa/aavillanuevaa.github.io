import { useState, useMemo, useCallback, useId } from 'react';

const PINK = '#e05fcf';
const PARTICLE_COLORS = ['#ffffff', '#d9d9d9', '#a8a8a8', '#f2f2f2'];

const AXIS_ROTATE = {
  x: (deg) => `rotateX(${deg}deg)`,
  y: (deg) => `rotateY(${deg}deg)`,
  z: (deg) => `rotateZ(${deg}deg)`,
};

/**
 * EndCrystal — a single flat pink pixel-square that spins in 3D
 * (via CSS perspective + rotate) and floats up and down. Click it and
 * it bursts into small pixel particles, then respawns a moment later.
 * Transparent background.
 *
 * Props:
 *   size          — square width/height in px (default 40).
 *   spin          — whether it spins. Default true.
 *   spinAxis      — which axis/axes it spins on: 'x', 'y', 'z', or a
 *                   two-letter combo like 'yz', 'xy', 'xz' (each axis
 *                   spins independently, so they can run at different
 *                   speeds). Default 'yz'.
 *   spinDuration  — seconds per full rotation on the first axis
 *                   listed in spinAxis. Default 1.6.
 *   spinDuration2 — seconds per full rotation on the second axis (for
 *                   two-letter combos). Default 2x spinDuration.
 *   spinDelay / spinDelay2 — seconds to offset the start of each spin
 *                   axis' animation. Useful for desyncing multiple
 *                   crystals that share the same durations. Default 0.
 *   bob           — whether it also floats up and down. Default true.
 *   bobDelay      — seconds to offset the start of the bob animation.
 *                   Default 0.
 *   explodeOnClick — whether clicking triggers the burst. Default true.
 *   particleCount — number of pixels in the burst. Default 8.
 *   particleDuration — ms the burst animation takes. Default 500.
 *   explosionScale — multiplies how far/big the burst particles are,
 *                   independent of `size` (so a small crystal can still
 *                   pop with a big burst). Default 1.
 *                   Once exploded, the square stays gone — it only
 *                   comes back if the page is refreshed.
 *   className / style — passed to the outer wrapper.
 */
export default function EndCrystal({
  size = 40,
  spin = true,
  spinAxis = 'yz',
  spinDuration = 1.6,
  spinDuration2 = spinDuration * 2,
  spinDelay = 0,
  spinDelay2 = 0,
  bob = true,
  bobDelay = 0,
  explodeOnClick = true,
  particleCount = 8,
  particleDuration = 500,
  explosionScale = 1,
  className = '',
  style = {},
}) {
  const [exploding, setExploding] = useState(false);
  const bobDistance = size / 2;
  const axes = spinAxis.split('').filter((a) => AXIS_ROTATE[a]);
  const [axisA, axisB] = axes.length ? axes : ['y'];

  // .ec-bob-wrap / @keyframes ec-bob / etc. are plain global class and
  // keyframe names -- with more than one EndCrystal on the page, every
  // instance's <style> tag redefines the SAME selectors, and the browser
  // just uses whichever one was rendered last for ALL of them (same
  // specificity, later source order wins). That silently ignores each
  // instance's own props and makes every crystal animate identically.
  // Suffixing every class/keyframe name with a unique id scopes each
  // instance's rules to itself.
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');

  const particles = useMemo(() => {
    // explosionScale scales the burst independently of the crystal's own
    // visual size -- lets a tiny crystal still pop with a big burst
    // instead of the particles shrinking along with it.
    return Array.from({ length: particleCount }, (_, i) => {
      const angle = (i / particleCount) * 2 * Math.PI + (Math.random() - 0.5) * 0.4;
      const distance = size * explosionScale * (1.2 + Math.random() * 0.9);
      return {
        dx: Math.cos(angle) * distance,
        dy: Math.sin(angle) * distance,
        color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
        pixel: Math.max(3, Math.round(size * explosionScale * 0.18)),
        delay: Math.random() * 0.06,
      };
    });
  }, [exploding, particleCount, size, explosionScale]);

  const handleClick = useCallback(() => {
    if (!explodeOnClick || exploding) return;
    setExploding(true);
  }, [explodeOnClick, exploding]);

  return (
    <div
      className={`ec-wrapper ${className}`}
      onClick={handleClick}
      style={{
        width: size,
        height: size + bobDistance,
        position: 'relative',
        perspective: size * 6,
        // page-wide custom crosshair cursor, not the browser pointer --
        // inline styles beat any CSS rule, so this can't be overridden
        // from outside; explodeOnClick only changes whether clicking
        // does anything, not what the cursor looks like.
        cursor: 'inherit',
        ...style,
      }}
    >
      <style>{`
        @keyframes ec-spin-a-${uid} {
          from { transform: ${AXIS_ROTATE[axisA](0)}; }
          to   { transform: ${AXIS_ROTATE[axisA](360)}; }
        }
        ${axisB ? `
        @keyframes ec-spin-b-${uid} {
          from { transform: ${AXIS_ROTATE[axisB](0)}; }
          to   { transform: ${AXIS_ROTATE[axisB](360)}; }
        }` : ''}
        @keyframes ec-bob-${uid} {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-${bobDistance}px); }
        }
        @keyframes ec-particle-${uid} {
          0%   { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(var(--dx), var(--dy)) scale(0); opacity: 0; }
        }
        .ec-bob-wrap-${uid} {
          position: absolute;
          inset: 0;
          animation: ${bob && !exploding ? `ec-bob-${uid} 1.3s ease-in-out infinite ${bobDelay}s` : 'none'};
        }
        .ec-outer-${uid} {
          position: absolute;
          left: 50%;
          top: 50%;
          width: ${size}px;
          height: ${size}px;
          margin-left: -${size / 2}px;
          margin-top: -${size / 2}px;
          transform-style: preserve-3d;
          animation: ${spin && axisB ? `ec-spin-b-${uid} ${spinDuration2}s linear infinite ${spinDelay2}s` : 'none'};
        }
        .ec-inner-${uid} {
          width: 100%;
          height: 100%;
          background-color: ${PINK};
          transform-style: preserve-3d;
          animation: ${spin ? `ec-spin-a-${uid} ${spinDuration}s linear infinite ${spinDelay}s` : 'none'};
        }
        .ec-particle-${uid} {
          position: absolute;
          left: 50%;
          top: 50%;
          animation: ec-particle-${uid} ${particleDuration}ms ease-out forwards;
        }
      `}</style>

      <div className={`ec-bob-wrap-${uid}`}>
        {!exploding && (
          <div className={`ec-outer-${uid}`}>
            <div className={`ec-inner-${uid}`} />
          </div>
        )}
        {exploding &&
          particles.map((p, i) => (
            <div
              key={i}
              className={`ec-particle-${uid}`}
              style={{
                width: p.pixel,
                height: p.pixel,
                marginLeft: -p.pixel / 2,
                marginTop: -p.pixel / 2,
                backgroundColor: p.color,
                animationDelay: `${p.delay}s`,
                '--dx': `${p.dx}px`,
                '--dy': `${p.dy}px`,
              }}
            />
          ))}
      </div>
    </div>
  );
}
