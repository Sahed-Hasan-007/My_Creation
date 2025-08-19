<template>
  <header class="sticky top-0 z-50 font-sans bg-black/80 backdrop-blur-md shadow-md">
    <!-- Main Navigation -->
    <div class="border-b border-gray-100">
      <div class="px-2 sm:px-4 lg:px-4">
        <div class="flex justify-between items-center h-16 sm:h-20">
          <!-- Logo -->
          <div class="flex-shrink-0">
            <NuxtLink to="/public" class="relative group">
              <img
                  src="/images/eCommerce/landingLogo.png"
                  alt="Logo"
                  class="h-10 sm:h-12 rounded-full transition-all duration-500 group-hover:scale-105"
              />
              <span class="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-green-400 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </NuxtLink>
          </div>

          <!-- Desktop Navigation -->
          <nav class="hidden lg:flex space-x-1">
            <NuxtLink
                to="/eCommerce"
                class="relative px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors duration-300 group"
                active-class="text-green-600"
            >
              Home
              <span class="absolute bottom-0 left-1/2 w-0 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-4/5 transform -translate-x-1/2"></span>
            </NuxtLink>

            <NuxtLink
                to="/eCommerce/products"
                class="relative px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors duration-300 group"
                active-class="text-green-600"
            >
              Products
              <span class="absolute bottom-0 left-1/2 w-0 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-4/5 transform -translate-x-1/2"></span>
            </NuxtLink>

            <div class="relative group">
              <NuxtLink
                  to="/eCommerce/cart"
                  class="flex items-center px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors duration-300"
                  active-class="text-green-600"
              >
                <nuxt-icon name="cart2" class="mr-1.5 text-lg" />
                Cart
                <span
                    v-if="cartStore.cartItems.length > 0"
                    class="ml-1.5 px-1.5 py-0.5 text-xs font-bold rounded-full bg-red-500 text-white transform group-hover:scale-110 transition-transform duration-200"
                >
                  {{ cartStore.cartItems.length }}
                </span>
              </NuxtLink>
              <div class="absolute bottom-0 left-1/2 w-0 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-4/5 transform -translate-x-1/2"></div>
            </div>

            <div class="relative group">
              <NuxtLink
                  to="/eCommerce/favorites"
                  class="flex items-center px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors duration-300"
                  active-class="text-green-600"
              >
                <nuxt-icon name="favorite1" class="mr-1.5 text-lg" />
                Favorites
                <span
                    v-if="favoriteStore.favoriteItems.length > 0"
                    class="ml-1.5 px-1.5 py-0.5 text-xs font-bold rounded-full bg-red-500 text-white transform group-hover:scale-110 transition-transform duration-200"
                >
                  {{ favoriteStore.favoriteItems.length }}
                </span>
              </NuxtLink>
              <div class="absolute bottom-0 left-1/2 w-0 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-4/5 transform -translate-x-1/2"></div>
            </div>
          </nav>

          <!-- Mobile Menu Button -->
          <div class="lg:hidden">
            <button
                @click="isMobileMenuOpen = !isMobileMenuOpen"
                class="inline-flex items-center justify-center p-2 rounded-md text-white bg-gray-400 hover:bg-green-400 focus:outline-none transition duration-150 ease-in-out"
            >
              <nuxt-icon :name="isMobileMenuOpen ? 'close' : 'menu'" class="text-2xl" />
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div
          v-if="isMobileMenuOpen"
          class="lg:hidden origin-top transition-all duration-300 ease-out"
          :class="isMobileMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'"
      >
        <div class="px-2 pt-2 pb-3 space-y-1">
          <NuxtLink
              to="/public"
              class="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200"
              @click="isMobileMenuOpen = false"
          >
            Home
          </NuxtLink>

          <NuxtLink
              to="/products"
              class="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200"
              @click="isMobileMenuOpen = false"
          >
            Products
          </NuxtLink>

          <NuxtLink
              to="/cart"
              class="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200"
              @click="isMobileMenuOpen = false"
          >
            <nuxt-icon name="cart2" class="mr-2" />
            Cart
            <span
                v-if="cartStore.cartItems.length > 0"
                class="ml-2 px-2 py-0.5 text-xs font-bold rounded-full bg-red-500 text-white"
            >
              {{ cartStore.cartItems.length }}
            </span>
          </NuxtLink>

          <NuxtLink
              to="/favorites"
              class="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200"
              @click="isMobileMenuOpen = false"
          >
            <nuxt-icon name="favorite1" class="mr-2" />
            Favorites
            <span
                v-if="favoriteStore.favoriteItems.length > 0"
                class="ml-2 px-2 py-0.5 text-xs font-bold rounded-full bg-red-500 text-white"
            >
              {{ favoriteStore.favoriteItems.length }}
            </span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { useCartStore } from '@/stores/cart';
import { useFavoriteStore } from '@/stores/favorite';

const cartStore = useCartStore();
const favoriteStore = useFavoriteStore();

const isMobileMenuOpen = ref(false);
</script>

<style>
/* Custom icon sizing */
nuxt-icon {
  font-size: inherit;
}

/* Smooth transitions for mobile menu */
.origin-top {
  transform-origin: top center;
}

/* Active link indicator */
.router-link-active.router-link-exact-active {
  @apply text-green-600;
}

/* Animation for notification badges */
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.bg-red-500 {
  animation: pulse 1.5s infinite;
}
</style>