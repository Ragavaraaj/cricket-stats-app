import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BattingStats, BowlingStats, Matches, Player, Team } from '../database';

import { PlayerModule } from './player.module';
import { TeamModule } from './team.module';
import { BattingModule } from './batting.module';
import { BowlingModule } from './bowling.module';
import { MatchesModule } from './matches.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [Player, Team, BowlingStats, BattingStats, Matches],
      migrations: ['src/migration/*{.ts,.js}'],
    }),
    PlayerModule,
    TeamModule,
    BattingModule,
    BowlingModule,
    MatchesModule,
  ],
})
export class AppModule {}
