import { withInstall } from "@/utils/withInstall";
import _Form from "./Form.vue";
export const Form = withInstall(_Form);
export type FormProps = {
  readonly labelWidth: number | string;
  readonly labelAlign: "center" | "right" | "left";
  readonly labelPosition: "right" | "top" | "left";
  readonly errorMessageAlign: "center" | "right" | "left";
  readonly validateTrigger:
    | "onChange"
    | "onSubmit"
    | "onBlur"
    | ("onChange" | "onSubmit" | "onBlur")[];
  readonly disabled: boolean;
  readonly readonly: boolean;
  readonly required: boolean | "auto";
  readonly validateFirst: boolean;
  readonly scrollToError: boolean;
  readonly showError: boolean;
  readonly showErrorMessage: boolean;
  readonly submitOnEnter: boolean;
};
declare module "vue" {
  export interface GlobalComponents {
    JslForm: typeof Form;
  }
}
