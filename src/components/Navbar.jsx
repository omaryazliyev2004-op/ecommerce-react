import { Link } from "react-router-dom";
import { useState } from "react";
import { useCartStore } from "../store/cartStore";

export default function Navbar() {
  const cart = useCartStore((state) => state.cart);
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="pb-[50px]">
      <nav className="flex items-center justify-between md:justify-center gap-[40px] px-6 md:px-12 py-5 bg-[#f5f5f7]/90 backdrop-blur-md fixed top-0 left-0 right-0 w-full z-50">

        {/* Logo */}
        <Link to="/" className="text-black hover:opacity-60 transition">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 814 1000" className="w-8 h-8 fill-current">
            <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.5 134.4-317.3 265.5-317.3 69.8 0 127.9 45.6 171.6 45.6 41.8 0 107.5-48 185.9-48 29.8 0 130.3 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" />
          </svg>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          <Link to="/" className="hover:text-gray-400 transition text-[17px] text-gray-800">Home</Link>
          <Link to="/mac" className="hover:text-gray-400 transition text-[17px] text-gray-800">Mac</Link>
          <Link to="/iphone" className="hover:text-gray-400 transition text-[17px] text-gray-800">iPhone</Link>
          <Link to="/watch" className="hover:text-gray-400 transition text-[17px] text-gray-800">Watch</Link>
          <Link to="/cart" className="relative flex items-center gap-2 text-[17px] text-gray-800 hover:text-gray-400 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-1.684 2.032-3.406 2.032-3.406a3 3 0 00-2.81-4.094H6.106l-.384-1.437A1.125 1.125 0 004.635 6H2.25" />
            </svg>
            Cart
            {totalQty > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-[2px] rounded-full">
                {totalQty}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Right: Cart + Hamburger */}
        <div className="flex md:hidden items-center gap-4 absolute right-6">
          <Link to="/cart" className="relative flex items-center text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-1.684 2.032-3.406 2.032-3.406a3 3 0 00-2.81-4.094H6.106l-.384-1.437A1.125 1.125 0 004.635 6H2.25" />
            </svg>
            {totalQty > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-[2px] rounded-full">
                {totalQty}
              </span>
            )}
          </Link>

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-800">
            {menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="fixed inset-0 top-[72px] bg-[#f5f5f7]/98 backdrop-blur-md z-40 flex flex-col items-center justify-center gap-8 md:hidden animate-fade-in">

          <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 text-gray-800 text-2xl font-medium hover:text-blue-600 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Home
          </Link>

          <Link to="/mac" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 text-gray-800 text-2xl font-medium hover:text-blue-600 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Mac
          </Link>

          <Link to="/iphone" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 text-gray-800 text-2xl font-medium hover:text-blue-600 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            iPhone
          </Link>

          <Link to="/watch" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 text-gray-800 text-2xl font-medium hover:text-blue-600 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Watch
          </Link>

          <Link to="/cart" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 text-gray-800 text-2xl font-medium hover:text-blue-600 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-1.684 2.032-3.406 2.032-3.406a3 3 0 00-2.81-4.094H6.106l-.384-1.437A1.125 1.125 0 004.635 6H2.25" />
            </svg>
            Cart {totalQty > 0 && <span className="bg-red-500 text-white text-sm px-2 py-[2px] rounded-full">{totalQty}</span>}
          </Link>

        </div>
      )}
    </div>
  );
}