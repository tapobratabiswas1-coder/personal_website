/* ========================================
   TAPOBRATA BISWAS - PORTFOLIO JS
   Premium Smooth Portfolio with Theme System
   ======================================== */

// ========================
// VARIABLES
// ========================
const header = document.getElementById('header');
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');
const sections = document.querySelectorAll('section[id]');
const scrollTop = document.getElementById('scroll-top');
const themeToggle = document.getElementById('theme-toggle');


// ========================
// THEME SYSTEM
// ========================
const THEME_KEY = 'tapobrata-theme';

function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) return saved;
    // Default to dark (your original design)
    return 'dark';
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
}

// Apply theme immediately on load (before paint)
setTheme(getPreferredTheme());

// Toggle on click
themeToggle?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    setTheme(next);
});

// Toggle on keyboard (accessibility)
themeToggle?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        themeToggle.click();
    }
});


// ========================
// MOBILE MENU
// ========================
navToggle?.addEventListener('click', () => navMenu.classList.add('show-menu'));
navClose?.addEventListener('click', () => navMenu.classList.remove('show-menu'));

navLinks.forEach(link =>
    link.addEventListener('click', () =>
        navMenu.classList.remove('show-menu')
    )
);


// ========================
// STICKY HEADER
// ========================
window.addEventListener('scroll', () => {
    header.classList.toggle('scroll-header', window.scrollY >= 80);
}, { passive: true });


// ========================
// ACTIVE LINK ON SCROLL
// ========================
const observerOptions = {
    root: null,
    rootMargin: '-40% 0px -55% 0px',
    threshold: 0
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        const link = document.querySelector(`.nav__link[href*="${id}"]`);

        if (entry.isIntersecting) {
            navLinks.forEach(l => l.classList.remove('active-link'));
            link?.classList.add('active-link');
        }
    });
}, observerOptions);

sections.forEach(sec => sectionObserver.observe(sec));


// ========================
// SCROLL TOP BUTTON
// ========================
window.addEventListener('scroll', () => {
    scrollTop?.classList.toggle('show-scroll', window.scrollY >= 560);
}, { passive: true });


// ========================
// SCROLL REVEAL
// ========================
const revealElements = document.querySelectorAll(
    '.skills__card, .service__card, .why__card, .portfolio__card, .testimonial__card'
);

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'opacity 0.8s cubic-bezier(.2,.65,.3,1), transform 0.8s cubic-bezier(.2,.65,.3,1)';
    el.style.willChange = 'transform, opacity';
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));


// ========================
// SMOOTH ANCHOR SCROLL
// ========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});


// ========================
// CONTACT FORM
// ========================
const contactForm = document.getElementById('contact-form');

contactForm?.addEventListener('submit', e => {
    e.preventDefault();

    const inputs = contactForm.querySelectorAll('.form__input');
    const values = Array.from(inputs).map(i => i.value.trim());

    if (values.some(v => !v)) {
        return showNotification('Please fill all fields', 'error');
    }

    // Basic email check (second input)
    const email = inputs[1]?.value || '';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return showNotification('Please enter a valid email', 'error');
    }

    showNotification('Message sent successfully!');
    contactForm.reset();
});


// ========================
// NOTIFICATION
// ========================
function showNotification(msg, type = 'success') {
    document.querySelector('.notification')?.remove();

    const n = document.createElement('div');
    n.className = 'notification';
    n.textContent = msg;

    const bg = type === 'success'
        ? 'linear-gradient(135deg, #4ade80, #16a34a)'
        : 'linear-gradient(135deg, #f87171, #dc2626)';

    n.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: ${bg};
        color: #fff;
        padding: 14px 24px;
        border-radius: 12px;
        font-weight: 600;
        font-size: 0.9375rem;
        transform: translateX(120%);
        transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 9999;
        box-shadow: 0 8px 24px rgba(0,0,0,0.2);
    `;

    document.body.appendChild(n);

    requestAnimationFrame(() => {
        n.style.transform = 'translateX(0)';
    });

    setTimeout(() => {
        n.style.transform = 'translateX(120%)';
        setTimeout(() => n.remove(), 400);
    }, 4000);
}


// // ========================
// // PARALLAX (BLOB)
// // ========================
// const blob = document.querySelector('.blob__shape');

// window.addEventListener('scroll', () => {
//     if (!blob) return;
//     blob.style.transform = `translate3d(0, ${window.scrollY * 0.25}px, 0)`;
// }, { passive: true });


// ========================
// BUTTON PULSE
// ========================
document.querySelectorAll('.button--primary').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.animate([
            { transform: 'scale(1)' },
            { transform: 'scale(1.06)' },
            { transform: 'scale(1)' }
        ], { duration: 300 });
    });
});


// ========================
// ACCESSIBILITY
// ========================
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        navMenu.classList.remove('show-menu');
    }
});


// ========================
// LAZY IMAGE LOADING
// ========================
document.querySelectorAll('img:not([loading])').forEach(img => {
    img.loading = 'lazy';
});


// ========================
// INIT
// ========================
console.log('✨ Premium Portfolio Loaded — Theme:', getPreferredTheme());
