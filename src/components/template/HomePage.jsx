import { Outlet } from "react-router-dom";
import Products from "../module/Products";

function HomePage() {
  return (
    <>
      <Products />
      <Outlet />
    </>
  );
}

export default HomePage;
