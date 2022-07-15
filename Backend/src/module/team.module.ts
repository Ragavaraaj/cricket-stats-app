import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player, Team } from '../database';
import { TeamController } from '../controllers';
import { TeamService } from '../service';

@Module({
  imports: [TypeOrmModule.forFeature([Player, Team])],
  controllers: [TeamController],
  providers: [TeamService],
})
export class TeamModule {}
