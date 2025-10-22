<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Reactive data
const loading = ref(true)
const mobileMenuOpen = ref(false)
const activeAccordion = ref(0)
const currentSlide = ref(0)


definePageMeta({
  layout: 'blank',
})
// Gallery images with free online sources
const galleryImages = ref([
  {
    url: '/images/photoGallery/aa.jpg',
    tag: 'portrait',
    title: '300Fit Highway Collection',
    author: {
      name: 'Sahed Hasan',
      avatar: '/images/photoGallery/me.jpg'
    }
  },
  {
    url: '/images/photoGallery/bb.jpg',
    tag: 'nature',
    title: 'Mountain Wilderness',
    author: {
      name: 'Sahed Hasan',
      avatar: '/images/photoGallery/me.jpg'
    }
  },
  {
    url: '/images/photoGallery/cc.jpg',
    tag: 'architecture',
    title: 'Modern Cityscape',
    author: {
      name: 'Sahed Hasan',
      avatar: '/images/photoGallery/me.jpg'
    }
  },
  {
    url: '/images/photoGallery/dd.jpg',
    tag: 'landscape',
    title: 'Golden Hour Vista',
    author: {
      name: 'Sahed Hasan',
      avatar: '/images/photoGallery/me.jpg'
    }
  },
  {
    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2970&q=80',
    tag: 'adventure',
    title: 'Forest Expedition',
    author: {
      name: 'Sahed Hasan',
      avatar: '/images/photoGallery/me.jpg'
    }
  }
])

// Methods
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const nextSlide = () => {
  if (currentSlide.value < galleryImages.value.length - 1) {
    currentSlide.value++
  }
}

const prevSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--
  }
}

// Auto-slide functionality for mobile
let autoSlideInterval = null

const startAutoSlide = () => {
  autoSlideInterval = setInterval(() => {
    if (currentSlide.value === galleryImages.value.length - 1) {
      currentSlide.value = 0
    } else {
      currentSlide.value++
    }
  }, 4000)
}

const stopAutoSlide = () => {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval)
    autoSlideInterval = null
  }
}

// Lifecycle
onMounted(() => {
  // Simulate loading
  setTimeout(() => {
    loading.value = false
  }, 500)

  // Start auto-slide for mobile
  if (window.innerWidth < 1024) {
    startAutoSlide()
  }
})

onUnmounted(() => {
  stopAutoSlide()
})

// SEO Meta
useHead({
  title: 'Tulen - Photography Gallery',
  meta: [
    { name: 'description', content: 'Professional photography gallery showcasing stunning portraits, landscapes, and architectural photography.' },
    { name: 'keywords', content: 'photography, gallery, portraits, landscape, architecture, professional photographer' }
  ]
})
</script>

<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <!-- Preloader -->
    <div v-if="loading" class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900">
      <div class="loader"></div>
    </div>

    <!-- Mobile Menu Toggle -->
    <button
        @click="toggleMobileMenu"
        class="fixed top-6 right-6 z-50 lg:hidden bg-gray-800 p-3 rounded-full shadow-lg transition-transform duration-300 hover:scale-110"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <!-- Sidebar Menu -->
    <div class="sidebar" :class="{ 'sidebar-open': mobileMenuOpen }">
      <div class="px-6 py-3 border-b border-gray-700">
        <picture class="cursor-pointer flex items-center justify-center">
          <img
              :src="'/images/landingPage/mySign.png'"
              alt="Logo"
              class="h-12 w-auto transition-transform duration-500 hover:scale-110 hover:rotate-6 hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]"
          />
        </picture>
      </div>

      <nav class="sidebar-nav">
        <ul class="space-y-4">
          <li><NuxtLink to="/" class="nav-link">Home</NuxtLink></li>
          <li><NuxtLink to="/photo-gallery" class="nav-link active">Gallery</NuxtLink></li>
          <li><NuxtLink to="/photo-gallery/photos" class="nav-link">Photos</NuxtLink></li>
        </ul>
      </nav>

      <div class="sidebar-footer">
        <div class="flex space-x-8 items-center justify-center">
          <a href="https://www.facebook.com/sk.pappu.566" class="social-link p-1 border-2 border-gray-400 hover:border-gray-100 rounded-full" aria-label="Facebook">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a href="https://www.youtube.com/channel/UCtl2NWIajA6eSrCrO13TgvQ" class="social-link p-1 border-2 border-gray-400 hover:border-gray-100 rounded-lg" aria-label="YouTube">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
              <path d="M23.498 6.186a2.97 2.97 0 0 0-2.09-2.103C19.438 3.5 12 3.5 12 3.5s-7.438 0-9.408.583A2.97 2.97 0 0 0 .502 6.186 31.2 31.2 0 0 0 0 12a31.2 31.2 0 0 0 .502 5.814 2.97 2.97 0 0 0 2.09 2.103C4.562 20.5 12 20.5 12 20.5s7.438 0 9.408-.583a2.97 2.97 0 0 0 2.09-2.103A31.2 31.2 0 0 0 24 12a31.2 31.2 0 0 0-.502-5.814ZM9.75 15.568V8.432L15.818 12 9.75 15.568Z"/>
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/sheikh-sahed-hasan-556b77312/" class="social-link p-1 border-2 border-gray-400 hover:border-gray-100 rounded-sm" aria-label="LinkedIn">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a href="#" class="social-link p-1 border-2 border-gray-400 hover:border-gray-100 rounded-xl" aria-label="Instagram">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <main class="main-content">
      <!-- Hero Section with Accordion Style Gallery -->
      <section class="hero-section">
        <div class="accordion-container">
          <!-- Desktop Accordion View -->
          <div class="hidden lg:flex accordion-desktop">
            <div
                v-for="(image, index) in galleryImages"
                :key="index"
                class="accordion-item"
                :class="{ 'accordion-active': activeAccordion === index }"
                @mouseenter="activeAccordion = index"
                :style="{ backgroundImage: `url(${image.url})` }"
            >
              <div class="accordion-overlay">
                <div class="accordion-content">
                  <span class="photo-tag">{{ image.tag }}</span>
                  <h2 class="photo-title">{{ image.title }}</h2>
                  <div class="photo-author">
                    <img :src="image.author.avatar" :alt="image.author.name" class="author-avatar">
                    <h4 class="author-name">{{ image.author.name }}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Mobile Slider -->
          <div class="lg:hidden mobile-slider">
            <div class="slider-container" ref="sliderContainer">
              <div
                  class="slider-track"
                  :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
              >
                <div
                    v-for="(image, index) in galleryImages"
                    :key="index"
                    class="slide-item"
                    :style="{ backgroundImage: `url(${image.url})` }"
                >
                  <div class="slide-overlay">
                    <div class="slide-content">
                      <span class="photo-tag">{{ image.tag }}</span>
                      <h2 class="photo-title">{{ image.title }}</h2>
                      <div class="photo-author">
                        <img :src="image.author.avatar" :alt="image.author.name" class="author-avatar">
                        <h4 class="author-name">{{ image.author.name }}</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Mobile Slider Controls -->
            <div class="slider-controls">
              <button
                  @click="prevSlide"
                  class="slider-btn"
                  :disabled="currentSlide === 0"
              >
                &#8249;
              </button>
              <div class="slider-dots">
                <button
                    v-for="(image, index) in galleryImages"
                    :key="index"
                    @click="currentSlide = index"
                    class="slider-dot"
                    :class="{ 'slider-dot-active': currentSlide === index }"
                ></button>
              </div>
              <button
                  @click="nextSlide"
                  class="slider-btn"
                  :disabled="currentSlide === galleryImages.length - 1"
              >
                &#8250;
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
/* Preloader */
.loader {
  width: 50px;
  height: 50px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top: 3px solid #ffffff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Sidebar Styles */
.sidebar {
  @apply fixed top-0 left-0 h-full w-80 bg-black bg-opacity-95 backdrop-blur-md z-40 transform -translate-x-full transition-transform duration-300 ease-in-out;
}

.sidebar-open {
  @apply translate-x-0;
}

@media (min-width: 1024px) {
  .sidebar {
    @apply translate-x-0 w-72;
  }

  .main-content {
    @apply ml-72;
  }
}

.logo {
  @apply text-white hover:text-gray-300 transition-colors duration-300;
}

.sidebar-nav {
  @apply flex-1 p-8;
}

.nav-link {
  @apply block py-3 px-4 text-gray-300 hover:text-white hover:bg-gray-800 hover:border hover:border-white rounded-lg transition-all duration-300 transform hover:translate-x-2;
}

.nav-link.active {
  @apply text-black font-[700] bg-gray-400;
}

.sidebar-footer {
  @apply p-8 border-t border-gray-800;
}

.social-links {
  @apply flex justify-center space-x-4 mb-4;
}

.social-link {
  @apply text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110;
}

/* Main Content */
.main-content {
  @apply min-h-screen;
}

/* Hero Section */
.hero-section {
  @apply h-screen relative overflow-hidden;
}

.accordion-container {
  @apply h-full w-full;
}

/* Desktop Accordion */
.accordion-desktop {
  @apply h-full;
}

.accordion-item {
  @apply flex-1 relative bg-cover bg-center cursor-pointer transition-all duration-500 ease-in-out;
  flex: 0.5;
}

.accordion-item:hover,
.accordion-active {
  flex: 2;
}

.accordion-overlay {
  @apply absolute inset-0 bg-black bg-opacity-40 flex items-end p-8 transition-all duration-300;
}

.accordion-item:hover .accordion-overlay {
  @apply bg-opacity-20;
}

.accordion-content {
  @apply transform translate-y-8 opacity-0 transition-all duration-500;
}

.accordion-active .accordion-content,
.accordion-item:hover .accordion-content {
  @apply translate-y-0 opacity-100;
}

.photo-tag {
  @apply inline-block bg-white bg-opacity-20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium mb-3;
}

.photo-title {
  @apply text-2xl md:text-3xl font-bold mb-4 leading-tight;
}

.photo-author {
  @apply flex items-center space-x-3;
}

.author-avatar {
  @apply w-10 h-10 rounded-full object-cover border-2 border-white;
}

.author-name {
  @apply font-medium;
}

/* Mobile Slider */
.mobile-slider {
  @apply h-full relative;
}

.slider-container {
  @apply h-full overflow-hidden;
}

.slider-track {
  @apply flex h-full transition-transform duration-500 ease-in-out;
}

.slide-item {
  @apply flex-shrink-0 w-full h-full bg-cover bg-center relative;
}

.slide-overlay {
  @apply absolute inset-0 bg-black bg-opacity-50 flex items-end p-6;
}

.slide-content .photo-title {
  @apply text-xl font-bold mb-3;
}

/* Slider Controls */
.slider-controls {
  @apply absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4;
}

.slider-btn {
  @apply w-10 h-10 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-xl font-bold transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed;
}

.slider-btn:not(:disabled):hover {
  @apply bg-opacity-30 scale-110;
}

.slider-dots {
  @apply flex space-x-2;
}

.slider-dot {
  @apply w-3 h-3 bg-white bg-opacity-40 rounded-full transition-all duration-300;
}

.slider-dot-active {
  @apply bg-opacity-100 scale-125;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .sidebar {
    @apply w-full;
  }

  .sidebar-header {
    @apply p-6;
  }

  .sidebar-nav {
    @apply p-6;
  }

  .sidebar-footer {
    @apply p-6;
  }

  .slide-overlay {
    @apply p-4;
  }

  .slide-content .photo-title {
    @apply text-lg;
  }
}

/* Custom Scrollbar for Webkit browsers */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}
</style>