const pool = require('../config/database');

const CAT_STATUSES = ['disponivel', 'em_tratamento', 'adotado'];

async function listCats(status) {
  if (status) {
    const [rows] = await pool.execute(
      'SELECT id, name, age, gender, description, image_url, status, created_at FROM cats WHERE status = ? ORDER BY created_at DESC',
      [status],
    );
    return rows;
  }

  const [rows] = await pool.execute(
    'SELECT id, name, age, gender, description, image_url, status, created_at FROM cats ORDER BY created_at DESC',
  );
  return rows;
}

async function getCatById(id) {
  const [rows] = await pool.execute(
    'SELECT id, name, age, gender, description, image_url, status, created_at FROM cats WHERE id = ?',
    [id],
  );
  return rows[0] || null;
}

async function createCat(cat) {
  const [result] = await pool.execute(
    'INSERT INTO cats (name, age, gender, description, image_url, status) VALUES (?, ?, ?, ?, ?, ?)',
    [cat.name, cat.age, cat.gender, cat.description, cat.imageUrl, cat.status],
  );
  return {
    id: result.insertId,
    name: cat.name,
    age: cat.age,
    gender: cat.gender,
    description: cat.description,
    image_url: cat.imageUrl,
    status: cat.status,
  };
}

module.exports = { CAT_STATUSES, createCat, getCatById, listCats };
