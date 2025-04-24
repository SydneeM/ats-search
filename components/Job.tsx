"use client"

import { useCallback, useState, memo} from "react";
import debounce from "lodash/debounce";

const DEBOUNCE_MS = 500;

interface JobProps {
  handleSetJob: (job: string) => void;
}

const Job = memo(function Job({ handleSetJob }: JobProps) {
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
    <div className="flex flex-col gap-y-1 w-[32%]">
      <h2 className="text-2xl">Job</h2>
      <input
        className="px-3 py-2 border-2 border-gray-700 focus:outline-none rounded-xl"
        value={job}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
});

export default Job;
