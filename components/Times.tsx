"use client"

import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { useState } from "react";

export interface Time {
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

interface TimesProps {
  handleSetTime: (time: Time) => void;
}

export default function Times({ handleSetTime }: TimesProps) {
  let [selected, setSelected] = useState(times[0]);

  return (
    <div className="flex flex-col">
      <span>Time Range</span>
      <Listbox
        value={selected}
        onChange={(value) => {
          setSelected(value);
          handleSetTime(value);
        }}
      >
        <ListboxButton
          className="w-50 px-3 py-2 border-2 focus:outline-none"
        >
          {selected.name}
        </ListboxButton>
        <ListboxOptions
          anchor="bottom"
          transition
          className="bg-gray-700 w-50 focus:outline-none"
        >
          {times.map((time) => (
            <ListboxOption
              key={time.name}
              value={time}
              className="px-3 py-2 hover:cursor-pointer hover:bg-white/10"
            >
              <div>{time.name}</div>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
}
