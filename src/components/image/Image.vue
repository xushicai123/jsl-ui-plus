<template>
  <div class="jsl-image" :style="computedStyleImage" :class="computedClassImage" ref="imageRef">
    <img v-if="isLoadingImg" :src="props.src" :alt="props.alt" class="jsl-image-img" :crossorigin="props.crossorigin"
      :referrerpolicy="props.referrerpolicy" :style="computedStyle" @load="load" @error="error"
      :class="isLoading || isError ? 'jsl-image-hide' : ''">
    <div class="jsl-image-loading" v-if="props.showLoading && isLoading">
      <slot name="loading">
        <Icon :name="props.loadingIcon" :size="props.iconSize" :class-prefix="props.iconPrefix"
          class="jsl-image-loading-icon">
        </Icon>
      </slot>

    </div>
    <div class="jsl-image-error" v-if="props.showError && isError">
      <slot name="error">
        <Icon :name="props.errorIcon" :size="props.iconSize" :class-prefix="props.iconPrefix"
          class="jsl-image-error-icon"></Icon>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import initializationOfNumericalUnits from "@/utils/initializationOfNumericalUnits";
import { computed, onMounted, PropType, Ref, ref } from "vue";
import Icon from "../icon/Icon.vue";
const props = defineProps({
  src: {
    type: String
  },
  fit: {
    type: String as PropType<"fill" | "contain" | "cover" | "none" | "scale-down">
  },
  position: {
    type: String as PropType<"top" | "right" | "bottom" | "left" | "center">
  },
  alt: {
    type: String
  },
  width: {
    type: [String, Number]
  },
  height: {
    type: [String, Number]
  },
  radius: {
    type: [String, Number]
  },
  round: {
    type: Boolean,
    default: false
  },
  block: {
    type: Boolean,
    default: false
  },
  lazyLoad: {
    type: Boolean,
    default: false
  },
  showError: {
    type: Boolean,
    default: true
  },
  showLoading: {
    type: Boolean,
    default: true
  },
  errorIcon: {
    type: String,
    default: "icon-photo-fail"
  },
  loadingIcon: {
    type: String,
    default: "icon-photo"
  },
  iconSize: {
    type: [String, Number],
  },
  iconPrefix: {
    type: String,
    default: "jsl-icon"
  },
  crossorigin: {
    type: String as PropType<"anonymous" | "use-credentials">,
  },
  referrerpolicy: {
    type: String as PropType<"no-referrer" | "no-referrer-when-downgrade" | "origin" | "origin-when-cross-origin" | "unsafe-url">
  }
});
const POSITION_TYPE = {
  left: "left center",
  center: "center center",
  right: "right center",
  top: "center top",
  bottom: "center bottom",
};
const computedStyleImage = computed(() => {
  return [
    props.radius ? `border-radius: ${initializationOfNumericalUnits(props.radius)};overflow: hidden;` : "",
    props.width ? `width:${props.width}` : "",
    props.height ? `height:${props.height}` : "",
    props.block ? "display: inline-block" : ""
  ];
});
const computedClassImage = computed(() => {
  return [
    props.round ? "jsl-image-round" : "",
  ];
});

const computedStyle = computed(() => {
  return [
    props.fit ? `object-fit:${props.fit}` : "",
    props.position ? `object-position:${POSITION_TYPE[props.position]}` : "",
  ];
});

const isLoading = ref(true);
const isError = ref(false);
const load = () => {
  isLoading.value = false;
  console.log("laod");
};
const error = () => {
  isError.value = true;
  isLoading.value = false;
  console.log("error");
};

// 是否加载图片
const isLoadingImg = ref(false);

const imageRef: Ref<HTMLImageElement | null> = ref(null);
const lazyLoadImg = () => {
  if ("IntersectionObserver" in window && imageRef.value) {
    // 创建 Intersection Observer 实例
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // 图片进入视口时加载图片
          isLoadingImg.value = true;
          observer.disconnect();
        }
      });
    }, {
      rootMargin: "20px 20px 20px 20px"
    });
    observer.observe(imageRef.value);
  } else {
    isLoadingImg.value = true;
  }
};
onMounted(() => {
  if (props.lazyLoad) {
    lazyLoadImg();
  } else {
    isLoadingImg.value = true;
  }
});
</script>
<script lang="ts">
export default { name: "JslImage" };
</script>
<style scoped lang="less" src="./index.less"></style>