import 'reflect-metadata';
import { DataSource } from 'typeorm';
import User from './entity/User';
import Project from './entity/Project';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT as string, 10),
  username: process.env.DATABASE_USERNAME,
  password: '',
  synchronize: true,
  logging: false,
  entities: [User, Project],
});
