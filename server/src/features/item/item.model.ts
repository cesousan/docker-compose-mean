import { Schema, model, Document } from 'mongoose';

import { IItem } from './item.interface';

const ItemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default model<IItem & Document>('Item', ItemSchema);
