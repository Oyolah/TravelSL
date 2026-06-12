// Function to render wishlist items
function renderWishlist() {
  const container = document.querySelector('#wishlist-container');
  const emptyMessage = document.querySelector('#empty-wishlist');
  
  if (!container) return;
  
  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  
  if (wishlist.length === 0) {
    container.classList.add('d-none');
    emptyMessage.classList.remove('d-none');
    return;
  }
  
  emptyMessage.classList.add('d-none');
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
          <p class="card-text text-muted flex-grow-1">${item.description}</p>
          <div class="mb-3">
            ${item.features.map(f => `<span class="badge bg-light text-dark me-1 mb-1">${f}</span>`).join('')}
          </div>
          <button class="btn btn-danger btn-sm" onclick="removeFromWishlist(${item.id}); renderWishlist();">
            <i class="fas fa-trash me-2"></i>Remove from Wishlist
          </button>
        </div>
      </div>
    </div>
  `).join('');
}
 
document.addEventListener('DOMContentLoaded', function() {
  renderWishlist();
});
