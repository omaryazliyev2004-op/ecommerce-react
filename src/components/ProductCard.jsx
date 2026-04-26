import { useCartStore } from "../store/cartStore";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="border rounded-xl p-4 shadow bg-white">

      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          className="h-40 mx-auto object-contain"
        />

        <h2 className="font-semibold mt-2 line-clamp-2">
          {product.title}
        </h2>
      </Link>

      <p className="text-gray-500">${product.price}</p>

      <button
        onClick={() => addToCart(product)}
        className="mt-3 w-full bg-black text-white py-2 rounded-lg"
      >
        Add to Cart
      </button>
    </div>
  );
}