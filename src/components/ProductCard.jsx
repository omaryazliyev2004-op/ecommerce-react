import { useCartStore } from "../store/cartStore";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <article className="group overflow-hidden rounded-[28px] border border-gray-200/70 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.07)] transition duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-[0_24px_80px_rgba(15,23,42,0.13)]">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative flex aspect-[1.08] items-center justify-center overflow-hidden bg-gradient-to-br from-[#f7f8fb] to-[#eef1f6] p-7">
          <span className="absolute left-4 top-4 rounded-full bg-white/82 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-gray-500 shadow-sm backdrop-blur">
            {product.category}
          </span>
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain drop-shadow-[0_18px_28px_rgba(15,23,42,0.18)] transition duration-500 group-hover:scale-110"
          />
        </div>

        <div className="p-5">
          <h2 className="min-h-12 text-base font-black leading-6 text-gray-950 transition group-hover:text-blue-600">
            {product.title}
          </h2>
          <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-gray-500">
            {product.description}
          </p>
          <div className="mt-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">Price</p>
              <p className="mt-1 text-2xl font-black text-gray-950">${product.price}</p>
            </div>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-600">
              In stock
            </span>
          </div>
        </div>
      </Link>

      <div className="px-5 pb-5">
        <button
          onClick={() => addToCart(product)}
          className="min-h-11 w-full rounded-full bg-gray-950 px-5 text-sm font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-blue-600 active:scale-[0.98]"
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}
