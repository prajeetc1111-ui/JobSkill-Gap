import express from 'express';
import {
  getSampleJobsHandler,
  getSampleProfilesHandler,
  getAllSkillsTaxonomyHandler,
  getSystemStatusHandler,
} from '../controllers/sampleController.js';

const router = express.Router();

router.get('/jobs', getSampleJobsHandler);
router.get('/profiles', getSampleProfilesHandler);
router.get('/taxonomy', getAllSkillsTaxonomyHandler);
router.get('/status', getSystemStatusHandler);

export default router;

