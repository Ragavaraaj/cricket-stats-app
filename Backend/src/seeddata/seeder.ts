import { Injectable, Logger } from '@nestjs/common';
import { BattingStatsSeederService } from './batting.seed';
import { BowlingStatsSeederService } from './bowling.seed';
import { PlayerSeederService } from './player.seed';
import { TeamSeederService } from './teams.seed';

@Injectable()
export class Seeder {
  constructor(
    private readonly logger: Logger,
    private readonly teamSeederService: TeamSeederService,
    private readonly playerSeederService: PlayerSeederService,
    private readonly battingStatsSeederService: BattingStatsSeederService,
    private readonly bowlingStatsSeederService: BowlingStatsSeederService,
  ) {}
  private teamIds: string[];
  private playerIds: string[];
  private readonly noOfPlayersInTeam = 12;

  get requiredPlayers(): number {
    return this.teamIds.length * this.noOfPlayersInTeam;
  }

  get randomSlice() {
    const start = Math.floor(
      Math.random() * (this.playerIds.length - this.requiredPlayers),
    );
    return this.playerIds.slice(start, start + this.requiredPlayers);
  }

  oneDim_to_twoDim(arr: any[], x: number) {
    const newArr = [];
    while (arr.length) newArr.push(arr.splice(0, x));
    return newArr;
  }

  async seed() {
    this.teamIds = await Promise.all(
      this.teamSeederService.createInitialData(),
    );
    this.logger.log(`have created ${this.teamIds.length} Teams`);

    this.playerIds = await Promise.all(
      this.playerSeederService.createInitialData(),
    );
    this.logger.log(`have created ${this.playerIds.length} Players`);

    const selectedPlayers = this.oneDim_to_twoDim(
      this.randomSlice,
      this.noOfPlayersInTeam,
    );

    await Promise.all(
      selectedPlayers.map(async (playerPerTeam, index) => {
        return Promise.all(
          await playerPerTeam.map(async (player: string, j: number) => {
            return await this.teamSeederService.assignPlayerToTeam(
              player,
              this.teamIds[index],
              j === 0,
            );
          }),
        );
      }),
    );

    this.logger.log(
      `have assigned players from ${this.randomSlice[0]} to ${
        this.randomSlice[this.randomSlice.length - 1]
      } to Teams`,
    );

    const statsBattingStatsIds = await Promise.all(
      this.battingStatsSeederService.createInitialData(),
    );

    this.logger.log(`have created ${this.playerIds.length * 10} BattingStats`);

    await Promise.all(
      statsBattingStatsIds.map(async (statsPerPlayer, i) =>
        Promise.all(
          statsPerPlayer.map(
            async (statId) =>
              await this.battingStatsSeederService.assignPlayerToBattingStats(
                this.playerIds[i],
                statId,
              ),
          ),
        ),
      ),
    );

    this.logger.log(
      `have assigned ${this.playerIds.length * 10} BattingStats to ${
        this.playerIds.length
      } players`,
    );

    const statsBowlingStatsIds = await Promise.all(
      this.bowlingStatsSeederService.createInitialData(),
    );

    this.logger.log(`have created ${this.playerIds.length * 10} BowlingStats`);

    await Promise.all(
      statsBowlingStatsIds.map(async (statsPerPlayer, i) =>
        Promise.all(
          statsPerPlayer.map(
            async (statId) =>
              await this.bowlingStatsSeederService.assignPlayerToBowlingStats(
                this.playerIds[i],
                statId,
              ),
          ),
        ),
      ),
    );

    this.logger.log(
      `have assigned ${this.playerIds.length * 10} BowlingStats to ${
        this.playerIds.length
      } players`,
    );
  }
}
