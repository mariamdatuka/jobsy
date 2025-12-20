import { createBrowserRouter, RouterProvider } from "react-router";
import { routes } from "./router";
import { useEffect } from "react";
import { useUserStore } from "./store/userStore";
import { ToastContainer } from "react-toastify";

function App() {
  const initializeAuth = useUserStore((state) => state.initializeAuth);

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    // Call initializeAuth (async) and get the cleanup function
    initializeAuth().then((unsubscribe) => {
      cleanup = unsubscribe;
    });

    return () => {
      // Call cleanup if it exists (it's the unsubscribe function)
      if (cleanup && typeof cleanup === "function") {
        cleanup();
      }
    };
  }, [initializeAuth]);

  return (
    <>
      <RouterProvider router={createBrowserRouter(routes)} />
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default App;
