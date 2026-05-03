// Topbar shadow on scroll
const topbar = document.getElementById('topbar');
window.addEventListener('scroll', () => {
  topbar.classList.toggle('scrolled', window.scrollY > 10);
});

// Mobile menu
const toggle = document.getElementById('menuToggle');
const menu = document.getElementById('mobileMenu');
toggle.addEventListener('click', () => menu.classList.toggle('open'));
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));

// Menu tabs
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.menu-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    const target = document.getElementById('menu-' + btn.dataset.tab);
    if (target) target.classList.add('active');
  });
});

// In-page anchor support for tab links (e.g. #menu-dairy)
document.querySelectorAll('a[href^="#menu-"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const tab = link.getAttribute('href').replace('#menu-', '');
    const btn = document.querySelector(`.tab-btn[data-tab="${tab}"]`);
    if (btn) {
      e.preventDefault();
      btn.click();
      document.getElementById('menus').scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Smooth reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.svc-card, .pkg-card, .how-step, .gal-tile, .menu-block, .quote-card, .offer-grid').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity .6s ease ${i * 0.04}s, transform .6s ease ${i * 0.04}s`;
  io.observe(el);
});

// Contact form -> WhatsApp
function submitForm(e) {
  e.preventDefault();
  const f = e.target;
  const data = new FormData(f);
  const name = data.get('name') || '';
  const phone = data.get('phone') || '';
  const type = data.get('type') || '';
  const date = data.get('date') || '';
  const guests = data.get('guests') || '';
  const location = data.get('location') || '';
  const msg = data.get('msg') || '';

  let text = `שלום, אני מעוניין/ת בהצעה מ"יום שוק"\n\n`;
  text += `*שם:* ${name}\n`;
  text += `*טלפון:* ${phone}\n`;
  if (type) text += `*סוג אירוע:* ${type}\n`;
  if (date) text += `*תאריך:* ${date}\n`;
  if (guests) text += `*מס' אורחים:* ${guests}\n`;
  if (location) text += `*מיקום:* ${location}\n`;
  if (msg) text += `\n${msg}`;

  const url = `https://wa.me/972533177636?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
  return false;
}
