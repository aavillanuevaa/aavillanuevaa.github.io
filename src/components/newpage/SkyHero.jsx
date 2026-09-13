import { useEffect, useRef } from 'react';

// To add a cloud: add an entry here. top/left/right are CSS position
// values (%, px, whatever); width/height are px; drift is how fast it
// slides sideways relative to scroll (bigger = faster).
const CLOUDS = [
  { top: '45%', left: '10%', width: 64, height: 25, drift: 0.38 },
  { top: '30%', left: '20%', width: 44, height: 16, drift: 0.18 },
  { top: '35%', left: '82%', width: 44, height: 16, drift: 0.14 },
  { top: '19%', left: '65%', width: 56, height: 23, drift: 0.22 },
  { top: '30%', left: '40%', width: 70, height: 26  , drift: 0.08 },
  { top: '33%', left: '36%', width: 20, height: 18, drift: 0.42 },
  {top: '49%', left: '74%', width: 24, height: 14, drift: 0.42 }
];

const SkyHero = () => {
  const skyRef = useRef(null);
  const cloudRefs = useRef([]);

  useEffect(() => {
    const sky = skyRef.current;
    let rafId = null;

    const update = () => {
      rafId = null;
      // clamp to the hero's own height -- once it's scrolled out of
      // view there's no point moving clouds nobody can see
      const progress = Math.min(window.scrollY, sky.offsetHeight);
      CLOUDS.forEach((cloud, i) => {
        const el = cloudRefs.current[i];
        if (el) el.style.transform = `translateX(${progress * cloud.drift}px)`;
      });
    };
    const onScroll = () => {
      if (rafId === null) rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="mc-sky" ref={skyRef} id="hero">
      {CLOUDS.map((cloud, i) => (
        <div
          key={i}
          ref={(el) => { cloudRefs.current[i] = el; }}
          className="mc-cloud"
          style={{
            top: cloud.top,
            left: cloud.left,
            right: cloud.right,
            width: cloud.width,
            height: cloud.height,
          }}
        />
      ))}
      <h1>ANGELO VILLANUEVA</h1>
      <p className="mc-tagline">Computer Science 4th-year at UCF, accelerated BS/MS track, minor in Mathematics</p>
    </div>
  );
};

export default SkyHero;
