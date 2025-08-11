import { QueryClient } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

type MyRouterContext = {
  queryClient: typeof queryClient;
};

const rootRoute = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="min-h-svh flex flex-col">
      <main className="flex-1 bg-background">
        {/* This is where child routes will render */}
        <Outlet />
      </main>
      {import.meta.env.MODE === "development" && (
        <TanStackRouterDevtools position="bottom-left" />
      )}
    </div>
  );
}

export { rootRoute };
