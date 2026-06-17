// Itinerary Builder

// All itineraries
let allItineraries = [];
let currentItineraryId = null;

// Create new itinerary
function createNewItinerary() {
  const nameInput = document.querySelector('#itinerary-name');
  const name = nameInput.value.trim() || 'New Itinerary';
  
  const newItinerary = {
    id: generateId('ITN'),
    name: name,
    days: [],
    createdAt: new Date().toISOString()
  };
  
  allItineraries.push(newItinerary);
  currentItineraryId = newItinerary.id;
  saveAllItineraries();
  renderItineraryList();
  renderDays();
  nameInput.value = name;
}

// Update current itinerary name
function updateItineraryName() {
  const nameInput = document.querySelector('#itinerary-name');
  if (!currentItineraryId || !nameInput) return;
  
  const itinerary = allItineraries.find(i => i.id === currentItineraryId);
  if (itinerary) {
    itinerary.name = nameInput.value.trim();
    saveAllItineraries();
    renderItineraryList();
  }
}

// Switch to a different itinerary
function switchItinerary(id) {
  currentItineraryId = id;
  const itinerary = allItineraries.find(i => i.id === id);
  if (itinerary) {
    document.querySelector('#itinerary-name').value = itinerary.name;
    renderDays();
    renderItineraryList();
  }
}

// Render itinerary list
function renderItineraryList() {
  const container = document.querySelector('#itinerary-list');
  if (!container) return;
  
  if (allItineraries.length === 0) {
    container.innerHTML = '<p class="text-muted mb-0">No itineraries yet. Click "New" to create one!</p>';
    return;
  }
  
  container.innerHTML = allItineraries.map(itinerary => `
    <div class="d-flex align-items-center justify-content-between p-2 mb-2 ${itinerary.id === currentItineraryId ? 'bg-success bg-opacity-10 border border-success' : 'bg-light'} rounded">
      <div>
        <strong>${itinerary.name}</strong>
        <small class="text-muted d-block">${itinerary.days.length} day(s)</small>
      </div>
      <div>
        <button class="btn btn-sm btn-outline-success" onclick="switchItinerary(${itinerary.id}); addDay();">
          <i class="fas fa-plus"></i> Day
        </button>
        <button class="btn btn-sm btn-outline-primary" onclick="switchItinerary(${itinerary.id})">
          <i class="fas fa-eye"></i>
        </button>
        <button class="btn btn-sm btn-outline-danger" onclick="deleteItinerary(${itinerary.id})">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>
  `).join('');
}

// Delete specific itinerary
function deleteItinerary(id) {
  if (confirm('Are you sure you want to delete this itinerary?')) {
    allItineraries = allItineraries.filter(i => i.id !== id);
    if (currentItineraryId === id) {
      currentItineraryId = allItineraries.length > 0 ? allItineraries[0].id : null;
    }
    saveAllItineraries();
    renderItineraryList();
    renderDays();
    
    if (currentItineraryId) {
      const itinerary = allItineraries.find(i => i.id === currentItineraryId);
      document.querySelector('#itinerary-name').value = itinerary.name;
    } else {
      document.querySelector('#itinerary-name').value = '';
    }
  }
}

// Get current itinerary
function getCurrentItinerary() {
  return allItineraries.find(i => i.id === currentItineraryId);
}

// Add new day
function addDay() {
  const itinerary = getCurrentItinerary();
  if (!itinerary) {
    alert('Please create an itinerary first!');
    return;
  }
  
  const dayNumber = itinerary.days.length + 1;
  itinerary.days.push({
    day: dayNumber,
    date: '',
    activities: []
  });
  saveAllItineraries();
  renderDays();
  renderItineraryList();
}

// Render days
function renderDays() {
  const container = document.querySelector('#days-container');
  if (!container) return;

  const itinerary = getCurrentItinerary();
  if (!itinerary || itinerary.days.length === 0) {
    container.innerHTML = '<div class="text-center py-5 text-muted"><i class="fas fa-calendar-alt mb-3" style="font-size: 3rem;"></i><p>No days added yet. Click "Add Day" to start planning!</p></div>';
    return;
  }

  container.innerHTML = itinerary.days.map((day, index) => `
    <div class="card mb-4 shadow" id="day-${index}">
      <div class="card-header bg-success text-white d-flex justify-content-between align-items-center">
        <h5 class="mb-0">Day ${day.day}</h5>
        <div>
          <input type="date" class="form-control form-control-sm d-inline-block" style="width: 150px;" value="${day.date}" onchange="updateDayDate(${index}, this.value)">
          <button class="btn btn-sm btn-outline-light ms-2" onclick="removeDay(${index})">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
      <div class="card-body">
        <div class="mb-3">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Add activity (e.g., Visit River No. 2 Beach at 10:00 AM)" id="activity-${index}">
            <button class="btn btn-outline-success" onclick="addActivity(${index})">
              <i class="fas fa-plus"></i> Add
            </button>
          </div>
        </div>
        <div id="activities-${index}">
          ${renderActivities(day.activities, index)}
        </div>
      </div>
    </div>
  `).join('');
}

// Render activities for a day
function renderActivities(activities, dayIndex) {
  if (activities.length === 0) {
    return '<p class="text-muted small">No activities added yet.</p>';
  }

  return activities.map((activity, actIndex) => `
    <div class="d-flex align-items-center justify-content-between p-2 mb-2 bg-light rounded">
      <span><i class="fas fa-clock text-success me-2"></i>${activity}</span>
      <button class="btn btn-sm btn-outline-danger" onclick="removeActivity(${dayIndex}, ${actIndex})">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `).join('');
}

// Add activity to day
function addActivity(dayIndex) {
  const itinerary = getCurrentItinerary();
  if (!itinerary) return;
  
  const input = document.querySelector(`#activity-${dayIndex}`);
  if (!input || !input.value.trim()) {
    alert('Please enter an activity');
    return;
  }

  itinerary.days[dayIndex].activities.push(input.value.trim());
  input.value = '';
  saveAllItineraries();
  renderDays();
}

// Remove activity from day
function removeActivity(dayIndex, activityIndex) {
  const itinerary = getCurrentItinerary();
  if (!itinerary) return;
  
  itinerary.days[dayIndex].activities.splice(activityIndex, 1);
  saveAllItineraries();
  renderDays();
}

// Update day date
function updateDayDate(dayIndex, date) {
  const itinerary = getCurrentItinerary();
  if (!itinerary) return;
  
  itinerary.days[dayIndex].date = date;
  saveAllItineraries();
}

// Remove day
function removeDay(dayIndex) {
  const itinerary = getCurrentItinerary();
  if (!itinerary) return;
  
  if (confirm('Are you sure you want to remove this day?')) {
    itinerary.days.splice(dayIndex, 1);
    // Renumber days
    itinerary.days.forEach((day, index) => {
      day.day = index + 1;
    });
    saveAllItineraries();
    renderDays();
    renderItineraryList();
  }
}

// Save all itineraries to localStorage
function saveAllItineraries() {
  setStorage('itineraries', allItineraries);
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
  // Try to load saved itineraries
  allItineraries = getStorage('itineraries', []);
  if (allItineraries.length > 0) {
    currentItineraryId = allItineraries[0].id;
    const itinerary = getCurrentItinerary();
    const nameInput = document.querySelector('#itinerary-name');
    if (nameInput && itinerary) {
      nameInput.value = itinerary.name;
    }
  }
  renderItineraryList();
  renderDays();
});
