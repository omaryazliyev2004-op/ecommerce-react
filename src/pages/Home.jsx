import { products } from "../Data/products";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";

export default function Home() {
  return (
    <div className="p-6">
      <Hero />
      
      <h1 className="text-2xl font-bold mb-6">Apple Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map(item => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
}