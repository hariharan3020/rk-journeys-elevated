// ===== MAIN JAVASCRIPT =====

// Loading Screen
window.addEventListener('load', () => {
  const loadingScreen = document.querySelector('.loading-screen');
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
    }, 1000);
  }
});

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
  mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
  });
}

// Close mobile menu when clicking a link
const navLinksItems = document.querySelectorAll('.nav-link');
navLinksItems.forEach(link => {
  link.addEventListener('click', () => {
    if (navLinks && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
    }
  });
});

// Sticky Navigation
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (navbar) {
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  
  lastScroll = currentScroll;
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Active Navigation Link
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  const scrollY = window.pageYOffset;
  
  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
      });
      if (navLink) navLink.classList.add('active');
    }
  });
});

// FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
  question.addEventListener('click', () => {
    const answer = question.nextElementSibling;
    const isActive = question.classList.contains('active');
    
    // Close all other FAQs
    faqQuestions.forEach(q => {
      q.classList.remove('active');
      if (q.nextElementSibling) {
        q.nextElementSibling.classList.remove('active');
      }
    });
    
    // Toggle current FAQ
    if (!isActive) {
      question.classList.add('active');
      if (answer) answer.classList.add('active');
    }
  });
});

// Form Validation
const forms = document.querySelectorAll('form');

forms.forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isValid = true;
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
      if (input.hasAttribute('required') && !input.value.trim()) {
        isValid = false;
        input.style.borderColor = '#D62828';
      } else {
        input.style.borderColor = '#ECECEC';
      }
      
      // Email validation
      if (input.type === 'email' && input.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value)) {
          isValid = false;
          input.style.borderColor = '#D62828';
        }
      }
    });
    
    if (isValid) {
      // Show success message
      const successMessage = document.createElement('div');
      successMessage.className = 'success-message';
      successMessage.style.cssText = `
        background: linear-gradient(135deg, #2E8B57, #236B42);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        margin-top: 1rem;
        text-align: center;
        animation: fadeInUp 0.5s ease;
      `;
      successMessage.textContent = 'Message sent successfully!';
      form.appendChild(successMessage);
      
      // Reset form
      form.reset();
      
      // Remove message after 3 seconds
      setTimeout(() => {
        successMessage.remove();
      }, 3000);
    }
  });
});

// Back to Top Button
const backToTopBtn = document.createElement('button');
backToTopBtn.className = 'back-to-top';
backToTopBtn.innerHTML = '↑';
backToTopBtn.style.cssText = `
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #D62828, #b71c1c);
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 999;
  box-shadow: 0 4px 15px rgba(214, 40, 40, 0.4);
`;

document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopBtn.style.opacity = '1';
    backToTopBtn.style.visibility = 'visible';
  } else {
    backToTopBtn.style.opacity = '0';
    backToTopBtn.style.visibility = 'hidden';
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Dynamic Year in Footer
const yearElements = document.querySelectorAll('.current-year');
yearElements.forEach(el => {
  el.textContent = new Date().getFullYear();
});

console.log('RK Journeys Elevated - Main JavaScript Loaded');
