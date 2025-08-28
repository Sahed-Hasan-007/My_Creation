import { defineStore } from "pinia";

export const useFavoriteStore = defineStore("favorite", {
  state: () => ({
    favoriteItems: [], // Initialize empty
  }),
  actions: {
    // Add an item to favorites
    addToFavorite(item) {
      const existingItem = this.favoriteItems.find((fav) => fav.id === item.id);
      if (!existingItem) {
        this.favoriteItems.push({ ...item, quantity: 1 });
        this.saveToLocalStorage();
      }
    },

    // Remove an item from favorites
    removeFromFavorite(id) {
      this.favoriteItems = this.favoriteItems.filter((fav) => fav.id !== id);
      this.saveToLocalStorage();
    },

    // Clear all favorite items
    clearFavorites() {
      this.favoriteItems = [];
      this.saveToLocalStorage();
    },

    // Save favorite items to local storage
    saveToLocalStorage() {
      if (process.client) {
        localStorage.setItem("favoriteItems", JSON.stringify(this.favoriteItems));
      }
    },

    // Load favorite items from local storage
    loadFromLocalStorage() {
      if (process.client) {
        const storedFavorites = localStorage.getItem("favoriteItems");
        if (storedFavorites) {
          this.favoriteItems = JSON.parse(storedFavorites);
        }
      }
    },
  },
});
