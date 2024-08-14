<template>
  <form>
    <slot></slot>
  </form>
</template>

<script setup lang="ts">
import { PropType, provide } from "vue";
const props = defineProps({
  labelWidth: {
    type: [Number, String],
    default: "6.2em"
  },
  labelAlign: {
    type: String as PropType<"center" | "right" | "left">,
    default: "left"
  },
  labelPosition: {
    type: String as PropType<"right" | "top" | "left">,
  },
  errorMessageAlign: {
    type: String as PropType<"center" | "right" | "left">,
    default: "left"
  },
  validateTrigger: {
    type: [String, Array] as PropType<"onChange" | "onSubmit" | "onBlur" | ("onChange" | "onSubmit" | "onBlur")[]>,
    default: "onBlur"
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  required: {
    type: [Boolean, String] as PropType<boolean | "auto">
  },
  validateFirst: {
    type: Boolean,
    default: false
  },
  scrollToError: {
    type: Boolean,
    default: false
  },
  showError: {
    type: Boolean,
    default: false
  },
  showErrorMessage: {
    type: Boolean,
    default: true
  },
  submitOnEnter: {
    type: Boolean,
    default: true
  }
});
provide("formConfig", props);
const emits = defineEmits(["submit", "failed"]);
</script>
<script lang="ts">
export default { name: "JslForm" };
</script>
<style scoped lang="less"></style>