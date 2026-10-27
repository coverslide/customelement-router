"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customelement_1 = __importDefault(require("@cover-slide/customelement"));
const helpers_1 = require("./helpers");
class Redirect extends customelement_1.default {
    connectedCallback() {
        super.connectedCallback();
        (0, helpers_1.updateRoute)(this, this.getAttribute("path"));
    }
}
exports.default = Redirect;
//# sourceMappingURL=Redirect.js.map