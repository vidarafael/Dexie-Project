import {
  createBrowserRouter,
} from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";

const App = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  }
])

export { App }
