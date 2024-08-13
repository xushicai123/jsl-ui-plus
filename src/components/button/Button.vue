<template>
  <button class="jsl-button" :class="computedClass" :style="computedStyle" @click="click" @touchstart="touchstart">
    <slot name="loading" v-if="loading">
      <LoadingIcon color="currentColor" class="jsl-button-loading" :size="props.loadingSize" :type="props.loadingType">
        <template v-if="props.loadingText && false">
          {{ props.loadingText }}
        </template>
      </LoadingIcon>
    </slot>
    <slot v-else></slot>
  </button>
</template>

<script setup lang="ts">
import { PropType, computed } from "vue";
import LoadingIcon from "../loading-icon/LoadingIcon.vue";
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
    type: Boolean,
    default: false
  },
  round: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: ""
  },
  loading: {
    type: Boolean,
    default: false
  },
  loadingText: {
    type: String
  },
  loadingType: {
    type: String as PropType<"spinner" | "circular">,
    default: "circular"
  },
  loadingSize: {
    type: [String, Number],
    default: "var(--jsl-button-loading-icon-size)"
  }
});
const emit = defineEmits(["click", "touchstart"]);
const click = () => {
  if (props.disabled) return;
  emit("click");
};
const touchstart = () => {
  if (props.disabled) return;
  emit("touchstart");
};

const computedClass = computed(() => {
  return [
    `jsl-button--${props.size}`,
    `jsl-button--${props.type}`,
    props.plain ? "jsl-button--plain" : "",
    props.round ? "jsl-button--round" : "",
    props.color ? "jsl-button--color" : "",
    props.disabled ? "jsl-button--disabled" : "",
    props.loading ? "jsl-button--loading" : "",
  ];
});
const computedStyle = computed(() => {
  return props.color ? `--jsl-customize-button-color:${props.color}` : "";
});
</script>

<script lang="ts">
export default { name: "JslButton" };
</script>
<style scoped lang="less" src="./index.less"></style>