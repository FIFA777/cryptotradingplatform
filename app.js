// Sample cryptocurrency price data
const cryptoPrices = {
  bitcoin: 68342,
  ethereum: 2644.98,
  ripple: 0.999819,
  litecoin: 597.95,
  "bitcoin-cash": 1445.27,
};

// Get DOM elements
const balanceElement = document.getElementById("balance");
const depositButton = document.getElementById("deposit-button");
const withdrawButton = document.getElementById("withdraw-button");
const priceList = document.getElementById("price-list");
const tradeForm = document.getElementById("trade-form");
const cryptoSelect = document.getElementById("crypto-select");
const tradeAmount = document.getElementById("trade-amount");

// Update balance
let balance = 0;
function updateBalance(amount) {
  balance += amount;
  balanceElement.textContent = balance.toFixed(2);
}

// Deposit funds
depositButton.addEventListener("click", () => {
  const amount = parseFloat(prompt("Enter the amount to deposit:"));
  if (!isNaN(amount) && amount > 0) {
    updateBalance(amount);
  }
});

// Withdraw funds
withdrawButton.addEventListener("click", () => {
  const amount = parseFloat(prompt("Enter the amount to withdraw:"));
  if (!isNaN(amount) && amount > 0 && amount <= balance) {
    updateBalance(-amount);
  }
});

// Display current cryptocurrency prices
function displayPrices() {
  priceList.innerHTML = "";
  for (const [crypto, price] of Object.entries(cryptoPrices)) {
    const listItem = document.createElement("p");
    listItem.textContent = `${crypto.toUpperCase()}: $${price}`;
    priceList.appendChild(listItem);
  }
}

// Handle trade form submission
tradeForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const selectedCrypto = cryptoSelect.value;
  const amount = parseFloat(tradeAmount.value);
  if (selectedCrypto && !isNaN(amount) && amount > 0 && amount <= balance) {
    const price = cryptoPrices[selectedCrypto];
    const total = amount / price;
    updateBalance(-amount);
    alert(`You bought ${total} ${selectedCrypto.toUpperCase()} for $${amount}.`);
    tradeForm.reset();
  }
});

// Initialize the app
displayPrices();
