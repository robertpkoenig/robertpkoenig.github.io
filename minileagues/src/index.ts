import { scrapeBoxLeagueFromUrl } from "./extract-table.ts";
import { saveAwards, saveResultsToJson } from "./save.ts";

scrapeBoxLeagueFromUrl("https://www.sportyhq.com/club/box/view/242")
  .then((results) => {
    console.log("Scraped results:", JSON.stringify(results, null, 2));
    saveResultsToJson(results);
    saveAwards();
  })
  .catch((error) => {
    console.error("Scraping failed:", error);
  });

// From HTML string:
// const results = scrapeBoxLeagueFromHtml(htmlString);
// console.log("Scraped results:", JSON.stringify(results, null, 2));
