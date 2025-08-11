import { HomeComponent } from "@/pages/index";
import { rootRoute } from "@/routes/root";
import { createRoute } from "@tanstack/react-router";

export const rootRouter = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomeComponent,
});
