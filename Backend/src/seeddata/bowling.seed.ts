import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Player, BowlingStats } from 'src/database';
import { Repository } from 'typeorm';

type BowlingStatsDataType = Omit<Omit<BowlingStats, 'id'>, 'player'>;

@Injectable()
export class BowlingStatsSeederService {
  constructor(
    @InjectRepository(BowlingStats)
    private readonly bowlingStatsRepository: Repository<BowlingStats>,
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

  private generateStats(year: number): BowlingStatsDataType {
    return {
      year,
      average: this.randomFloatNumFromNToM(10, 60),
      strike_rate: this.randomFloatNumFromNToM(50, 150),
      runs: this.randomWholeNumFromNToM(5, 100),
      no_of_sixes: this.randomWholeNumFromNToM(5, 100),
      no_of_fours: this.randomWholeNumFromNToM(18, 100),
      innings: this.randomWholeNumFromNToM(5, 20),
      dot_percentage: this.randomFloatNumFromNToM(40, 80),
      wickets: this.randomWholeNumFromNToM(0, 20),
      econ: this.randomFloatNumFromNToM(5, 9),
      five_wickets: this.randomWholeNumFromNToM(0, 5),
      best_bowling_innings: `${this.randomFloatNumFromNToM(
        1,
        4,
      )}/${this.randomFloatNumFromNToM(10, 20)}`,
    };
  }

  private BowlingStatsData: BowlingStatsDataType[][] = Array.from(
    {
      length: 523,
    },
    () => this.years.map((x) => this.generateStats(x)),
  );

  private async saveData(bowlingStat: BowlingStatsDataType) {
    const data = await this.bowlingStatsRepository.save(bowlingStat);
    return data.id;
  }

  createInitialData() {
    return this.BowlingStatsData.map((dataPerPlayer) =>
      Promise.all(dataPerPlayer.map((data) => this.saveData(data))),
    );
  }

  async assignPlayerToBowlingStats(playerId: string, bowlingStatsId: string) {
    const player = await this.playerRepository.findOneBy({ id: playerId });
    const bowlingStats = await this.bowlingStatsRepository.findOneBy({
      id: bowlingStatsId,
    });
    bowlingStats.player = player;
    return this.bowlingStatsRepository.save(bowlingStats);
  }

  async resetTable() {
    const ids = await this.bowlingStatsRepository.find({
      select: { id: true },
    });
    if (ids.length > 0)
      return await Promise.all(
        ids.map(async (id) => this.bowlingStatsRepository.delete(id)),
      );
    return;
  }
}
