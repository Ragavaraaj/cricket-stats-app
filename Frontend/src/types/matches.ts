export interface MatchesResponse {
  id: number;
  session: string;
  team_a_scores: string;
  team_b_scores: string;
  winning_team: string;
  team_a: TeamA;
  team_b: TeamB;
}

export interface TeamA {
  name: string;
  short_name: string;
}

export interface TeamB {
  name: string;
  short_name: string;
}
