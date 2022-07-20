import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { MatchesService } from '../service';
import { Matches } from '../database';

@Controller('/matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Post()
  createBattingStatus(
    @Body() body: Partial<Matches>,
    @Query('teamA') teamAId: string,
    @Query('teamB') teamBId: string,
  ) {
    return this.matchesService.create(body, teamAId, teamBId);
  }

  @Delete('/:id')
  deleteMatches(@Param('id') row_id: string) {
    return this.matchesService.remove(row_id);
  }

  @Get('/:id')
  async getAllMatches(@Param('id') teamId: string): Promise<Matches[]> {
    return await this.matchesService.getAllMatches(teamId);
  }

  @Put('/:id')
  async updateStatsFor(
    @Param('id') id: string,
    @Body() body: Partial<Matches>,
  ): Promise<Matches> {
    return await this.matchesService.updateMatches(id, body);
  }
}
