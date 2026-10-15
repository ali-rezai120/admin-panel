import { ChevronLeft, ChevronRight } from "lucide-react";

function ProductPagination({
  filteredProducts,
  startIndex,
  productsPerPage,
  currentPage,
  totalPages,
  setCurrentPage,
}) {
    
  return (
    <div className="flex flex-col gap-3 border-t border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Showing {filteredProducts.length === 0 ? 0 : startIndex + 1} to{" "}
        {Math.min(startIndex + productsPerPage, filteredProducts.length)} of{" "}
        {filteredProducts.length} products
      </p>

      <div className="flex items-center justify-end gap-1">
        <button
          type="button"
          onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
          disabled={currentPage === 1}
          aria-label="Previous page"
          className="rounded-lg border border-gray-200 p-2 text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          <ChevronLeft size={18} />
        </button>

        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              type="button"
              onClick={() => setCurrentPage(page)}
              className={`h-9 min-w-9 rounded-lg px-3 text-sm font-medium transition-colors ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              }`}
            >
              {page}
            </button>
          ),
        )}

        <button
          type="button"
          onClick={() =>
            setCurrentPage((page) =>
              Math.min(Math.max(totalPages, 1), page + 1),
            )
          }
          disabled={currentPage >= totalPages || totalPages === 0}
          aria-label="Next page"
          className="rounded-lg border border-gray-200 p-2 text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

export default ProductPagination;