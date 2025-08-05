export let cart = [];

// Load cart data from localStorage when module is loaded
loadFromStorage();

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function loadFromStorage() {
  const storedCart = JSON.parse(localStorage.getItem('cart'));

  if (storedCart && Array.isArray(storedCart)) {
    cart = storedCart;
  } else {
    // Default cart values if nothing is stored
    cart = [
      {
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      },
      {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2'
      }
    ];
  }
}

export function addToCart(productId, quantity = 1) {
  const existingItem = cart.find(item => item.productId === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      productId,
      quantity,
      deliveryOptionId: '1'
    });
  }

  saveToStorage();
}

export function removeFromCart(productId) {
  cart = cart.filter(item => item.productId !== productId);
  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  const item = cart.find(item => item.productId === productId);
  if (item) {
    item.deliveryOptionId = deliveryOptionId;
    saveToStorage();
  }
}

// Optional: loadCart function if you are using an external backend API
export function loadCart(callback) {
  fetch('https://supersimplebackend.dev/cart')
    .then(response => response.json())
    .then(data => {
      console.log('Backend response:', data);
      callback();
    })
    .catch(err => console.error('Failed to fetch cart:', err));
}
