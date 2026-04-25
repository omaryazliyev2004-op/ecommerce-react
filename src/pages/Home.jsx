import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-white text-black">

      {/* HERO SECTION */}
      <div className="flex flex-col items-center justify-center text-center py-20 px-4">
        <h1 className="text-5xl font-semibold mb-4">iPhone 15 Pro</h1>
        <p className="text-gray-500 text-lg mb-6">
          The best experience ever created.
        </p>

        <Link
          to="/iphone"
          className="bg-black text-white px-6 py-3 rounded-full hover:scale-105 transition"
        >
          Shop Now
        </Link>
      </div>

      {/* PRODUCTS SECTION */}
      <div className="max-w-6xl mx-auto px-4 pb-20">

        <h2 className="text-2xl font-semibold mb-8">
          Latest Products
        </h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {products.map((item) => (
              <div
                key={item.id}
                className="border rounded-xl p-4 hover:shadow-lg transition"
              >

                <img
                  src={item.image}
                  alt={item.title}
                  className="h-40 mx-auto object-contain"
                />

                <h3 className="mt-4 font-medium line-clamp-1">
                  {item.title}
                </h3>

                <p className="text-gray-500 mt-1">
                  ${item.price}
                </p>

                <Link
                  to={`/product/${item.id}`}
                  className="inline-block mt-3 bg-black text-white px-4 py-2 rounded-full text-sm"
                >
                  View
                </Link>

              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
}