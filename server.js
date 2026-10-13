// 1. Importa as bibliotecas que vamos usar
const app = require('./src/app');
const pool = require('./src/config/database');

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

function shutdown(signal) {
  console.log(`${signal} recebido. Encerrando servidor...`);
  server.close(async (error) => {
    if (error) {
      console.error('Erro ao encerrar o servidor HTTP:', error);
      process.exitCode = 1;
    }
    try {
      await pool.end();
    } catch (poolError) {
      console.error('Erro ao encerrar o pool MySQL:', poolError);
      process.exitCode = 1;
    }
  });
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));