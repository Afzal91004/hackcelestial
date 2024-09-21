import React from "react";
import Navbar from "./ui/shared/Navbar";
import Footer from "./Footer";

function Mockmate() {
  return (
    <div className="max-h-full">
      <Navbar />
      <iframe
        src="http://localhost:3000/dashboard"
        className="w-full h-screen"
        frameborder="0"
      ></iframe>
    </div>
  );
}

export default Mockmate;
