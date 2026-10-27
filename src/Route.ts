import CustomElement from "@coverslide/customelement";

class Route extends CustomElement {
  static localName = "route";
  static template = null;

  childContent: DocumentFragment = new DocumentFragment();
  active: boolean = false;

  private ready = false;

  private readonly captureContent = (): void => {
    if (this.childContent.childNodes.length === 0) {
      for (const child of Array.from(this.childNodes)) {
        this.childContent.appendChild(child);
      }
    }
    this.ready = true;
    this.dispatchEvent(
      new CustomEvent("route-ready", {
        detail: this.getAttribute("route"),
        bubbles: true,
      }),
    );
  };

  private readonly handleUpdateRoute = (event: Event): void => {
    if (!this.ready) {
      return;
    }
    const update = event as CustomEvent<string>;
    const route = this.getAttribute("route");
    if (update.detail !== route) {
      this.active = false;
      this.innerHTML = "";
      return;
    }
    if (!this.active) {
      this.active = true;
      this.appendChild(this.childContent.cloneNode(true));
      if (this.hasAttribute("title")) {
        document.title = this.getAttribute("title")!;
      }
    }
  };

  constructor () {
    super();
    this.addEventListener("update-route", this.handleUpdateRoute);
  }

  connectedCallback (): void {
    if (this.childContent.childNodes.length > 0) {
      this.active = false;
      this.innerHTML = "";
      this.ready = true;
      this.dispatchEvent(
        new CustomEvent("route-ready", {
          detail: this.getAttribute("route"),
          bubbles: true,
        }),
      );
      return;
    }

    if (this.childNodes.length > 0) {
      this.active = false;
      this.captureContent();
      return;
    }

    // Parser-created elements may connect before their children are parsed.
    this.active = false;
    this.ready = false;
    this.innerHTML = "";
    setTimeout(this.captureContent, 0);
  }
}

export default Route;
