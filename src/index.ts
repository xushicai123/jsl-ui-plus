import { Button } from "./components/button";
import { Space } from "./components/space";
import { Overlay } from "./components/overlay";
import { Icon } from "./components/icon";
import { Popup } from "./components/popup";
import { Image } from "./components/image";
import { LoadingIcon } from "./components/loading-icon";
import { Form } from "./components/form";
import { FormItem } from "./components/form-item";
import { Input } from "./components/input";
import "./assets/css/theme.less";
import "./assets/icon/iconfont.css";
import "./assets/css/base.less";
import { App } from "vue";
export {
  Button,
  Space,
  Overlay,
  Icon,
  Popup,
  LoadingIcon,
  Image,
  Form,
  FormItem,
  Input,
};
export default {
  install: (app: App) => {
    app.use(Button);
    app.use(Space);
    app.use(Overlay);
    app.use(Icon);
    app.use(Popup);
    app.use(LoadingIcon);
    app.use(Image);
    app.use(Form);
    app.use(FormItem);
    app.use(Input);
  },
};
