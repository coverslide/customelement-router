"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customelement_1 = __importDefault(require("@cover-slide/customelement"));
class Route extends customelement_1.default {
    constructor() {
        super();
        this.active = false;
        this.childContent = new DocumentFragment();
        const childrenToRemove = [];
        for (const child of this.childNodes) {
            childrenToRemove.push(child);
        }
        for (const child of childrenToRemove) {
            this.removeChild(child);
            this.childContent.appendChild(child);
        }
    }
    connectedCallback() {
        this.innerHTML = "";
        this.addEventListener("update-route", ((event) => {
            const route = this.getAttribute("route");
            if (event.detail !== route) {
                this.active = false;
                this.innerHTML = "";
                return;
            }
            if (!this.active) {
                this.active = true;
                this.appendChild(this.childContent.cloneNode(true));
                if (this.hasAttribute("title")) {
                    document.title = this.getAttribute("title");
                }
            }
        }));
        this.dispatchEvent(new CustomEvent("route-ready", {
            detail: this.getAttribute("route"),
            bubbles: true,
        }));
    }
}
exports.default = Route;
//# sourceMappingURL=Route.js.map