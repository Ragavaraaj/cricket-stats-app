import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BowlingStats, Player } from '../database';

@Injectable()
export class BowlingService {
  constructor(
    @InjectRepository(BowlingStats)
    private bowlingRepository: Repository<BowlingStats>,
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
  ) {}

  async create(
    bowlingStat: Partial<BowlingStats>,
    forPlayerId: string,
  ): Promise<{ id: string }> {
    const player = await this.playerRepository.findOneBy({ id: forPlayerId });
    const newBowlingStats = await this.bowlingRepository.save({
      ...bowlingStat,
      player,
    });
    return { id: newBowlingStats.id };
  }

  async getStats(playerId: string): Promise<BowlingStats[]> {
    return await this.bowlingRepository.find({
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
    await this.bowlingRepository.delete(id);
  }

  async updateBowlingStats(
    id: string,
    newBowlingStats: Partial<BowlingStats>,
  ): Promise<BowlingStats> {
    const oldBowlingStats = await this.bowlingRepository.findOneBy({ id });
    return this.bowlingRepository.save({
      ...oldBowlingStats,
      ...newBowlingStats,
    });
  }
}
