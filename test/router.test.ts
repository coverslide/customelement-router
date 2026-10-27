import { beforeAll, beforeEach, describe, expect, test, vi } from "vitest";
import {
  registerElements,
  updateRoute,
  routeListener,
} from "../src/index.js";

beforeAll(() => {
  registerElements();
});

beforeEach(() => {
  document.body.innerHTML = "";
  document.title = "";
  window.history.replaceState(null, "", "/");
});

describe("registerElements", () => {
  test("is idempotent", () => {
    expect(() => registerElements()).not.toThrow();
  });
});

describe("updateRoute", () => {
  test("navigates and emits route-change", () => {
    const element = document.createElement("div");
    const listener = vi.fn();
    element.addEventListener("route-change", listener);

    updateRoute(element, "/about");

    expect(window.location.pathname).toBe("/about");
    expect(listener).toHaveBeenCalledTimes(1);
    expect((listener.mock.calls[0][0] as CustomEvent).detail).toBe("/about");
  });
});

describe("routeListener", () => {
  test("intercepts clicks on route links", () => {
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

  test("intercepts clicks on elements nested inside route links", () => {
    const link = document.createElement("a");
    link.setAttribute("href", "/nested");
    link.setAttribute("route", "true");
    const span = document.createElement("span");
    link.appendChild(span);
    document.body.appendChild(link);

    const event = new MouseEvent("click", { bubbles: true, cancelable: true });
    link.addEventListener("click", routeListener);
    span.dispatchEvent(event);

    expect(event.defaultPrevented).toBe(true);
    expect(window.location.pathname).toBe("/nested");
  });

  test("does not intercept modified clicks", () => {
    const link = document.createElement("a");
    link.setAttribute("href", "/about");
    link.setAttribute("route", "true");

    const pushState = vi.spyOn(window.history, "pushState");
    const event = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      ctrlKey: true,
    });
    link.addEventListener("click", routeListener);
    // Keep jsdom from trying to follow the link during the test.
    link.addEventListener("click", (clickEvent) => clickEvent.preventDefault());
    link.dispatchEvent(event);

    expect(pushState).not.toHaveBeenCalled();
    expect(window.location.pathname).toBe("/");
    pushState.mockRestore();
  });
});

describe("router", () => {
  test("renders the matching route and updates on navigation", () => {
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

  test("falls back to the default route", () => {
    window.history.replaceState(null, "", "/missing");
    document.body.innerHTML = `
      <router-router>
        <router-route route="/"><h1 id="home">Home</h1></router-route>
        <router-route route=""><h1 id="not-found">Not Found</h1></router-route>
      </router-router>
    `;

    expect(document.querySelector("#not-found")).not.toBeNull();
  });
});

describe("namespaced router", () => {
  test("renders elements in a custom namespace", () => {
    registerElements("myapp");
    document.body.innerHTML = `
      <myapp-router>
        <myapp-route route="/" title="Home"><h1 id="ns-home">Home</h1></myapp-route>
        <myapp-route route="/about"><h1 id="ns-about">About</h1></myapp-route>
      </myapp-router>
    `;

    expect(document.querySelector("#ns-home")).not.toBeNull();
    expect(document.querySelector("#ns-about")).toBeNull();

    updateRoute(document.querySelector("myapp-router")!, "/about");

    expect(document.querySelector("#ns-home")).toBeNull();
    expect(document.querySelector("#ns-about")).not.toBeNull();
  });
});

describe("redirect", () => {
  test("navigates to its path when connected", () => {
    document.body.innerHTML = `<router-redirect path="/target"></router-redirect>`;

    expect(window.location.pathname).toBe("/target");
  });
});
