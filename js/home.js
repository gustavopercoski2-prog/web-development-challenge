document.addEventListener('DOMContentLoaded', () => {
    // --- Efeito de scroll navbar ---
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, { passive: true });
});

// --- Intersection observer pra mostrar animaçoes ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => observer.observe(el));

// --- Rolagem suave até a seçao clicada ---
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        const target = document.querySelector(link.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const offset = 80;
        window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    });
});

// --- Abrir modal do jogo---
function abrirJogo(caminho) {
    const modal = document.getElementById('modal-jogo');
    const iframe = document.getElementById('iframe-jogo');
    iframe.src = caminho;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

// --- Fechar modal do jogo---
function fecharJogo(event) {
    if (event && event.target !== document.getElementById('modal-jogo')) return;
    const modal = document.getElementById('modal-jogo');
    const iframe = document.getElementById('iframe-jogo');
    modal.classList.remove('open');
    iframe.src = '';
    document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') fecharJogo();
});
