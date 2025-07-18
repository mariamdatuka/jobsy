import { createBrowserRouter, RouterProvider } from "react-router";
import { routes } from "./router";

function App() {
  return <RouterProvider router={createBrowserRouter(routes)} />;
}

export default App;
