import { Button } from "./components/button";
import { Space } from "./components/space";
import { Overlay } from "./components/overlay";
import "./assets/css/theme.less";
import "./assets/css/base.less";
import { App } from "vue";
export { Button, Space, Overlay };
export default {
  install: (app: App) => {
    app.use(Button);
    app.use(Space);
    app.use(Overlay);
  },
};
