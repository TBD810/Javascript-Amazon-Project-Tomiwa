function formatCurrency(priceCents) {
  const price = Math.round(priceCents) / 100;
  return `$${price.toFixed(2)}`;
}

export default formatCurrency;
