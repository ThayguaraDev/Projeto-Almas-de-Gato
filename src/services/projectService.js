const pool = require('../config/database');

async function listProjects() {
  const [rows] = await pool.execute(
    'SELECT id, title, description, image_url, created_at FROM projects ORDER BY display_order ASC, id ASC',
  );
  return rows;
}

module.exports = { listProjects };
