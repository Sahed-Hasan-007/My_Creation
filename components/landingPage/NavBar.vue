<template>
  <nav
      :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out',
      isScrolled ? 'pt-2' : 'pt-6'
    ]"
  >
    <div class="max-w-[1300px] mx-auto px-6">
      <div
          class="nav-container backdrop-blur-lg bg-white/10 rounded-full pr-8 pl-4 flex items-center justify-between border-2 border-white/20 shadow-lg transition duration-500"
          :class="{ 'scrolled': isScrolled }"
      >
        <!-- Logo -->
        <picture class="py-[2px]">
          <img
              :src="'/images/landingPage/mySign.png'"
              alt="Logo"
              class="h-12 w-auto transition-transform duration-500 hover:scale-110 hover:rotate-6 hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]"
          />
        </picture>

        <!-- Desktop Nav -->
        <div class="hidden md:flex items-center space-x-8">
          <template v-for="(item, index) in navItems" :key="index">
            <div v-if="!item.children">
              <nuxt-link :to="item.to" class="nav-link">{{ item.name }}</nuxt-link>
            </div>
            <div v-else class="relative group">
              <button class="nav-link flex items-center gap-1">
                {{ item.name }}
                <svg
                    class="w-4 h-4 transition-transform duration-300 group-hover:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>

              <!-- Dropdown -->
              <div
                  class="absolute left-0 mt-3 w-40 bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20 overflow-hidden opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 origin-top"
              >
                <nuxt-link
                    v-for="(child, idx) in item.children"
                    :key="idx"
                    :to="child.to"
                    class="block px-4 py-2 text-white/80 hover:text-white hover:bg-white/20 transition-all duration-300"
                >
                  {{ child.name }}
                </nuxt-link>
              </div>
            </div>
          </template>
        </div>

        <!-- Mobile Menu Button -->
        <button
            @click="mobileOpen = !mobileOpen"
            class="md:hidden text-white focus:outline-none"
        >
          <svg
              v-if="!mobileOpen"
              class="w-7 h-7"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
          <svg
              v-else
              class="w-7 h-7"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Mobile Dropdown Menu -->
      <transition
          enter-active-class="transition duration-500 ease-out"
          enter-from-class="opacity-0 -translate-y-4"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition duration-300 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-4"
      >
        <div
            v-if="mobileOpen"
            class="md:hidden mt-3 bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20 overflow-hidden"
        >
          <template v-for="(item, index) in navItems" :key="index">
            <div v-if="!item.children">
              <nuxt-link :to="item.to" class="mobile-link">{{ item.name }}</nuxt-link>
            </div>
            <details v-else class="group">
              <summary class="mobile-link flex justify-between items-center cursor-pointer">
                {{ item.name }}
                <svg
                    class="w-4 h-4 transition-transform duration-300 group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
                </svg>
              </summary>
              <div class="pl-6">
                <nuxt-link
                    v-for="(child, idx) in item.children"
                    :key="idx"
                    :to="child.to"
                    class="mobile-link"
                >
                  {{ child.name }}
                </nuxt-link>
              </div>
            </details>
          </template>
        </div>
      </transition>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const mobileOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll)
})
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll)
})

// Nav items array
const navItems = [
  { name: 'E-commerce', to: '/ecommerce' },
  {
    name: 'Explore',
    children: [
      { name: 'Globe', to: '/globe' },
      // Add more dropdown items here
    ]
  },
  { name: 'About', to: '/about' },
  { name: 'Contact', to: '/contact' }
]
</script>


<style scoped>
.nav-link {
  @apply relative text-white/80 hover:text-white font-medium cursor-pointer transition-all duration-300;
}
.mobile-link {
  @apply block px-4 py-3 text-white/80 hover:text-white hover:bg-white/20 transition-all duration-300;
}
.nav-container {
  position: relative;
  overflow: visible; /* important */
  transition: all 0.4s ease;
}
.nav-container.scrolled {
  background: rgba(30, 30, 30, 0.6);
  border-color: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px) scale(0.98);
}
/* Underline effect */
.nav-link::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -4px;
  width: 0%;
  height: 2px;
  background: linear-gradient(to right, #60a5fa, #a78bfa);
  transition: width 0.3s ease;
  border-radius: 4px;
}
.nav-link:hover::after {
  width: 100%;
}
/* Subtle scale & glow */
.nav-link:hover {
  transform: translateY(-2px) scale(1.05);
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
}
</style>
