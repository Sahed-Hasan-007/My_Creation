<template>
  <div ref="mountRef" class="fixed top-0 left-0 w-full h-full z-0">
    <div
        v-if="showHint"
        class="absolute bottom-4 right-4 bg-black bg-opacity-30 text-white text-sm px-3 py-1 rounded-full transition-opacity duration-1000 opacity-80 hover:opacity-100"
    >
      Drag to explore
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// Three.js types and imports will be handled dynamically
let THREE: any
let OrbitControls: any

const mountRef = ref<HTMLDivElement>()
const isHighResLoaded = ref(false)
const showHint = ref(true)

let scene: any
let camera: any
let renderer: any
let controls: any
let animationId: number
let hintTimer: NodeJS.Timeout

onMounted(async () => {
  if (!mountRef.value) return

  // Dynamically import Three.js to avoid SSR issues
  THREE = await import('three')

  // Import OrbitControls separately
  const { OrbitControls: OrbitControlsClass } = await import('three/examples/jsm/controls/OrbitControls.js')
  OrbitControls = OrbitControlsClass

  initializeScene()
})

onUnmounted(() => {
  cleanup()
})

function initializeScene() {
  if (!mountRef.value) return

  // Create scene, camera, and renderer
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  mountRef.value.appendChild(renderer.domElement)

  // Create a starfield
  const starsGeometry = new THREE.BufferGeometry()
  const starsCount = 10000
  const positions = new Float32Array(starsCount * 3)
  for (let i = 0; i < starsCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 2000
    positions[i * 3 + 1] = (Math.random() - 0.5) * 2000
    positions[i * 3 + 2] = (Math.random() - 0.5) * 2000
  }
  starsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
  const starsMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.7,
    sizeAttenuation: true,
  })
  const stars = new THREE.Points(starsGeometry, starsMaterial)
  scene.add(stars)

  // Create an atmospheric glow using a custom shader
  const atmosphereVertexShader = `
    varying vec3 vNormal;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `
  const atmosphereFragmentShader = `
    uniform vec3 glowColor;
    varying vec3 vNormal;
    void main() {
      float intensity = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
      gl_FragColor = vec4(glowColor, 1.0) * intensity;
    }
  `
  const atmosphereGeometry = new THREE.SphereGeometry(5.2, 32, 32)
  const atmosphereMaterial = new THREE.ShaderMaterial({
    vertexShader: atmosphereVertexShader,
    fragmentShader: atmosphereFragmentShader,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
    transparent: true,
    uniforms: {
      glowColor: { value: new THREE.Color(0x3a86ff) },
    },
  })
  const atmosphereMesh = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial)
  scene.add(atmosphereMesh)

  // Create wireframe globe
  const wireframeGeometry = new THREE.SphereGeometry(5, 32, 32)
  const wireframeMaterial = new THREE.MeshBasicMaterial({
    color: 0x3a86ff,
    wireframe: true,
    transparent: true,
    opacity: 0.5,
  })
  const wireframeGlobe = new THREE.Mesh(wireframeGeometry, wireframeMaterial)
  scene.add(wireframeGlobe)

  // Create solid globe (initially invisible)
  const solidGeometry = new THREE.SphereGeometry(4.9, 64, 64)
  const solidMaterial = new THREE.MeshPhongMaterial({
    color: 0x1a237e,
    transparent: true,
    opacity: 0,
  })
  const solidGlobe = new THREE.Mesh(solidGeometry, solidMaterial)
  scene.add(solidGlobe)

  // Add ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)

  // Add point light
  const pointLight = new THREE.PointLight(0xffffff, 1)
  pointLight.position.set(10, 10, 10)
  scene.add(pointLight)

  camera.position.z = 10

  // Initialize OrbitControls
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  controls.rotateSpeed = 0.5
  controls.enableZoom = false
  controls.enablePan = false
  controls.autoRotate = false

  const colors = [
    new THREE.Color(0x3a86ff), // Blue
    new THREE.Color(0x8338ec), // Purple
    new THREE.Color(0xff006e), // Pink
    new THREE.Color(0xfb5607), // Orange
    new THREE.Color(0xffbe0b), // Yellow
  ]
  let colorIndex = 0
  let nextColorIndex = 1
  let colorT = 0
  const colorTransitionSpeed = 0.005

  const lerpColor = (a: any, b: any, t: number) => {
    const color = new THREE.Color()
    color.r = a.r + (b.r - a.r) * t
    color.g = a.g + (b.g - a.g) * t
    color.b = a.b + (b.b - a.b) * t
    return color
  }

  const animate = () => {
    animationId = requestAnimationFrame(animate)

    // Color transition logic
    colorT += colorTransitionSpeed
    if (colorT >= 1) {
      colorT = 0
      colorIndex = nextColorIndex
      nextColorIndex = (nextColorIndex + 1) % colors.length
    }

    const currentColor = lerpColor(colors[colorIndex], colors[nextColorIndex], colorT)

    // Update materials with new color
    if (wireframeGlobe.material instanceof THREE.MeshBasicMaterial) {
      wireframeGlobe.material.color = currentColor
    }
    if (solidGlobe.material instanceof THREE.MeshPhongMaterial) {
      solidGlobe.material.color = currentColor
    }
    if (atmosphereMesh.material instanceof THREE.ShaderMaterial) {
      atmosphereMesh.material.uniforms.glowColor.value = currentColor
    }

    // Rotate the globes, atmosphere, and starfield for dynamic effect
    wireframeGlobe.rotation.y += 0.001
    solidGlobe.rotation.y += 0.001
    atmosphereMesh.rotation.y += 0.0005
    stars.rotation.y += 0.0001
    controls.update()
    renderer.render(scene, camera)
  }
  animate()

  // Load high-resolution textures (optional - you can add these later)
  // You'll need to add these texture files to your public folder
  /*
  const textureLoader = new THREE.TextureLoader()
  const loadTexture = (url: string) =>
    new Promise((resolve) => {
      textureLoader.load(url, (texture) => resolve(texture))
    })

  Promise.all([
    loadTexture("/earth-texture-compressed.jpg"),
    loadTexture("/earth-bump-compressed.jpg"),
    loadTexture("/earth-specular-compressed.jpg"),
  ]).then(([texture, bumpMap, specularMap]) => {
    const highResMaterial = new THREE.MeshPhongMaterial({
      map: texture as THREE.Texture,
      bumpMap: bumpMap as THREE.Texture,
      bumpScale: 0.05,
      specularMap: specularMap as THREE.Texture,
      specular: new THREE.Color("grey"),
    })

    // Transition to the high-res textured globe
    const transitionDuration = 1 // seconds
    const startTime = Date.now()

    const transitionToHighRes = () => {
      const elapsedTime = (Date.now() - startTime) / 1000
      const progress = Math.min(elapsedTime / transitionDuration, 1)

      solidGlobe.material = highResMaterial
      solidGlobe.material.opacity = progress
      wireframeMaterial.opacity = 0.5 * (1 - progress)

      if (progress < 1) {
        requestAnimationFrame(transitionToHighRes)
      } else {
        isHighResLoaded.value = true
        scene.remove(wireframeGlobe)
      }
      renderer.render(scene, camera)
    }

    transitionToHighRes()
  })
  */

  const handleResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
  window.addEventListener("resize", handleResize)

  hintTimer = setTimeout(() => {
    showHint.value = false
  }, 3000) // Hide hint after 3 seconds
}

function cleanup() {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  if (controls) {
    controls.dispose()
  }
  if (renderer && mountRef.value && renderer.domElement.parentNode) {
    renderer.domElement.parentNode.removeChild(renderer.domElement)
    renderer.dispose()
  }
  if (hintTimer) {
    clearTimeout(hintTimer)
  }
  window.removeEventListener("resize", handleResize)
}
</script>

<style scoped>
/* Component-specific styles */
div {
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>