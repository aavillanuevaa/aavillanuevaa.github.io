import EndCrystal from './EndCrystal';

// site-bg-biomes-wide.png's own pixel dimensions -- these must be kept in
// sync with the actual asset (see the checkpoint comment in NewPage.css).
const IMG_W = 7680;
const IMG_H = 6960;
const IMG_CENTER_X = IMG_W / 2;

// each obsidian pillar's top-center point, in the background image's own
// pixel coordinates (not screen px) -- read straight off the pillar
// blocks painted into site-bg-biomes-wide.png.
// bobDelay/spinDelay/spinDelay2 stagger each crystal's animation start so
// all 4 don't bob/spin in lockstep.
// y values are each pillar's top minus 1 block (24px) so the crystal
// hovers a bit above the tip instead of sitting right on it.
const CRYSTALS = [
  { x: 3576, y: 5808, bobDelay: 0, spinDelay: 0, spinDelay2: 0.3 }, // inner-left (9 blocks)
  { x: 4080, y: 5880, bobDelay: 0.35, spinDelay: 0.5, spinDelay2: 0.1 }, // inner-right (6 blocks)
  { x: 3360, y: 5880, bobDelay: 0.7, spinDelay: 0.2, spinDelay2: 0.9 }, // outer-left (6 blocks)
  { x: 4296, y: 5808, bobDelay: 1.05, spinDelay: 0.8, spinDelay2: 0.6 }, // outer-right (9 blocks)
];

// .mc-ground-bg covers .mc-ground-wrap (500vh tall) height-first -- the
// image is scaled so its height fills the wrap exactly, and any width
// overflow is cropped evenly from both sides since object-position is
// "center" horizontally. That means BOTH axes scale by the exact same
// factor, and that factor is fixed by height alone -- so expressing an
// image-pixel distance as `vh` (not vw, not %) makes it track the art
// exactly regardless of viewport width *or* height. This is the same
// trick the image itself relies on (vh-based checkpoint math), just
// applied to a horizontal offset from the image's own center line too.
const toVh = (imgPx) => (imgPx / IMG_H) * 500;

// the crystal itself is tiny (7px) -- padding it out to a much bigger
// click target, with an equal negative margin to cancel the padding's
// effect on layout/centering, so the visible crystal doesn't move or
// grow, only the invisible clickable area around it does.
const HIT_PADDING = 14;

const EndCrystals = () => {
  return (
    <>
      {CRYSTALS.map((c, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: '50%',
            top: `${toVh(c.y)}vh`,
            // translateX in vh (not %) for the reason above; translateY
            // -100% lifts the crystal so it hovers just above the pillar
            // tip instead of centering on it.
            transform: `translate(calc(-50% + ${toVh(c.x - IMG_CENTER_X)}vh), -100%)`,
            zIndex: 2,
            pointerEvents: 'auto',
          }}
        >
          {/* fixed px, not vh/vw/% -- only the crystal's POSITION should
              track the background art's scale (via the vh math above);
              its own size stays constant regardless of window/screen size */}
          <EndCrystal
            size={7}
            explosionScale={5}
            bobDelay={c.bobDelay}
            spinDelay={c.spinDelay}
            spinDelay2={c.spinDelay2}
            style={{ padding: HIT_PADDING, margin: -HIT_PADDING }}
          />
        </div>
      ))}
    </>
  );
};

export default EndCrystals;
