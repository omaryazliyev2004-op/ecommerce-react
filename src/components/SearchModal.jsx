import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/productStore";

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const products = useProductStore((state) => state.products);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
      setQuery("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const results = query.trim() === "" 
    ? [] 
    : products.filter(p => 
        p.title.toLowerCase().includes(query.toLowerCase()) || 
        p.category.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center p-4 sm:p-6 md:p-12">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-950/40 backdrop-blur-md transition-opacity animate-fade-in" 
        onClick={onClose}
      ></div>

      {/* Search Panel */}
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white/95 shadow-2xl backdrop-blur-xl animate-fade-in dark:bg-gray-900/95 dark:shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        
        {/* Search Input Area */}
        <div className="flex items-center border-b border-gray-100 px-4 py-4 sm:px-6 dark:border-gray-800">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, categories..."
            className="flex-1 bg-transparent px-4 text-lg font-medium text-gray-950 outline-none placeholder:text-gray-400 dark:text-white"
          />
          <button 
            onClick={onClose}
            className="rounded-full bg-gray-100 p-2 text-gray-500 transition hover:bg-gray-200 hover:text-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto px-2 py-2 sm:px-4">
          {query.trim() === "" ? (
            <div className="py-12 text-center">
              <p className="text-sm font-semibold text-gray-500">Katalogdan izlash uchun yozishni boshlang</p>
            </div>
          ) : results.length > 0 ? (
            <div className="flex flex-col gap-1">
              {results.map(product => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  onClick={onClose}
                  className="flex items-center gap-4 rounded-2xl p-3 transition hover:bg-gray-100 dark:hover:bg-gray-800/50"
                >
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#f5f5f7] p-2 dark:bg-gray-800">
                    <img src={product.image} alt={product.title} className="h-full w-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-bold text-gray-950 dark:text-white">{product.title}</h4>
                    <p className="text-xs font-semibold uppercase text-gray-400">{product.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-black text-gray-950 dark:text-white">${product.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-sm font-semibold text-gray-500">Hech narsa topilmadi: "{query}"</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
