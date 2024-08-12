import { withInstall } from "@/utils/withInstall";
import _Overlay from "./Overlay.vue";
export const Overlay = withInstall(_Overlay);
declare module "vue" {
  export interface GlobalComponents {
    JslOverlay: typeof Overlay;
  }
}
