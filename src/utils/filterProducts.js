export function filterProducts(
  products,
  search,
  selectedCategory,
  selectedStatus,
  sortBy,
) {
  const query = search.trim().toLowerCase();

  return products
    .filter((product) => {
      const name = String(product.name ?? "").toLowerCase();
      const sku = String(product.sku ?? "").toLowerCase();
      const id = String(product.id ?? "").toLowerCase();

      const matchesSearch =
        name.includes(query) || sku.includes(query) || id.includes(query);

      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      const matchesStatus =
        selectedStatus === "all" ||
        (selectedStatus === "out-of-stock"
          ? Number(product.stock) === 0
          : Number(product.stock) > 0 && product.status === selectedStatus);

      return matchesSearch && matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "price-low":
          return Number(a.price) - Number(b.price);
        case "price-high":
          return Number(b.price) - Number(a.price);
        case "name":
          return String(a.name ?? "").localeCompare(String(b.name ?? ""));
        case "stock":
          return Number(a.stock) - Number(b.stock);
        case "newest":
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });
}
