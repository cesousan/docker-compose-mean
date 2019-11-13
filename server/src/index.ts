import bodyParser from 'body-parser';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { connectToUsersDB, Item } from './core/db/db';
import { wsServer } from './server';

export const app = express();

connectToUsersDB();

const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN;

const options: cors.CorsOptions = {
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token'],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: CLIENT_ORIGIN,
  preflightContinue: false,
};

app.use(cors(options));
app.options('*', cors(options));
app.use(bodyParser());

const message = 'Hello, you!';

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.json({ message });
});

app.get('/items', async (req: Request, res: Response) => {
  const items = await Item.find();
  res.send(items);
});

app.post('/item', async (req: Request, res: Response) => {
  const newItem = new Item({
    name: req.body.name,
  });
  try {
    const item = await newItem.save();
    res.send(item);
    wsServer.emit('item-added', item);
  } catch (err) {
    res.send(err);
  }
});

app.delete('/item', async (req: Request, res: Response) => {
  const id = req.query.id;
  try {
    const item = await Item.findByIdAndDelete(id);
    res.send(item);
    wsServer.emit('item-removed', item);
  } catch (err) {
    res.send(err);
  }
});

// app.options('*', cors());
