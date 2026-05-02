import { create } from "zustand";
import { products as initialProducts } from "../Data/products";

const API_URL = "http://localhost:5000/api/products";

export const useProductStore = create((set, get) => ({
  products: initialProducts,
  isLoading: false,
  error: null,

  fetchProducts: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Mahsulotlarni yuklashda xatolik");
      const data = await response.json();
      // Baza ObjectId (_id) ishlatgani uchun ularni ismiga moslashtiramiz (aslida backendda id berdik)
      const mappedData = data.map(item => ({
        ...item,
        id: item.id || item._id
      }));
      set({ products: mappedData, isLoading: false });
    } catch (error) {
      console.warn("Backend ishlamayotgan bo'lishi mumkin. Mahalliy ma'lumotlar ishlatilmoqda.");
      set({ error: error.message, isLoading: false, products: initialProducts });
    }
  },

  addProduct: async (product) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      
      if (!response.ok) throw new Error("Qo'shishda xatolik");
      const newProduct = await response.json();
      
      set({
        products: [{ ...newProduct, id: newProduct.id || newProduct._id }, ...get().products],
      });
    } catch (error) {
      console.error(error);
    }
  },

  deleteProduct: async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error("O'chirishda xatolik");
      
      set({
        products: get().products.filter((p) => p.id !== id && p._id !== id),
      });
    } catch (error) {
      console.error(error);
    }
  },
}));
