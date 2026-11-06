import mongoose from 'mongoose';
import { dbStatus, readLocalStore, writeLocalStore } from '../config/db.js';

const ProfileSkillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Intermediate',
    },
    category: { type: String, default: 'General' },
    yearsOfExperience: { type: Number, default: 1 },
  },
  { _id: false }
);

const StudentProfileSchema = new mongoose.Schema(
  {
    studentName: { type: String, required: true, default: 'Student' },
    email: { type: String, default: '' },
    targetRole: { type: String, default: 'Full Stack Developer' },
    skills: [ProfileSkillSchema],
    education: { type: String, default: '' },
    bio: { type: String, default: '' },
  },
  { timestamps: true }
);

export const MongoStudentProfile = mongoose.model('StudentProfile', StudentProfileSchema);

export const StudentProfile = {
  async getProfile() {
    if (dbStatus.mode === 'mongodb') {
      let profile = await MongoStudentProfile.findOne().sort({ updatedAt: -1 });
      if (!profile) {
        profile = await MongoStudentProfile.create({
          studentName: 'Alex Rivera',
          email: 'alex.rivera@example.com',
          targetRole: 'Full Stack Engineer',
          skills: [
            { name: 'JavaScript', level: 'Intermediate', category: 'Frontend', yearsOfExperience: 2 },
            { name: 'React', level: 'Intermediate', category: 'Frontend', yearsOfExperience: 1.5 },
            { name: 'HTML5', level: 'Advanced', category: 'Frontend', yearsOfExperience: 3 },
            { name: 'CSS3', level: 'Advanced', category: 'Frontend', yearsOfExperience: 3 },
            { name: 'Node.js', level: 'Beginner', category: 'Backend', yearsOfExperience: 0.5 },
            { name: 'Git', level: 'Intermediate', category: 'DevOps & Tools', yearsOfExperience: 2 },
          ],
        });
      }
      return profile;
    } else {
      const store = readLocalStore();
      if (!store.profiles || store.profiles.length === 0) {
        const defaultProfile = {
          _id: 'prof_default',
          studentName: 'Alex Rivera',
          email: 'alex.rivera@example.com',
          targetRole: 'Full Stack Engineer',
          skills: [
            { name: 'JavaScript', level: 'Intermediate', category: 'Frontend', yearsOfExperience: 2 },
            { name: 'React', level: 'Intermediate', category: 'Frontend', yearsOfExperience: 1.5 },
            { name: 'HTML5', level: 'Advanced', category: 'Frontend', yearsOfExperience: 3 },
            { name: 'CSS3', level: 'Advanced', category: 'Frontend', yearsOfExperience: 3 },
            { name: 'Node.js', level: 'Beginner', category: 'Backend', yearsOfExperience: 0.5 },
            { name: 'Git', level: 'Intermediate', category: 'DevOps & Tools', yearsOfExperience: 2 },
          ],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        store.profiles = [defaultProfile];
        writeLocalStore(store);
        return defaultProfile;
      }
      return store.profiles[0];
    }
  },

  async updateProfile(data) {
    if (dbStatus.mode === 'mongodb') {
      let profile = await MongoStudentProfile.findOne().sort({ updatedAt: -1 });
      if (profile) {
        Object.assign(profile, data);
        return await profile.save();
      } else {
        return await MongoStudentProfile.create(data);
      }
    } else {
      const store = readLocalStore();
      if (!store.profiles || store.profiles.length === 0) {
        store.profiles = [];
      }
      const existing = store.profiles[0] || {};
      const updated = {
        ...existing,
        ...data,
        _id: existing._id || 'prof_' + Date.now(),
        updatedAt: new Date().toISOString(),
      };
      store.profiles[0] = updated;
      writeLocalStore(store);
      return updated;
    }
  },
};

