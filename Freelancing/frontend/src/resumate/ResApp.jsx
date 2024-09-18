import React from "react";
import { Outlet } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

export default function ResApp() {
  const { isLoaded, isSignedIn } = useUser();

  if (!isSignedIn && isLoaded) {
    return <Navigate to="/resumate/authentication/sign-in" />;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return <Outlet />; // Render child routes
}
