// Shared Utility Functions
// Reusable functions used across the application

// ==========================================
// API & NETWORK
// ==========================================

// Generic API fetch function with error handling
async function fetchAPI(url, options = {}) {
  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching API:', error);
    return null;
  }
}

// ==========================================
// LOCAL STORAGE
// ==========================================

function getStorage(key, defaultValue = null) {
  try {
    const value = localStorage.getItem(key);
    if (value === null) return defaultValue;
    return JSON.parse(value);
  } catch (error) {
    console.error(`Error reading from localStorage (${key}):`, error);
    return defaultValue;
  }
}

function setStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error writing to localStorage (${key}):`, error);
    return false;
  }
}

function removeStorage(key) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing from localStorage (${key}):`, error);
    return false;
  }
}

// ==========================================
// INPUT SANITIZATION & SECURITY
// ==========================================

// Security patterns
const SECURITY_PATTERNS = {
  noHTML: /<[^>]*>/g,
  noScript: /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  sqlInjection: /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|SCRIPT)\b)/gi
};

// Sanitize user input to prevent XSS
function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  
  // Remove HTML tags
  let sanitized = input.replace(SECURITY_PATTERNS.noHTML, '');
  
  // Remove script tags
  sanitized = sanitized.replace(SECURITY_PATTERNS.noScript, '');
  
  // Trim whitespace
  sanitized = sanitized.trim();
  
  // Encode special characters
  const div = document.createElement('div');
  div.textContent = sanitized;
  sanitized = div.innerHTML;
  
  return sanitized;
}

// Check for SQL injection attempts
function containsSQLInjection(input) {
  return SECURITY_PATTERNS.sqlInjection.test(input);
}

// Check for XSS attempts
function containsXSS(input) {
  return SECURITY_PATTERNS.noHTML.test(input) || SECURITY_PATTERNS.noScript.test(input);
}

// ==========================================
// ID GENERATION
// ==========================================

// Generate unique ID with prefix
function generateId(prefix = 'ID') {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

// ==========================================
// FORM VALIDATION UI
// ==========================================

// Show error message on form input
function showInputError(input, message) {
  const formGroup = input.closest('.mb-3, .mb-4');
  if (!formGroup) return;
  
  const feedback = formGroup.querySelector('.invalid-feedback');
  
  input.classList.add('is-invalid');
  input.classList.remove('is-valid');
  
  if (feedback) {
    feedback.textContent = message;
  }
}

// Show success state on form input
function showInputSuccess(input) {
  const formGroup = input.closest('.mb-3, .mb-4');
  if (!formGroup) return;
  
  input.classList.remove('is-invalid');
  input.classList.add('is-valid');
}

// Clear validation state on form input
function clearInputValidation(input) {
  input.classList.remove('is-invalid', 'is-valid');
}

// ==========================================
// RATE LIMITING
// ==========================================

// Rate limiter class for form submissions
class RateLimiter {
  constructor(config = {}) {
    this.maxAttempts = config.maxAttempts || 3;
    this.cooldown = config.cooldown || 30000; // 30 seconds
    this.lockoutDuration = config.lockoutDuration || 300000; // 5 minutes
    
    this.attempts = 0;
    this.lastAttemptTime = 0;
    this.isLocked = false;
    this.lockoutEndTime = 0;
  }
  
  checkAllowed() {
    const currentTime = Date.now();
    
    // Check if locked out
    if (this.isLocked) {
      if (currentTime < this.lockoutEndTime) {
        const remainingTime = Math.ceil((this.lockoutEndTime - currentTime) / 1000);
        return { 
          allowed: false, 
          message: `Too many attempts. Please try again in ${remainingTime} seconds.` 
        };
      } else {
        // Unlock
        this.isLocked = false;
        this.attempts = 0;
      }
    }
    
    // Check cooldown
    if (this.lastAttemptTime > 0 && (currentTime - this.lastAttemptTime) < this.cooldown) {
      const remainingTime = Math.ceil((this.cooldown - (currentTime - this.lastAttemptTime)) / 1000);
      return { 
        allowed: false, 
        message: `Please wait ${remainingTime} seconds before trying again.` 
      };
    }
    
    // Check max attempts
    if (this.attempts >= this.maxAttempts) {
      this.isLocked = true;
      this.lockoutEndTime = currentTime + this.lockoutDuration;
      return { 
        allowed: false, 
        message: `Too many attempts. Please try again in ${Math.ceil(this.lockoutDuration / 60000)} minutes.` 
      };
    }
    
    return { allowed: true };
  }
  
  recordAttempt() {
    this.attempts++;
    this.lastAttemptTime = Date.now();
  }
  
  reset() {
    this.attempts = 0;
    this.lastAttemptTime = 0;
    this.isLocked = false;
    this.lockoutEndTime = 0;
  }
}
