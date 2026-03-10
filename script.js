/* ========================================
   TAPOBRATA BISWAS - SMOOTH PORTFOLIO JS
   Optimized for Premium Feel
======================================== */

// ===== VARIABLES =====
const header = document.getElementById('header');
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');
const sections = document.querySelectorAll('section[id]');
const scrollTop = document.getElementById('scroll-top');


// =========================================
// MOBILE MENU
// =========================================
navToggle?.addEventListener('click', () => navMenu.classList.add('show-menu'));
navClose?.addEventListener('click', () => navMenu.classList.remove('show-menu'));

navLinks.forEach(link =>
    link.addEventListener('click', () =>
        navMenu.classList.remove('show-menu')
    )
);


// =========================================
// STICKY HEADER (PASSIVE = SMOOTHER)
// =========================================
window.addEventListener('scroll', () => {
    header.classList.toggle('scroll-header', window.scrollY >= 80);
}, { passive: true });


// =========================================
// ACTIVE LINK ON SCROLL (INTERSECTION OBSERVER)
// =========================================
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


// =========================================
// SCROLL TOP BUTTON
// =========================================
window.addEventListener('scroll', () => {
    scrollTop?.classList.toggle('show-scroll', window.scrollY >= 560);
}, { passive: true });


// =========================================
// SCROLL REVEAL (SUPER SMOOTH)
// =========================================
const revealElements = document.querySelectorAll(
    '.skills__card, .service__card, .why__card, .portfolio__card, .testimonial__card'
);

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'all 0.8s cubic-bezier(.2,.65,.3,1)';
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


// =========================================
// SMOOTH ANCHOR SCROLL
// =========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector(anchor.getAttribute('href'))
            ?.scrollIntoView({ behavior: 'smooth' });
    });
});


// =========================================
// CONTACT FORM
// =========================================
const contactForm = document.getElementById('contact-form');

contactForm?.addEventListener('submit', e => {
    e.preventDefault();

    const data = new FormData(contactForm);
    const name = data.get('name');
    const email = data.get('email');
    const subject = data.get('subject');
    const message = data.get('message');

    if (!name || !email || !subject || !message)
        return showNotification('Please fill all fields','error');

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        return showNotification('Invalid email','error');

    showNotification('Message sent successfully!');
    contactForm.reset();
});


// =========================================
// NOTIFICATION (SMOOTHER)
// =========================================
function showNotification(msg, type='success') {
    document.querySelector('.notification')?.remove();

    const n = document.createElement('div');
    n.className='notification';
    n.textContent=msg;

    n.style.cssText=`
        position:fixed;
        top:90px;
        right:20px;
        background:${type==='success'?'#4ade80':'#f87171'};
        padding:14px 20px;
        border-radius:10px;
        font-weight:500;
        transform:translateX(120%);
        transition:.4s;
        z-index:9999;
    `;

    document.body.appendChild(n);

    requestAnimationFrame(()=> n.style.transform='translateX(0)');

    setTimeout(()=>{
        n.style.transform='translateX(120%)';
        setTimeout(()=>n.remove(),400);
    },4000);
}


// =========================================
// PARALLAX (GPU FRIENDLY)
// =========================================
const blob = document.querySelector('.blob__shape');

window.addEventListener('scroll', () => {
    if (!blob) return;
    blob.style.transform = `translate3d(0, ${window.scrollY*0.25}px, 0)`;
}, { passive:true });


// =========================================
// BUTTON PULSE
// =========================================
document.querySelectorAll('.button--primary').forEach(btn=>{
    btn.addEventListener('mouseenter',()=>{
        btn.animate([
            {transform:'scale(1)'},
            {transform:'scale(1.06)'},
            {transform:'scale(1)'}
        ],{duration:300});
    });
});


// =========================================
// ACCESSIBILITY
// =========================================
document.addEventListener('keydown',e=>{
    if(e.key==='Escape')
        navMenu.classList.remove('show-menu');
});


// =========================================
// LAZY IMAGE LOADING
// =========================================
document.querySelectorAll('img:not([loading])')
    .forEach(img=>img.loading='lazy');


// =========================================
// INIT
// =========================================
console.log("🚀 Premium Smooth Portfolio Loaded");
