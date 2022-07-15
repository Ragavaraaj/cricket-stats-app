import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Player } from './player.entity';

@Entity()
export class BowlingStats {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => Player, (player) => player.bowlingStats)
  player: Player;

  @Column({ type: 'int' })
  year: number;

  @Column({ type: 'int' })
  innings: number;

  @Column({ type: 'int' })
  runs: number;

  @Column({ type: 'int' })
  wickets: number;

  @Column({ type: 'float' })
  econ: number;

  @Column({ type: 'float' })
  average: number;

  @Column({ type: 'float' })
  strike_rate: number;

  @Column({ type: 'float' })
  five_wickets: number;

  @Column()
  best_bowling_innings: string;

  @Column({ type: 'int' })
  no_of_fours: number;

  @Column({ type: 'int' })
  no_of_sixes: number;

  @Column({ type: 'float' })
  dot_percentage: number;
}
