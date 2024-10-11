document.addEventListener('DOMContentLoaded', () => {
    const priceList = document.getElementById('price-list');
    const cryptoSelect = document.getElementById('crypto-select');
    const tradeForm = document.getElementById('trade-form');
    const tradeAmountInput = document.getElementById('trade-amount');

    // Function to fetch cryptocurrency prices
    async function fetchCryptoPrices() {
        try {
            const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
            const cryptoPrices = await response.json();
            displayPrices(cryptoPrices);
            populateCryptoSelect(cryptoPrices);
        } catch (error) {
            console.error('Error fetching crypto prices:', error);
        }
    }

    // Function to display cryptocurrency prices
    function displayPrices(cryptoPrices) {
        priceList.innerHTML = '';
        cryptoPrices.forEach(crypto => {
            const cryptoItem = document.createElement('div');
            cryptoItem.className = 'crypto-item';
            cryptoItem.innerHTML = `<strong>${crypto.name} (${crypto.symbol.toUpperCase()}):</strong> $${crypto.current_price}`;
            priceList.appendChild(cryptoItem);
        });
    }

    // Function to populate the select dropdown
    function populateCryptoSelect(cryptoPrices) {
        cryptoSelect.innerHTML = '';
        cryptoPrices.forEach(crypto => {
            const option = document.createElement('option');
            option.value = crypto.id;
            option.textContent = `${crypto.name} (${crypto.symbol.toUpperCase()})`;
            cryptoSelect.appendChild(option);
        });
    }

    // Function to handle form submission
    tradeForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const selectedCrypto = cryptoSelect.value;
        const amount = tradeAmountInput.value;

        if (selectedCrypto && amount) {
            console.log(`Trading ${amount} of ${selectedCrypto}`);
            alert(`Trade executed: ${amount} of ${selectedCrypto}`);
        } else {
            alert('Please select a cryptocurrency and enter a valid amount.');
        }
    });

    // Initial fetch of cryptocurrency prices
    fetchCryptoPrices();
});
