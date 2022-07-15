import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsSelect, Repository } from 'typeorm';
import { Player, Team } from '../database';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
  ) {}

  private selectQuery: FindOptionsSelect<Team> = {
    members: {
      name: true,
      isCaption: true,
      id: true,
    },
  };

  async create(team: Partial<Team>): Promise<{ id: string }> {
    const newTeam = await this.teamRepository.save(team);
    return { id: newTeam.id };
  }

  async getAll(): Promise<Team[]> {
    return await this.teamRepository.find({
      select: this.selectQuery,
      relations: { members: true },
    });
  }

  async getOne(id: string): Promise<Team> {
    return await this.teamRepository.findOne({
      select: this.selectQuery,
      relations: { members: true },
      where: { id },
    });
  }

  async remove(id: string): Promise<void> {
    await this.teamRepository.delete(id);
  }

  async updateTeam(id: string, newTeam: Partial<Team>): Promise<Team> {
    const oldTeam = await this.teamRepository.findOneBy({ id });
    return this.teamRepository.save({ ...oldTeam, ...newTeam });
  }

  async updateTeamMembers(team_id: string, player_id: string) {
    const player = await this.playerRepository.findOneBy({ id: player_id });
    const oldTeam = await this.teamRepository.findOne({
      relations: { members: true },
      where: {
        id: team_id,
      },
    });
    oldTeam.members = [...new Set([...oldTeam.members, player])];
    return this.teamRepository.save(oldTeam);
  }
}
