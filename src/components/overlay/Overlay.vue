<template>
  <transition name="jsl-fade" @enter="enter" @after-leave="afterLeave">
    <div class="jsl-overlay" v-if="props.show">
      <slot></slot>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { onMounted, onUpdated, onActivated, onDeactivated, nextTick } from "vue";
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  zIndex: {
    type: [Number, String],
  },
  duration: {
    type: [Number, String],
    default: 0.3
  },
});


const detectingElements = () => {
  nextTick(() => {
    if (document.querySelector(".jsl-overlay")) {
      document.querySelector("html")?.classList.add("jsl-overflow-hidden");
    } else {
      document.querySelector("html")?.classList.remove("jsl-overflow-hidden");
    }
  });
};
const enter = () => {
  detectingElements();
};
const afterLeave = () => {
  detectingElements();
};
onActivated(() => {
  detectingElements();
});
onDeactivated(() => {
  detectingElements();
});
onMounted(() => {
  detectingElements();
});
onUpdated(() => {
  detectingElements();
});
</script>
<script lang="ts">
export default { name: "JslOverlay" };
</script>
<style scoped lang="less" src="./index.less"></style>