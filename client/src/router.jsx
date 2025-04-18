import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import LoginSignup from "./pages/LoginSignup";
import HeroSection from "./pages/student/HeroSection";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HeroSection />} />
      <Route path="login" element={<LoginSignup />} />
      <Route path="signup" element={<LoginSignup />} />
    </Route>
  )
);
