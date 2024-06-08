import { Router } from 'express';
import {
  addProject,
  updateProject,
  listProjects,
  removeProject,
} from '../controllers/projectController';
import { auth } from '../middlewares/auth';

const router = Router();

router.post('/', auth, addProject);
router.put('/:id', auth, updateProject);
router.get('/', listProjects);
router.delete('/:id', auth, removeProject);

export default router;
