import { defineStore } from 'pinia'

export const useBlobStore = defineStore('counter', () => {
  const isHover = ref<boolean>(false)
  const isClicked = ref<boolean>(false)

  function setHover(newValue: boolean):void {
    isHover.value = newValue
  }

  function setClicked(newValue: boolean):void {
    isClicked.value = newValue
  }

  return { isHover, isClicked, setHover, setClicked }
})
