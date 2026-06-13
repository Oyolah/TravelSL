// Maps Integration using Leaflet + OpenStreetMap
// Freetown coordinates
const FREETOWN_CENTER = [8.4657, -13.2317];

// Initialize map
function initializeMap(containerId, center = FREETOWN_CENTER, zoom = 12) {
  const mapContainer = document.querySelector(`#${containerId}`);
  if (!mapContainer) return null;
  
  // Create map
  const map = L.map(containerId).setView(center, zoom);
  
  // Add OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19
  }).addTo(map);
  
  return map;
}

// Add marker to map
function addMarker(map, lat, lon, title, description, iconColor = 'blue') {
  if (!map) return;
  
  const marker = L.marker([lat, lon]).addTo(map);
  
  if (title || description) {
    const popupContent = `
      <div class="map-popup">
        ${title ? `<h6 class="fw-bold mb-1">${title}</h6>` : ''}
        ${description ? `<p class="small mb-0">${description}</p>` : ''}
      </div>
    `;
    marker.bindPopup(popupContent);
  }
  
  return marker;
}

// Add multiple markers
function addMarkers(map, locations) {
  if (!map || !locations) return;
  
  const markers = [];
  
  locations.forEach(location => {
    const marker = addMarker(
      map,
      location.lat,
      location.lon,
      location.title,
      location.description,
      location.iconColor
    );
    markers.push(marker);
  });
  
  // Fit map to show all markers
  if (markers.length > 0) {
    const group = L.featureGroup(markers);
    map.fitBounds(group.getBounds().pad(0.1));
  }
  
  return markers;
}

// Initialize destination map with popular locations
function initializeDestinationMap() {
  const map = initializeMap('destination-map', FREETOWN_CENTER, 11);
  if (!map) return;
  
  const destinations = [
    {
      lat: 8.4657,
      lon: -13.2317,
      title: 'Cotton Tree',
      description: 'Historic landmark in the heart of Freetown'
    },
    {
      lat: 8.4897,
      lon: -13.2284,
      title: 'Lumley Beach',
      description: 'Popular beach with restaurants and nightlife'
    },
    {
      lat: 8.4234,
      lon: -13.1847,
      title: 'Tacugama Chimpanzee Sanctuary',
      description: 'Wildlife sanctuary in the rainforest'
    },
    {
      lat: 8.4500,
      lon: -13.2150,
      title: 'National Museum',
      description: 'Sierra Leone\'s history and culture'
    },
    {
      lat: 8.4800,
      lon: -13.2400,
      title: 'Aberdeen Beach',
      description: 'Beautiful beach area with resorts'
    }
  ];
  
  addMarkers(map, destinations);
}

// Initialize accommodation map
function initializeAccommodationMap() {
  const map = initializeMap('accommodation-map', FREETOWN_CENTER, 12);
  if (!map) return;
  
  const hotels = [
    {
      lat: 8.4897,
      lon: -13.2284,
      title: 'Radisson Blu Mammy Yoko Hotel',
      description: 'Luxury beachfront hotel'
    },
    {
      lat: 8.4850,
      lon: -13.2300,
      title: 'Bintumani Hotel',
      description: 'Elegant hotel with ocean views'
    },
    {
      lat: 8.4920,
      lon: -13.2270,
      title: 'The Place Resort',
      description: 'Modern resort on Lumley Beach'
    },
    {
      lat: 8.4880,
      lon: -13.2320,
      title: 'Golden Tulip Essential',
      description: 'Comfortable mid-range hotel'
    }
  ];
  
  addMarkers(map, hotels);
}

// Initialize single location map
function initializeSingleLocationMap(containerId, lat, lon, title, description) {
  const map = initializeMap(containerId, [lat, lon], 15);
  if (!map) return;
  
  addMarker(map, lat, lon, title, description);
  
  return map;
}

// Initialize maps based on page
document.addEventListener('DOMContentLoaded', function() {
  // Check which map containers exist and initialize accordingly
  if (document.querySelector('#destination-map')) {
    initializeDestinationMap();
  }
  
  if (document.querySelector('#accommodation-map')) {
    initializeAccommodationMap();
  }
  
  // Initialize individual destination maps if they exist
  const destinationMapContainers = document.querySelectorAll('[data-map-lat][data-map-lon]');
  destinationMapContainers.forEach(container => {
    const lat = parseFloat(container.getAttribute('data-map-lat'));
    const lon = parseFloat(container.getAttribute('data-map-lon'));
    const title = container.getAttribute('data-map-title') || '';
    const description = container.getAttribute('data-map-description') || '';
    
    initializeSingleLocationMap(container.id, lat, lon, title, description);
  });
});

// Export functions for use in other scripts
window.MapUtils = {
  initializeMap,
  addMarker,
  addMarkers,
  initializeSingleLocationMap
};
