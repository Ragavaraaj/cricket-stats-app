import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Team } from './team.entity';

@Entity()
export class Matches {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  session: number;

  @Column()
  team_a_scores: string;

  @Column()
  team_b_scores: string;

  @Column()
  winning_team: string;

  @ManyToOne(() => Team, (team) => team.matches)
  team_a: Team;

  @ManyToOne(() => Team, (team) => team.matches)
  team_b: Team;
}
