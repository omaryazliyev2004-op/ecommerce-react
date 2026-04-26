import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Mac from "./pages/Mac";
import Iphone from "./pages/Iphone";
import Watch from "./pages/Watch";
import ProductDetail from "./pages/ProductDetail";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mac" element={<Mac />} />
        <Route path="/iphone" element={<Iphone />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/watch" element={<Watch />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;