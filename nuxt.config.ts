export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    modules: [
        '@nuxtjs/tailwindcss',
        ['@pinia/nuxt', { autoImports: ['defineStore', 'acceptHMRUpdate'] }]
    ],
    imports: {
        dirs: ['stores']
    },

    // Build configuration for Three.js
    build: {
        transpile: ['three']
    },

    // App configuration for globe styling
    app: {
        head: {
            title: 'Interactive 3D Globe',
            meta: [
                { name: 'description', content: 'Experience stunning 3D globe visualization' }
            ],
        }
    },

    // Vite configuration for Three.js optimization
    vite: {
        optimizeDeps: {
            include: ['three', 'three/examples/jsm/controls/OrbitControls.js']
        },
        ssr: {
            noExternal: ['three']
        }
    }
})