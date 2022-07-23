import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TeamService } from '../service';
import { Team } from '../database';
import { ApiAcceptedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('team')
@Controller('/team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  async getAllTeams(): Promise<Team[]> {
    return this.teamService.getAll();
  }

  @Post()
  createTeam(@Body() body: Partial<Team>) {
    return this.teamService.create(body);
  }

  @Get('/:id')
  getOneTeam(@Param('id') id: string) {
    return this.teamService.getOne(id);
  }

  @Delete('/:id')
  deleteTeam(@Param('id') id: string) {
    return this.teamService.remove(id);
  }

  @Put('/:id')
  updateTeam(@Param('id') id: string, @Body() body: Partial<Team>) {
    return this.teamService.updateTeam(id, body);
  }

  @Put('/:id/member')
  addPlayerToTeam(@Body() payload: any) {
    return this.teamService.updateTeamMembers(payload.teamId, payload.playerId);
  }
}
