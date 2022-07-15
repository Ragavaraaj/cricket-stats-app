export interface BattingStats {
  id: number;
  year: number;
  innings: number;
  runs: number;
  balls: number;
  outs: number;
  average: number;
  strike_rate: number;
  high_score: number;
  no_of_fifties: number;
  no_of_centuries: number;
  no_of_fours: number;
  no_of_sixes: number;
  dot_percentage: number;
  player: BattingStatsPlayer;
}

export interface BattingStatsPlayer {
  id: number;
}
