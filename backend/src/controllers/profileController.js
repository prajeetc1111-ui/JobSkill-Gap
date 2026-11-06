import { StudentProfile } from '../models/StudentProfile.js';

export async function getProfileHandler(req, res) {
  try {
    const profile = await StudentProfile.getProfile();
    return res.json({ success: true, profile });
  } catch (err) {
    console.error('Error fetching student profile:', err);
    return res.status(500).json({ error: 'Failed to fetch student profile: ' + err.message });
  }
}

export async function updateProfileHandler(req, res) {
  try {
    const { studentName, email, targetRole, skills, bio } = req.body;
    const updateData = {};
    if (studentName !== undefined) updateData.studentName = studentName;
    if (email !== undefined) updateData.email = email;
    if (targetRole !== undefined) updateData.targetRole = targetRole;
    if (skills !== undefined) updateData.skills = skills;
    if (bio !== undefined) updateData.bio = bio;

    const updated = await StudentProfile.updateProfile(updateData);
    return res.json({ success: true, profile: updated });
  } catch (err) {
    console.error('Error updating student profile:', err);
    return res.status(500).json({ error: 'Failed to update student profile: ' + err.message });
  }
}

export async function addSkillHandler(req, res) {
  try {
    const { name, level = 'Intermediate', category = 'General' } = req.body;
    if (!name || name.trim().length === 0) {
      return res.status(400).json({ error: 'Skill name is required.' });
    }

    const profile = await StudentProfile.getProfile();
    const skills = [...(profile.skills || [])];

    const existingIndex = skills.findIndex((s) => s.name.toLowerCase() === name.trim().toLowerCase());
    if (existingIndex >= 0) {
      skills[existingIndex].level = level;
      if (category) skills[existingIndex].category = category;
    } else {
      skills.push({ name: name.trim(), level, category });
    }

    const updated = await StudentProfile.updateProfile({ skills });
    return res.json({ success: true, profile: updated });
  } catch (err) {
    console.error('Error adding skill:', err);
    return res.status(500).json({ error: 'Failed to add skill: ' + err.message });
  }
}

export async function removeSkillHandler(req, res) {
  try {
    const { skillName } = req.params;
    if (!skillName) {
      return res.status(400).json({ error: 'Skill name is required.' });
    }

    const profile = await StudentProfile.getProfile();
    const skills = (profile.skills || []).filter(
      (s) => s.name.toLowerCase() !== decodeURIComponent(skillName).toLowerCase()
    );

    const updated = await StudentProfile.updateProfile({ skills });
    return res.json({ success: true, profile: updated });
  } catch (err) {
    console.error('Error removing skill:', err);
    return res.status(500).json({ error: 'Failed to remove skill: ' + err.message });
  }
}

