export interface Teams {
  id: number;
  name: string;
  short_name: string;
  home_ground: string;
  owner: string;
  members: Member[];
}

export interface Member {
  id: number;
  name: string;
  isCaption: boolean;
}
