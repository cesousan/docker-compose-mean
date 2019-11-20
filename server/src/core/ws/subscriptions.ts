import { itemEvents } from '../../features/item';
import { merge, fromEvent } from 'rxjs';

const registeredEvents = {
  ...itemEvents,
};

export default (socket: SocketIO.Socket) => {
  const events: string[] = Object.values(registeredEvents);
  return merge(events.map(event => fromEvent<any>(socket, event)));
};
