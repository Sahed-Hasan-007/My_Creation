<template>
  <nav
      :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out',
      isScrolled ? 'pt-0' : 'pt-6'
    ]"
  >
    <div class="max-w-[1200px] mx-auto px-6">
      <div
          class="backdrop-blur-md bg-white/10 rounded-full px-8 py-4 flex items-center justify-between border border-white/20 shadow-lg"
      >
        <!-- Logo/Icon -->
        <div class="flex items-center space-x-3">
          <div
              class="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center"
          >
            <svg
                class="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
            >
              <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              />
            </svg>
          </div>
          <span class="text-white font-bold text-xl">Globe3D</span>
        </div>

        <!-- Navigation Items -->
        <div class="flex items-center space-x-8">
          <a href="#home" class="nav-link">Home</a>
          <a href="#features" class="nav-link">Features</a>
          <a href="#about" class="nav-link">About</a>
          <a href="#contact" class="nav-link">Contact</a>
          <button
              class="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 font-medium cursor-pointer"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll)
})
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll)
})
</script>

<style scoped>
.nav-link {
  @apply text-white/90 hover:text-white transition-colors duration-300 font-medium cursor-pointer;
}
</style>
