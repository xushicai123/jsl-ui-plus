<template>
  <button class="jsl-button" :class="computedClass" :style="computedStyle" @click="click"
    @touchstart="touchstart">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { PropType ,computed } from 'vue';
const props = defineProps({
  size: {
    type: String as PropType<"large" | "normal" | "small" | "mini">,
    default: "normal"
  },
  type: {
    type: String as PropType<"primary" | "success" | "warning" | "danger" | "default">,
    default: "default"
  },
  plain: {
    type: Boolean
  },
  round: {
    type: Boolean
  },
  disabled: {
    type: Boolean
  },
  color: {
    type: String
  }
})
const emit = defineEmits(["click", "touchstart"])
const click = () => {
  if (props.disabled) return
  emit("click");
}
const touchstart = () => {
  if (props.disabled) return
  emit("touchstart");
}

const computedClass = computed(()=>{
  return `
    jsl-button--${props.size} 
    jsl-button--${props.type} 
    ${props.plain ? 'jsl-button--plain' : ''}
    ${props.round ? 'jsl-button--round' : ''}
    ${props.color ? 'jsl-button--color' : ''}
    ${props.disabled ? 'jsl-button--disabled' : ''}
  `
})
const computedStyle = computed(()=>{
  return props.color ? `--jsl-customize-button-color:${props.color}` : ''
})
</script>

<script lang="ts">export default { name: "JslButton" }</script>
<style scoped lang="less" src="./index.less"></style>