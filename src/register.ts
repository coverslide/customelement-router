import CustomElement from "@coverslide/customelement";
import Router from "./Router.js";
import Route from "./Route.js";
import Redirect from "./Redirect.js";

const registeredNamespaces = new Set<string>();

export function registerRouterElements (
  namespace: string = "router",
): void {
  if (registeredNamespaces.has(namespace)) {
    return;
  }
  CustomElement.registerAll(
    [
      { elementClass: Router, name: "router", html: "<slot></slot>" },
      { elementClass: Route, name: "route", html: "<slot></slot>" },
      { elementClass: Redirect, name: "redirect", html: "" },
    ],
    namespace,
  );
  registeredNamespaces.add(namespace);
}
