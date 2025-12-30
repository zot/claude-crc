/**
 * SPA Router with browser history integration
 * CRC: crc-Router.md
 * Spec: main.md
 * Sequences: seq-create-contact.md, seq-edit-contact.md, seq-delete-contact.md, seq-load-contacts.md
 */

export type RouteHandler = (params: Record<string, string>) => void;

interface Route {
  pattern: RegExp;
  paramNames: string[];
  handler: RouteHandler;
}

export type NavigationGuard = () => boolean;

export class Router {
  private routes: Route[] = [];
  private currentRoute: string = '/';
  private navigationGuard: NavigationGuard | null = null;

  constructor() {
    window.addEventListener('popstate', () => this.handlePopState());
  }

  registerRoute(path: string, handler: RouteHandler): void {
    const paramNames: string[] = [];
    const pattern = path.replace(/:([^/]+)/g, (_, name) => {
      paramNames.push(name);
      return '([^/]+)';
    });
    this.routes.push({
      pattern: new RegExp(`^${pattern}$`),
      paramNames,
      handler,
    });
  }

  navigate(path: string, replace: boolean = false): boolean {
    if (this.navigationGuard && !this.navigationGuard()) {
      return false;
    }

    this.currentRoute = path;
    if (replace) {
      window.history.replaceState(null, '', path);
    } else {
      window.history.pushState(null, '', path);
    }
    this.dispatch(path);
    return true;
  }

  back(): void {
    window.history.back();
  }

  getCurrentRoute(): string {
    return this.currentRoute;
  }

  setNavigationGuard(guard: NavigationGuard | null): void {
    this.navigationGuard = guard;
  }

  start(): void {
    const path = window.location.pathname || '/';
    this.currentRoute = path;
    this.dispatch(path);
  }

  private handlePopState(): void {
    const path = window.location.pathname || '/';
    this.currentRoute = path;
    this.dispatch(path);
  }

  private dispatch(path: string): void {
    for (const route of this.routes) {
      const match = path.match(route.pattern);
      if (match) {
        const params: Record<string, string> = {};
        route.paramNames.forEach((name, index) => {
          params[name] = match[index + 1];
        });
        route.handler(params);
        return;
      }
    }
    // No route matched, navigate to home
    if (path !== '/') {
      this.navigate('/', true);
    }
  }
}
