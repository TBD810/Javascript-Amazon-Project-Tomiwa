import { cart, addToCart } from "./data/cart.js";
import { products } from "./data/products.js";
import { formatCurrency } from "./utils/money.js";

let productsHTML = "";

products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image" src="${product.image}" alt="${product.name}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars" src="${product.rating.stars}" alt="Rating">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        ${formatCurrency(product.priceCents)}
      </div>

      <div class="product-quantity-container">
        <select class="js-quantity-selector" data-product-id="${product.id}">
          ${[...Array(10)].map((_, i) => `<option value="${i + 1}">${i + 1}</option>`).join("")}
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png" alt="Checkmark">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart"
        data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `;
});

document.querySelector(".js-products-grid").innerHTML = productsHTML;

// Update cart quantity display in header
function updateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });

  const cartQuantityElement = document.querySelector(".cart-quantity") || document.querySelector(".js-cart-quantity");
  if (cartQuantityElement) {
    cartQuantityElement.innerHTML = cartQuantity;
  }
}

// Attach "Add to Cart" event listeners
document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;
    const quantitySelector = document.querySelector(`.js-quantity-selector[data-product-id="${productId}"]`);
    const quantity = parseInt(quantitySelector.value, 10);

    addToCart(productId, quantity);
    updateCartQuantity();

    // Optional visual feedback
    const addedMessage = button.previousElementSibling;
    addedMessage.classList.add("visible");
    setTimeout(() => {
      addedMessage.classList.remove("visible");
    }, 1000);
  });
});

// amazon.js

// Load cart from localStorage or start empty
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add to cart buttons
document.querySelectorAll('.add-to-cart-button').forEach((button, index) => {
  button.addEventListener('click', () => {
    const productElement = button.closest('.product-container');
    const name = productElement.querySelector('.product-name').innerText;
    const price = parseFloat(productElement.querySelector('.product-price').innerText.replace('$', ''));
    const image = productElement.querySelector('.product-image').src;
    const quantity = parseInt(productElement.querySelector('select').value);

    // Check if product exists
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ name, price, image, quantity });
    }

    // Save cart
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update header cart quantity
    updateCartQuantity();
  });
});

function updateCartQuantity() {
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelector('.cart-quantity').innerText = totalQuantity;
}

// Run once on page load
updateCartQuantity();

