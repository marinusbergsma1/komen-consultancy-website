/* ============================================
   KOMEN CONSULTANCY - MAIN JAVASCRIPT
   Hyper Modern SaaS Website
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- PRELOADER ----
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => preloader.classList.add('hidden'), 400);
    });
    // Fallback - hide after 3s
    setTimeout(() => preloader.classList.add('hidden'), 3000);
  }

  // ---- NAVBAR SCROLL EFFECT ----
  const navbar = document.querySelector('.navbar');
  const handleNavScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // ---- MOBILE MENU ----
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileOverlay = document.querySelector('.mobile-menu-overlay');
  const mobileClose = document.querySelector('.mobile-menu-close');

  const toggleMobileMenu = (open) => {
    if (open) {
      mobileMenu.classList.add('active');
      mobileOverlay.classList.add('active');
      hamburger.classList.add('active');
      document.body.style.overflow = 'hidden';
    } else {
      mobileMenu.classList.remove('active');
      mobileOverlay.classList.remove('active');
      hamburger.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  hamburger?.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('active');
    toggleMobileMenu(!isOpen);
  });

  mobileOverlay?.addEventListener('click', () => toggleMobileMenu(false));
  mobileClose?.addEventListener('click', () => toggleMobileMenu(false));

  // Close mobile menu on link click
  document.querySelectorAll('.mobile-menu-nav a').forEach(link => {
    link.addEventListener('click', () => toggleMobileMenu(false));
  });

  // ---- SMOOTH SCROLL FOR ANCHOR LINKS ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = navbar.offsetHeight + 20;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ---- CONTACT SLIDE-OUT PANEL ----
  const contactTab = document.querySelector('.contact-tab');
  const contactPanel = document.querySelector('.contact-panel');
  const contactOverlay = document.querySelector('.contact-panel-overlay');
  const contactClose = document.querySelector('.contact-panel-close');

  const toggleContactPanel = (open) => {
    if (open) {
      contactPanel.classList.add('active');
      contactOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    } else {
      contactPanel.classList.remove('active');
      contactOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  contactTab?.addEventListener('click', () => toggleContactPanel(true));
  contactOverlay?.addEventListener('click', () => toggleContactPanel(false));
  contactClose?.addEventListener('click', () => toggleContactPanel(false));

  // ---- AI CHATBOT ----
  const chatbotTrigger = document.querySelector('.chatbot-trigger');
  const chatbotWindow = document.querySelector('.chatbot-window');
  const chatbotClose = document.querySelector('.chatbot-header-close');
  const chatbotInput = document.querySelector('.chatbot-input');
  const chatbotSend = document.querySelector('.chatbot-send');
  const chatbotMessages = document.querySelector('.chatbot-messages');

  let chatbotOpen = false;

  const toggleChatbot = () => {
    chatbotOpen = !chatbotOpen;
    if (chatbotOpen) {
      chatbotWindow.classList.add('active');
      chatbotInput?.focus();
    } else {
      chatbotWindow.classList.remove('active');
    }
  };

  chatbotTrigger?.addEventListener('click', toggleChatbot);
  chatbotClose?.addEventListener('click', toggleChatbot);

  // Chat message data (trained on client pain points)
  const botResponses = {
    greetings: [
      "Welkom bij Komen Consultancy! Ik ben uw virtuele financieel adviseur. Waarmee kan ik u helpen?",
    ],
    boekhouding: "Wij verzorgen uw complete boekhouding, van dagelijkse administratie tot jaarrekeningen. Met onze Odoo-expertise automatiseren we processen zodat u meer tijd heeft voor uw onderneming. Wilt u een gratis consult plannen?",
    belasting: "Fiscale optimalisatie is een van onze specialiteiten. Met 15+ jaar ervaring, waaronder 5 jaar bij EY, zorgen we ervoor dat u geen euro teveel betaalt. Zullen we uw situatie bespreken?",
    odoo: "Wij zijn experts in Odoo implementatie en boekhouding. We helpen u met de volledige setup, migratie en optimalisatie van uw Odoo accounting systeem. Interesse in een demo?",
    pricing: "Onze tarieven zijn maatwerk, afgestemd op uw specifieke behoeften. We bieden flexibele pakketten voor zowel kleine als middelgrote bedrijven. Zullen we een vrijblijvend gesprek plannen?",
    cfo: "Als fractioneel CFO bieden we strategisch financieel leiderschap zonder de kosten van een fulltime CFO. Ideaal voor groeiende bedrijven die professioneel financieel management nodig hebben.",
    default: "Dank voor uw bericht! Ik help u graag verder. Voor een persoonlijk gesprek kunt u bellen naar +31 251 860 261 of een gratis consultatie boeken. Waar bent u specifiek naar op zoek?"
  };

  const getResponse = (message) => {
    const lower = message.toLowerCase();
    if (lower.includes('boekhou') || lower.includes('administratie') || lower.includes('jaarrekening'))
      return botResponses.boekhouding;
    if (lower.includes('belasting') || lower.includes('fiscaal') || lower.includes('btw') || lower.includes('tax'))
      return botResponses.belasting;
    if (lower.includes('odoo') || lower.includes('software') || lower.includes('implementatie'))
      return botResponses.odoo;
    if (lower.includes('prijs') || lower.includes('kost') || lower.includes('tarief') || lower.includes('betaal'))
      return botResponses.pricing;
    if (lower.includes('cfo') || lower.includes('controller') || lower.includes('strategi'))
      return botResponses.cfo;
    return botResponses.default;
  };

  const addMessage = (text, isUser = false) => {
    const messageEl = document.createElement('div');
    messageEl.className = `chat-message ${isUser ? 'user' : 'bot'}`;

    if (!isUser) {
      messageEl.innerHTML = `
        <div class="chat-message-avatar">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
          </svg>
        </div>
        <div class="chat-message-bubble">${text}</div>
      `;
    } else {
      messageEl.innerHTML = `
        <div class="chat-message-bubble">${text}</div>
      `;
    }

    chatbotMessages?.appendChild(messageEl);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  };

  const showTyping = () => {
    const typing = document.createElement('div');
    typing.className = 'chat-message bot';
    typing.id = 'typing-indicator';
    typing.innerHTML = `
      <div class="chat-message-avatar">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
        </svg>
      </div>
      <div class="typing-indicator">
        <span></span><span></span><span></span>
      </div>
    `;
    chatbotMessages?.appendChild(typing);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  };

  const removeTyping = () => {
    document.getElementById('typing-indicator')?.remove();
  };

  const sendMessage = () => {
    const message = chatbotInput?.value.trim();
    if (!message) return;

    addMessage(message, true);
    chatbotInput.value = '';

    // Remove quick replies
    document.querySelector('.chat-quick-replies')?.remove();

    showTyping();

    setTimeout(() => {
      removeTyping();
      addMessage(getResponse(message));
    }, 1200 + Math.random() * 800);
  };

  chatbotSend?.addEventListener('click', sendMessage);
  chatbotInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });

  // Quick reply buttons
  document.querySelectorAll('.chat-quick-reply').forEach(btn => {
    btn.addEventListener('click', () => {
      chatbotInput.value = btn.textContent;
      sendMessage();
    });
  });

  // ---- SCROLL REVEAL ANIMATIONS ----
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ---- COUNTER ANIMATION ----
  const counters = document.querySelectorAll('.stat-number[data-target]');

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const duration = 2000;
    const start = performance.now();

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);

      el.textContent = prefix + current.toLocaleString('nl-NL') + suffix;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };

    requestAnimationFrame(updateCounter);
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  // ---- CHART BAR ANIMATION ----
  const chartBars = document.querySelectorAll('.dash-chart-bar');
  const chartObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bars = entry.target.querySelectorAll('.dash-chart-bar');
        bars.forEach((bar, i) => {
          bar.style.animationDelay = `${i * 0.08}s`;
        });
      }
    });
  }, { threshold: 0.3 });

  const chartContainer = document.querySelector('.dash-chart-bars');
  if (chartContainer) chartObserver.observe(chartContainer);

  // ---- BACK TO TOP ----
  const backToTop = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
      backToTop?.classList.add('visible');
    } else {
      backToTop?.classList.remove('visible');
    }
  }, { passive: true });

  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ---- CURSOR GLOW EFFECT ----
  const cursorGlow = document.querySelector('.cursor-glow');
  if (cursorGlow && window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top = e.clientY + 'px';
      cursorGlow.classList.add('active');
    });

    document.addEventListener('mouseleave', () => {
      cursorGlow.classList.remove('active');
    });
  }

  // ---- NAVBAR ACTIVE LINK ON SCROLL ----
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-nav a[href^="#"]');

  const updateActiveNav = () => {
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // ---- PARALLAX EFFECT ON HERO ORBS ----
  const orbs = document.querySelectorAll('.hero-orb');
  if (orbs.length && window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      orbs.forEach((orb, i) => {
        const speed = 0.1 + (i * 0.05);
        orb.style.transform = `translateY(${scrolled * speed}px)`;
      });
    }, { passive: true });
  }

  // ---- FORM HANDLING (Contact Panel) ----
  const contactForm = document.querySelector('.contact-panel-form form');
  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Visual feedback
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Verzonden!';
    submitBtn.style.background = 'var(--success)';

    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.style.background = '';
      contactForm.reset();
    }, 3000);

    console.log('Form submitted:', data);
  });

  // ---- TILT EFFECT ON SERVICE CARDS ----
  if (window.innerWidth > 768) {
    const tiltCards = document.querySelectorAll('.service-card, .usp-card');

    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // ---- AUTO-OPEN CHATBOT AFTER DELAY ----
  setTimeout(() => {
    if (!chatbotOpen && window.innerWidth > 768) {
      chatbotTrigger?.style.setProperty('animation', 'bounce 0.6s ease');
      setTimeout(() => {
        chatbotTrigger?.style.removeProperty('animation');
      }, 600);
    }
  }, 8000);

  // ---- FAQ ACCORDION ----
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isActive = item.classList.contains('active');

      // Close all
      document.querySelectorAll('.faq-item.active').forEach(other => {
        other.classList.remove('active');
        other.querySelector('.faq-answer').style.maxHeight = '0';
      });

      // Open clicked (if wasn't already open)
      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // ---- CONTACT PAGE FORM ----
  const pageContactForm = document.querySelector('.contact-form-section form');
  pageContactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = pageContactForm.querySelector('button[type="submit"]');
    const originalHTML = submitBtn.innerHTML;
    submitBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width:18px;height:18px"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg> Verzonden!';
    submitBtn.style.background = 'var(--success)';
    setTimeout(() => {
      submitBtn.innerHTML = originalHTML;
      submitBtn.style.background = '';
      pageContactForm.reset();
    }, 3000);
  });

  // ---- NAVBAR ACTIVE STATE (multi-page) ----
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && !href.startsWith('#')) {
      const linkPage = href.split('/').pop();
      if (currentPage === linkPage || (currentPage.includes(linkPage.replace('.html','')) && linkPage !== 'index.html')) {
        link.classList.add('active');
      }
    }
  });

});
