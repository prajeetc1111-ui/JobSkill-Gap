import express from 'express';
import {
  getProfileHandler,
  updateProfileHandler,
  addSkillHandler,
  removeSkillHandler,
} from '../controllers/profileController.js';

const router = express.Router();

router.get('/', getProfileHandler);
router.put('/', updateProfileHandler);
router.post('/skills', addSkillHandler);
router.delete('/skills/:skillName', removeSkillHandler);

export default router;

