import { Pencil } from "lucide-react";
import ProductActionsMenu from "./ProductActionsMenu";

function ProductTable({
  currentProducts,
  category,
  selectedProducts,
  toggleProduct,
  toggleAllProducts,
  openMenuId,
  setOpenMenuId,
  navigate,
  setDeleteError,
  setProductToDelete,
}) {
  const allSelected =
    currentProducts.length > 0 &&
    currentProducts.every((product) => selectedProducts.includes(product.id));

  return (
    <div className="mt-5 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1050px] text-left">
          <thead className="border-b border-gray-200 bg-gray-50/80 dark:border-gray-700 dark:bg-gray-800">
            <tr>
              <th className="w-12 px-5 py-4">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleAllProducts}
                  aria-label="Select all products on this page"
                  className="h-4 w-4 cursor-pointer accent-blue-600"
                />
              </th>
              {[
                "Image",
                "Name",
                "Category",
                "Price",
                "Stock",
                "Status",
                "Actions",
                "Edit",
              ].map((heading) => (
                <th
                  key={heading}
                  className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-300"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {currentProducts.map((product) => (
              <tr
                key={product.id}
                className="transition-colors duration-150 hover:bg-gray-50/70 dark:hover:bg-gray-800/60"
              >
                <td className="px-5 py-4">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => toggleProduct(product.id)}
                    aria-label={`Select ${product.name}`}
                    className="h-4 w-4 cursor-pointer accent-blue-600"
                  />
                </td>
                <td className="px-5 py-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-12 w-12 rounded-xl border border-gray-100 bg-gray-50 object-cover"
                  />
                </td>
                <td className="px-5 py-4">
                  <div className="min-w-[200px]">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {product.name}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      {product.sku} · {product.id}
                    </p>
                  </div>
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-600 dark:text-gray-300">
                  {category.find((item) => item.id === product.category)
                    ?.name ?? product.category}
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-gray-900 dark:text-white">
                  ${Number(product.price).toFixed(2)}
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-gray-900 dark:text-white">
                  {product.stock} units
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-600 dark:text-gray-300">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                      product.stock === 0
                        ? "bg-red-50 text-red-600"
                        : product.status === "inactive"
                          ? "bg-gray-100 text-gray-600"
                          : product.status === "low-stock"
                            ? "bg-amber-50 text-amber-600"
                            : "bg-green-50 text-green-600"
                    }`}
                  >
                    {product.stock === 0
                      ? "Out of Stock"
                      : product.status === "low-stock"
                        ? "Low Stock"
                        : product.status === "inactive"
                          ? "Inactive"
                          : "Active"}
                  </span>
                </td>
                <td className="px-5 py-4 text-right">
                  <ProductActionsMenu
                    product={product}
                    openMenuId={openMenuId}
                    setOpenMenuId={setOpenMenuId}
                    navigate={navigate}
                    setDeleteError={setDeleteError}
                    setProductToDelete={setProductToDelete}
                  />
                </td>
                <td className="px-5 py-4 text-right">
                  <button
                    type="button"
                    aria-label={`Edit ${product.name}`}
                    onClick={() =>
                      navigate(`/products/edit-product/${product.id}`)
                    }
                    className="rounded-lg border border-gray-200 bg-white p-2.5 text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    <Pencil size={17} />
                  </button>
                </td>
              </tr>
            ))}
            {currentProducts.length === 0 && (
              <tr>
                <td
                  colSpan={9}
                  className="px-5 py-12 text-center text-sm text-gray-400"
                >
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductTable;
