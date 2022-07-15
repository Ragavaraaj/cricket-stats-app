import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BowlingService } from '../service';
import { BowlingStats } from '../database';

@Controller('/bowling/:id')
export class BowlingController {
  constructor(private readonly bowlingService: BowlingService) {}

  @Post()
  createBowlingStatus(
    @Body() body: Partial<BowlingStats>,
    @Param('id') playerId: string,
  ) {
    return this.bowlingService.create(body, playerId);
  }

  @Delete()
  deleteBowlingStats(@Param('id') year: string) {
    return this.bowlingService.remove(year);
  }

  @Get()
  async getStatsFor(@Param('id') playerId: string): Promise<BowlingStats[]> {
    return await this.bowlingService.getStats(playerId);
  }

  @Put()
  async updateStatsFor(
    @Param('id') id: string,
    @Body() body: Partial<BowlingStats>,
  ): Promise<BowlingStats> {
    return await this.bowlingService.updateBowlingStats(id, body);
  }
}
