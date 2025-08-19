import { defineStore } from "pinia";

export const useFavoriteStore = defineStore("favorite", {
  state: () => ({
    favoriteItems: JSON.parse(localStorage.getItem("favoriteItems")) || [], // Load from local storage
  }),
  actions: {
    // Add an item to favorites
    addToFavorite(item) {
      const existingItem = this.favoriteItems.find((fav) => fav.id === item.id);
      if (!existingItem) {
        this.favoriteItems.push({ ...item, quantity: 1 });
        this.saveToLocalStorage(); // Save updated favorites to local storage
      }
    },

    // Remove an item from favorites
    removeFromFavorite(id) {
      this.favoriteItems = this.favoriteItems.filter((fav) => fav.id !== id);
      this.saveToLocalStorage(); // Save updated favorites to local storage
    },

    // Clear all favorite items
    clearFavorites() {
      this.favoriteItems = [];
      this.saveToLocalStorage(); // Save updated favorites to local storage
    },

    // Save favorite items to local storage
    saveToLocalStorage() {
      localStorage.setItem("favoriteItems", JSON.stringify(this.favoriteItems));
    },

    // Load favorite items from local storage
    loadFromLocalStorage() {
      const storedFavorites = localStorage.getItem("favoriteItems");
      if (storedFavorites) {
        this.favoriteItems = JSON.parse(storedFavorites);
      }
    },
  },
});
