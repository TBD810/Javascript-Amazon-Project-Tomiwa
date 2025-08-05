import { renderOrderSummary } from '../Javascripts/Checkout/orderSummary.js';
import { renderPaymentSummary } from '../Javascripts/Checkout/paymentSummary.js';
import { loadProductsFetch } from '../data/products.js';
import { loadCart } from '../data/cart.js';

async function loadPage() {
  try {
    await loadProductsFetch();

    await new Promise((resolve) => {
      loadCart(() => {
        resolve();
      });
    });

    renderOrderSummary();
    renderPaymentSummary();
  } catch (error) {
    console.error('Unexpected error. Please try again later.', error);
  }
}

loadPage();
