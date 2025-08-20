<template>
  <div class="relative min-h-screen bg-black text-white overflow-hidden">
    <!-- Globe Background -->
    <ClientOnly>
      <Globe />
      <template #fallback>
        <div class="fixed inset-0 bg-black flex items-center justify-center">
          <div class="text-white text-xl">Loading...</div>
        </div>
      </template>
    </ClientOnly>

    <!-- Content Overlay -->
    <div
        v-if="textArea"
        class="relative z-10 flex flex-col min-h-screen"
    >
      <!-- Main Content -->
      <main class="flex-1 flex items-center justify-center px-6">
        <div class="text-center max-w-4xl">
          <!-- h2 -->
          <h2
              class="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent
            transition-all duration-700"
              :class="isClosing ? 'animate-slide-out-left' : ''"
          >
            Welcome to the Future
          </h2>

          <!-- p -->
          <p
              class="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto transition-all duration-700"
              :class="isClosing ? 'animate-slide-out-right delay-200' : ''"
          >
            Experience the power of interactive 3D graphics with our stunning globe visualization
          </p>

          <!-- button -->
          <div
              class="space-x-4 transition-all duration-700"
              :class="isClosing ? 'animate-slide-out-left delay-400' : ''"
          >
            <button
                @click="closeTextArea"
                class="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </main>

      <!-- Footer -->
      <footer
          class="px-6 pb-16 text-center text-gray-400 transition-all duration-700"
          :class="isClosing ? 'animate-slide-out-right delay-600' : ''"
      >
        <p>Want to explore me? Click <a href="https://www.linkedin.com/in/sheikh-sahed-hasan-556b77312/" class="text-orange-500 underline cursor-pointer">&copy;Shahed</a></p>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import Globe from '~/components/globe/Globe.vue'

const textArea = ref(true)
const isClosing = ref(false)

const closeTextArea = () => {
  isClosing.value = true
  setTimeout(() => {
    textArea.value = false
  }, 900) // wait for animations (max delay + duration)
}

useHead({
  title: 'Interactive 3D Globe',
  meta: [{ name: 'description', content: 'Experience stunning 3D globe visualization with interactive controls' }],
})

useSeoMeta({
  title: 'Interactive 3D Globe',
  ogTitle: 'Interactive 3D Globe',
  description: 'Experience stunning 3D globe visualization with interactive controls',
  ogDescription: 'Experience stunning 3D globe visualization with interactive controls',
})
</script>

<style>
@keyframes slideOutLeft {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(-100vw); /* move completely out to the left */
    opacity: 0;
  }
}

@keyframes slideOutRight {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100vw); /* move completely out to the right */
    opacity: 0;
  }
}

.animate-slide-out-left {
  animation: slideOutLeft 0.7s ease forwards;
}
.animate-slide-out-right {
  animation: slideOutRight 0.7s ease forwards;
}

/* stagger effect */
.delay-200 {
  animation-delay: 0.2s;
}
.delay-400 {
  animation-delay: 0.4s;
}
.delay-600 {
  animation-delay: 0.6s;
}
</style>

