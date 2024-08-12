<template>
  <component :is="props.tag" :class="computedClass" :style="computedStyle"></component>
</template>

<script setup lang="ts">
import initializationOfNumericalUnits from "@/utils/initializationOfNumericalUnits";
import { computed } from "vue";

const props = defineProps({
  name: {
    type: String
  },
  color: {
    type: String,
    default: "inherit"
  },
  size: {
    type: [String, Number],
    default: "inherit"
  },
  classPrefix: {
    type: String,
    default: "jsl-icon"
  },
  tag: {
    type: String,
    default: "i"
  }
});

const computedClass = computed(() => {
  return [
    props.classPrefix,
    props.name
  ];
});

const computedStyle = computed(() => {
  return [
    `color:${props.color};`,
    props.size == `font-size:${initializationOfNumericalUnits(props.size)};`,
  ];
});
</script>
<script lang="ts">
export default { name: "JslIcon" };
</script>
<style scoped lang="less"></style>