export interface BowlingStats {
  id: number;
  year: number;
  innings: number;
  runs: number;
  wickets: number;
  econ: number;
  average: number;
  strike_rate: number;
  five_wickets: number;
  best_bowling_innings: string;
  no_of_fours: number;
  no_of_sixes: number;
  dot_percentage: number;
  player: BowlingStatsPlayer;
}

export interface BowlingStatsPlayer {
  id: number;
  name: string;
}
