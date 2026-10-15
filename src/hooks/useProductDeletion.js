import { useState } from "react";
import { useProducts } from "../context/ProductsContext";

export function useProductDeletion() {
  const { setProducts } = useProducts();

  const [productToDelete, setProductToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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

  return {
    productToDelete,
    setProductToDelete,
    isDeleting,
    deleteError,
    setDeleteError,
    successMessage,
    handleDeleteProduct,
  };
}
