"use client"

import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { memo, useState } from "react";

export interface Time {
  name: string;
  date: string;
  days: number;
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
    date: getDate(1),
    days: 1
  },
  {
    name: "2 Days",
    date: getDate(2),
    days: 2
  },
  {
    name: "3 Days",
    date: getDate(3),
    days: 3
  },
  {
    name: "4 Days",
    date: getDate(4),
    days: 4
  },
  {
    name: "5 Days",
    date: getDate(5),
    days: 5
  },
  {
    name: "6 Days",
    date: getDate(6),
    days: 6
  },
  {
    name: "7 Days",
    date: getDate(7),
    days: 7
  }
];

interface TimesProps {
  handleSetTime: (time: Time) => void;
}

const Times = memo(function Times({ handleSetTime }: TimesProps) {
  const [selected, setSelected] = useState<Time | null>(null);

  return (
    <div className="flex flex-col gap-y-1 w-[32%]">
      <h2 className="text-2xl">Time Range</h2>
      <Listbox
        value={selected}
        onChange={(value) => {
          if (value) {
            setSelected(value);
            handleSetTime(value);
          }
        }}
      >
        <ListboxButton className="px-3 py-2 border-2 border-border focus:outline-none hover:cursor-pointer text-start rounded-xl">
          {selected ? selected.name : "Select a Time"}
        </ListboxButton>
        <ListboxOptions
          anchor="bottom"
          transition
          className="bg-background border-2 border-border w-[var(--button-width)] focus:outline-none rounded-xl"
        >
          {times.map((time) => (
            <ListboxOption
              key={time.name}
              value={time}
              className="px-3 py-2 hover:cursor-pointer hover:bg-card"
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
