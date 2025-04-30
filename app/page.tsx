"use client"

import { useCallback, useEffect, useState } from "react";

import Job from "@/components/Job";
import Sites from "@/components/Sites";
import Times from "@/components/Times";
import { Site } from "@/components/Sites";
import { Time } from "@/components/Times";

const MAX_START_INDEX = 91;

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
  const [numDays, setNumDays] = useState<number>(0);
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    const filterEdgeDates = (allResults: Result[]) => {
      const snippetDate = `${numDays + 1} day`;
      return allResults.filter((result) => !result.snippet.includes(snippetDate));
    };

    const getResults = async () => {
      try {
        const query = `${siteQuery} united states intext:"apply" ${jobQuery} ${timeQuery}`;
        const searchResults: Result[] = [];
        let startIndex = 1;
        let hasNext = true;

        while (hasNext) {
          const searchParams = new URLSearchParams({
            key: process.env.NEXT_PUBLIC_GOOGLE_SEARCH_API_KEY || "",
            cx: process.env.NEXT_PUBLIC_GOOGLE_SEARCH_ENGINE_ID || "",
            lr: "lang_en",
            q: query,
            start: String(startIndex)
          }).toString();

          const response = await fetch("https://www.googleapis.com/customsearch/v1?" + searchParams);
          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error.message);
          }

          const searchData: Search = await response.json();
          if (searchData.items !== undefined) {
            searchResults.push(...searchData.items);
          }

          hasNext = "nextPage" in searchData.queries;
          if (hasNext) {
            startIndex = searchData.queries.nextPage[0].startIndex;
            if (startIndex > MAX_START_INDEX) break;
          }
        }
        setResults(filterEdgeDates(searchResults));
      } catch (error) {
        console.log(error);
      }
    };

    if (jobQuery !== "" && siteQuery !== "" && timeQuery !== "") {
      getResults();
    }
  }, [jobQuery, siteQuery, timeQuery, numDays]);

  const handleSetJob = useCallback((value: string) => {
    setJobQuery(`intext:"${value}"`);
  }, []);

  const handleSetSite = useCallback((value: Site) => {
    setSiteQuery(`site:${value.site}`);
  }, []);

  const handleSetTime = useCallback((value: Time) => {
    setTimeQuery(`after:${value.date}`);
    setNumDays(value.days);
  }, []);

  return (
    <div className="flex flex-col gap-y-6 mx-auto w-[60vw] p-20">
      <h1 className="text-5xl">ATS Search</h1>
      <div className="flex flex-row justify-between">
        <Job handleSetJob={handleSetJob} />
        <Sites handleSetSite={handleSetSite} />
        <Times handleSetTime={handleSetTime} />
      </div>
      {results.length === 0 ?
        <span>No Results Found</span> :
        results.map((result) => (
          <div
            key={result.link}
            className="flex flex-col gap-y-2 px-5 py-4 bg-card rounded-xl"
          >
            <a
              href={result.link}
              target="_blank"
              className="font-semibold text-lg hover:underline w-fit text-[#00a5ec]"
            >
              {result.title}
            </a>
            <p>{result.snippet}</p>
          </div>
        ))
      }
    </div>
  );
}
