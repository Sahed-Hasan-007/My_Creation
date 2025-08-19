<template>
  <div class="p-4 md:p-8 bg-gradient-to-b from-green-50 to-white min-h-screen">
    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center items-center min-h-[50vh]">
      <div class="flex flex-col items-center space-y-4">
        <div class="relative w-16 h-16">
          <div class="absolute inset-0 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
          <div class="absolute inset-2 border-4 border-green-300 border-b-transparent rounded-full animate-spin-reverse"></div>
        </div>
        <p class="text-lg text-gray-600 animate-pulse">Loading products...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="flex justify-center items-center min-h-[50vh]">
      <div class="text-center p-6 bg-white rounded-xl shadow-lg max-w-md border border-red-100 transform hover:scale-[1.02] transition-transform">
        <div class="text-red-500 text-5xl mb-3 animate-bounce">⚠️</div>
        <p class="text-red-600 font-medium">{{ error }}</p>
        <button
            @click="retryFetch"
            class="mt-4 px-5 py-2.5 bg-gradient-to-r from-green-400 to-green-500 text-white rounded-lg hover:from-green-500 hover:to-green-600 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Try Again
        </button>
      </div>
    </div>

    <!-- Product Grid -->
    <div v-else class="">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        <div
            v-for="(item, index) in products"
            :key="item.id"
            class="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            :style="`transition-delay: ${index * 50}ms`"
        >
          <!-- Product Image with Floating Badge -->
          <div class="relative overflow-hidden h-60 bg-gray-50">
            <NuxtLink :to="`/eCommerce/products/${item.id}`" class="block h-full">
              <img
                  :src="item.image"
                  :alt="item.title"
                  class="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </NuxtLink>

            <!-- Discount Badge -->
            <div class="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md transform -rotate-12 group-hover:rotate-0 transition-transform">
              25% OFF
            </div>
          </div>

          <!-- Product Info -->
          <div class="p-5">
            <div class="flex justify-between items-start mb-3">
              <NuxtLink :to="`/eCommerce/products/${item.id}`" class="block">
                <h3 class="font-bold text-gray-800 hover:text-green-600 transition-colors line-clamp-2">
                  {{ item.title }}
                </h3>
              </NuxtLink>
              <div class="flex flex-col items-end">
                <span class="text-lg font-bold text-green-600">
                  {{ item.price }}$
                </span>
                <span class="text-xs text-gray-400 line-through">${{ (item.price * 1.33).toFixed(2) }}</span>
              </div>
            </div>

            <!-- Rating & Wishlist -->
            <div class="flex items-center justify-between mb-4">
              <div class="flex">
                <span v-for="i in 5" :key="i" class="text-yellow-400 text-sm">★</span>
              </div>
              <button class="text-gray-300 hover:text-red-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

            <!-- Add to Cart Button -->
            <button
                @click="handleAddToCart(item)"
                class="w-full py-3 px-4 bg-gradient-to-r from-gray-800 to-gray-700 text-white font-medium rounded-xl hover:bg-gray-400 transition-all duration-300 flex items-center justify-center group overflow-hidden relative"
            >
              <span class="relative z-10 flex items-center">
                <span class="group-hover:translate-x-1 transition-transform">Add to Cart</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </span>
              <span class="absolute inset-0 bg-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-0"></span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Floating Notification -->
    <transition
        enter-active-class="animate__animated animate__fadeInUp animate__faster"
        leave-active-class="animate__animated animate__fadeOutDown animate__faster"
    >
      <div
          v-if="popupVisible"
          class="fixed bottom-8 right-8 bg-gray-900 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center space-x-3 backdrop-blur-sm bg-opacity-90"
      >
        <div class="relative">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          <div class="absolute -inset-1.5 bg-green-400 rounded-full opacity-0 animate-ping-slow"></div>
        </div>
        <span class="font-medium">Added to cart!</span>
        <div class="absolute bottom-0 left-0 h-0.5 bg-green-400 animate-progress w-full"></div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useCartStore } from "../stores/cart";
import { useProducts } from "../composables/useProducts";

const cartStore = useCartStore();
const { products, isLoading, error, fetchProducts } = useProducts();
const popupVisible = ref(false);

function handleAddToCart(item) {
  cartStore.addToCart(item);
  showPopup();
}

function showPopup() {
  popupVisible.value = true;
  setTimeout(() => {
    popupVisible.value = false;
  }, 2000);
}

function retryFetch() {
  fetchProducts();
}
</script>

<style>
@keyframes spin-reverse {
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
}
.animate-spin-reverse {
  animation: spin-reverse 1.5s linear infinite;
}

@keyframes ping-slow {
  0% { transform: scale(0.8); opacity: 0.8; }
  70%, 100% { transform: scale(1.5); opacity: 0; }
}
.animate-ping-slow {
  animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes progress {
  0% { width: 100%; }
  100% { width: 0%; }
}
.animate-progress {
  animation: progress 2s linear forwards;
}

/* For line clamping */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>