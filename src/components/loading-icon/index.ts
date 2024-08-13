import { withInstall } from "@/utils/withInstall";
import _LoadingIcon from "./LoadingIcon.vue";
export const LoadingIcon = withInstall(_LoadingIcon);
declare module "vue" {
  export interface GlobalComponents {
    JslLoadingIcon: typeof LoadingIcon;
  }
}
