import { useParams } from "react-router-dom";
import { products } from "../data/products";
import { useCartStore } from "../store/cartStore";

export default function ProductDetail() {
  const { id } = useParams();
  const addToCart = useCartStore((state) => state.addToCart);

  const product = products.find(item => item.id === Number(id));

  if (!product) return <p>Product topilmadi</p>;

  return (
    <div className="p-10 flex flex-col md:flex-row gap-10">
      
      <img
        src={product.image}
        alt={product.title}
        className="w-full md:w-1/2 object-contain"
      />

      <div>
        <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

        <p className="text-gray-500 mb-4">
          Premium Apple product with top performance and design.
        </p>

        <p className="text-2xl font-semibold mb-6">
          ${product.price}
        </p>

        <button
          onClick={() => addToCart(product)}
          className="bg-black text-white px-6 py-3 rounded-lg"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}