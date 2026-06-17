// Shared Wishlist Module
// Handles all wishlist operations across the application

// Add to wishlist with priority
function addToWishlist(destinationId, priority = 'medium', destinationData = null) {
  // If destinationData is provided, use it directly
  // Otherwise, try to find it in the destinations array (if available)
  let destination = destinationData;
  
  if (!destination && typeof destinations !== 'undefined') {
    destination = destinations.find(d => d.id === destinationId);
  }
  
  if (!destination) {
    console.error('Destination not found:', destinationId);
    return;
  }

  // Get existing wishlist from localStorage
  let wishlist = getStorage('wishlist', []);

  // Check if already in wishlist
  if (wishlist.some(item => item.id === destinationId)) {
    alert('This destination is already in your wishlist!');
    return;
  }

  // Add to wishlist with priority
  wishlist.push({
    ...destination,
    priority: priority,
    addedAt: new Date().toISOString()
  });
  setStorage('wishlist', wishlist);

  alert(`${destination.name} added to wishlist with ${priority} priority!`);
}

// Remove from wishlist
function removeFromWishlist(destinationId) {
  let wishlist = getStorage('wishlist', []);
  wishlist = wishlist.filter(item => item.id !== destinationId);
  setStorage('wishlist', wishlist);
  alert('Destination removed from wishlist!');
}

// Edit priority
function editPriority(destinationId, newPriority) {
  let wishlist = getStorage('wishlist', []);
  const itemIndex = wishlist.findIndex(item => item.id === destinationId);
  
  if (itemIndex !== -1) {
    wishlist[itemIndex].priority = newPriority;
    setStorage('wishlist', wishlist);
    alert('Priority updated successfully!');
  }
}

// Render wishlist items
function renderWishlist() {
  const container = document.querySelector('#wishlist-container');
  const emptyMessage = document.querySelector('#empty-wishlist');
  
  if (!container) return;
  
  const wishlist = getStorage('wishlist', []);
  
  if (wishlist.length === 0) {
    container.classList.add('d-none');
    if (emptyMessage) {
      emptyMessage.classList.remove('d-none');
    }
    return;
  }
  
  if (emptyMessage) {
    emptyMessage.classList.add('d-none');
  }
  container.classList.remove('d-none');
  
  container.innerHTML = wishlist.map(item => `
    <div class="col-lg-4 col-md-6 mb-4">
      <div class="card h-100 border-0 shadow hover-lift overflow-hidden">
        <div class="position-relative">
          <img src="${item.image}" alt="${item.name}" class="card-img-top img-zoom" style="height: 250px; object-fit: cover;">
          <span class="position-absolute top-0 end-0 m-3 badge bg-${item.badgeColor} rounded-pill px-3 py-2">${item.badge}</span>
        </div>
        <div class="card-body d-flex flex-column">
          <h3 class="card-title h5 fw-bold text-primary">${item.name}</h3>
          <p class="text-muted small mb-2">
            <i class="fas fa-map-marker-alt text-success me-2"></i>${item.location}
          </p>
          <div class="mb-2">
            <i class="fas fa-star text-warning"></i>
            <span class="fw-bold">${item.rating}</span>
          </div>
          <div class="mb-2">
            <span class="badge ${item.priority === 'high' ? 'bg-danger' : item.priority === 'medium' ? 'bg-warning' : 'bg-info'} rounded-pill">
              Priority: ${item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
            </span>
          </div>
          <p class="card-text text-muted flex-grow-1">${item.description}</p>
          <div class="mb-3">
            ${item.features.map(f => `<span class="badge bg-light text-dark me-1 mb-1">${f}</span>`).join('')}
          </div>
          <div class="mb-3">
            <label class="form-label small text-muted">Edit Priority:</label>
            <div class="btn-group w-100" role="group">
              <input type="radio" class="btn-check" name="edit-priority-${item.id}" id="ep-low-${item.id}" value="low" ${item.priority === 'low' ? 'checked' : ''} onchange="editPriority(${item.id}, this.value); renderWishlist();">
              <label class="btn btn-outline-info btn-sm" for="ep-low-${item.id}">Low</label>
              <input type="radio" class="btn-check" name="edit-priority-${item.id}" id="ep-medium-${item.id}" value="medium" ${item.priority === 'medium' ? 'checked' : ''} onchange="editPriority(${item.id}, this.value); renderWishlist();">
              <label class="btn btn-outline-warning btn-sm" for="ep-medium-${item.id}">Medium</label>
              <input type="radio" class="btn-check" name="edit-priority-${item.id}" id="ep-high-${item.id}" value="high" ${item.priority === 'high' ? 'checked' : ''} onchange="editPriority(${item.id}, this.value); renderWishlist();">
              <label class="btn btn-outline-danger btn-sm" for="ep-high-${item.id}">High</label>
            </div>
          </div>
          <button class="btn btn-danger btn-sm" onclick="removeFromWishlist(${item.id}); renderWishlist();">
            <i class="fas fa-trash me-2"></i>Remove from Wishlist
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// Initialize wishlist rendering on DOM load
document.addEventListener('DOMContentLoaded', function() {
  renderWishlist();
});
