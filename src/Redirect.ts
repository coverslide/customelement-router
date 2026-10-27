import CustomElement from "@coverslide/customelement";
import { updateRoute } from "./helpers.js";

class Redirect extends CustomElement {
  static localName = "redirect";
  static template = "";

  connectedCallback (): void {
    super.connectedCallback();
    const path = this.getAttribute("path");
    if (path !== null) {
      updateRoute(this, path);
    }
  }
}

export default Redirect;
