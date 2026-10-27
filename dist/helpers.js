"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRoute = updateRoute;
exports.routeListener = routeListener;
function updateRoute(element, route) {
    history.pushState(null, "", route);
    element.dispatchEvent(new CustomEvent("route-change", { detail: route, bubbles: true }));
}
function routeListener(event) {
    const target = event.target;
    if (target.hasAttribute("route")) {
        event.preventDefault();
        event.stopPropagation();
        updateRoute(target, target.getAttribute("href"));
    }
}
//# sourceMappingURL=helpers.js.map