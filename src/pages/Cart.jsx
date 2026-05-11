import { useCartStore } from "../store/cartStore";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import CheckoutModal from "../components/CheckoutModal";
import { auth } from "../Data/firebase";

export default function Cart() {
  const { cart, removeFromCart, addToCart, decreaseQty, clearCart } = useCartStore();
  const [isCheckoutOpen, setCheckoutOpen] = useState(false);
  const [user, setUser] = useState(null);
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsubscribe();
  }, []);

  return (
    <main className="min-h-screen bg-[#f5f5f7] px-5 py-12 sm:px-8 lg:px-10 dark:bg-[#030712]">
      <section className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600">Checkout</p>
            <h1 className="mt-3 text-4xl font-black tracking-normal text-gray-950 sm:text-5xl">
              Shopping Cart
            </h1>
          </div>
          <p className="text-sm font-semibold text-gray-500">{totalQty} item(s)</p>
        </div>

        {cart.length === 0 ? (
          <div className="flex min-h-[430px] flex-col items-center justify-center rounded-[32px] bg-white px-6 text-center shadow-[0_20px_70px_rgba(15,23,42,0.08)] dark:bg-gray-900 dark:shadow-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="mb-5 h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-1.684 2.032-3.406 2.032-3.406a3 3 0 00-2.81-4.094H6.106l-.384-1.437A1.125 1.125 0 004.635 6H2.25" />
            </svg>
            <h2 className="text-2xl font-black text-gray-950 dark:text-white">Savat bo'sh</h2>
            <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
              Katalogdan yoqqan mahsulotingizni tanlab, savatga qo'shing.
            </p>
            <Link to="/" className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-gray-950 px-8 text-sm font-bold text-white transition hover:bg-blue-600 dark:bg-white dark:text-gray-950 dark:hover:bg-blue-500 dark:hover:text-white">
              Xarid qilish
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            <div className="flex flex-col gap-4">
              {cart.map((item) => (
                <article key={item.id} className="grid gap-4 rounded-[28px] bg-white p-4 shadow-[0_18px_60px_rgba(15,23,42,0.07)] sm:grid-cols-[112px_1fr_auto] sm:items-center dark:bg-gray-900 dark:shadow-none">
                  <div className="flex h-28 w-28 items-center justify-center rounded-3xl bg-[#f5f5f7] p-4 dark:bg-gray-800">
                    <img src={item.image} alt={item.title} className="h-full w-full object-contain" />
                  </div>

                  <div>
                    <h2 className="text-lg font-black text-gray-950 dark:text-white">{item.title}</h2>
                    <p className="mt-1 text-sm text-gray-500">${item.price}</p>

                    <div className="mt-4 inline-flex items-center gap-3 rounded-full bg-gray-100 p-1 dark:bg-gray-800">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-lg font-bold text-gray-900 shadow-sm transition hover:bg-gray-950 hover:text-white dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                      >
                        -
                      </button>
                      <span className="w-7 text-center text-sm font-black text-gray-950 dark:text-white">{item.qty}</span>
                      <button
                        onClick={() => addToCart(item)}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-lg font-bold text-gray-900 shadow-sm transition hover:bg-gray-950 hover:text-white dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-5 sm:flex-col sm:items-end">
                    <p className="text-xl font-black text-gray-950 dark:text-white">${item.price * item.qty}</p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="rounded-full px-4 py-2 text-sm font-bold text-red-500 transition hover:bg-red-50 dark:hover:bg-red-500/20"
                    >
                      Remove
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <aside className="h-fit rounded-[28px] bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.07)] dark:bg-gray-900 dark:shadow-none">
              <h3 className="text-xl font-black text-gray-950 dark:text-white">Buyurtma xulosasi</h3>
              <div className="mt-6 space-y-4 text-sm font-semibold text-gray-500 dark:text-gray-400">
                <div className="flex justify-between">
                  <span>Mahsulotlar ({totalQty} ta)</span>
                  <span>${total}</span>
                </div>
                <div className="flex justify-between">
                  <span>Yetkazib berish</span>
                  <span className="text-green-600">Bepul</span>
                </div>
              </div>
              <div className="mt-6 flex justify-between border-t border-gray-100 pt-5 text-xl font-black text-gray-950 dark:border-gray-800 dark:text-white">
                <span>Jami</span>
                <span>${total}</span>
              </div>
              <button
                onClick={() => setCheckoutOpen(true)}
                className="mt-6 min-h-12 w-full rounded-full bg-gray-950 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-blue-600 active:scale-[0.98] dark:bg-white dark:text-gray-950 dark:hover:bg-blue-500 dark:hover:text-white"
              >
                Buyurtma berish
              </button>
            </aside>
          </div>
        )}
      </section>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setCheckoutOpen(false)}
        totalAmount={total}
        totalItems={totalQty}
        user={user}
        onSuccess={() => { clearCart(); }}
      />
    </main>
  );
}