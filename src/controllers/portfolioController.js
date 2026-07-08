const Service = require('../models/Service');
const Skill = require('../models/Skill');
const Experience = require('../models/Experience');
const Project = require('../models/Project');

// ==========================================
// SERVICES CRUD
// ==========================================
const getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: 1 });
    return res.json({ success: true, data: services });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server error fetching services' });
  }
};

const createService = async (req, res) => {
  try {
    const service = await Service.create(req.body);
    return res.status(201).json({ success: true, data: service });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server error creating service' });
  }
};

const updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
    return res.json({ success: true, data: service });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server error updating service' });
  }
};

const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
    return res.json({ success: true, message: 'Service deleted' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server error deleting service' });
  }
};

// ==========================================
// SKILLS CRUD
// ==========================================
const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ createdAt: 1 });
    return res.json({ success: true, data: skills });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server error fetching skills' });
  }
};

const createSkill = async (req, res) => {
  try {
    const skill = await Skill.create(req.body);
    return res.status(201).json({ success: true, data: skill });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server error creating skill' });
  }
};

const updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!skill) return res.status(404).json({ success: false, message: 'Skill not found' });
    return res.json({ success: true, data: skill });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server error updating skill' });
  }
};

const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) return res.status(404).json({ success: false, message: 'Skill not found' });
    return res.json({ success: true, message: 'Skill deleted' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server error deleting skill' });
  }
};

// ==========================================
// EXPERIENCE CRUD
// ==========================================
const getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ createdAt: 1 });
    return res.json({ success: true, data: experiences });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server error fetching experiences' });
  }
};

const createExperience = async (req, res) => {
  try {
    const experience = await Experience.create(req.body);
    return res.status(201).json({ success: true, data: experience });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server error creating experience' });
  }
};

const updateExperience = async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!experience) return res.status(404).json({ success: false, message: 'Experience not found' });
    return res.json({ success: true, data: experience });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server error updating experience' });
  }
};

const deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);
    if (!experience) return res.status(404).json({ success: false, message: 'Experience not found' });
    return res.json({ success: true, message: 'Experience deleted' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server error deleting experience' });
  }
};

// ==========================================
// PROJECTS CRUD
// ==========================================
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: 1 });
    return res.json({ success: true, data: projects });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server error fetching projects' });
  }
};

const createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    return res.status(201).json({ success: true, data: project });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server error creating project' });
  }
};

const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    return res.json({ success: true, data: project });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server error updating project' });
  }
};

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    return res.json({ success: true, message: 'Project deleted' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server error deleting project' });
  }
};

module.exports = {
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
};
