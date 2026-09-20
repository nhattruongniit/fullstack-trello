import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { Board } from "./pages/board";
import { Dashboard } from "./pages/dashboard";
import { Login } from "./pages/login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/board/:id",
    element: <Board />
  },
]);

function App() {
  return <RouterProvider router={router} />
}

export default App;