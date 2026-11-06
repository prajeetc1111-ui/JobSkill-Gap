import express from 'express';
import {
  getPlansHandler,
  getPlanByIdHandler,
  getPlanByAnalysisIdHandler,
  generatePlanFromAnalysisHandler,
  updateItemStatusHandler,
  updateItemPriorityHandler,
  deletePlanHandler,
} from '../controllers/planController.js';

const router = express.Router();

router.get('/', getPlansHandler);
router.get('/:id', getPlanByIdHandler);
router.get('/analysis/:analysisId', getPlanByAnalysisIdHandler);
router.post('/generate/:analysisId', generatePlanFromAnalysisHandler);
router.patch('/:id/skills/:skillName/status', updateItemStatusHandler);
router.patch('/:id/skills/:skillName/priority', updateItemPriorityHandler);
router.delete('/:id', deletePlanHandler);

export default router;

