<script setup lang="ts">
import Nav from "~/components/landingPage/NavBar.vue"

</script>
<template>
  <div>
    <Nav/>
  </div>
    <!-- Main content area -->
    <div class="">
        <slot/>
    </div>

</template>
