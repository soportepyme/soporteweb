
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Booking from "./pages/Booking";
import Admin from "./pages/Admin";
import Confirmation from "./pages/Confirmation";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/booking",
    element: <Booking />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/confirmation/:id",
    element: <Confirmation />,
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
