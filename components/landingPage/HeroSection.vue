<template>
  <div class="relative z-10 min-h-screen flex items-center justify-center py-12 sm:py-16 lg:py-28 px-4">
    <div class="text-center w-full max-w-6xl mx-auto">
      <!-- Real-time Clock -->
      <div class="relative mb-8 sm:mb-12 lg:mb-16">
        <div class="inline-block">
          <!-- Clock -->
          <div class="relative">
            <div class="clock-wrapper">
              <div class="clock-container relative rounded-full bg-transparent border-2 sm:border-4 border-white/20 shadow-2xl">
                <!-- Hour Markers -->
                <div
                    v-for="hour in 12"
                    :key="hour"
                    class="absolute bg-white/90 rounded-full hour-marker"
                    :style="getHourMarkerStyle(hour)"
                ></div>

                <!-- Minute Markers -->
                <div
                    v-for="minute in 60"
                    :key="`minute-${minute}`"
                    v-show="minute % 5 !== 0"
                    class="absolute bg-white/50 rounded-full minute-marker"
                    :style="getMinuteMarkerStyle(minute)"
                ></div>

                <!-- Date Display -->
                <div
                    class="absolute top-[58%] sm:top-[60%] left-1/2 transform -translate-x-1/2 text-white/90 text-xs sm:text-sm md:text-base lg:text-lg font-semibold bg-black/40 px-2 sm:px-3 md:px-4 lg:px-5 py-1 sm:py-2 rounded-full whitespace-nowrap"
                >
                  {{ currentDate }}
                </div>

                <!-- Clock Hands -->
                <!-- Hour Hand -->
                <div
                    :style="getHourHandStyle()"
                    class="absolute bottom-1/2 left-1/2 bg-gradient-to-t from-white/90 to-gray-300 rounded-t-full shadow-md transition-transform duration-100 hour-hand"
                ></div>

                <!-- Minute Hand -->
                <div
                    :style="getMinuteHandStyle()"
                    class="absolute bottom-1/2 left-1/2 bg-gradient-to-t from-white/90 to-gray-300 rounded-t-full shadow-md transition-transform duration-100 minute-hand"
                ></div>

                <!-- Second Hand -->
                <div
                    :style="getSecondHandStyle()"
                    class="absolute bottom-1/2 left-1/2 bg-gradient-to-t from-red-500 to-red-400 rounded-t-full shadow-md transition-transform duration-75 second-hand"
                ></div>

                <!-- Center Dot -->
                <div
                    class="absolute top-1/2 left-1/2 bg-gradient-to-br from-gray-300 to-white rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-inner border border-white/40 z-10 center-dot"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Welcome Text -->
      <div class="max-w-4xl mx-auto px-4 sm:px-6">
        <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
          Experience the
          <span class="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Future
          </span>
        </h1>
        <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-6 sm:mt-8">
          <button
              class="btn liquid shadow-md shadow-white/70 w-full sm:w-auto"
              @click=""
          >
            <span>Explore Now</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

const currentTime = ref(new Date());
const clockSize = ref(432); // Default size

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
      weekday: "short",
      month: "short",
      day: "numeric",
    })
);

// Responsive style getters
const getHourMarkerStyle = (hour) => {
  const radius = clockSize.value / 2;
  const markerHeight = clockSize.value * 0.08;
  const markerWidth = Math.max(2, clockSize.value * 0.015);
  const angle = hour * 30;

  return {
    width: `${markerWidth}px`,
    height: `${markerHeight}px`,
    top: `${markerHeight * 0.3}px`,
    left: `calc(50% - ${markerWidth/2}px)`,
    transformOrigin: `50% ${radius - markerHeight * 0.3}px`,
    transform: `rotate(${angle}deg)`
  };
};

const getMinuteMarkerStyle = (minute) => {
  const radius = clockSize.value / 2;
  const markerHeight = clockSize.value * 0.04;
  const markerWidth = Math.max(1, clockSize.value * 0.01);
  const angle = minute * 6;

  return {
    width: `${markerWidth}px`,
    height: `${markerHeight}px`,
    top: `${markerHeight * 0.5}px`,
    left: `calc(50% - ${markerWidth/2}px)`,
    transformOrigin: `50% ${radius - markerHeight * 0.5}px`,
    transform: `rotate(${angle}deg)`
  };
};

const getHourHandStyle = () => {
  const handHeight = clockSize.value * 0.25;
  const handWidth = Math.max(2, clockSize.value * 0.015);

  return {
    transform: `translate(-50%, 0) rotate(${hourAngle.value}deg)`,
    transformOrigin: 'bottom center',
    width: `${handWidth}px`,
    height: `${handHeight}px`
  };
};

const getMinuteHandStyle = () => {
  const handHeight = clockSize.value * 0.35;
  const handWidth = Math.max(1, clockSize.value * 0.01);

  return {
    transform: `translate(-50%, 0) rotate(${minuteAngle.value}deg)`,
    transformOrigin: 'bottom center',
    width: `${handWidth}px`,
    height: `${handHeight}px`
  };
};

const getSecondHandStyle = () => {
  const handHeight = clockSize.value * 0.4;
  const handWidth = Math.max(1, clockSize.value * 0.005);

  return {
    transform: `translate(-50%, 0) rotate(${secondAngle.value}deg)`,
    transformOrigin: 'bottom center',
    width: `${handWidth}px`,
    height: `${handHeight}px`
  };
};

// Update clock size based on viewport
const updateClockSize = () => {
  if (process.client) {
    const vw = window.innerWidth;

    if (vw < 480) {
      clockSize.value = Math.min(vw * 0.8, 288); // 80vw, max 18rem
    } else if (vw < 640) {
      clockSize.value = Math.min(vw * 0.85, 320); // 85vw, max 20rem
    } else {
      clockSize.value = Math.min(vw * 0.9, 432); // 90vw, max 27rem
    }
  }
};

let timer;
let resizeTimer;

onMounted(() => {
  updateClockSize();

  // Update time every second
  timer = setInterval(() => {
    currentTime.value = new Date();
  }, 1000);

  // Handle window resize
  const handleResize = () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(updateClockSize, 100);
  };

  window.addEventListener('resize', handleResize);

  // Cleanup on unmount
  onUnmounted(() => {
    clearInterval(timer);
    clearTimeout(resizeTimer);
    window.removeEventListener('resize', handleResize);
  });
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
  if (resizeTimer) clearTimeout(resizeTimer);
});
</script>

<style scoped>
.clock-wrapper {
  display: inline-block;
}

.clock-container {
  width: v-bind('clockSize + "px"');
  height: v-bind('clockSize + "px"');
}

.center-dot {
  width: v-bind('Math.max(16, clockSize * 0.037) + "px"');
  height: v-bind('Math.max(16, clockSize * 0.037) + "px"');
}

.btn {
  position: relative;
  padding: 0.75rem 1.5rem;
  font-size: 16px;
  font-weight: 600;
  color: white;
  background: none;
  border: 2px solid #ffffff;
  border-radius: 8px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
}

@media (min-width: 640px) {
  .btn {
    padding: 1rem 2rem;
    font-size: 18px;
  }
}

.liquid {
  background: linear-gradient(#ffffff 0 0) no-repeat calc(200% - var(--p, 0%))
  100% / 200% var(--p, 0.2em);
  transition: 0.3s var(--t, 0s),
  background-position 0.3s calc(0.3s - var(--t, 0s));
}

.liquid:hover {
  --p: 100%;
  --t: 0.3s;
  color: #000000;
  font-weight: 600;
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .clock-container {
    border-width: 2px;
  }
}

@media (min-width: 640px) {
  .clock-container {
    border-width: 4px;
  }
}
</style>