const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function requireObjectBody(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    const error = new Error('O corpo da requisição deve ser um objeto JSON.');
    error.status = 400;
    throw error;
  }
  return body;
}

function requiredString(body, field, label = field) {
  const value = body[field];
  if (typeof value !== 'string' || value.trim() === '') {
    const error = new Error(`O campo "${label}" é obrigatório e deve ser um texto.`);
    error.status = 400;
    throw error;
  }
  return value.trim();
}

function optionalString(body, field, label = field) {
  const value = body[field];
  if (value === undefined || value === null || value === '') return null;
  if (typeof value !== 'string') {
    const error = new Error(`O campo "${label}" deve ser um texto.`);
    error.status = 400;
    throw error;
  }
  return value.trim() || null;
}

function validEmail(email) {
  return EMAIL_PATTERN.test(email);
}

function badRequest(message) {
  const error = new Error(message);
  error.status = 400;
  return error;
}

module.exports = {
  badRequest,
  optionalString,
  requireObjectBody,
  requiredString,
  validEmail,
};
