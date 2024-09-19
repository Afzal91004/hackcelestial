import React, { useEffect, useState } from "react";
import AddResume from "./components/AddResume";
import { UserButton, useUser } from "@clerk/nextjs";
import GlobalApi from "../../service/GlobalApi";
import ResumeCardItem from "./components/ResumeCardItem";

function Dashboard() {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);
  useEffect(() => {
    user && GetResumesList();
  }, [user]);
  // used to get users resume
  const GetResumesList = () => {
    GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress).then(
      (response) => {
        console.log(response.data);
        setResumeList(response.data.data);
      }
    );
  };
  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h2 className="font-bold text-3xl">My Resume</h2>
      <p>Start Creating AI resume for your next job role</p>
      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        <AddResume />
        {resumeList.length > 0 &&
          resumeList.map((resume, index) => (
            <ResumeCardItem resume={resume} key={index} />
          ))}
      </div>
      {/* <UserButton /> */}
      {/* kaam aayega */}
    </div>
  );
}

export default Dashboard;
