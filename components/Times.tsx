"use client"

import { Field, Label, Radio, RadioGroup } from "@headlessui/react";
import { useState } from "react";

interface Time {
  name: string;
  date: string;
}

const padZeros = (value: number) => {
  return String(value).padStart(2, "0");
};

const getDate = (numDays: number) => {
  let date = new Date();
  date.setDate(date.getDate() - numDays);
  const backDate: string = `${date.getFullYear()}-${padZeros(date.getMonth())}-${padZeros(date.getDate())}`;
  return backDate;
};

const times: Time[] = [
  {
    name: "1 Day",
    date: getDate(1)
  },
  {
    name: "2 Days",
    date: getDate(2)
  },
  {
    name: "3 Days",
    date: getDate(3)
  },
  {
    name: "1 Week",
    date: getDate(7)
  }
];

export default function Times() {
  let [selected, setSelected] = useState(times[0]);

  return (
    <RadioGroup value={selected} onChange={setSelected} aria-label="Times radio">
      {times.map((site) => (
        <Field key={site.name} className="flex items-center gap-2">
          <Radio
            value={site}
            className="group flex size-5 items-center justify-center rounded-full border bg-white data-[checked]:bg-blue-400"
          >
            <span className="invisible size-2 rounded-full bg-white group-data-[checked]:visible" />
          </Radio>
          <Label>{site.name}</Label>
        </Field>
      ))}
    </RadioGroup>
  );
}
