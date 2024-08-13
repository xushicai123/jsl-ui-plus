import { withInstall } from "@/utils/withInstall";
import _Popup from "./Popup.vue";
export const Popup = withInstall(_Popup);
declare module "vue" {
  export interface GlobalComponents {
    JslPopup: typeof Popup;
  }
}
