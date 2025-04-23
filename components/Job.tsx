"use client"

import { useCallback, useState } from "react";
import debounce from "lodash/debounce";

const DEBOUNCE_MS = 500;

interface JobProps {
  handleSetJob: (job: string) => void;
}

export default function Job({ handleSetJob }: JobProps) {
  const [job, setJob] = useState<string>("");

  const debouncedChangeHandler = useCallback(
    debounce((value: string) => {
      handleSetJob(value);
    }, DEBOUNCE_MS), []
  );

  const handleChange = (value: string) => {
    setJob(value);
    debouncedChangeHandler(value);
  };

  return (
    <div className="flex flex-col">
      <span>Job</span>
      <input
        className="w-50 px-3 py-2 border-2 focus:outline-none"
        value={job}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
}
