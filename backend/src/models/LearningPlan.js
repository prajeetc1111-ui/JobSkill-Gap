import mongoose from 'mongoose';
import { dbStatus, readLocalStore, writeLocalStore } from '../config/db.js';

const LearningItemSchema = new mongoose.Schema(
  {
    skillName: { type: String, required: true },
    category: { type: String, default: 'General' },
    priority: {
      type: String,
      enum: ['Critical', 'High', 'Medium', 'Low'],
      default: 'High',
    },
    status: {
      type: String,
      enum: ['to_learn', 'learning', 'completed'],
      default: 'to_learn',
    },
    estimatedHours: { type: Number, default: 10 },
    difficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Intermediate',
    },
    currentLevel: { type: String, default: 'None' },
    targetLevel: { type: String, default: 'Intermediate' },
    whyImportant: { type: String, default: '' },
    actionSteps: [{ type: String }],
    resources: [
      {
        title: String,
        type: { type: String, default: 'documentation' }, // 'docs' | 'course' | 'tutorial' | 'project'
        url: String,
      },
    ],
    notes: { type: String, default: '' },
    completedAt: { type: Date, default: null },
  },
  { _id: true }
);

const LearningPlanSchema = new mongoose.Schema(
  {
    analysisId: { type: String, required: true },
    title: { type: String, required: true },
    targetRole: { type: String, default: 'Software Engineer' },
    studentName: { type: String, default: 'Student' },
    items: [LearningItemSchema],
    totalSkills: { type: Number, default: 0 },
    completedSkills: { type: Number, default: 0 },
    progressPercentage: { type: Number, default: 0 },
    totalEstimatedHours: { type: Number, default: 0 },
    remainingHours: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const MongoLearningPlan = mongoose.model('LearningPlan', LearningPlanSchema);

function calculatePlanMetrics(items) {
  const total = items.length;
  const completed = items.filter((i) => i.status === 'completed').length;
  const inProgress = items.filter((i) => i.status === 'learning').length;
  const progressPercentage = total > 0 ? Math.round(((completed + inProgress * 0.4) / total) * 100) : 0;
  const totalEstimatedHours = items.reduce((acc, curr) => acc + (Number(curr.estimatedHours) || 0), 0);
  const remainingHours = items.reduce((acc, curr) => {
    if (curr.status === 'completed') return acc;
    if (curr.status === 'learning') return acc + Math.round((Number(curr.estimatedHours) || 0) * 0.5);
    return acc + (Number(curr.estimatedHours) || 0);
  }, 0);

  return {
    totalSkills: total,
    completedSkills: completed,
    progressPercentage,
    totalEstimatedHours,
    remainingHours,
  };
}

export const LearningPlan = {
  async create(data) {
    const metrics = calculatePlanMetrics(data.items || []);
    const planPayload = { ...data, ...metrics };

    if (dbStatus.mode === 'mongodb') {
      const doc = new MongoLearningPlan(planPayload);
      return await doc.save();
    } else {
      const store = readLocalStore();
      const newDoc = {
        _id: 'plan_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
        ...planPayload,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      store.plans.unshift(newDoc);
      writeLocalStore(store);
      return newDoc;
    }
  },

  async find(query = {}) {
    if (dbStatus.mode === 'mongodb') {
      return await MongoLearningPlan.find(query).sort({ updatedAt: -1 });
    } else {
      const store = readLocalStore();
      return store.plans;
    }
  },

  async findById(id) {
    if (dbStatus.mode === 'mongodb') {
      try {
        return await MongoLearningPlan.findById(id);
      } catch {
        return null;
      }
    } else {
      const store = readLocalStore();
      return store.plans.find((p) => p._id === id || p._id === String(id)) || null;
    }
  },

  async findByAnalysisId(analysisId) {
    if (dbStatus.mode === 'mongodb') {
      return await MongoLearningPlan.findOne({ analysisId }).sort({ updatedAt: -1 });
    } else {
      const store = readLocalStore();
      return store.plans.find((p) => p.analysisId === analysisId || p.analysisId === String(analysisId)) || null;
    }
  },

  async updateItemStatus(planId, skillName, newStatus, notes = null) {
    if (dbStatus.mode === 'mongodb') {
      const plan = await MongoLearningPlan.findById(planId);
      if (!plan) return null;
      const item = plan.items.find((i) => i.skillName.toLowerCase() === skillName.toLowerCase());
      if (item) {
        item.status = newStatus;
        if (notes !== null) item.notes = notes;
        if (newStatus === 'completed') item.completedAt = new Date();
        else item.completedAt = null;

        const metrics = calculatePlanMetrics(plan.items);
        Object.assign(plan, metrics);
        return await plan.save();
      }
      return plan;
    } else {
      const store = readLocalStore();
      const plan = store.plans.find((p) => p._id === planId || p._id === String(planId));
      if (!plan) return null;
      const item = plan.items.find((i) => i.skillName.toLowerCase() === skillName.toLowerCase());
      if (item) {
        item.status = newStatus;
        if (notes !== null) item.notes = notes;
        if (newStatus === 'completed') item.completedAt = new Date().toISOString();
        else item.completedAt = null;

        const metrics = calculatePlanMetrics(plan.items);
        Object.assign(plan, metrics);
        plan.updatedAt = new Date().toISOString();
        writeLocalStore(store);
      }
      return plan;
    }
  },

  async updateItemPriority(planId, skillName, newPriority) {
    if (dbStatus.mode === 'mongodb') {
      const plan = await MongoLearningPlan.findById(planId);
      if (!plan) return null;
      const item = plan.items.find((i) => i.skillName.toLowerCase() === skillName.toLowerCase());
      if (item) {
        item.priority = newPriority;
        return await plan.save();
      }
      return plan;
    } else {
      const store = readLocalStore();
      const plan = store.plans.find((p) => p._id === planId || p._id === String(planId));
      if (!plan) return null;
      const item = plan.items.find((i) => i.skillName.toLowerCase() === skillName.toLowerCase());
      if (item) {
        item.priority = newPriority;
        plan.updatedAt = new Date().toISOString();
        writeLocalStore(store);
      }
      return plan;
    }
  },

  async findByIdAndDelete(id) {
    if (dbStatus.mode === 'mongodb') {
      try {
        return await MongoLearningPlan.findByIdAndDelete(id);
      } catch {
        return null;
      }
    } else {
      const store = readLocalStore();
      const index = store.plans.findIndex((p) => p._id === id || p._id === String(id));
      if (index !== -1) {
        const deleted = store.plans.splice(index, 1)[0];
        writeLocalStore(store);
        return deleted;
      }
      return null;
    }
  },
};

