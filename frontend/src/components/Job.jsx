import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

const Job = ({ job }) => {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
    const exists = savedJobs.find((item) => item._id === job._id);
    setIsSaved(!!exists);
  }, [job]);
  // console.log(job)
  const navigate = useNavigate();
  // const jobId = "lsekdhjgdsnfvsdkjf";

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  const handleSave = () => {
    let savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];

    if (isSaved) {
      // remove if already saved
      savedJobs = savedJobs.filter((item) => item._id !== job._id);
      localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
      setIsSaved(false);
    } else {
      // add if not saved
      savedJobs.push(job);
      localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
      setIsSaved(true);
    }
  };

  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        {/* <Button
          variant="outline"
          className="rounded-full"
          size="icon"
          onClick={() => {
            const savedJobs =
              JSON.parse(localStorage.getItem("savedJobs")) || [];

            // check if already saved
            const isAlreadySaved = savedJobs.find(
              (item) => item._id === job._id,
            );

            if (!isAlreadySaved) {
              savedJobs.push(job);
              localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
              console.log("Job saved!");
            } else {
              console.log("Already saved");
            }
          }}
        >
          <Bookmark />
        </Button> */}
        <Button
          variant="outline"
          className="rounded-full"
          size="icon"
          onClick={handleSave}
        >
          <Bookmark fill={isSaved ? "black" : "none"} />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg text-gray-600">
            {job?.company?.name}
          </h1>
          <p className="text-sm text-gray-500">{job?.location}</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge className={"text-white font-bold text-xs"} variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className={"text-[#e2d6d3] font-bold text-xs"} variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className={"text-[#f4f2f6] font-bold text-xs"} variant="ghost">
          {job?.salary}LPA
        </Badge>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mt-4">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="w-full sm:w-auto"
        >
          Details
        </Button>
        <Button
          onClick={handleSave}
          className={`w-full sm:w-auto ${isSaved ? "bg-green-600" : "bg-[#7209b7]"}`}
        >
          {isSaved ? "Saved" : "Save For Later"}
        </Button>
      </div>
    </div>
  );
};

export default Job;
