<script setup lang="ts">
import { useBlobStore } from '@/store/blob';

const store = useBlobStore()

const getElementPosition = (index: number, length: number):string => {
    const rotation = (360/length)*index;

    return `transform: rotate(${rotation}deg) translate(32vmin) rotate(-${rotation}deg);`;
}

const handleOnHoverEnter = () => {
    store.setHover(true);
}

const handleOnHoverLeave = () => {
    store.setHover(false);
}

const handleClick = () => {
    store.setClicked(true);
}
</script>

<template>
    <div id="circular-list">
        <castle-icon :style="getElementPosition(6,8)" @mouseenter="handleOnHoverEnter" @mouseleave="handleOnHoverLeave" @click="handleClick"/>
        <leaf-icon :style="getElementPosition(1,8)"/>

    </div>

</template>

<style scoped>
#circular-list {
    display: flex;
    justify-content: center;
    align-items: center;
}

#castle-icon {
    margin-bottom: 0.5em;
}

svg {
    height: 8vmin;
    width: 8vmin;
    position: absolute;
    transition: all 0.5s ease;
    opacity: 0.6;

    z-index: 5000;
}

#circular-list:hover > svg:hover {
    cursor: pointer;
    filter: drop-shadow( 0 0 0.2em var(--color-accent2)) drop-shadow( 0 0 0.1em var(--color-primary));
    opacity: 1;
}
</style>
