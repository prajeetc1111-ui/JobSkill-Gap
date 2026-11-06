import express from 'express';
import {
  extractSkillsHandler,
  analyzeGapHandler,
  getAnalysesHandler,
  getAnalysisByIdHandler,
  deleteAnalysisHandler,
} from '../controllers/analysisController.js';

const router = express.Router();

router.post('/extract', extractSkillsHandler);
router.post('/gap', analyzeGapHandler);
router.get('/', getAnalysesHandler);
router.get('/:id', getAnalysisByIdHandler);
router.delete('/:id', deleteAnalysisHandler);

export default router;

