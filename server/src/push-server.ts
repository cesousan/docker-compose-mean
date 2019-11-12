import SocketIO from 'socket.io';
import { Server } from 'http';
import { fromEvent } from 'rxjs';

export function createWSServer(server: Server) {
  return SocketIO(server);
}

export function listenOnEvent(socket: SocketIO.Socket, event: any) {
  return fromEvent<SocketIO.Socket>(socket, event);
}
