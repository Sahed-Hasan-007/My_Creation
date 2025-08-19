export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    modules: [
        '@nuxtjs/tailwindcss',
        ['@pinia/nuxt', { autoImports: ['defineStore', 'acceptHMRUpdate'] }]
    ],
    imports: {
        dirs: ['stores']
    }
})