import { createBrowserRouter, RouterProvider } from "react-router";
import { routes } from "./router";
import { useEffect } from "react";
import { useUserStore } from "./store/userStore";

function App() {
  const initializeAuth = useUserStore((state) => state.initializeAuth);

  useEffect(() => {
    const unsubscribe = initializeAuth;

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [initializeAuth]);
  return <RouterProvider router={createBrowserRouter(routes)} />;
}

export default App;
