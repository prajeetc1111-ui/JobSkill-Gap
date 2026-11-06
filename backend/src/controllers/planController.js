import { LearningPlan } from '../models/LearningPlan.js';
import { Analysis } from '../models/Analysis.js';
import { generateLearningPlan } from '../services/priorityEngine.js';

export async function getPlansHandler(req, res) {
  try {
    const plans = await LearningPlan.find();
    return res.json({ success: true, count: plans.length, plans });
  } catch (err) {
    console.error('Error fetching plans:', err);
    return res.status(500).json({ error: 'Failed to fetch plans: ' + err.message });
  }
}

export async function getPlanByIdHandler(req, res) {
  try {
    const { id } = req.params;
    const plan = await LearningPlan.findById(id);
    if (!plan) {
      return res.status(404).json({ error: 'Learning plan not found.' });
    }
    return res.json({ success: true, plan });
  } catch (err) {
    console.error('Error fetching plan by ID:', err);
    return res.status(500).json({ error: 'Failed to fetch plan: ' + err.message });
  }
}

export async function getPlanByAnalysisIdHandler(req, res) {
  try {
    const { analysisId } = req.params;
    const plan = await LearningPlan.findByAnalysisId(analysisId);
    if (!plan) {
      return res.status(404).json({ error: 'No learning plan found for this analysis ID.' });
    }
    return res.json({ success: true, plan });
  } catch (err) {
    console.error('Error fetching plan by analysis ID:', err);
    return res.status(500).json({ error: 'Failed to fetch plan: ' + err.message });
  }
}

export async function generatePlanFromAnalysisHandler(req, res) {
  try {
    const { analysisId } = req.params;
    const analysis = await Analysis.findById(analysisId);
    if (!analysis) {
      return res.status(404).json({ error: 'Analysis not found.' });
    }

    const items = generateLearningPlan({ breakdown: analysis.breakdown });
    const plan = await LearningPlan.create({
      analysisId: analysis._id.toString(),
      title: `${analysis.title} - Custom Learning Plan`,
      targetRole: analysis.title,
      studentName: analysis.studentName,
      items,
    });

    return res.status(201).json({ success: true, plan });
  } catch (err) {
    console.error('Error generating plan:', err);
    return res.status(500).json({ error: 'Failed to generate plan: ' + err.message });
  }
}

export async function updateItemStatusHandler(req, res) {
  try {
    const { id, skillName } = req.params;
    const { status, notes } = req.body;

    if (!['to_learn', 'learning', 'completed'].includes(status)) {
      return res.status(400).json({
        error: "Invalid status. Allowed values: 'to_learn', 'learning', 'completed'.",
      });
    }

    const updatedPlan = await LearningPlan.updateItemStatus(
      id,
      decodeURIComponent(skillName),
      status,
      notes
    );

    if (!updatedPlan) {
      return res.status(404).json({ error: 'Learning plan or skill item not found.' });
    }

    return res.json({ success: true, plan: updatedPlan });
  } catch (err) {
    console.error('Error updating item status:', err);
    return res.status(500).json({ error: 'Failed to update item status: ' + err.message });
  }
}

export async function updateItemPriorityHandler(req, res) {
  try {
    const { id, skillName } = req.params;
    const { priority } = req.body;

    if (!['Critical', 'High', 'Medium', 'Low'].includes(priority)) {
      return res.status(400).json({
        error: "Invalid priority. Allowed values: 'Critical', 'High', 'Medium', 'Low'.",
      });
    }

    const updatedPlan = await LearningPlan.updateItemPriority(
      id,
      decodeURIComponent(skillName),
      priority
    );

    if (!updatedPlan) {
      return res.status(404).json({ error: 'Learning plan or skill item not found.' });
    }

    return res.json({ success: true, plan: updatedPlan });
  } catch (err) {
    console.error('Error updating item priority:', err);
    return res.status(500).json({ error: 'Failed to update item priority: ' + err.message });
  }
}

export async function deletePlanHandler(req, res) {
  try {
    const { id } = req.params;
    const deleted = await LearningPlan.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Learning plan not found.' });
    }
    return res.json({ success: true, message: 'Learning plan deleted successfully.' });
  } catch (err) {
    console.error('Error deleting learning plan:', err);
    return res.status(500).json({ error: 'Failed to delete plan: ' + err.message });
  }
}

