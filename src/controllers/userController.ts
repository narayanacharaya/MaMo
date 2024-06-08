import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import User from '../entity/User';
import jwt from 'jsonwebtoken';

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;
    const userRepository = AppDataSource.getRepository(User);
    const user = userRepository.create({ email, password, role });
    await userRepository.save(user);
    res.status(201).send('User registered successfully');
  } catch (error) {
    res.status(500).send('Server error');
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).send('Invalid credentials');
    }
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '1h',
      }
    );
    res.json({ token });
  } catch (error) {
    res.status(500).send('Server error');
  }
};
