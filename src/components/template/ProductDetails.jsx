import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Package,
  Pencil,
  Tag,
  Boxes,
  Barcode,
  CalendarDays,
} from "lucide-react";
import { useProducts } from "../../context/ProductsContext";
import RelatedProducts from "../module/RelatedProducts";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, category } = useProducts();

  const product = products.find((item) => String(item.id) === String(id));

  if (!product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <Package size={48} className="mb-4 text-gray-300 dark:text-gray-600" />

        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          Product Not Found
        </h2>

        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          This product may have been deleted or does not exist.
        </p>

        <button
          onClick={() => navigate("/products")}
          className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          Back to Products
        </button>
      </div>
    );
  }

  const categoryName =
    category.find(
      (item) =>
        String(item.id) === String(product.category) ||
        String(item.name) === String(product.category),
    )?.name ||
    product.category ||
    "Uncategorized";

  const status =
    product.stock === 0
      ? {
          label: "Out of Stock",
          style: "bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400",
        }
      : product.stock <= 5
        ? {
            label: "Low Stock",
            style:
              "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400",
          }
        : {
            label: "Active",
            style:
              "bg-green-50 text-green-600 dark:bg-green-950/40 dark:text-green-400",
          };

  const formatDate = (date) => {
    if (!date) return "Not available";

    const parsedDate = new Date(date);

    return Number.isNaN(parsedDate.getTime())
      ? "Not available"
      : parsedDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
  };

  return (
    <div className="min-h-screen bg-gray-50/70 p-4 transition-colors sm:p-6 lg:p-8 dark:bg-gray-950">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <button
              onClick={() => navigate("/products")}
              className="mb-3 flex items-center gap-2 text-sm text-gray-500 transition hover:text-blue-600 dark:text-gray-400"
            >
              <ArrowLeft size={16} />
              Back to Products
            </button>

            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Product Details
            </h1>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              View complete information about this product.
            </p>
          </div>

          <button
            onClick={() => navigate(`/products/edit-product/${product.id}`)}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            <Pencil size={16} />
            Edit Product
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-colors dark:border-gray-800 dark:bg-gray-900 lg:col-span-2 sm:p-7">
            <div className="flex min-h-72 items-center justify-center overflow-hidden rounded-xl bg-gray-50 p-5 dark:bg-gray-800">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-80 w-full object-contain"
                />
              ) : (
                <div className="flex flex-col items-center text-gray-300 dark:text-gray-500">
                  <Package size={64} strokeWidth={1.2} />
                  <span className="mt-3 text-sm">No image available</span>
                </div>
              )}
            </div>

            <div className="mt-6">
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${status.style}`}
              >
                {status.label}
              </span>

              <h2 className="mt-3 break-words text-xl font-bold text-gray-900 dark:text-white">
                {product.name}
              </h2>

              <p className="mt-2 text-2xl font-bold text-blue-600">
                {Number(product.price || 0).toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                })}
              </p>

              <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                Product price
              </p>
            </div>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-colors dark:border-gray-800 dark:bg-gray-900 sm:p-7 lg:col-span-3">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              General Information
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Basic details and inventory information.
            </p>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <InfoItem
                icon={<Tag size={18} />}
                label="Category"
                value={categoryName}
              />

              <InfoItem
                icon={<Boxes size={18} />}
                label="Available Stock"
                value={`${product.stock ?? 0} units`}
              />

              <InfoItem
                icon={<Barcode size={18} />}
                label="SKU"
                value={product.sku || "Not available"}
              />

              <InfoItem
                icon={<Package size={18} />}
                label="Brand"
                value={product.brand || "Not specified"}
              />

              <InfoItem
                icon={<CalendarDays size={18} />}
                label="Created At"
                value={formatDate(product.createdAt)}
              />

              <InfoItem
                icon={<CalendarDays size={18} />}
                label="Last Updated"
                value={formatDate(product.updatedAt)}
              />
            </div>

            <div className="mt-8 border-t border-gray-100 pt-6 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Description
              </h3>

              <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-7 text-gray-600 dark:text-gray-300">
                {product.description || "No description available."}
              </p>
            </div>
          </section>
        </div>
      </div>

      <RelatedProducts products={products} currentProductId={product.id} />
    </div>
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <div className="flex min-w-0 gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>

        <p className="mt-1 break-words text-sm font-semibold text-gray-800 dark:text-gray-100">
          {value}
        </p>
      </div>
    </div>
  );
}
