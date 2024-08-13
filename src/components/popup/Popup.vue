<template>
  <div>
    <Overlay :show="props.show" :lock-scroll="props.lockScroll" :z-index="Number(props.zIndex) - 1"
      @click="clickOverlay" v-if="overlay">
    </Overlay>
    <transition :name="props.transition || POSITION_TRANSITION_NAME[props.position]" @after-enter="emits('opened')"
      @after-leave="emits('closed')">
      <div class="jsl-popup" v-if="props.LazyRender ? props.show : true" v-show="props.LazyRender ? true : props.show"
        :class="computedClass" :style="computedStyle" @click="emits('click')">
        <slot></slot>
        <Icon :class-prefix="props.iconPrefix" :name="props.closeIcon"
          :class="['jsl-popup-cross-icon', `jsl-popup-cross-icon-${closeIconPosition}`]" v-if="props.closeable"
          @click="close; emits('click-close-icon')"></Icon>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import Overlay from "@/components/overlay/Overlay.vue";
import fliterDuration from "@/utils/fliterDuration";
import Icon from "@/components/icon/Icon.vue";
import { computed, onMounted, onUnmounted, PropType, watch } from "vue";
const POSITION_TRANSITION_NAME = {
  top: "jsl-top",
  bottom: "jsl-bottom",
  right: "jsl-right",
  left: "jsl-left",
  center: "jsl-center",
};
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  overlay: {
    type: Boolean,
    default: true
  },
  position: {
    type: String as PropType<"top" | "bottom" | "right" | "left" | "center">,
    default: "center"
  },
  duration: {
    type: [String, Number],
    default: 0.3
  },
  zIndex: {
    type: [String, Number],
    default: 999
  },
  round: {
    type: Boolean,
    default: false
  },
  lockScroll: {
    type: Boolean,
    default: true
  },
  LazyRender: {
    type: Boolean,
    default: true
  },
  closeOnPopstate: {
    type: Boolean,
    default: false
  },
  closeOnClickOverlay: {
    type: Boolean,
    default: true
  },
  closeable: {
    type: Boolean,
    default: false
  },
  closeIcon: {
    type: String,
    default: "icon-cross"
  },
  closeIconPosition: {
    type: String as PropType<"top-left" | "bottom-left" | "bottom-right" | "top-right">,
    default: "top-right"
  },
  iconPrefix: {
    type: String,
    default: "jsl-icon"
  },

  beforeClose: {
    type: Function as PropType<() => (boolean | void) | Promise<(boolean | void)>>
  },

  transition: {
    type: String
  },
  safeAreaInsetTop: {
    type: Boolean,
    default: false
  },
  safeAreaInsetBottom: {
    type: Boolean,
    default: false
  }
});
const emits = defineEmits(["update:show", "click", "click-overlay", "click-close-icon", "open", "close", "opened", "closed"]);

const computedClass = computed(() => {
  return [
    `jsl-popup-${props.position}`,
    props.round ? "jsl-popup-round" : "",
    props.safeAreaInsetBottom ? "jsl-safe-area-bottom" : "",
    props.safeAreaInsetTop ? "jsl-safe-area-top" : "",
  ];
});
const computedStyle = computed(() => {
  return [
    `z-index:${props.zIndex}`,
    `transition-duration:${fliterDuration(props.duration)}`
  ];
});

watch(() => props.show, (v, oldV) => {
  if (v) {
    emits("open");
  } else if (oldV) {
    emits("close");
  }
}, { immediate: true });

const close = async () => {
  if (props.beforeClose) {
    const comfirm = await props.beforeClose();
    if (comfirm) emits("update:show", false);
  } else {
    emits("update:show", false);
  }
};

const clickOverlay = () => {
  emits("click-overlay");
  if (props.closeOnClickOverlay) close();
};

const handlePopstate = () => {
  if (props.closeOnPopstate) close();
};

onMounted(() => {
  window.addEventListener("popstate", handlePopstate);
});


onUnmounted(() => {
  window.removeEventListener("popstate", handlePopstate);
});


</script>
<script lang="ts">
export default { name: "JslPopup" };
</script>
<style scoped lang="less" src="./index.less"></style>