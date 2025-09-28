<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'


// Page meta configuration
definePageMeta({
  layout: 'blank',
  pageTransition: {
    name: 'slide-right',
    mode: 'out-in'
  }
})

// Reactive data
const loading = ref(true)
const mobileMenuOpen = ref(false)
const currentCategory = ref('all')
const searchTerm = ref('')

// Gallery categories
const categories = ref([
  { id: 'all', name: 'All Photos', count: 24 },
  { id: 'portrait', name: 'Portraits', count: 8 },
  { id: 'landscape', name: 'Landscapes', count: 6 },
  { id: 'architecture', name: 'Architecture', count: 5 },
  { id: 'nature', name: 'Nature', count: 5 }
])

// Gallery images with dummy data
const galleryImages = ref([
  // Portraits
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    title: 'Golden Hour Portrait',
    category: 'portrait',
    photographer: 'Sahed Hasan',
    description: 'Beautiful golden hour portrait session capturing natural beauty'
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    title: 'Urban Portrait',
    category: 'portrait',
    photographer: 'Sahed Hasan',
    description: 'Street style portrait with urban background'
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    title: 'Professional Headshot',
    category: 'portrait',
    photographer: 'Sahed Hasan',
    description: 'Clean professional headshot with studio lighting'
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    title: 'Creative Portrait',
    category: 'portrait',
    photographer: 'Sahed Hasan',
    description: 'Artistic portrait with creative lighting setup'
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    title: 'Natural Light Portrait',
    category: 'portrait',
    photographer: 'Sahed Hasan',
    description: 'Soft natural light portrait session'
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    title: 'Fashion Portrait',
    category: 'portrait',
    photographer: 'Sahed Hasan',
    description: 'High fashion portrait with dramatic styling'
  },
  {
    id: 7,
    url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    title: 'Business Portrait',
    category: 'portrait',
    photographer: 'Sahed Hasan',
    description: 'Professional business portrait session'
  },
  {
    id: 8,
    url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    title: 'Artistic Portrait',
    category: 'portrait',
    photographer: 'Sahed Hasan',
    description: 'Creative artistic portrait with unique composition'
  },

  // Landscapes
  {
    id: 9,
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    title: 'Mountain Vista',
    category: 'landscape',
    photographer: 'Sahed Hasan',
    description: 'Breathtaking mountain landscape at golden hour'
  },
  {
    id: 10,
    url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    title: 'Lake Reflection',
    category: 'landscape',
    photographer: 'Sahed Hasan',
    description: 'Serene lake with perfect mountain reflections'
  },
  {
    id: 11,
    url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    title: 'Sunset Valley',
    category: 'landscape',
    photographer: 'Sahed Hasan',
    description: 'Dramatic sunset over rolling hills and valleys'
  },
  {
    id: 12,
    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    title: 'Forest Path',
    category: 'landscape',
    photographer: 'Sahed Hasan',
    description: 'Mystical forest path with filtered sunlight'
  },
  {
    id: 13,
    url: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    title: 'Ocean Waves',
    category: 'landscape',
    photographer: 'Sahed Hasan',
    description: 'Powerful ocean waves crashing against rocks'
  },
  {
    id: 14,
    url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    title: 'Desert Dunes',
    category: 'landscape',
    photographer: 'Sahed Hasan',
    description: 'Golden sand dunes in the desert landscape'
  },

  // Architecture
  {
    id: 15,
    url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    title: 'Modern Skyscraper',
    category: 'architecture',
    photographer: 'Sahed Hasan',
    description: 'Contemporary glass skyscraper reaching for the sky'
  },
  {
    id: 16,
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    title: 'Glass Facade',
    category: 'architecture',
    photographer: 'Sahed Hasan',
    description: 'Geometric patterns in modern glass architecture'
  },
  {
    id: 17,
    url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    title: 'Historic Building',
    category: 'architecture',
    photographer: 'Sahed Hasan',
    description: 'Beautiful historic architecture with intricate details'
  },
  {
    id: 18,
    url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    title: 'Bridge Structure',
    category: 'architecture',
    photographer: 'Sahed Hasan',
    description: 'Impressive bridge engineering and design'
  },
  {
    id: 19,
    url: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    title: 'Urban Geometry',
    category: 'architecture',
    photographer: 'Sahed Hasan',
    description: 'Abstract architectural lines and shapes'
  },

  // Nature
  {
    id: 20,
    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    title: 'Wildflowers',
    category: 'nature',
    photographer: 'Sahed Hasan',
    description: 'Colorful wildflowers in natural meadow'
  },
  {
    id: 21,
    url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    title: 'Tree Silhouette',
    category: 'nature',
    photographer: 'Sahed Hasan',
    description: 'Dramatic tree silhouette against sunset sky'
  },
  {
    id: 22,
    url: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    title: 'Water Drops',
    category: 'nature',
    photographer: 'Sahed Hasan',
    description: 'Macro photography of water drops on leaves'
  },
  {
    id: 23,
    url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    title: 'Bird Flight',
    category: 'nature',
    photographer: 'Sahed Hasan',
    description: 'Birds in flight captured at perfect moment'
  },
  {
    id: 24,
    url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    title: 'Autumn Leaves',
    category: 'nature',
    photographer: 'Sahed Hasan',
    description: 'Beautiful autumn foliage in vibrant colors'
  }
])

// Computed filtered images
const filteredImages = computed(() => {
  let filtered = galleryImages.value

  if (currentCategory.value !== 'all') {
    filtered = filtered.filter(img => img.category === currentCategory.value)
  }

  if (searchTerm.value) {
    filtered = filtered.filter(img =>
        img.title.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        img.description.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
  }

  return filtered
})

// Methods
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const setCategory = (categoryId) => {
  currentCategory.value = categoryId
}

const clearSearch = () => {
  searchTerm.value = ''
}

// Lifecycle
onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 500)
})

// SEO Meta
useHead({
  title: 'Gallery - Professional Photography Collection',
  meta: [
    { name: 'description', content: 'Explore our comprehensive photography gallery featuring portraits, landscapes, architecture, and nature photography.' },
    { name: 'keywords', content: 'photography gallery, professional photos, portraits, landscapes, architecture photography' }
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
      <div class="sidebar-header">
        <picture class="cursor-pointer">
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
          <li><NuxtLink to="/photo-gallery" class="nav-link">Gallery</NuxtLink></li>
          <li><NuxtLink to="/photo-gallery/photos" class="nav-link active">Photos</NuxtLink></li>
        </ul>
      </nav>

      <div class="sidebar-footer">
        <div class="social-links">
          <a href="https://www.facebook.com/sk.pappu.566" class="social-link" aria-label="Facebook">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a href="https://www.youtube.com/channel/UCtl2NWIajA6eSrCrO13TgvQ" class="social-link" aria-label="YouTube">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
              <path d="M23.498 6.186a2.97 2.97 0 0 0-2.09-2.103C19.438 3.5 12 3.5 12 3.5s-7.438 0-9.408.583A2.97 2.97 0 0 0 .502 6.186 31.2 31.2 0 0 0 0 12a31.2 31.2 0 0 0 .502 5.814 2.97 2.97 0 0 0 2.09 2.103C4.562 20.5 12 20.5 12 20.5s7.438 0 9.408-.583a2.97 2.97 0 0 0 2.09-2.103A31.2 31.2 0 0 0 24 12a31.2 31.2 0 0 0-.502-5.814ZM9.75 15.568V8.432L15.818 12 9.75 15.568Z"/>
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/sheikh-sahed-hasan-556b77312/" class="social-link" aria-label="LinkedIn">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a href="#" class="social-link" aria-label="Instagram">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <main class="main-content">
      <div class="gallery-container">
        <!-- Header Section -->
        <div class="gallery-header">
          <div class="header-content">
            <h1 class="gallery-title">Photography Gallery</h1>
            <p class="gallery-subtitle">Discover stunning moments captured through the lens</p>
          </div>

          <!-- Search and Filter Controls -->
          <div class="controls-section">
            <!-- Search Bar -->
            <div class="search-container">
              <div class="search-input-wrapper">
                <svg class="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                    v-model="searchTerm"
                    type="text"
                    placeholder="Search photos..."
                    class="search-input"
                />
                <button
                    v-if="searchTerm"
                    @click="clearSearch"
                    class="clear-search"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Category Filter -->
            <div class="category-filter">
              <button
                  v-for="category in categories"
                  :key="category.id"
                  @click="setCategory(category.id)"
                  class="category-btn"
                  :class="{ 'category-active': currentCategory === category.id }"
              >
                {{ category.name }}
                <span class="category-count">{{ category.count }}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Gallery Grid -->
        <div class="gallery-grid">
          <div
              v-for="(image, index) in filteredImages"
              :key="image.id"
              class="gallery-item"
              :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div class="image-container">
              <img
                  :src="image.url"
                  :alt="image.title"
                  class="gallery-image"
                  loading="lazy"
              />
              <div class="image-overlay">
                <div class="overlay-content">
                  <h3 class="image-title">{{ image.title }}</h3>
                  <p class="image-description">{{ image.description }}</p>
                  <div class="image-meta">
                    <span class="photographer">{{ image.photographer }}</span>
                    <span class="category-tag">{{ image.category }}</span>
                  </div>
                </div>
                <div class="overlay-actions">
                  <button class="action-btn view-btn" title="View Full Size">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  <button class="action-btn like-btn" title="Like Photo">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                  <button class="action-btn share-btn" title="Share Photo">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Load More Button -->
        <div class="load-more-section">
          <button class="load-more-btn">
            <span>Load More Photos</span>
            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* Page Transitions */
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.5s ease-in-out;
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-right-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

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

/* Sidebar Styles (same as main page) */
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

.sidebar-header {
  @apply p-8 border-b border-gray-800;
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

/* Gallery Container */
.gallery-container {
  @apply p-6 lg:p-12;
}

/* Header Section */
.gallery-header {
  @apply mb-12;
}

.header-content {
  @apply text-center mb-8;
}

.gallery-title {
  @apply text-4xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent;
  animation: slideUp 0.8s ease-out;
}

.gallery-subtitle {
  @apply text-xl text-gray-400 max-w-2xl mx-auto;
  animation: slideUp 0.8s ease-out 0.2s both;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Controls Section */
.controls-section {
  @apply flex flex-col lg:flex-row items-center justify-between gap-6;
  animation: slideUp 0.8s ease-out 0.4s both;
}

/* Search Container */
.search-container {
  @apply w-full lg:w-auto;
}

.search-input-wrapper {
  @apply relative flex items-center;
}

.search-icon {
  @apply absolute left-4 w-5 h-5 text-gray-400 pointer-events-none;
}

.search-input {
  @apply w-full lg:w-80 bg-gray-800 border border-gray-700 rounded-full py-3 pl-12 pr-12 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition-all duration-300;
}

.clear-search {
  @apply absolute right-4 text-gray-400 hover:text-white transition-colors duration-200;
}

/* Category Filter */
.category-filter {
  @apply flex flex-wrap gap-3 justify-center;
}

.category-btn {
  @apply px-6 py-2 bg-gray-800 border border-gray-700 rounded-full text-sm font-medium text-gray-300 hover:text-white hover:border-gray-500 transition-all duration-300 flex items-center gap-2;
}

.category-active {
  @apply bg-blue-600 border-blue-500 text-white;
}

.category-count {
  @apply bg-gray-700 text-xs px-2 py-1 rounded-full;
}

.category-active .category-count {
  @apply bg-blue-700;
}

/* Gallery Grid */
.gallery-grid {
  @apply grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6;
}

.gallery-item {
  @apply opacity-0;
  animation: fadeInUp 0.6s ease-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px) rotate(-90deg);
  }
  to {
    opacity: 1;
    transform: translateY(0) rotate(0deg);
  }
}

/* Image Container */
.image-container {
  @apply relative cursor-pointer overflow-hidden rounded-2xl bg-gray-800 shadow-lg;
  aspect-ratio: 4/5;
  transition: all 0.4s ease-out;
}

.image-container:hover {
  @apply shadow-2xl;
  transform: translateY(-8px) scale(1.02);
}

.gallery-image {
  @apply w-full h-full object-cover transition-all duration-700 ease-out;
  transform: rotate(-90deg) scale(1.1);
}

.image-container:hover .gallery-image {
  transform: rotate(0deg) scale(1);
}

/* Image Overlay */
.image-overlay {
  @apply absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-between p-6;
}

.overlay-content {
  @apply transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 delay-100;
}

.image-title {
  @apply text-xl font-bold mb-2 text-white;
}

.image-description {
  @apply text-sm text-gray-300 mb-4 line-clamp-2;
}

.image-meta {
  @apply flex items-center justify-between text-xs;
}

.photographer {
  @apply text-blue-400 font-medium;
}

.category-tag {
  @apply bg-white bg-opacity-20 px-2 py-1 rounded-full text-white;
}

/* Overlay Actions */
.overlay-actions {
  @apply flex justify-center gap-3 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 delay-200;
}

.action-btn {
  @apply w-10 h-10 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-opacity-30 hover:scale-110 transition-all duration-300;
}

.view-btn:hover {
  @apply bg-blue-500 bg-opacity-80;
}

.like-btn:hover {
  @apply bg-red-500 bg-opacity-80;
}

.share-btn:hover {
  @apply bg-green-500 bg-opacity-80;
}

/* Load More Section */
.load-more-section {
  @apply text-center mt-16;
}

.load-more-btn {
  @apply inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-full hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl;
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

  .gallery-container {
    @apply p-4;
  }

  .gallery-title {
    @apply text-3xl;
  }

  .gallery-subtitle {
    @apply text-lg;
  }

  .controls-section {
    @apply flex-col;
  }

  .search-input {
    @apply w-full;
  }

  .gallery-grid {
    @apply grid-cols-1 sm:grid-cols-2 gap-4;
  }

  .image-overlay {
    @apply p-4;
  }

  .image-title {
    @apply text-lg;
  }

  .overlay-actions {
    @apply gap-2;
  }

  .action-btn {
    @apply w-8 h-8;
  }
}

/* Custom Scrollbar */
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

/* Advanced Animations */
@media (prefers-reduced-motion: no-preference) {
  .gallery-item:nth-child(even) .gallery-image {
    transform: rotate(90deg) scale(1.1);
  }

  .gallery-item:nth-child(3n) .gallery-image {
    transform: rotate(-45deg) scale(1.1);
  }

  .gallery-item:nth-child(4n) .gallery-image {
    transform: rotate(45deg) scale(1.1);
  }
}

/* Loading States */
.gallery-image[data-loaded="false"] {
  @apply bg-gray-700;
  background-image: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
</style>