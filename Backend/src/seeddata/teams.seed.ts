import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Player, Team } from 'src/database';
import { Repository } from 'typeorm';

type TeamDataType = Omit<Omit<Team, 'id'>, 'members'>;

@Injectable()
export class TeamSeederService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
  ) {}

  private TeamsData: TeamDataType[] = [
    {
      name: 'Kolkata Knight Riders',
      short_name: 'KKR',
      home_ground: 'Eden Gardens',
      owner: 'Shah Rukh Khan Juhi Chawla Jay Mehta',
    },
    {
      name: 'Royal Challengers Bangalore',
      short_name: 'RCB',
      home_ground: 'M. Chinnaswamy Stadium',
      owner: 'United Spirits',
    },
    {
      name: 'Chennai Super Kings',
      short_name: 'CSK',
      home_ground: 'M. A. Chidambaram Stadium',
      owner: 'N. Srinivasan',
    },
    {
      name: 'Kings XI Punjab',
      short_name: 'KXIP',
      home_ground: 'Inderjit Singh Bindra Stadium',
      owner: 'Mohit Burman Ness Wadia Preity Zinta Karan Paul',
    },
    {
      name: 'Rajasthan Royals',
      short_name: 'RR',
      home_ground: 'Sawai Mansingh Stadium',
      owner: 'Manoj Badale Lachlan Murdoch Gerry Cardinale',
    },
    {
      name: 'Delhi Daredevils',
      short_name: 'DD',
      home_ground: 'Arun Jaitley Stadium',
      owner: 'Sajjan Jindal G. M. Rao',
    },
    {
      name: 'Mumbai Indians',
      short_name: 'MI',
      home_ground: 'Wankhede Stadium',
      owner: 'Mukesh Ambani',
    },
    {
      name: 'Deccan Chargers',
      short_name: 'DC',
      home_ground: 'Rajiv Gandhi International Cricket Stadium',
      owner: 'Kalanithi Maran',
    },
    {
      name: 'Pune Warriors',
      short_name: 'PW',
      home_ground: 'Inderjit Singh Bindra Stadium',
      owner: 'Mohit Burman Ness Wadia Preity Zinta Karan Paul',
    },
    {
      name: 'Sunrisers Hyderabad',
      short_name: 'SRH',
      home_ground: 'Rajiv Gandhi International Cricket Stadium',
      owner: 'Kalanithi Maran',
    },
    {
      name: 'Gujarat Lions',
      short_name: 'GL',
      home_ground: 'Narendra Modi Stadium',
      owner: 'Steve Koltes Donald Mackenzie Rolly van Rappard',
    },
  ];

  createInitialData() {
    return this.TeamsData.map(async (team: TeamDataType) => {
      return await this.teamRepository.save(team).then((value) => {
        return value.id;
      });
    });
  }

  async assignPlayerToTeam(
    playerId: string,
    teamId: string,
    isCaption: boolean,
  ) {
    const player = await this.playerRepository.findOneBy({ id: playerId });
    const team = await this.teamRepository.findOneBy({ id: teamId });
    player.team = team;
    player.isCaption = isCaption ?? false;
    return this.playerRepository.save(player);
  }
}
