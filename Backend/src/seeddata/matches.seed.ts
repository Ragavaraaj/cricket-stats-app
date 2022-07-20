import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Matches, Team } from 'src/database';
import { Repository } from 'typeorm';

@Injectable()
export class MatchesSeederService {
  constructor(
    @InjectRepository(Matches)
    private matchesRepository: Repository<Matches>,
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
  ) {}

  private randomWholeNumFromNToM(start: number, end: number) {
    return start + Math.floor(Math.random() * end);
  }

  private generateMatches(winning_team: string) {
    const runs_a = this.randomWholeNumFromNToM(60, 200);
    const runs_b = this.randomWholeNumFromNToM(60, 200);
    return {
      team_b_scores: `${runs_a}/${this.randomWholeNumFromNToM(3, 12)}`,
      team_a_scores: `${runs_b}/${this.randomWholeNumFromNToM(3, 12)}`,
      winning_team,
    };
  }

  private prepareArray(teams: string[]) {
    return teams
      .reduce((acc, _, i) => [...acc, teams.slice(i + 1, teams.length)], [])
      .slice(0, teams.length - 1);
  }

  private sessions = [2018, 2019, 2020];

  async createMatches(teamArray: string[]) {
    return await Promise.all(
      this.sessions.map(async (session) => {
        const newTeamsArray = this.prepareArray(teamArray);
        return await Promise.all(
          newTeamsArray.map(async (subTeams, i) => {
            const team_a = await this.teamRepository.findOneBy({
              id: teamArray[i],
            });
            return await Promise.all(
              subTeams.map(async (id: string) => {
                const team_b = await this.teamRepository.findOneBy({
                  id,
                });
                return this.matchesRepository.save({
                  team_a,
                  team_b,
                  session,
                  ...this.generateMatches(
                    Math.random() > 0.5 ? team_a.short_name : team_b.short_name,
                  ),
                });
              }),
            );
          }),
        );
      }),
    );
  }

  async resetTable() {
    const ids = await this.matchesRepository.find({ select: { id: true } });
    if (ids.length > 0)
      return await Promise.all(
        ids.map(async (id) => this.matchesRepository.delete(id)),
      );
    return;
  }
}
