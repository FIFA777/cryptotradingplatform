document.addEventListener('DOMContentLoaded', () => {
    const priceList = document.getElementById('price-list');
    const cryptoSelect = document.getElementById('crypto-select');
    const tradeForm = document.getElementById('trade-form');

    // Function to fetch cryptocurrency prices
    async function fetchCryptoPrices() {
        try {
            const response = await fetch('https://api.coingecko.com/api/v3/coins/markets', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                },
                qs: {
                    vs_currency: 'usd',
                    order: 'market_cap_desc',
                    per_page: 10,
                    page: 1,
                    sparkline: false
                }
            });
            const data = await response.json();
            displayPrices(data);
            populateCryptoSelect(data);
        } catch (error) {
            console.error('Error fetching crypto prices:', error);
        }
    }

    // Function to display cryptocurrency prices
    function displayPrices(data) {
        priceList.innerHTML = '';
        data.forEach(crypto => {
            const div = document.createElement('div');
            div.className = 'crypto-item';
            div.innerHTML = `<strong>${crypto.name} (${crypto.symbol.toUpperCase()}):</strong> $${crypto.current_price}`;
            priceList.appendChild(div);
        });
    }

    // Function to populate the select dropdown
    function populateCryptoSelect(data) {
        cryptoSelect.innerHTML = '';
        data.forEach(crypto => {
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
        const amount = tradeForm['trade-amount'].value;
        console.log(`Trading ${amount} of ${selectedCrypto}`);
        alert(`Trade executed: ${amount} of ${selectedCrypto}`);
    });

    // Initial fetch of cryptocurrency prices
    fetchCryptoPrices();
});
