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
  let [selected, setSelected] = useState(sites[0]);

  return (
    <div className="flex flex-col">
      <span>Job Sites</span>
      <Listbox
        value={selected}
        onChange={(value) => {
          setSelected(value);
          handleSetSite(value);
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
