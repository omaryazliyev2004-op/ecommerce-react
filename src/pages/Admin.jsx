import { useState } from "react";
import { useProductStore } from "../store/productStore";

export default function Admin() {
  const products = useProductStore((state) => state.products);
  const addProduct = useProductStore((state) => state.addProduct);
  const deleteProduct = useProductStore((state) => state.deleteProduct);

  const [form, setForm] = useState({
    title: "",
    price: "",
    images: [""],
    category: "iphone",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (idx, value) => {
    const newImages = [...form.images];
    newImages[idx] = value;
    setForm({ ...form, images: newImages });
  };

  const addImageField = () => {
    if (form.images.length < 3) {
      setForm({ ...form, images: [...form.images, ""] });
    }
  };

  const removeImageField = (idx) => {
    setForm({ ...form, images: form.images.filter((_, i) => i !== idx) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredImages = form.images.filter(Boolean);
    if (!form.title || !form.price || filteredImages.length === 0) return;

    addProduct({
      ...form,
      price: Number(form.price),
      images: filteredImages,
      image: filteredImages[0],
    });

    setForm({
      title: "",
      price: "",
      images: [""],
      category: "iphone",
      description: "",
    });
  };

  return (
    <main className="min-h-screen bg-[#f5f5f7] px-5 py-12 sm:px-8 lg:px-10 dark:bg-[#030712]">
      <section className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">Admin Dashboard</p>
          <h1 className="mt-4 text-4xl font-black tracking-normal text-gray-950 sm:text-5xl dark:text-white">Manage Products</h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400">Add new items or remove existing ones from the store.</p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">

          {/* Form */}
          <div className="h-fit rounded-[32px] bg-white/60 p-8 shadow-[0_20px_70px_rgba(15,23,42,0.06)] backdrop-blur-xl border border-white/50 dark:border-gray-800 dark:bg-gray-900/60">
            <h2 className="mb-6 text-2xl font-bold text-gray-950 dark:text-white">Add New Product</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              {/* Title */}
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-700 dark:text-gray-300">Product Title</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. iPhone 15 Pro"
                  className="w-full rounded-2xl border border-gray-200 bg-white/80 px-4 py-3 text-sm text-gray-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-800/80 dark:text-white"
                  required
                />
              </div>

              {/* Price */}
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-700 dark:text-gray-300">Price ($)</label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="e.g. 999"
                  className="w-full rounded-2xl border border-gray-200 bg-white/80 px-4 py-3 text-sm text-gray-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-800/80 dark:text-white"
                  required
                />
              </div>

              {/* Images */}
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-700 dark:text-gray-300">
                  Product Images (Max 3)
                </label>

                {form.images.map((img, idx) => (
                  <div key={idx} className="mb-3 flex gap-2">
                    <input
                      type="url"
                      value={img}
                      onChange={(e) => handleImageChange(idx, e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      className="w-full rounded-2xl border border-gray-200 bg-white/80 px-4 py-3 text-sm text-gray-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-800/80 dark:text-white"
                    />
                    {form.images.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeImageField(idx)}
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition dark:bg-red-500/10"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}

                {/* Preview */}
                {form.images.filter(Boolean).length > 0 && (
                  <div className="flex gap-2 mt-2">
                    {form.images.filter(Boolean).map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt="Preview"
                        className="h-16 w-16 rounded-xl object-contain border border-gray-200 bg-gray-50 p-1 dark:border-gray-700 dark:bg-gray-800"
                        onError={(e) => (e.target.style.display = "none")}
                      />
                    ))}
                  </div>
                )}

                {/* Add image button */}
                {form.images.length < 3 && (
                  <button
                    type="button"
                    onClick={addImageField}
                    className="mt-3 flex items-center gap-2 rounded-full border border-dashed border-gray-300 px-4 py-2 text-sm font-bold text-gray-500 hover:border-blue-500 hover:text-blue-500 transition dark:border-gray-600 dark:text-gray-400 dark:hover:border-blue-400 dark:hover:text-blue-400"
                  >
                    + Add Image
                  </button>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-700 dark:text-gray-300">Category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-gray-200 bg-white/80 px-4 py-3 text-sm text-gray-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-800/80 dark:text-white"
                >
                  <option value="iphone">iPhone</option>
                  <option value="mac">Mac</option>
                  <option value="watch">Watch</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-700 dark:text-gray-300">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Short product description..."
                  rows="3"
                  className="w-full rounded-2xl border border-gray-200 bg-white/80 px-4 py-3 text-sm text-gray-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-800/80 dark:text-white"
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
          <div className="rounded-[32px] bg-white p-8 shadow-[0_20px_70px_rgba(15,23,42,0.04)] dark:bg-gray-900">
            <h2 className="mb-6 text-2xl font-bold text-gray-950 dark:text-white">
              Current Products ({products.length})
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {products.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 rounded-2xl border border-gray-100 p-4 transition hover:bg-[#f5f5f7] dark:border-gray-800 dark:hover:bg-gray-800"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-16 w-16 rounded-xl object-contain bg-gray-50 p-2 dark:bg-gray-800"
                  />
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-gray-950 line-clamp-1 dark:text-white">{item.title}</h3>
                    <p className="text-xs text-gray-500 uppercase dark:text-gray-400">{item.category}</p>
                    <p className="text-sm font-bold text-blue-600 dark:text-blue-400">${item.price}</p>
                  </div>
                  <button
                    onClick={() => deleteProduct(item.id)}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-500 transition hover:bg-red-500 hover:text-white dark:bg-red-500/10 dark:hover:bg-red-500 dark:hover:text-white"
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