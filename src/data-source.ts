import 'reflect-metadata';
import { DataSource } from 'typeorm';
import User from './entity/User';
import Project from './entity/Project';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'worry-server',
  synchronize: true,
  logging: false,
  entities: [User, Project],
});
