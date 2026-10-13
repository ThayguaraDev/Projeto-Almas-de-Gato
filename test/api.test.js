const assert = require('node:assert/strict');
const { after, before, test } = require('node:test');
const app = require('../src/app');
const pool = require('../src/config/database');

let server;
let baseUrl;
let insertedRows;

before(async () => {
  insertedRows = [];
  pool.execute = async (sql, values = []) => {
    if (sql.trim().startsWith('INSERT')) {
      insertedRows.push({ sql, values });
      return [{ insertId: 42 }, []];
    }
    return [[], []];
  };

  server = app.listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  const closing = new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
  server.closeAllConnections();
  await closing;
  await pool.end();
});

test('health check e erros de rota e validação', async () => {
  const health = await fetch(`${baseUrl}/api/health`);
  assert.equal(health.status, 200);
  assert.deepEqual(await health.json(), { status: 'ok' });

  const invalidStatus = await fetch(`${baseUrl}/api/cats?status=unknown`);
  assert.equal(invalidStatus.status, 400);

  const invalidId = await fetch(`${baseUrl}/api/cats/nope`);
  assert.equal(invalidId.status, 400);

  const missingContactFields = await fetch(`${baseUrl}/api/contact`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ name: 'Ana' }),
  });
  assert.equal(missingContactFields.status, 400);

  const missingRoute = await fetch(`${baseUrl}/api/unknown`);
  assert.equal(missingRoute.status, 404);
});

test('cria gato, doação e mensagem usando os campos validados', async () => {
  const catResponse = await fetch(`${baseUrl}/api/cats`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ name: 'Mimi' }),
  });
  assert.equal(catResponse.status, 201);
  assert.deepEqual((await catResponse.json()).data, {
    id: 42,
    name: 'Mimi',
    age: null,
    gender: null,
    description: null,
    image_url: null,
    status: 'disponivel',
  });

  const invalidDonation = await fetch(`${baseUrl}/api/donations`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      donor_name: 'Ana',
      email: 'ana@example.com',
      type: 'financeira',
      amount: true,
    }),
  });
  assert.equal(invalidDonation.status, 400);

  const donationResponse = await fetch(`${baseUrl}/api/donations`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      donor_name: 'Ana',
      email: 'ana@example.com',
      type: 'ração',
      description: 'Um saco de ração',
    }),
  });
  assert.equal(donationResponse.status, 201);
  assert.equal((await donationResponse.json()).data.type, 'racao');

  const contactResponse = await fetch(`${baseUrl}/api/contact`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      name: 'Ana',
      email: 'ana@example.com',
      message: 'Quero conhecer os gatinhos.',
    }),
  });
  assert.equal(contactResponse.status, 201);
  assert.equal((await contactResponse.json()).data.id, 42);

  assert.deepEqual(insertedRows.map((row) => row.values[row.values.length - 1]), [
    'disponivel',
    'Um saco de ração',
    'Quero conhecer os gatinhos.',
  ]);
});
