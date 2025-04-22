export default async function Home() {
  const query = 'site:boards.greenhouse.io united states intext:"apply" (intext:"ui") after:2025-04-21';

  const searchParams = new URLSearchParams({
    key: process.env.GOOGLE_SEARCH_API_KEY || "",
    cx: process.env.GOOGLE_SEARCH_ENGINE_ID || "",
    q: query
  }).toString();

  const response = await fetch("https://www.googleapis.com/customsearch/v1?" + searchParams);
  const results = await response.json();
  console.log(results);

  return (
    <div>Hello world</div>
  );
}
