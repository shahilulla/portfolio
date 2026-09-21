// ====== THEME TOGGLE ======
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const moonIcon = themeToggle.querySelector('.moon-icon');
const sunIcon = themeToggle.querySelector('.sun-icon');

function setTheme(theme) {
    root.dataset.theme = theme;
    localStorage.setItem('theme', theme);
    if (theme === 'light') {
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
    } else {
        moonIcon.style.display = 'block';
        sunIcon.style.display = 'none';
    }
}

const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme);

themeToggle.addEventListener('click', () => {
    const next = root.dataset.theme === 'light' ? 'dark' : 'light';
    setTheme(next);
});

// ====== MOBILE NAV ======
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    menuBtn.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuBtn.classList.remove('open');
    });
});

// ====== PRELOADER ======
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 500);
    initParticles();
});

// ====== SCROLL PROGRESS RING ======
const scrollRing = document.getElementById('scrollRing');
const ringProgress = scrollRing.querySelector('.ring-progress');
const ringPercent = document.getElementById('ringPercent');
const circumference = 2 * Math.PI * 45;
ringProgress.style.strokeDasharray = circumference;

function updateScrollRing() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollTop / docHeight;
    const offset = circumference * (1 - progress);
    ringProgress.style.strokeDashoffset = offset;
    ringPercent.textContent = Math.round(progress * 100) + '%';
}

// ====== SCROLL EVENTS ======
const backToTop = document.getElementById('backToTop');
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;

    updateScrollRing();

    if (scrollTop > 300) {
        backToTop.classList.add('visible');
        nav.classList.add('scrolled');
    } else {
        backToTop.classList.remove('visible');
        nav.classList.remove('scrolled');
    }

    updateActiveLink();
    revealOnScroll();
    animateStats();
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ====== ACTIVE NAV LINK ======
const sections = document.querySelectorAll('.section[id]');
const navLinksAll = document.querySelectorAll('#navLinks a');

function updateActiveLink() {
    const scrollY = window.scrollY;
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionBottom = sectionTop + section.offsetHeight;
        if (scrollY >= sectionTop && scrollY < sectionBottom) {
            const id = section.getAttribute('id');
            navLinksAll.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ====== TYPING EFFECT ======
const roles = ['DATA ENGINEER', 'SOFTWARE ENGINEER', 'BACKEND DEVELOPER', 'RESEARCHER', 'PROBLEM SOLVER'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingText = document.getElementById('typingText');

function typeEffect() {
    const currentRole = roles[roleIndex];
    if (!isDeleting) {
        charIndex++;
        typingText.textContent = currentRole.substring(0, charIndex);
        if (charIndex === currentRole.length) {
            isDeleting = true;
            setTimeout(typeEffect, 2000);
            return;
        }
    } else {
        charIndex--;
        typingText.textContent = currentRole.substring(0, charIndex);
        if (charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }
    }
    setTimeout(typeEffect, isDeleting ? 50 : 100);
}
typeEffect();

// ====== REVEAL ON SCROLL ======
const revealElements = document.querySelectorAll('.reveal');

function revealOnScroll() {
    revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85) {
            el.classList.add('visible');
        }
    });
}

revealOnScroll();

// ====== STATS COUNTER ======
const statNumbers = document.querySelectorAll('.stat-number');

function animateStats() {
    statNumbers.forEach(num => {
        const rect = num.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8 && !num.classList.contains('counted')) {
            num.classList.add('counted');
            const target = parseInt(num.parentElement.getAttribute('data-count'));
            let current = 0;
            const increment = Math.ceil(target / 40);
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                num.textContent = current;
            }, 30);
        }
    });
}

// ====== PROJECT MODAL ======
const content = {
    nexus: {
        label: 'DATA ENGINEERING & ANALYTICS',
        title: 'NexusFlow',
        intro: 'A data engineering and analytics platform focused on structured data pipelines, PostgreSQL, SQL, data modeling, ETL workflows, and analytical reporting.',
        sections: [
            ['01 — Problem', 'Organize structured library and education data into a reliable workflow that supports downstream analytics and reporting.'],
            ['02 — Approach', 'Design structured data models and ETL-oriented workflows around PostgreSQL and SQL, with analytics components layered on top.'],
            ['03 — Architecture', 'Data Sources → Data Modeling → ETL → PostgreSQL → Analytics → Reporting'],
            ['04 — Technical Focus', 'PostgreSQL, SQL, data modeling, ETL workflows, structured pipelines, analytical reporting.'],
            ['05 — Status', 'In development. Additional implementation details will be added as the platform evolves.']
        ]
    },
    health: {
        label: 'DATA ENGINEERING',
        title: 'Healthcare Data Pipeline',
        intro: 'A healthcare-oriented data pipeline using Python, SQL, PostgreSQL, PySpark, and cloud-oriented architecture for transformation, validation, and analytics.',
        sections: [
            ['01 — Pipeline', 'Source Data → Ingestion → Python / PySpark → Transformation → Validation → PostgreSQL / Cloud → Analytics'],
            ['02 — Technical Focus', 'ETL, data transformation, data validation, PySpark processing, PostgreSQL, and cloud-oriented architecture.'],
            ['03 — Tools', 'Python, SQL, PostgreSQL, PySpark, Databricks / GCP.'],
            ['04 — Status', 'In progress. Do not interpret the project as a production healthcare deployment.']
        ]
    },
    library: {
        label: 'DATABASE & ANALYTICS',
        title: 'Library Data Management System',
        intro: 'A normalized PostgreSQL database system for library operations and analytics.',
        sections: [
            ['01 — Database Design', 'Normalized relational schema with constraints designed to support consistent library operations.'],
            ['02 — Database Logic', 'SQL views, PL/pgSQL functions, procedures, and triggers support operational workflows and automated database logic.'],
            ['03 — Analytics', 'Borrowing trends, overdue users, returns, and fine calculation are supported through database queries and reporting workflows.'],
            ['04 — Tools', 'PostgreSQL, SQL, PL/pgSQL, Power BI, Excel.']
        ]
    },
    research: {
        label: 'RESEARCH · CLOUD-NATIVE SYSTEMS',
        title: 'Adaptive AI-Enhanced Root Cause Analysis Framework',
        intro: 'A research framework for explainable root cause analysis in cloud-native microservice systems under partial observability.',
        sections: [
            ['01 — Problem', 'Cloud-native systems generate heterogeneous telemetry. Missing or inconsistent logs, metrics, traces, and request data can make root cause analysis unreliable.'],
            ['02 — Method', 'The research workflow includes data preprocessing, partial observability simulation, missing-data recovery, feature engineering, anomaly detection, root-cause classification, ensemble prediction, and explainability.'],
            ['03 — Models & Explainability', 'Isolation Forest is used for anomaly detection. Random Forest and XGBoost are used for root-cause classification. SHAP is used to explain feature contributions.'],
            ['04 — Root Causes', 'Normal; CPU / Resource Issue; Database Failure; Network / Latency Failure; Service / Application Failure.'],
            ['05 — Reported Results', 'The research paper reports 94.2% accuracy for the ensemble approach, compared with 91.8% for Random Forest and 92.7% for XGBoost. These are reported experimental results from the research work, not general industry claims.'],
            ['06 — Interface', 'A Streamlit interface supports single and batch predictions, confidence, anomaly status, telemetry reliability, missing-data information, model comparisons, and prediction history.']
        ]
    }
};

const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');
const modalClose = document.getElementById('modalClose');
const modalX = document.getElementById('modalX');

function openProject(key) {
    const p = content[key];
    modalContent.innerHTML = `
        <div class="project-meta">${p.label}</div>
        <h3>${p.title}</h3>
        <p>${p.intro}</p>
        ${p.sections.map(s => `<div class="modal-section"><h4>${s[0]}</h4><p>${s[1]}</p></div>`).join('')}
    `;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

document.querySelectorAll('[data-project]').forEach(btn => {
    btn.addEventListener('click', () => openProject(btn.dataset.project));
});

function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}
modalClose.addEventListener('click', closeModal);
modalX.addEventListener('click', closeModal);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

// ====== MAGNETIC BUTTONS ======
if (window.innerWidth > 780) {
    document.querySelectorAll('.magnetic').forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = '';
        });
    });
}

// ====== TILT EFFECT ======
if (window.innerWidth > 780) {
    document.querySelectorAll('.tilt-element').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

// ====== CUSTOM CURSOR ======
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
let mouseX = -100, mouseY = -100;
let ringX = -100, ringY = -100;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
});

function animateCursorRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    requestAnimationFrame(animateCursorRing);
}
animateCursorRing();

document.querySelectorAll('a, button, .project, .skill-card, .contact-link-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorDot.style.width = '12px';
        cursorDot.style.height = '12px';
        cursorRing.style.width = '50px';
        cursorRing.style.height = '50px';
        cursorRing.style.borderColor = 'var(--accent2)';
    });
    el.addEventListener('mouseleave', () => {
        cursorDot.style.width = '8px';
        cursorDot.style.height = '8px';
        cursorRing.style.width = '35px';
        cursorRing.style.height = '35px';
        cursorRing.style.borderColor = 'var(--accent)';
    });
});

// ====== PARTICLES ======
function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    const count = 80;

    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            size: Math.random() * 2 + 0.5,
            opacity: Math.random() * 0.5 + 0.2
        });
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(239, 68, 68, ${p.opacity})`; // red particles
            ctx.fill();
        });
        requestAnimationFrame(drawParticles);
    }
    drawParticles();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ====== SMOOTH SCROLL ======
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Combined scroll handler for stats and reveal
window.addEventListener('scroll', () => {
    animateStats();
    revealOnScroll();
});