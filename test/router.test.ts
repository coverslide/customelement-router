/**
 * @jest-environment jsdom
 */

import {
  registerRouterElements,
  updateRoute,
  routeListener,
} from "../index";

beforeAll(() => {
  registerRouterElements();
});

beforeEach(() => {
  document.body.innerHTML = "";
  document.title = "";
  window.history.replaceState(null, "", "/");
});

test("updateRoute navigates and emits route-change", () => {
  const element = document.createElement("div");
  const listener = jest.fn();
  element.addEventListener("route-change", listener);

  updateRoute(element, "/about");

  expect(window.location.pathname).toBe("/about");
  expect(listener).toHaveBeenCalledTimes(1);
  expect((listener.mock.calls[0][0] as CustomEvent).detail).toBe("/about");
});

test("routeListener intercepts clicks on route links", () => {
  const link = document.createElement("a");
  link.setAttribute("href", "/about");
  link.setAttribute("route", "true");
  document.body.appendChild(link);

  const event = new MouseEvent("click", { bubbles: true, cancelable: true });
  link.addEventListener("click", routeListener);
  link.dispatchEvent(event);

  expect(event.defaultPrevented).toBe(true);
  expect(window.location.pathname).toBe("/about");
});

test("router renders the matching route and updates on navigation", () => {
  window.history.replaceState(null, "", "/");
  document.body.innerHTML = `
    <router-router>
      <router-route route="/" title="Home"><h1 id="home">Home</h1></router-route>
      <router-route route="/about" title="About"><h1 id="about">About</h1></router-route>
    </router-router>
  `;

  expect(document.querySelector("#home")).not.toBeNull();
  expect(document.querySelector("#about")).toBeNull();
  expect(document.title).toBe("Home");

  updateRoute(document.querySelector("router-router")!, "/about");

  expect(document.querySelector("#home")).toBeNull();
  expect(document.querySelector("#about")).not.toBeNull();
  expect(document.title).toBe("About");
});

test("router falls back to the default route", () => {
  window.history.replaceState(null, "", "/missing");
  document.body.innerHTML = `
    <router-router>
      <router-route route="/"><h1 id="home">Home</h1></router-route>
      <router-route route=""><h1 id="not-found">Not Found</h1></router-route>
    </router-router>
  `;

  expect(document.querySelector("#not-found")).not.toBeNull();
});
