import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BattingStats, BowlingStats, Player, Team } from '../database';
import { PlayerController } from '../controllers';
import { PlayerService } from '../service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Player, Team, BowlingStats, BattingStats]),
  ],
  controllers: [PlayerController],
  providers: [PlayerService],
})
export class PlayerModule {}
