import CustomElement from "@coverslide/customelement";

class Router extends CustomElement {
  static localName = "router";
  static template = "<slot></slot>";

  private readonly handleRouteChange = (event: Event): void => {
    this.updateRoutes((event as CustomEvent<string>).detail);
  };

  private readonly handleRouteReady = (): void => {
    this.updateRoutes(window.location.pathname);
  };

  private readonly handlePopState = (): void => {
    this.updateRoutes(window.location.pathname);
  };

  constructor () {
    super();
    this.addEventListener("route-change", this.handleRouteChange);
    this.addEventListener("route-ready", this.handleRouteReady);
  }

  connectedCallback (): void {
    super.connectedCallback();
    this.updateRoutes(window.location.pathname);
    window.addEventListener("popstate", this.handlePopState);
  }

  disconnectedCallback (): void {
    window.removeEventListener("popstate", this.handlePopState);
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
