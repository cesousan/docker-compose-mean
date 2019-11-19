import { fromEvent } from 'rxjs';
import { tap, mergeMap } from 'rxjs/operators';
import { Server } from 'http';
import SocketIO from 'socket.io';

import createListeners from './subscriptions';
import wss from './ws-server';

export default (http: Server) => {
  wss().server = http;

  fromEvent<SocketIO.Socket>(wss().server as any, 'connection')
    .pipe(
      tap(socket => console.log('connected client!', socket.client.id)),
      mergeMap(createListeners)
    )
    .subscribe();
};
