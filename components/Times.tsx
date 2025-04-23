"use client"

import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { memo, useState } from "react";

export interface Time {
  name: string;
  date: string;
}

const padZeros = (value: number) => {
  return String(value).padStart(2, "0");
};

const getDate = (numDays: number) => {
  const date = new Date();
  date.setDate(date.getDate() - numDays);
  const backDate: string = `${date.getFullYear()}-${padZeros(date.getMonth() + 1)}-${padZeros(date.getDate())}`;
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

const Times = memo(function Times({ handleSetTime }: TimesProps) {
  const [selected, setSelected] = useState<Time | null>(null);

  return (
    <div className="flex flex-col gap-y-1 w-[32%]">
      <h2 className="text-3xl">Time Range</h2>
      <Listbox
        value={selected}
        onChange={(value) => {
          if (value) {
            setSelected(value);
            handleSetTime(value);
          }
        }}
      >
        <ListboxButton className="px-3 py-2 border-2 border-gray-700 focus:outline-none hover:cursor-pointer text-start rounded-xl">
          {selected ? selected.name : "Select a Time"}
        </ListboxButton>
        <ListboxOptions
          anchor="bottom"
          transition
          className="bg-gray-700 w-[var(--button-width)] focus:outline-none rounded-xl"
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
});

export default Times;
