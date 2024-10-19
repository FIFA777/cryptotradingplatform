const priceList = document.getElementById('price-list');
const balance = document.getElementById('balance');
const tradeForm = document.getElementById('trade-form');

// Fetch current prices from an API (replace with your own API)
async function fetchPrices() {
    try {
        const response = await fetch('https://api.example.com/prices');
        const data = await response.json();
        updatePriceList(data);
    } catch (error) {
        console.error('Error fetching prices:', error);
    }
}

// Update the price list in the UI
function updatePriceList(prices) {
    priceList.innerHTML = '';
    for (const [crypto, price] of Object.entries(prices)) {
        const cryptoItem = document.createElement('div');
        cryptoItem.className = 'crypto-item';
        cryptoItem.innerHTML = `
            <span>${crypto.toUpperCase()}:</span>
            <span>$${price.toFixed(2)}</span>
        `;
        priceList.appendChild(cryptoItem);
    }
}

// Handle form submission for trading
tradeForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const crypto = document.getElementById('crypto-select').value;
    const amount = parseFloat(document.getElementById('trade-amount').value);
    // Perform trade logic here
    console.log(`Trading ${amount} of ${crypto}`);
    // Reset form
    tradeForm.reset();
});

// Fetch prices on page load
fetchPrices();
