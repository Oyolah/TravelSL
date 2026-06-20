// TravelSL - Main JavaScript
// Use only querySelector and querySelectorAll throughout the project

document.addEventListener('DOMContentLoaded', function() {
  // Load Components
  loadNavbar();
  loadHero();
  loadFooter();
  
  // Set active nav link based on current page
  setActiveNavLink();
  
  // Add scroll effect to navbar
  handleNavbarScroll();
});

// Generic component loader
function loadComponent(componentName, placeholderId, callback = null) {
  const placeholder = document.querySelector(placeholderId);
  if (!placeholder) return;
  
  fetch(`./components/${componentName}.html`)
    .then(response => response.text())
    .then(data => {
      placeholder.innerHTML = data;
      if (callback && typeof callback === 'function') {
        callback();
      }
    })
    .catch(error => console.error(`Error loading ${componentName}:`, error));
}

// Load navbar component
function loadNavbar() {
  loadComponent('navbar', '#navbar-placeholder', function() {
    setActiveNavLink();
    initDarkMode();
    // Initialize Bootstrap Collapse for dynamically loaded navbar
    const collapseEl = document.querySelector('#navbarNav');
    if (collapseEl && typeof bootstrap !== 'undefined') {
      new bootstrap.Collapse(collapseEl, { toggle: false });
    }
  });
}

// Load hero component
function loadHero() {
  loadComponent('hero', '#hero-placeholder', setHeroContent);
}

// Set hero content based on page
function setHeroContent() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const heroTitle = document.querySelector('#hero-title');
  const heroSubtitle = document.querySelector('#hero-subtitle');
  
  if (!heroTitle || !heroSubtitle) return;
  
  const heroContent = {
    'destinations.html': {
      title: 'Destinations',
      subtitle: 'Explore the beautiful attractions and hidden gems of Freetown and Sierra Leone'
    },
    'wishlist.html': {
      title: 'My Wishlist',
      subtitle: 'Save your favorite destinations and plan your perfect trip'
    },
    'itinerary.html': {
      title: 'My Itinerary',
      subtitle: 'Build and manage your personalized travel itinerary'
    },
    'about.html': {
      title: 'About Us',
      subtitle: 'Learn more about Visit Freetown and our mission'
    },
    'contact.html': {
      title: 'Contact Us',
      subtitle: 'Get in touch with us for inquiries and bookings'
    }
  };
  
  const content = heroContent[currentPage] || {
    title: 'Visit Freetown',
    subtitle: 'Discover Sierra Leone\'s Capital City'
  };
  
  heroTitle.textContent = content.title;
  heroSubtitle.textContent = content.subtitle;
}

// Load footer component
function loadFooter() {
  loadComponent('footer', '#footer-placeholder', setCurrentYear);
}

// Set active nav link based on current page
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// Set current year in footer
function setCurrentYear() {
  const yearElement = document.querySelector('#currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// Handle navbar scroll effect
function handleNavbarScroll() {
  window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  });
}

// Dark Mode Toggle
function initDarkMode() {
  const toggle = document.querySelector('#darkModeToggle');
  if (!toggle) return;

  // Apply saved theme on load
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateToggleIcon(toggle, savedTheme);

  // Toggle on click
  toggle.addEventListener('click', function() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateToggleIcon(toggle, next);
  });
}

function updateToggleIcon(toggle, theme) {
  const icon = toggle.querySelector('i');
  if (theme === 'dark') {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }
}
