export function updateRoute (element: HTMLElement, route: string): void {
  history.pushState(null, "", route);
  element.dispatchEvent(
    new CustomEvent("route-change", { detail: route, bubbles: true }),
  );
}

export function routeListener (event: MouseEvent): void {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return;
  }

  const target = event.target;
  if (!(target instanceof Element)) {
    return;
  }
  const link = target.closest<HTMLElement>("[route]");
  const href = link?.getAttribute("href");
  if (link === null || href === null || href === undefined) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();
  updateRoute(link, href);
}
