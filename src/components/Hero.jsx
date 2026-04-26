import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative bg-black text-white overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500 opacity-10 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-6 py-24 flex flex-col lg:flex-row items-center gap-12">

        {/* Left — Text */}
        <div className="flex-1 text-center lg:text-left">
          <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-widest uppercase">
            New — 2024
          </span>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-4">
            iPhone 15 <span className="text-blue-400">Pro</span>
          </h1>

          <p className="text-gray-400 text-lg md:text-xl mb-3">
            Titanium. So strong. So light. So Pro.
          </p>
          <p className="text-gray-500 text-base mb-8 max-w-md">
            A17 Pro chip, 48MP kamera va USB-C — Apple ning eng kuchli iPhone'i.
          </p>

          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <Link
              to="/iphone"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition"
            >
              Buy Now
            </Link>
            <Link
              to="/product/1"
              className="border border-gray-600 hover:border-white text-gray-300 hover:text-white px-8 py-3 rounded-full font-semibold transition"
            >
              Learn More
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-10 flex gap-8 justify-center lg:justify-start text-center">
            <div>
              <p className="text-2xl font-bold text-white">48MP</p>
              <p className="text-gray-500 text-sm">Kamera</p>
            </div>
            <div className="border-l border-gray-700 pl-8">
              <p className="text-2xl font-bold text-white">A17 Pro</p>
              <p className="text-gray-500 text-sm">Chip</p>
            </div>
            <div className="border-l border-gray-700 pl-8">
              <p className="text-2xl font-bold text-white">USB-C</p>
              <p className="text-gray-500 text-sm">Ulash</p>
            </div>
          </div>
        </div>

        {/* Right — Image */}
        <div className="flex-1 flex justify-center relative">
          <div className="absolute inset-0 bg-blue-500 opacity-10 rounded-full blur-3xl scale-75" />
          <img
            src="/images/iphone.png"
            alt="iPhone 15 Pro"
            className="relative w-64 md:w-80 lg:w-96 drop-shadow-2xl hover:scale-105 transition-transform duration-500"
          />
        </div>

      </div>

      {/* Bottom wave */}
      <div className="relative">
        <svg viewBox="0 0 1440 60" className="w-full fill-white">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" />
        </svg>
      </div>
    </section>
  );
}