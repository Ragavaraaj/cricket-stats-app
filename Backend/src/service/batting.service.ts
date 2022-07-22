import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BattingStats, Player } from '../database';

@Injectable()
export class BattingService {
  constructor(
    @InjectRepository(BattingStats)
    private battingRepository: Repository<BattingStats>,
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
  ) {}

  async create(
    bowlingStat: Partial<BattingStats>,
    playerId: string,
  ): Promise<{ id: string }> {
    const player = await this.playerRepository.findOneBy({ id: playerId });
    const newBowlingStats = await this.battingRepository.save({
      ...bowlingStat,
      player,
    });
    return { id: newBowlingStats.id };
  }

  async getStats(playerId: string): Promise<BattingStats[]> {
    return await this.battingRepository.find({
      relations: {
        player: true,
      },
      select: {
        player: {
          name: true,
          id: true,
        },
      },
      where: {
        player: {
          id: playerId,
        },
      },
      order: {
        year: 'ASC',
      },
    });
  }

  async remove(id: string): Promise<void> {
    await this.battingRepository.delete(id);
  }

  async updateBattingStats(
    id: string,
    newBattingStats: Partial<BattingStats>,
  ): Promise<BattingStats> {
    const oldBattingStats = await this.battingRepository.findOneBy({ id });
    return await this.battingRepository.save({
      ...oldBattingStats,
      ...newBattingStats,
    });
  }
}
