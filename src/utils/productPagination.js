export function getProductPagination(
  filteredProducts,
  currentPage,
  productsPerPage = 10,
) {
  const safeProductsPerPage = Math.max(1, productsPerPage);
  const totalPages = Math.ceil(
    filteredProducts.length / safeProductsPerPage,
  );

  const safeCurrentPage = Math.min(
    Math.max(1, currentPage),
    Math.max(1, totalPages),
  );

  const startIndex = (safeCurrentPage - 1) * safeProductsPerPage;

  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + safeProductsPerPage,
  );

  return {
    totalPages,
    startIndex,
    currentProducts,
  };
}
