<template>
  <div class="jsl-form-item" :class="computedClass">
    <div class="jsl-form-item-label" v-if="props.label || $slots.label" :style="computedStyleLabel">
      <!-- 显示必填标记 -->
      <span class="jsl-form-item-required" v-if="isRequire">*</span>
      <!-- 显示标签 -->
      <slot name="label">
        <span v-if="label">{{ label }}</span>
      </slot>
    </div>
    <div class="jsl-form-item-content">
      <!-- 显示表单内容 -->
      <slot></slot>
      <!-- 显示错误消息 -->
      <div class="jsl-form-item-error" v-if="firstDefined(props.showErrorMessage, config?.showErrorMessage, true)">
        {{ errorRule?.message }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted, PropType, provide, Ref, ref } from "vue";
import { FormItemInject, FormProps, FormRule } from "../form";
import firstDefined from "@/utils/firstDefined";
import initializationOfNumericalUnits from "@/utils/initializationOfNumericalUnits";

// 唯一标识符
const formItemId = Symbol();

// 注入父组件传递的配置和方法
const config = inject<FormProps>("formConfig");
const addFormItem = inject<(data: FormItemInject) => void>("addFormItem");
const deletFormItem = inject<(data: FormItemInject) => void>("deletFormItem");

// 定义组件的 props
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
  showError: {
    type: Boolean,
    default: undefined
  },
  showErrorMessage: {
    type: Boolean,
    default: undefined
  }
});

// 计算类名
const computedClass = computed(() => {
  return [
    `jsl-form-item-${firstDefined(props.labelPosition, config?.labelPosition, "left")}`
  ];
});

// 计算标签的样式
const computedStyleLabel = computed(() => {
  return [
    firstDefined(props.labelAlign, config?.labelAlign) ? `text-align: ${firstDefined(props.labelAlign, config?.labelAlign)};` : "",
    firstDefined(props.labelWidth, config?.labelWidth) ? `width:${initializationOfNumericalUnits(firstDefined(props.labelWidth, config?.labelWidth) as string)}` : ""
  ];
});

// 判断是否必填
const isRequire = computed(() => {
  const required = firstDefined(props.required, config?.required, "auto");
  if (required === "auto") {
    const requiredRule = props.rules.find(item => item.required);
    return Boolean(requiredRule);
  }
  return Boolean(required);
});

// 通过 provide 向子组件提供事件处理函数
const inputValue: Ref<string | number | undefined> = ref();
provide("onChange", (value: string | number | undefined) => {
  inputValue.value = value;
  if (firstDefined(props.validateTrigger, config?.validateTrigger, "onBlur")?.includes("onChange")) {
    validator();
  }
});
provide("onBlur", (value: string | number | undefined) => {
  inputValue.value = value;
  if (firstDefined(props.validateTrigger, config?.validateTrigger, "onBlur")?.includes("onBlur")) {
    validator();
  }
});

// 存储错误规则
const errorRule: Ref<FormRule | null> = ref(null);

// 表单验证函数
const validator = async () => {
  errorRule.value = null;
  for (let i = 0; i < props.rules.length; i++) {
    const rule = props.rules[i];
    // 验证是否必填
    if (rule.required && !inputValue.value) {
      errorRule.value = rule;
      return errorRule.value;
    }

    // 自定义验证器
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

    // 正则验证
    if (rule.pattern && !rule.pattern.test(String(inputValue.value))) {
      errorRule.value = rule;
      return errorRule.value;
    }
  }
};

// 重置表单验证状态
const resetValidation = () => {
  errorRule.value = null;
};

// 组件挂载时注册表单项
onMounted(() => {
  addFormItem && addFormItem({
    name: props.name,
    validator,
    resetValidation,
    id: formItemId,
    value: inputValue
  });
});

// 组件卸载时注销表单项
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
