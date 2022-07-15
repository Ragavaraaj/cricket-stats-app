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
import { PlayerService } from '../service';
import { Player } from '../database';

@Controller('/player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get()
  async getAllPlayers(@Query() query: { filter: string }): Promise<Player[]> {
    return this.playerService.getAll(query);
  }

  @Post()
  createPlayer(@Body() body: Partial<Player>) {
    return this.playerService.create(body);
  }

  @Get('/:id')
  getOnePlayer(@Param('id') id: string) {
    return this.playerService.getOne(id);
  }

  @Delete('/:id')
  deletePlayer(@Param('id') id: string) {
    return this.playerService.remove(id);
  }

  @Put('/:id')
  updatePlayer(@Param('id') id: string, @Body() body: Partial<Player>) {
    return this.playerService.update(id, body);
  }
}
