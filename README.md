# Custom Element Router

A simple custom element-based router for web applications.

## Installation

```bash
npm install @coverslide/customelement-router
```

This package is ESM-only.

## Usage

### Basic Setup

```typescript
// Import and register the router components
import { registerRouterElements } from "@coverslide/customelement-router";
registerRouterElements();

// Use the router in your HTML or in a template
const template = `
<router-router>
  <router-route route="/" title="Home">
    <h1>Home Page</h1>
  </router-route>
  <router-route route="/about" title="About">
    <h1>About Page</h1>
  </router-route>
  <router-route route="" title="Default">
    <router-redirect path="/"></router-redirect>
  </router-route>
</router-router>
`;
```

A route with an empty `route` attribute is used when no other route matches. The
optional `title` attribute updates `document.title` when the route is shown.

### Navigation

```typescript
import { updateRoute, routeListener } from "@coverslide/customelement-router";

// Programmatic navigation
const navigateButton = document.querySelector("#navigate-button");
navigateButton.addEventListener("click", () => {
  updateRoute(navigateButton, "/about");
});

// Link-based navigation
const link = document.createElement("a");
link.setAttribute("href", "/about");
link.setAttribute("route", "true");
link.textContent = "Go to About";
link.addEventListener("click", routeListener);
```

`routeListener` handles clicks on the link itself or any element nested inside it.
Modified clicks (such as Ctrl/Cmd-click) are left to the browser.

## Components

- `<router-router>`: Main router component that manages route navigation
- `<router-route>`: Defines a route with path and content
- `<router-redirect>`: Redirects to another route

### Namespacing

Pass a namespace to `registerRouterElements` to register a second, independent
set of router elements:

```typescript
import { registerRouterElements } from "@coverslide/customelement-router";

registerRouterElements("myapp");
```

Then use `<myapp-router>`, `<myapp-route>`, and `<myapp-redirect>` in your
markup. Multiple namespaces can be registered on the same page, and each keeps
its own routes.

To make a namespace the default for the whole application, set it on the base
class before registering:

```typescript
import CustomElement from "@coverslide/customelement";
import { registerRouterElements } from "@coverslide/customelement-router";

CustomElement.defaultNamespace = "myapp";
registerRouterElements(CustomElement.defaultNamespace);
```

`registerRouterElements` has its own explicit default of `"router"`, so other
libraries changing the global default cannot silently rename the router tags.
Pass the namespace explicitly when you want the router to share an application
namespace.

Registration is conflict-checked. You can check before registering:

```typescript
CustomElement.conflicts(["router", "route", "redirect"], "myapp");
// e.g. ["myapp-router"] when that tag is already taken
```

`registerRouterElements` throws a `CustomElementRegistrationError` before
defining anything if a tag is already taken.

## API

- `updateRoute(element, path)`: Programmatically navigate to a path
- `routeListener(event)`: Event listener for handling link clicks with route attribute
- `registerRouterElements(namespace?)`: Register the router elements for a namespace; safe to call more than once
- `registerRouterElements()` defaults to `"router"`; pass `"myapp"` for `myapp-router`, `myapp-route`, and `myapp-redirect`

## Example

```typescript
import {
  registerRouterElements,
  updateRoute,
  routeListener,
} from "@coverslide/customelement-router";

// Register the router components
registerRouterElements();

// Create a router programmatically
const router = document.createElement("router-router");

// Home route
const homeRoute = document.createElement("router-route");
homeRoute.setAttribute("route", "/");
homeRoute.setAttribute("title", "Home");
homeRoute.innerHTML = "<h1>Home Page</h1>";

// About route
const aboutRoute = document.createElement("router-route");
aboutRoute.setAttribute("route", "/about");
aboutRoute.setAttribute("title", "About");
aboutRoute.innerHTML = "<h1>About Page</h1>";

// Add routes to router
router.appendChild(homeRoute);
router.appendChild(aboutRoute);

// Add to document
document.getElementById("app").appendChild(router);

// Create navigation links
const homeLink = document.createElement("a");
homeLink.setAttribute("href", "/");
homeLink.setAttribute("route", "true");
homeLink.textContent = "Home";
homeLink.addEventListener("click", routeListener);

const aboutLink = document.createElement("a");
aboutLink.setAttribute("href", "/about");
aboutLink.setAttribute("route", "true");
aboutLink.textContent = "About";
aboutLink.addEventListener("click", routeListener);

// Add links to navigation
const nav = document.createElement("nav");
nav.appendChild(homeLink);
nav.appendChild(document.createTextNode(" | "));
nav.appendChild(aboutLink);

document.getElementById("app").appendChild(nav);
```

## Requirements

This package depends on
[`@coverslide/customelement`](https://github.com/coverslide/customelement) for the
base custom element implementation.

## Development

```bash
npm install
npm run build
npm test
```

## License

MIT
