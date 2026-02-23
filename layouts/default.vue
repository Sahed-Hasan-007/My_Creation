<script setup lang="ts">
import Navbar from "~/components/landingPage/NavBar.vue"

</script>
<template>
  <div>
    <Navbar/>
  </div>
  <!-- Main content area -->
  <div class="">
      <slot/>
  </div>

</template>
