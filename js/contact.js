// Contact Form Validation and Security
(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    NAME_MIN_LENGTH: 2,
    NAME_MAX_LENGTH: 50,
    MESSAGE_MIN_LENGTH: 10,
    MESSAGE_MAX_LENGTH: 1000,
    PHONE_MIN_LENGTH: 10,
    PHONE_MAX_LENGTH: 20,
    SUBMISSION_COOLDOWN: 60000, // 1 minute in milliseconds
    MAX_ATTEMPTS: 3,
    LOCKOUT_DURATION: 300000 // 5 minutes in milliseconds
  };

  // Security tracking
  let submissionAttempts = 0;
  let lastSubmissionTime = 0;
  let isLocked = false;
  let lockoutEndTime = 0;

  // Validation patterns
  const PATTERNS = {
    name: /^[a-zA-Z\s'-]+$/,
    email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    phone: /^[\d\s\+\-\(\)]+$/,
    noHTML: /<[^>]*>/g,
    noScript: /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    sqlInjection: /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|SCRIPT)\b)/gi
  };

  // Sanitization function
  function sanitizeInput(input) {
    if (typeof input !== 'string') return '';
    
    // Remove HTML tags
    let sanitized = input.replace(PATTERNS.noHTML, '');
    
    // Remove script tags
    sanitized = sanitized.replace(PATTERNS.noScript, '');
    
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
    return PATTERNS.sqlInjection.test(input);
  }

  // Check for XSS attempts
  function containsXSS(input) {
    return PATTERNS.noHTML.test(input) || PATTERNS.noScript.test(input);
  }

  // Generate reference number
  function generateReferenceNumber() {
    const prefix = 'INQ';
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${prefix}-${timestamp}-${random}`;
  }

  // Save inquiry to localStorage
  function saveInquiry(inquiry) {
    try {
      let inquiries = JSON.parse(localStorage.getItem('contactInquiries') || '[]');
      inquiries.push(inquiry);
      localStorage.setItem('contactInquiries', JSON.stringify(inquiries));
    } catch (error) {
      console.error('Error saving inquiry:', error);
    }
  }

  // Validate name
  function validateName(name) {
    const sanitized = sanitizeInput(name);
    
    if (!sanitized) {
      return { valid: false, message: 'Name is required' };
    }
    
    if (sanitized.length < CONFIG.NAME_MIN_LENGTH) {
      return { valid: false, message: `Name must be at least ${CONFIG.NAME_MIN_LENGTH} characters` };
    }
    
    if (sanitized.length > CONFIG.NAME_MAX_LENGTH) {
      return { valid: false, message: `Name must not exceed ${CONFIG.NAME_MAX_LENGTH} characters` };
    }
    
    if (!PATTERNS.name.test(sanitized)) {
      return { valid: false, message: 'Name can only contain letters, spaces, hyphens, and apostrophes' };
    }
    
    if (containsSQLInjection(sanitized)) {
      return { valid: false, message: 'Invalid characters detected' };
    }
    
    return { valid: true, value: sanitized };
  }

  // Validate email
  function validateEmail(email) {
    const sanitized = sanitizeInput(email);
    
    if (!sanitized) {
      return { valid: false, message: 'Email is required' };
    }
    
    if (!PATTERNS.email.test(sanitized)) {
      return { valid: false, message: 'Please enter a valid email address' };
    }
    
    if (sanitized.length > 100) {
      return { valid: false, message: 'Email address is too long' };
    }
    
    if (containsSQLInjection(sanitized) || containsXSS(sanitized)) {
      return { valid: false, message: 'Invalid email format' };
    }
    
    return { valid: true, value: sanitized.toLowerCase() };
  }

  // Validate phone
  function validatePhone(phone) {
    if (!phone) {
      return { valid: true, value: '' }; // Phone is optional
    }
    
    const sanitized = sanitizeInput(phone);
    
    if (sanitized.length < CONFIG.PHONE_MIN_LENGTH) {
      return { valid: false, message: `Phone number must be at least ${CONFIG.PHONE_MIN_LENGTH} digits` };
    }
    
    if (sanitized.length > CONFIG.PHONE_MAX_LENGTH) {
      return { valid: false, message: `Phone number is too long` };
    }
    
    if (!PATTERNS.phone.test(sanitized)) {
      return { valid: false, message: 'Phone number can only contain digits, spaces, +, -, (, )' };
    }
    
    // Remove non-digit characters and check length
    const digitsOnly = sanitized.replace(/\D/g, '');
    if (digitsOnly.length < 10) {
      return { valid: false, message: 'Phone number must contain at least 10 digits' };
    }
    
    return { valid: true, value: sanitized };
  }

  // Validate subject
  function validateSubject(subject) {
    const sanitized = sanitizeInput(subject);
    
    if (!sanitized) {
      return { valid: false, message: 'Please select a subject' };
    }
    
    const validSubjects = ['general', 'booking', 'destinations', 'accommodation', 'feedback', 'other'];
    if (!validSubjects.includes(sanitized)) {
      return { valid: false, message: 'Please select a valid subject' };
    }
    
    return { valid: true, value: sanitized };
  }

  // Validate message
  function validateMessage(message) {
    const sanitized = sanitizeInput(message);
    
    if (!sanitized) {
      return { valid: false, message: 'Message is required' };
    }
    
    if (sanitized.length < CONFIG.MESSAGE_MIN_LENGTH) {
      return { valid: false, message: `Message must be at least ${CONFIG.MESSAGE_MIN_LENGTH} characters` };
    }
    
    if (sanitized.length > CONFIG.MESSAGE_MAX_LENGTH) {
      return { valid: false, message: `Message must not exceed ${CONFIG.MESSAGE_MAX_LENGTH} characters` };
    }
    
    if (containsSQLInjection(sanitized) || containsXSS(sanitized)) {
      return { valid: false, message: 'Message contains invalid characters' };
    }
    
    return { valid: true, value: sanitized };
  }

  // Check rate limiting
  function checkRateLimit() {
    const currentTime = Date.now();
    
    // Check if locked out
    if (isLocked) {
      if (currentTime < lockoutEndTime) {
        const remainingTime = Math.ceil((lockoutEndTime - currentTime) / 1000);
        return { allowed: false, message: `Too many attempts. Please try again in ${remainingTime} seconds.` };
      } else {
        // Unlock
        isLocked = false;
        submissionAttempts = 0;
      }
    }
    
    // Check cooldown
    if (lastSubmissionTime > 0 && (currentTime - lastSubmissionTime) < CONFIG.SUBMISSION_COOLDOWN) {
      const remainingTime = Math.ceil((CONFIG.SUBMISSION_COOLDOWN - (currentTime - lastSubmissionTime)) / 1000);
      return { allowed: false, message: `Please wait ${remainingTime} seconds before submitting again.` };
    }
    
    // Check max attempts
    if (submissionAttempts >= CONFIG.MAX_ATTEMPTS) {
      isLocked = true;
      lockoutEndTime = currentTime + CONFIG.LOCKOUT_DURATION;
      return { allowed: false, message: `Too many submission attempts. Please try again in 5 minutes.` };
    }
    
    return { allowed: true };
  }

  // Show error message
  function showError(input, message) {
    const formGroup = input.closest('.mb-3, .mb-4');
    const feedback = formGroup.querySelector('.invalid-feedback');
    
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
    feedback.textContent = message;
  }

  // Show success
  function showSuccess(input) {
    const formGroup = input.closest('.mb-3, .mb-4');
    
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
  }

  // Clear validation
  function clearValidation(input) {
    input.classList.remove('is-invalid', 'is-valid');
  }

  // Show form message
  function showFormMessage(message, type) {
    const messageDiv = document.querySelector('#formMessage');
    const alertClass = type === 'success' ? 'alert-success' : 'alert-danger';
    
    messageDiv.innerHTML = `
      <div class="alert ${alertClass} alert-dismissible fade show" role="alert">
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'} me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      </div>
    `;
    
    // Scroll to message
    messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // Initialize form
  document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('#contactForm');
    const nameInput = document.querySelector('#name');
    const emailInput = document.querySelector('#email');
    const phoneInput = document.querySelector('#phone');
    const subjectInput = document.querySelector('#subject');
    const messageInput = document.querySelector('#message');
    const termsInput = document.querySelector('#terms');
    const submitBtn = document.querySelector('#submitBtn');
    const charCount = document.querySelector('#charCount');

    // Character counter for message
    messageInput.addEventListener('input', function() {
      const length = this.value.length;
      charCount.textContent = length;
      
      if (length > CONFIG.MESSAGE_MAX_LENGTH) {
        this.value = this.value.substring(0, CONFIG.MESSAGE_MAX_LENGTH);
        charCount.textContent = CONFIG.MESSAGE_MAX_LENGTH;
      }
    });

    // Real-time validation
    nameInput.addEventListener('blur', function() {
      const result = validateName(this.value);
      if (!result.valid) {
        showError(this, result.message);
      } else {
        showSuccess(this);
      }
    });

    emailInput.addEventListener('blur', function() {
      const result = validateEmail(this.value);
      if (!result.valid) {
        showError(this, result.message);
      } else {
        showSuccess(this);
      }
    });

    phoneInput.addEventListener('blur', function() {
      if (this.value) {
        const result = validatePhone(this.value);
        if (!result.valid) {
          showError(this, result.message);
        } else {
          showSuccess(this);
        }
      } else {
        clearValidation(this);
      }
    });

    subjectInput.addEventListener('change', function() {
      const result = validateSubject(this.value);
      if (!result.valid) {
        showError(this, result.message);
      } else {
        showSuccess(this);
      }
    });

    messageInput.addEventListener('blur', function() {
      const result = validateMessage(this.value);
      if (!result.valid) {
        showError(this, result.message);
      } else {
        showSuccess(this);
      }
    });

    termsInput.addEventListener('change', function() {
      const formGroup = this.closest('.mb-4');
      const feedback = formGroup.querySelector('.invalid-feedback');
      
      if (!this.checked) {
        this.classList.add('is-invalid');
        feedback.textContent = 'You must agree to the terms and conditions';
      } else {
        this.classList.remove('is-invalid');
        this.classList.add('is-valid');
      }
    });

    // Form submission
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Check rate limiting
      const rateLimitCheck = checkRateLimit();
      if (!rateLimitCheck.allowed) {
        showFormMessage(rateLimitCheck.message, 'error');
        return;
      }
      
      // Validate all fields
      const nameResult = validateName(nameInput.value);
      const emailResult = validateEmail(emailInput.value);
      const phoneResult = validatePhone(phoneInput.value);
      const subjectResult = validateSubject(subjectInput.value);
      const messageResult = validateMessage(messageInput.value);
      
      let isValid = true;
      
      // Show validation results
      if (!nameResult.valid) {
        showError(nameInput, nameResult.message);
        isValid = false;
      } else {
        showSuccess(nameInput);
      }
      
      if (!emailResult.valid) {
        showError(emailInput, emailResult.message);
        isValid = false;
      } else {
        showSuccess(emailInput);
      }
      
      if (phoneInput.value && !phoneResult.valid) {
        showError(phoneInput, phoneResult.message);
        isValid = false;
      } else if (phoneInput.value) {
        showSuccess(phoneInput);
      }
      
      if (!subjectResult.valid) {
        showError(subjectInput, subjectResult.message);
        isValid = false;
      } else {
        showSuccess(subjectInput);
      }
      
      if (!messageResult.valid) {
        showError(messageInput, messageResult.message);
        isValid = false;
      } else {
        showSuccess(messageInput);
      }
      
      if (!termsInput.checked) {
        const formGroup = termsInput.closest('.mb-4');
        const feedback = formGroup.querySelector('.invalid-feedback');
        termsInput.classList.add('is-invalid');
        feedback.textContent = 'You must agree to the terms and conditions';
        isValid = false;
      }
      
      if (!isValid) {
        showFormMessage('Please correct the errors in the form.', 'error');
        return;
      }
      
      // Update rate limiting
      submissionAttempts++;
      lastSubmissionTime = Date.now();
      
      // Disable submit button
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
      
      // Generate reference number
      const referenceNumber = generateReferenceNumber();
      
      // Create inquiry object
      const inquiry = {
        referenceNumber: referenceNumber,
        name: nameResult.value,
        email: emailResult.value,
        phone: phoneResult.value || 'Not provided',
        subject: subjectResult.value,
        message: messageResult.value,
        timestamp: new Date().toISOString(),
        status: 'pending'
      };
      
      // Store in localStorage
      saveInquiry(inquiry);
      
      // Simulate form submission (replace with actual API call)
      setTimeout(function() {
        // Success with reference number
        showFormMessage(
          `Thank you for your message! Your inquiry has been submitted successfully.<br>
          <strong>Reference Number: ${referenceNumber}</strong><br>
          Please save this reference number for future correspondence. We will get back to you within 24-48 hours.`,
          'success'
        );
        
        // Reset form
        form.reset();
        form.querySelectorAll('.is-valid, .is-invalid').forEach(el => {
          el.classList.remove('is-valid', 'is-invalid');
        });
        charCount.textContent = '0';
        
        // Re-enable button
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Send Message';
        
        // Reset attempts on successful submission
        submissionAttempts = 0;
      }, 2000);
    });

    // Prevent paste of HTML/scripts
    [nameInput, emailInput, phoneInput, messageInput].forEach(input => {
      input.addEventListener('paste', function(e) {
        setTimeout(() => {
          if (containsXSS(this.value) || containsSQLInjection(this.value)) {
            this.value = sanitizeInput(this.value);
            showError(this, 'Pasted content contained invalid characters and was cleaned');
          }
        }, 0);
      });
    });
  });
})();
