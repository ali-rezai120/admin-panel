import { useNavigate } from "react-router-dom";
import { Plus, Package, PackageX, Tags } from "lucide-react";
import { useProducts } from "../../context/ProductsContext";
import ProductStore from "./ProductStore";

function Products() {
  const { products, category } = useProducts();
  const navigate = useNavigate();

  const OutofStock = products.filter((p) => p.stock === 0);

  const cardClass =
    "rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-900";

  const labelClass = "text-sm font-medium text-gray-500 dark:text-gray-400";

  const numberClass =
    "mt-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white";

  const descriptionClass = "mt-2 text-xs text-gray-400 dark:text-gray-500";

  return (
    <>
      {/* Page Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Products
          </h1>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Manage your store products
          </p>
        </div>

        {/* Add Product */}
        <button
          onClick={() => navigate("/products/add-product")}
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-md active:scale-[0.98]"
        >
          <Plus size={18} strokeWidth={2.5} />
          Add Product
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {/* Total Products */}
        <div className={cardClass}>
          <div className="flex items-center justify-between">
            <p className={labelClass}>Total Products</p>

            <div className="rounded-xl bg-green-50 p-3 text-green-600 dark:bg-green-950/40 dark:text-green-400">
              <Package size={22} />
            </div>
          </div>

          <h2 className={numberClass}>{products.length}</h2>

          <p className={descriptionClass}>All products in your store</p>
        </div>

        {/* Out of Stock */}
        <div className={cardClass}>
          <div className="flex items-center justify-between">
            <p className={labelClass}>Out of Stock</p>

            <div className="rounded-xl bg-red-50 p-3 text-red-600 dark:bg-red-950/40 dark:text-red-400">
              <PackageX size={22} />
            </div>
          </div>

          <h2 className={numberClass}>{OutofStock.length}</h2>

          <p className={descriptionClass}>Products with zero stock</p>
        </div>

        {/* Categories */}
        <div className={cardClass}>
          <div className="flex items-center justify-between">
            <p className={labelClass}>Categories</p>

            <div className="rounded-xl bg-purple-50 p-3 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400">
              <Tags size={22} />
            </div>
          </div>

          <h2 className={numberClass}>{category.length}</h2>

          <p className={descriptionClass}>
            Available product categories
          </p>
        </div>
      </div>

      {/* Products Table / Grid */}
      <ProductStore products={products} category={category} />
    </>
  );
}

export default Products;