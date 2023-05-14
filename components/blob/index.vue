<script setup lang="ts">
import { Scene, PerspectiveCamera, Mesh, WebGLRenderer, IcosahedronGeometry, ShaderMaterial, MathUtils } from 'three'
import { Ref } from 'vue'
import { useWindowSize } from '@vueuse/core'
import fragmentShader from './fragment-shader';
import vertexShader from './vertex-shader';

const props = defineProps({
  unstable: { type: Boolean, required: true },
  size: {type: Number, required: true},
  increasingSize: {type: Boolean, required: true}
} )

let renderer: WebGLRenderer
const blob: Ref<HTMLCanvasElement | null> = ref(null)
  let time = 0;

const { width, height } = useWindowSize()
const aspectRatio = computed(() => width.value / height.value)

const scene = new Scene()

const uniforms = {
  'u_time': { value: 0 },
  'u_intensity': { value: 0.3 },
  'u_size': { value: 1 }
};

const camera = new PerspectiveCamera(props.size, aspectRatio.value, 0.1, 1000)
camera.position.set(0, 0, 4)

scene.add(camera)

const sphere = new Mesh(new IcosahedronGeometry(1, 15), new ShaderMaterial({ vertexShader: vertexShader, fragmentShader: fragmentShader, uniforms:uniforms }))

scene.add(sphere)

function updateCamera() {
  camera.aspect = aspectRatio.value
  camera.updateProjectionMatrix()
}

function updateRenderer() {
  renderer.setSize(width.value, height.value)
  sphere.scale.set(uniforms.u_size.value, uniforms.u_size.value, 0.0)
  renderer.render(scene, camera)
}

function setRenderer() {
  if (blob.value) {
    renderer = new WebGLRenderer({ canvas: blob.value, antialias:true, alpha:true })
    updateRenderer()
  }
}

watch(aspectRatio, () => {
  updateCamera()
  updateRenderer()
})

onMounted(() => {
  setRenderer()
  loop()
})

const loop = () => {
 uniforms.u_time.value =
        0.4 * time;
        time = time + 0.0025;

        uniforms.u_intensity.value = MathUtils.lerp(
        uniforms.u_intensity.value,
        props.unstable ? 0.07 : 0.05,
        0.02
      );

  if (props.increasingSize) {
    uniforms.u_size.value = MathUtils.lerp(
      uniforms.u_size.value,
      10,
      0.02
    )
  } else {
    if (props.unstable) {
      uniforms.u_size.value = MathUtils.lerp(
      uniforms.u_size.value,
      1.8,
      0.005
    )
    } else {
      uniforms.u_size.value = MathUtils.lerp(
      uniforms.u_size.value,
      1,
      0.04
    )
    }
  }
  updateRenderer()
  requestAnimationFrame(loop)
}
</script>
<template>
  <canvas ref="blob" />
</template>
