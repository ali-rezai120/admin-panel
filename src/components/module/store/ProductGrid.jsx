import { Pencil, Eye, Trash2 } from "lucide-react";

function ProductGrid({
  currentProducts,
  navigate,
  setDeleteError,
  setProductToDelete,
}) {
  
  return (
    <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 xl:grid-cols-3">
      {currentProducts.length === 0 ? (
        <p className="col-span-full py-12 text-center text-sm text-gray-400">
          No products found.
        </p>
      ) : (
        currentProducts.map((product) => (
          <div
            key={product.id}
            className="rounded-xl border border-gray-200 bg-white p-4 transition-colors hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
          >
            <img
              src={product.image}
              alt={product.name}
              className="mb-4 h-40 w-full rounded-lg bg-gray-50 object-contain dark:bg-gray-800"
            />
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {product.name}
            </h3>
            <p className="mt-1 text-sm text-gray-500">{product.sku}</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="font-semibold text-gray-900 dark:text-white">
                ${Number(product.price).toFixed(2)}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Stock: {product.stock}
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 border-t border-gray-100 pt-3 dark:border-gray-700">
              <button
                type="button"
                onClick={() =>
                  navigate(`/products/product-details/${product.id}`)
                }
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-600 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                <Eye size={16} />
                View
              </button>
              <button
                type="button"
                onClick={() => navigate(`/products/edit-product/${product.id}`)}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-600 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                <Pencil size={16} />
                Edit
              </button>
              <button
                type="button"
                onClick={() => {
                  setDeleteError("");
                  setProductToDelete(product);
                }}
                aria-label={`Delete ${product.name}`}
                className="flex items-center justify-center rounded-lg border border-red-100 px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50 dark:border-red-900/60 dark:text-red-400 dark:hover:bg-red-950/40"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ProductGrid;
