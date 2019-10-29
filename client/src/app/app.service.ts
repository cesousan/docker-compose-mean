import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private http: HttpClient) {}

  getContent(): Observable<string> {
    return this.http.get('http://0.0.0.0:7000').pipe(
      tap(console.log),
      map((x: any) => x.message)
    );
  }
}
