import { Link } from "react-router-dom";
import { useEffect } from "react";          // ← qo'shildi
import { useProductStore } from "../store/productStore";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";

const categories = [
  {
    title: "iPhone",
    text: "Flagship camera, premium display and everyday power.",
    image: "/images/iphone15.png",
    to: "/iphone",
  },
  {
    title: "Mac",
    text: "Thin, fast and ready for study, work and creative projects.",
    image: "/images/airm3.png",
    to: "/mac",
  },
  {
    title: "Watch",
    text: "Health, fitness and notifications right on your wrist.",
    image: "/images/ultra2.png",
    to: "/watch",
  },
];

export default function Home() {
  const products = useProductStore((state) => state.products);
  const fetchProducts = useProductStore((state) => state.fetchProducts);  
  const isLoading = useProductStore((state) => state.isLoading);          
  const featuredProducts = products.slice(0, 8);

  useEffect(() => {
    fetchProducts();   
  }, []);

  return (
    <main className="bg-white dark:bg-[#030712]">
      <Hero />

      <section className="mx-auto -mt-10 grid max-w-7xl grid-cols-1 gap-4 px-5 sm:px-8 md:grid-cols-3 lg:px-10">
        {categories.map((category) => (
          <Link
            key={category.title}
            to={category.to}
            className="group overflow-hidden rounded-[28px] border border-black/5 bg-[#f5f5f7] p-6 shadow-[0_20px_70px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_80px_rgba(15,23,42,0.14)] dark:border-white/5 dark:bg-gray-900 dark:shadow-none dark:hover:border-white/10"
          >
            <div className="flex min-h-[210px] items-end justify-between gap-5">
              <div className="max-w-[190px] self-start">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">Explore</p>
                <h2 className="mt-3 text-3xl font-black tracking-normal text-gray-950 dark:text-white">{category.title}</h2>
                <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-gray-400">{category.text}</p>
              </div>
              <img
                src={category.image}
                alt={category.title}
                className="h-40 w-32 object-contain drop-shadow-2xl transition duration-500 group-hover:scale-110"
              />
            </div>
          </Link>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">Curated selection</p>
            <h2 className="mt-3 text-4xl font-black tracking-normal text-gray-950 md:text-5xl dark:text-white">
              Apple Products
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-gray-500 dark:text-gray-400">
              Eng kerakli iPhone, Mac va Watch modellarini toza, tez va xaridga
              qulay katalogda jamladik.
            </p>
          </div>
          <Link
            to="/iphone"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-gray-950 px-6 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-blue-600 dark:bg-white dark:text-gray-950 dark:hover:bg-blue-500 dark:hover:text-white"
          >
            Browse catalog
          </Link>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:px-10">
        <div className="grid overflow-hidden rounded-[32px] bg-gray-950 text-white md:grid-cols-[0.9fr_1.1fr]">
          <div className="p-8 sm:p-10 lg:p-12">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-300">Store promise</p>
            <h2 className="mt-4 text-3xl font-black tracking-normal sm:text-4xl">
              Premium mahsulot. Premium servis.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-white/62">
              Original qurilmalar, tez yetkazib berish, qulay to'lov va xariddan
              keyingi yordam bir joyda.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-px bg-white/10 text-sm font-semibold text-white/75 sm:grid-cols-4">
            {["Original products", "Fast delivery", "Easy payment", "Support"].map((item) => (
              <div key={item} className="flex min-h-32 items-center justify-center bg-white/5 p-5 text-center">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}