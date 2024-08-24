import { withInstall } from "@/utils/withInstall";
import _FormItem from "./FormItem.vue";

export const FormItem = withInstall(_FormItem);
declare module "vue" {
  export interface GlobalComponents {
    JslFormItem: typeof FormItem;
  }
}
