import { Button } from "./components/button";
import { Space } from "./components/space";
import { Overlay } from "./components/overlay";
import { Icon } from "./components/icon";
import { Popup } from "./components/popup";
import { LoadingIcon } from "./components/loading-icon";
import "./assets/css/theme.less";
import "./assets/icon/iconfont.css";
import "./assets/css/base.less";
import { App } from "vue";
export { Button, Space, Overlay, Icon, Popup, LoadingIcon };
export default {
  install: (app: App) => {
    app.use(Button);
    app.use(Space);
    app.use(Overlay);
    app.use(Icon);
    app.use(Popup);
    app.use(LoadingIcon);
  },
};
