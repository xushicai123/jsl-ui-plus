import { withInstall } from "@/utils/withInstall";
import _Button from "./Button.vue";
export const Button = withInstall(_Button);
declare module "vue" {
  export interface GlobalComponents {
    JslButton: typeof Button;
  }
}
