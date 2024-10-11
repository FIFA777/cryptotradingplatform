document.addEventListener('DOMContentLoaded', () => {
    const priceList = document.getElementById('price-list');
    const cryptoSelect = document.getElementById('crypto-select');
    const tradeForm = document.getElementById('trade-form');
    const tradeAmountInput = document.getElementById('trade-amount');
    const balanceElement = document.getElementById('balance');
    const depositButton = document.getElementById('deposit-button');
    const withdrawButton = document.getElementById('withdraw-button');

    let balance = 0;

    // Function to fetch cryptocurrency prices
    async function fetchCryptoPrices() {
        try {
            const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
            const cryptoPrices = await response.json();
            displayPrices(cryptoPrices);
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

    // Function to handle form submission
    tradeForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const selectedCrypto = cryptoSelect.value;
        const amount = parseFloat(tradeAmountInput.value);

        if (selectedCrypto && amount) {
            if (amount <= balance) {
                balance -= amount;
                balanceElement.textContent = balance.toFixed(2);
                console.log(`Trading ${amount} of ${selectedCrypto}`);
                alert(`Trade executed: ${amount} of ${selectedCrypto}`);
            } else {
                alert('Insufficient funds in your wallet.');
            }
        } else {
            alert('Please select a cryptocurrency and enter a valid amount.');
        }
    });

    // Function to handle deposit
    depositButton.addEventListener('click', () => {
        const depositAmount = parseFloat(prompt('Enter the amount to deposit:'));
        if (!isNaN(depositAmount) && depositAmount > 0) {
            balance += depositAmount;
            balanceElement.textContent = balance.toFixed(2);
            alert(`Deposit of $${depositAmount.toFixed(2)} successful.`);
        } else {
            alert('Invalid deposit amount.');
        }
    });

    // Function to handle withdrawal
    withdrawButton.addEventListener('click', () => {
        const withdrawalAmount = parseFloat(prompt('Enter the amount to withdraw:'));
        if (!isNaN(withdrawalAmount) && withdrawalAmount > 0 && withdrawalAmount <= balance) {
            balance -= withdrawalAmount;
            balanceElement.textContent = balance.toFixed(2);
            alert(`Withdrawal of $${withdrawalAmount.toFixed(2)} successful.`);
        } else {
            alert('Invalid withdrawal amount or insufficient funds.');
        }
    });

    // Initial fetch of cryptocurrency prices
    fetchCryptoPrices();
});
