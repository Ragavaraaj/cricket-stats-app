import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BattingService } from '../service';
import { BattingStats } from '../database';

@Controller('/batting/:id')
export class BattingController {
  constructor(private readonly battingService: BattingService) {}

  @Post()
  createBattingStatus(
    @Body() body: Partial<BattingStats>,
    @Param('id') playerId: string,
  ) {
    return this.battingService.create(body, playerId);
  }

  @Delete()
  deleteBattingStats(@Param('id') year: string) {
    return this.battingService.remove(year);
  }

  @Get()
  async getStatsFor(@Param('id') playerId: string): Promise<BattingStats[]> {
    return await this.battingService.getStats(playerId);
  }

  @Put()
  async updateStatsFor(
    @Param('id') id: string,
    @Body() body: Partial<BattingStats>,
  ): Promise<BattingStats> {
    return await this.battingService.updateBattingStats(id, body);
  }
}
