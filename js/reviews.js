// Review System
(function() {
  'use strict';

  // Initialize reviews on page load
  document.addEventListener('DOMContentLoaded', function() {
    const reviewForm = document.querySelector('#reviewForm');
    const reviewsContainer = document.querySelector('#reviewsContainer');
    const sortSelect = document.querySelector('#reviewSort');
    const filterSelect = document.querySelector('#reviewFilter');
    
    if (reviewForm) {
      initializeReviewForm();
    }
    
    if (reviewsContainer) {
      const destinationId = reviewsContainer.getAttribute('data-destination-id');
      if (destinationId) {
        displayReviews(destinationId);
      }
    }
    
    if (sortSelect) {
      sortSelect.addEventListener('change', function() {
        const destinationId = reviewsContainer.getAttribute('data-destination-id');
        displayReviews(destinationId);
      });
    }
    
    if (filterSelect) {
      filterSelect.addEventListener('change', function() {
        const destinationId = reviewsContainer.getAttribute('data-destination-id');
        displayReviews(destinationId);
      });
    }
  });

  // Initialize review form with star rating
  function initializeReviewForm() {
    const form = document.querySelector('#reviewForm');
    const stars = document.querySelectorAll('.star-rating .star');
    const ratingInput = document.querySelector('#rating');
    const nameInput = document.querySelector('#reviewerName');
    const commentInput = document.querySelector('#reviewComment');
    const charCount = document.querySelector('#reviewCharCount');
    
    // Star rating interaction
    stars.forEach((star, index) => {
      star.addEventListener('click', function() {
        const rating = index + 1;
        ratingInput.value = rating;
        updateStars(rating);
      });
      
      star.addEventListener('mouseenter', function() {
        const rating = index + 1;
        updateStars(rating);
      });
    });
    
    document.querySelector('.star-rating').addEventListener('mouseleave', function() {
      const currentRating = parseInt(ratingInput.value) || 0;
      updateStars(currentRating);
    });
    
    // Character counter
    if (commentInput && charCount) {
      commentInput.addEventListener('input', function() {
        const length = this.value.length;
        charCount.textContent = length;
        
        if (length > 300) {
          this.value = this.value.substring(0, 300);
          charCount.textContent = 300;
        }
      });
    }
    
    // Form submission
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const rating = parseInt(ratingInput.value);
      const name = nameInput.value.trim();
      const comment = commentInput.value.trim();
      const destinationId = form.getAttribute('data-destination-id');
      
      // Validation
      if (!rating || rating < 1 || rating > 5) {
        showMessage('Please select a star rating', 'error');
        return;
      }
      
      if (!name || name.length < 2) {
        showMessage('Please enter your name (at least 2 characters)', 'error');
        return;
      }
      
      if (!comment || comment.length < 10) {
        showMessage('Review must be at least 10 characters', 'error');
        return;
      }
      
      // Check if user already reviewed this destination
      if (hasUserReviewed(destinationId)) {
        showMessage('You have already submitted a review for this destination.', 'error');
        return;
      }
      
      // Create review object
      const review = {
        id: generateReviewId(),
        destinationId: destinationId,
        rating: rating,
        name: sanitizeInput(name),
        comment: sanitizeInput(comment),
        timestamp: new Date().toISOString(),
        helpful: 0
      };
      
      // Save review
      saveReview(review);
      
      // Mark this destination as reviewed in localStorage
      markAsReviewed(destinationId);
      
      // Show success message
      showMessage('Thank you for your review! It has been submitted successfully.', 'success');
      
      // Reset form
      form.reset();
      ratingInput.value = '';
      updateStars(0);
      if (charCount) charCount.textContent = '0';
      
      // Close the review form
      const reviewFormCollapse = document.querySelector('#reviewFormCollapse');
      if (reviewFormCollapse) {
        const bsCollapse = bootstrap.Collapse.getInstance(reviewFormCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
        } else {
          const collapse = new bootstrap.Collapse(reviewFormCollapse, { toggle: false });
          collapse.hide();
        }
      }
      
      // Disable write review button
      disableWriteReviewButton(destinationId);
      
      // Refresh reviews display
      displayReviews(destinationId);
    });
  }

  // Update star display
  function updateStars(rating) {
    const stars = document.querySelectorAll('.star-rating .star');
    stars.forEach((star, index) => {
      if (index < rating) {
        star.classList.add('active');
      } else {
        star.classList.remove('active');
      }
    });
  }

  // Display reviews for a destination
  function displayReviews(destinationId) {
    const container = document.querySelector('#reviewsContainer');
    if (!container) return;
    
    let reviews = getReviews(destinationId);
    
    // Apply filter
    const filterSelect = document.querySelector('#reviewFilter');
    if (filterSelect) {
      const filterValue = parseInt(filterSelect.value);
      if (filterValue > 0) {
        reviews = reviews.filter(r => r.rating === filterValue);
      }
    }
    
    // Apply sort
    const sortSelect = document.querySelector('#reviewSort');
    if (sortSelect) {
      const sortValue = sortSelect.value;
      reviews = sortReviews(reviews, sortValue);
    }
    
    // Display reviews
    if (reviews.length === 0) {
      container.innerHTML = '<p class="text-muted text-center py-4">No reviews yet. Be the first to review this destination!</p>';
      return;
    }
    
    const reviewsHTML = reviews.map(review => createReviewHTML(review)).join('');
    container.innerHTML = reviewsHTML;
    
    // Update average rating
    updateAverageRating(destinationId);
  }

  // Create HTML for a single review
  function createReviewHTML(review) {
    const date = new Date(review.timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    const starsHTML = Array.from({length: 5}, (_, i) => 
      `<i class="fas fa-star ${i < review.rating ? 'text-warning' : 'text-muted'}"></i>`
    ).join('');
    
    return `
      <div class="card border-0 shadow-sm mb-3">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <div class="mb-2">${starsHTML}</div>
            <small class="text-muted">${date}</small>
          </div>
          <p class="mb-2">${review.comment}</p>
          <div class="d-flex justify-content-between align-items-center">
            <small class="text-muted">By ${review.name}</small>
            <button class="btn btn-sm btn-outline-success" onclick="markHelpful('${review.id}')">
              <i class="fas fa-thumbs-up me-1"></i>Helpful (${review.helpful})
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // Sort reviews
  function sortReviews(reviews, sortBy) {
    const sorted = [...reviews];
    
    switch(sortBy) {
      case 'newest':
        sorted.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        break;
      case 'oldest':
        sorted.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        break;
      case 'highest':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'lowest':
        sorted.sort((a, b) => a.rating - b.rating);
        break;
      case 'helpful':
        sorted.sort((a, b) => b.helpful - a.helpful);
        break;
      default:
        sorted.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    }
    
    return sorted;
  }

  // Update average rating display
  function updateAverageRating(destinationId) {
    const reviews = getReviews(destinationId);
    const avgRatingElement = document.querySelector('#averageRating');
    const totalReviewsElement = document.querySelector('#totalReviews');
    
    if (reviews.length === 0) {
      if (avgRatingElement) avgRatingElement.textContent = '0.0';
      if (totalReviewsElement) totalReviewsElement.textContent = '0';
      return;
    }
    
    const average = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    
    if (avgRatingElement) {
      avgRatingElement.textContent = average.toFixed(1);
    }
    
    if (totalReviewsElement) {
      totalReviewsElement.textContent = reviews.length;
    }
  }

  // Get reviews for a destination
  function getReviews(destinationId) {
    const allReviews = getStorage('destinationReviews', []);
    return allReviews.filter(r => r.destinationId === destinationId);
  }

  // Check if user has already reviewed this destination
  function hasUserReviewed(destinationId) {
    const reviewedDestinations = getStorage('reviewedDestinations', []);
    return reviewedDestinations.includes(destinationId.toString());
  }

  // Mark destination as reviewed
  function markAsReviewed(destinationId) {
    let reviewedDestinations = getStorage('reviewedDestinations', []);
    if (!reviewedDestinations.includes(destinationId.toString())) {
      reviewedDestinations.push(destinationId.toString());
      setStorage('reviewedDestinations', reviewedDestinations);
    }
  }

  // Disable write review button
  function disableWriteReviewButton(destinationId) {
    const writeReviewBtn = document.querySelector('[data-bs-target="#reviewFormCollapse"]');
    if (writeReviewBtn) {
      writeReviewBtn.disabled = true;
      writeReviewBtn.innerHTML = '<i class="fas fa-check me-2"></i>Review Submitted';
      writeReviewBtn.classList.remove('btn-outline-success');
      writeReviewBtn.classList.add('btn-secondary');
    }
  }

  // Save review to localStorage
  function saveReview(review) {
    let reviews = getStorage('destinationReviews', []);
    reviews.push(review);
    setStorage('destinationReviews', reviews);
  }

  // Mark review as helpful
  window.markHelpful = function(reviewId) {
    let reviews = getStorage('destinationReviews', []);
    const review = reviews.find(r => r.id === reviewId);
    
    if (review) {
      review.helpful = (review.helpful || 0) + 1;
      setStorage('destinationReviews', reviews);
      
      // Refresh display
      const container = document.querySelector('#reviewsContainer');
      if (container) {
        const destinationId = container.getAttribute('data-destination-id');
        displayReviews(destinationId);
      }
    }
  };

  // Helper functions - using utils.js
  function generateReviewId() {
    return generateId('REV');
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showMessage(message, type) {
    const messageDiv = document.querySelector('#reviewMessage');
    if (!messageDiv) return;
    
    const alertClass = type === 'success' ? 'alert-success' : 'alert-danger';
    messageDiv.innerHTML = `
      <div class="alert ${alertClass} alert-dismissible fade show" role="alert">
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'} me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      </div>
    `;
    
    messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // Expose displayReviews globally for use in destinations.js
  window.displayReviews = displayReviews;
})();
