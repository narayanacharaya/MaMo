import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import User from './User'; // Assuming User is exported as named export

@Entity()
export default class Project {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column('simple-array')
  tags!: string[];

  @ManyToOne(() => User, (user) => user.projects)
  client!: User;
}
