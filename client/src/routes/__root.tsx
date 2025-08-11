import { createRouter } from "@tanstack/react-router";
import { queryClient, rootRoute } from "./root";
import { ErrorComponent } from "./error";
import { rootRouter } from "./pages/index";


const routeTree = rootRoute.addChildren([
  rootRouter
]);

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  defaultErrorComponent: ({ error }: { error: Error }) => (
    <ErrorComponent error={error as Error} />
  ),
  notFoundMode: "fuzzy",
  defaultStaleTime: 10000,
  context: {
    queryClient,
    auth: undefined!,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export { router };
