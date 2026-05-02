import { Link } from "react-router-dom";
import { useState } from "react";
import SearchModal from "./SearchModal";
import { useCartStore } from "../store/cartStore";
import { useWishlistStore } from "../store/wishlistStore";
import { useThemeStore } from "../store/themeStore";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/mac", label: "Mac" },
  { to: "/iphone", label: "iPhone" },
  { to: "/watch", label: "Watch" },
  { to: "/admin", label: "Admin" },
];

export default function Navbar() {
  const cart = useCartStore((state) => state.cart);
  const wishlist = useWishlistStore((state) => state.wishlist);
  const { theme, toggleTheme } = useThemeStore();
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  const wishlistQty = wishlist.length;
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-black/5 bg-white/82 backdrop-blur-2xl transition-colors dark:border-white/5 dark:bg-gray-950/82">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
          <Link to="/" className="flex items-center gap-3 text-gray-950 transition hover:opacity-70 dark:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 814 1000" className="h-7 w-7 fill-current">
              <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.5 134.4-317.3 265.5-317.3 69.8 0 127.9 45.6 171.6 45.6 41.8 0 107.5-48 185.9-48 29.8 0 130.3 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" />
            </svg>
            <span className="hidden text-sm font-black tracking-normal sm:inline">Apple Store</span>
          </Link>

          <div className="hidden items-center gap-2 rounded-full border border-gray-200 bg-gray-50 p-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="rounded-full px-5 py-2 text-sm font-bold text-gray-600 transition hover:bg-white hover:text-gray-950 hover:shadow-sm dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-50 hover:text-gray-950 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
              aria-label="Toggle Dark Mode"
            >
              {theme === "dark" ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            <button
              onClick={() => setSearchOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-50 hover:text-gray-950 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
              aria-label="Search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            <Link
              to="/wishlist"
              className="relative inline-flex h-11 min-w-11 items-center justify-center rounded-full bg-gray-50 px-3 text-gray-600 transition hover:bg-red-50 hover:text-red-500 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-red-500/20 dark:hover:text-red-400"
              aria-label="Wishlist"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {wishlistQty > 0 && (
                <span className="absolute -right-1 -top-1 min-w-5 rounded-full bg-red-500 px-1.5 py-0.5 text-center text-[11px] font-black text-white">
                  {wishlistQty}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              className="relative inline-flex h-11 min-w-11 items-center justify-center rounded-full bg-gray-950 px-4 text-sm font-bold text-white transition hover:bg-blue-600 dark:bg-white dark:text-gray-950 dark:hover:bg-blue-500 dark:hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-1.684 2.032-3.406 2.032-3.406a3 3 0 00-2.81-4.094H6.106l-.384-1.437A1.125 1.125 0 004.635 6H2.25" />
              </svg>
              <span className="hidden md:inline">Cart</span>
              {totalQty > 0 && (
                <span className="absolute -right-1 -top-1 min-w-5 rounded-full bg-blue-500 px-1.5 py-0.5 text-center text-[11px] font-black text-white">
                  {totalQty}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-950 md:hidden"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-x-0 top-[72px] z-40 border-b border-black/5 bg-white/96 px-5 py-5 shadow-2xl backdrop-blur-2xl md:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className="rounded-2xl px-4 py-4 text-lg font-black text-gray-950 transition hover:bg-gray-100"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      <SearchModal isOpen={isSearchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
