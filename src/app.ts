import 'reflect-metadata';
import express from 'express';
import * as dotenv from 'dotenv';
import { AppDataSource } from './data-source';
import userRoutes from './routes/userRoutes';
import projectRoutes from './routes/projectRoutes';
// import { errorHandler } from './middlewares/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);

// app.use(errorHandler);

const start = async () => {
  try {
    await AppDataSource.initialize();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

start();
