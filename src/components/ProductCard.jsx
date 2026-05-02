import { useCartStore } from "../store/cartStore";
import { useWishlistStore } from "../store/wishlistStore";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const isFavorite = isInWishlist(product.id);

  return (
    <article className="group overflow-hidden rounded-[28px] border border-gray-200/70 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.07)] transition duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-[0_24px_80px_rgba(15,23,42,0.13)] dark:border-white/10 dark:bg-gray-900 dark:shadow-none dark:hover:border-white/20">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative flex aspect-[1.08] w-full items-center justify-center overflow-hidden bg-gradient-to-br from-[#f7f8fb] to-[#eef1f6] p-8 dark:from-gray-800 dark:to-gray-900">
          <span className="absolute left-4 top-4 z-10 rounded-full bg-white/82 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-gray-500 shadow-sm backdrop-blur dark:bg-black/50 dark:text-gray-300 dark:shadow-none">
            {product.category}
          </span>
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product);
            }}
            className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/82 shadow-sm backdrop-blur transition hover:scale-110"
            aria-label="Toggle wishlist"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition ${isFavorite ? 'fill-red-500 text-red-500' : 'fill-none text-gray-400 dark:text-gray-300'}`} viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isFavorite ? 1 : 2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain mix-blend-multiply transition duration-500 group-hover:scale-110 dark:mix-blend-normal"
          />
        </div>

        <div className="p-5">
          <h2 className="min-h-12 text-base font-black leading-6 text-gray-950 transition group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
            {product.title}
          </h2>
          <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-gray-500 dark:text-gray-400">
            {product.description}
          </p>
          <div className="mt-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">Price</p>
              <p className="mt-1 text-2xl font-black text-gray-950 dark:text-white">${product.price}</p>
            </div>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-600 dark:bg-gray-800 dark:text-gray-300">
              In stock
            </span>
          </div>
        </div>
      </Link>

      <div className="px-5 pb-5">
        <button
          onClick={(e) => { e.preventDefault(); addToCart(product); }}
          className="min-h-11 w-full rounded-full bg-gray-950 px-5 text-sm font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-blue-600 active:scale-[0.98] dark:bg-white dark:text-gray-950 dark:hover:bg-blue-500 dark:hover:text-white"
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}
