import { BoxLeagueResults } from "./extract-table.ts";
import "jsr:@std/dotenv/load";

/**
 * Utility function to save results to JSONBin.io
 */
export async function saveResultsToJson(
  results: BoxLeagueResults,
): Promise<void> {
  const apiKey = Deno.env.get("JSON_BIN_API_KEY") || "";
  if (apiKey === "") throw new Error("No api key found");

  const url = `https://api.jsonstorage.net/v1/json/7eb003a0-7da0-4e36-b065-91deb9f1797c/5a1bae49-dfac-4850-b0bf-c91d06c5898a?apiKey=${apiKey}`;

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": apiKey,
    },
    body: JSON.stringify(results),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to save to JSONBin: ${response.status} ${response.statusText}`,
    );
  }

  console.log(`Results saved to jsonstore.net`);
}
