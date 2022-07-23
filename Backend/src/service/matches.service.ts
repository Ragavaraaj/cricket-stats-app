import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsSelect, Repository } from 'typeorm';
import { Matches, Team } from '../database';

@Injectable()
export class MatchesService {
  constructor(
    @InjectRepository(Matches)
    private matchesRepository: Repository<Matches>,
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
  ) {}

  private selectQuery: FindOptionsSelect<Matches> = {
    team_a: {
      name: true,
      short_name: true,
    },
    team_b: {
      name: true,
      short_name: true,
    },
  };

  async create(
    match: Partial<Matches>,
    teamAId: string,
    teamBId: string,
  ): Promise<{ id: string }> {
    const team_a = await this.teamRepository.findOneBy({ id: teamAId });
    const team_b = await this.teamRepository.findOneBy({ id: teamBId });
    const newMatches = await this.matchesRepository.save({
      ...match,
      team_a,
      team_b,
    });
    return { id: newMatches.id };
  }

  async getAllMatches(id: string): Promise<Matches[]> {
    return await this.matchesRepository.find({
      select: this.selectQuery,
      relations: { team_a: true, team_b: true },
      where: [{ team_a: { id } }, { team_b: { id } }],
    });
  }

  async remove(id: string): Promise<void> {
    await this.matchesRepository.delete(id);
  }

  async updateMatches(
    id: string,
    newMatches: Partial<Matches>,
  ): Promise<Matches> {
    const oldMatches = await this.matchesRepository.findOneBy({ id });
    return this.matchesRepository.save({ ...oldMatches, ...newMatches });
  }
}
