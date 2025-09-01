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
    <HeroSection />

  </div>
</template>

