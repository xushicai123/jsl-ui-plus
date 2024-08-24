import { withInstall } from "@/utils/withInstall";
import _Input from "./Input.vue";
export const Input = withInstall(_Input);
declare module "vue" {
  export interface GlobalComponents {
    JslInput: typeof Input;
  }
}
