import { cart, addToCart } from "./data/cart.js";
import { products } from "./data/products.js";
import { formatCurrency } from "./utils/money.js";

// Select the container
const productsGrid = document.querySelector(".js-products-grid");

// Build product cards dynamically
products.forEach((product) => {
  // Create product container
  const card = document.createElement("div");
  card.classList.add("product-container");

  // Fill the card HTML
  card.innerHTML = `
    <div class="product-image-container">
      <img class="product-image" src="${product.image}" alt="${product.name}">
    </div>

    <div class="product-name limit-text-to-2-lines"></div>

    <div class="product-rating-container">
      <img class="product-rating-stars" src="${product.rating.stars}" alt="Rating">
      <div class="product-rating-count link-primary"></div>
    </div>

    <div class="product-price"></div>

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
  `;

  // Nested DOM selectors (populate text)
  card.querySelector(".product-name").textContent = product.name;
  card.querySelector(".product-rating-count").textContent = product.rating.count;
  card.querySelector(".product-price").textContent = formatCurrency(product.priceCents);

  // Attach event listener to "Add to Cart"
  const addButton = card.querySelector(".js-add-to-cart");
  addButton.addEventListener("click", () => {
    const productId = addButton.dataset.productId;
    const quantitySelector = card.querySelector(`.js-quantity-selector[data-product-id="${productId}"]`);
    const quantity = parseInt(quantitySelector.value, 10);

    addToCart(productId, quantity);
    updateCartQuantity();

    // Visual feedback
    const addedMessage = card.querySelector(".added-to-cart");
    addedMessage.classList.add("visible");
    setTimeout(() => addedMessage.classList.remove("visible"), 1000);
  });

  // Add card to products grid
  productsGrid.appendChild(card);
});

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

// Run on page load
updateCartQuantity();
