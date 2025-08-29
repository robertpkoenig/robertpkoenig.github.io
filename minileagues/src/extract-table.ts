// deno-lint-ignore-file no-explicit-any
import * as cheerio from "cheerio";
import axios from "axios";

interface Player {
  id: string;
  name: string;
  position: number;
  points: number;
  imageUrl?: string;
  profileUrl?: string;
}

interface GameResult {
  player1: string;
  player2: string;
  score: string;
  resultId?: string;
}

interface Box {
  id: string;
  name: string;
  players: Player[];
  games: GameResult[];
}

export interface BoxLeagueResults {
  title: string;
  period: string;
  boxes: Box[];
  pointsSystem: {
    pointsPerGameWon: number;
    pointsForMatchWin: number;
    pointsForPlayingMatch: number;
    pointsForPlayingAllMatches: number;
  };
  fetchedAt: string;
}

class BoxLeagueScraper {
  private $: cheerio.CheerioAPI;

  constructor(html: string) {
    this.$ = cheerio.load(html);
  }

  /**
   * Extract the main league information
   */
  private extractLeagueInfo(): { title: string; period: string } {
    const title = this.$(".page-title h4").text().trim();
    const period = this.$(".card-header strong").text().trim();

    return { title, period };
  }

  /**
   * Extract points system information
   */
  private extractPointsSystem() {
    const pointsSystem = {
      pointsPerGameWon: 0,
      pointsForMatchWin: 0,
      pointsForPlayingMatch: 0,
      pointsForPlayingAllMatches: 0,
    };

    // Find the points help section
    this.$(".row").each((_, row) => {
      const rowEl = this.$(row);
      const label = rowEl.find(".col-md-3 strong").text().toLowerCase();
      const valueText = rowEl.find(".col-md-1").text();
      const value = parseInt(valueText.match(/\d+/)?.[0] || "0");

      if (label.includes("points per game won")) {
        pointsSystem.pointsPerGameWon = value;
      } else if (label.includes("points for a match win")) {
        pointsSystem.pointsForMatchWin = value;
      } else if (label.includes("points for playing a match")) {
        pointsSystem.pointsForPlayingMatch = value;
      } else if (label.includes("points for playing all your box matches")) {
        pointsSystem.pointsForPlayingAllMatches = value;
      }
    });

    return pointsSystem;
  }

  /**
   * Extract player information from a box table
   */
  private extractPlayers(boxTable: cheerio.Cheerio<any>): Player[] {
    const players: Player[] = [];

    boxTable.find("tbody tr").each((_, row) => {
      const rowEl = this.$(row);
      const position = parseInt(rowEl.find("td:first-child strong").text());
      const nameCell = rowEl.find("td:nth-child(2)");

      // Extract player name and profile URL
      const profileLink = nameCell.find('a[href*="/ranking/user/"]');
      const name = profileLink.text().trim();
      const profileUrl = profileLink.attr("href");

      // Extract player image
      const img = nameCell.find("img");
      const imageUrl = img.attr("src");

      // Extract points (last column)
      const pointsText = rowEl.find("td.success").text().trim();
      const points = parseInt(pointsText) || 0;

      // Generate a simple ID from the profile URL or name
      const id = profileUrl
        ? profileUrl.split("/").pop() || name.replace(/\s+/g, "-").toLowerCase()
        : name.replace(/\s+/g, "-").toLowerCase();

      if (name) {
        players.push({
          id,
          name,
          position,
          points,
          imageUrl,
          profileUrl: profileUrl || undefined,
        });
      }
    });

    return players;
  }

  /**
   * Extract game results from a box table
   */
  private extractGames(
    boxTable: cheerio.Cheerio<any>,
    players: Player[],
  ): GameResult[] {
    const games: GameResult[] = [];

    // Create a map of player positions to names for easier lookup
    const positionToPlayer = new Map<number, string>();
    players.forEach((player) => {
      positionToPlayer.set(player.position, player.name);
    });

    boxTable.find("tbody tr").each((rowIndex, row) => {
      const rowEl = this.$(row);
      const player1Position = rowIndex + 1;
      const player1Name = positionToPlayer.get(player1Position);

      if (!player1Name) return;

      // Check each cell for game results (skip first two cells which are position and name)
      rowEl.find("td").each((cellIndex, cell) => {
        if (cellIndex <= 1) return; // Skip position and name cells
        if (cellIndex === rowEl.find("td").length - 1) return; // Skip points column

        const cellEl = this.$(cell);
        const scoreSpan = cellEl.find(".lead");
        const score = scoreSpan.text().trim();

        // Only process cells with actual scores
        if (score && score !== "") {
          const player2Position = cellIndex - 1; // Adjust for skipped columns
          const player2Name = positionToPlayer.get(player2Position);

          if (player2Name && player1Name !== player2Name) {
            // Extract result ID if available
            const deleteLink = cellEl.find('a[data-url*="/result/delete/"]');
            const resultId = deleteLink
              .attr("data-url")
              ?.match(/\/result\/delete\/(\d+)/)?.[1];

            games.push({
              player1: player1Name,
              player2: player2Name,
              score,
              resultId,
            });
          }
        }
      });
    });

    return games;
  }

  /**
   * Extract all boxes from the page
   */
  private extractBoxes(): Box[] {
    const boxes: Box[] = [];

    // Find all box divisions
    this.$(".page_break").each((_, boxDiv) => {
      const boxEl = this.$(boxDiv);

      // Extract box name
      const nameEl = boxEl.find("h5");
      const name = nameEl.text().trim();
      const boxId = `box-${boxes.length + 1}`;

      if (!name) return;

      // Find the table for this box
      const table = boxEl.find("table.table");
      if (table.length === 0) return;

      // Extract players and games
      const players = this.extractPlayers(table);
      const games = this.extractGames(table, players);

      boxes.push({
        id: boxId,
        name,
        players,
        games,
      });
    });

    return boxes;
  }

  /**
   * Main scraping method
   */
  public scrapeResults(): BoxLeagueResults {
    const { title, period } = this.extractLeagueInfo();
    const pointsSystem = this.extractPointsSystem();
    const boxes = this.extractBoxes();

    return {
      title,
      period,
      boxes,
      pointsSystem,
      fetchedAt: new Date().toISOString(),
    };
  }
}

/**
 * Main function to scrape box league results from a URL
 */
export async function scrapeBoxLeagueFromUrl(
  url: string,
): Promise<BoxLeagueResults> {
  try {
    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
      timeout: 30000,
    });

    const scraper = new BoxLeagueScraper(response.data);
    return scraper.scrapeResults();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to scrape box league results: ${error.message}`);
    }
    throw new Error("Failed to scrape box league results: Unknown error");
  }
}

/**
 * Function to scrape from HTML string (useful for testing)
 */
export function scrapeBoxLeagueFromHtml(html: string): BoxLeagueResults {
  const scraper = new BoxLeagueScraper(html);
  return scraper.scrapeResults();
}
