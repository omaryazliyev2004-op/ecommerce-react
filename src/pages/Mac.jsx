import { products } from "../Data/products";
import ProductCard from "../components/ProductCard";

export default function Mac() {
  const macProducts = products.filter((p) => p.category === "mac");

  return (
    <main className="bg-white px-5 py-12 sm:px-8 lg:px-10">
      <section className="mx-auto max-w-7xl">
        <div className="mb-10 rounded-[32px] bg-[#f5f5f7] px-6 py-12 text-gray-950 sm:px-10 lg:px-14">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600">Mac collection</p>
          <h1 className="mt-4 text-4xl font-black tracking-normal sm:text-6xl">Power for every workflow.</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-gray-500">
            Lightweight Air models, Pro performance and desktop power in one catalog.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {macProducts.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </main>
  );
}
