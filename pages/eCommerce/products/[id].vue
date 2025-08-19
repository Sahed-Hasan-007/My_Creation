<template>
  <div class="min-h-screen bg-gradient-to-b from-green-50 to-white p-4 md:p-8 font-sans">
    <div class="max-w-6xl mx-auto">
      <!-- Back Button -->
      <NuxtLink
          to="/products"
          class="flex items-center text-green-600 hover:text-green-700 mb-6 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
        Back to Products
      </NuxtLink>

      <!-- Product Container -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        <!-- Image Gallery -->
        <div class="lg:sticky top-8">
          <div class="bg-white rounded-xl shadow-md overflow-hidden group">
            <img
                :src="item?.image"
                :alt="item?.title"
                class="w-full h-auto max-h-[500px] object-contain p-8 transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <!-- Thumbnails (Placeholder) -->
          <div class="grid grid-cols-4 gap-3 mt-4">
            <div
                v-for="i in 4"
                :key="i"
                class="bg-gray-100 rounded-lg h-20 cursor-pointer hover:ring-2 hover:ring-green-400 transition-all"
            ></div>
          </div>
        </div>

        <!-- Product Info -->
        <div>
          <!-- Title & Rating -->
          <div class="mb-6">
            <h1 class="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{{ item?.title }}</h1>
            <div class="flex items-center gap-2">
              <div class="flex">
                <span v-for="i in 5" :key="i" class="text-yellow-400">
                  <svg
                      class="w-5 h-5"
                      :class="{'text-gray-300': i > 4}"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </span>
              </div>
              <span class="text-gray-500 text-sm">(24 reviews)</span>
            </div>
          </div>

          <!-- Price -->
          <div class="mb-6">
            <span class="text-3xl font-bold text-green-600">${{ item?.price }}</span>
            <span class="text-sm text-gray-500 ml-2">+ Free Shipping</span>
          </div>

          <!-- Description -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold text-gray-800 mb-2">Description</h3>
            <p class="text-gray-600">{{ item?.description }}</p>
          </div>

          <!-- Details -->
          <div class="mb-8 grid grid-cols-2 gap-4">
            <div>
              <h4 class="text-sm font-medium text-gray-500">Weight</h4>
              <p class="text-gray-800">100g</p>
            </div>
            <div>
              <h4 class="text-sm font-medium text-gray-500">Dimensions</h4>
              <p class="text-gray-800">10 × 5 × 5 cm</p>
            </div>
            <div>
              <h4 class="text-sm font-medium text-gray-500">Material</h4>
              <p class="text-gray-800">Premium Quality</p>
            </div>
            <div>
              <h4 class="text-sm font-medium text-gray-500">SKU</h4>
              <p class="text-gray-800">PRD-{{ item?.id }}</p>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-wrap gap-4 mb-8">
            <button
                @click="handleAddToCart(item)"
                class="flex-1 min-w-[200px] py-3.5 px-6 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-medium rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Add to Cart
            </button>
            <button
                @click="handleAddToFavorite(item)"
                class="flex-1 min-w-[200px] py-3.5 px-6 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:border-green-500 hover:text-green-600 transition-all duration-300 flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Add to Favorites
            </button>
          </div>

          <!-- Share Options -->
          <div class="border-t border-gray-200 pt-6">
            <h4 class="text-sm font-medium text-gray-500 mb-3">Share this product</h4>
            <div class="flex gap-3">
              <button class="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200 transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd"></path>
                </svg>
              </button>
              <button class="w-10 h-10 rounded-full bg-blue-100 text-blue-400 flex items-center justify-center hover:bg-blue-200 transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </button>
              <button class="w-10 h-10 rounded-full bg-pink-100 text-pink-500 flex items-center justify-center hover:bg-pink-200 transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058z" clip-rule="evenodd"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Floating Notifications -->
      <transition name="fade-slide">
        <div
            v-if="popupVisibleCart"
            class="fixed bottom-8 right-8 bg-gray-900 text-white px-6 py-3 rounded-full shadow-xl flex items-center space-x-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          <span>Added to cart!</span>
          <span class="absolute bottom-0 left-0 h-1 bg-green-500 animate-progress w-full rounded-full"></span>
        </div>
      </transition>

      <transition name="fade-slide">
        <div
            v-if="popupVisibleFavorite"
            class="fixed bottom-8 right-8 bg-gray-900 text-white px-6 py-3 rounded-full shadow-xl flex items-center space-x-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span>Added to favorites!</span>
          <span class="absolute bottom-0 left-0 h-1 bg-red-500 animate-progress w-full rounded-full"></span>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useCartStore } from "../stores/cart";
import { useFavoriteStore } from "../stores/favorite";

definePageMeta({
  layout: 'e-commerce'
})

const cartStore = useCartStore();
const favoriteStore = useFavoriteStore();
const popupVisibleCart = ref(false);
const popupVisibleFavorite = ref(false);

// Fetch the product details
const { id } = useRoute().params;
const uri = `https://fakestoreapi.com/products/${id}`;
const { data: item } = await useFetch(uri);

// Add to Cart
function handleAddToCart(item) {
  cartStore.addToCart(item);
  showPopupCart();
}

// Add to Favorite
function handleAddToFavorite(item) {
  favoriteStore.addToFavorite(item);
  showPopupFavorite();
}

function showPopupCart() {
  popupVisibleCart.value = true;
  setTimeout(() => {
    popupVisibleCart.value = false;
  }, 2000);
}

function showPopupFavorite() {
  popupVisibleFavorite.value = true;
  setTimeout(() => {
    popupVisibleFavorite.value = false;
  }, 2000);
}
</script>

<style>
/* Animation for the notification */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Progress bar animation */
@keyframes progress {
  0% { width: 100%; }
  100% { width: 0%; }
}
.animate-progress {
  animation: progress 2s linear forwards;
}
</style>