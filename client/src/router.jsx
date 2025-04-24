import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import LoginSignup from "./pages/LoginSignup";
import HeroSection from "./pages/student/HeroSection";
import MyLearning from "./pages/student/MyLearning";
import Profile from "./pages/student/Profile";
import Courses from "./pages/student/Courses";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route
        path="/"
        element={
          <>
            <HeroSection />
            <Courses />
          </>
        }
      />
      <Route path="login" element={<LoginSignup />} />
      <Route path="signup" element={<LoginSignup />} />
      <Route path="mylearning" element={<MyLearning />} />
      <Route path="profile" element={<Profile />} />
    </Route>
  )
);
