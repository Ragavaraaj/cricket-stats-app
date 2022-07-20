import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Player, BattingStats } from 'src/database';
import { Repository } from 'typeorm';

type BattingStatsDataType = Omit<Omit<BattingStats, 'id'>, 'player'>;

@Injectable()
export class BattingStatsSeederService {
  constructor(
    @InjectRepository(BattingStats)
    private readonly battingStatsRepository: Repository<BattingStats>,
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
  ) {}

  private years = Array.from({ length: 10 }, (x, i) => 2011 + i);

  private randomWholeNumFromNToM(start: number, end: number) {
    return start + Math.floor(Math.random() * end);
  }

  private randomFloatNumFromNToM(start: number, end: number) {
    const randNum = start + Math.random() * end;
    return Math.round(randNum * 100) / 100;
  }

  private generateStats(year: number): BattingStatsDataType {
    return {
      year,
      average: this.randomFloatNumFromNToM(10, 60),
      strike_rate: this.randomFloatNumFromNToM(50, 150),
      runs: this.randomWholeNumFromNToM(5, 100),
      outs: this.randomWholeNumFromNToM(0, 1),
      no_of_sixes: this.randomWholeNumFromNToM(5, 100),
      no_of_fours: this.randomWholeNumFromNToM(18, 100),
      no_of_fifties: this.randomWholeNumFromNToM(0, 10),
      no_of_centuries: this.randomWholeNumFromNToM(0, 5),
      innings: this.randomWholeNumFromNToM(5, 20),
      high_score: this.randomWholeNumFromNToM(20, 90),
      dot_percentage: this.randomFloatNumFromNToM(40, 80),
      balls: this.randomWholeNumFromNToM(5, 60),
    };
  }

  private BattingStatsData: BattingStatsDataType[][] = Array.from(
    {
      length: 523,
    },
    () => this.years.map((x) => this.generateStats(x)),
  );

  private async saveData(battingStat: BattingStatsDataType) {
    const data = await this.battingStatsRepository.save(battingStat);
    return data.id;
  }

  createInitialData() {
    return this.BattingStatsData.map((dataPerPlayer) =>
      Promise.all(dataPerPlayer.map((data) => this.saveData(data))),
    );
  }

  async assignPlayerToBattingStats(playerId: string, battingStatsId: string) {
    const player = await this.playerRepository.findOneBy({ id: playerId });
    const battingStats = await this.battingStatsRepository.findOneBy({
      id: battingStatsId,
    });
    battingStats.player = player;
    return this.battingStatsRepository.save(battingStats);
  }

  async resetTable() {
    const ids = await this.battingStatsRepository.find({
      select: { id: true },
    });
    if (ids.length > 0)
      return await Promise.all(
        ids.map(async (id) => this.battingStatsRepository.delete(id)),
      );
    return;
  }
}
