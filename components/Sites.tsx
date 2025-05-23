"use client"

import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { memo, useState } from "react";

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

const Sites = memo(function Sites({ handleSetSite }: SitesProps) {
  const [selected, setSelected] = useState<Site | null>(null);

  return (
    <div className="flex flex-col gap-y-1 w-[32%]">
      <h2 className="text-2xl">Job Sites</h2>
      <Listbox
        value={selected}
        onChange={(value) => {
          if (value) {
            setSelected(value);
            handleSetSite(value);
          }
        }}
      >
        <ListboxButton className="px-3 py-2 border-2 border-border focus:outline-none hover:cursor-pointer text-start rounded-xl">
          {selected ? selected.name : "Select a Site"}
        </ListboxButton>
        <ListboxOptions
          anchor="bottom"
          transition
          className="bg-background border-2 border-border w-[var(--button-width)] focus:outline-none rounded-xl"
        >
          {sites.map((site) => (
            <ListboxOption
              key={site.name}
              value={site}
              className="px-3 py-2 hover:cursor-pointer hover:bg-card"
            >
              <div>{site.name}</div>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
});

export default Sites;
