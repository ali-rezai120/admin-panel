import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  LayoutGrid,
  List,
  Pencil,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Eye,
  Trash2,
} from "lucide-react";
import { useProducts } from "../../context/ProductsContext";

function ProductStore({ products = [], category = [] }) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("list");

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);

  const [productToDelete, setProductToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { setProducts } = useProducts();
  const navigate = useNavigate();

  const filteredProducts = products
    .filter((product) => {
      const query = search.trim().toLowerCase();

      const matchesSearch =
        product.name.toLowerCase().includes(query) ||
        product.sku?.toLowerCase().includes(query) ||
        String(product.id).toLowerCase().includes(query);

      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      const matchesStatus =
        selectedStatus === "all" ||
        (selectedStatus === "out-of-stock"
          ? product.stock === 0
          : product.stock > 0 && product.status === selectedStatus);

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
          return a.name.localeCompare(b.name);
        case "stock":
          return a.stock - b.stock;
        case "newest":
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

  const productsPerPage = 10;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const startIndex = (currentPage - 1) * productsPerPage;

  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage,
  );

  const toggleProduct = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id)
        ? prev.filter((productId) => productId !== id)
        : [...prev, id],
    );
  };

  const toggleAllProducts = () => {
    const currentIds = currentProducts.map((product) => product.id);
    const allSelected =
      currentIds.length > 0 &&
      currentIds.every((id) => selectedProducts.includes(id));

    setSelectedProducts((prev) =>
      allSelected
        ? prev.filter((id) => !currentIds.includes(id))
        : [...new Set([...prev, ...currentIds])],
    );
  };

  const handleDeleteProduct = () => {
    if (!productToDelete || isDeleting) return;

    setIsDeleting(true);
    setDeleteError("");
    setSuccessMessage("");

    try {
      const deletedProduct = productToDelete;

      setProducts((previousProducts) =>
        previousProducts.filter((item) => item.id !== deletedProduct.id),
      );

      setProductToDelete(null);
      setSuccessMessage(`${deletedProduct.name} deleted successfully.`);
    } catch {
      setDeleteError("Failed to delete the product. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm transition-colors duration-300 dark:border-gray-800 dark:bg-gray-900">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:flex lg:items-center">
          {/* Search */}
          <div className="col-span-2 flex min-w-0 items-center gap-2 rounded-xl border border-gray-200 px-3 py-3 transition-colors focus-within:border-blue-500 dark:border-gray-700 dark:bg-gray-800 sm:col-span-3 lg:flex-[2]">
            <Search size={18} className="shrink-0 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search products..."
              className="w-full min-w-0 bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:text-gray-100"
            />
          </div>

          {/* Category */}
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
            className="col-span-1 min-w-0 w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm text-gray-600 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 lg:flex-1"
          >
            <option value="all">All Categories</option>
            {category.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          {/* Status */}
          <select
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              setCurrentPage(1);
            }}
            className="min-w-0 w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm text-gray-600 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 lg:flex-1"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="low-stock">Low Stock</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>

          {/* Sort By */}
          <div className="col-span-2 flex min-w-0 items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-3 transition-colors focus-within:border-blue-500 dark:border-gray-700 dark:bg-gray-800 sm:col-span-2 lg:flex-1">
            <span className="shrink-0 text-xs text-gray-500 dark:text-gray-400">
              Sort by
            </span>

            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full min-w-0 cursor-pointer bg-transparent text-sm text-gray-700 outline-none dark:text-gray-100"
            >
              <option
                className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100"
                value="newest"
              >
                Newest
              </option>
              <option
                className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100"
                value="oldest"
              >
                Oldest
              </option>
              <option
                className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100"
                value="price-low"
              >
                Price: Low to High
              </option>
              <option
                className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100"
                value="price-high"
              >
                Price: High to Low
              </option>
              <option
                className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100"
                value="name"
              >
                Name: A to Z
              </option>
              <option
                className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100"
                value="stock"
              >
                Stock: Low to High
              </option>
            </select>
          </div>

          {/* View Controls */}
          <div className="col-span-2 flex items-center gap-2 sm:col-span-2 lg:shrink-0">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              aria-label="Grid view"
              className={`flex-1 rounded-xl border p-3 transition-colors lg:flex-none ${
                viewMode === "grid"
                  ? "border-blue-100 bg-blue-50 text-blue-600 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-400"
                  : "border-gray-200 text-gray-500 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              }`}
            >
              <LayoutGrid size={19} className="mx-auto" />
            </button>

            <button
              type="button"
              onClick={() => setViewMode("list")}
              aria-label="List view"
              className={`flex-1 rounded-xl border p-3 transition-colors lg:flex-none ${
                viewMode === "list"
                  ? "border-blue-100 bg-blue-50 text-blue-600 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-400"
                  : "border-gray-200 text-gray-500 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              }`}
            >
              <List size={19} className="mx-auto" />
            </button>
          </div>
        </div>
        {viewMode === "list" ? (
          <div className="mt-5 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1050px] text-left">
                <thead className="border-b border-gray-200 bg-gray-50/80 dark:border-gray-700 dark:bg-gray-800">
                  <tr>
                    <th className="w-12 px-5 py-4">
                      <input
                        type="checkbox"
                        checked={
                          currentProducts.length > 0 &&
                          currentProducts.every((product) =>
                            selectedProducts.includes(product.id),
                          )
                        }
                        onChange={toggleAllProducts}
                        aria-label="Select all products on this page"
                        className="h-4 w-4 cursor-pointer accent-blue-600"
                      />
                    </th>
                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-300">
                      Image
                    </th>
                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-300">
                      Name
                    </th>
                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-300">
                      Category
                    </th>
                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-300">
                      Price
                    </th>
                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-300">
                      Stock
                    </th>
                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-300">
                      Status
                    </th>
                    <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-300">
                      Actions
                    </th>
                    <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-300">
                      Edit
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {currentProducts.map((product) => (
                    <tr
                      key={product.id}
                      className="transition-colors duration-150 hover:bg-gray-50/70 dark:hover:bg-gray-800/60"
                    >
                      {/* Checkbox */}
                      <td className="px-5 py-4">
                        <input
                          type="checkbox"
                          checked={selectedProducts.includes(product.id)}
                          onChange={() => toggleProduct(product.id)}
                          aria-label={`Select ${product.name}`}
                          className="h-4 w-4 cursor-pointer accent-blue-600"
                        />
                      </td>
                      {/* Image */}
                      <td className="px-5 py-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-12 w-12 rounded-xl border border-gray-100 bg-gray-50 object-cover"
                        />
                      </td>
                      {/* Name */}
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
                      {/* Category */}
                      <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-600 dark:text-gray-300">
                        {category.find((item) => item.id === product.category)
                          ?.name ?? product.category}
                      </td>
                      {/* Price */}
                      <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-gray-900 dark:text-white">
                        ${Number(product.price).toFixed(2)}
                      </td>
                      {/* Stock */}
                      <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-gray-900 dark:text-white">
                        {product.stock} units
                      </td>
                      {/* Status */}
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
                      {/* Actions */}
                      <td className="px-5 py-4 text-right">
                        <div className="relative inline-block">
                          <button
                            type="button"
                            aria-label={`Actions for ${product.name}`}
                            aria-expanded={openMenuId === product.id}
                            onClick={() =>
                              setOpenMenuId((current) =>
                                current === product.id ? null : product.id,
                              )
                            }
                            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white"
                          >
                            <MoreHorizontal size={18} />
                          </button>

                          {openMenuId === product.id && (
                            <div className="absolute right-0 top-full z-50 mt-1 w-48 rounded-xl border border-gray-100 bg-white p-1.5 text-left shadow-xl dark:border-gray-700 dark:bg-gray-800">
                              <button
                                type="button"
                                onClick={() => {
                                  setOpenMenuId(null);
                                  navigate(
                                    `/products/product-details/${product.id}`,
                                  );
                                }}
                                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 dark:text-gray-200 dark:hover:bg-gray-700"
                              >
                                <Eye size={16} />
                                View Details
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  setOpenMenuId(null);
                                  setDeleteError("");
                                  setProductToDelete(product);
                                }}
                                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
                              >
                                <Trash2 size={16} />
                                Delete Product
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                      {/* Edit */}
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
        ) : (
          <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 xl:grid-cols-3">
            {currentProducts.map((product) => (
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
                    onClick={() =>
                      navigate(`/products/edit-product/${product.id}`)
                    }
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
            ))}
          </div>
        )}
        {/* Pagination */}
        <div className="flex flex-col gap-3 border-t border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing {filteredProducts.length === 0 ? 0 : startIndex + 1} to
            {Math.min(startIndex + productsPerPage, filteredProducts.length)} of
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
      </div>
      {successMessage && (
        <div
          role="status"
          className="mb-4 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700"
        >
          {successMessage}
        </div>
      )}

      {productToDelete && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-product-title"
            className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-700 dark:bg-gray-900"
          >
            <h2
              id="delete-product-title"
              className="text-lg font-bold text-gray-900 dark:text-white"
            >
              Delete Product
            </h2>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Are you sure you want to delete
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                {productToDelete.name}
              </span>
              ? This action cannot be undone.
            </p>

            {deleteError && (
              <p role="alert" className="mt-3 text-sm text-red-600">
                {deleteError}
              </p>
            )}

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setProductToDelete(null)}
                className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={isDeleting}
                onClick={handleDeleteProduct}
                className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Delete Product"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductStore;
