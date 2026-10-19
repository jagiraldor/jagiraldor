const $ = s => document.querySelector(s);
const nav = $('#mainNavContainer');
const intro = $('#introScreen');
const introBg = $('#introBg');
const indicator = $('#scrollIndicator');

$('#themeToggle').onclick = () => {
  localStorage.theme = document.body.classList.toggle('light-mode') ? 'light' : 'dark';
};

const syncNav = () => nav.classList.toggle('minimized', scrollY > 80);
nav.onmouseenter = () => nav.classList.remove('minimized');
nav.onmouseleave = syncNav;

const io = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: .1 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
document.querySelectorAll('.skills-wrap .skill').forEach((s, i) => s.style.setProperty('--d', i * .06 + 's'));

const fadeIntro = () => {
  const r = Math.min(scrollY / innerHeight, 1);
  intro.classList.toggle('off', r > .6);
  intro.style.opacity = 1 - r;
  intro.style.filter = r > 0 && r < 1 ? `blur(${r * 10}px)` : '';
  intro.style.visibility = r >= 1 ? 'hidden' : '';
  introBg.style.transform = `scale(${1.05 + r * .06}) translateY(${r * 44}px)`;
};

let timer;
const armIndicator = () => {
  clearTimeout(timer);
  indicator.classList.remove('active');
  const atTop = () => scrollY <= innerHeight * .14;
  if (atTop()) timer = setTimeout(() => atTop() && indicator.classList.add('active'), 2200);
};

let ticking = false;
addEventListener('scroll', () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    ticking = false;
    syncNav();
    if (intro) { fadeIntro(); armIndicator(); }
  });
}, { passive: true });

if (intro) addEventListener('load', armIndicator);