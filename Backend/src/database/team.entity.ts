import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Matches } from './matches.entity';
import { Player } from './player.entity';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  short_name: string;

  @Column()
  home_ground: string;

  @Column()
  owner: string;

  @OneToMany(() => Player, (player) => player.team)
  members: Player[];

  @OneToMany(() => Matches, (match) => match.team_a)
  matches: Matches[];
}
