"use client"

import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { useState } from "react";

export interface Site {
  name: string;
  site: string;
}

const sites: Site[] = [
  {
    name: "Ashby",
    site: "ashbyhq.com"
  },
  {
    name: "Breezy HR",
    site: "breezy.hr "
  },
  {
    name: "Built In",
    site: "builtin.com/job/"
  },
  {
    name: "Greenhouse",
    site: "greenhouse.io"
  },
  {
    name: "iCIMS",
    site: "icims.com"
  },
  {
    name: "Jobvite",
    site: "jobvite.com"
  },
  {
    name: "Lever",
    site: "lever.co"
  },
  {
    name: "Workable",
    site: "jobs.workable.com"
  },
  {
    name: "Workday Jobs",
    site: "myworkdayjobs.com"
  },
  {
    name: "Y Combinator",
    site: "workatastartup.com"
  }
];

interface SitesProps {
  handleSetSite: (site: Site) => void;
}

export default function Sites({ handleSetSite }: SitesProps) {
  const [selected, setSelected] = useState<Site | null>(null);

  return (
    <div className="flex flex-col gap-y-1 w-[32%]">
      <h2 className="text-3xl">Job Sites</h2>
      <Listbox
        value={selected}
        onChange={(value) => {
          if (value) {
            setSelected(value);
            handleSetSite(value);
          }
        }}
      >
        <ListboxButton className="px-3 py-2 border-2 border-gray-700 focus:outline-none hover:cursor-pointer text-start">
          {selected ? selected.name : "Select a Site"}
        </ListboxButton>
        <ListboxOptions
          anchor="bottom"
          transition
          className="bg-gray-700 w-[var(--button-width)] focus:outline-none"
        >
          {sites.map((site) => (
            <ListboxOption
              key={site.name}
              value={site}
              className="px-3 py-2 hover:cursor-pointer hover:bg-white/10"
            >
              <div>{site.name}</div>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
}
