import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Matches, Team } from '../database';
import { MatchesController } from '../controllers';
import { MatchesService } from '../service';

@Module({
  imports: [TypeOrmModule.forFeature([Matches, Team])],
  controllers: [MatchesController],
  providers: [MatchesService],
})
export class MatchesModule {}
