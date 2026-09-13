import { useEffect, useRef, useState } from 'react';
import ItemCard from '../ItemCard';

// Projects sits on the nether/lava band -- these throb slowly on top of
// it, same idea as the twinkling stars in Contact but warm-colored and
// much slower (a throb, not a twinkle). Fixed positions/timings so they
// don't reshuffle on every re-render; delay/duration vary per glow so
// they don't all pulse in sync.
const LAVA_GLOWS = [
  { top: '10%', left: '14%', size: 5, delay: 0.2, duration: 4.4 },
  { top: '22%', left: '32%', size: 4, delay: 1.6, duration: 5.2 },
  { top: '6%', left: '52%', size: 6, delay: 0.8, duration: 4.8 },
  { top: '30%', left: '70%', size: 4, delay: 2.4, duration: 5.6 },
  { top: '15%', left: '86%', size: 5, delay: 1.1, duration: 4.6 },
  { top: '45%', left: '8%', size: 4, delay: 0.5, duration: 5.4 },
  { top: '55%', left: '46%', size: 6, delay: 1.9, duration: 4.2 },
  { top: '62%', left: '78%', size: 4, delay: 0.3, duration: 5.8 },
  { top: '72%', left: '20%', size: 5, delay: 2.1, duration: 4.6 },
  { top: '80%', left: '60%', size: 4, delay: 1.3, duration: 5.2 },
  { top: '88%', left: '38%', size: 5, delay: 0.6, duration: 4.4 },
  { top: '38%', left: '90%', size: 4, delay: 1.7, duration: 5.6 },
];

// free-roaming ash/dust motes -- each one wanders between 2 random
// nearby points and back (dx1/dy1/dx2/dy2, in px) instead of pulsing in
// place like the lava glows. .mc-dust-overlay clips them with
// overflow:hidden so they can drift but never leave this section.
const DUST_PARTICLES = [
  { top: '12%', left: '10%', dx1: 16, dy1: -12, dx2: -8, dy2: 10, delay: 0, duration: 14 },
  { top: '20%', left: '28%', dx1: -14, dy1: 8, dx2: 12, dy2: 14, delay: 2, duration: 16 },
  { top: '8%', left: '46%', dx1: 10, dy1: 14, dx2: -12, dy2: -6, delay: 4, duration: 12 },
  { top: '18%', left: '64%', dx1: -16, dy1: -8, dx2: 8, dy2: 12, delay: 1, duration: 17 },
  { top: '25%', left: '80%', dx1: 12, dy1: 10, dx2: -10, dy2: -12, delay: 3, duration: 13 },
  { top: '35%', left: '18%', dx1: -10, dy1: -14, dx2: 14, dy2: 6, delay: 5, duration: 15 },
  { top: '42%', left: '38%', dx1: 14, dy1: -10, dx2: -12, dy2: 12, delay: 0.5, duration: 18 },
  { top: '48%', left: '58%', dx1: -12, dy1: 12, dx2: 10, dy2: -10, delay: 2.5, duration: 14 },
  { top: '40%', left: '92%', dx1: -14, dy1: -6, dx2: 8, dy2: 14, delay: 4.5, duration: 16 },
  { top: '58%', left: '6%', dx1: 12, dy1: 8, dx2: -14, dy2: -8, delay: 1.5, duration: 13 },
  { top: '65%', left: '30%', dx1: -8, dy1: -12, dx2: 14, dy2: 10, delay: 3.5, duration: 17 },
  { top: '60%', left: '50%', dx1: 10, dy1: -14, dx2: -12, dy2: 8, delay: 0.8, duration: 15 },
  { top: '70%', left: '70%', dx1: -12, dy1: 10, dx2: 12, dy2: -12, delay: 2.8, duration: 12 },
  { top: '75%', left: '88%', dx1: 14, dy1: 6, dx2: -10, dy2: -14, delay: 4.8, duration: 18 },
  { top: '85%', left: '16%', dx1: -14, dy1: -10, dx2: 10, dy2: 12, delay: 1.2, duration: 14 },
  { top: '90%', left: '42%', dx1: 12, dy1: 12, dx2: -8, dy2: -10, delay: 3.2, duration: 16 },
  { top: '61.7%', left: '30.7%', dx1: 14, dy1: 11, dx2: 8, dy2: 14, delay: 5.0, duration: 16 },
  { top: '34.8%', left: '22.1%', dx1: 12, dy1: 6, dx2: -12, dy2: -13, delay: 1.4, duration: 15 },
  { top: '18.2%', left: '8.8%', dx1: -12, dy1: 10, dx2: -8, dy2: -9, delay: 0.2, duration: 18 },
  { top: '26.2%', left: '16.1%', dx1: 10, dy1: -8, dx2: -9, dy2: -12, delay: 1.6, duration: 14 },
  { top: '58.1%', left: '75.8%', dx1: -13, dy1: -10, dx2: 9, dy2: -9, delay: 0.4, duration: 16 },
  { top: '53.5%', left: '54.0%', dx1: -12, dy1: -9, dx2: 8, dy2: -10, delay: 0.5, duration: 14 },
  { top: '71.6%', left: '78.8%', dx1: -12, dy1: -7, dx2: 13, dy2: 6, delay: 0.6, duration: 17 },
  { top: '59.1%', left: '72.0%', dx1: 15, dy1: 12, dx2: -10, dy2: 6, delay: 1.3, duration: 13 },
  { top: '61.9%', left: '61.9%', dx1: 12, dy1: -8, dx2: 13, dy2: 9, delay: 2.8, duration: 12 },
  { top: '23.2%', left: '16.5%', dx1: -13, dy1: 10, dx2: 15, dy2: 9, delay: 2.7, duration: 14 },
  { top: '57.7%', left: '51.5%', dx1: -12, dy1: -13, dx2: 11, dy2: 13, delay: 1.9, duration: 14 },
  { top: '56.4%', left: '63.9%', dx1: -12, dy1: 9, dx2: -11, dy2: 6, delay: 1.1, duration: 16 },
  { top: '90.7%', left: '46.2%', dx1: 12, dy1: 9, dx2: -8, dy2: -8, delay: 4.0, duration: 18 },
  { top: '55.6%', left: '36.0%', dx1: -15, dy1: 6, dx2: 12, dy2: 13, delay: 0.3, duration: 18 },
];

const PROJECTS = [
  {
    title: 'Pokemon Card Scanner (OpenCV + CLIP)',
    bullets: [
      'Built a real-time computer vision system to solve a real problem for card show attendees: manually identifying and price-checking cards is slow and error-prone, especially for rare or visually similar cards.',
      'Used OpenCV for card detection/geometric normalization and CLIP embeddings for visual similarity-based identification from live camera input, enabling instant identification without manual lookup.',
      'Improved recognition reliability with blur filtering, frame stability checks, and multi-frame confidence aggregation, reducing false positives to the point where the tool was reliable for real-time use in the field.',
    ],
    children: (
      <a href="https://github.com/aavillanuevaa/pokescanner-v1" target="_blank" rel="noopener noreferrer">View on GitHub →</a>
    ),
  },
  {
    title: 'Minecraft Server Discord Bot',
    bullets: [
      'Identified that server community members had no way to monitor activity — who was online, chat logs, achievements — without launching the game, which limited casual engagement.',
      'Built a Discord bot that connects to the Minecraft server and relays live chat, advancement notifications, player counts, and online player names directly into Discord.',
      'Result: gave the community always-on visibility into server activity from their phones or desktop, increasing engagement without requiring anyone to open the game.',
    ],
    children: (
      <a href="https://github.com/aavillanuevaa/minecraft-bot" target="_blank" rel="noopener noreferrer">View on GitHub →</a>
    ),
  },
  {
    title: 'New Tab Chrome Extension',
    bullets: [
      'Built a custom browser extension that overrides the default new tab page with a productivity-focused dashboard, replacing static browsing with an actionable daily workspace',
      'Implemented saveable notes and an integrated calendar, allowing users to capture tasks and track schedules without leaving the browser',
      'Designed a customizable, organized layout giving users control over widget placement and appearance, improving personal workflow and visual clarity',
    ],
    children: (
      <a href="https://github.com/aavillanuevaa/new-tab-extension" target="_blank" rel="noopener noreferrer">View on GitHub →</a>
    ),  
  },
];

const ProjectsSection = () => {
  const [index, setIndex] = useState(0);
  const count = PROJECTS.length;
  const go = (delta) => setIndex((i) => (i + delta + count) % count);

  const sectionRef = useRef(null);
  const particleRefs = useRef([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  // mouse-reactive "swoosh" -- each dust mote's ambient wander stays on
  // the CSS keyframe (mc-dust-drift, on the inner span); this rAF loop
  // separately pushes the OUTER span away from the cursor and springs it
  // back, so the two transforms compose instead of fighting over the
  // same property. Listener lives on the section itself (not the
  // overlay, which is pointer-events:none) so it only reacts while the
  // mouse is over this one section, same as the "only in that section"
  // drift.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const state = DUST_PARTICLES.map(() => ({ vx: 0, vy: 0, ox: 0, oy: 0 }));
    const RADIUS = 65;
    const PUSH = 1.4;
    const SPRING = 0.025;
    const FRICTION = 0.86;
    let rafId = null;

    const onMouseMove = (e) => {
      const rect = section.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };
    const onMouseLeave = () => {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    const tick = () => {
      const rect = section.getBoundingClientRect();
      DUST_PARTICLES.forEach((d, i) => {
        const el = particleRefs.current[i];
        const s = state[i];
        if (!el) return;

        const anchorX = (parseFloat(d.left) / 100) * rect.width;
        const anchorY = (parseFloat(d.top) / 100) * rect.height;
        const dx = anchorX + s.ox - mouseRef.current.x;
        const dy = anchorY + s.oy - mouseRef.current.y;
        const dist = Math.hypot(dx, dy);
        if (dist < RADIUS && dist > 0.01) {
          const force = (1 - dist / RADIUS) * PUSH;
          s.vx += (dx / dist) * force;
          s.vy += (dy / dist) * force;
        }

        // spring back toward its ambient anchor, damped so it settles
        s.vx += -s.ox * SPRING;
        s.vy += -s.oy * SPRING;
        s.vx *= FRICTION;
        s.vy *= FRICTION;
        s.ox += s.vx;
        s.oy += s.vy;

        el.style.transform = `translate(${s.ox}px, ${s.oy}px)`;
      });
      rafId = requestAnimationFrame(tick);
    };

    section.addEventListener('mousemove', onMouseMove);
    section.addEventListener('mouseleave', onMouseLeave);
    rafId = requestAnimationFrame(tick);

    return () => {
      section.removeEventListener('mousemove', onMouseMove);
      section.removeEventListener('mouseleave', onMouseLeave);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section className="mc-section mc-section--projects" id="projects" ref={sectionRef}>
      <div className="mc-lava-glow-overlay" aria-hidden="true">
        {LAVA_GLOWS.map((g, i) => (
          <span
            key={i}
            className="mc-lava-glow"
            style={{
              top: g.top,
              left: g.left,
              width: g.size,
              height: g.size,
              animationDelay: `${g.delay}s`,
              animationDuration: `${g.duration}s`,
            }}
          />
        ))}
      </div>
      <div className="mc-dust-overlay" aria-hidden="true">
        {DUST_PARTICLES.map((d, i) => (
          <span
            key={i}
            ref={(el) => { particleRefs.current[i] = el; }}
            className="mc-dust-particle"
            style={{ top: d.top, left: d.left }}
          >
            <span
              className="mc-dust-particle-inner"
              style={{
                animationDelay: `${d.delay}s`,
                animationDuration: `${d.duration}s`,
                '--dx1': `${d.dx1}px`,
                '--dy1': `${d.dy1}px`,
                '--dx2': `${d.dx2}px`,
                '--dy2': `${d.dy2}px`,
              }}
            />
          </span>
        ))}
      </div>
      <div className="mc-section-body">
        <p className="mc-eyebrow">Projects</p>
        <h2>Things I've built</h2>

        <div className="mc-carousel">
          <button type="button" className="mc-carousel-arrow" aria-label="Previous project" onClick={() => go(-1)}>
            ‹
          </button>

          <div className="mc-carousel-viewport">
            <div className="mc-carousel-track" style={{ transform: `translateX(-${index * 100}%)` }}>
              {PROJECTS.map(({ title, bullets, description, children }) => (
                <div className="mc-carousel-slide" key={title}>
                  <ItemCard title={title} bullets={bullets}>
                    {description ?? children}
                  </ItemCard>
                </div>
              ))}
            </div>
          </div>

          <button type="button" className="mc-carousel-arrow" aria-label="Next project" onClick={() => go(1)}>
            ›
          </button>
        </div>

        <div className="mc-carousel-dots">
          {PROJECTS.map(({ title }, i) => (
            <button
              key={title}
              type="button"
              className={`mc-carousel-dot${i === index ? ' is-active' : ''}`}
              aria-label={`Go to ${title}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
