import { useCartStore } from "../store/cartStore";

export default function Cart() {
  const { cart, removeFromCart, addToCart, decreaseQty } = useCartStore();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Cart</h1>

      {cart.length === 0 ? (
        <p>Cart bo‘sh 😢</p>
      ) : (
        cart.map(item => (
          <div
            key={item.id}
            className="flex justify-between items-center border p-3 mb-3 rounded"
          >
            <div>
              <h2 className="font-semibold">{item.title}</h2>
              <p>${item.price}</p>

              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => decreaseQty(item.id)}
                  className="px-2 bg-gray-200 rounded"
                >
                  -
                </button>

                <span>{item.qty}</span>

                <button
                  onClick={() => addToCart(item)}
                  className="px-2 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 hover:underline"
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
}