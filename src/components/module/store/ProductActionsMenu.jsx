import { Eye, MoreHorizontal, Trash2 } from "lucide-react";

function ProductActionsMenu({
  product,
  openMenuId,
  setOpenMenuId,
  navigate,
  setDeleteError,
  setProductToDelete,
}) {
  const isOpen = openMenuId === product.id;

  const handleViewDetails = () => {
    setOpenMenuId(null);
    navigate(`/products/product-details/${product.id}`);
  };

  const handleDelete = () => {
    setOpenMenuId(null);
    setDeleteError("");
    setProductToDelete(product);
  };

  return (
    <div className="relative inline-block">
      <button
        type="button"
        aria-label={`Actions for ${product.name}`}
        aria-expanded={isOpen}
        onClick={() =>
          setOpenMenuId((current) =>
            current === product.id ? null : product.id,
          )
        }
        className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white"
      >
        <MoreHorizontal size={18} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-1 w-48 rounded-xl border border-gray-100 bg-white p-1.5 text-left shadow-xl dark:border-gray-700 dark:bg-gray-800">
          <button
            type="button"
            onClick={handleViewDetails}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            <Eye size={16} />
            View Details
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
          >
            <Trash2 size={16} />
            Delete Product
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductActionsMenu;
