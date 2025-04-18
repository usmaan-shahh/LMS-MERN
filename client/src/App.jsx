import React from "react";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main>
        <Navbar />
        <Login />
      </main>
    </ThemeProvider>
  );
};

export default App;
