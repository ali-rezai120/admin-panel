import { useNavigate } from "react-router-dom";
import { Plus, Package, PackageX, Tags } from "lucide-react";
import { useProducts } from "../../context/ProductsContext";
import ProductStore from "./ProductStore";

export default function Products() {
  const { products, category } = useProducts();
  const navigate = useNavigate();

  const stats = [
    {
      label: "Total Products",
      value: products.length,
      description: "All products in your store",
      icon: Package,
      color: "green",
    },
    {
      label: "Out of Stock",
      value: products.filter((p) => Number(p.stock) === 0).length,
      description: "Products with zero stock",
      icon: PackageX,
      color: "red",
    },
    {
      label: "Categories",
      value: category.length,
      description: "Available product categories",
      icon: Tags,
      color: "purple",
    },
  ];

  return (
    <>
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Products
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Manage your store products
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/products/add-product")}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
        >
          <Plus size={18} strokeWidth={2.5} />
          Add Product
        </button>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map(({ label, value, description, icon: Icon, color }) => (
          <div
            key={label}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {label}
              </p>

              <div
                className={`rounded-xl bg-${color}-50 p-3 text-${color}-600 dark:bg-${color}-950/40 dark:text-${color}-400`}
              >
                <Icon size={22} />
              </div>
            </div>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white">
              {value}
            </h2>

            <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
              {description}
            </p>
          </div>
        ))}
      </div>

      <ProductStore products={products} category={category} />
    </>
  );
}
