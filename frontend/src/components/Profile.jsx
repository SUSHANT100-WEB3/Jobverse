import React, { useState, useEffect } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

// const skills = ["Html", "Css", "Javascript", "Reactjs"]
const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const [savedJobs, setSavedJobs] = useState([]);
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);

  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
    setSavedJobs(jobs);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto border border-gray-200  rounded-2xl my-5 p-4 md:p-8">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 sm:h-24 sm:w-24">
              <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
            </Avatar>
            <div>
              <h1 className="font-medium text-lg sm:text-xl">
                {user?.fullname}
              </h1>
              <p className="text-sm sm:text-base">{user?.profile?.bio}</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="text-right self-start"
            variant="outline"
          >
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail className="h-4 w-4" />
            <span className="text-sm sm:text-base">{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact className="h-4 w-4" />
            <span className="text-sm sm:text-base">{user?.phoneNumber}</span>
          </div>
        </div>
        <div className="my-5">
          <h1 className="text-sm sm:text-base font-medium">Skills</h1>
          <div className="flex flex-wrap items-center gap-1 mt-2">
            {user?.profile?.skills.length !== 0 ? (
              user?.profile?.skills.map((item, index) => (
                <Badge key={index} className="text-xs">
                  {item}
                </Badge>
              ))
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-sm sm:text-base font-bold">Resume</Label>
          {isResume ? (
            <a
              target="blank"
              href={user?.profile?.resume}
              className="text-blue-500 w-full hover:underline cursor-pointer text-xs sm:text-sm break-all"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto rounded-2xl px-4 md:px-8 border border-white">
        <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
        {/* Applied Job Table   */}
        <AppliedJobTable />
      </div>

      <div className="max-w-4xl mx-auto rounded-2xl px-4 md:px-8 border border-white mt-10">
        <h1 className="font-bold text-lg my-5">Saved Jobs</h1>

        {savedJobs.length === 0 ? (
          <p className="text-gray-500">No saved jobs</p>
        ) : (
          <div className="grid gap-4 mb-6">
            {savedJobs.map((job) => (
              <div
                key={job._id}
                onClick={() => navigate(`/description/${job?._id}`)}
                className="p-4 border rounded-xl shadow-sm bg-[#102d5a] cursor-pointer hover:shadow-lg transition"
              >
                <div className="flex items-start justify-between">
                  {/* Left side (logo + info) */}
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                    <div>
                      <h2 className="font-semibold text-white">{job?.title}</h2>
                      <p className="text-sm text-gray-300">
                        {job?.company?.name}
                      </p>
                    </div>
                  </div>

                  {/* Right side (Remove button) */}
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={(e) => {
                      e.stopPropagation(); 

                      const updated = savedJobs.filter(
                        (item) => item._id !== job._id,
                      );
                      localStorage.setItem(
                        "savedJobs",
                        JSON.stringify(updated),
                      );
                      setSavedJobs(updated);
                    }}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
