<script setup lang="ts">
import Nav from "~/components/ecommerce/appHeader.vue";
import Footer from "~/components/ecommerce/appFooter.vue";

</script>
<template>

  <div>
    <Nav/>

    <div>
      <slot />
    </div>

    <Footer/>
  </div>

</template>
