import { createContext, useContext, useEffect, useState } from "react";
import { defaultCategories, defaultProducts } from "../data/productData";

const ProductContext = createContext();

function loadFromStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(() =>
    loadFromStorage("admin-products", defaultProducts),
  );

  const [category, setCategory] = useState(() =>
    loadFromStorage("admin-categories", defaultCategories),
  );

  useEffect(() => {
    localStorage.setItem("admin-products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("admin-categories", JSON.stringify(category));
  }, [category]);

  return (
    <ProductContext.Provider
      value={{ products, setProducts, category, setCategory }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductContext);
}
