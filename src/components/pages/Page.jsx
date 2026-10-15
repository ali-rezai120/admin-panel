import { Route, Routes } from "react-router-dom";
import HomePage from "../template/HomePage";
import AddProduct from "../module/AddProduct";
import ProductDetails from "../template/ProductDetails";

function Page() {
  return (
    <Routes>
      <Route path="/products" element={<HomePage />} />
      <Route path="/products/add-product" element={<AddProduct />} />
      <Route path="/products/edit-product/:id" element={<AddProduct />} />
      <Route
        path="/products/product-details/:id"
        element={<ProductDetails />}
      />
    </Routes>
  );
}

export default Page;
