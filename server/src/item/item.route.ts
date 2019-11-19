import { Router, Request, Response } from 'express';

import Item from './item.model';
import { addItem, removeItem } from './item.service';

const route = Router();

export default (app: Router) => {
  app.use('/item', route);

  route.get('/', (req: Request, res: Response) => {
    const message = 'Hello, you Item!';
    res.json({ message }).status(200);
  });

  route.post('/', async (req: Request, res: Response) => {
    try {
      res.send(await addItem(req.body.name)).status(200);
    } catch (err) {
      res.send(err).status(500);
    }
  });

  route.delete('/', async (req: Request, res: Response) => {
    try {
      res.send(await removeItem(req.query.id)).status(200);
    } catch (err) {
      res.send(err).status(500);
    }
  });

  route.get('/all', async (req: Request, res: Response) => {
    try {
      const items = await Item.find();
      res.send(items).status(200);
    } catch (err) {
      res.send(err).status(500);
    }
  });
};
