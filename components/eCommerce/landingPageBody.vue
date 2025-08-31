<template>
  <section class="relative overflow-hidden bg-gradient-to-br from-green-50 to-white">
    <!-- Animated background bubbles -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
          v-for="(bubble, index) in bubbles"
          :key="bubble.id"
          :ref="el => setBubbleRef(el, bubble.id)"
          class="absolute bubble draggable pointer-events-auto"
          :class="bubble.classes"
          :style="bubble.initialStyle"
          @mousedown="startDrag($event, bubble.id)"
      ></div>
    </div>

    <div class="relative px-4 sm:px-6 lg:px-8 py-10 z-20">
      <div class="grid md:grid-cols-2 gap-12 items-center">
        <!-- Content Column -->
        <div class="space-y-6 z-10">
          <div class="flex items-center space-x-3 overflow-hidden py-4">
            <span class="inline-block w-3 h-8 bg-green-500 rounded-full animate-bounce"></span>
            <span class="text-sm font-semibold tracking-wider text-green-600 uppercase transform transition-all duration-500 translate-y-0 opacity-100">
              Investigate Buy & Repeat
            </span>
          </div>

          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-gray-900">
            <span class="inline-block transform transition-all duration-700 hover:scale-105">YOUR TRUSTED</span>
            <span class="inline-block text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-600 transform transition-all duration-700 hover:scale-105">E-COMMERCE</span>
            <span class="inline-block transform transition-all duration-700 hover:scale-105">PLATFORM</span>
          </h1>

          <p class="text-lg text-gray-600 leading-relaxed transition-all duration-300 hover:text-gray-800">
            Explore our curated collection of categories tailored to meet your
            every need. From fashion and electronics to home essentials, we
            have it all under one roof.
            <br /><br />
            Don't miss out on exclusive deals and seasonal discounts featured
            right at the top! Save big with our handpicked offers and daily
            deals.
          </p>

          <div class="flex flex-wrap gap-4 pt-4">
            <NuxtLink to="/products" class="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white cursor-pointer font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
              Shop Now
            </NuxtLink>
            <NuxtLink to="/public" class="px-8 py-3 border-2 border-gray-300 text-gray-700 font-medium cursor-pointer rounded-lg hover:border-green-500 hover:text-green-600 transform hover:-translate-y-1 transition-all duration-300">
              Learn More
            </NuxtLink>
          </div>

          <!-- Brand Logos -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
            <div v-for="(brand, index) in brands" :key="brand.name" class="flex justify-center">
              <a
                  :href="brand.url"
                  target="_blank"
                  rel="noopener noreferrer"
              >
                <img
                    :src="brand.logo"
                    :alt="brand.name + '-logo'"
                    class="h-12 object-contain grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transform hover:scale-110 transition-all duration-300"
                />
              </a>
            </div>
          </div>
        </div>

        <!-- Image Column -->
        <div class="relative z-10">
          <div class="relative group">
            <div class="absolute -inset-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl opacity-75 group-hover:opacity-100 blur-lg group-hover:blur-xl transition-all duration-500"></div>
            <img
                src="/images/eCommerce/landing_page.png"
                alt="E-commerce platform showcase"
                class="relative rounded-xl border-4 border-white shadow-2xl transform transition-all duration-500 group-hover:-rotate-1 group-hover:scale-[1.02]"
            />
            <!-- Floating elements -->
            <div class="absolute -bottom-6 -left-6 w-24 h-24 bg-yellow-400 rounded-full opacity-20 mix-blend-multiply animate-bounce"></div>
            <div class="absolute -top-6 -right-6 w-20 h-20 bg-pink-400 rounded-full opacity-20 mix-blend-multiply animate-bounce"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
const brands = [
  { name: 'google', logo: 'https://readymadeui.com/google-logo.svg', url: 'https://www.google.com' },
  { name: 'facebook', logo: 'https://readymadeui.com/facebook-logo.svg', url: 'https://www.facebook.com/share/16Wwm5B7Bj/?mibextid=wwXIfr' },
  { name: 'linkedin', logo: 'https://readymadeui.com/linkedin-logo.svg', url: 'https://www.linkedin.com/in/sheikh-sahed-hasan-556b77312/' },
  { name: 'pinterest', logo: 'https://readymadeui.com/pinterest-logo.svg', url: 'https://www.pinterest.com' }
]

const bubbles = ref([
  {
    id: 'bubble1',
    classes: 'w-20 h-20 bg-green-200 rounded-full opacity-30 mix-blend-multiply animate-blob animation-delay-2000',
    initialStyle: 'top: 10%; right: 15%; z-index: 1000;'
  },
  {
    id: 'bubble2',
    classes: 'w-24 h-24 bg-blue-200 rounded-full opacity-25 mix-blend-multiply animate-blob animation-delay-4000',
    initialStyle: 'bottom: 20%; left: 10%; z-index: 1000;'
  },
  {
    id: 'bubble3',
    classes: 'w-16 h-16 bg-green-300 rounded-full opacity-35 mix-blend-multiply animate-blob animation-delay-6000',
    initialStyle: 'top: 50%; left: 25%; z-index: 1000;'
  },
  {
    id: 'bubble4',
    classes: 'w-28 h-28 bg-purple-200 rounded-full opacity-20 mix-blend-multiply animate-blob',
    initialStyle: 'top: 15%; left: 50%; z-index: 1000;'
  },
  {
    id: 'bubble5',
    classes: 'w-22 h-22 bg-green-100 rounded-full opacity-30 mix-blend-multiply animate-blob animation-delay-3000',
    initialStyle: 'bottom: 25%; right: 30%; z-index: 1000;'
  },
  {
    id: 'bubble6',
    classes: 'w-18 h-18 bg-teal-200 rounded-full opacity-25 mix-blend-multiply animate-blob animation-delay-1000',
    initialStyle: 'top: 30%; right: 40%; z-index: 1000;'
  },
  {
    id: 'bubble7',
    classes: 'w-26 h-26 bg-green-150 rounded-full opacity-35 mix-blend-multiply animate-blob animation-delay-5000',
    initialStyle: 'bottom: 40%; left: 60%; z-index: 1000;'
  },
  {
    id: 'bubble8',
    classes: 'w-14 h-14 bg-emerald-200 rounded-full opacity-30 mix-blend-multiply animate-blob animation-delay-7000',
    initialStyle: 'top: 70%; right: 20%; z-index: 1000;'
  },
  {
    id: 'bubble9',
    classes: 'w-32 h-32 bg-green-100 rounded-full opacity-15 mix-blend-multiply animate-blob animation-delay-8000',
    initialStyle: 'top: 5%; left: 20%; z-index: 1000;'
  },
  {
    id: 'bubble10',
    classes: 'w-20 h-20 bg-lime-200 rounded-full opacity-25 mix-blend-multiply animate-blob animation-delay-9000',
    initialStyle: 'bottom: 10%; right: 50%; z-index: 1000;'
  },
  {
    id: 'bubble11',
    classes: 'w-16 h-16 bg-green-400 rounded-full opacity-20 mix-blend-multiply animate-blob animation-delay-1500',
    initialStyle: 'top: 25%; left: 40%; z-index: 1000;'
  },
  {
    id: 'bubble12',
    classes: 'w-30 h-30 bg-cyan-200 rounded-full opacity-15 mix-blend-multiply animate-blob animation-delay-2500',
    initialStyle: 'bottom: 50%; right: 10%; z-index: 1000;'
  },
  {
    id: 'bubble13',
    classes: 'w-12 h-12 bg-green-500 rounded-full opacity-35 mix-blend-multiply animate-blob animation-delay-3500',
    initialStyle: 'top: 60%; left: 15%; z-index: 1000;'
  },
  {
    id: 'bubble14',
    classes: 'w-22 h-22 bg-teal-300 rounded-full opacity-25 mix-blend-multiply animate-blob animation-delay-4500',
    initialStyle: 'top: 40%; right: 25%; z-index: 1000;'
  },
  {
    id: 'bubble15',
    classes: 'w-18 h-18 bg-green-200 rounded-full opacity-30 mix-blend-multiply animate-blob animation-delay-5500',
    initialStyle: 'bottom: 30%; left: 45%; z-index: 1000;'
  },
  {
    id: 'bubble16',
    classes: 'w-26 h-26 bg-emerald-100 rounded-full opacity-20 mix-blend-multiply animate-blob animation-delay-6500',
    initialStyle: 'top: 80%; right: 35%; z-index: 1000;'
  },
  {
    id: 'bubble17',
    classes: 'w-14 h-14 bg-lime-300 rounded-full opacity-25 mix-blend-multiply animate-blob animation-delay-7500',
    initialStyle: 'top: 35%; left: 70%; z-index: 1000;'
  },
  {
    id: 'bubble18',
    classes: 'w-20 h-20 bg-green-300 rounded-full opacity-30 mix-blend-multiply animate-blob animation-delay-8500',
    initialStyle: 'bottom: 60%; right: 60%; z-index: 1000;'
  }
])

// Drag functionality variables
let isDragging = false
let currentBubble = null
let offsetX = 0
let offsetY = 0

// Store bubble DOM references
const bubbleRefs = ref({})

const setBubbleRef = (el, bubbleId) => {
  if (el) {
    bubbleRefs.value[bubbleId] = el
  }
}

const startDrag = (e, bubbleId) => {
  e.preventDefault()
  isDragging = true
  currentBubble = bubbleRefs.value[bubbleId]

  if (!currentBubble) return

  // Pause animation while dragging
  currentBubble.style.animationPlayState = 'paused'
  currentBubble.style.cursor = 'grabbing'
  currentBubble.style.zIndex = '2000'

  const rect = currentBubble.getBoundingClientRect()
  offsetX = e.clientX - rect.left
  offsetY = e.clientY - rect.top

  document.addEventListener('mousemove', drag)
  document.addEventListener('mouseup', stopDrag)
}

const drag = (e) => {
  if (!isDragging || !currentBubble) return

  e.preventDefault()

  const container = currentBubble.parentElement
  const containerRect = container.getBoundingClientRect()
  const bubbleRect = currentBubble.getBoundingClientRect()

  let newX = e.clientX - containerRect.left - offsetX
  let newY = e.clientY - containerRect.top - offsetY

  // Keep bubble within container bounds
  newX = Math.max(0, Math.min(newX, containerRect.width - bubbleRect.width))
  newY = Math.max(0, Math.min(newY, containerRect.height - bubbleRect.height))

  currentBubble.style.left = newX + 'px'
  currentBubble.style.top = newY + 'px'
  currentBubble.style.right = 'auto'
  currentBubble.style.bottom = 'auto'
}

const stopDrag = () => {
  if (currentBubble) {
    // Resume animation after dragging
    currentBubble.style.animationPlayState = 'running'
    currentBubble.style.cursor = 'grab'
    currentBubble.style.zIndex = '1000'
  }

  isDragging = false
  currentBubble = null

  document.removeEventListener('mousemove', drag)
  document.removeEventListener('mouseup', stopDrag)
}

onMounted(() => {
  // Add hover effects to bubbles after component is mounted
  Object.values(bubbleRefs.value).forEach(bubble => {
    if (bubble) {
      bubble.style.cursor = 'grab'

      bubble.addEventListener('mouseenter', () => {
        if (!isDragging) {
          bubble.style.transform = 'scale(1.2)'
          bubble.style.transition = 'transform 0.3s ease'
        }
      })

      bubble.addEventListener('mouseleave', () => {
        if (!isDragging) {
          bubble.style.transform = 'scale(1)'
        }
      })
    }
  })
})

onUnmounted(() => {
  // Clean up event listeners
  document.removeEventListener('mousemove', drag)
  document.removeEventListener('mouseup', stopDrag)
})
</script>

<style scoped>
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-1000 {
  animation-delay: 1s;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-3000 {
  animation-delay: 3s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

.animation-delay-5000 {
  animation-delay: 5s;
}

.animation-delay-6000 {
  animation-delay: 6s;
}

.animation-delay-7000 {
  animation-delay: 7s;
}

.animation-delay-8000 {
  animation-delay: 8s;
}

.animation-delay-1500 {
  animation-delay: 1.5s;
}

.animation-delay-2500 {
  animation-delay: 2.5s;
}

.animation-delay-3500 {
  animation-delay: 3.5s;
}

.animation-delay-4500 {
  animation-delay: 4.5s;
}

.animation-delay-5500 {
  animation-delay: 5.5s;
}

.animation-delay-6500 {
  animation-delay: 6.5s;
}

.animation-delay-7500 {
  animation-delay: 7.5s;
}

.animation-delay-8500 {
  animation-delay: 8.5s;
}

.bubble {
  user-select: none;
  transition: transform 0.3s ease;
  cursor: grab;
  z-index: 10;
}

.bubble:hover {
  transform: scale(1.2);
}

.bubble:active {
  cursor: grabbing;
}

.draggable {
  cursor: grab;
}

.draggable:active {
  cursor: grabbing;
}
</style>