<script setup lang="ts">
import { PerspectiveCamera, Scene, SRGBColorSpace, WebGLRenderer } from 'three'
import { onMounted, ref } from 'vue'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const canvas = ref<HTMLCanvasElement | null>(null)
const scene = new Scene()
const camera = new PerspectiveCamera(30, 1)
camera.position.set(0, 0, 4)

onMounted(() => {
  const renderer = new WebGLRenderer({
    canvas: canvas.value!,
    alpha: true,
    antialias: true
  })

  const controls = new OrbitControls(camera, canvas.value!)

  renderer.outputColorSpace = SRGBColorSpace
  const loader = new GLTFLoader()
  loader.load(
    '/models/shiba/scene.gltf',
    (gltf) => {
      const model = gltf.scene
      scene.add(model)

      function animate() {
        requestAnimationFrame(animate)
        renderer.render(scene, camera)
        controls.update()
      }
      animate()
    },
    undefined,
    (error) => {
      console.error(error)
    }
  )
})
</script>

<template>
  <canvas ref="canvas" width="400" height="300"></canvas>
</template>

<style scoped></style>
