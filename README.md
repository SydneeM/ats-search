# ATS Search

ATS Search is a job search tool that looks for positions using Google's Programmable Search Engine and Custom Search JSON API. Users can enter keywords to search for, choose the applicant tracking system, and choose the date range.

![ats-search](https://github.com/user-attachments/assets/9f29d1bb-33ce-4507-af22-79e20cf57659)

## Programmable Search Engine Setup

You will need a Google account to create a [Programmable Search Engine](https://developers.google.com/custom-search/v1/introduction#create_programmable_search_engine). Once it is created, you can find the Search Engine ID in the Overview page's Basic section. Also [generate a key](https://developers.google.com/custom-search/v1/introduction#identify_your_application_to_google_with_api_key) to use the JSON API. Keep track of these values as they will be used as environment variables.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env.local file

`NEXT_PUBLIC_GOOGLE_SEARCH_API_KEY` API key for JSON API

`NEXT_PUBLIC_GOOGLE_SEARCH_ENGINE_ID` Id of Programmable Search Engine

## Installation

```bash
  npm install
```
    
## Run Locally

```bash
  npm run dev
```

## Build for Production

```bash
  npm run build
```

## Run Production

```bash
  npm run start
```

