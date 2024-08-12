import { withInstall } from "@/utils/withInstall";
import _Icon from "./Icon.vue";
export const Icon = withInstall(_Icon);
declare module "vue" {
  export interface GlobalComponents {
    JslIcon: typeof Icon;
  }
}
