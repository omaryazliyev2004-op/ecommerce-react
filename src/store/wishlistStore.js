import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useToastStore } from "./toastStore";

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      wishlist: [],

      toggleWishlist: (product) => {
        const existing = get().wishlist.find((item) => item.id === product.id);

        if (existing) {
          set({
            wishlist: get().wishlist.filter((item) => item.id !== product.id),
          });
          useToastStore.getState().addToast(`${product.title} removed from wishlist`, "error");
        } else {
          set({
            wishlist: [...get().wishlist, product],
          });
          useToastStore.getState().addToast(`${product.title} added to wishlist`);
        }
      },

      isInWishlist: (id) => {
        return get().wishlist.some((item) => item.id === id);
      },
    }),
    {
      name: "wishlist-storage",
    }
  )
);
