import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BattingStats } from './batting.entity';
import { BowlingStats } from './bowling.entity';
import { Team } from './team.entity';

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  batting_style: string;

  @Column()
  bowling_style: string;

  @Column()
  dob: string;

  @Column()
  debate: string;

  @Column()
  country: string;

  @Column()
  isCaption: boolean;

  @ManyToOne(() => Team, (team) => team.members)
  team: Team;

  @OneToMany(() => BowlingStats, (bowlingStats) => bowlingStats.player)
  bowlingStats: BowlingStats[];

  @OneToMany(() => BattingStats, (battingStats) => battingStats.player)
  battingStats: BattingStats[];
}
