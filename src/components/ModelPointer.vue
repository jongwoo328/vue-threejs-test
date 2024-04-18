<script setup lang="ts">
import {
  PerspectiveCamera,
  Plane,
  Raycaster,
  Scene,
  SRGBColorSpace,
  Vector2,
  Vector3,
  WebGLRenderer
} from 'three'
import { onMounted, ref, onBeforeUnmount } from 'vue'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const canvas = ref<HTMLCanvasElement | null>(null)
const scene = new Scene()
const camera = new PerspectiveCamera(70, 1)
camera.position.set(0, 0, 4)

const mouse = new Vector2()
const raycaster = new Raycaster()
const plane = new Plane(new Vector3(1, 0, 3), -2)
const pointOfIntersection = new Vector3()
const abortController = new AbortController()
const signal = abortController.signal

onMounted(() => {
  const renderer = new WebGLRenderer({
    canvas: canvas.value!,
    alpha: true,
    antialias: true
  })

  renderer.outputColorSpace = SRGBColorSpace
  const loader = new GLTFLoader()
  loader.load(
    '/models/shiba/scene.gltf',
    (gltf) => {
      const model = gltf.scene
      scene.add(model)

      function onMouseMove(e) {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
        raycaster.setFromCamera(mouse, camera)
        raycaster.ray.intersectPlane(plane, pointOfIntersection)
        model.lookAt(pointOfIntersection)
      }

      document.body.addEventListener('mousemove', onMouseMove, { signal })

      renderer.setAnimationLoop(() => {
        renderer.render(scene, camera)
      })
    },
    undefined,
    (error) => {
      console.error(error)
    }
  )
})

onBeforeUnmount(() => {
  abortController.abort()
})
</script>

<template>
  <canvas ref="canvas" width="700" height="700"></canvas>
</template>

<style scoped></style>
