import { useState } from 'react';

const EMAIL = 'angelovill0908@gmail.com';

// Contact sits on the starry void band of the background art -- these
// twinkle on top of it. Fixed positions/timings (not Math.random() at
// render) so they don't reshuffle on every re-render; delay/duration
// are varied per star so they don't all pulse in sync.
const STARS = [
  { top: '8%', left: '6%', size: 2, delay: 0.2, duration: 2.6 },
  { top: '5%', left: '38%', size: 2, delay: 0.6, duration: 2.8 },
  { top: '10%', left: '68%', size: 2, delay: 0.9, duration: 3 },
  { top: '28%', left: '12%', size: 1, delay: 0.4, duration: 3.4 },
  { top: '42%', left: '30%', size: 1, delay: 2.4, duration: 3.1 },
  { top: '55%', left: '8%', size: 1, delay: 1.6, duration: 3.3 },
  { top: '68%', left: '18%', size: 1, delay: 2.2, duration: 3.5 },
  { top: '78%', left: '86%', size: 1, delay: 0.3, duration: 3.2 },
  { top: '90%', left: '58%', size: 1, delay: 0.8, duration: 3.4 },
  { top: '10.2%', left: '71.3%', size: 2, delay: 1.8, duration: 3.1 },
  { top: '4.2%', left: '47.0%', size: 1, delay: 0.2, duration: 2.9 },
  { top: '19.7%', left: '8.9%', size: 1, delay: 0.0, duration: 3.5 },
];

const ContactSection = () => {
  const [copiedText, setCopiedText] = useState('');

  const handleCopy = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopiedText(EMAIL);
    setTimeout(() => setCopiedText(''), 2000);
  };

  return (
    <section className="mc-section mc-section--contact" id="contact">
      <div className="mc-stars-overlay" aria-hidden="true">
        {STARS.map((star, i) => (
          <span
            key={i}
            className="mc-star"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          />
        ))}
      </div>
      <div className="mc-section-body">
        <p className="mc-eyebrow">Contact</p>
        <h2>Say hello</h2>
        <div className="mc-item-frame">
          <p>Reach out directly, or find me elsewhere.</p>
          <div className="mc-contact-row">
            <button className="mc-pixel-btn" onClick={handleCopy}>
              {copiedText ? 'Copied!' : 'Copy Email'}
            </button>
            <a className="mc-pixel-btn" href="https://github.com/aavillanuevaa" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a className="mc-pixel-btn" href="https://www.linkedin.com/in/angelo-villanueva-4aa848314/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
