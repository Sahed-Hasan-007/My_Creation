<template>
  <div class="min-h-screen bg-gradient-to-b from-green-50 to-white font-sans">
    <div class="p-4 md:p-8">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800">Your Cart</h1>
        <NuxtLink to="/ecommerce/products" class="text-green-600 hover:text-green-700 flex items-center transition-colors">
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
        <div v-if="cartItems.length === 0" class="text-center py-16">
          <div class="mx-auto w-40 h-40 mb-6 relative">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-full w-full text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <div class="absolute -inset-8 bg-gray-100 rounded-full animate-ping opacity-20"></div>
          </div>
          <h3 class="text-xl font-medium text-gray-700 mb-2">Your cart is empty</h3>
          <p class="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet</p>
          <NuxtLink to="/products" class="inline-block px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300">
            Browse Products
          </NuxtLink>
        </div>
      </transition>

      <!-- Cart with Items -->
      <transition
          enter-active-class="transition-opacity duration-500"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
      >
        <div v-if="cartItems.length > 0" class="grid md:grid-cols-3 gap-6">
          <!-- Cart Items -->
          <div class="md:col-span-2 space-y-4">
            <transition-group
                name="cart-item"
                tag="div"
                class="space-y-4"
            >
              <div
                  v-for="(item, index) in cartItems"
                  :key="item.id"
                  class="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row gap-4 relative overflow-hidden"
                  :style="`transition-delay: ${index * 50}ms`"
              >
                <!-- Remove Button -->
                <button
                    @click="removeFromCart(item.id)"
                    class="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors z-10"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <!-- Image -->
                <div class="w-full sm:w-32 h-32 bg-gray-50 rounded-lg p-2 flex-shrink-0">
                  <img
                      :src="item.image"
                      :alt="item.title"
                      class="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
                  />
                </div>

                <!-- Details -->
                <div class="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 class="font-semibold text-gray-800 line-clamp-2 mb-2">
                      {{ item.title }}
                    </h3>
                    <p class="text-lg font-bold text-green-600 mb-4">
                      ${{ (item.price * item.quantity).toFixed(2) }}
                      <span class="text-sm text-gray-500 ml-1">(${{ item.price }} each)</span>
                    </p>
                  </div>

                  <!-- Quantity Controls -->
                  <div class="flex items-center">
                    <button
                        @click="decreaseQuantity(item.id)"
                        class="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l-lg hover:bg-gray-100 transition-colors"
                        :class="{'text-gray-400 cursor-not-allowed': item.quantity === 1}"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                      </svg>
                    </button>
                    <span class="w-12 h-8 flex items-center justify-center border-t border-b border-gray-300 text-center">
                      {{ item.quantity }}
                    </span>
                    <button
                        @click="increaseQuantity(item.id)"
                        class="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r-lg hover:bg-gray-100 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </transition-group>
          </div>

          <!-- Order Summary -->
          <div class="bg-white rounded-xl p-6 shadow-sm h-fit md:sticky top-6">
            <h2 class="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>

            <div class="space-y-4 border-b border-gray-200 pb-6">
              <div class="flex justify-between">
                <span class="text-gray-600">Subtotal</span>
                <span class="font-medium">${{ subtotal.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Shipping</span>
                <span class="font-medium">$2.00</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Tax</span>
                <span class="font-medium">${{ tax.toFixed(2) }}</span>
              </div>
            </div>

            <div class="flex justify-between mt-6 mb-8">
              <span class="text-lg font-bold">Total</span>
              <span class="text-xl font-bold text-green-600">${{ total.toFixed(2) }}</span>
            </div>

            <button
                class="w-full py-3.5 px-6 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-medium rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Proceed to Checkout
            </button>

            <div class="mt-4 flex items-center justify-center text-sm text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Secure checkout
            </div>
          </div>
        </div>
      </transition>

      <!-- Recently Viewed (Placeholder) -->
      <div v-if="cartItems.length > 0" class="mt-16">
        <h3 class="text-xl font-bold text-gray-800 mb-6">Recently Viewed</h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <!-- Placeholder for recently viewed items -->
          <div v-for="i in 4" :key="i" class="bg-gray-100 rounded-lg h-40 animate-pulse"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useCartStore } from "../stores/cart";

const cartStore = useCartStore();
const cartItems = cartStore.cartItems;

// Calculate values
const subtotal = computed(() => {
  return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
});

const tax = computed(() => {
  return subtotal.value * 0.1; // 10% tax
});

const total = computed(() => {
  return subtotal.value + tax.value + 2.00; // $2 shipping
});

function removeFromCart(id) {
  cartStore.removeFromCart(id);
}

function increaseQuantity(id) {
  const item = cartItems.find((item) => item.id === id);
  if (item) {
    item.quantity += 1;
    cartStore.saveToLocalStorage();
  }
}

function decreaseQuantity(id) {
  const item = cartItems.find((item) => item.id === id);
  if (item && item.quantity > 1) {
    item.quantity -= 1;
    cartStore.saveToLocalStorage();
  } else if (item && item.quantity === 1) {
    removeFromCart(id);
  }
}
</script>

<style>
/* Cart item transitions */
.cart-item-enter-active,
.cart-item-leave-active {
  transition: all 0.5s ease;
}
.cart-item-enter-from,
.cart-item-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.cart-item-leave-active {
  position: absolute;
  width: calc(100% - 2rem);
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