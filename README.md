# Custom Element Router

A simple custom element-based router for web applications.

## Installation

```bash
npm install @cover-slide/customelement-router
```

## Usage

### Basic Setup

```typescript
// Import and register the router components
import { registerRouterElements } from '@cover-slide/customelement-router';
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

### Navigation

```typescript
import { updateRoute, routeListener } from '@cover-slide/customelement-router';

// Programmatic navigation
const navigateButton = document.querySelector('#navigate-button');
navigateButton.addEventListener('click', () => {
  updateRoute(navigateButton, '/about');
});

// Link-based navigation
const link = document.createElement('a');
link.setAttribute('href', '/about');
link.setAttribute('route', 'true');
link.textContent = 'Go to About';
link.addEventListener('click', routeListener);
```

## Components

- `<router-router>`: Main router component that manages route navigation
- `<router-route>`: Defines a route with path and content
- `<router-redirect>`: Redirects to another route

## API

- `updateRoute(element, path)`: Programmatically navigate to a path
- `routeListener(event)`: Event listener for handling link clicks with route attribute
- `registerRouterElements()`: Register custom elements for routing

## Example

```typescript
import { registerRouterElements, updateRoute, routeListener } from '@cover-slide/customelement-router';

// Register the router components
registerRouterElements();

// Create a router programmatically
const router = document.createElement('router-router');

// Home route
const homeRoute = document.createElement('router-route');
homeRoute.setAttribute('route', '/');
homeRoute.setAttribute('title', 'Home');
homeRoute.innerHTML = '<h1>Home Page</h1>';

// About route
const aboutRoute = document.createElement('router-route');
aboutRoute.setAttribute('route', '/about');
aboutRoute.setAttribute('title', 'About');
aboutRoute.innerHTML = '<h1>About Page</h1>';

// Add routes to router
router.appendChild(homeRoute);
router.appendChild(aboutRoute);

// Add to document
document.getElementById('app').appendChild(router);

// Create navigation links
const homeLink = document.createElement('a');
homeLink.setAttribute('href', '/');
homeLink.setAttribute('route', 'true');
homeLink.textContent = 'Home';
homeLink.addEventListener('click', routeListener);

const aboutLink = document.createElement('a');
aboutLink.setAttribute('href', '/about');
aboutLink.setAttribute('route', 'true');
aboutLink.textContent = 'About';
aboutLink.addEventListener('click', routeListener);

// Add links to navigation
const nav = document.createElement('nav');
nav.appendChild(homeLink);
nav.appendChild(document.createTextNode(' | '));
nav.appendChild(aboutLink);

document.getElementById('app').appendChild(nav);
```

## Requirements

This package depends on `@cover-slide/customelement` for the base custom element implementation.

## License

MIT