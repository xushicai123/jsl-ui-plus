import { Button } from "./components/button";
import { App } from "vue";
export { Button };
export default {
  install: (app: App) => {
    app.use(Button);
  },
};
