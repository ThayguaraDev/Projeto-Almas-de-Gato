const pool = require('../config/database');

async function createContactMessage(message) {
  const [result] = await pool.execute(
    'INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)',
    [message.name, message.email, message.subject, message.message],
  );
  return { id: result.insertId, ...message };
}

module.exports = { createContactMessage };
