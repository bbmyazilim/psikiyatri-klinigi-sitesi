document.addEventListener('DOMContentLoaded', function () {
    // Preloader'ı kaldır
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 800);
        }, 500);
    }

    // AOS başlat (scroll animasyonları)
    AOS.init({
        duration: 800,
        once: true,
        offset: 120,
        easing: 'ease-out-quad'
    });

    // Navbar scroll efekti
    const navbar = document.getElementById('mainNav');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
    });

    // Aktif sayfa vurgulama
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.custom-link').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === currentPage);
    });

    // ===== FULL-SCREEN MOBİL MENÜ =====
    const fsToggle = document.getElementById('fsMenuToggle');
    const fsOverlay = document.getElementById('fsMenuOverlay');
    const fsClose = document.getElementById('fsMenuClose');

    function openFsMenu() {
        fsOverlay.classList.add('is-open');
        fsOverlay.setAttribute('aria-hidden', 'false');
        fsOverlay.setAttribute('aria-modal', 'true');
        if (fsToggle) { fsToggle.setAttribute('aria-expanded', 'true'); fsToggle.classList.add('is-active'); }
        document.body.classList.add('fs-menu-open');
        setTimeout(() => fsClose && fsClose.focus(), 100);
    }

    function closeFsMenu() {
        fsOverlay.classList.remove('is-open');
        fsOverlay.setAttribute('aria-hidden', 'true');
        fsOverlay.removeAttribute('aria-modal');
        if (fsToggle) { fsToggle.setAttribute('aria-expanded', 'false'); fsToggle.classList.remove('is-active'); }
        document.body.classList.remove('fs-menu-open');
        fsToggle && fsToggle.focus();
    }

    if (fsToggle && fsOverlay) {
        fsToggle.addEventListener('click', openFsMenu);
        fsClose && fsClose.addEventListener('click', closeFsMenu);

        // ESC ile kapat
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && fsOverlay.classList.contains('is-open')) {
                closeFsMenu();
            }
        });

        // Link tıklanınca kapat (sayfa geçişleri için)
        fsOverlay.querySelectorAll('.fs-menu-link').forEach(link => {
            link.addEventListener('click', () => {
                closeFsMenu();
            });
        });

        // Focus trap
        fsOverlay.addEventListener('keydown', e => {
            if (e.key !== 'Tab') return;
            const focusable = fsOverlay.querySelectorAll('button, a, [tabindex]:not([tabindex="-1"])');
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (e.shiftKey) {
                if (document.activeElement === first) { e.preventDefault(); last.focus(); }
            } else {
                if (document.activeElement === last) { e.preventDefault(); first.focus(); }
            }
        });
    }

    // Yukarı çık butonu (dinamik ekle)
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollBtn.className = 'scroll-top-btn';
    scrollBtn.setAttribute('aria-label', 'Sayfanın başına dön');
    document.body.appendChild(scrollBtn);
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 48px;
        height: 48px;
        background: var(--accent-gold);
        border: none;
        border-radius: 50%;
        color: var(--bg-dark);
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s;
        z-index: 99;
        font-size: 1.2rem;
    `;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // İletişim sayfasında form validasyonu (varsa)
    // Not: iletisim.html kendi gelişmiş handler'ını kullanır;
    // bu sadece diğer sayfalardaki basit formlar için devreye girer.
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // iletisim.html'de ctFormMessage var; o sayfa kendi handler'ını ekler.
        // Çakışmayı önlemek için ctFormMessage yoksa devam et.
        const msgDiv = document.getElementById('formMessage');
        if (msgDiv) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('name')?.value.trim();
                const email = document.getElementById('email')?.value.trim();
                if (!name || !email) {
                    msgDiv.innerHTML = '<div class="alert alert-danger">Lütfen ad ve email girin.</div>';
                    return;
                }
                msgDiv.innerHTML = '<div class="alert alert-success">Mesajınız iletildi. Teşekkür ederiz.</div>';
                contactForm.reset();
                setTimeout(() => msgDiv.innerHTML = '', 4000);
            });
        }
    }
});

// ===== CAROUSEL İÇERİK VERİLERİ =====
const slides = [
    {
        tag: 'Hoş geldiniz',
        title: 'Zihniniz için <em>özel bir alan</em>',
        desc: 'Prof. Dr. Mehmet Demir ile bilimsel temelli, bireye özgü psikiyatri ve psikoterapi hizmetleri.',
        btn1: { text: 'Tanışalım', href: 'hakkimizda.html' },
        btn2: { text: 'Hizmetler', href: 'terapiler.html' }
    },
    {
        tag: 'Etkinlikler & Seminerler',
        title: 'Bilgi &amp; iyileşmenin <em>buluşma noktası</em>',
        desc: 'Psikiyatri, EMDR ve mindfulness alanlarında düzenlediğimiz konferans, workshop ve sertifika programlarını keşfedin.',
        btn1: { text: 'Etkinlikleri Gör', href: 'etkinlik-seminer.html' },
        btn2: { text: 'Randevu Al', href: 'iletisim.html' }
    },

    {
        tag: '20 yıllık deneyim',
        title: 'Prof. Dr. <em>Mehmet Demir</em>',
        desc: 'Yale Üniversitesi eğitimli, EMDR ve bilişsel davranışçı terapi uzmanı.',
        btn1: { text: 'Detaylı bilgi ', href: 'hakkimizda.html' },
        btn2: { text: 'Terapiler', href: 'terapiler.html' }
    }
];

function updateSlideContent(index) {
    const s = slides[index];
    const pad = n => String(n + 1).padStart(2, '0');

    const tagEl = document.getElementById('heroTagText');
    const titleEl = document.getElementById('heroTitle');
    const descEl = document.getElementById('heroDesc');
    const actionsEl = document.getElementById('heroActions');
    const numEl = document.getElementById('slideCurrentNum');

    if (!tagEl) return;

    // Çıkış animasyonu
    [tagEl, titleEl, descEl, actionsEl, numEl].forEach(el => {
        el.style.transition = 'opacity 0.3s, transform 0.3s';
        el.style.opacity = '0';
        el.style.transform = 'translateY(12px)';
    });

    setTimeout(() => {
        tagEl.textContent = s.tag;
        titleEl.innerHTML = s.title;
        descEl.textContent = s.desc;
        numEl.textContent = pad(index);
        actionsEl.innerHTML = `
                <a href="${s.btn1.href}" class="hero-btn-primary rounded-pill">
                    ${s.btn1.text}
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </a>
                <a href="${s.btn2.href}" class="hero-btn-ghost rounded-pill">${s.btn2.text}</a>
            `;
        [tagEl, titleEl, descEl, actionsEl, numEl].forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }, 300);

    // Progress güncelle
    document.querySelectorAll('.progress-item').forEach((item, i) => {
        item.classList.toggle('active', i === index);
        const fill = item.querySelector('.progress-bar-fill');
        fill.style.animation = 'none';
        fill.offsetHeight; // reflow
        if (i === index) fill.style.animation = '';
    });
}

const carousel = document.getElementById('heroCarousel');
if (carousel) {
    carousel.addEventListener('slide.bs.carousel', e => {
        updateSlideContent(e.to);
    });
}
// ===== FULL-SCREEN MENU: AKTİF SAYFA VURGULAMA =====
(function () {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.fs-menu-link').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
})();