import CustomElement from "@cover-slide/customelement";
declare class Router extends CustomElement {
    connectedCallback(): void;
    updateRoutes(newRoute: string): void;
}
export default Router;
