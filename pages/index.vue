<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useBlobStore } from '~/store/blob';

const clicked = ref(false);

const { isHover, isClicked } = storeToRefs(useBlobStore())

</script>
<template>
  <main>
    <summoning-circle/>
    <circular-list/>
    <ClientOnly>
        <blob :unstable="isHover" :size="100" :increasing-size="isClicked"/>
    </ClientOnly>
</main>
</template>

<style lang="scss" scoped>
@use '@/styles/main.scss';
</style>