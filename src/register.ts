import { createElementRegistrar } from "@coverslide/customelement";
import Router from "./Router.js";
import Route from "./Route.js";
import Redirect from "./Redirect.js";

export const registerElements = createElementRegistrar(
  "router",
  [Router, Route, Redirect],
);
