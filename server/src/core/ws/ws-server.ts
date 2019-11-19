import SocketIO from 'socket.io';
import { Server } from 'http';

export default function() {
  const instance: any = this;
  return {
    get server() {
      return instance.wss;
    },
    set server(http: Server) {
      instance.wss = SocketIO(http) as SocketIO.Server;
    },
  };
}
