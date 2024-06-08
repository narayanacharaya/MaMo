import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import User from '../entity/User';
import Project from '../entity/Project';

export const addProject = async (req: Request, res: Response) => {
  try {
    const { title, description, tags } = req.body;
    const projectRepository = AppDataSource.getRepository(Project);
    const userRepository = AppDataSource.getRepository(User);
    const client = await userRepository.findOneBy({
      id: parseInt(req.user.id, 10),
    });
    if (!client) {
      return res.status(404).send('Client not found');
    }
    const project = projectRepository.create({
      title,
      description,
      tags,
      client,
    });
    await projectRepository.save(project);
    res.status(201).send('Project added successfully');
  } catch (error) {
    res.status(500).send('Server error');
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, tags } = req.body;
    const projectRepository = AppDataSource.getRepository(Project);
    const project = await projectRepository.findOne({
      where: { id: parseInt(id) },
      relations: ['client'],
    });
    if (!project) {
      return res.status(404).send('Project not found');
    }
    if (project.client.id.toString() !== req.user.id) {
      return res.status(403).send('Forbidden');
    }
    projectRepository.merge(project, { title, description, tags });
    await projectRepository.save(project);
    res.status(200).send('Project updated successfully');
  } catch (error) {
    res.status(500).send('Server error');
  }
};

export const listProjects = async (req: Request, res: Response) => {
  try {
    const projectRepository = AppDataSource.getRepository(Project);
    const projects = await projectRepository.find({ relations: ['client'] });
    res.json(projects);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

export const removeProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const projectRepository = AppDataSource.getRepository(Project);
    const project = await projectRepository.findOne({
      where: { id: parseInt(id, 10) },
      relations: ['client'],
    });
    if (!project) {
      return res.status(404).send('Project not found');
    }
    if (project.client.id.toString() !== req.user.id) {
      return res.status(403).send('Forbidden');
    }
    await projectRepository.remove(project);
    res.status(200).send('Project removed successfully');
  } catch (error) {
    res.status(500).send('Server error');
  }
};
