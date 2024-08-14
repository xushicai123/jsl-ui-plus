<template>
  <div class="jsl-form-item" :class="computedClass">
    <div class="jsl-form-item-label" v-if="props.label || $slots.label" :style="computedStyleLabel">
      <slot name="label">
        <span v-if="label">{{ label }}</span>
      </slot>
    </div>
    <div class="jsl-form-item-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, PropType } from "vue";
import { FormProps } from "../form";
import firstDefined from "@/utils/firstDefined";

const config = inject<FormProps>("formConfig");
const props = defineProps({
  label: {
    type: String
  },
  labelPosition: {
    type: String as PropType<"right" | "top" | "left">
  },
  labelWidth: {
    type: [Number, String]
  },
  labelAlign: {
    type: String as PropType<"center" | "right" | "left">,
  },
  required: {
    type: [Boolean, String] as PropType<boolean | "auto">
  },
  rules: {},
  validateTrigger: {
    type: [String, Array] as PropType<"onChange" | "onSubmit" | "onBlur" | ("onChange" | "onSubmit" | "onBlur")[]>
  },
  validateFirst: {
    type: Boolean,
  },
  name: {
    type: String
  },
  errorMessage: {
    type: Boolean
  },
  showError: {
    type: Boolean
  },
  showErrorMessage: {
    type: Boolean
  }
});
const computedClass = computed(() => {
  return [
    `jsl-form-item-${firstDefined(props.labelPosition, config?.labelPosition, "left")}`
  ];
});
const computedStyleLabel = computed(() => {
  return [
    firstDefined(props.labelAlign, config?.labelAlign) ? `text-align: ${firstDefined(props.labelAlign, config?.labelAlign)};` : ""
  ];
});
</script>
<script lang="ts">
export default { name: "JslFormItem" };
</script>
<style scoped lang="less" src="./index.less"></style>