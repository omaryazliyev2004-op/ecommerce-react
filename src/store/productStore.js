import { create } from "zustand";
import { products as initialProducts } from "../Data/products";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../Data/firebase";

export const useProductStore = create((set, get) => ({
  products: [],
  isLoading: false,
  error: null,

  fetchProducts: async () => {
    set({ isLoading: true });
    try {
      const snapshot = await getDocs(collection(db, "products"));
      const data = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      if (data.length === 0) {
        await get().seedProducts();
      } else {
        set({ products: data, isLoading: false });
      }
    } catch (error) {
      console.error(error);
      set({ error: error.message, isLoading: false, products: initialProducts });
    }
  },

  seedProducts: async () => {
    try {
      const promises = initialProducts.map((product) =>
        addDoc(collection(db, "products"), product)
      );
      await Promise.all(promises);
      await get().fetchProducts();
    } catch (error) {
      console.error("Seed xatosi:", error);
      set({ products: initialProducts, isLoading: false });
    }
  },

  addProduct: async (product) => {
    try {
      const docRef = await addDoc(collection(db, "products"), product);
      set({
        products: [{ id: docRef.id, ...product }, ...get().products],
      });
    } catch (error) {
      console.error("Qo'shishda xatolik:", error);
    }
  },

  deleteProduct: async (id) => {
    try {
      await deleteDoc(doc(db, "products", id));
      set({
        products: get().products.filter((p) => p.id !== id),
      });
    } catch (error) {
      console.error("O'chirishda xatolik:", error);
    }
  },
}));