import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Player } from './player.entity';

@Entity()
export class BattingStats {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => Player, (player) => player.battingStats)
  player: Player;

  @Column({ type: 'int' })
  year: number;

  @Column({ type: 'int' })
  innings: number;

  @Column({ type: 'int' })
  runs: number;

  @Column({ type: 'int' })
  balls: number;

  @Column({ type: 'int' })
  outs: number;

  @Column({ type: 'float' })
  average: number;

  @Column({ type: 'float' })
  strike_rate: number;

  @Column({ type: 'float' })
  high_score: number;

  @Column({ type: 'int' })
  no_of_fifties: number;

  @Column({ type: 'int' })
  no_of_centuries: number;

  @Column({ type: 'int' })
  no_of_fours: number;

  @Column({ type: 'int' })
  no_of_sixes: number;

  @Column({ type: 'float' })
  dot_percentage: number;
}
