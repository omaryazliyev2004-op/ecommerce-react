import { useState, useRef } from "react";
import { useProductStore } from "../store/productStore";

export default function Admin() {
  const products = useProductStore((state) => state.products);
  const addProduct = useProductStore((state) => state.addProduct);
  const deleteProduct = useProductStore((state) => state.deleteProduct);

  const [form, setForm] = useState({
    title: "",
    price: "",
    image: "",
    category: "iphone",
    description: "",
  });
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.price || !form.image) return;

    addProduct({
      ...form,
      price: Number(form.price),
    });

    setForm({
      title: "",
      price: "",
      image: "",
      category: "iphone",
      description: "",
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f5f7] px-5 py-12 sm:px-8 lg:px-10">
      <section className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600">Admin Dashboard</p>
          <h1 className="mt-4 text-4xl font-black tracking-normal text-gray-950 sm:text-5xl">Manage Products</h1>
          <p className="mt-4 text-gray-500">Add new items or remove existing ones from the store.</p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
          {/* Add Product Form - Glassmorphism style */}
          <div className="h-fit rounded-[32px] bg-white/60 p-8 shadow-[0_20px_70px_rgba(15,23,42,0.06)] backdrop-blur-xl border border-white/50">
            <h2 className="mb-6 text-2xl font-bold text-gray-950">Add New Product</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-700">Product Title</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. iPhone 15 Pro"
                  className="w-full rounded-2xl border border-gray-200 bg-white/80 px-4 py-3 text-sm text-gray-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-gray-700">Price ($)</label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="e.g. 999"
                  className="w-full rounded-2xl border border-gray-200 bg-white/80 px-4 py-3 text-sm text-gray-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-gray-700">Product Image</label>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    ref={fileInputRef}
                    className="w-full rounded-2xl border border-gray-200 bg-white/80 px-4 py-3 text-sm text-gray-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
                    required
                  />
                  {form.image && (
                    <img src={form.image} alt="Preview" className="h-12 w-12 rounded-xl object-cover shadow-sm" />
                  )}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-gray-700">Category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-gray-200 bg-white/80 px-4 py-3 text-sm text-gray-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                >
                  <option value="iphone">iPhone</option>
                  <option value="mac">Mac</option>
                  <option value="watch">Watch</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Short product description..."
                  rows="3"
                  className="w-full rounded-2xl border border-gray-200 bg-white/80 px-4 py-3 text-sm text-gray-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                ></textarea>
              </div>

              <button
                type="submit"
                className="mt-2 w-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 py-4 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition hover:-translate-y-1 hover:shadow-blue-500/40"
              >
                Add Product
              </button>
            </form>
          </div>

          {/* Product List */}
          <div className="rounded-[32px] bg-white p-8 shadow-[0_20px_70px_rgba(15,23,42,0.04)]">
            <h2 className="mb-6 text-2xl font-bold text-gray-950">Current Products ({products.length})</h2>
            
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {products.map((item) => (
                <div key={item.id} className="flex items-center gap-4 rounded-2xl border border-gray-100 p-4 transition hover:bg-[#f5f5f7]">
                  <img src={item.image} alt={item.title} className="h-16 w-16 rounded-xl object-contain bg-gray-50 p-2" />
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-gray-950 line-clamp-1">{item.title}</h3>
                    <p className="text-xs text-gray-500 uppercase">{item.category}</p>
                    <p className="text-sm font-bold text-blue-600">${item.price}</p>
                  </div>
                  <button
                    onClick={() => deleteProduct(item.id)}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-500 transition hover:bg-red-500 hover:text-white"
                    title="Delete product"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 6h18"></path>
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
