// TravelSL - Main JavaScript
// Use only querySelector and querySelectorAll throughout the project

document.addEventListener('DOMContentLoaded', function() {
  // Load Components
  loadNavbar();
  loadFooter();
  
  // Set active nav link based on current page
  setActiveNavLink();
  
  // Add scroll effect to navbar
  handleNavbarScroll();
});

// Load navbar component
function loadNavbar() {
  const navbarPlaceholder = document.querySelector('#navbar-placeholder');
  if (navbarPlaceholder) {
    fetch('./components/navbar.html')
      .then(response => response.text())
      .then(data => {
        navbarPlaceholder.innerHTML = data;
        setActiveNavLink();
      })
      .catch(error => console.error('Error loading navbar:', error));
  }
}

// Load footer component
function loadFooter() {
  const footerPlaceholder = document.querySelector('#footer-placeholder');
  if (footerPlaceholder) {
    fetch('./components/footer.html')
      .then(response => response.text())
      .then(data => {
        footerPlaceholder.innerHTML = data;
        setCurrentYear();
      })
      .catch(error => console.error('Error loading footer:', error));
  }
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
