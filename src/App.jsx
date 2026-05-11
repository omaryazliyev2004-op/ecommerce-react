import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "./Data/firebase";

import { useThemeStore } from "./store/themeStore";
import { useProductStore } from "./store/productStore";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ToastContainer from "./components/ToastContainer";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Mac from "./pages/Mac";
import Iphone from "./pages/Iphone";
import Watch from "./pages/Watch";
import ProductDetail from "./pages/ProductDetail";
import Admin from "./pages/Admin";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLogin from "./pages/AdminLogin";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";


function ProtectedRoute({ user, children }) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}


function AdminRoute({ user, children }) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.email !== "omaryazliyev2004@gmail.com") {
    return <Navigate to="/" replace />;
  }

  return children;
}


function App() {
  const theme = useThemeStore((state) => state.theme);
  const fetchProducts = useProductStore((state) => state.fetchProducts);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

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


  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }


  return (
    <BrowserRouter>
      <ToastContainer />

      <Navbar user={user} />

      <div className="pt-[72px]">
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/mac" element={<Mac />} />
          <Route path="/iphone" element={<Iphone />} />
          <Route path="/watch" element={<Watch />} />
          <Route path="/product/:id" element={<ProductDetail />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/admin-login" element={<AdminLogin />} />


          <Route
            path="/profile"
            element={
              <ProtectedRoute user={user}>
                <Profile />
              </ProtectedRoute>
            }
          />

    
          <Route
            path="/orders"
            element={
              <ProtectedRoute user={user}>
                <Orders />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <AdminRoute user={user}>
                <Admin />
              </AdminRoute>
            }
          />

          <Route
            path="/cart"
            element={
              <ProtectedRoute user={user}>
                <Cart />
              </ProtectedRoute>
            }
          />

          <Route
            path="/wishlist"
            element={
              <ProtectedRoute user={user}>
                <Wishlist />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <AdminRoute user={user}>
                <Admin />
              </AdminRoute>
            }
          />

        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;