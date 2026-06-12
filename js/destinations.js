// Destinations Data Structure
const destinations = [
  {
    id: 1,
    name: "River No. 2 Beach",
    category: "Beach",
    location: "Western Area Peninsula",
    image: "./images/Sierra-leone-img/River-No2-Village-Beach-Sierra-Leone.jpg",
    badge: "Popular",
    badgeColor: "success",
    description: "A pristine beach paradise with golden sands, clear waters, and lush tropical surroundings perfect for relaxation and swimming.",
    features: ["Swimming", "Picnic Areas", "Water Sports", "Restaurant"],
    rating: 4.8
  },
  {
    id: 2,
    name: "The Cotton Tree",
    category: "Historic",
    location: "Central Freetown",
    image: "./images/Sierra-leone-img/cottontree.jpg",
    badge: "Historic",
    badgeColor: "warning",
    description: "An iconic 500-year-old landmark symbolizing freedom and the heart of Freetown's history and culture.",
    features: ["Historical Site", "Photography", "Cultural Tours", "Landmark"],
    rating: 4.7
  },
  {
    id: 3,
    name: "Bureh Beach",
    category: "Beach",
    location: "Bureh Town",
    image: "./images/Sierra-leone-img/Bureh-2_SLTB.jpg",
    badge: "Adventure",
    badgeColor: "danger",
    description: "A surfer's paradise with consistent waves, vibrant beach culture, and stunning sunset views over the Atlantic.",
    features: ["Surfing", "Beach Camping", "Local Cuisine", "Sunset Views"],
    rating: 4.9
  },
  {
    id: 4,
    name: "Leicester Peak",
    category: "Nature",
    location: "Peninsula Mountains",
    image: "./images/Sierra-leone-img/leicester peak mountain.jpg",
    badge: "Nature",
    badgeColor: "info",
    description: "The highest point in the Peninsula Mountains offering breathtaking panoramic views of Freetown and the Atlantic Ocean.",
    features: ["Hiking", "Mountain Climbing", "Photography", "Wildlife"],
    rating: 4.6
  },
  {
    id: 5,
    name: "Aberdeen Beach",
    category: "Beach",
    location: "Aberdeen, Freetown",
    image: "./images/Sierra-leone-img/Aberdeen.jpg",
    badge: "Popular",
    badgeColor: "success",
    description: "A popular urban beach with easy access, beachfront restaurants, and vibrant nightlife along the coastline.",
    features: ["Beach Walks", "Dining", "Nightlife", "Water Sports"],
    rating: 4.5
  },
  {
    id: 6,
    name: "Sierra Leone Parliament Building",
    category: "Historic",
    location: "Tower Hill, Freetown",
    image: "./images/Sierra-leone-img/Sierra-Leone-Parliament-building.jpg",
    badge: "Historic",
    badgeColor: "warning",
    description: "The seat of Sierra Leone's government, featuring impressive colonial architecture and political significance.",
    features: ["Architecture", "Historical Tours", "Government", "Photography"],
    rating: 4.4
  },
  {
    id: 7,
    name: "Kingtom View",
    category: "Nature",
    location: "Kingtom, Freetown",
    image: "./images/Sierra-leone-img/kingtom view.jpg",
    badge: "Scenic",
    badgeColor: "info",
    description: "A scenic viewpoint offering stunning vistas of Freetown's coastline and the surrounding peninsula.",
    features: ["Panoramic Views", "Photography", "Sunset Watching", "Relaxation"],
    rating: 4.3
  },
  {
    id: 8,
    name: "The Place",
    category: "Dining",
    location: "Freetown",
    image: "./images/Sierra-leone-img/The Place.jpg",
    badge: "Dining",
    badgeColor: "primary",
    description: "A popular beachfront restaurant and entertainment venue offering local and international cuisine with ocean views.",
    features: ["Dining", "Live Music", "Beach Access", "Entertainment"],
    rating: 4.6
  },
  {
    id: 9,
    name: "Bintumani Hotel",
    category: "Accommodation",
    location: "Freetown",
    image: "./images/Sierra-leone-img/Bintumani hotel.webp",
    badge: "Luxury",
    badgeColor: "dark",
    description: "A premier hotel offering luxury accommodation with modern amenities and stunning views of the city.",
    features: ["Luxury Rooms", "Pool", "Restaurant", "Conference Facilities"],
    rating: 4.7
  }
];

// Function to render destinations
function renderDestinations(filter = 'all') {
  const container = document.getElementById('destinations-container');
  if (!container) return;
  
  const filteredDestinations = filter === 'all' 
    ? destinations 
    : destinations.filter(d => d.category.toLowerCase() === filter.toLowerCase());
  
  container.innerHTML = filteredDestinations.map(dest => `
    <div class="col-lg-4 col-md-6 mb-4">
      <div class="card h-100 border-0 shadow hover-lift overflow-hidden">
        <div class="position-relative">
          <img src="${dest.image}" alt="${dest.name}" class="card-img-top img-zoom" style="height: 250px; object-fit: cover;">
          <span class="position-absolute top-0 end-0 m-3 badge bg-${dest.badgeColor} rounded-pill px-3 py-2">${dest.badge}</span>
        </div>
        <div class="card-body d-flex flex-column">
          <h3 class="card-title h5 fw-bold text-primary">${dest.name}</h3>
          <p class="text-muted small mb-2">
            <i class="fas fa-map-marker-alt text-success me-2"></i>${dest.location}
          </p>
          <div class="mb-2">
            <i class="fas fa-star text-warning"></i>
            <span class="fw-bold">${dest.rating}</span>
          </div>
          <p class="card-text text-muted flex-grow-1">${dest.description}</p>
          <div class="mb-3">
            ${dest.features.map(f => `<span class="badge bg-light text-dark me-1 mb-1">${f}</span>`).join('')}
          </div>
          <button class="btn btn-outline-success btn-sm" onclick="addToWishlist(${dest.id})">
            <i class="fas fa-heart me-2"></i>Add to Wishlist
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// Function to add to wishlist
function addToWishlist(destinationId) {
  const destination = destinations.find(d => d.id === destinationId);
  if (!destination) return;
  
  // Get existing wishlist from localStorage
  let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  
  // Check if already in wishlist
  if (wishlist.some(item => item.id === destinationId)) {
    alert('This destination is already in your wishlist!');
    return;
  }
  
  // Add to wishlist
  wishlist.push(destination);
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
  
  alert(`${destination.name} added to wishlist!`);
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
  renderDestinations();
  
  // Add filter button listeners
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const filter = this.dataset.filter;
      renderDestinations(filter);
      
      // Update active state
      filterButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });
});
