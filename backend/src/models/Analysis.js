import mongoose from 'mongoose';
import { dbStatus, readLocalStore, writeLocalStore } from '../config/db.js';

const AnalysisSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    company: { type: String, default: 'Unspecified' },
    jobDescription: { type: String, required: true },
    studentName: { type: String, default: 'Student' },
    extractedSkills: [
      {
        name: { type: String, required: true },
        category: { type: String, default: 'General' },
        frequency: { type: Number, default: 1 },
        requiredLevel: {
          type: String,
          enum: ['Beginner', 'Intermediate', 'Advanced'],
          default: 'Intermediate',
        },
        importance: {
          type: String,
          enum: ['Critical', 'High', 'Medium', 'Low'],
          default: 'Medium',
        },
      },
    ],
    studentSkills: [
      {
        name: { type: String, required: true },
        level: {
          type: String,
          enum: ['Beginner', 'Intermediate', 'Advanced'],
          default: 'Intermediate',
        },
        category: { type: String, default: 'General' },
      },
    ],
    matchScore: { type: Number, default: 0 },
    readinessLevel: { type: String, default: 'Needs Preparation' },
    breakdown: {
      matching: [
        {
          name: String,
          category: String,
          studentLevel: String,
          requiredLevel: String,
        },
      ],
      weak: [
        {
          name: String,
          category: String,
          studentLevel: String,
          requiredLevel: String,
          gap: String,
        },
      ],
      missing: [
        {
          name: String,
          category: String,
          requiredLevel: String,
          importance: String,
        },
      ],
    },
    categoryStats: {
      type: Map,
      of: new mongoose.Schema(
        {
          totalRequired: Number,
          matched: Number,
          percentage: Number,
        },
        { _id: false }
      ),
    },
  },
  { timestamps: true }
);

export const MongoAnalysis = mongoose.model('Analysis', AnalysisSchema);

export const Analysis = {
  async create(data) {
    if (dbStatus.mode === 'mongodb') {
      const doc = new MongoAnalysis(data);
      return await doc.save();
    } else {
      const store = readLocalStore();
      const newDoc = {
        _id: 'local_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      store.analyses.unshift(newDoc);
      writeLocalStore(store);
      return newDoc;
    }
  },

  async find(query = {}) {
    if (dbStatus.mode === 'mongodb') {
      return await MongoAnalysis.find(query).sort({ createdAt: -1 });
    } else {
      const store = readLocalStore();
      return store.analyses;
    }
  },

  async findById(id) {
    if (dbStatus.mode === 'mongodb') {
      try {
        return await MongoAnalysis.findById(id);
      } catch {
        return null;
      }
    } else {
      const store = readLocalStore();
      return store.analyses.find((a) => a._id === id || a._id === String(id)) || null;
    }
  },

  async findByIdAndDelete(id) {
    if (dbStatus.mode === 'mongodb') {
      try {
        return await MongoAnalysis.findByIdAndDelete(id);
      } catch {
        return null;
      }
    } else {
      const store = readLocalStore();
      const index = store.analyses.findIndex((a) => a._id === id || a._id === String(id));
      if (index !== -1) {
        const deleted = store.analyses.splice(index, 1)[0];
        writeLocalStore(store);
        return deleted;
      }
      return null;
    }
  },
};

