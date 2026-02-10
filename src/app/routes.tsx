import { createBrowserRouter } from "react-router";
import { Splash } from "./screens/splash";
import { Login } from "./screens/login";
import { ClaimForm } from "./screens/claim-form";
import { FraudAlert } from "./screens/fraud-alert";
import { Legitimate } from "./screens/legitimate";
import { Dashboard } from "./screens/dashboard";
import { NetworkGraph } from "./screens/network-graph";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Splash,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/claim-form",
    Component: ClaimForm,
  },
  {
    path: "/fraud-alert",
    Component: FraudAlert,
  },
  {
    path: "/legitimate",
    Component: Legitimate,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
  {
    path: "/network-graph",
    Component: NetworkGraph,
  },
]);
