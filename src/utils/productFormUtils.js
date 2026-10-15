export function createProductData({
  name,
  selectedCategory,
  price,
  stock,
  description,
  imagePreview,
}) {
  const now = new Date().toISOString();
  const stockValue = Number(stock);

  return {
    name: name.trim(),
    category: selectedCategory,
    price: Number(price),
    stock: stockValue,
    status:
      stockValue === 0 ? "inactive" : stockValue <= 5 ? "low-stock" : "active",
    image: imagePreview,
    description: description.trim(),
    updatedAt: now,
  };
}

export function createNewProduct(productData) {
  const now = productData.updatedAt;
  const timestamp = Date.now();

  return {
    ...productData,
    id: `product-${timestamp}`,
    brand: "",
    sku: `SKU-${timestamp}`,
    createdAt: now,
  };
}
