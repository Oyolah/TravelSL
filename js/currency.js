// Currency Exchange API Integration using ExchangeRate-API
const BASE_CURRENCY = 'USD';
const EXCHANGERATE_API_KEY = 'YOUR_API_KEY_HERE'; // Get free key from https://www.exchangerate-api.com/
const TARGET_CURRENCIES = ['EUR', 'GBP', 'SLL']; // Sierra Leone Leone

// Fetch exchange rates
async function fetchExchangeRates() {
  try {
    // Using free tier - no API key needed for basic access
    const response = await fetch(`https://open.exchangerate-api.com/v6/latest/${BASE_CURRENCY}`);
    
    if (!response.ok) {
      throw new Error('Exchange rate data not available');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    return null;
  }
}

// Convert currency
async function convertCurrency(amount, from, to) {
  try {
    const response = await fetch(`https://open.exchangerate-api.com/v6/latest/${from}`);
    
    if (!response.ok) {
      throw new Error('Conversion failed');
    }
    
    const data = await response.json();
    const rate = data.rates[to];
    
    if (!rate) {
      throw new Error(`Currency ${to} not found`);
    }
    
    return amount * rate;
  } catch (error) {
    console.error('Error converting currency:', error);
    return null;
  }
}

// Display currency widget
async function displayCurrencyWidget() {
  const currencyContainer = document.querySelector('#currency-widget');
  if (!currencyContainer) return;
  
  const ratesData = await fetchExchangeRates();
  
  if (!ratesData) {
    currencyContainer.innerHTML = `
      <div class="alert alert-warning">
        <i class="fas fa-exclamation-triangle me-2"></i>
        Exchange rate data unavailable.
      </div>
    `;
    return;
  }
  
  // Show major currencies including SLL
  const currencies = [
    { code: 'SLL', name: 'Sierra Leone Leone' },
    { code: 'EUR', name: 'Euro' },
    { code: 'GBP', name: 'British Pound' },
    { code: 'NGN', name: 'Nigerian Naira' }
  ];
  
  const ratesHTML = currencies.map(currency => {
    const rate = ratesData.rates[currency.code];
    if (!rate) return '';
    
    return `
      <div class="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom">
        <div>
          <strong>${currency.code}</strong>
          <small class="text-muted ms-2">${currency.name}</small>
        </div>
        <div class="text-end">
          <strong>${rate.toLocaleString('en-US', { maximumFractionDigits: 2 })}</strong>
        </div>
      </div>
    `;
  }).join('');
  
  const lastUpdate = new Date(ratesData.time_last_update_unix * 1000).toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
  
  currencyContainer.innerHTML = `
    <div class="card border-0 shadow-sm">
      <div class="card-body p-4">
        <h5 class="fw-bold mb-3">
          <i class="fas fa-dollar-sign text-success me-2"></i>Exchange Rates
        </h5>
        <p class="small text-muted mb-3">1 USD equals:</p>
        ${ratesHTML}
        <div class="mt-3 pt-3 border-top">
          <p class="small text-muted mb-0">
            <i class="fas fa-clock me-1"></i>Last updated: ${lastUpdate}
          </p>
        </div>
      </div>
    </div>
  `;
}

// Display currency converter
async function displayCurrencyConverter() {
  const converterContainer = document.querySelector('#currency-converter');
  if (!converterContainer) return;
  
  converterContainer.innerHTML = `
    <div class="card border-0 shadow-sm">
      <div class="card-body p-4">
        <h5 class="fw-bold mb-3">
          <i class="fas fa-exchange-alt text-primary me-2"></i>Currency Converter
        </h5>
        <div class="row g-3">
          <div class="col-md-5">
            <label class="form-label small">Amount</label>
            <input type="number" id="convert-amount" class="form-control" value="100" min="0" step="0.01">
          </div>
          <div class="col-md-3">
            <label class="form-label small">From</label>
            <select id="convert-from" class="form-select">
              <option value="USD" selected>USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="SLL">SLL</option>
              <option value="NGN">NGN</option>
            </select>
          </div>
          <div class="col-md-4">
            <label class="form-label small">To</label>
            <select id="convert-to" class="form-select">
              <option value="SLL" selected>SLL</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="NGN">NGN</option>
            </select>
          </div>
        </div>
        <button id="convert-btn" class="btn btn-success w-100 mt-3">
          <i class="fas fa-calculator me-2"></i>Convert
        </button>
        <div id="conversion-result" class="mt-3"></div>
      </div>
    </div>
  `;
  
  // Add event listener for conversion
  document.querySelector('#convert-btn').addEventListener('click', async function() {
    const amount = parseFloat(document.querySelector('#convert-amount').value);
    const from = document.querySelector('#convert-from').value;
    const to = document.querySelector('#convert-to').value;
    const resultDiv = document.querySelector('#conversion-result');
    
    if (!amount || amount <= 0) {
      resultDiv.innerHTML = `<div class="alert alert-warning mb-0">Please enter a valid amount</div>`;
      return;
    }
    
    resultDiv.innerHTML = `<div class="text-center"><i class="fas fa-spinner fa-spin"></i> Converting...</div>`;
    
    const result = await convertCurrency(amount, from, to);
    
    if (result) {
      resultDiv.innerHTML = `
        <div class="alert alert-success mb-0">
          <strong>${amount.toFixed(2)} ${from}</strong> = <strong>${result.toFixed(2)} ${to}</strong>
        </div>
      `;
    } else {
      resultDiv.innerHTML = `<div class="alert alert-danger mb-0">Conversion failed. Please try again.</div>`;
    }
  });
}

// Initialize currency widgets
document.addEventListener('DOMContentLoaded', function() {
  displayCurrencyWidget();
  displayCurrencyConverter();
});
