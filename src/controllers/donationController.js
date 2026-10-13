const donationService = require('../services/donationService');
const {
  badRequest,
  optionalString,
  requireObjectBody,
  requiredString,
  validEmail,
} = require('../utils/validation');

const DONATION_TYPES = ['financeira', 'racao', 'lar_temporario'];

async function createDonation(req, res) {
  const body = requireObjectBody(req.body);
  const donorName = requiredString(body, 'donor_name', 'nome');
  const email = requiredString(body, 'email', 'e-mail');
  if (!validEmail(email)) throw badRequest('Informe um endereço de e-mail válido.');

  const submittedType = requiredString(body, 'type', 'tipo de doação').toLowerCase();
  const type = {
    'ração': 'racao',
    'lar temporário': 'lar_temporario',
  }[submittedType] || submittedType;
  if (!DONATION_TYPES.includes(type)) {
    throw badRequest(`Tipo inválido. Use: ${DONATION_TYPES.join(', ')}.`);
  }

  let amount = null;
  if (type === 'financeira') {
    if (typeof body.amount !== 'number' && typeof body.amount !== 'string') {
      throw badRequest('Para doação financeira, informe um valor positivo em "amount".');
    }
    amount = Number(body.amount);
    if (!Number.isFinite(amount) || amount <= 0) {
      throw badRequest('Para doação financeira, informe um valor positivo em "amount".');
    }
  } else if (body.amount !== undefined && body.amount !== null && body.amount !== '') {
    throw badRequest('O campo "amount" só pode ser informado para doações financeiras.');
  }

  const donation = {
    donorName,
    email,
    phone: optionalString(body, 'phone', 'telefone'),
    type,
    amount,
    description: optionalString(body, 'description', 'descrição'),
  };
  const createdDonation = await donationService.createDonation(donation);
  return res.status(201).json({ data: createdDonation });
}

module.exports = { createDonation };
