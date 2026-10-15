import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Package, ChevronLeft, ChevronRight } from "lucide-react";

function RelatedProducts({ products, currentProductId }) {
  const navigate = useNavigate();
  const [startIndex, setStartIndex] = useState(0);

  const relatedProducts = products.filter(
    (item) => String(item.id) !== String(currentProductId),
  );

  const visibleCount = 4;
  const maxIndex = Math.max(0, relatedProducts.length - visibleCount);

  const nextSlide = () => {
    setStartIndex((current) => (current >= maxIndex ? 0 : current + 1));
  };

  const previousSlide = () => {
    setStartIndex((current) => (current <= 0 ? maxIndex : current - 1));
  };

  const visibleProducts = relatedProducts.slice(
    startIndex,
    startIndex + visibleCount,
  );

  return (
    <section className="mt-8">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Related Products
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Explore other products in your store.
          </p>
        </div>
        {relatedProducts.length > visibleCount && (
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={previousSlide}
              aria-label="Previous products"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 transition hover:bg-blue-50 hover:text-blue-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next products"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 transition hover:bg-blue-50 hover:text-blue-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
      {relatedProducts.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-200 bg-white p-6 text-center text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400">
          No other products available.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {visibleProducts.map((item) => (
            <div
              key={item.id}
              className="min-w-0 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="flex h-36 items-center justify-center overflow-hidden rounded-xl bg-gray-50 p-3 dark:bg-gray-800">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <Package size={36} className="text-gray-300" />
                )}
              </div>
              <h3 className="mt-3 truncate text-sm font-semibold text-gray-800 dark:text-gray-100">
                {item.name}
              </h3>
              <p className="mt-2 font-bold text-blue-600">
                {Number(item.price || 0).toLocaleString("en-US")}
              </p>
              <button
                type="button"
                onClick={() => navigate(`/products/product-details/${item.id}`)}
                className="mt-3 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default RelatedProducts;
