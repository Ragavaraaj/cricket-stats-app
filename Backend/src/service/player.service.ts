import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOptionsSelect, Like, Repository } from 'typeorm';
import { Player } from '../database';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
  ) {}

  private selectQuery: FindOptionsSelect<Player> = {
    team: {
      name: true,
      id: true,
    },
  };

  async create(player: Partial<Player>): Promise<{ id: string }> {
    const newPlayer = await this.playerRepository.save(player);
    return { id: newPlayer.id };
  }

  async getAll({ filter }: { filter: string }): Promise<Player[]> {
    const query: FindManyOptions<Player> = {
      relations: {
        team: true,
      },
      select: this.selectQuery,
    };
    if (filter) {
      const newFilter = filter.replace(/ /g, '').toLowerCase();
      query.where = { name: Like(`%${filter}%`) };
      if (newFilter.length < 5)
        query.where = { team: { short_name: newFilter.toUpperCase() } };
      if (newFilter === 'cap') query.where = { isCaption: true };
      if (newFilter === 'players') query.where = { team: true };
    }
    return await this.playerRepository.find(query);
  }

  async getOne(id: string): Promise<Player> {
    return await this.playerRepository.findOne({
      relations: {
        team: true,
      },
      select: this.selectQuery,
      where: { id },
    });
  }

  async remove(id: string): Promise<void> {
    await this.playerRepository.delete(id);
  }

  async update(id: string, newPlayer: Partial<Player>): Promise<Player> {
    const oldPlayer = await this.playerRepository.findOneBy({ id });
    return this.playerRepository.save({ ...oldPlayer, ...newPlayer });
  }
}
