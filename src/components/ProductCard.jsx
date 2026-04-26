import { useCartStore } from "../store/cartStore";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">

      {/* Image */}
      <Link to={`/product/${product.id}`}>
        <div className="bg-gray-50 flex items-center justify-center h-56 p-6">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Info */}
        <div className="p-4">
          <span className="text-xs text-blue-500 font-semibold uppercase tracking-widest">
            {product.category}
          </span>
          <h2 className="font-semibold text-gray-900 mt-1 text-[15px] line-clamp-2 group-hover:text-blue-600 transition">
            {product.title}
          </h2>
          <p className="text-gray-800 font-bold mt-1 text-lg">
            ${product.price}
          </p>
        </div>
      </Link>

      {/* Button */}
      <div className="px-4 pb-4">
        <button
          onClick={() => addToCart(product)}
          className="w-full bg-black text-white py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800 active:scale-95 transition-all duration-200"
        >
          Add to Cart
        </button>
      </div>

    </div>
  );
}