import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductFilters from "./ProductFilters";
import ProductTable from "./store/ProductTable";
import ProductGrid from "./store/ProductGrid";
import ProductPagination from "./store/ProductPagination";
import DeleteProductModal from "./store/DeleteProductModal";

import { filterProducts } from "../../utils/filterProducts";
import { getProductPagination } from "../../utils/productPagination";
import {
  toggleProductSelection,
  toggleAllProductSelection,
} from "../../utils/productActions";

import { useProductDeletion } from "../../hooks/useProductDeletion";

function ProductStore({ products = [], category = [] }) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("list");

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);

  const navigate = useNavigate();

  const filteredProducts = filterProducts(
    products,
    search,
    selectedCategory,
    selectedStatus,
    sortBy,
  );

  const productsPerPage = 10;

  const { totalPages, startIndex, currentProducts } = getProductPagination(
    filteredProducts,
    currentPage,
    productsPerPage,
  );

  useEffect(() => {
    if (currentPage > Math.max(totalPages, 1)) {
      setCurrentPage(Math.max(totalPages, 1));
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
  setSelectedProducts((previousSelected) =>
    previousSelected.filter((id) =>
      products.some((product) => product.id === id),
    ),
  );
}, [products]);

  const toggleProduct = (id) => {
    setSelectedProducts((prev) => toggleProductSelection(prev, id));
  };

  const toggleAllProducts = () => {
    setSelectedProducts((prev) =>
      toggleAllProductSelection(prev, currentProducts),
    );
  };

  const {
    productToDelete,
    setProductToDelete,
    isDeleting,
    deleteError,
    setDeleteError,
    successMessage,
    handleDeleteProduct,
  } = useProductDeletion();

  return (
    <>
      <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm transition-colors duration-300 dark:border-gray-800 dark:bg-gray-900">
        <ProductFilters
          search={search}
          setSearch={setSearch}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          sortBy={sortBy}
          setSortBy={setSortBy}
          viewMode={viewMode}
          setViewMode={setViewMode}
          category={category}
          setCurrentPage={setCurrentPage}
        />
        {viewMode === "list" ? (
          <ProductTable
            currentProducts={currentProducts}
            category={category}
            selectedProducts={selectedProducts}
            toggleProduct={toggleProduct}
            toggleAllProducts={toggleAllProducts}
            openMenuId={openMenuId}
            setOpenMenuId={setOpenMenuId}
            navigate={navigate}
            setDeleteError={setDeleteError}
            setProductToDelete={setProductToDelete}
          />
        ) : (
          <ProductGrid
            currentProducts={currentProducts}
            navigate={navigate}
            setDeleteError={setDeleteError}
            setProductToDelete={setProductToDelete}
          />
        )}
        <ProductPagination
          filteredProducts={filteredProducts}
          startIndex={startIndex}
          productsPerPage={productsPerPage}
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>
      {successMessage && (
        <div
          role="status"
          className="mb-4 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700"
        >
          {successMessage}
        </div>
      )}

      <DeleteProductModal
        productToDelete={productToDelete}
        isDeleting={isDeleting}
        deleteError={deleteError}
        setProductToDelete={setProductToDelete}
        handleDeleteProduct={handleDeleteProduct}
      />
    </>
  );
}

export default ProductStore;
