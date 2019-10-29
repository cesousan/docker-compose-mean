import express, { NextFunction, Request, Response } from 'express';

import cors from 'cors';

export const app = express();

const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN;

const options: cors.CorsOptions = {
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token'],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: CLIENT_ORIGIN,
  preflightContinue: false
};

app.use(cors(options));

const message = 'Hello, World!';

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.json({ message });
});

app.options('*', cors(options));
