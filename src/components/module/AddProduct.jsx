import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { X } from "lucide-react";
import { useProducts } from "../../context/ProductsContext";
import ProductImageUpload from "./add-product/ProductImageUpload";
import ProductFormFields from "./add-product/ProductFormFields";
import {
  createProductData,
  createNewProduct,
} from "../../utils/productFormUtils";

export default function AddProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { products, setProducts, category } = useProducts();

  const isEditing = Boolean(id);
  const product = products.find((item) => String(item.id) === String(id));

  const [form, setForm] = useState({
    name: "",
    selectedCategory: "",
    price: "",
    stock: "",
    description: "",
    imagePreview: "",
  });

  useEffect(() => {
    if (!product) return;

    setForm({
      name: product.name ?? "",
      selectedCategory: String(product.category ?? ""),
      price: String(product.price ?? ""),
      stock: String(product.stock ?? ""),
      description: product.description ?? "",
      imagePreview: product.image ?? "",
    });
  }, [product]);

  const updateField = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const closeModal = () => navigate("/products");

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => updateField("imagePreview", reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = createProductData(form);

    setProducts((prev) =>
      isEditing
        ? prev.map((item) =>
            String(item.id) === String(id) ? { ...item, ...productData } : item,
          )
        : [createNewProduct(productData), ...prev],
    );

    closeModal();
  };

  if (isEditing && !product) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
        <div className="rounded-xl bg-white p-6 shadow-xl dark:bg-gray-900">
          <p className="text-gray-700 dark:text-gray-200">Product not found.</p>
          <button
            onClick={closeModal}
            className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white"
          >
            Back to products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onClick={closeModal}
    >
      <div
        className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex shrink-0 items-center justify-between border-b border-gray-100 px-6 py-4 dark:border-gray-700">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {isEditing ? "Edit Product" : "Add Product"}
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {isEditing
                ? "Update your product details."
                : "Enter the details of your new product."}
            </p>
          </div>

          <button
            type="button"
            onClick={closeModal}
            aria-label="Close modal"
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X size={20} />
          </button>
        </header>

        <form
          onSubmit={handleSubmit}
          className="min-h-0 space-y-4 overflow-y-auto px-6 py-5"
        >
          <ProductImageUpload
            imagePreview={form.imagePreview}
            onImageChange={handleImageChange}
          />

          <ProductFormFields
            {...form}
            setName={(value) => updateField("name", value)}
            setSelectedCategory={(value) =>
              updateField("selectedCategory", value)
            }
            setPrice={(value) => updateField("price", value)}
            setStock={(value) => updateField("stock", value)}
            setDescription={(value) => updateField("description", value)}
            category={category}
          />

          <footer className="flex justify-end gap-3 border-t border-gray-100 pt-5 dark:border-gray-700">
            <button
              type="button"
              onClick={closeModal}
              className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              {isEditing ? "Save Changes" : "Add Product"}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}
