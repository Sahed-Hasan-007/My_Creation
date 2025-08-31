<template>
  <div class="min-h-screen bg-gradient-to-b from-green-50 to-white p-4 md:p-8">
    <div class="">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-red-500 mr-3" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          Your Favorites
        </h1>
        <NuxtLink
            to="/ecommerce/products"
            class="text-green-600 hover:text-green-700 flex items-center transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
          Continue Shopping
        </NuxtLink>
      </div>

      <!-- Empty State -->
      <transition
          enter-active-class="transition-opacity duration-300"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition-opacity duration-300"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
      >
        <div
            v-if="favoriteItems.length === 0"
            class="text-center py-16 bg-white rounded-xl shadow-sm max-w-2xl mx-auto"
        >
          <div class="mx-auto w-40 h-40 mb-6 relative text-red-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-full w-full" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <div class="absolute -inset-8 bg-red-100 rounded-full animate-ping opacity-20"></div>
          </div>
          <h3 class="text-xl font-medium text-gray-700 mb-2">Your favorites are empty</h3>
          <p class="text-gray-500 mb-6">You haven't added any products to your favorites yet</p>
          <NuxtLink
              to="/products"
              class="inline-block px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
          >
            Browse Products
          </NuxtLink>
        </div>
      </transition>

      <!-- Favorites Grid -->
      <transition-group
          name="favorites-grid"
          tag="div"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <div
            v-for="(item, index) in favoriteItems"
            :key="item.id"
            class="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
            :style="`transition-delay: ${index * 50}ms`"
        >
          <!-- Product Image -->
          <div class="relative h-48 bg-gray-50">
            <NuxtLink :to="`/products/${item.id}`" class="block h-full">
              <img
                  :src="item.image"
                  :alt="item.title"
                  class="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
              />
            </NuxtLink>
            <!-- Remove Button -->
            <button
                @click.stop="removeFromFavorite(item.id)"
                class="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors duration-300"
                aria-label="Remove from favorites"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Product Info -->
          <div class="p-4">
            <NuxtLink :to="`/products/${item.id}`" class="block">
              <h3 class="font-semibold text-gray-800 line-clamp-2 mb-2 hover:text-green-600 transition-colors">
                {{ item.title }}
              </h3>
            </NuxtLink>
            <div class="flex justify-between items-center">
              <span class="text-lg font-bold text-green-600">${{ item.price }}</span>

              <!-- Add to Cart Button -->
              <button
                  @click.stop="addToCart(item)"
                  class="text-sm px-3 py-1.5 bg-gray-100 hover:bg-green-100 text-gray-700 hover:text-green-700 rounded-lg transition-colors duration-300 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </transition-group>

      <!-- Recently Viewed (Placeholder) -->
      <div v-if="favoriteItems.length > 0" class="mt-16">
        <h3 class="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          Recently Viewed
        </h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <!-- Placeholder for recently viewed items -->
          <div v-for="i in 4" :key="i" class="bg-gray-100 rounded-lg h-40 animate-pulse"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useFavoriteStore } from "../stores/favorite";
import { useCartStore } from "../stores/cart";

const favoriteStore = useFavoriteStore();
const cartStore = useCartStore();
const favoriteItems = favoriteStore.favoriteItems;

// Remove from Favorites
function removeFromFavorite(id) {
  favoriteStore.removeFromFavorite(id);
}

// Add to Cart
function addToCart(item) {
  cartStore.addToCart({...item, quantity: 1});
  // Optional: Show a toast notification
}
</script>

<style>
/* Favorites grid transitions */
.favorites-grid-enter-active,
.favorites-grid-leave-active {
  transition: all 0.5s ease;
}
.favorites-grid-enter-from,
.favorites-grid-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.favorites-grid-leave-active {
  position: absolute;
  width: calc(25% - 1.5rem);
}

/* Line clamp for product titles */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Pulse animation for loading */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>