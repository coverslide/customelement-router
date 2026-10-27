import CustomElement from "@cover-slide/customelement";
import { updateRoute } from "./helpers";

class Redirect extends CustomElement {
  connectedCallback (): void {
    super.connectedCallback();
    updateRoute(this, this.getAttribute("path")!);
  }
}

export default Redirect;
