import React from "react";
import { Outlet } from "react-router-dom";
import BackgroundBox from "../layouts/Background";
import Navbar from "../navbar/Navbar";

const LayoutWithNavbar = () => (
  <div className="app-background">
    <BackgroundBox>
      <Navbar />
      <Outlet /> {/* This is where the child routes will be rendered */}
    </BackgroundBox>
  </div>
);

export default LayoutWithNavbar;
