import config from './core/config';

import express from 'express';

import loaders from './core/loaders';

async function startServer() {
  const app = express();

  await loaders({ expressApp: app });

  app.listen(config.port, err => {
    if (err) {
      console.error(err);
      process.exit(1);
      return;
    }
    console.info(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################
    `);
  });
}

startServer();
