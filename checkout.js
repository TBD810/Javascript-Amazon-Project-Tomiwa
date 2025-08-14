// checkout.js
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function renderCart() {
  const container = document.querySelector('.checkout-items');
  container.innerHTML = '';

  if (cart.length === 0) {
    container.innerHTML = '<p>Your cart is empty.</p>';
    document.querySelector('.cart-total').innerText = '$0.00';
    return;
  }

  cart.forEach((item, index) => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('checkout-item');
    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}" width="50">
      <span>${item.name}</span>
      <span>$${item.price.toFixed(2)}</span>
      <input type="number" value="${item.quantity}" min="1" class="update-qty" data-index="${index}">
      <button class="delete-item" data-index="${index}">Delete</button>
    `;
    container.appendChild(itemDiv);
  });

  updateTotal();
  attachEvents();
}

function attachEvents() {
  document.querySelectorAll('.update-qty').forEach(input => {
    input.addEventListener('change', e => {
      const index = e.target.dataset.index;
      cart[index].quantity = parseInt(e.target.value);
      saveCart();
      renderCart();
    });
  });

  document.querySelectorAll('.delete-item').forEach(button => {
    button.addEventListener('click', e => {
      const index = e.target.dataset.index;
      cart.splice(index, 1);
      saveCart();
      renderCart();
    });
  });
}

function updateTotal() {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  document.querySelector('.cart-total').innerText = `$${total.toFixed(2)}`;
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

renderCart();
