import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule, MatIconModule } from '@angular/material';

import { AppComponent } from './app.component';
import { AppService } from './app.service';

const config: SocketIoConfig = { url: 'http://localhost:4200', options: {} };

const MATERIAL = [MatButtonModule, MatIconModule];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
    BrowserAnimationsModule,
    ...MATERIAL,
  ],
  providers: [AppService],
  bootstrap: [AppComponent],
})
export class AppModule {}
