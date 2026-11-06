import { extractSkills } from '../services/skillExtractor.js';
import { analyzeGap } from '../services/gapAnalyzer.js';
import { generateLearningPlan } from '../services/priorityEngine.js';
import { Analysis } from '../models/Analysis.js';
import { LearningPlan } from '../models/LearningPlan.js';

export async function extractSkillsHandler(req, res) {
  try {
    const { jobDescription } = req.body;
    if (!jobDescription || typeof jobDescription !== 'string' || jobDescription.trim().length === 0) {
      return res.status(400).json({ error: 'Job description text is required.' });
    }

    const skills = extractSkills(jobDescription);
    return res.json({
      success: true,
      count: skills.length,
      skills,
    });
  } catch (err) {
    console.error('Error extracting skills:', err);
    return res.status(500).json({ error: 'Failed to extract skills: ' + err.message });
  }
}

export async function analyzeGapHandler(req, res) {
  try {
    const {
      jobDescription,
      studentSkills = [],
      title = 'Target Role Analysis',
      company = 'Target Company',
      studentName = 'Alex Rivera',
      extractedSkills: customExtractedSkills,
      autoGeneratePlan = true,
    } = req.body;

    if (!jobDescription || jobDescription.trim().length === 0) {
      return res.status(400).json({ error: 'Job description is required.' });
    }

    // Extract skills if not supplied
    const skillsToAnalyze =
      customExtractedSkills && customExtractedSkills.length > 0
        ? customExtractedSkills
        : extractSkills(jobDescription);

    if (skillsToAnalyze.length === 0) {
      return res.status(400).json({
        error: 'No recognizable technical or soft skills found in the provided job description. Please provide more detailed job requirements.',
      });
    }

    // Compute gap analysis
    const gapResults = analyzeGap(skillsToAnalyze, studentSkills);

    // Save Analysis to DB
    const savedAnalysis = await Analysis.create({
      title: title.trim(),
      company: company.trim(),
      jobDescription: jobDescription.trim(),
      studentName: studentName.trim(),
      extractedSkills: skillsToAnalyze,
      studentSkills,
      matchScore: gapResults.matchScore,
      readinessLevel: gapResults.readinessLevel,
      breakdown: gapResults.breakdown,
      categoryStats: gapResults.categoryStats,
    });

    let savedPlan = null;
    if (autoGeneratePlan) {
      const planItems = generateLearningPlan(gapResults);
      savedPlan = await LearningPlan.create({
        analysisId: savedAnalysis._id.toString(),
        title: `${savedAnalysis.title} - Learning Roadmap`,
        targetRole: savedAnalysis.title,
        studentName: savedAnalysis.studentName,
        items: planItems,
      });
    }

    return res.status(201).json({
      success: true,
      analysis: savedAnalysis,
      gapResults,
      plan: savedPlan,
    });
  } catch (err) {
    console.error('Error analyzing skill gap:', err);
    return res.status(500).json({ error: 'Failed to complete gap analysis: ' + err.message });
  }
}

export async function getAnalysesHandler(req, res) {
  try {
    const analyses = await Analysis.find();
    return res.json({ success: true, count: analyses.length, analyses });
  } catch (err) {
    console.error('Error retrieving analyses:', err);
    return res.status(500).json({ error: 'Failed to retrieve analyses: ' + err.message });
  }
}

export async function getAnalysisByIdHandler(req, res) {
  try {
    const { id } = req.params;
    const analysis = await Analysis.findById(id);
    if (!analysis) {
      return res.status(404).json({ error: 'Analysis record not found.' });
    }
    const plan = await LearningPlan.findByAnalysisId(id);
    return res.json({ success: true, analysis, plan });
  } catch (err) {
    console.error('Error retrieving analysis by ID:', err);
    return res.status(500).json({ error: 'Failed to retrieve analysis: ' + err.message });
  }
}

export async function deleteAnalysisHandler(req, res) {
  try {
    const { id } = req.params;
    const deleted = await Analysis.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Analysis record not found.' });
    }
    return res.json({ success: true, message: 'Analysis deleted successfully.' });
  } catch (err) {
    console.error('Error deleting analysis:', err);
    return res.status(500).json({ error: 'Failed to delete analysis: ' + err.message });
  }
}

