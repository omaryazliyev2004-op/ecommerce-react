import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useToastStore } from "./toastStore";

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product) => {
        const existing = get().cart.find(item => item.id === product.id);

        if (existing) {
          set({
            cart: get().cart.map(item =>
              item.id === product.id
                ? { ...item, qty: item.qty + 1 }
                : item
            )
          });
        } else {
          set({
            cart: [...get().cart, { ...product, qty: 1 }]
          });
        }
        useToastStore.getState().addToast(`${product.title} added to cart`);
      },
      decreaseQty: (id) => {
        const updated = get().cart
          .map(item =>
            item.id === id
              ? { ...item, qty: item.qty - 1 }
              : item
          )
          .filter(item => item.qty > 0);

        set({ cart: updated });
      },
      removeFromCart: (id) => {
        set({
          cart: get().cart.filter(item => item.id !== id)
        });
        useToastStore.getState().addToast("Item removed from cart", "error");
      },

      clearCart: () => set({ cart: [] })
    }),
    {
      name: "cart-storage", 
    }
  )
);