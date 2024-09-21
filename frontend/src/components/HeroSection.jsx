import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setsearchedQuery } from "@/redux/jobSlice";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setsearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="text-center pt-5 pb-9">
      <h1 className="text-5xl font-extrabold text-black mb-4">
        Discover Your <span className="underline">Dream Career</span>
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Unleash your potential and find the perfect job that ignites your
        passion.
      </p>
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search for your dream job..."
          className="px-4 py-2 w-1/2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-black"
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button
          onClick={searchJobHandler}
          className="bg-black hover:bg-gray-800 text-white rounded-r-md"
        >
          <Search className="h-5 w-5 mr-2" />
          Search
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
