<template>
  <div class="relative z-10 min-h-screen flex items-center justify-center">
    <div class="text-center">
      <!-- Real-time Clock -->
      <div class="relative mb-8">
        <div class="inline-block">
          <!-- Clock -->
          <div class="relative">
            <div
                class="w-[40rem] h-[40rem] rounded-full backdrop-blur-md shadow-xl flex items-center justify-center bg-black/20"
            >
              <div class="relative w-[36rem] h-[36rem] rounded-full bg-transparent">
                <!-- Hour Markers -->
                <div
                    v-for="hour in 12"
                    :key="hour"
                    class="absolute w-3 h-12 bg-white/90 rounded-full"
                    :style="{
                    top: '16px',
                    left: 'calc(50% - 6px)',
                    transformOrigin: '50% 264px',
                    transform: `rotate(${hour * 30}deg)`
                  }"
                ></div>

                <!-- Minute Markers -->
                <div
                    v-for="minute in 60"
                    :key="`minute-${minute}`"
                    v-show="minute % 5 !== 0"
                    class="absolute w-1 h-6 bg-white/50 rounded-full"
                    :style="{
                    top: '24px',
                    left: 'calc(50% - 2px)',
                    transformOrigin: '50% 256px',
                    transform: `rotate(${minute * 6}deg)`
                  }"
                ></div>

                <!-- Date Display -->
                <div
                    class="absolute top-[60%] left-1/2 transform -translate-x-1/2 text-white/90 text-xl font-semibold bg-black/40 px-6 py-2 rounded-full"
                >
                  {{ currentDate }}
                </div>

                <!-- Clock Hands -->
                <!-- Hour Hand -->
                <div
                    :style="{
                    transform: `rotate(${hourAngle}deg)`,
                    transformOrigin: 'bottom center'
                  }"
                    class="absolute bottom-1/2 left-1/2 w-4 h-40 bg-gradient-to-t from-white/90 to-gray-300 rounded-t-full ml-[-8px] shadow-md transition-transform duration-100"
                ></div>

                <!-- Minute Hand -->
                <div
                    :style="{
                    transform: `rotate(${minuteAngle}deg)`,
                    transformOrigin: 'bottom center'
                  }"
                    class="absolute bottom-1/2 left-1/2 w-3 h-56 bg-gradient-to-t from-white/90 to-gray-300 rounded-t-full ml-[-6px] shadow-md transition-transform duration-100"
                ></div>

                <!-- Second Hand -->
                <div
                    :style="{
                    transform: `rotate(${secondAngle}deg)`,
                    transformOrigin: 'bottom center'
                  }"
                    class="absolute bottom-1/2 left-1/2 w-1 h-64 bg-gradient-to-t from-red-500 to-red-400 rounded-t-full ml-[-2px] shadow-md transition-transform duration-75"
                ></div>

                <!-- Center Dot -->
                <div
                    class="absolute top-1/2 left-1/2 w-10 h-10 bg-gradient-to-br from-gray-300 to-white rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-inner border border-white/40 z-10"
                ></div>
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
import { ref, computed, onMounted, onUnmounted } from "vue";

const currentTime = ref(new Date());

// Clock angles
const hourAngle = computed(() => {
  const hours = currentTime.value.getHours() % 12;
  const minutes = currentTime.value.getMinutes();
  return hours * 30 + minutes * 0.5;
});
const minuteAngle = computed(() => currentTime.value.getMinutes() * 6);
const secondAngle = computed(() => currentTime.value.getSeconds() * 6);

const currentDate = computed(() =>
    currentTime.value.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
);

let timer;
onMounted(() => {
  timer = setInterval(() => {
    currentTime.value = new Date();
  }, 1000);
});
onUnmounted(() => {
  clearInterval(timer);
});
</script>
