"use client"

import { useState } from "react";


interface JobProps {
  handleSetJob: (job: string) => void;
}

export default function Job({ handleSetJob }: JobProps) {
  const [job, setJob] = useState<string>("");

  return (
    <div className="flex flex-col">
      <span>Job</span>
      <input
        className="w-50 px-3 py-2 border-2 focus:outline-none"
        value={job}
        onChange={(e) => {
          setJob(e.target.value);
          handleSetJob(e.target.value);
        }}
      />
    </div>
  );
}
