import React from "react";
import LatestJobsCards from "./LatestJobCards";
import { useSelector } from "react-redux";

// const randomJobs = [1,2,3,4,5,6,7,8];
const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="max-w-7xl mx-auto my-5">
      <h1 className="text-3xl font-extrabold text-gray-900 flex items-center space-x-3">
        <span className="bg-gradient-to-r from-black via-gray-700 to-red-500 text-transparent bg-clip-text">
          Jumpstart
        </span>
        <span>Your Career</span>
        <span className="bg-teal-600 text-white px-3 py-1 rounded-full text-xs">
          Hot Jobs
        </span>
      </h1>

      <div className="grid grid-cols-3 gap-4 my-5">
        {allJobs.length <= 0 ? (
          <span>No Job Available</span>
        ) : (
          allJobs
            ?.slice(0, 6)
            .map((job) => <LatestJobsCards key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
