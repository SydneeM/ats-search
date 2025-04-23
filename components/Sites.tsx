"use client"

import { Field, Label, Radio, RadioGroup } from "@headlessui/react";
import { useState } from "react";

interface Site {
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

export default function Sites() {
  let [selected, setSelected] = useState(sites[0]);

  return (
    <RadioGroup value={selected} onChange={setSelected} aria-label="Sites radio">
      {sites.map((site) => (
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
