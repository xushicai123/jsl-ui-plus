import { withInstall } from "@/utils/withInstall";
import _Form from "./Form.vue";
import { Ref } from "vue";
export const Form = withInstall(_Form);
export type FormProps = {
  readonly labelWidth: number | string;
  readonly labelAlign: "center" | "right" | "left";
  readonly labelPosition: "right" | "top" | "left";
  readonly validateTrigger:
    | "onChange"
    | "onSubmit"
    | "onBlur"
    | ("onChange" | "onSubmit" | "onBlur")[];
  readonly disabled: boolean;
  readonly readonly: boolean;
  readonly required: boolean | "auto";
  readonly showError: boolean;
  readonly showErrorMessage: boolean;
  readonly submitOnEnter: boolean;
};

export type FormRule = {
  required?: boolean;
  message?: string | ((value: unknown, rule: FormRule) => string);
  validator?: (
    value: unknown,
    rule: FormRule
  ) => boolean | string | Promise<boolean | string>;
  pattern?: RegExp;
  trigger?: FormProps["validateTrigger"];
  formatter?: (value: unknown, rule: FormRule) => unknown;
  validateEmpty?: boolean;
};

export type FormItemInject = {
  name: string | undefined;
  validator: () => Promise<FormRule | undefined>;
  resetValidation: () => void;
  id: symbol;
  value: Ref<string | number | undefined>;
};

declare module "vue" {
  export interface GlobalComponents {
    JslForm: typeof Form;
  }
}
