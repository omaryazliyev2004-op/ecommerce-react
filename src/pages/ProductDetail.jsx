import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useProductStore } from "../store/productStore";
import { useCartStore } from "../store/cartStore";
import { useWishlistStore } from "../store/wishlistStore";

export default function ProductDetail() {
  const { id } = useParams();
  const addToCart = useCartStore((state) => state.addToCart);
  const products = useProductStore((state) => state.products);
  const product = products.find((item) => String(item.id) === String(id));
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const isFavorite = product ? isInWishlist(product.id) : false;

  const images = product?.images?.length ? product.images : (product ? [product.image] : []);
  const [activeImage, setActiveImage] = useState(images[0]);

  useEffect(() => {
    if (images.length > 0) {
      setActiveImage(images[0]);
    }
  }, [product?.id]);

  if (!product) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-white px-5 text-center dark:bg-[#030712]">
        <div>
          <h1 className="text-3xl font-black text-gray-950 dark:text-white">Product topilmadi</h1>
          <Link to="/" className="mt-5 inline-flex rounded-full bg-gray-950 px-6 py-3 text-sm font-bold text-white dark:bg-white dark:text-gray-950">
            Back home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-white px-5 py-12 sm:px-8 lg:px-10 dark:bg-[#030712]">
      <section className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="flex flex-col gap-4">
          {/* Main Image */}
          <div className="flex min-h-[460px] items-center justify-center rounded-[36px] bg-gradient-to-br from-[#f7f8fb] to-[#eef1f6] p-8 dark:from-gray-800 dark:to-gray-900 transition-all duration-300">
            <img
              src={activeImage}
              alt={product.title}
              className="max-h-[400px] w-full object-contain drop-shadow-[0_34px_55px_rgba(15,23,42,0.20)] animate-fade-in"
            />
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`h-24 w-24 shrink-0 overflow-hidden rounded-2xl border-2 p-2 transition-all duration-200 ${activeImage === img ? 'border-blue-500 bg-white dark:bg-gray-800' : 'border-transparent bg-[#f5f5f7] hover:border-gray-300 dark:bg-gray-800/50'}`}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} className="h-full w-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">{product.category}</p>
          <h1 className="mt-4 text-4xl font-black leading-tight tracking-normal text-gray-950 sm:text-6xl dark:text-white">
            {product.title}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-gray-500 dark:text-gray-400">
            {product.description}. Premium design, strong performance and clean Apple ecosystem experience.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-3">
            {["Original", "Warranty", "Fast delivery"].map((item) => (
              <div key={item} className="rounded-2xl bg-[#f5f5f7] px-4 py-5 text-center text-sm font-bold text-gray-700 dark:bg-gray-900 dark:text-gray-300">
                {item}
              </div>
            ))}
          </div>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <p className="text-4xl font-black text-gray-950 dark:text-white">${product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full bg-gray-950 px-8 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-blue-600 sm:flex-none dark:bg-white dark:text-gray-950 dark:hover:bg-blue-500 dark:hover:text-white"
            >
              Add to Cart
            </button>
            <button
              onClick={() => toggleWishlist(product)}
              className="inline-flex min-h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white transition hover:-translate-y-0.5 hover:border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-gray-600 dark:hover:bg-gray-800"
              aria-label="Toggle wishlist"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition ${isFavorite ? 'fill-red-500 text-red-500' : 'fill-none text-gray-400 dark:text-gray-500'}`} viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isFavorite ? 1 : 2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
