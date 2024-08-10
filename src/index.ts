import { Button } from "./components/button";
import { Space } from "./components/space";
import "./assets/css/theme.less";
import "./assets/css/base.less";
import { App } from "vue";
export { Button, Space };
export default {
  install: (app: App) => {
    app.use(Button);
    app.use(Space);
  },
};
