import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useThemeStore } from "./store/themeStore";
import { useProductStore } from "./store/productStore";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Mac from "./pages/Mac";
import Iphone from "./pages/Iphone";
import Watch from "./pages/Watch";
import ProductDetail from "./pages/ProductDetail";
import Admin from "./pages/Admin";
import Wishlist from "./pages/Wishlist";
import ToastContainer from "./components/ToastContainer";

function App() {
  const theme = useThemeStore((state) => state.theme);
  const fetchProducts = useProductStore((state) => state.fetchProducts);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <BrowserRouter>
      <ToastContainer />
      <Navbar />
      <div className="pt-[72px]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mac" element={<Mac />} />
          <Route path="/iphone" element={<Iphone />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/watch" element={<Watch />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;