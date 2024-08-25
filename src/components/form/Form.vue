<template>
  <form @submit="onSubmit" ref="formRef">
    <slot></slot>
  </form>
</template>

<script setup lang="ts">
import { PropType, provide, Ref, ref } from "vue";
import { FormItemInject } from ".";
const props = defineProps({
  labelWidth: {
    type: [Number, String],
    default: undefined
  },
  labelAlign: {
    type: String as PropType<"center" | "right" | "left">,
    default: undefined
  },
  labelPosition: {
    type: String as PropType<"right" | "top" | "left">,
    default: undefined
  },
  validateTrigger: {
    type: [String, Array] as PropType<"onChange" | "onSubmit" | "onBlur" | ("onChange" | "onSubmit" | "onBlur")[]>,
    default: undefined
  },
  disabled: {
    type: Boolean,
    default: undefined
  },
  readonly: {
    type: Boolean,
    default: undefined
  },
  required: {
    type: [Boolean, String] as PropType<boolean | "auto">,
    default: undefined
  },
  showError: {
    type: Boolean,
    default: undefined
  },
  showErrorMessage: {
    type: Boolean,
    default: undefined
  },
  submitOnEnter: {
    type: Boolean,
    default: undefined
  }
});
provide("formConfig", props);

const emits = defineEmits(["submit", "failed"]);

const formRef: Ref<HTMLFormElement | null> = ref(null);

// 获取formItem注册了多少个，里面有操作每个的函数
let formItemList: FormItemInject[] = [];


provide("addFormItem", (data: FormItemInject) => {
  formItemList.push(data);
});
provide("deletFormItem", (data: FormItemInject) => {
  formItemList = formItemList.filter(item => item.id !== data.id);
});

const onSubmit = async () => {
  const obj: Record<string, string> = {};
  formItemList.forEach(item => {
    if (item.name) {
      obj[item.name] = item.value.value as string || "";
    }
  });

  const validateConfirm = await validate();
  if (validateConfirm) {
    emits("submit", obj);
  }
};
const submit = () => {
  formRef.value?.submit();
};
const validate = async (name?: string | string[]) => {
  const validatorList = formItemList.filter(item => !name || item.name === name || name.includes(item.name as string)).map(item => item.validator());
  const errorRules = (await Promise.all(validatorList)).filter(item => item);
  return !errorRules.length;
};
const resetValidation = (name?: string | string[]) => {
  formItemList.forEach(item => {
    if (!name || item.name === name || name.includes(item.name as string)) {
      item.resetValidation();
    }
  });
};

defineExpose({
  submit,
  validate,
  resetValidation
});
</script>
<script lang="ts">
export default { name: "JslForm" };
</script>
<style scoped lang="less"></style>