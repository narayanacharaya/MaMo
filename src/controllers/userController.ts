import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import User from '../entity/User';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
export const signupvalidator = [
  body('email').isEmail().withMessage('Email must be valid'),
  body('password')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Password must be between 4 and 20 characters'),
  body('role')
    .isIn(['client', 'freelancer'])
    .withMessage('Role must be either client or freelancer'),
];
export const signup = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
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
export const siginValidator = [
  body('email').isEmail().withMessage('Email must be valid'),
  body('password')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Password must be between 4 and 20 characters'),
];

export const login = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
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
    console.log(error);
    res.status(500).send('Server error');
  }
};
