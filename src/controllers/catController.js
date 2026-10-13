const catService = require('../services/catService');
const {
  badRequest,
  optionalString,
  requireObjectBody,
  requiredString,
} = require('../utils/validation');

async function listCats(req, res) {
  const { status } = req.query;
  if (status && !catService.CAT_STATUSES.includes(status)) {
    throw badRequest(`Status inválido. Use: ${catService.CAT_STATUSES.join(', ')}.`);
  }

  const cats = await catService.listCats(status);
  res.json({ data: cats });
}

async function getCat(req, res) {
  const id = Number(req.params.id);
  if (!Number.isSafeInteger(id) || id < 1) {
    throw badRequest('O parâmetro "id" deve ser um inteiro positivo.');
  }

  const cat = await catService.getCatById(id);
  if (!cat) {
    return res.status(404).json({ error: 'Gatinho não encontrado.' });
  }
  return res.json({ data: cat });
}

async function createCat(req, res) {
  const body = requireObjectBody(req.body);
  const cat = {
    name: requiredString(body, 'name', 'nome'),
    age: optionalString(body, 'age', 'idade'),
    gender: optionalString(body, 'gender', 'sexo'),
    description: optionalString(body, 'description', 'descrição'),
    imageUrl: optionalString(body, 'image_url', 'URL da imagem'),
    status: body.status === undefined ? 'disponivel' : requiredString(body, 'status', 'status'),
  };

  if (!catService.CAT_STATUSES.includes(cat.status)) {
    throw badRequest(`Status inválido. Use: ${catService.CAT_STATUSES.join(', ')}.`);
  }

  const createdCat = await catService.createCat(cat);
  return res.status(201).json({ data: createdCat });
}

module.exports = { createCat, getCat, listCats };
