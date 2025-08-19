// data/cart.js

// Load cart from localStorage or start empty
export let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Save cart back to localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Add item(s) to cart
export function addToCart(productId, quantity = 1) {
  const existingItem = cart.find(item => item.productId === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      productId,
      quantity
    });
  }

  saveCart();
}

// Remove item from cart
export function removeFromCart(productId) {
  cart = cart.filter(item => item.productId !== productId);
  saveCart();
}

// Update quantity of a cart item
export function updateCartQuantity(productId, newQuantity) {
  const item = cart.find(item => item.productId === productId);
  if (item) {
    item.quantity = newQuantity;
  }
  saveCart();
}
