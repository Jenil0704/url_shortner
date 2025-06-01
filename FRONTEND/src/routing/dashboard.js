import { createRoute } from "@tanstack/react-router";
import DashboardPage from "../pages/Dashboard.jsx";
import { rootRoute } from "./routeTree";

export const dashboardRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/dashboard',
    component: DashboardPage,
})