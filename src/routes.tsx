import {
  Outlet,
  Router,
  createRootRoute,
  createRoute,
  useNavigate,
} from "@tanstack/react-router";
import { ValePage } from "./pages/ValePage";
import { Premio } from "./pages/Premio";

import "./index.css";
import { Home } from "./pages/Home";

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "prueba",
  component: ValePage,
});

const premioRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "premio",
  component: Premio,
});

const routeTree = rootRoute.addChildren([indexRoute, aboutRoute, premioRoute]);

export const router = new Router({
  routeTree,
  basepath: "/regsilvia",
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
