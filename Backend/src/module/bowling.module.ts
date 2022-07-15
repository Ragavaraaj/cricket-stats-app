import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BowlingStats, Player } from '../database';
import { BowlingController } from '../controllers';
import { BowlingService } from '../service';

@Module({
  imports: [TypeOrmModule.forFeature([Player, BowlingStats])],
  controllers: [BowlingController],
  providers: [BowlingService],
})
export class BowlingModule {}
