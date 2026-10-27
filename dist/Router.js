"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customelement_1 = __importDefault(require("@cover-slide/customelement"));
class Router extends customelement_1.default {
    connectedCallback() {
        super.connectedCallback();
        const current = window.location.pathname;
        this.updateRoutes(current);
        this.addEventListener("route-change", ((event) => {
            this.updateRoutes(event.detail);
        }));
        this.addEventListener("route-ready", ((event) => {
            this.updateRoutes(window.location.pathname);
        }));
        window.addEventListener("popstate", (_) => {
            this.updateRoutes(window.location.pathname);
        });
    }
    updateRoutes(newRoute) {
        let foundRoute = false;
        let defaultRoute = null;
        for (const route of this.querySelectorAll("router-route")) {
            const routePath = route.getAttribute("route");
            if (routePath === newRoute) {
                foundRoute = true;
            }
            if (routePath === "") {
                defaultRoute = route;
            }
            route.dispatchEvent(new CustomEvent("update-route", { detail: newRoute }));
        }
        if (!foundRoute && defaultRoute != null) {
            defaultRoute.dispatchEvent(new CustomEvent("update-route", { detail: "" }));
        }
    }
}
exports.default = Router;
//# sourceMappingURL=Router.js.map