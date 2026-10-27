import CustomElement from "@coverslide/customelement";

class Router extends CustomElement {
  static localName = "router";
  static template = "<slot></slot>";

  connectedCallback (): void {
    super.connectedCallback();
    const current = window.location.pathname;
    this.updateRoutes(current);

    this.addEventListener("route-change", ((event: CustomEvent) => {
      this.updateRoutes(event.detail);
    }) as EventListener);

    this.addEventListener("route-ready", ((event: CustomEvent) => {
      this.updateRoutes(window.location.pathname);
    }) as EventListener);

    window.addEventListener("popstate", (_: PopStateEvent) => {
      this.updateRoutes(window.location.pathname);
    });
  }

  updateRoutes (newRoute: string): void {
    let foundRoute = false;
    let defaultRoute: Element | null = null;
    for (const route of this.querySelectorAll(this.tag("route"))) {
      const routePath = route.getAttribute("route");
      if (routePath === newRoute) {
        foundRoute = true;
      }
      if (routePath === "") {
        defaultRoute = route;
      }
      route.dispatchEvent(
        new CustomEvent("update-route", { detail: newRoute }),
      );
    }
    if (!foundRoute && defaultRoute != null) {
      defaultRoute.dispatchEvent(
        new CustomEvent("update-route", { detail: "" }),
      );
    }
  }
}

export default Router;
