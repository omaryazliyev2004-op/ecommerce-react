import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#f5f5f7] text-gray-500 text-sm mt-20">
      
      {/* Top */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-300">
        
        {/* Logo */}
        <div className="flex flex-col gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 814 1000" className="w-8 h-8 fill-gray-800">
            <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.5 134.4-317.3 265.5-317.3 69.8 0 127.9 45.6 171.6 45.6 41.8 0 107.5-48 185.9-48 29.8 0 130.3 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" />
          </svg>
          <p className="text-gray-500 text-xs leading-relaxed max-w-[180px]">
            Premium Apple mahsulotlari eng yaxshi narxlarda.
          </p>
        </div>

        {/* Shop */}
        <div>
          <h4 className="text-gray-900 font-semibold mb-3">Shop</h4>
          <ul className="flex flex-col gap-2">
            <li><Link to="/iphone" className="hover:text-gray-900 transition">iPhone</Link></li>
            <li><Link to="/mac" className="hover:text-gray-900 transition">Mac</Link></li>
            <li><Link to="/watch" className="hover:text-gray-900 transition">Watch</Link></li>
            <li><Link to="/cart" className="hover:text-gray-900 transition">Cart</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-gray-900 font-semibold mb-3">Support</h4>
          <ul className="flex flex-col gap-2">
            <li><a href="#" className="hover:text-gray-900 transition">FAQ</a></li>
            <li><a href="#" className="hover:text-gray-900 transition">Yetkazib berish</a></li>
            <li><a href="#" className="hover:text-gray-900 transition">Qaytarish</a></li>
            <li><a href="#" className="hover:text-gray-900 transition">Bog'lanish</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-gray-900 font-semibold mb-3">Bog'lanish</h4>
          <ul className="flex flex-col gap-2">
            <li className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              support@apple.uz
            </li>
            <li className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +998 71 123 45 67
            </li>
            <li className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Toshkent, Uzbekiston
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom */}
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
        <p>© 2024 Apple Store UZ. Barcha huquqlar himoyalangan.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-gray-900 transition">Maxfiylik</a>
          <a href="#" className="hover:text-gray-900 transition">Shartlar</a>
          <a href="#" className="hover:text-gray-900 transition">Cookies</a>
        </div>
      </div>

    </footer>
  );
}