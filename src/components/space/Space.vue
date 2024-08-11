<template>
  <div class="jsl-space" :class="{ 'jsl-space-fill': props.fill }" :style="computedStyle">
    <div class="jsl-space-content jsl-flex" :class="computedClass">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import initializationOfNumericalUnits from "@/utils/initializationOfNumericalUnits";
import { PropType, computed } from "vue";
const props = defineProps({
  // 子元素排列方向
  direction: {
    type: String as PropType<"column" | "column-reverse" | "row" | "row-reverse">,
    default: "horizontal"
  },
  colSize: {
    type: [Number, String],
    default: "8px"
  },
  rowSize: {
    type: [Number, String],
    default: "8px"
  },
  align: {
    type: String as PropType<"start" | "end" | "center" | "baseline" | "stretch">,
    default: "stretch"
  },
  wrap: {
    type: Boolean,
    default: false
  },
  fill: {
    type: Boolean,
    default: false
  }
});
const computedClass = computed(() => {
  return [
    `jsl-flex-direction-${props.direction}`,
    `jsl-align-items-${props.align}`,
    props.wrap ? "jsl-flex-warp" : "",
  ];
});

const computedStyle = computed(() => {
  return {
    "--jsl-col-size": initializationOfNumericalUnits(props.colSize),
    "--jsl-row-size": initializationOfNumericalUnits(props.rowSize)
  };
});
</script>
<script lang="ts">
export default { name: "JslSpace" };
</script>
<style scoped lang="less" src="./index.less"></style>