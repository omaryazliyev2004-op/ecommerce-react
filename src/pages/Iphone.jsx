import { useProductStore } from "../store/productStore";
import ProductCard from "../components/ProductCard";

export default function Iphone() {
  const products = useProductStore((state) => state.products);
  const iphoneProducts = products.filter((p) => p.category === "iphone");

  return (
    <main className="bg-white px-5 py-12 sm:px-8 lg:px-10">
      <section className="mx-auto max-w-7xl">
        <div className="mb-10 rounded-[32px] bg-gray-950 px-6 py-12 text-white sm:px-10 lg:px-14">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-300">iPhone lineup</p>
          <h1 className="mt-4 text-4xl font-black tracking-normal sm:text-6xl">Choose your iPhone.</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/62">
            Pro camera, powerful chip and clean design for everyday premium use.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {iphoneProducts.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </main>
  );
}
