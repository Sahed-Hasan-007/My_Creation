<template>
  <div class="login-layout">
    <!-- Animated scanline overlay for retro-gaming feel -->
    <div class="scanlines" aria-hidden="true"></div>
    <!-- Glowing grid overlay -->
    <div class="grid-overlay" aria-hidden="true"></div>
    <!-- Main content slot -->
    <slot />
  </div>
</template>

<style scoped>
.login-layout {
  min-height: 100vh;
  width: 100%;
  position: relative;
  background-image: url('/images/login-bg.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
}

/* Deep dark overlay so the bg image stays moody */
.login-layout::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
      135deg,
      rgba(0, 0, 0, 0.82) 0%,
      rgba(0, 6, 20, 0.75) 50%,
      rgba(0, 0, 0, 0.88) 100%
  );
  z-index: 0;
}

/* Subtle scanlines for a gaming CRT feel */
.scanlines {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0, 255, 200, 0.015) 2px,
      rgba(0, 255, 200, 0.015) 4px
  );
  z-index: 1;
  pointer-events: none;
}

/* Perspective grid overlay */
.grid-overlay {
  position: absolute;
  inset: 0;
  background-image:
      linear-gradient(rgba(0, 220, 255, 0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 220, 255, 0.04) 1px, transparent 1px);
  background-size: 60px 60px;
  z-index: 1;
  pointer-events: none;
}
</style>