<template>
  <div class="jsl-form-item" :class="computedClass">
    <div class="jsl-form-item-label" v-if="props.label || $slots.label" :style="computedStyleLabel">
      <span class="jsl-form-item-required" v-if="isRequire">*</span>
      <slot name="label">
        <span v-if="label">{{ label }}</span>
      </slot>
    </div>
    <div class="jsl-form-item-content">
      <slot></slot>
      <div class="jsl-form-item-error">{{ errorRule?.message }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted, PropType, provide, Ref, ref } from "vue";
import { FormItemInject, FormProps, FormRule } from "../form";
import firstDefined from "@/utils/firstDefined";
import initializationOfNumericalUnits from "@/utils/initializationOfNumericalUnits";
const formItemId = Symbol();
const config = inject<FormProps>("formConfig");
const addFormItem = inject<(data: FormItemInject) => void>("addFormItem");
const deletFormItem = inject<(data: FormItemInject) => void>("deletFormItem");

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
    type: Boolean,
    default: undefined
  },
  rules: {
    type: Array as PropType<FormRule[]>,
    default: () => []
  },
  validateTrigger: {
    type: [String, Array] as PropType<"onChange" | "onSubmit" | "onBlur" | ("onChange" | "onSubmit" | "onBlur")[]>
  },
  name: {
    type: String
  },
  errorMessage: {
    type: Boolean,
    default: undefined
  },
  showError: {
    type: Boolean,
    default: undefined
  },
  showErrorMessage: {
    type: Boolean,
    default: undefined
  }
});
const computedClass = computed(() => {
  return [
    `jsl-form-item-${firstDefined(props.labelPosition, config?.labelPosition, "left")}`
  ];
});
const computedStyleLabel = computed(() => {
  return [
    firstDefined(props.labelAlign, config?.labelAlign) ? `text-align: ${firstDefined(props.labelAlign, config?.labelAlign)};` : "",
    firstDefined(props.labelWidth, config?.labelWidth) ? `width:${initializationOfNumericalUnits(firstDefined(props.labelWidth, config?.labelWidth) as string)}` : ""
  ];
});
const isRequire = computed(() => {
  const required = firstDefined(props.required, config?.required, "auto");
  if (required === "auto") {
    const requiredRule = props.rules.find(item => item.required);
    return Boolean(requiredRule);
  }
  return Boolean(required);
});

// 与子组件父组件通信，进行规则验证
const inputValue: Ref<string | number | undefined> = ref();
provide("onChange", (value: string | number | undefined) => {
  inputValue.value = value;
  if (firstDefined(props.validateTrigger, config?.validateTrigger, "onBlur")?.includes("onChange")) {
    validator();
  }
});
provide("onBlur", (value: string | number | undefined) => {
  if (firstDefined(props.validateTrigger, config?.validateTrigger, "onBlur")?.includes("onBlur")) {
    validator();
  }
});

const errorRule: Ref<FormRule | null> = ref(null);

const validator = async () => {
  errorRule.value = null;
  for (let i = 0; i < props.rules.length; i++) {
    const rule = props.rules[i];
    // 效验required
    if (rule.required && !inputValue.value) {
      errorRule.value = rule;
      return errorRule.value;
    }

    // 效验validator
    if (rule.validator) {
      const confirm = await rule.validator(inputValue.value, rule);
      if (typeof confirm === "string") {
        errorRule.value = rule;
        errorRule.value.message = confirm;
        return errorRule.value;
      }
      if (!confirm) {
        errorRule.value = rule;
        return errorRule.value;
      }
    }

    // 效验正则
    if (rule.pattern && !rule.pattern.test(String(inputValue.value))) {
      errorRule.value = rule;
      return errorRule.value;
    }
  }
};
const resetValidation = () => {
  errorRule.value = null;
};
onMounted(() => {
  addFormItem && addFormItem({
    name: props.name,
    validator,
    resetValidation,
    id: formItemId,
    value: inputValue
  });
});
onUnmounted(() => {
  deletFormItem && deletFormItem({
    name: props.name,
    validator,
    resetValidation,
    id: formItemId,
    value: inputValue
  });
});
</script>
<script lang="ts">
export default { name: "JslFormItem" };
</script>
<style scoped lang="less" src="./index.less"></style>