import { products } from "../Data/products";
import ProductCard from "../components/ProductCard";

export default function Iphone() {
  const iphoneProducts = products.filter(p => p.category === "iphone");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">iPhone</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {iphoneProducts.map(item => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
}