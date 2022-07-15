import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BattingStats, Player } from '../database';
import { BattingController } from '../controllers';
import { BattingService } from '../service';

@Module({
  imports: [TypeOrmModule.forFeature([Player, BattingStats])],
  controllers: [BattingController],
  providers: [BattingService],
})
export class BattingModule {}
