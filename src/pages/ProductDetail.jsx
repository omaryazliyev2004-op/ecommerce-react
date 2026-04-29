import { Link, useParams } from "react-router-dom";
import { products } from "../Data/products";
import { useCartStore } from "../store/cartStore";

export default function ProductDetail() {
  const { id } = useParams();
  const addToCart = useCartStore((state) => state.addToCart);
  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-5 text-center">
        <div>
          <h1 className="text-3xl font-black text-gray-950">Product topilmadi</h1>
          <Link to="/" className="mt-5 inline-flex rounded-full bg-gray-950 px-6 py-3 text-sm font-bold text-white">
            Back home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-white px-5 py-12 sm:px-8 lg:px-10">
      <section className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="flex min-h-[520px] items-center justify-center rounded-[36px] bg-gradient-to-br from-[#f7f8fb] to-[#eef1f6] p-8">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-[460px] w-full object-contain drop-shadow-[0_34px_55px_rgba(15,23,42,0.20)]"
          />
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600">{product.category}</p>
          <h1 className="mt-4 text-4xl font-black leading-tight tracking-normal text-gray-950 sm:text-6xl">
            {product.title}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-gray-500">
            {product.description}. Premium design, strong performance and clean Apple ecosystem experience.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-3">
            {["Original", "Warranty", "Fast delivery"].map((item) => (
              <div key={item} className="rounded-2xl bg-[#f5f5f7] px-4 py-5 text-center text-sm font-bold text-gray-700">
                {item}
              </div>
            ))}
          </div>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <p className="text-4xl font-black text-gray-950">${product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-gray-950 px-8 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-blue-600"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
