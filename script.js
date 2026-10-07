/**
 * Angelica Aniñon - Personal Portfolio JavaScript
 * Handles: Scroll Progress, Nav Blur, Mobile Drawer,
 * IntersectionObserver Reveals, Project Modal, and Contact Validation.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --- 1. Top Scroll Progress Indicator ---
  const scrollProgress = document.getElementById('scroll-progress');
  const updateScrollProgress = () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight <= 0) return;
    const progress = (window.scrollY / totalHeight) * 100;
    if (scrollProgress) {
      scrollProgress.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    }
  };

  // --- 2. Navbar Scrolled State ---
  const siteHeader = document.getElementById('main-header');
  const updateHeaderState = () => {
    if (!siteHeader) return;
    if (window.scrollY > 30) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', () => {
    updateScrollProgress();
    updateHeaderState();
  }, { passive: true });

  updateScrollProgress();
  updateHeaderState();

  // --- 3. Mobile Navigation Menu Toggle ---
  const menuToggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');

  if (menuToggle && mobileNav) {
    const toggleMenu = () => {
      const isOpen = menuToggle.classList.toggle('open');
      mobileNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      mobileNav.setAttribute('aria-hidden', String(!isOpen));
    };

    const closeMenu = () => {
      menuToggle.classList.remove('open');
      mobileNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      mobileNav.setAttribute('aria-hidden', 'true');
    };

    menuToggle.addEventListener('click', toggleMenu);

    // Close when clicking mobile nav links
    const mobileLinks = mobileNav.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close on click outside header
    document.addEventListener('click', (e) => {
      if (!siteHeader.contains(e.target) && mobileNav.classList.contains('open')) {
        closeMenu();
      }
    });
  }

  // --- 4. Active Navigation Highlighting on Scroll ---
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.desktop-nav .nav-link');

  const highlightNavOnScroll = () => {
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        desktopNavLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

  // --- 5. "More About Me" Accordion / Toggle ---
  const toggleAboutBtn = document.getElementById('toggle-about-details');
  const aboutExtended = document.getElementById('about-extended');
  const aboutBtnLabel = document.getElementById('about-btn-label');
  const aboutBtnIcon = document.getElementById('about-btn-icon');

  if (toggleAboutBtn && aboutExtended) {
    toggleAboutBtn.addEventListener('click', () => {
      const isExpanded = toggleAboutBtn.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        aboutExtended.hidden = true;
        aboutExtended.classList.remove('show');
        toggleAboutBtn.setAttribute('aria-expanded', 'false');
        if (aboutBtnLabel) aboutBtnLabel.textContent = 'More About Me';
        if (aboutBtnIcon) aboutBtnIcon.style.transform = 'rotate(0deg)';
      } else {
        aboutExtended.hidden = false;
        aboutExtended.classList.add('show');
        toggleAboutBtn.setAttribute('aria-expanded', 'true');
        if (aboutBtnLabel) aboutBtnLabel.textContent = 'Show Less';
        if (aboutBtnIcon) aboutBtnIcon.style.transform = 'rotate(180deg)';
      }
    });
  }

  // --- 6. Scroll Reveal Animations (IntersectionObserver) ---
  // Reveal section containers
  const revealElements = document.querySelectorAll(
    '.about-card, .skills-category, .vacant-state-card, .project-card, .journey-card, .contact-wrapper'
  );

  revealElements.forEach(el => {
    el.classList.add('reveal-init');
  });

  const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        const section = entry.target.closest('section');
        const header = section?.querySelector('.section-header');
        if (header) header.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => sectionObserver.observe(el));

  // Stagger skill cards within categories
  const skillCards = document.querySelectorAll('.skill-card');
  skillCards.forEach(card => card.classList.add('reveal-init'));

  const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll('.skill-card');
        cards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add('reveal-visible');
          }, index * 45);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.skills-category').forEach(cat => {
    skillObserver.observe(cat);
  });

  // --- 7. Project Details Modal Data & Handlers ---
  const projectDatabase = {
    '1': {
      title: 'Speed Detection and Warning System',
      tag: 'IoT • Vision • Public Safety',
      role: 'Lead System Developer',
      type: 'Physical Computing Prototype',
      description: 'A safety-focused embedded hardware and computer vision prototype engineered to monitor vehicle speeds, notify pedestrians in real time, and record incident logs for CCTV surveillance auditing.',
      features: [
        'Real-time vehicle speed estimation using camera feed sensor integration.',
        'Immediate visual/auditory pedestrian alert trigger upon threshold exceedance.',
        'Continuous logging of vehicular timestamp and speed metrics into SQLite.',
        'Lightweight Python backend coordinating ESP32-CAM video stream.'
      ],
      tech: ['Arduino', 'ESP32-CAM', 'Python', 'SQLite', 'Sensors']
    },
    '2': {
      title: 'Laundry Pickup and Delivery Management System',
      tag: 'Full-Stack Web Application',
      role: 'Full-Stack Developer',
      type: 'Web System & Database',
      description: 'A comprehensive web application designed for commercial laundry service operations, handling end-to-end customer bookings, scheduled pickups, washing cycle tracking, automated invoice generation, and courier dispatching.',
      features: [
        'Role-based portals for customers, staff technicians, and delivery couriers.',
        'Dynamic pickup and delivery calendar with scheduling conflict prevention.',
        'Real-time laundry progress status updates (Queued, In Wash, Drying, Dispatched).',
        'Secure billing, order history, and SQLite data persistence through Flask.'
      ],
      tech: ['Python', 'Flask', 'SQLite', 'HTML5', 'CSS3', 'JavaScript']
    },
    '3': {
      title: 'Ani AI',
      tag: 'AI & Natural Language Processing',
      role: 'Developer & Concept Designer',
      type: 'Interactive Educational Web App',
      description: 'An AI-driven English conversational companion created to assist learners in developing verbal fluency, conversational confidence, and grammatical accuracy through responsive contextual feedback.',
      features: [
        'Contextual dialogue simulation powered by Google Gemini API.',
        'Instant grammar diagnostics and polite phrasing suggestions.',
        'Scenario-based practice modules (Technical Interview, Casual Conversation, Formal Email).',
        'Lightweight, responsive web client providing real-time interactive chat streaming.'
      ],
      tech: ['AI', 'Gemini API', 'JavaScript', 'Web Development', 'CSS3']
    },
    '4': {
      title: 'Automated Class Scheduling and Faculty Loading System',
      tag: 'Academic Enterprise System',
      role: 'Software Architect & Backend Developer',
      type: 'Systems & Algorithm Design',
      description: 'An intelligent academic management system developed to resolve scheduling bottlenecks by auto-generating conflict-free timetables, balancing faculty teaching loads, and verifying room capacity constraints.',
      features: [
        'Conflict detection algorithm covering faculty, room assignments, and student sections.',
        'Faculty unit load balancing to prevent over-allocation and under-scheduling.',
        'Interactive timetable view with filters by department, room, and instructor.',
        'Relational database architecture built for academic institution scalability.'
      ],
      tech: ['Python', 'Database', 'Web Development', 'Relational Schemas']
    }
  };

  const projectModal = document.getElementById('project-modal');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalActionClose = document.getElementById('modal-action-close');

  const modalTitle = document.getElementById('modal-title');
  const modalTag = document.getElementById('modal-tag');
  const modalRole = document.getElementById('modal-role');
  const modalType = document.getElementById('modal-type');
  const modalDescription = document.getElementById('modal-description');
  const modalFeatures = document.getElementById('modal-features');
  const modalTags = document.getElementById('modal-tags');

  const openModal = (projectId) => {
    const data = projectDatabase[projectId];
    if (!data || !projectModal) return;

    modalTitle.textContent = data.title;
    modalTag.textContent = data.tag;
    modalRole.textContent = data.role;
    modalType.textContent = data.type;
    modalDescription.textContent = data.description;

    // Features
    modalFeatures.innerHTML = '';
    data.features.forEach(feat => {
      const li = document.createElement('li');
      li.textContent = feat;
      modalFeatures.appendChild(li);
    });

    // Tech tags
    modalTags.innerHTML = '';
    data.tech.forEach(t => {
      const span = document.createElement('span');
      span.className = 'tech-tag';
      span.textContent = t;
      modalTags.appendChild(span);
    });

    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    if (!projectModal) return;
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  // Attach event to project cards and view buttons
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const projectId = card.getAttribute('data-project-id');
      if (projectId) {
        openModal(projectId);
      }
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalActionClose) modalActionClose.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  // Close with Esc key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal?.classList.contains('active')) {
      closeModal();
    }
  });

  // --- 8. Contact Form Validation & Submission ---
  const contactForm = document.getElementById('portfolio-contact-form');
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const messageInput = document.getElementById('contact-message');
  const submitBtn = document.getElementById('submit-btn');
  const submitBtnText = document.getElementById('submit-btn-text');
  const formAlert = document.getElementById('form-alert');

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        nameInput.closest('.form-group').classList.add('has-error');
        isValid = false;
      } else {
        nameInput.closest('.form-group').classList.remove('has-error');
      }

      // Validate Email
      if (!isValidEmail(emailInput.value.trim())) {
        emailInput.closest('.form-group').classList.add('has-error');
        isValid = false;
      } else {
        emailInput.closest('.form-group').classList.remove('has-error');
      }

      // Validate Message
      if (!messageInput.value.trim()) {
        messageInput.closest('.form-group').classList.add('has-error');
        isValid = false;
      } else {
        messageInput.closest('.form-group').classList.remove('has-error');
      }

      if (!isValid) return;

      // Feedback state
      submitBtn.disabled = true;
      submitBtnText.textContent = 'Sending...';

      // Simulate sending submission
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtnText.textContent = 'Send Message';

        if (formAlert) {
          formAlert.hidden = false;
          formAlert.className = 'form-alert success';
          formAlert.textContent = `Thank you, ${nameInput.value.trim()}! Your message has been prepared. I will get back to you shortly.`;
        }

        contactForm.reset();

        setTimeout(() => {
          if (formAlert) {
            formAlert.hidden = true;
          }
        }, 8000);
      }, 700);
    });

    // Clear error on input
    [nameInput, emailInput, messageInput].forEach(field => {
      if (field) {
        field.addEventListener('input', () => {
          field.closest('.form-group')?.classList.remove('has-error');
        });
      }
    });
  }

  // --- 9. Dynamic Typing Effect in Hero ---
  const typedTextEl = document.getElementById('typed-text');
  if (typedTextEl) {
    const phrases = [
      'real-world problems',
      'modern web applications',
      'scalable database systems',
      'embedded IoT solutions'
    ];
    let phraseIndex = 0;
    let charIndex = phrases[0].length;
    let isDeleting = false;
    let typingSpeed = 90;

    const typeCycle = () => {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        typedTextEl.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 35;
      } else {
        typedTextEl.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 70;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        typingSpeed = 2200;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 350;
      }

      setTimeout(typeCycle, typingSpeed);
    };

    setTimeout(typeCycle, 2000);
  }

  // --- 10. Back to Top Floating Button ---
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 380) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --- 11. Live Interactive Tech Constellation Canvas Background ---
  const canvas = document.getElementById('live-bg-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 26 : 52;
    const maxDistance = isMobile ? 95 : 125;
    const mouseRadius = isMobile ? 100 : 155;

    const mouse = {
      x: null,
      y: null
    };

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    window.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches[0]) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      mouse.x = null;
      mouse.y = null;
    });

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }, 150);
    });

    class Particle {
      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        this.x = init ? Math.random() * width : Math.random() * width;
        this.y = init ? Math.random() * height : (Math.random() < 0.5 ? 0 : height);
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.radius = Math.random() * 1.5 + 1;
        this.isCyan = Math.random() > 0.45;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < -10) this.x = width + 10;
        else if (this.x > width + 10) this.x = -10;
        if (this.y < -10) this.y = height + 10;
        else if (this.y > height + 10) this.y = -10;

        // Subtle mouse reaction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouseRadius) {
            const force = (1 - dist / mouseRadius) * 0.025;
            this.x += dx * force;
            this.y += dy * force;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.isCyan
          ? 'rgba(56, 189, 248, 0.45)'
          : 'rgba(96, 165, 250, 0.45)';
        ctx.fill();
      }
    }

    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let animationFrameId;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.update();
        p1.draw();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.16;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }

        if (mouse.x !== null && mouse.y !== null) {
          const dx = p1.x - mouse.x;
          const dy = p1.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseRadius) {
            const alpha = (1 - dist / mouseRadius) * 0.35;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        render();
      }
    });
  }

});
