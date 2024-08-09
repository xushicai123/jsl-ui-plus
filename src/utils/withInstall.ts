import type { App, Component } from "vue";
export const withInstall = <T extends Component>(component: T) => {
  return {
    ...component,
    install: (app: App) => {
      const { name } = component;
      if (name) {
        app.component(name, component);
      }
      return app;
    },
  };
};
