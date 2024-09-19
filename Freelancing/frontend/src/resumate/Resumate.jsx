import React from "react";
import { useSelector } from "react-redux";
import Navbar from "@/components/ui/shared/Navbar";

function Resumate() {
  const { user } = useSelector((store) => store.auth);

  return <div>Resumate Home page</div>;
}

export default Resumate;
