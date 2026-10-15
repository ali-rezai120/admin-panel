export function toggleProductSelection(selectedProducts, id) {
  return selectedProducts.includes(id)
    ? selectedProducts.filter((productId) => productId !== id)
    : [...selectedProducts, id];
}

export function toggleAllProductSelection(selectedProducts, currentProducts) {
  const currentIds = currentProducts.map((product) => product.id);

  const allSelected =
    currentIds.length > 0 &&
    currentIds.every((id) => selectedProducts.includes(id));

  return allSelected
    ? selectedProducts.filter((id) => !currentIds.includes(id))
    : [...new Set([...selectedProducts, ...currentIds])];
}
