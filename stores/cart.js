import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {

  state: () => ({

    cartItems: [], // Initialize empty

  }),
  actions: {

    // Add an item to the cart
    addToCart(item) {

      const existingItem = this.cartItems.find(

          (cartItem) => cartItem.id === item.id

      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        this.cartItems.push({ ...item, quantity: 1 });
      }
      this.saveToLocalStorage();
    },

    // Remove an item from the cart
    removeFromCart(id) {
      this.cartItems = this.cartItems.filter((item) => item.id !== id);
      this.saveToLocalStorage();
    },

    // Clear cart
    clearCart() {
      this.cartItems = [];
      this.saveToLocalStorage();
    },

    // Save cart to local storage
    saveToLocalStorage() {
      if (process.client) {
        localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
      }
    },

    // Load cart from local storage
    loadFromLocalStorage() {
      if (process.client) {
        const storedCart = localStorage.getItem("cartItems");
        if (storedCart) {
          this.cartItems = JSON.parse(storedCart);
        }
      }
    },
  },
});
