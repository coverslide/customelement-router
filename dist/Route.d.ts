import CustomElement from "@cover-slide/customelement";
declare class Route extends CustomElement {
    childContent: DocumentFragment;
    active: boolean;
    constructor();
    connectedCallback(): void;
}
export default Route;
