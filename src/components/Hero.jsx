export default function Hero() {
    return (
        <section className="bg-black text-white py-20 px-6">
            <div className="max-w-6xl mx-auto flex flex-col items-center text-center">

                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    iPhone 15 Pro
                </h1>

                <p className="text-gray-400 text-lg md:text-xl mb-8 max-w-2xl">
                    Titanium. So strong. So light. So Pro. Discover the latest Apple products
                    with premium design and performance.
                </p>

                <div className="flex gap-4">
                    <button className="bg-white text-black px-6 py-3 rounded-full font-medium hover:opacity-80">
                        Buy Now
                    </button>

                    <button className="border border-white px-6 py-3 rounded-full font-medium hover:bg-white hover:text-black transition">
                        Learn More
                    </button>
                </div>

                <img
                    src="/iphone.png"
                    alt="iPhone"
                    className="mt-10 w-full max-w-md"
                />
            </div>
        </section>
    );
}