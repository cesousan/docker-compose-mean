import { app } from '.';
import { createServer } from 'http';
import { createWSServer, listenOnEvent } from './push-server';
import { fromEvent } from 'rxjs';
import { tap, mergeMap } from 'rxjs/operators';

const envPort: string = process.env.PORT;
const envHost: string = process.env.HOST;

// Constants
const PORT = (!!envPort && Number.parseInt(envPort, 10)) || 3000;
const HOST = envHost || '0.0.0.0';

const http = createServer(app);

export const wsServer = createWSServer(http);

// io.on('connection', socket => console.log(socket));
export const wsEvents$ = fromEvent<SocketIO.Socket>(wsServer as any, 'connection')
  .pipe(
    tap(socket => console.log('connected client!', socket.client.id)),
    mergeMap(socket => listenOnEvent(socket, 'item_added'))
  )
  .subscribe();

http.listen(PORT, HOST, () => console.log(`Server running on  http://${HOST}:${PORT}`));
