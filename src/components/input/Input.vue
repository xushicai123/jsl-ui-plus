<template>
  <div>
    <input type="text" :placeholder="placeholder" @input="onInput" @blur="onBlur" :value="props.modelValue">
  </div>
</template>

<script setup lang="ts">
import { inject, nextTick } from "vue";

const props = defineProps({
  type: {
    type: String,
    default: "text"
  },
  modelValue: {
    type: [String, Number]
  },
  placeholder: {
    type: String
  }
});
const emits = defineEmits(["update:modelValue"]);
const onInputParent = inject<(value: string | number | undefined) => void>("onChange");
const onBlurParent = inject<(value: string | number | undefined) => void>("onBlur");
const onInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  emits("update:modelValue", input.value);
  nextTick(() => {
    if (!props.modelValue) input.value = "";
    onInputParent && onInputParent(props.modelValue);
  });
};
const onBlur = () => {
  nextTick(() => {
    onBlurParent && onBlurParent(props.modelValue);
  });
};
</script>
<script lang="ts">
export default { name: "JslInput" };
</script>
<style scoped lang="less" src="./index.less"></style>