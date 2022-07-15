import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamSeederService } from 'src/seeddata';
import { PlayerSeederService } from 'src/seeddata/player.seed';
import { Seeder } from 'src/seeddata/seeder';
import { BattingStats, BowlingStats, Player, Team } from 'src/database';
import { BattingStatsSeederService } from 'src/seeddata/batting.seed';
import { BowlingStatsSeederService } from 'src/seeddata/bowling.seed';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [Player, Team, BowlingStats, BattingStats],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Team, Player, BattingStats, BowlingStats]),
  ],
  providers: [
    Logger,
    TeamSeederService,
    PlayerSeederService,
    BattingStatsSeederService,
    BowlingStatsSeederService,
    Seeder,
  ],
})
export class SeederModule {}
