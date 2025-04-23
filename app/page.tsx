"use client"

import { useEffect, useState } from "react";

import Job from "@/components/Job";
import Sites from "@/components/Sites";
import Times from "@/components/Times";
import { Site } from "@/components/Sites";
import { Time } from "@/components/Times";

interface Promotion {
  "title": string,
  "htmlTitle": string,
  "link": string,
  "displayLink": string,
  "bodyLines": [
    {
      "title": string,
      "htmlTitle": string,
      "url": string,
      "link": string
    }
  ],
  "image": {
    "source": string,
    "width": number,
    "height": number
  }
}

interface Result {
  "kind": string,
  "title": string,
  "htmlTitle": string,
  "link": string,
  "displayLink": string,
  "snippet": string,
  "htmlSnippet": string,
  "cacheId"?: string,
  "formattedUrl": string,
  "htmlFormattedUrl": string,
  "pagemap": object,
  "mime"?: string,
  "fileFormat"?: string,
  "image"?: {
    "contextLink": string,
    "height": number,
    "width": number,
    "byteSize": number,
    "thumbnailLink": string,
    "thumbnailHeight": number,
    "thumbnailWidth": number
  },
  "labels"?: [
    {
      "name": string,
      "displayName": string,
      "label_with_op": string
    }
  ]
}

interface Search {
  "kind": string,
  "url": {
    "type": string,
    "template": string
  },
  "queries": {
    "previousPage": [
      {
        "title": string,
        "totalResults": string,
        "searchTerms": string,
        "count": number,
        "startIndex": number,
        "startPage": number,
        "language": string,
        "inputEncoding": string,
        "outputEncoding": string,
        "safe": string,
        "cx": string,
        "sort": string,
        "filter": string,
        "gl": string,
        "cr": string,
        "googleHost": string,
        "disableCnTwTranslation": string,
        "hq": string,
        "hl": string,
        "siteSearch": string,
        "siteSearchFilter": string,
        "exactTerms": string,
        "excludeTerms": string,
        "linkSite": string,
        "orTerms": string,
        "relatedSite": string,
        "dateRestrict": string,
        "lowRange": string,
        "highRange": string,
        "fileType": string,
        "rights": string,
        "searchType": string,
        "imgSize": string,
        "imgType": string,
        "imgColorType": string,
        "imgDominantColor": string
      }
    ],
    "request": [
      {
        "title": string,
        "totalResults": string,
        "searchTerms": string,
        "count": number,
        "startIndex": number,
        "startPage": number,
        "language": string,
        "inputEncoding": string,
        "outputEncoding": string,
        "safe": string,
        "cx": string,
        "sort": string,
        "filter": string,
        "gl": string,
        "cr": string,
        "googleHost": string,
        "disableCnTwTranslation": string,
        "hq": string,
        "hl": string,
        "siteSearch": string,
        "siteSearchFilter": string,
        "exactTerms": string,
        "excludeTerms": string,
        "linkSite": string,
        "orTerms": string,
        "relatedSite": string,
        "dateRestrict": string,
        "lowRange": string,
        "highRange": string,
        "fileType": string,
        "rights": string,
        "searchType": string,
        "imgSize": string,
        "imgType": string,
        "imgColorType": string,
        "imgDominantColor": string
      }
    ],
    "nextPage": [
      {
        "title": string,
        "totalResults": string,
        "searchTerms": string,
        "count": number,
        "startIndex": number,
        "startPage": number,
        "language": string,
        "inputEncoding": string,
        "outputEncoding": string,
        "safe": string,
        "cx": string,
        "sort": string,
        "filter": string,
        "gl": string,
        "cr": string,
        "googleHost": string,
        "disableCnTwTranslation": string,
        "hq": string,
        "hl": string,
        "siteSearch": string,
        "siteSearchFilter": string,
        "exactTerms": string,
        "excludeTerms": string,
        "linkSite": string,
        "orTerms": string,
        "relatedSite": string,
        "dateRestrict": string,
        "lowRange": string,
        "highRange": string,
        "fileType": string,
        "rights": string,
        "searchType": string,
        "imgSize": string,
        "imgType": string,
        "imgColorType": string,
        "imgDominantColor": string
      }
    ]
  },
  "promotions": Promotion[],
  "context": object,
  "searchInformation": {
    "searchTime": number,
    "formattedSearchTime": string,
    "totalResults": string,
    "formattedTotalResults": string
  },
  "spelling": {
    "correctedQuery": string,
    "htmlCorrectedQuery": string
  },
  "items": Result[]
}

export default function Home() {
  const [jobQuery, setJobQuery] = useState<string>("");
  const [siteQuery, setSiteQuery] = useState<string>("");
  const [timeQuery, setTimeQuery] = useState<string>("");
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    const getResults = async () => {
      const query = `${siteQuery} united states intext:"apply" (intext:"${jobQuery}") after:${timeQuery}`;

      const searchParams = new URLSearchParams({
        key: process.env.NEXT_PUBLIC_GOOGLE_SEARCH_API_KEY || "",
        cx: process.env.NEXT_PUBLIC_GOOGLE_SEARCH_ENGINE_ID || "",
        lr: "lang_en",
        q: query
      }).toString();

      const response = await fetch("https://www.googleapis.com/customsearch/v1?" + searchParams);
      const searchData: Search = await response.json();
      const searchResults: Result[] = searchData.items;
      if (searchResults !== undefined) {
        console.log(searchResults);
        setResults(searchResults);
      } else {
        setResults([]);
      }
    };

    if (jobQuery !== "" && siteQuery !== "" && timeQuery !== "") {
      getResults();
    }
  }, [jobQuery, siteQuery, timeQuery]);

  const handleSetJob = (value: string) => {
    setJobQuery(value);
  }

  const handleSetSite = (value: Site) => {
    setSiteQuery(`site:${value.site}`);
  }

  const handleSetTime = (value: Time) => {
    setTimeQuery(`after:${value.date}`);
  }

  return (
    <div className="flex flex-col gap-y-6 mx-auto w-[60vw] p-20">
      <h1 className="text-5xl">ATS Search</h1>
      <div className="flex flex-row justify-between">
        <Job handleSetJob={handleSetJob} />
        <Sites handleSetSite={handleSetSite} />
        <Times handleSetTime={handleSetTime} />
      </div>
      {
        results.map((result) => (
          <div
            key={result.link}
            className="flex flex-col gap-y-2 px-5 py-4 bg-foreground/10"
          >
            <h3 className="font-semibold text-lg">{result.title}</h3>
            <p>{result.snippet}</p>
          </div>
        ))
      }
    </div>
  );
}
