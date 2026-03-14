// Simple physics-based bouncing nametag demo
const box = document.getElementById('box');
const tag = document.getElementById('tag');
const cornerCelebration = document.getElementById('corner-celebration');
const celebrationGif = document.getElementById('celebration-gif');

// ===== Celebration configuration =====
// GIF always shows on corner hits by default.
// If you ever want random chance again, set SHOW_ON_EVERY_CORNER_HIT = false
// and lower CORNER_HIT_CHANCE_DENOMINATOR for more frequent triggers.
const SHOW_ON_EVERY_CORNER_HIT = true;
const CORNER_HIT_CHANCE_DENOMINATOR = 5; // used only when SHOW_ON_EVERY_CORNER_HIT is false (1 in N)

const CELEBRATION_GIF_URL = 'celebration.gif';
const CELEBRATION_DURATION_MS = 2200;

// Audio skeleton (disabled by default until you add your real file)
const ENABLE_CORNER_AUDIO = false;
const SONG_URL = ''; // Example: './C2C283A5-B1D0-4079-B662-5FEA422BEBEE.mp3'

let boxW = 0;
let boxH = 0;
let tagW = 0;
let tagH = 0;

// position in pixels (relative to box top-left)
let x = 0;
let y = 0;
// velocity in pixels per second
let vx = 260;
let vy = 190;
// small randomness so repeated loads behave slightly differently
vx *= Math.random() * 0.6 + 0.7;
vy *= Math.random() * 0.6 + 0.7;
// clamp max speed
const MAX_SPEED = 1300;

const celebrationAudio = ENABLE_CORNER_AUDIO && SONG_URL ? new Audio(SONG_URL) : null;
let celebrationActive = false;

function shouldTriggerCelebration() {
  if (SHOW_ON_EVERY_CORNER_HIT) {
    return true;
  }

  return Math.floor(Math.random() * CORNER_HIT_CHANCE_DENOMINATOR) === 0;
}

function resize() {
  const r = box.getBoundingClientRect();
  boxW = r.width;
  boxH = r.height;
  tagW = tag.offsetWidth;
  tagH = tag.offsetHeight;

  // if tag is outside (first load or resize) center it
  if (x + tagW > boxW || y + tagH > boxH) {
    x = (boxW - tagW) * 0.25 + Math.random() * ((boxW - tagW) * 0.5);
    y = (boxH - tagH) * 0.25 + Math.random() * ((boxH - tagH) * 0.5);
  }
}

function triggerCornerCelebration() {
  // keep current celebration visible for its full duration
  if (celebrationActive || !shouldTriggerCelebration()) {
    return;
  }

  celebrationActive = true;
  celebrationGif.src = CELEBRATION_GIF_URL;
  cornerCelebration.hidden = false;

  if (celebrationAudio) {
    celebrationAudio.currentTime = 0;
    celebrationAudio.play().catch(() => {
      // Browser autoplay may be blocked until interaction.
    });
  }

  clearTimeout(triggerCornerCelebration.hideTimer);
  triggerCornerCelebration.hideTimer = setTimeout(() => {
    cornerCelebration.hidden = true;
    celebrationActive = false;
  }, CELEBRATION_DURATION_MS);
}

window.addEventListener('resize', resize);

let lastTime = performance.now();
function step(now) {
  const dt = Math.min(0.032, (now - lastTime) / 1000); // cap dt to avoid jumps
  lastTime = now;

  x += vx * dt;
  y += vy * dt;
  let collidedX = false;
  let collidedY = false;

  // left
  if (x < 0) {
    x = 0;
    vx = Math.abs(vx);
    collidedX = true;
  }
  // right
  if (x + tagW > boxW) {
    x = boxW - tagW;
    vx = -Math.abs(vx);
    collidedX = true;
  }
  // top
  if (y < 0) {
    y = 0;
    vy = Math.abs(vy);
    collidedY = true;
  }
  // bottom
  if (y + tagH > boxH) {
    y = boxH - tagH;
    vy = -Math.abs(vy);
    collidedY = true;
  }

  // tiny speed cap to avoid runaway on resize
  const speed = Math.hypot(vx, vy);
  if (speed > MAX_SPEED) {
    const s = MAX_SPEED / speed;
    vx *= s;
    vy *= s;
  }

  // rotation based on heading for subtle tilt
  const angle = Math.atan2(vy, vx) * 12; // degrees-ish when small
  tag.style.transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`;

  if (collidedX || collidedY) {
    // add hit class briefly
    tag.classList.add('hit');
    setTimeout(() => tag.classList.remove('hit'), 120);
  }

  if (collidedX && collidedY) {
    // corner hit
    tag.classList.add('corner');

    // give it a stronger corner nudge: faster away from corner
    const push = 1.12;
    vx *= push;
    vy *= push;
    setTimeout(() => tag.classList.remove('corner'), 320);

    triggerCornerCelebration();
  }

  requestAnimationFrame(step);
}

// init
resize();
// place somewhere near center to start
x = (boxW - tagW) * 0.4;
y = (boxH - tagH) * 0.3;
lastTime = performance.now();
requestAnimationFrame(step);

// Optional: click to randomize velocity/direction
box.addEventListener('click', () => {
  const signX = Math.random() > 0.5 ? 1 : -1;
  const signY = Math.random() > 0.5 ? 1 : -1;
  vx = (140 + Math.random() * 260) * signX;
  vy = (120 + Math.random() * 220) * signY;
});
