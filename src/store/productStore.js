import { create } from "zustand";
import { persist } from "zustand/middleware";
import { products as initialProducts } from "../Data/products";

export const useProductStore = create(
  persist(
    (set, get) => ({
      products: initialProducts,

      addProduct: (product) => {
        set({
          products: [{ ...product, id: Date.now() }, ...get().products],
        });
      },

      deleteProduct: (id) => {
        set({
          products: get().products.filter((p) => p.id !== id),
        });
      },
    }),
    {
      name: "product-storage",
    }
  )
);
