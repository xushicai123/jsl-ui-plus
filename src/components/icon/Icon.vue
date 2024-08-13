<template>
  <img :src="props.name" v-if="isImg" class="jsl-icon-image" :style="computedStyle" />
  <component v-else :is="props.tag" :class="computedClass" :style="computedStyle"></component>
</template>

<script setup lang="ts">
import initializationOfNumericalUnits from "@/utils/initializationOfNumericalUnits";
import { computed } from "vue";

const props = defineProps({
  name: {
    type: String
  },
  color: {
    type: String, //inherit
  },
  size: {
    type: [String, Number], //inherit
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

const isImg = computed(() => props.name?.startsWith("http"));

const computedClass = computed(() => {
  return [
    props.classPrefix,
    isImg.value ? "" : props.name
  ];
});

const computedStyle = computed(() => {
  return [
    props.color ? `color:${props.color};` : "",
    props.size ? `font-size:${initializationOfNumericalUnits(props.size)};` : "",
  ];
});
</script>
<script lang="ts">
export default { name: "JslIcon" };
</script>
<style scoped lang="less" src="./index.less"></style>