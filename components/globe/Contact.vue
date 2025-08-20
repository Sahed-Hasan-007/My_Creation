<template>
  <section
      class="min-h-screen flex items-center justify-center py-20 bg-gradient-to-b from-gray-900 to-black"
      id="contact"
  >
    <div class="container mx-auto px-6">
      <div
          class="text-4xl font-bold mb-12 text-center text-white"
          :class="titleClasses"
      >
        Get in Touch
      </div>
      <form
          class="max-w-lg mx-auto"
          :class="formClasses"
          @submit="handleSubmit"
      >
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium mb-2 text-white">
            Name
          </label>
          <input
              type="text"
              id="name"
              v-model="formState.name"
              class="w-full px-3 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium mb-2 text-white">
            Email
          </label>
          <input
              type="email"
              id="email"
              v-model="formState.email"
              class="w-full px-3 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
          />
        </div>
        <div class="mb-4">
          <label for="message" class="block text-sm font-medium mb-2 text-white">
            Message
          </label>
          <textarea
              id="message"
              v-model="formState.message"
              rows="4"
              class="w-full px-3 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
          ></textarea>
        </div>
        <button
            type="submit"
            class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition-colors transform hover:scale-105 active:scale-95"
            :class="buttonClasses"
        >
          Send Message
        </button>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// Form state
const formState = ref({
  name: '',
  email: '',
  message: ''
})

// Animation state
const isVisible = ref(false)

// Computed classes for animations
const titleClasses = computed(() => ({
  'opacity-100 translate-y-0': isVisible.value,
  'opacity-0 translate-y-5': !isVisible.value,
  'transition-all duration-600 ease-out': true
}))

const formClasses = computed(() => ({
  'opacity-100': isVisible.value,
  'opacity-0': !isVisible.value,
  'transition-opacity duration-600 ease-out delay-300': true
}))

const buttonClasses = computed(() => ({
  'transition-all duration-200 ease-out': true
}))

// Handle form submission
const handleSubmit = (e: Event) => {
  e.preventDefault()
  // Handle form submission here
  console.log('Form submitted:', formState.value)

  // You can add your form submission logic here
  // For example, send to an API endpoint
  alert('Message sent! (This is a demo)')

  // Reset form
  formState.value = {
    name: '',
    email: '',
    message: ''
  }
}

// Trigger animations on mount
onMounted(() => {
  // Small delay to ensure smooth animation
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})

// Define component props if needed
interface Props {
  showBackground?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showBackground: true
})
</script>

<style scoped>
/* Additional component-specific styles */
.container {
  max-width: 1200px;
}

/* Custom focus styles */
input:focus,
textarea:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Custom scrollbar for textarea */
textarea::-webkit-scrollbar {
  width: 6px;
}

textarea::-webkit-scrollbar-track {
  background: #374151;
  border-radius: 3px;
}

textarea::-webkit-scrollbar-thumb {
  background: #6b7280;
  border-radius: 3px;
}

textarea::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
</style>