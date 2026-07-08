const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getServices,
  createService,
  updateService,
  deleteService,
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/portfolioController');

// SERVICES
router.get('/services', getServices);
router.post('/services', protect, createService);
router.put('/services/:id', protect, updateService);
router.delete('/services/:id', protect, deleteService);

// SKILLS
router.get('/skills', getSkills);
router.post('/skills', protect, createSkill);
router.put('/skills/:id', protect, updateSkill);
router.delete('/skills/:id', protect, deleteSkill);

// EXPERIENCE
router.get('/experience', getExperiences);
router.post('/experience', protect, createExperience);
router.put('/experience/:id', protect, updateExperience);
router.delete('/experience/:id', protect, deleteExperience);

// PROJECTS
router.get('/projects', getProjects);
router.post('/projects', protect, createProject);
router.put('/projects/:id', protect, updateProject);
router.delete('/projects/:id', protect, deleteProject);

module.exports = router;
