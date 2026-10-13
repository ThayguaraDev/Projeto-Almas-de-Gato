const projectService = require('../services/projectService');

async function listProjects(req, res) {
  const projects = await projectService.listProjects();
  res.json({ data: projects });
}

module.exports = { listProjects };
