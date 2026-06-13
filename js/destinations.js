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
    fullDescription: "River No. 2 Beach is widely regarded as one of the most beautiful beaches in West Africa. Located just 45 minutes from Freetown, this stunning stretch of coastline features crystal-clear turquoise waters, powdery white sand, and surrounded by lush tropical vegetation. The beach offers a perfect escape from the city with its serene atmosphere and natural beauty. Visitors can enjoy swimming in the calm waters, sunbathing on the pristine sands, or exploring the nearby river that flows into the ocean. Local vendors offer fresh coconut water and delicious seafood, while small beach huts provide shade and relaxation spots. The beach is also known for its stunning sunsets, making it an ideal location for evening photography and romantic getaways.",
    bestTimeToVisit: "November to April (dry season)",
    howToGetThere: "45-minute drive from Freetown via paved road, accessible by taxi or private vehicle",
    entryFee: "Le 5,000 per person",
    openingHours: "Daily 8:00 AM - 6:00 PM",
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
    fullDescription: "The Cotton Tree stands as the most significant historical landmark in Freetown, Sierra Leone. This magnificent Ceiba pentandra tree is believed to be over 500 years old and holds immense cultural and historical importance. According to legend, in 1792, a group of African Americans who had fought for the British during the American Revolutionary War and were promised freedom, landed in Freetown. They gathered under this tree to give thanks for their safe arrival and to pray for their new home. The tree has since become a symbol of freedom, hope, and the founding of Freetown. It stands in the heart of the city, near the Supreme Court building, and serves as a gathering place for national celebrations and historical commemorations. The tree's massive trunk and sprawling branches create an impressive sight, making it a must-visit for anyone interested in Sierra Leone's rich history.",
    bestTimeToVisit: "Year-round, best during Independence Day celebrations (April 27)",
    howToGetThere: "Located in central Freetown, walking distance from most city center hotels",
    entryFee: "Free",
    openingHours: "Always accessible",
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
    fullDescription: "Bureh Beach has earned its reputation as Sierra Leone's premier surfing destination. Located about 2 hours from Freetown, this beach offers consistent waves that attract surfers from around the world. The beach maintains a laid-back, bohemian atmosphere with a strong community of local and international surfers. Beyond surfing, visitors can enjoy beach camping, fresh seafood from local vendors, and vibrant nightlife during peak season. The surrounding area offers opportunities for hiking and exploring the local village culture. Bureh Beach is particularly famous for its spectacular sunsets, which paint the sky in brilliant hues of orange, pink, and purple over the Atlantic Ocean. The beach features several surf camps and guesthouses, making it easy to extend your stay and fully immerse yourself in the surf culture.",
    bestTimeToVisit: "December to March (best surfing conditions)",
    howToGetThere: "2-hour drive from Freetown, accessible by taxi or rented vehicle",
    entryFee: "Free",
    openingHours: "Always accessible",
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
    fullDescription: "Leicester Peak stands as the crown jewel of the Peninsula Mountains, reaching an elevation of approximately 3,000 feet above sea level. This majestic peak offers some of the most spectacular panoramic views in all of Sierra Leone. On a clear day, visitors can see the entire Freetown peninsula, the vast Atlantic Ocean, and even as far as the neighboring country of Guinea. The hike to the summit is challenging but rewarding, taking approximately 2-3 hours depending on fitness level. The trail winds through lush tropical rainforest, offering opportunities to spot diverse wildlife including monkeys, colorful birds, and unique plant species. At the summit, a small chapel and viewing platform provide perfect spots for rest and photography. The peak is particularly popular during sunrise and sunset when the lighting creates magical views over the landscape below.",
    bestTimeToVisit: "November to April (dry season, best visibility)",
    howToGetThere: "1-hour drive from Freetown, then 2-3 hour hike to summit",
    entryFee: "Le 10,000 per person",
    openingHours: "Daily 6:00 AM - 5:00 PM",
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
    fullDescription: "Aberdeen Beach is Freetown's most accessible and popular urban beach, located in the upscale Aberdeen neighborhood. This beach offers the perfect blend of natural beauty and urban convenience, with easy access from the city center. The beachfront is lined with restaurants, bars, and hotels, making it a hub for both daytime relaxation and nighttime entertainment. Visitors can enjoy leisurely walks along the sandy shore, sample fresh seafood at beachfront restaurants, or experience the vibrant nightlife that Aberdeen is famous for. The beach is particularly popular during weekends when locals and tourists alike gather to socialize, enjoy music, and watch the sunset over the Atlantic. The area also features several luxury hotels and guesthouses, making it an ideal base for exploring Freetown.",
    bestTimeToVisit: "Year-round, best during sunset",
    howToGetThere: "Located in Aberdeen, Freetown, easily accessible by taxi or walking from city center",
    entryFee: "Free",
    openingHours: "Always accessible",
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
    fullDescription: "The Sierra Leone Parliament Building stands as an impressive example of colonial architecture and serves as the seat of the nation's government. Located on Tower Hill, this historic building houses the country's legislative branch and is a symbol of Sierra Leone's democratic governance. The building's architecture reflects the country's colonial past while representing its modern political institutions. Visitors can admire the building's impressive facade and learn about Sierra Leone's political history. The surrounding area offers panoramic views of Freetown and the harbor. While the interior is primarily accessible during parliamentary sessions, the building's exterior and grounds are open to the public. Guided tours may be available by prior arrangement, offering insights into the country's legislative process and political history.",
    bestTimeToVisit: "Year-round, best during parliamentary sessions for guided tours",
    howToGetThere: "Located on Tower Hill, Freetown, accessible by taxi",
    entryFee: "Free (guided tours may require prior arrangement)",
    openingHours: "Exterior always accessible, interior during parliamentary sessions",
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
    fullDescription: "Kingtom View offers one of the most breathtaking panoramic views of Freetown and its surrounding coastline. Located in the Kingtom area, this viewpoint provides a perfect vantage point to appreciate the natural beauty of Sierra Leone's capital city. From here, visitors can see the sprawling cityscape, the sparkling Atlantic Ocean, and the lush green hills that surround Freetown. The viewpoint is particularly popular during sunset when the sky transforms into a canvas of brilliant colors, reflecting off the ocean below. It's an ideal spot for photography, romantic outings, or simply taking a moment to appreciate the stunning scenery. The area is easily accessible and offers a peaceful escape from the bustling city below.",
    bestTimeToVisit: "Year-round, best during sunset",
    howToGetThere: "Located in Kingtom, Freetown, accessible by taxi",
    entryFee: "Free",
    openingHours: "Always accessible",
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
    fullDescription: "The Place is Freetown's premier beachfront dining and entertainment destination, offering a unique combination of excellent cuisine, stunning ocean views, and vibrant entertainment. This popular venue features both indoor and outdoor seating, allowing guests to enjoy their meals while listening to the waves and feeling the ocean breeze. The menu showcases a delightful fusion of local Sierra Leonean dishes and international favorites, prepared with fresh, locally-sourced ingredients. Beyond dining, The Place is known for its live music performances, DJ sets, and special events that create a lively and entertaining atmosphere. The venue is perfect for romantic dinners, family gatherings, or nights out with friends. The beachfront location also provides easy access to the beach for those who want to take a stroll before or after their meal.",
    bestTimeToVisit: "Year-round, best during live music events (check schedule)",
    howToGetThere: "Located beachfront in Freetown, accessible by taxi",
    entryFee: "Free (food and beverage costs apply)",
    openingHours: "Daily 11:00 AM - 11:00 PM (extended on weekends)",
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
    fullDescription: "Bintumani Hotel stands as one of Freetown's premier luxury accommodation options, offering guests a perfect blend of comfort, elegance, and modern amenities. Named after Sierra Leone's highest mountain, this hotel lives up to its namesake by providing exceptional service and stunning views of the city and Atlantic Ocean. The hotel features well-appointed rooms and suites equipped with modern amenities including flat-screen TVs, high-speed WiFi, and luxurious bedding. Guests can enjoy the outdoor swimming pool, fitness center, and on-site restaurant serving both local and international cuisine. The hotel's conference facilities make it a popular choice for business travelers, while its proximity to the beach and city attractions appeals to leisure travelers. The professional staff is dedicated to ensuring a memorable stay for every guest.",
    bestTimeToVisit: "Year-round",
    howToGetThere: "Located in Aberdeen, Freetown, accessible by taxi from airport (30 minutes)",
    entryFee: "Hotel rates apply",
    openingHours: "24/7 for guests",
    features: ["Luxury Rooms", "Pool", "Restaurant", "Conference Facilities"],
    rating: 4.7
  }
];

// Function to render destinations
function renderDestinations(filter = 'all') {
  const container = document.querySelector('#destinations-container');
  if (!container) return;
  
  const filteredDestinations = filter === 'all' 
    ? destinations 
    : destinations.filter(d => d.category.toLowerCase() === filter.toLowerCase());
  
  container.innerHTML = filteredDestinations.map(dest => `
    <div class="col-lg-4 col-md-6 mb-4">
      <div class="card h-100 border-0 shadow hover-lift overflow-hidden cursor-pointer" onclick="openDestinationModal(${dest.id})">
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
          <div class="d-flex gap-2">
            <button class="btn btn-outline-primary btn-sm flex-fill" onclick="event.stopPropagation(); openDestinationModal(${dest.id})">
              <i class="fas fa-info-circle me-1"></i>Learn More
            </button>
            <button class="btn btn-outline-success btn-sm flex-fill" onclick="event.stopPropagation(); addToWishlist(${dest.id}, 'medium')">
              <i class="fas fa-heart me-1"></i>Add
            </button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

// Current destination for modal
let currentDestinationId = null;

// Function to open destination modal
function openDestinationModal(destinationId) {
  const destination = destinations.find(d => d.id === destinationId);
  if (!destination) return;
  
  currentDestinationId = destinationId;
  
  // Populate modal
  document.getElementById('modal-image').src = destination.image;
  document.getElementById('modal-name').textContent = destination.name;
  document.getElementById('modal-location').textContent = destination.location;
  document.getElementById('modal-rating').textContent = destination.rating;
  document.getElementById('modal-full-description').textContent = destination.fullDescription || destination.description;
  document.getElementById('modal-best-time').textContent = destination.bestTimeToVisit || 'N/A';
  document.getElementById('modal-how-to-get').textContent = destination.howToGetThere || 'N/A';
  document.getElementById('modal-entry-fee').textContent = destination.entryFee || 'N/A';
  document.getElementById('modal-opening-hours').textContent = destination.openingHours || 'N/A';
  
  // Set badge
  const badge = document.getElementById('modal-badge');
  badge.textContent = destination.badge;
  badge.className = `badge bg-${destination.badgeColor} rounded-pill px-3 py-2`;
  
  // Set features
  document.getElementById('modal-features').innerHTML = destination.features.map(f => 
    `<span class="badge bg-light text-dark me-1 mb-1">${f}</span>`
  ).join('');
  
  // Set destination ID for reviews
  const reviewsContainer = document.getElementById('reviewsContainer');
  const reviewForm = document.getElementById('reviewForm');
  const reviewMessage = document.getElementById('reviewMessage');
  
  if (reviewsContainer) {
    reviewsContainer.setAttribute('data-destination-id', destinationId);
  }
  if (reviewForm) {
    reviewForm.setAttribute('data-destination-id', destinationId);
  }
  
  // Clear any previous review messages
  if (reviewMessage) {
    reviewMessage.innerHTML = '';
  }
  
  // Load reviews for this destination
  if (typeof displayReviews === 'function') {
    displayReviews(destinationId.toString());
  }
  
  // Check if user already reviewed and disable button if needed
  const writeReviewBtn = document.querySelector('[data-bs-target="#reviewFormCollapse"]');
  if (writeReviewBtn) {
    try {
      const reviewedDestinations = JSON.parse(localStorage.getItem('reviewedDestinations') || '[]');
      if (reviewedDestinations.includes(destinationId.toString())) {
        writeReviewBtn.disabled = true;
        writeReviewBtn.innerHTML = '<i class="fas fa-check me-2"></i>Review Submitted';
        writeReviewBtn.classList.remove('btn-outline-success');
        writeReviewBtn.classList.add('btn-secondary');
      } else {
        writeReviewBtn.disabled = false;
        writeReviewBtn.innerHTML = '<i class="fas fa-pen me-2"></i>Write a Review';
        writeReviewBtn.classList.remove('btn-secondary');
        writeReviewBtn.classList.add('btn-outline-success');
      }
    } catch (error) {
      console.error('Error checking review status:', error);
    }
  }
  
  // Show modal
  const modal = new bootstrap.Modal(document.getElementById('destinationModal'));
  modal.show();
}

// Function to add to wishlist from modal
function addToWishlistFromModal() {
  if (currentDestinationId) {
    addToWishlist(currentDestinationId, 'medium');
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('destinationModal'));
    modal.hide();
  }
}

// Function to add to wishlist with priority
function addToWishlist(destinationId, priority = 'medium') {
  const destination = destinations.find(d => d.id === destinationId);
  if (!destination) return;

  // Get existing wishlist from localStorage
  let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

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
  localStorage.setItem('wishlist', JSON.stringify(wishlist));

  alert(`${destination.name} added to wishlist with ${priority} priority!`);
}

// Function to remove from wishlist
function removeFromWishlist(destinationId) {
  let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  wishlist = wishlist.filter(item => item.id !== destinationId);
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
  alert('Destination removed from wishlist!');
}

// Function to edit priority
function editPriority(destinationId, newPriority) {
  let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  const itemIndex = wishlist.findIndex(item => item.id === destinationId);
  
  if (itemIndex !== -1) {
    wishlist[itemIndex].priority = newPriority;
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    alert('Priority updated successfully!');
  }
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
