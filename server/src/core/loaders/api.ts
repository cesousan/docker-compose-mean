import { Router } from 'express';

import item from '../../features/item/item.route';

export default () => {
  const app = Router();
  item(app);
  return app;
};
