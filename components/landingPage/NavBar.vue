<template>
  <nav
      :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out',
      isScrolled ? 'pt-2' : 'pt-6'
    ]"
  >
    <div class="max-w-[1300px] mx-auto px-6">
      <div
          class="nav-container backdrop-blur-lg bg-white/10 rounded-full pr-8 pl-4 flex items-center justify-between border border-white/20 shadow-lg transition duration-500"
          :class="{ 'scrolled': isScrolled }"
      >
        <!-- Logo/Icon -->
        <picture>
          <img
              :src="'/images/landingPage/mySign.png'"
              alt="Logo"
              class="h-14 w-auto transition-transform duration-500 hover:scale-110 hover:rotate-6 hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]"
          />
        </picture>

        <!-- Navigation Items -->
        <div class="flex items-center space-x-8">
          <nuxt-link to="/ecommerce" class="nav-link">E-commerce</nuxt-link>
          <nuxt-link to="/globe" class="nav-link">Globe</nuxt-link>
          <nuxt-link to="" class="nav-link">About</nuxt-link>
          <nuxt-link to="" class="nav-link">Contact</nuxt-link>
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

.nav-container {
  position: relative;
  overflow: hidden;
  transition: all 0.4s ease;
}

/* Scroll effect: shrink & darken */
.nav-container.scrolled {
  background: rgba(30, 30, 30, 0.6);
  border-color: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px) scale(0.98);
}

/* Animated glowing gradient border */
.nav-container::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 2px;
  background: linear-gradient(135deg, #60a5fa, #a78bfa, #ec4899, #facc15);
  background-size: 400% 400%;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  animation: borderGlow 8s ease infinite;
}

@keyframes borderGlow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Nav links */
.nav-link {
  @apply relative text-white/80 hover:text-white font-medium cursor-pointer transition-all duration-300;
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
