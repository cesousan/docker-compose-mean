import Item from './item.model';
import { itemAdded, itemRemoved } from './item.sub';

export async function addItem(name: string) {
  const newItem = new Item({
    name,
  });
  const item = await newItem.save();
  itemAdded();
  return item;
}

export async function removeItem(id: string) {
  const item = await Item.findByIdAndDelete(id);
  itemRemoved();
  return item;
}
