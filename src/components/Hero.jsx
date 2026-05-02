import { Link } from "react-router-dom";

const highlights = [
  { value: "48MP", label: "Pro camera" },
  { value: "A17 Pro", label: "Console-class chip" },
  { value: "USB-C", label: "Fast connection" },
];

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#050507] text-white pt-20 pb-24">

      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(83,160,255,0.28),transparent_34%),radial-gradient(circle_at_85%_20%,rgba(255,255,255,0.12),transparent_28%),linear-gradient(135deg,#050507_0%,#0b0d14_48%,#17151f_100%)]" />

      {/* Smooth transition to next section */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white via-white/70 to-transparent" />

      <div className="relative mx-auto grid min-h-[680px] max-w-7xl grid-cols-1 items-center gap-12 px-5 pb-20 pt-16 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:px-10">

        {/* LEFT SIDE */}
        <div className="max-w-2xl text-center lg:text-left">

          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/75 shadow-2xl backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-[#56d364]" />
            Premium Apple Store
          </div>

          <h1 className="text-5xl font-black leading-[0.94] sm:text-6xl lg:text-7xl">
            iPhone 15 Pro.
            <span className="block bg-gradient-to-r from-[#9bd6ff] via-white to-[#c8b6ff] bg-clip-text text-transparent">
              Powerful by design.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-white/70 sm:text-lg lg:mx-0">
            Titanium korpus, A17 Pro chip, 48MP camera va USB-C. Portfolio
            darajasidagi do'kon tajribasi: tez, toza va premium ko'rinishda.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">

            <Link
              to="/iphone"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-7 text-sm font-bold text-black shadow-lg transition hover:-translate-y-0.5 hover:bg-[#f5f5f7]"
            >
              Shop iPhone
            </Link>

            <Link
              to="/product/1"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 bg-white/10 px-7 text-sm font-bold text-white backdrop-blur transition hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/20"
            >
              View details
            </Link>
          </div>

          {/* Highlights */}
          <div className="mt-12 grid grid-cols-3 gap-3 rounded-[28px] border border-white/10 bg-white/10 p-3 backdrop-blur-xl">
            {highlights.map((item) => (
              <div key={item.value} className="px-2 py-3 text-center lg:text-left">
                <p className="text-lg font-black sm:text-2xl">{item.value}</p>
                <p className="mt-1 text-xs text-white/60 sm:text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative mx-auto flex w-full max-w-[560px] items-center justify-center lg:justify-end">

          {/* Glow circle */}
          <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-white/10 shadow-[inset_0_0_90px_rgba(255,255,255,0.08)] backdrop-blur-sm" />

          {/* Price */}
          <div className="absolute bottom-10 left-2 hidden rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-left shadow-xl backdrop-blur-xl sm:block">
            <p className="text-xs uppercase tracking-[0.22em] text-white/50">From</p>
            <p className="mt-1 text-2xl font-black">$999</p>
          </div>

          {/* Delivery */}
          <div className="absolute right-0 top-6 hidden rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-left shadow-xl backdrop-blur-xl sm:block">
            <p className="text-xs uppercase tracking-[0.22em] text-white/50">Delivery</p>
            <p className="mt-1 text-sm font-bold text-white">Same day in Tashkent</p>
          </div>

          {/* Image */}
          <img
            src="/images/iphone.png"
            alt="iPhone 15 Pro"
            className="relative z-10 w-[250px] rounded-3xl max-w-full drop-shadow-[0_44px_70px_rgba(22,102,255,0.38)] transition duration-700 hover:scale-[1.05] sm:w-[340px] lg:w-[410px]"
          />
        </div>
      </div>
    </section>
  );
}