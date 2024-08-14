import { withInstall } from "@/utils/withInstall";
import _Image from "./Image.vue";
export const Image = withInstall(_Image);
declare module "vue" {
  export interface GlobalComponents {
    JslImage: typeof Image;
  }
}
