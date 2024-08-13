<template>
  <div class="jsl-loading-icon-box" :class="{ 'jsl-loading-icon-box-vertical': props.vertical }">
    <div class="jsl-loading-icon" :style="computedStyle">
      <svg class="jsl-loading-icon-svg jsl-loading-icon-circular" viewBox="25 25 50 50"
        v-if="props.type === 'circular'">
        <circle cx="50" cy="50" r="20" fill="none" class="jsl-loading-circular"></circle>
      </svg>
      <div class="jsl-loading-icon-svg jsl-loading-icon-spinner" v-if="props.type === 'spinner'">
        <span class="jsl-loading-icon-spinner-line" v-for="item in 12" :key="item"
          :style="`transform: rotate(${360 / 12 * item}deg); opacity: ${1 - 0.6 / 12 * item};`"></span>
      </div>
    </div>
    <div v-if="$slots.default && $slots.default.length > 0" class="jsl-loading-text" :style="computedTextStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import initializationOfNumericalUnits from "@/utils/initializationOfNumericalUnits";
import { computed, PropType } from "vue";

const props = defineProps({
  color: {
    type: String
  },
  type: {
    type: String as PropType<"spinner" | "circular">,
    default: "circular"
  },
  size: {
    type: [String, Number]
  },
  textSize: {
    type: [String, Number]
  },
  textColor: {
    type: String
  },
  vertical: {
    type: Boolean,
    default: false
  }
});
const computedStyle = computed(() => {
  return [
    props.color ? `color:${props.color};` : "",
    props.size ? `width:${initializationOfNumericalUnits(props.size)};height:${initializationOfNumericalUnits(props.size)};` : "",
  ];
});
const computedTextStyle = computed(() => {
  return [
    props.textColor ? `color:${props.textColor};` : "",
    props.textSize ? `font-size:${initializationOfNumericalUnits(props.textSize)};` : "",
  ];
});

</script>
<script lang="ts">
export default { name: "JslLoadingIcon" };
</script>
<style scoped lang="less" src="./index.less"></style>