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

// Initialize cart quantity on load
updateCartQuantity();

