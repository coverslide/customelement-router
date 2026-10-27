"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRouterElements = registerRouterElements;
const customelement_1 = __importDefault(require("@cover-slide/customelement"));
const Router_1 = __importDefault(require("./Router"));
const Route_1 = __importDefault(require("./Route"));
const Redirect_1 = __importDefault(require("./Redirect"));
function registerRouterElements() {
    customelement_1.default.register(Router_1.default, "router-router", "<slot></slot>");
    customelement_1.default.register(Route_1.default, "router-route", "<slot></slot>");
    customelement_1.default.register(Redirect_1.default, "router-redirect", "");
}
//# sourceMappingURL=register.js.map