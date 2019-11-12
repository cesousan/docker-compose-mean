import { Observable, merge } from 'rxjs';
import { filter, tap, map } from 'rxjs/operators';
import { Socket } from 'ngx-socket-io';

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private API_URL = 'http://0.0.0.0:4200';
  constructor(private http: HttpClient, private socket: Socket) {}

  getContent(): Observable<string> {
    return this.http.get(this.API_URL).pipe(
      tap(console.log),
      map((x: any) => x.message)
    );
  }

  getItems(): Observable<{ name: string; date: Date | string }> {
    return this.http
      .get<{ name: string; date: Date | string }>(`${this.API_URL}/items`)
      .pipe(filter(x => !!x));
  }

  createItem(name: string) {
    return this.http.post(`${this.API_URL}/item`, { name });
  }

  deleteItem(id: string) {
    const params = new HttpParams().set('id', id);
    return this.http.delete(`${this.API_URL}/item`, { params });
  }

  getItemsChanged() {
    return merge(
      this.socket.fromEvent<any>('item-added'),
      this.socket.fromEvent<any>('item-removed')
    );
  }
}
