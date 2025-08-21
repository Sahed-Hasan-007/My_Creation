<template>
  <nav
      :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out',
      isScrolled ? 'pt-0' : 'pt-6'
    ]"
  >
    <div class="max-w-[1200px] mx-auto px-6">
      <div
          class="backdrop-blur-md bg-white/10 rounded-full pr-8 pl-4 flex items-center justify-between border border-white/20 shadow-lg"
      >
        <!-- Logo/Icon -->
        <picture>
          <img
              src="/images/landingPage/mySign.png"
              alt="Logo"
              class="h-14 w-auto"
          />
        </picture>

        <!-- Navigation Items -->
        <div class="flex items-center space-x-8">
          <a href="#home" class="nav-link">Home</a>
          <a href="#features" class="nav-link">Features</a>
          <a href="#about" class="nav-link">About</a>
          <a href="#contact" class="nav-link">Contact</a>
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
