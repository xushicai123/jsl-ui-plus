import { withInstall } from "@/utils/withInstall";
import _Space from "./Space.vue";
export const Space = withInstall(_Space);
declare module "vue" {
  export interface GlobalComponents {
    JslSpace: typeof Space;
  }
}
