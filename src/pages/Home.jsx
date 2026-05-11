import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useProductStore } from "../store/productStore";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";

const categories = [
  {
    title: "iPhone",
    text: "Flagship camera, premium display and everyday power.",
    image: "/images/iphone15.png",
    to: "/iphone",
    accent: "from-blue-500/10 to-indigo-500/10",
  },
  {
    title: "Mac",
    text: "Thin, fast and ready for study, work and creative projects.",
    image: "/images/airm3.png",
    to: "/mac",
    accent: "from-violet-500/10 to-purple-500/10",
  },
  {
    title: "Watch",
    text: "Health, fitness and notifications right on your wrist.",
    image: "/images/ultra2.png",
    to: "/watch",
    accent: "from-rose-500/10 to-pink-500/10",
  },
];

const features = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Original products",
    text: "100% original Apple mahsulotlari",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Fast delivery",
    text: "Toshkent bo'ylab 1-2 kun",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    title: "Easy payment",
    text: "Naqd yoki karta bilan to'lov",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    title: "Support",
    text: "Xariddan keyin yordam",
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

      {/* Categories */}
      <section className="mx-auto -mt-10 grid max-w-7xl grid-cols-1 gap-4 px-5 sm:px-8 md:grid-cols-3 lg:px-10">
        {categories.map((category) => (
          <Link
            key={category.title}
            to={category.to}
            className={`group relative overflow-hidden rounded-[28px] border border-black/5 bg-gradient-to-br ${category.accent} p-6 shadow-[0_20px_70px_rgba(15,23,42,0.08)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_80px_rgba(15,23,42,0.14)] dark:border-white/5 dark:shadow-none dark:hover:border-white/10`}
          >
            {/* Background glow */}
            <div className="absolute inset-0 bg-[#f5f5f7] dark:bg-gray-900 -z-10" />

            <div className="flex min-h-[220px] items-end justify-between gap-5">
              <div className="max-w-[190px] self-start">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">Explore</p>
                <h2 className="mt-3 text-3xl font-black tracking-normal text-gray-950 dark:text-white">{category.title}</h2>
                <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-gray-400">{category.text}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400">
                  Shop now
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 transition group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
              <img
                src={category.image}
                alt={category.title}
                className="h-44 w-36 object-contain drop-shadow-2xl transition duration-500 group-hover:scale-110 group-hover:-rotate-2"
              />
            </div>
          </Link>
        ))}
      </section>

      {/* Featured Products */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">
              Curated selection
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-normal text-gray-950 md:text-5xl dark:text-white">
              Apple Products
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-gray-500 dark:text-gray-400">
              Eng kerakli iPhone, Mac va Watch modellarini toza, tez va xaridga qulay katalogda jamladik.
            </p>
          </div>
          <Link
            to="/iphone"
            className="inline-flex min-h-11 items-center gap-2 justify-center rounded-full bg-gray-950 px-6 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-blue-600 dark:bg-white dark:text-gray-950 dark:hover:bg-blue-500 dark:hover:text-white"
          >
            Browse catalog
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse rounded-[24px] bg-gray-100 dark:bg-gray-800 h-80" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        )}
      </section>

      {/* Store Promise */}
      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 lg:px-10">
        <div className="overflow-hidden rounded-[32px] bg-gray-950 dark:bg-gray-900 dark:border dark:border-gray-800">

          {/* Top */}
          <div className="grid md:grid-cols-[1fr_1fr] gap-0">
            <div className="p-10 lg:p-14">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-400">
                Store promise
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-normal text-white sm:text-4xl">
                Premium mahsulot.<br />Premium servis.
              </h2>
              <p className="mt-4 max-w-sm text-base leading-7 text-white/60">
                Original qurilmalar, tez yetkazib berish, qulay to'lov va xariddan keyingi yordam bir joyda.
              </p>
              <Link
                to="/iphone"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-gray-950 transition hover:bg-blue-500 hover:text-white"
              >
                Xarid qilish
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-2 border-l border-white/10">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="flex flex-col gap-3 border-b border-r border-white/10 p-8 last:border-r-0 odd:border-r even:border-r-0 [&:nth-child(3)]:border-b-0 [&:nth-child(4)]:border-b-0"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-white">
                    {feature.icon}
                  </div>
                  <p className="text-sm font-black text-white">{feature.title}</p>
                  <p className="text-xs leading-5 text-white/50">{feature.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}