import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export interface GalleryImage {

    id: number

    url: string

    title: string

    category: 'portrait' | 'landscape' | 'architecture' | 'nature'

    photographer: string

    description: string
}

export const useGalleryStore = defineStore('gallery', () => {
    // State
    const images = ref<GalleryImage[]>([
        // Portraits
        {
            id: 1,
            url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Golden Hour Portrait',
            category: 'portrait',
            photographer: 'Sahed Hasan',
            description: 'Beautiful golden hour portrait session capturing natural beauty'
        },
        {
            id: 2,
            url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Urban Portrait',
            category: 'portrait',
            photographer: 'Sahed Hasan',
            description: 'Street style portrait with urban background'
        },
        {
            id: 3,
            url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Professional Headshot',
            category: 'portrait',
            photographer: 'Sahed Hasan',
            description: 'Clean professional headshot with studio lighting'
        },
        {
            id: 4,
            url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Creative Portrait',
            category: 'portrait',
            photographer: 'Sahed Hasan',
            description: 'Artistic portrait with creative lighting setup'
        },
        {
            id: 5,
            url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Natural Light Portrait',
            category: 'portrait',
            photographer: 'Sahed Hasan',
            description: 'Soft natural light portrait session'
        },
        {
            id: 6,
            url: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Fashion Portrait',
            category: 'portrait',
            photographer: 'Sahed Hasan',
            description: 'High fashion portrait with dramatic styling'
        },
        {
            id: 7,
            url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Business Portrait',
            category: 'portrait',
            photographer: 'Sahed Hasan',
            description: 'Professional business portrait session'
        },
        {
            id: 8,
            url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Artistic Portrait',
            category: 'portrait',
            photographer: 'Sahed Hasan',
            description: 'Creative artistic portrait with unique composition'
        },

        // Landscapes
        {
            id: 9,
            url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Mountain Vista',
            category: 'landscape',
            photographer: 'Sahed Hasan',
            description: 'Breathtaking mountain landscape at golden hour'
        },
        {
            id: 10,
            url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Lake Reflection',
            category: 'landscape',
            photographer: 'Sahed Hasan',
            description: 'Serene lake with perfect mountain reflections'
        },
        {
            id: 11,
            url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Sunset Valley',
            category: 'landscape',
            photographer: 'Sahed Hasan',
            description: 'Dramatic sunset over rolling hills and valleys'
        },
        {
            id: 12,
            url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Forest Path',
            category: 'landscape',
            photographer: 'Sahed Hasan',
            description: 'Mystical forest path with filtered sunlight'
        },
        {
            id: 13,
            url: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Ocean Waves',
            category: 'landscape',
            photographer: 'Sahed Hasan',
            description: 'Powerful ocean waves crashing against rocks'
        },
        {
            id: 14,
            url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Desert Dunes',
            category: 'landscape',
            photographer: 'Sahed Hasan',
            description: 'Golden sand dunes in the desert landscape'
        },

        // Architecture
        {
            id: 15,
            url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Modern Skyscraper',
            category: 'architecture',
            photographer: 'Sahed Hasan',
            description: 'Contemporary glass skyscraper reaching for the sky'
        },
        {
            id: 16,
            url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Glass Facade',
            category: 'architecture',
            photographer: 'Sahed Hasan',
            description: 'Geometric patterns in modern glass architecture'
        },
        {
            id: 17,
            url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Historic Building',
            category: 'architecture',
            photographer: 'Sahed Hasan',
            description: 'Beautiful historic architecture with intricate details'
        },
        {
            id: 18,
            url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Bridge Structure',
            category: 'architecture',
            photographer: 'Sahed Hasan',
            description: 'Impressive bridge engineering and design'
        },
        {
            id: 19,
            url: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Urban Geometry',
            category: 'architecture',
            photographer: 'Sahed Hasan',
            description: 'Abstract architectural lines and shapes'
        },

        // Nature
        {
            id: 20,
            url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Wildflowers',
            category: 'nature',
            photographer: 'Sahed Hasan',
            description: 'Colorful wildflowers in natural meadow'
        },
        {
            id: 21,
            url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Tree Silhouette',
            category: 'nature',
            photographer: 'Sahed Hasan',
            description: 'Dramatic tree silhouette against sunset sky'
        },
        {
            id: 22,
            url: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Water Drops',
            category: 'nature',
            photographer: 'Sahed Hasan',
            description: 'Macro photography of water drops on leaves'
        },
        {
            id: 23,
            url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Bird Flight',
            category: 'nature',
            photographer: 'Sahed Hasan',
            description: 'Birds in flight captured at perfect moment'
        },
        {
            id: 24,
            url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Autumn Leaves',
            category: 'nature',
            photographer: 'Sahed Hasan',
            description: 'Beautiful autumn foliage in vibrant colors'
        }
    ])

    // Getters
    const allImages = computed(() => images.value)

    const imagesByCategory = computed(() => {
        return (category: string) => {
            if (category === 'all') return images.value
            return images.value.filter(img => img.category === category)
        }
    })

    const imageById = computed(() => {
        return (id: number) => {
            return images.value.find(img => img.id === id)
        }
    })

    // Actions
    const searchImages = (searchTerm: string, category: string = 'all'): GalleryImage[] => {
        let filtered = images.value

        if (category !== 'all') {
            filtered = filtered.filter(img => img.category === category)
        }

        if (searchTerm) {
            const lowerSearchTerm = searchTerm.toLowerCase()
            filtered = filtered.filter(img =>
                img.title.toLowerCase().includes(lowerSearchTerm) ||
                img.description.toLowerCase().includes(lowerSearchTerm)
            )
        }

        return filtered
    }

    const addImage = (image: GalleryImage) => {
        images.value.push(image)
    }

    const removeImage = (id: number) => {
        const index = images.value.findIndex(img => img.id === id)
        if (index > -1) {
            images.value.splice(index, 1)
        }
    }

    const updateImage = (id: number, updatedImage: Partial<GalleryImage>) => {
        const index = images.value.findIndex(img => img.id === id)
        if (index > -1) {
            images.value[index] = {
                ...images.value[index],
                ...updatedImage
            } as GalleryImage
        }
    }

    return {
        // State
        images,
        // Getters
        allImages,
        imagesByCategory,
        imageById,
        // Actions
        searchImages,
        addImage,
        removeImage,
        updateImage
    }
})