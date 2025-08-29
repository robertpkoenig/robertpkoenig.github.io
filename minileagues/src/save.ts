import { BoxLeagueResults } from "./extract-table.ts";
import "jsr:@std/dotenv/load";

/**
 * Utility function to save results to JSONBin.io
 */
export async function saveResultsToJson(
  results: BoxLeagueResults,
): Promise<void> {
  // const apiKey = Deno.env.get("JSON_BIN_API_KEY") || "";
  // if (apiKey === "") throw new Error("No api key found");

  const url = `https://setget.io/api/set`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(results),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to save to setget: ${response.status} ${response.statusText}`,
    );
  }

  console.log(`Results saved to setget.io`);
}

const awards = [
  {
    Title: "League One Winner",
    Recipients: ["Peppe"],
  },
  {
    Title: "Most Points",
    Recipients: ["Andy King"],
  },
  {
    Title: "All Games Played",
    Recipients: [
      "Andy King",
      "Max Kuhnke",
      "Chris Lumb",
      "Craig Watt",
      "Sikandar Soin",
      "Diego Perez-Guillermo",
      "Julian Hartley",
      "Elliot Lamb",
      " Scott Jordan",
      "Heath Dyer",
      "Mark Thornton-Smith",
    ],
  },
];

export async function saveAwards(): Promise<void> {
  // const apiKey = Deno.env.get("JSON_BIN_API_KEY") || "";
  // if (apiKey === "") throw new Error("No api key found");

  const url = `https://setget.io/api/set`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      key: "grange-minileague-awards",
      expireAfter: 86400,
      content: awards,
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to save to setget: ${response.status} ${response.statusText}`,
    );
  }

  console.log(`Awards saved to setget.io`);
}
