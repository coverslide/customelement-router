import CustomElement from "@cover-slide/customelement";
import Router from "./Router";
import Route from "./Route";
import Redirect from "./Redirect";

export function registerRouterElements (): void {
  CustomElement.register(Router, "router-router", "<slot></slot>");
  CustomElement.register(Route, "router-route", "<slot></slot>");
  CustomElement.register(Redirect, "router-redirect", "");
}
