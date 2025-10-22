<script setup>
import { ref, onMounted, computed } from 'vue'

// Reactive data
const loading = ref(true)
const mobileMenuOpen = ref(false)
const expandedSections = ref({
  hsc: false,
  ssc: false
})
const activeDocument = ref('resume')

definePageMeta({
  layout: 'blank',
})

// Document data structure
const documents = ref({
  resume: {
    id: 'resume',
    title: 'Professional Resume',
    icon: '📄',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    imageUrl: 'https://via.placeholder.com/800x1100/1e293b/ffffff?text=Resume+Document',
    description: 'Complete professional resume with work experience and skills',
    lastUpdated: '2024-01-15',
    category: 'Professional'
  },
  hscCertificate: {
    id: 'hscCertificate',
    title: 'HSC Certificate',
    icon: '🎓',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    imageUrl: 'https://via.placeholder.com/800x1100/1e293b/ffffff?text=HSC+Certificate',
    description: 'Higher Secondary Certificate - Academic Credentials',
    lastUpdated: '2023-06-20',
    category: 'HSC'
  },
  hscMarksheet: {
    id: 'hscMarksheet',
    title: 'HSC Marksheet',
    icon: '📊',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    imageUrl: 'https://via.placeholder.com/800x1100/1e293b/ffffff?text=HSC+Marksheet',
    description: 'Higher Secondary Marksheet with subject-wise grades',
    lastUpdated: '2023-06-20',
    category: 'HSC'
  },
  sscCertificate: {
    id: 'sscCertificate',
    title: 'SSC Certificate',
    icon: '🎓',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    imageUrl: 'https://via.placeholder.com/800x1100/1e293b/ffffff?text=SSC+Certificate',
    description: 'Secondary School Certificate - Academic Credentials',
    lastUpdated: '2021-05-15',
    category: 'SSC'
  },
  sscMarksheet: {
    id: 'sscMarksheet',
    title: 'SSC Marksheet',
    icon: '📊',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    imageUrl: 'https://via.placeholder.com/800x1100/1e293b/ffffff?text=SSC+Marksheet',
    description: 'Secondary School Marksheet with subject-wise grades',
    lastUpdated: '2021-05-15',
    category: 'SSC'
  }
})

// Computed property to get the current active document
const currentDocument = computed(() => {
  return documents.value[activeDocument.value]
})

// Methods
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const toggleSection = (section) => {
  expandedSections.value[section] = !expandedSections.value[section]
}

const selectDocument = (docId) => {
  activeDocument.value = docId
  // Close mobile menu when document is selected
  if (mobileMenuOpen.value) {
    mobileMenuOpen.value = false
  }
}

const downloadAsPDF = () => {
  const link = document.createElement('a')
  link.href = currentDocument.value.pdfUrl
  link.download = `${currentDocument.value.title}.pdf`
  link.target = '_blank'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const downloadAsImage = () => {
  const link = document.createElement('a')
  link.href = currentDocument.value.imageUrl
  link.download = `${currentDocument.value.title}.jpg`
  link.target = '_blank'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Lifecycle
onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 500)
})

// SEO Meta
useHead({
  title: 'Documents - Professional Credentials',
  meta: [
    { name: 'description', content: 'View and download professional documents, certificates, and academic records.' },
    { name: 'keywords', content: 'resume, certificates, academic records, HSC, SSC, professional documents' }
  ]
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
    <!-- Preloader -->
    <div v-if="loading" class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900">
      <div class="loader"></div>
    </div>

    <!-- Mobile Menu Toggle -->
    <button
        @click="toggleMobileMenu"
        class="fixed top-6 right-6 z-50 lg:hidden bg-gray-800 p-3 rounded-full shadow-lg transition-transform duration-300 hover:scale-110"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <!-- Sidebar Menu -->
    <div class="sidebar" :class="{ 'sidebar-open': mobileMenuOpen }">
      <div class="px-6 py-3 border-b border-gray-700">
        <picture class="cursor-pointer flex items-center justify-center">
          <img
              :src="'/images/landingPage/mySign.png'"
              alt="Logo"
              class="h-12 w-auto transition-transform duration-500 hover:scale-110 hover:rotate-6 hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]"
          />
        </picture>
      </div>

      <nav class="sidebar-nav">
        <ul class="space-y-2">
          <!-- Home Link -->
          <li>
            <NuxtLink to="/" class="nav-link group">
              <svg class="w-5 h-5 inline mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </NuxtLink>
          </li>

          <!-- Resume Link -->
          <li>
            <button
                @click="selectDocument('resume')"
                class="nav-link w-full text-left group"
                :class="{ 'active': activeDocument === 'resume' }"
            >
              <svg class="w-5 h-5 inline mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Resume
            </button>
          </li>

          <!-- HSC Section -->
          <li>
            <button
                @click="toggleSection('hsc')"
                class="nav-link w-full text-left flex items-center justify-between group"
            >
              <span class="flex items-center">
                <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
                HSC
              </span>
              <svg
                  class="w-4 h-4 transition-transform duration-300 ease-in-out"
                  :class="{ 'rotate-180': expandedSections.hsc }"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Dropdown with smooth animation -->
            <div
                class="dropdown-container"
                :class="{ 'dropdown-open': expandedSections.hsc }"
            >
              <ul class="dropdown-content">
                <li>
                  <button
                      @click="selectDocument('hscCertificate')"
                      class="sub-nav-link w-full text-left"
                      :class="{ 'active': activeDocument === 'hscCertificate' }"
                  >
                    <span class="text-lg mr-2">🎓</span>
                    Certificate
                  </button>
                </li>
                <li>
                  <button
                      @click="selectDocument('hscMarksheet')"
                      class="sub-nav-link w-full text-left"
                      :class="{ 'active': activeDocument === 'hscMarksheet' }"
                  >
                    <span class="text-lg mr-2">📊</span>
                    Marksheet
                  </button>
                </li>
              </ul>
            </div>
          </li>

          <!-- SSC Section -->
          <li>
            <button
                @click="toggleSection('ssc')"
                class="nav-link w-full text-left flex items-center justify-between group"
            >
              <span class="flex items-center">
                <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                SSC
              </span>
              <svg
                  class="w-4 h-4 transition-transform duration-300 ease-in-out"
                  :class="{ 'rotate-180': expandedSections.ssc }"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Dropdown with smooth animation -->
            <div
                class="dropdown-container"
                :class="{ 'dropdown-open': expandedSections.ssc }"
            >
              <ul class="dropdown-content">
                <li>
                  <button
                      @click="selectDocument('sscCertificate')"
                      class="sub-nav-link w-full text-left"
                      :class="{ 'active': activeDocument === 'sscCertificate' }"
                  >
                    <span class="text-lg mr-2">🎓</span>
                    Certificate
                  </button>
                </li>
                <li>
                  <button
                      @click="selectDocument('sscMarksheet')"
                      class="sub-nav-link w-full text-left"
                      :class="{ 'active': activeDocument === 'sscMarksheet' }"
                  >
                    <span class="text-lg mr-2">📊</span>
                    Marksheet
                  </button>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </nav>

      <div class="sidebar-footer">
        <div class="flex space-x-8 items-center justify-center">
          <a href="https://www.facebook.com/sk.pappu.566" class="social-link p-1 border-2 border-gray-400 hover:border-gray-100 rounded-full" aria-label="Facebook">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a href="https://www.youtube.com/channel/UCtl2NWIajA6eSrCrO13TgvQ" class="social-link p-1 border-2 border-gray-400 hover:border-gray-100 rounded-lg" aria-label="YouTube">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
              <path d="M23.498 6.186a2.97 2.97 0 0 0-2.09-2.103C19.438 3.5 12 3.5 12 3.5s-7.438 0-9.408.583A2.97 2.97 0 0 0 .502 6.186 31.2 31.2 0 0 0 0 12a31.2 31.2 0 0 0 .502 5.814 2.97 2.97 0 0 0 2.09 2.103C4.562 20.5 12 20.5 12 20.5s7.438 0 9.408-.583a2.97 2.97 0 0 0 2.09-2.103A31.2 31.2 0 0 0 24 12a31.2 31.2 0 0 0-.502-5.814ZM9.75 15.568V8.432L15.818 12 9.75 15.568Z"/>
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/sheikh-sahed-hasan-556b77312/" class="social-link p-1 border-2 border-gray-400 hover:border-gray-100 rounded-sm" aria-label="LinkedIn">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a href="#" class="social-link p-1 border-2 border-gray-400 hover:border-gray-100 rounded-xl" aria-label="Instagram">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <main class="main-content">
      <div class="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <!-- Document Header -->
        <div class="mb-8 animate-fade-in">
          <div class="flex items-center gap-4 mb-4">
            <span class="text-5xl md:text-6xl">{{ currentDocument.icon }}</span>
            <div>
              <h1 class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                {{ currentDocument.title }}
              </h1>
              <p class="text-gray-400 text-sm md:text-base mt-1">{{ currentDocument.description }}</p>
            </div>
          </div>
          <div class="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <span class="flex items-center">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              {{ currentDocument.category }}
            </span>
            <span class="flex items-center">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Updated: {{ currentDocument.lastUpdated }}
            </span>
          </div>
        </div>

        <!-- Document Viewer -->
        <div class="document-viewer-container animate-slide-up">
          <!-- PDF/Document Display -->
          <div class="document-display">
            <div class="document-frame">
              <iframe
                  :src="currentDocument.pdfUrl"
                  class="w-full h-full rounded-lg"
                  title="Document Viewer"
              ></iframe>
            </div>
          </div>

          <!-- Download Actions -->
          <div class="download-section">
            <h3 class="text-xl font-bold mb-4 flex items-center">
              <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Options
            </h3>

            <div class="download-buttons">
              <!-- Download as PDF -->
              <button
                  @click="downloadAsPDF"
                  class="download-btn download-btn-pdf group"
              >
                <div class="flex items-center justify-center mb-3">
                  <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <span class="text-lg font-semibold mb-1">Download as PDF</span>
                <span class="text-xs text-gray-400">Portable Document Format</span>
              </button>

              <!-- Download as Image -->
              <button
                  @click="downloadAsImage"
                  class="download-btn download-btn-image group"
              >
                <div class="flex items-center justify-center mb-3">
                  <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span class="text-lg font-semibold mb-1">Download as Image</span>
                <span class="text-xs text-gray-400">JPEG Format</span>
              </button>
            </div>

            <!-- Document Info Card -->
            <div class="document-info-card">
              <h4 class="font-semibold mb-3 text-gray-300">Document Information</h4>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-400">Document Type:</span>
                  <span class="text-white font-medium">{{ currentDocument.category }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-400">Last Updated:</span>
                  <span class="text-white font-medium">{{ currentDocument.lastUpdated }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-400">Format:</span>
                  <span class="text-white font-medium">PDF / Image</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* Animations */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-down {
  from {
    max-height: 0;
    opacity: 0;
  }
  to {
    max-height: 500px;
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}

.animate-slide-up {
  animation: slide-up 0.6s ease-out;
}

/* Preloader */
.loader {
  width: 50px;
  height: 50px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top: 3px solid #ffffff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* Sidebar Styles */
.sidebar {
  @apply fixed top-0 left-0 h-full w-80 bg-black bg-opacity-95 backdrop-blur-md z-40 transform -translate-x-full transition-transform duration-300 ease-in-out flex flex-col;
}

.sidebar-open {
  @apply translate-x-0;
}

@media (min-width: 1024px) {
  .sidebar {
    @apply translate-x-0 w-72;
  }

  .main-content {
    @apply ml-72;
  }
}

.sidebar-nav {
  @apply flex-1 p-8 overflow-y-auto;
}

.nav-link {
  @apply flex py-3 px-4 text-gray-300 hover:text-white hover:bg-gray-800 hover:border hover:border-white rounded-lg transition-all duration-300 transform hover:translate-x-2;
}

.nav-link.active {
  @apply text-black font-[700] bg-gray-400;
}

/* Improved Dropdown Animations */
.dropdown-container {
  @apply overflow-hidden transition-all duration-500 ease-in-out;
  max-height: 0;
  opacity: 0;
}

.dropdown-container.dropdown-open {
  max-height: 500px;
  opacity: 1;
  @apply mt-2;
}

.dropdown-content {
  @apply ml-8 space-y-1;
}

.sub-nav-link {
  @apply block py-2 px-4 text-gray-400 text-sm hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200;
}

.sub-nav-link.active {
  @apply text-black font-[700] bg-gray-400;
}

.sidebar-footer {
  @apply p-8 border-t border-gray-800;
}

.social-link {
  @apply text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110;
}

/* Main Content */
.main-content {
  @apply min-h-screen;
}

/* Document Viewer */
.document-viewer-container {
  @apply grid lg:grid-cols-3 gap-6;
}

.document-display {
  @apply lg:col-span-2 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-4 md:p-6 border border-gray-700 shadow-2xl;
}

.document-frame {
  @apply w-full bg-white rounded-lg overflow-hidden shadow-xl;
  height: 70vh;
  min-height: 500px;
}

.download-section {
  @apply lg:col-span-1 space-y-6;
}

.download-buttons {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4;
}

.download-btn {
  @apply flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 hover:shadow-xl cursor-pointer;
}

.download-btn-pdf {
  @apply bg-gradient-to-br from-red-900/30 to-red-800/30 border-red-700 hover:border-red-500 hover:shadow-red-500/20;
}

.download-btn-pdf:hover {
  @apply from-red-900/50 to-red-800/50;
}

.download-btn-image {
  @apply bg-gradient-to-br from-green-900/30 to-green-800/30 border-green-700 hover:border-green-500 hover:shadow-green-500/20;
}

.download-btn-image:hover {
  @apply from-green-900/50 to-green-800/50;
}

.document-info-card {
  @apply bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700;
}

/* Responsive */
@media (max-width: 768px) {
  .sidebar {
    @apply w-full;
  }

  .sidebar-header {
    @apply p-6;
  }

  .sidebar-nav {
    @apply p-6;
  }

  .sidebar-footer {
    @apply p-6;
  }

  .document-frame {
    height: 50vh;
    min-height: 400px;
  }
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}
</style>