// Hotels & Resorts Data
const hotels = [
  {
    id: 1,
    name: "The Lead Hotel",
    location: "Lumley Beach, Freetown, Sierra Leone",
    category: "I",
    image: "./images/Accommodation/Lead-Hotel.webp",
    website: "https://www.livingthelead.com",
    email: "info@livingthelead.com",
    description: "The Lead Hotel is designed to embrace all your stays within a business culture that is so simple in design, convenient in living, and secure in day-to-day activities. This directs our mission to create convenient hospitality experiences that satisfy your needs and surpass your expectations when it comes to a business stay in the city.",
    features: ["Business Culture", "Convenient Living", "Secure", "Apartment Hotel"],
    rating: 4.5,
    lat: 8.4897,
    lon: -13.2284
  },
  {
    id: 2,
    name: "The Place Resort",
    location: "Freetown, Sierra Leone",
    category: "I",
    image: "./images/Accommodation/place-hotel.webp",
    website: "https://www.stayattheplace.com",
    email: "welcome@stayattheplace.com",
    description: "The Place at Tokeh Beach is Sierra Leone's Premier Beach Resort, offering the perfect location for a weekend getaway or group retreat. Our range of luxurious suites, beach-side restaurant and fully equipped conference centre ensure that all needs are catered for at The Place at Tokeh Beach.",
    features: ["Beach Resort", "Luxurious Suites", "Beach-side Restaurant", "Conference Centre"],
    rating: 4.7,
    lat: 8.4900,
    lon: -13.2270
  },
  {
    id: 3,
    name: "The Hub Hotel",
    location: "Wilberforce, Freetown, Sierra Leone",
    category: "I",
    image: "./images/Accommodation/hub-hotel.webp",
    website: "https://www.thehub-hotel.com",
    email: "info@thehub-hotel.com",
    description: "Ideally situated in the heart of Freetown this stylishly appointed luxury accommodation in Freetown entices its esteemed guests with its privileged location, the serene ambience and the enchanting views of the shimmering Ocean. The Hub Hotel luxury accommodation in Freetown features an astonishing pool, a revitalizing Technogym fitness, a stunning lounge and poolside bar as well as a glamorous restaurant.",
    features: ["Pool", "Fitness Center", "Lounge", "Poolside Bar", "Restaurant"],
    rating: 4.6,
    lat: 8.4850,
    lon: -13.2300
  },
  {
    id: 4,
    name: "The Country Lodge Hotel",
    location: "Hill Station, Freetown, Sierra Leone",
    category: "I",
    image: "./images/Accommodation/country-lodge-hotel.webp",
    website: "https://www.countrylodgesl.com",
    email: "reservations@countrylodgesl.com",
    description: "The perfect place in Freetown to stay, the Country Lodge Hotel is situated on the hills of Freetown overlooking the spectacular panoramic views of the Atlantic ocean. This accommodation option is a conference, corporate, leisure as well as a family hotel. Combining extraordinary service, and comfort, we are dedicated in providing you with an unforgettable experience.",
    features: ["Panoramic Ocean Views", "Conference", "Corporate", "Family Hotel", "Fine Dining"],
    rating: 4.5,
    lat: 8.4880,
    lon: -13.2320
  },
  {
    id: 5,
    name: "Swiss Spirit Hotel & Suite",
    location: "Spur Road, Freetown, Sierra Leone",
    category: "I",
    image: "./images/Accommodation/swiss-spirit-hotel.webp",
    website: "",
    email: "",
    description: "The Swiss Hotel is located in the trendy residential area of Freetown, close to the British High Commission. As well as the beautiful Freetown Golf Club, all while being within a 15-minute drive of Lumley Beach in addition to the National Stadium.",
    features: ["Residential Area", "Near Golf Club", "Near Beach", "Near Stadium"],
    rating: 4.4,
    lat: 8.4860,
    lon: -13.2350
  },
  {
    id: 6,
    name: "Sierra Palms Resort",
    location: "Lumley Beach, Freetown, Sierra Leone",
    category: "I",
    image: "./images/Accommodation/sierra-palm-hotel.webp",
    website: "https://sierrapalms.sl",
    email: "gm@sierrapalms.sl",
    description: "Set in Freetown, a few steps from Lumbley Beach, Sierra Palms Resort offers accommodation with an outdoor swimming pool, free private parking, a garden and a shared lounge. Each accommodation at the 4-star hotel has city views, and guests can enjoy access to a terrace and to a private beach area.",
    features: ["Swimming Pool", "Free Parking", "Garden", "Shared Lounge", "Private Beach", "24-hour Front Desk"],
    rating: 4.6,
    lat: 8.4910,
    lon: -13.2260
  },
  {
    id: 7,
    name: "Sierra Light House Hotel",
    location: "6, Man of War Bay, Freetown, Sierra Leone",
    category: "I",
    image: "./images/Accommodation/sierra-light-house-hotel.webp",
    website: "",
    email: "",
    description: "The Hotel is located in the Aberdeen Bay with all rooms overlooking the bay. All rooms have a separate living area from the sleeping area. The best restaurant in Freetown is the Sierra Lighthouse Restaurant. Specialty is Seafood and offers the largest sizes of lobsters you cannot find in any part of the world.",
    features: ["Bay Views", "Separate Living Area", "Seafood Restaurant", "Lobster Specialty"],
    rating: 4.5,
    lat: 8.4800,
    lon: -13.2400
  },
  {
    id: 8,
    name: "Radisson Blu Mammy Yoko Hotel",
    location: "17 Lumley Beach Road, Freetown, Sierra Leone",
    category: "I",
    image: "./images/Accommodation/radission-blu-hotel.webp",
    website: "https://www.radissonblu.com/en/hotel-freetown",
    email: "info.freetown@radissonblu.com",
    description: "Set on a peninsula on West Africa's coast, the Radisson Blu Mammy Yoko Hotel in Freetown offers far-reaching coastal views and excellent access to the city center. Lungi International Airport is across the bay, and can be reached in 30 minutes by water taxi, ferry, or private speedboat. Lumley Beach, one of Sierra Leone's best-known beaches, is right by the hotel.",
    features: ["Coastal Views", "Near Airport", "Near Beach", "Near City Center", "National Museum Access"],
    rating: 4.8,
    lat: 8.4897,
    lon: -13.2284
  },
  {
    id: 9,
    name: "Metro Hotel",
    location: "Wilkinson Road, Freetown, Sierra Leone",
    category: "I",
    image: "./images/Accommodation/metro-hotel.webp",
    website: "",
    email: "",
    description: "Metro Hotel Freetown provides 3-star accommodation in Freetown. It offers free Wi-Fi, a 24-hour reception and babysitting/child services. There are a variety of facilities on offer to guests of the hotel, such as a tour desk, room service and luggage storage. Laundry facilities are also available.",
    features: ["Free Wi-Fi", "24-hour Reception", "Babysitting", "Tour Desk", "Room Service", "Laundry"],
    rating: 3.8,
    lat: 8.4840,
    lon: -13.2310
  },
  {
    id: 10,
    name: "Hotel Barmoi",
    location: "Aberdeen, Freetown, Sierra Leone",
    category: "I",
    image: "./images/Accommodation/hotel-barmoi.webp",
    website: "",
    email: "",
    description: "Hotel Barmoi is a boutique hotel situated on the cape of Aberdeen in Freetown overlooking stunning views of the Atlantic ocean. Founded in 1999, by the late Dr. Sheku T. Kamara, this indigenous owned hotel opened with 16 guest bedrooms and was originally named Cape Guest house was quickly known for its secluded and serene location. The number of rooms has since been extended and the hotel now stands at 36 guest rooms, most of which have views of the ocean.",
    features: ["Boutique Hotel", "Ocean Views", "Secluded Location", "36 Guest Rooms"],
    rating: 4.3,
    lat: 8.4810,
    lon: -13.2390
  },
  {
    id: 11,
    name: "Home Suite Hotel",
    location: "Aberdeen, Freetown, Sierra Leone",
    category: "IV",
    image: "./images/Accommodation/home-suite-hotel.webp",
    website: "https://www.homesuitesfreetown.com",
    email: "reservations@homesuitesfreetown.com",
    description: "Strategically located on the quietest end of the Aberdeen Community, Freetown's heart for Business and tourism, the Home Suites Boutique Hotel offers the ideal quietness whilst at the same time enjoying the beautiful scenes of the Lumley beach and the Aberdeen Creek from the comfort of your balcony. This luxury Boutique Hotel is easily accessible – The Freetown National Airport is just across the estuary.",
    features: ["Quiet Location", "Beach Views", "Balcony", "Boutique Hotel", "Near Airport"],
    rating: 4.4,
    lat: 8.4820,
    lon: -13.2380
  },
  {
    id: 12,
    name: "Golden Tulip Essential Kimbima Hotel",
    location: "Aberdeen, Freetown, Sierra Leone",
    category: "III",
    image: "./images/Accommodation/golden-tulip-hotel.webp",
    website: "https://www.goldentulipfreetown.com",
    email: "reservations@goldentulipfreetown.com",
    description: "An ideal venue for workshop, conferences, seminars with a panoramic view of the Atlantic ocean. The Golden Tulip Essential Freetown is a 3-star hotel that offers modern facilities. Its key location offers a easy access to the city centre which is a 25 minute drive. The famous Lumley beach is just a walk away from the hotel.",
    features: ["Conference Venue", "Panoramic Ocean Views", "Modern Facilities", "Near City Center", "Near Beach"],
    rating: 4.0,
    lat: 8.4830,
    lon: -13.2370
  },
  {
    id: 13,
    name: "Estuary Resort",
    location: "John Obey Beach, Sierra Leone",
    category: "I",
    image: "./images/Accommodation/estuary-resort.webp",
    website: "https://www.estuaryresortsl.com",
    email: "reservations@estuaryresortsl.com",
    description: "Built to blend into the environment and deliciously quiet, Estuary Resort is haven for those looking to disappear for a couple of peaceful days. It is built along an inlet of water so shallow and calm you can walk across to the other side, if you disregard what might be under the water! While it is not on the beach, it is easy to take a paddle-boat across to the main John Obey beach.",
    features: ["Quiet Environment", "Inlet Location", "Paddle-boat Access", "Peaceful"],
    rating: 4.5,
    lat: 8.4000,
    lon: -13.1500
  },
  {
    id: 14,
    name: "Eden Park Resort",
    location: "Freetown, Sierra Leone",
    category: "I",
    image: "./images/Accommodation/eden-park-resort.webp",
    website: "",
    email: "",
    description: "Capture the moment as well as the imagination at this premier luxury resort. Spacious rooms with private balconies and entrances add to your getaway. Enjoy the sea view surrounding site, Eden park resort, splash in the sparkling pool.",
    features: ["Luxury Resort", "Private Balconies", "Sea Views", "Swimming Pool"],
    rating: 4.6,
    lat: 8.4870,
    lon: -13.2290
  },
  {
    id: 15,
    name: "Dohas Hotel & Restaurant",
    location: "Bo City, Sierra Leone",
    category: "I",
    image: "./images/Accommodation/dohas-hotel.webp",
    website: "",
    email: "",
    description: "A comfortable hotel and restaurant option in Bo City, Sierra Leone.",
    features: ["Restaurant", "Comfortable Stay"],
    rating: 3.5,
    lat: 7.9500,
    lon: -12.4500
  },
  {
    id: 16,
    name: "Bintumani Hotel",
    location: "Aberdeen, Freetown, Sierra Leone",
    category: "I",
    image: "./images/Accommodation/bintumani-hotel.webp",
    website: "https://www.bintumani.com",
    email: "bintumanihotel@yahoo.com",
    description: "Bintumani Hotel Freetown is a place of comfort and relaxation for travelers, complete with free WiFi throughout the property. This hotel offers guests flat-screen TVs with satellite channels, slippers, free toiletries, and private parking. Guests will enjoy a variety of amenities including a 24-hour front desk, shops on the premises, seating areas to relax in after a busy day, an outdoor pool open year-round, barbecue facilities, children's playgrounds, and even an onsite restaurant.",
    features: ["Free WiFi", "Satellite TV", "Private Parking", "24-hour Front Desk", "Outdoor Pool", "Playground", "Restaurant"],
    rating: 4.5,
    lat: 8.4850,
    lon: -13.2300
  },
  {
    id: 17,
    name: "Atlantic Lumley Hotel",
    location: "Lumley Beach, Freetown, Sierra Leone",
    category: "I",
    image: "./images/Accommodation/atlentic-lumley-hotel.webp",
    website: "https://www.atlanticlumleyhotel.com",
    email: "info@atlanticlumleyhotel.com",
    description: "Welcome to A L H, where our courteous staff will do their utmost to make your stay fun, relaxing and memorable. We are luxury seafront hotel nested right in the hearth of the vibrant and lovely Lumley Beach, you will never be far away from all the entertainments Freetown offers if fun is what you are looking for. On the other hand, our comfortable and silent room and ambient will shield you from all the buzz when you return for work, a quick nap or good night rest.",
    features: ["Seafront Location", "Near Beach", "Luxury", "Comfortable Rooms", "Quiet Ambience"],
    rating: 4.4,
    lat: 8.4920,
    lon: -13.2250
  },
  {
    id: 18,
    name: "Axxess Guest House",
    location: "Lumley Beach, Freetown, Sierra Leone",
    category: "III",
    image: "./images/Accommodation/axxess-guest-House.webp",
    website: "",
    email: "",
    description: "A comfortable guest house located on Lumley Beach, Freetown.",
    features: ["Guest House", "Near Beach"],
    rating: 3.5,
    lat: 8.4930,
    lon: -13.2240
  }
];

// Global variable to store map instance
let accommodationMap = null;
let hotelMarkers = [];

// Function to view hotel on map
function viewHotelOnMap(lat, lon, hotelName) {
  // Scroll to map
  const mapElement = document.querySelector('#accommodation-map');
  if (mapElement) {
    mapElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  
  // Wait for map to be ready, then center on hotel
  setTimeout(() => {
    if (window.MapUtils && window.MapUtils.initializeSingleLocationMap) {
      // Remove existing markers
      hotelMarkers.forEach(marker => {
        if (marker) accommodationMap.removeLayer(marker);
      });
      hotelMarkers = [];
      
      // Initialize or reinitialize map centered on hotel
      if (!accommodationMap) {
        accommodationMap = window.MapUtils.initializeSingleLocationMap('accommodation-map', lat, lon, hotelName, hotelName);
      } else {
        accommodationMap.setView([lat, lon], 15);
        const marker = window.MapUtils.addMarker(accommodationMap, lat, lon, hotelName, hotelName);
        hotelMarkers.push(marker);
        marker.openPopup();
      }
    }
  }, 500);
}

// Function to render hotels
function renderHotels(filter = 'all') {
  const container = document.querySelector('#hotels-container');
  if (!container) return;
  
  const filteredHotels = filter === 'all' 
    ? hotels 
    : hotels.filter(h => h.category === filter);
  
  container.innerHTML = filteredHotels.map(hotel => `
    <div class="col-lg-4 col-md-6 mb-4">
      <div class="card h-100 border-0 shadow hover-lift overflow-hidden">
        <div class="position-relative">
          <img src="${hotel.image}" alt="${hotel.name}" class="card-img-top img-zoom" style="height: 250px; object-fit: cover;">
          <span class="position-absolute top-0 end-0 m-3 badge bg-success rounded-pill px-3 py-2">Category ${hotel.category}</span>
        </div>
        <div class="card-body d-flex flex-column">
          <h3 class="card-title h5 fw-bold text-primary">${hotel.name}</h3>
          <p class="text-muted small mb-2">
            <i class="fas fa-map-marker-alt text-success me-2"></i>${hotel.location}
          </p>
          <div class="mb-2">
            <i class="fas fa-star text-warning"></i>
            <span class="fw-bold">${hotel.rating}</span>
          </div>
          <p class="card-text text-muted flex-grow-1">${hotel.description}</p>
          <div class="mb-3">
            ${hotel.features.map(f => `<span class="badge bg-light text-dark me-1 mb-1">${f}</span>`).join('')}
          </div>
          <div class="mt-auto">
            <button class="btn btn-outline-success btn-sm w-100 mb-2" onclick="viewHotelOnMap(${hotel.lat}, ${hotel.lon}, '${hotel.name.replace(/'/g, "\\'")}')">
              <i class="fas fa-map me-2"></i>View On Map
            </button>
            <div class="d-flex gap-2">
              ${hotel.email ? `<a href="mailto:${hotel.email}" class="btn btn-outline-primary btn-sm flex-fill"><i class="fas fa-envelope me-1"></i>Email</a>` : ''}
              ${hotel.website ? `<a href="${hotel.website}" target="_blank" class="btn btn-outline-primary btn-sm flex-fill"><i class="fas fa-globe me-1"></i>Website</a>` : ''}
            </div>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
  renderHotels();
  
  // Initialize accommodation map
  if (window.MapUtils && window.MapUtils.initializeMap) {
    accommodationMap = window.MapUtils.initializeMap('accommodation-map', [8.4897, -13.2284], 12);
    
    // Add hotel markers to map
    const hotelLocations = hotels.filter(h => h.lat && h.lon).map(hotel => ({
      lat: hotel.lat,
      lon: hotel.lon,
      title: hotel.name,
      description: hotel.location
    }));
    
    hotelMarkers = window.MapUtils.addMarkers(accommodationMap, hotelLocations);
  }
  
  // Add filter button listeners
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const filter = this.dataset.filter;
      renderHotels(filter);
      
      // Update active state
      filterButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });
});
