import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'client';
  content$; // = of('YO Yo YO!');
  constructor(private content: AppService) {}

  ngOnInit() {
    this.content$ = this.content.getContent();
  }
}
