const contactService = require('../services/contactService');
const {
  badRequest,
  optionalString,
  requireObjectBody,
  requiredString,
  validEmail,
} = require('../utils/validation');

async function createContactMessage(req, res) {
  const body = requireObjectBody(req.body);
  const name = requiredString(body, 'name', 'nome');
  const email = requiredString(body, 'email', 'e-mail');
  if (!validEmail(email)) throw badRequest('Informe um endereço de e-mail válido.');

  const message = {
    name,
    email,
    subject: optionalString(body, 'subject', 'assunto'),
    message: requiredString(body, 'message', 'mensagem'),
  };
  const createdMessage = await contactService.createContactMessage(message);
  return res.status(201).json({ data: createdMessage });
}

module.exports = { createContactMessage };
