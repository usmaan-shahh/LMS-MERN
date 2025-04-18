import { Navbar } from "@/components/Navbar";
import Courses from "@/pages/student/Courses";
import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <div>
        <Outlet />
        <Courses />
      </div>
    </div>
  );
};

export default MainLayout;
