<script setup>
import NavBar from "~/components/landingPage/NavBar.vue"
import HeroSection from "~/components/landingPage/HeroSection.vue"

useHead({
  title: "Interactive 3D Globe - Experience the Future",
  meta: [
    {
      name: "description",
      content:
          "Immerse yourself in stunning 3D visualizations and real-time experiences with our interactive globe application.",
    },
  ],
})
</script>


<template>
  <div class="relative min-h-screen overflow-hidden">
    <!-- Background Video -->
    <div class="fixed inset-0 w-full h-full z-0">
      <video
          class="w-full h-full object-cover"
          autoplay
          muted
          loop
          playsinline
      >
        <source src="/videos/background2.mp4" type="video/mp4" />
        <source src="/videos/background2.webm" type="video/webm" />
      </video>
      <div class="absolute inset-0 bg-black bg-opacity-50"></div>
    </div>

    <!-- Components -->
    <NavBar />
    <HeroSection />

    <!-- Floating Elements -->
    <div class="fixed inset-0 pointer-events-none z-5">
      <div
          class="absolute top-20 left-10 w-2 h-2 bg-white/40 rounded-full animate-pulse"
      ></div>
      <div
          class="absolute top-40 right-20 w-1 h-1 bg-blue-400/60 rounded-full animate-ping"
      ></div>
      <div
          class="absolute bottom-40 left-20 w-3 h-3 bg-purple-400/40 rounded-full animate-pulse"
      ></div>
      <div
          class="absolute bottom-20 right-10 w-1.5 h-1.5 bg-white/50 rounded-full animate-ping"
      ></div>
    </div>
  </div>
</template>

