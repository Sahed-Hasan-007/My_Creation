<template>
  <div class="relative z-10 min-h-screen flex items-center justify-center">
    <div class="text-center">
      <!-- Real-time Clock -->
      <div class="relative mb-8">
        <div class="inline-block">
          <!-- Clock -->
          <div class="relative">
            <div
                class="w-80 h-80 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-600/20 backdrop-blur-lg border border-white/30 shadow-2xl flex items-center justify-center"
            >
              <div
                  class="relative w-72 h-72 rounded-full bg-white/5 backdrop-blur-sm border border-white/20"
              >
                <!-- Hour Markers -->
                <div
                    v-for="hour in 12"
                    :key="hour"
                    :style="{
                    transform: `rotate(${hour * 30}deg)`,
                    position: 'absolute',
                    top: '6px',
                    left: '50%',
                    transformOrigin: '0 138px',
                    marginLeft: '-1px'
                  }"
                    class="w-0.5 h-8 bg-white/60"
                ></div>

                <!-- Clock Hands -->
                <div
                    :style="{
                    transform: `rotate(${hourAngle}deg)`,
                    transformOrigin: 'bottom center'
                  }"
                    class="absolute bottom-1/2 left-1/2 w-1 h-20 bg-white rounded-full ml-[-2px] shadow-lg"
                ></div>
                <div
                    :style="{
                    transform: `rotate(${minuteAngle}deg)`,
                    transformOrigin: 'bottom center'
                  }"
                    class="absolute bottom-1/2 left-1/2 w-0.5 h-28 bg-white/90 rounded-full ml-[-1px] shadow-lg"
                ></div>
                <div
                    :style="{
                    transform: `rotate(${secondAngle}deg)`,
                    transformOrigin: 'bottom center'
                  }"
                    class="absolute bottom-1/2 left-1/2 w-0.5 h-32 bg-red-400 rounded-full ml-[-1px] shadow-lg transition-transform duration-75"
                ></div>

                <!-- Center Dot -->
                <div
                    class="absolute top-1/2 left-1/2 w-4 h-4 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-lg"
                ></div>

                <!-- Digital Time -->
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="text-center">
                    <div
                        class="text-white font-mono text-2xl font-bold mb-2 drop-shadow-lg"
                    >
                      {{ digitalTime }}
                    </div>
                    <div class="text-white/80 text-sm font-medium">
                      {{ currentDate }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Welcome Text -->
      <div class="max-w-4xl mx-auto px-6">
        <h1
            class="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight"
        >
          Experience the
          <span
              class="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"
          >
            Future
          </span>
        </h1>
        <p class="text-xl text-white/90 mb-8 leading-relaxed">
          Immerse yourself in stunning 3D visualizations and real-time
          experiences that push the boundaries of web technology.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
              class="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full hover:shadow-xl transition-all duration-300 font-semibold text-lg cursor-pointer"
          >
            Explore Now
          </button>
          <button
              class="border-2 border-white/30 text-white px-8 py-4 rounded-full hover:bg-white/10 transition-all duration-300 font-semibold text-lg backdrop-blur-sm cursor-pointer"
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const currentTime = ref(new Date())

// Clock angles
const hourAngle = computed(() => {
  const hours = currentTime.value.getHours() % 12
  const minutes = currentTime.value.getMinutes()
  return hours * 30 + minutes * 0.5
})
const minuteAngle = computed(() => currentTime.value.getMinutes() * 6)
const secondAngle = computed(() => currentTime.value.getSeconds() * 6)

// Digital time & date
const digitalTime = computed(() =>
    currentTime.value.toLocaleTimeString("en-US", {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
)
const currentDate = computed(() =>
    currentTime.value.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
)

let timer
onMounted(() => {
  timer = setInterval(() => {
    currentTime.value = new Date()
  }, 1000)
})
onUnmounted(() => {
  clearInterval(timer)
})
</script>
