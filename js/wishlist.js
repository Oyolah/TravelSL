// Shared Wishlist Module
// Handles all wishlist operations across the application

// Sort state
let currentSort = { column: null, direction: 'asc' };

// Priority order for sorting
const priorityOrder = { high: 1, medium: 2, low: 3 };

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

// Remove from wishlist with modal confirmation
let itemToDelete = null;

function removeFromWishlist(destinationId) {
  const wishlist = getStorage('wishlist', []);
  const item = wishlist.find(i => i.id === destinationId);
  
  if (item) {
    itemToDelete = destinationId;
    document.querySelector('#delete-item-name').textContent = item.name;
    const modal = new bootstrap.Modal(document.querySelector('#deleteModal'));
    modal.show();
  }
}

// Confirm delete from modal
document.addEventListener('DOMContentLoaded', function() {
  const confirmDeleteBtn = document.querySelector('#confirm-delete-btn');
  if (confirmDeleteBtn) {
    confirmDeleteBtn.addEventListener('click', function() {
      if (itemToDelete !== null) {
        let wishlist = getStorage('wishlist', []);
        wishlist = wishlist.filter(item => item.id !== itemToDelete);
        setStorage('wishlist', wishlist);
        
        // Hide modal
        const modal = bootstrap.Modal.getInstance(document.querySelector('#deleteModal'));
        modal.hide();
        
        itemToDelete = null;
        renderWishlist();
        updateAnalytics();
      }
    });
  }
  
  // Initialize Bootstrap tooltips
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
});

// Edit priority
function editPriority(destinationId, newPriority) {
  let wishlist = getStorage('wishlist', []);
  const itemIndex = wishlist.findIndex(item => item.id === destinationId);
  
  if (itemIndex !== -1) {
    wishlist[itemIndex].priority = newPriority;
    setStorage('wishlist', wishlist);
    renderWishlist();
    updateAnalytics();
  }
}

// Sort table by column
function sortTable(column) {
  let wishlist = getStorage('wishlist', []);
  
  // Toggle direction if clicking same column
  if (currentSort.column === column) {
    currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
  } else {
    currentSort.column = column;
    currentSort.direction = 'asc';
  }
  
  // Sort the wishlist
  wishlist.sort((a, b) => {
    let valueA = a[column];
    let valueB = b[column];
    
    // Handle priority sorting with custom order
    if (column === 'priority') {
      valueA = priorityOrder[valueA] || 999;
      valueB = priorityOrder[valueB] || 999;
    }
    
    // Handle date sorting
    if (column === 'addedAt') {
      valueA = new Date(valueA || 0);
      valueB = new Date(valueB || 0);
    }
    
    // Handle numeric sorting
    if (column === 'rating') {
      valueA = parseFloat(valueA) || 0;
      valueB = parseFloat(valueB) || 0;
    }
    
    // Handle string sorting
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      valueA = valueA.toLowerCase();
      valueB = valueB.toLowerCase();
    }
    
    if (valueA < valueB) return currentSort.direction === 'asc' ? -1 : 1;
    if (valueA > valueB) return currentSort.direction === 'asc' ? 1 : -1;
    return 0;
  });
  
  // Save sorted wishlist back to localStorage
  setStorage('wishlist', wishlist);
  
  // Update sort icons
  updateSortIcons();
  
  // Re-render table
  renderTable();
}

// Update sort icons in table headers
function updateSortIcons() {
  const headers = document.querySelectorAll('#wishlist-table-container th');
  headers.forEach(header => {
    const icon = header.querySelector('i');
    if (icon) {
      icon.className = 'fas fa-sort';
    }
  });
  
  if (currentSort.column) {
    const headerIndex = {
      'name': 1,
      'location': 2,
      'category': 3,
      'rating': 4,
      'priority': 5,
      'addedAt': 6
    }[currentSort.column];
    
    if (headerIndex !== undefined) {
      const header = headers[headerIndex];
      const icon = header.querySelector('i');
      if (icon) {
        icon.className = currentSort.direction === 'asc' ? 'fas fa-sort-up' : 'fas fa-sort-down';
      }
    }
  }
}

// Toggle between card and table view
function toggleView(view) {
  const cardContainer = document.querySelector('#wishlist-container');
  const tableContainer = document.querySelector('#wishlist-table-container');
  const viewToggleContainer = document.querySelector('#view-toggle-container');
  
  if (view === 'card') {
    cardContainer.classList.remove('d-none');
    tableContainer.classList.add('d-none');
  } else {
    cardContainer.classList.add('d-none');
    tableContainer.classList.remove('d-none');
  }
}

// Render wishlist items (card view)
function renderWishlist() {
  const container = document.querySelector('#wishlist-container');
  const emptyMessage = document.querySelector('#empty-wishlist');
  const analyticsSection = document.querySelector('#analytics-section');
  
  if (!container) return;
  
  const wishlist = getStorage('wishlist', []);
  
  if (wishlist.length === 0) {
    container.classList.add('d-none');
    document.querySelector('#wishlist-table-container').classList.add('d-none');
    if (emptyMessage) {
      emptyMessage.classList.remove('d-none');
    }
    if (analyticsSection) {
      analyticsSection.classList.add('d-none');
    }
    return;
  }
  
  if (emptyMessage) {
    emptyMessage.classList.add('d-none');
  }
  if (analyticsSection) {
    analyticsSection.classList.remove('d-none');
  }
  
  // Check current view and render accordingly
  if (!container.classList.contains('d-none')) {
    container.classList.remove('d-none');
    container.innerHTML = wishlist.map(item => `
      <div class="col-lg-4 col-md-6 mb-4">
        <div class="card h-100 border-0 shadow hover-lift overflow-hidden">
          <div class="position-relative">
            <img src="${item.image || './images/destinations/river-no-2-beach.jpg'}" alt="${item.name}" class="card-img-top img-zoom" style="height: 250px; object-fit: cover;" onerror="this.src='./images/destinations/river-no-2-beach.jpg'">
            <span class="position-absolute top-0 end-0 m-3 badge bg-${item.badgeColor || 'success'} rounded-pill px-3 py-2">${item.badge || 'Popular'}</span>
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
              ${item.features ? item.features.map(f => `<span class="badge bg-light text-dark me-1 mb-1">${f}</span>`).join('') : ''}
            </div>
            <div class="mb-3">
              <label class="form-label small text-muted">Edit Priority:</label>
              <div class="btn-group w-100" role="group">
                <input type="radio" class="btn-check" name="edit-priority-${item.id}" id="ep-low-${item.id}" value="low" ${item.priority === 'low' ? 'checked' : ''} onchange="editPriority(${item.id}, this.value);">
                <label class="btn btn-outline-info btn-sm" for="ep-low-${item.id}">Low</label>
                <input type="radio" class="btn-check" name="edit-priority-${item.id}" id="ep-medium-${item.id}" value="medium" ${item.priority === 'medium' ? 'checked' : ''} onchange="editPriority(${item.id}, this.value);">
                <label class="btn btn-outline-warning btn-sm" for="ep-medium-${item.id}">Medium</label>
                <input type="radio" class="btn-check" name="edit-priority-${item.id}" id="ep-high-${item.id}" value="high" ${item.priority === 'high' ? 'checked' : ''} onchange="editPriority(${item.id}, this.value);">
                <label class="btn btn-outline-danger btn-sm" for="ep-high-${item.id}">High</label>
              </div>
            </div>
            <button class="btn btn-danger btn-sm" onclick="removeFromWishlist(${item.id});">
              <i class="fas fa-trash me-2"></i>Remove from Wishlist
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }
  
  // Also render table view
  renderTable();
  updateAnalytics();
}

// Render wishlist items (table view)
function renderTable() {
  const tableBody = document.querySelector('#wishlist-table-body');
  if (!tableBody) return;
  
  const wishlist = getStorage('wishlist', []);
  
  tableBody.innerHTML = wishlist.map(item => `
    <tr>
      <td>
        <img src="${item.image || './images/destinations/river-no-2-beach.jpg'}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;" onerror="this.src='./images/destinations/river-no-2-beach.jpg'">
      </td>
      <td>
        <strong>${item.name}</strong>
      </td>
      <td>${item.location}</td>
      <td>${item.category || 'N/A'}</td>
      <td>
        <i class="fas fa-star text-warning"></i> ${item.rating}
      </td>
      <td>
        <span class="badge ${item.priority === 'high' ? 'bg-danger' : item.priority === 'medium' ? 'bg-warning' : 'bg-info'} rounded-pill">
          ${item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
        </span>
      </td>
      <td>${item.addedAt ? new Date(item.addedAt).toLocaleDateString() : 'N/A'}</td>
      <td>
        <button class="btn btn-sm btn-outline-danger" onclick="removeFromWishlist(${item.id});">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    </tr>
  `).join('');
}

// Update analytics section
function updateAnalytics() {
  const wishlist = getStorage('wishlist', []);
  
  const totalElement = document.querySelector('#total-wishlist');
  const highPriorityElement = document.querySelector('#high-priority');
  const mediumPriorityElement = document.querySelector('#medium-priority');
  const lowPriorityElement = document.querySelector('#low-priority');
  
  const highCount = wishlist.filter(item => item.priority === 'high').length;
  const mediumCount = wishlist.filter(item => item.priority === 'medium').length;
  const lowCount = wishlist.filter(item => item.priority === 'low').length;
  const total = wishlist.length;
  
  if (totalElement) totalElement.textContent = total;
  if (highPriorityElement) highPriorityElement.textContent = highCount;
  if (mediumPriorityElement) mediumPriorityElement.textContent = mediumCount;
  if (lowPriorityElement) lowPriorityElement.textContent = lowCount;
  
  // Update progress bar
  const progressHigh = document.querySelector('#progress-high');
  const progressMedium = document.querySelector('#progress-medium');
  const progressLow = document.querySelector('#progress-low');
  
  if (total > 0) {
    const highPercent = Math.round((highCount / total) * 100);
    const mediumPercent = Math.round((mediumCount / total) * 100);
    const lowPercent = Math.round((lowCount / total) * 100);
    
    if (progressHigh) {
      progressHigh.style.width = highPercent + '%';
      progressHigh.setAttribute('aria-valuenow', highPercent);
      progressHigh.textContent = `High: ${highPercent}%`;
    }
    if (progressMedium) {
      progressMedium.style.width = mediumPercent + '%';
      progressMedium.setAttribute('aria-valuenow', mediumPercent);
      progressMedium.textContent = `Medium: ${mediumPercent}%`;
    }
    if (progressLow) {
      progressLow.style.width = lowPercent + '%';
      progressLow.setAttribute('aria-valuenow', lowPercent);
      progressLow.textContent = `Low: ${lowPercent}%`;
    }
  } else {
    if (progressHigh) {
      progressHigh.style.width = '0%';
      progressHigh.setAttribute('aria-valuenow', 0);
      progressHigh.textContent = 'High: 0%';
    }
    if (progressMedium) {
      progressMedium.style.width = '0%';
      progressMedium.setAttribute('aria-valuenow', 0);
      progressMedium.textContent = 'Medium: 0%';
    }
    if (progressLow) {
      progressLow.style.width = '0%';
      progressLow.setAttribute('aria-valuenow', 0);
      progressLow.textContent = 'Low: 0%';
    }
  }
}

// Initialize wishlist rendering on DOM load
document.addEventListener('DOMContentLoaded', function() {
  renderWishlist();
  updateAnalytics();
});
