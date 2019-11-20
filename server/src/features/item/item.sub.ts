import wss from '../../core/ws/ws-server';

const itemsEvents = {
  added: 'onItemAdded',
  removed: 'onItemRemoved',
};

export default itemsEvents;

export function itemAdded() {
  wss().server.emit(itemsEvents.added);
}

export function itemRemoved() {
  wss().server.emit(itemsEvents.removed);
}
