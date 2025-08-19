import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cartItems: JSON.parse(localStorage.getItem("cartItems")) || [], // Load from local storage
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
      this.saveToLocalStorage(); // Save to local storage
    },
    
    // Remove an item from the cart
    removeFromCart(id) {
      this.cartItems = this.cartItems.filter((item) => item.id !== id);
      this.saveToLocalStorage(); // Save to local storage
    },
    
    // Clear all items from the cart
    clearCart() {
      this.cartItems = [];
      this.saveToLocalStorage(); // Save to local storage
    },

    // Save cart state to local storage
    saveToLocalStorage() {
      localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
    },

    // Load cart state from local storage
    loadFromLocalStorage() {
      const storedCart = localStorage.getItem("cartItems");
      if (storedCart) {
        this.cartItems = JSON.parse(storedCart);
      }
    },
  },
});
