import { useCartStore } from "../store/cartStore";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, addToCart, decreaseQty } = useCartStore();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-1.684 2.032-3.406 2.032-3.406a3 3 0 00-2.81-4.094H6.106l-.384-1.437A1.125 1.125 0 004.635 6H2.25" />
            </svg>
            <p className="text-gray-400 text-lg mb-6">Savat bo'sh</p>
            <Link to="/" className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition">
              Xarid qilish
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">

            {cart.map(item => (
              <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex items-center gap-4">

                {/* Image */}
                <div className="bg-gray-50 rounded-xl p-3 w-24 h-24 flex items-center justify-center shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h2 className="font-semibold text-gray-900 text-[15px] line-clamp-1">{item.title}</h2>
                  <p className="text-gray-500 text-sm mt-0.5">${item.price}</p>

                  {/* Qty controls */}
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full text-lg font-medium transition"
                    >
                      −
                    </button>
                    <span className="font-semibold text-gray-900 w-4 text-center">{item.qty}</span>
                    <button
                      onClick={() => addToCart(item)}
                      className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full text-lg font-medium transition"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Total + Remove */}
                <div className="flex flex-col items-end gap-3 shrink-0">
                  <p className="font-bold text-gray-900">${item.price * item.qty}</p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-400 hover:text-red-600 transition"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

              </div>
            ))}

            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-2">
              <h3 className="font-semibold text-gray-900 text-lg mb-4">Buyurtma xulosasi</h3>
              <div className="flex justify-between text-gray-500 mb-2">
                <span>Mahsulotlar ({cart.reduce((s, i) => s + i.qty, 0)} ta)</span>
                <span>${total}</span>
              </div>
              <div className="flex justify-between text-gray-500 mb-4">
                <span>Yetkazib berish</span>
                <span className="text-green-500">Bepul</span>
              </div>
              <div className="border-t border-gray-100 pt-4 flex justify-between font-bold text-gray-900 text-lg">
                <span>Jami</span>
                <span>${total}</span>
              </div>
              <button className="mt-6 w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 active:scale-95 transition-all">
                Buyurtma berish
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}