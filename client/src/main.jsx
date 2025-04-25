import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store, initializeAuth } from "./store/store";
import { Toaster } from "./components/ui/sonner";
import { router } from "./router.jsx";

// Initialize auth and render app
const initApp = async () => {
  try {
    await initializeAuth();
  } catch (error) {
    console.error("Error during auth initialization:", error);
  } finally {
    // Render the app regardless of auth status
    createRoot(document.getElementById("root")).render(
      <Provider store={store}>
        <RouterProvider router={router} />
        <Toaster />
      </Provider>
    );
  }
};

initApp();
