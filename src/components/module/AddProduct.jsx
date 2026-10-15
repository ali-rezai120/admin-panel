import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { X, ImagePlus, UploadCloud } from "lucide-react";
import { useProducts } from "../../context/ProductsContext";

export default function AddProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { products, setProducts, category } = useProducts();

  const isEditing = Boolean(id);
  const product = isEditing
    ? products.find((item) => String(item.id) === String(id))
    : null;

  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (!product) return;

    setName(product.name ?? "");
    setSelectedCategory(String(product.category ?? ""));
    setPrice(String(product.price ?? ""));
    setStock(String(product.stock ?? ""));
    setDescription(product.description ?? "");
    setImagePreview(product.image ?? "");
  }, [product]);

  const closeModal = () => navigate("/products");

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const now = new Date().toISOString();
    const stockValue = Number(stock);

    const productData = {
      name: name.trim(),
      category: selectedCategory,
      price: Number(price),
      stock: stockValue,
      status:
        stockValue === 0
          ? "inactive"
          : stockValue <= 5
            ? "low-stock"
            : "active",
      image: imagePreview,
      description: description.trim(),
      updatedAt: now,
    };

    if (isEditing) {
      if (!product) return;

      setProducts((previousProducts) =>
        previousProducts.map((item) =>
          String(item.id) === String(id) ? { ...item, ...productData } : item,
        ),
      );
    } else {
      const newProduct = {
        ...productData,
        id: `product-${Date.now()}`,
        brand: "",
        sku: `SKU-${Date.now()}`,
        createdAt: now,
      };

      setProducts((previousProducts) => [newProduct, ...previousProducts]);
    }

    closeModal();
  };

  if (isEditing && !product) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
        <div className="rounded-xl bg-white p-6 shadow-xl">
          <p className="text-gray-700">Product not found.</p>
          <button
            type="button"
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
        className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl transition-colors dark:border-gray-700 dark:bg-gray-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-gray-100 px-6 py-4 dark:border-gray-700">
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
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <form
          className="min-h-0 space-y-4 overflow-y-auto px-6 py-5"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Product Image
            </label>

            <label className="group relative flex h-44 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 transition hover:border-blue-400 hover:bg-blue-50/50 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700/50">
              {imagePreview ? (
                <>
                  <img
                    src={imagePreview}
                    alt="Product preview"
                    className="h-full w-full object-contain p-3"
                  />
                  <span className="absolute bottom-3 rounded-lg bg-white/95 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm">
                    Change image
                  </span>
                </>
              ) : (
                <div className="flex flex-col items-center px-4 text-center">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                    <ImagePlus size={26} />
                  </div>
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                    Click to upload an image
                  </p>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    PNG, JPG, WEBP or GIF
                  </p>
                  <div cclassName="absolute bottom-3 rounded-lg bg-white/95 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm dark:bg-gray-900/95 dark:text-gray-100">
                    <UploadCloud size={16} />
                    Choose image
                  </div>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Product Name
            </label>
            <input
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter product name"
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                Category
              </label>
              <select
                required
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              >
                <option value="" disabled>
                  Select category
                </option>
                {category.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                Price ($)
              </label>
              <input
                required
                min="0"
                step="0.01"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                Stock
              </label>
              <input
                required
                min="0"
                step="1"
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="Quantity"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your product..."
              className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex justify-end gap-3 border-t border-gray-100 pt-5 dark:border-gray-700">
            <button
              type="button"
              onClick={closeModal}
              className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              {isEditing ? "Save Changes" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
