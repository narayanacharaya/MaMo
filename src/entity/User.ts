import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import { Password } from '../utils/password';
import Project from './Project'; // Import Project entity

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column()
  role!: 'client' | 'freelancer';

  @OneToMany(() => Project, (project) => project.client) // One user can have many projects
  projects!: Project[]; // Define projects property

  @BeforeInsert()
  async hashPassword() {
    this.password = await Password.toHash(this.password);
  }

  async comparePassword(password: string): Promise<boolean> {
    return Password.compare(this.password, password);
  }
}
