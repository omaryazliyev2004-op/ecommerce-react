import { Link } from "react-router-dom";
import { useWishlistStore } from "../store/wishlistStore";
import ProductCard from "../components/ProductCard";

export default function Wishlist() {
  const wishlist = useWishlistStore((state) => state.wishlist);

  return (
    <main className="min-h-screen bg-white px-5 py-12 sm:px-8 lg:px-10 dark:bg-[#030712]">
      <section className="mx-auto max-w-7xl">
        <div className="mb-10 rounded-[32px] bg-gradient-to-br from-pink-50 to-red-50 px-6 py-12 text-gray-950 sm:px-10 lg:px-14 dark:from-gray-900 dark:to-gray-800 dark:text-white">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-red-500">Your Favorites</p>
          <h1 className="mt-4 text-4xl font-black tracking-normal sm:text-6xl">Wishlist.</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-gray-500 dark:text-gray-400">
            All the products you love, saved in one place for when you are ready.
          </p>
        </div>

        {wishlist.length === 0 ? (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-[32px] bg-[#f5f5f7] px-5 text-center dark:bg-gray-900">
            <svg xmlns="http://www.w3.org/2000/svg" className="mb-5 h-16 w-16 text-gray-300 dark:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <h2 className="text-2xl font-black text-gray-950 dark:text-white">Sevimlilar bo'sh</h2>
            <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500 dark:text-gray-400">
              Yoqtirgan mahsulotingizdagi yurakchani bosib, uni shu yerga saqlashingiz mumkin.
            </p>
            <Link to="/" className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-gray-950 px-8 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-red-500 dark:bg-white dark:text-gray-950 dark:hover:bg-red-500 dark:hover:text-white">
              Katalogga qaytish
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {wishlist.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
