export interface Player {
  id: number;
  name: string;
  batting_style: string;
  bowling_style: string;
  dob: string;
  debate: string;
  country: string;
  isCaption: boolean;
  team: Team;
}

export interface Team {
  id: number;
  name: string;
}
