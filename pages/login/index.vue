<script setup>
import { ref } from 'vue'
import { useLoginForm } from '~/composables/form/useLoginForm.js'

definePageMeta({ layout: 'login' })

const isLoading = ref(false)
const showPassword = ref(false)
const loginError = ref('')

const { email, password, errors, handleSubmit, resetForm, setErrors } = useLoginForm()

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true
  loginError.value = ''
  try {
    // Replace with your actual auth call
    await new Promise((r) => setTimeout(r, 1800))
    console.log('Login payload:', values)
    // await navigateTo('/dashboard')
  } catch (err) {
    loginError.value = 'Invalid credentials. Access denied.'
    // Example: set server-side field errors
    // setErrors({ email: 'No account found with this email' })
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="relative z-10 min-h-screen flex items-center justify-center px-4 py-10">

    <!-- Two-column flex container -->
    <div class="w-full max-w-6xl flex flex-col lg:flex-row items-center gap-12 lg:gap-0">

      <!-- ═══════════════════ LEFT: Brand Section ═══════════════════ -->
      <div class="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left px-4 lg:px-10">

        <!-- Company name -->
        <div class="brand-badge mb-4">
          <span class="badge-text">ADMIN CONTROL</span>
        </div>

        <h1 class="company-name mb-4">
          <span class="name-line-1">NEXUS</span>
          <span class="name-line-2">GAMING</span>
        </h1>

        <!-- Decorative divider line -->
        <div class="brand-divider mt-10"></div>
      </div>

      <!-- ═══════════════════ RIGHT: Login Panel ═══════════════════ -->
      <div class="flex-1 flex justify-center lg:justify-end w-full px-4 lg:px-10">

        <div class="login-card w-full max-w-md">

          <!-- Card top glow bar -->
          <div class="card-glow-bar"></div>

          <div class="p-8 lg:p-10">

            <!-- Header -->
            <div class="mb-8">
              <p class="card-eyebrow mb-2">SECURE ACCESS</p>
              <h2 class="card-title">Administrator Login</h2>
              <p class="card-subtitle mt-1">Authorized personnel only</p>
            </div>

            <!-- Form -->
            <form @submit.prevent="onSubmit" novalidate>

              <!-- Email Field -->
              <div class="field-group mb-5">
                <label class="field-label" for="email">
                  <span class="label-icon">◈</span> EMAIL ADDRESS
                </label>
                <div class="input-wrapper" :class="{ 'input-error': errors.email }">
                  <svg class="input-icon" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  <input
                      id="email"
                      v-model="email"
                      type="email"
                      autocomplete="email"
                      placeholder="admin@nexusgaming.com"
                      class="game-input"
                  />
                </div>
                <Transition name="err">
                  <p v-if="errors.email" class="field-error">{{ errors.email }}</p>
                </Transition>
              </div>

              <!-- Password Field -->
              <div class="field-group mb-6">
                <label class="field-label" for="password">
                  <span class="label-icon">◈</span> PASSWORD
                </label>
                <div class="input-wrapper" :class="{ 'input-error': errors.password }">
                  <svg class="input-icon" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                  <input
                      id="password"
                      v-model="password"
                      :type="showPassword ? 'text' : 'password'"
                      autocomplete="current-password"
                      placeholder="Min. 8 characters"
                      class="game-input"
                  />
                  <button
                      type="button"
                      class="eye-btn"
                      @click="showPassword = !showPassword"
                      :aria-label="showPassword ? 'Hide password' : 'Show password'"
                  >
                    <svg v-if="!showPassword" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                    <svg v-else width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                    </svg>
                  </button>
                </div>
                <Transition name="err">
                  <p v-if="errors.password" class="field-error">{{ errors.password }}</p>
                </Transition>
              </div>

              <!-- Server error -->
              <Transition name="err">
                <div v-if="loginError" class="server-error mb-5">
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>
                  {{ loginError }}
                </div>
              </Transition>

              <!-- Submit Button -->
              <button
                  type="submit"
                  class="submit-btn"
                  :disabled="isLoading"
                  :class="{ 'btn-loading': isLoading }"
              >
                <span v-if="!isLoading" class="btn-content">
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                  </svg>
                  AUTHENTICATE
                </span>
                <span v-else class="btn-content">
                  <span class="spinner"></span>
                  AUTHENTICATING...
                </span>
              </button>

            </form>

            <!-- Footer note -->
            <p class="mt-6 text-center security-note">
              🔒 256-bit encrypted · Monitored session
            </p>

          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* ─── Font Import ─── */
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;600&display=swap');

/* ─── Brand Section ─── */
.brand-icon {
  filter: drop-shadow(0 0 20px rgba(0, 220, 255, 0.6));
  animation: floatIcon 3s ease-in-out infinite;
}
@keyframes floatIcon {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.brand-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 14px;
  border: 1px solid rgba(0, 220, 255, 0.4);
  background: rgba(0, 220, 255, 0.06);
  border-radius: 2px;
}
.badge-text {
  font-family: 'Rajdhani', sans-serif;
  font-size: 0.7rem;
  letter-spacing: 0.3em;
  color: #00dcff;
  font-weight: 600;
}

.company-name {
  display: flex;
  flex-direction: column;
  font-family: 'Orbitron', monospace;
  font-weight: 900;
  line-height: 1;
}
.name-line-1 {
  font-size: clamp(3rem, 6vw, 5rem);
  color: #ffffff;
  text-shadow: 0 0 40px rgba(0, 220, 255, 0.4);
}
.name-line-2 {
  font-size: clamp(3.5rem, 7vw, 6rem);
  background: linear-gradient(90deg, #00dcff, #00ff9d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: none;
  filter: drop-shadow(0 0 20px rgba(0, 220, 255, 0.5));
}
.name-line-3 {
  font-size: clamp(1.8rem, 3.5vw, 3rem);
  color: rgba(255,255,255,0.35);
  letter-spacing: 0.4em;
}

.tagline {
  font-family: 'Rajdhani', sans-serif;
  font-size: 1.05rem;
  color: rgba(255,255,255,0.5);
  letter-spacing: 0.08em;
  font-weight: 300;
}

.feature-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.feature-item {
  display: flex;
  align-items: center;
  gap: 10px;
}
.feature-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #00dcff;
  box-shadow: 0 0 8px #00dcff;
  flex-shrink: 0;
}
.feature-text {
  font-family: 'Rajdhani', sans-serif;
  font-size: 0.9rem;
  color: rgba(255,255,255,0.55);
  letter-spacing: 0.04em;
}

.brand-divider {
  width: 100%;
  max-width: 320px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0, 220, 255, 0.4), transparent);
}

/* ─── Login Card ─── */
.login-card {
  position: relative;
  background: rgba(0, 8, 20, 0.72);
  backdrop-filter: blur(24px) saturate(150%);
  -webkit-backdrop-filter: blur(24px) saturate(150%);
  border: 1px solid rgba(0, 220, 255, 0.18);
  border-radius: 4px;
  box-shadow:
      0 0 0 1px rgba(0, 220, 255, 0.06),
      0 32px 80px rgba(0, 0, 0, 0.6),
      inset 0 1px 0 rgba(255, 255, 255, 0.04);
  overflow: hidden;
  animation: cardIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@keyframes cardIn {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}

.card-glow-bar {
  height: 2px;
  background: linear-gradient(90deg, transparent, #00dcff 30%, #00ff9d 70%, transparent);
  box-shadow: 0 0 20px rgba(0, 220, 255, 0.6);
}

.card-eyebrow {
  font-family: 'Rajdhani', sans-serif;
  font-size: 0.65rem;
  letter-spacing: 0.4em;
  color: #00dcff;
  font-weight: 600;
}
.card-title {
  font-family: 'Orbitron', monospace;
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  text-shadow: 0 0 20px rgba(0, 220, 255, 0.3);
}
.card-subtitle {
  font-family: 'Rajdhani', sans-serif;
  font-size: 0.85rem;
  color: rgba(255,255,255,0.35);
  letter-spacing: 0.06em;
}

/* ─── Form Fields ─── */
.field-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: 'Rajdhani', sans-serif;
  font-size: 0.68rem;
  letter-spacing: 0.25em;
  color: rgba(255,255,255,0.5);
  font-weight: 600;
  margin-bottom: 8px;
}
.label-icon {
  color: #00dcff;
  font-size: 0.75rem;
}

.input-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(0, 220, 255, 0.04);
  border: 1px solid rgba(0, 220, 255, 0.2);
  border-radius: 3px;
  padding: 0 14px;
  transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
}
.input-wrapper:focus-within {
  border-color: rgba(0, 220, 255, 0.7);
  background: rgba(0, 220, 255, 0.07);
  box-shadow: 0 0 0 3px rgba(0, 220, 255, 0.1), 0 0 20px rgba(0, 220, 255, 0.1);
}
.input-wrapper.input-error {
  border-color: rgba(255, 60, 80, 0.7);
  box-shadow: 0 0 0 3px rgba(255, 60, 80, 0.1);
}
.input-icon {
  color: rgba(0, 220, 255, 0.5);
  flex-shrink: 0;
}
.game-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  padding: 14px 0;
  font-family: 'Rajdhani', sans-serif;
  font-size: 0.95rem;
  color: #e0f8ff;
  letter-spacing: 0.04em;
}
.game-input::placeholder {
  color: rgba(255,255,255,0.2);
}
.eye-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  color: rgba(0, 220, 255, 0.5);
  padding: 0;
  display: flex;
  transition: color 0.2s;
}
.eye-btn:hover { color: #00dcff; }

.field-error {
  margin-top: 6px;
  font-family: 'Rajdhani', sans-serif;
  font-size: 0.78rem;
  color: #ff4d60;
  letter-spacing: 0.03em;
  display: flex;
  align-items: center;
  gap: 4px;
}
.field-error::before {
  content: '⚠';
  font-size: 0.7rem;
}

.server-error {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  background: rgba(255, 60, 80, 0.1);
  border: 1px solid rgba(255, 60, 80, 0.3);
  border-radius: 3px;
  font-family: 'Rajdhani', sans-serif;
  font-size: 0.85rem;
  color: #ff6b7a;
  letter-spacing: 0.03em;
}

/* ─── Submit Button ─── */
.submit-btn {
  width: 100%;
  padding: 15px;
  background: linear-gradient(135deg, rgba(0, 220, 255, 0.15), rgba(0, 255, 157, 0.1));
  border: 1px solid rgba(0, 220, 255, 0.5);
  border-radius: 3px;
  cursor: pointer;
  font-family: 'Orbitron', monospace;
  font-size: 0.82rem;
  font-weight: 700;
  color: #00dcff;
  letter-spacing: 0.2em;
  transition: all 0.25s;
  position: relative;
  overflow: hidden;
}
.submit-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(0, 220, 255, 0.2), rgba(0, 255, 157, 0.2));
  opacity: 0;
  transition: opacity 0.25s;
}
.submit-btn:hover:not(:disabled)::before { opacity: 1; }
.submit-btn:hover:not(:disabled) {
  box-shadow: 0 0 30px rgba(0, 220, 255, 0.3), 0 0 0 1px rgba(0, 220, 255, 0.5);
  transform: translateY(-1px);
}
.submit-btn:active:not(:disabled) { transform: translateY(0); }
.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.btn-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  position: relative;
  z-index: 1;
}

/* Spinner */
.spinner {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(0, 220, 255, 0.3);
  border-top-color: #00dcff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  display: inline-block;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}

.security-note {
  font-family: 'Rajdhani', sans-serif;
  font-size: 0.72rem;
  color: rgba(255,255,255,0.25);
  letter-spacing: 0.06em;
}

/* ─── Transitions ─── */
.err-enter-active, .err-leave-active { transition: all 0.2s ease; }
.err-enter-from, .err-leave-to { opacity: 0; transform: translateY(-4px); }
</style>