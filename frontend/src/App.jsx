import React from "react";
import BackgroundBox from "./components/layouts/Background";
import "./styles/App.css";
import Navbar from "./components/navbar/Navbar";

const App = () => {
  return (
    <div className="app-background">
      <BackgroundBox>
        <Navbar />
        {/* Your content goes here */}
        <h1>Welcome to My App</h1>
        <h1>Welcome to My App</h1>
        <h1>Welcome to My App</h1>
        <h1>Welcome to My App</h1>
        <h1>Welcome to My App</h1>
        <h1>Welcome to My App</h1>
      </BackgroundBox>
    </div>
  );
};

export default App;
