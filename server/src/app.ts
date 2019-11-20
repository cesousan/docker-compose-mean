import { createServer } from 'http';
import express from 'express';

import config from './core/config';
import loaders from './core/loaders';
import initWebSocketConnections from './core/ws';

async function startServer() {
  const app = express();

  await loaders({ expressApp: app });

  const http = createServer(app);

  initWebSocketConnections(http);

  http.listen(config.port, () => {
    console.info(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################
    `);
  });
}

startServer();
