import {
  scrapeBoxLeagueFromUrl,
  saveResultsToJson,
} from "./extract-table.ts";

scrapeBoxLeagueFromUrl("https://www.sportyhq.com/club/box/view/242")
  .then((results) => {
    console.log("Scraped results:", JSON.stringify(results, null, 2));
    saveResultsToJson(results);
  })
  .catch((error) => {
    console.error("Scraping failed:", error);
  });

// From HTML string:
// const results = scrapeBoxLeagueFromHtml(htmlString);
// console.log("Scraped results:", JSON.stringify(results, null, 2));
