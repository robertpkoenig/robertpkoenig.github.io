import { BoxLeagueResults } from "./extract-table.ts";
import "jsr:@std/dotenv/load";

/**
 * Utility function to save results to minileague API
 */
export async function saveResultsToJson(
  results: BoxLeagueResults,
): Promise<void> {
  const url = `https://minileague.robertpkoenig.deno.net/results`;

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(results.content),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to save results: ${response.status} ${response.statusText}`,
    );
  }

  console.log(`Results saved to minileague API`);
}

const awards = [
  {
    Title: "League One Winner",
    Recipients: ["Peppe"],
  },
  {
    Title: "Most Points",
    Recipients: ["Gordon Cowie [28]"],
  },
  {
    Title: "All Games Played",
    Recipients: [
      "Peppe",
      "Scott Jordan",
      "Julian Hartley",
      "Andrew Noble",
      "David Harvey",
      "Andy King",
      "Chris Lumb",
      "Craig Watt",
      "Sikandar Soin",
      "Scott Jordan",
      "Greg Edwards",
      "Andy King",
      "Sergio G. Calvaresi",
    ],
  },
];

export async function saveAwards(): Promise<void> {
  const url = `https://minileague.robertpkoenig.deno.net/awards`;

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(awards),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to save awards: ${response.status} ${response.statusText}`,
    );
  }

  console.log(`Awards saved to minileague API`);
}
