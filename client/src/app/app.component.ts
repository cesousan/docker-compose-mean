import { BehaviorSubject, combineLatest, of, merge } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';

import { Component, ChangeDetectionStrategy } from '@angular/core';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
  animateChild,
} from '@angular/animations';

import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('items', [
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }), // initial
        animate(
          '1s cubic-bezier(.8, -0.6, 0.2, 1.5)',
          style({ transform: 'scale(1)', opacity: 1 })
        ), // final
      ]),
      transition(':leave', [
        style({ transform: 'scale(1)', opacity: 1, height: '*' }),
        animate(
          '1s cubic-bezier(.8, -0.6, 0.2, 1.5)',
          style({
            transform: 'scale(0.5)',
            opacity: 0,
            height: '0px',
            margin: '0px',
          })
        ),
      ]),
    ]),
    trigger('list', [transition(':enter', [query('@items', stagger(150, animateChild()))])]),
  ],
})
export class AppComponent {
  private items = new BehaviorSubject(this.content.getItems());
  private items$ = this.items.asObservable().pipe(switchMap(x => x));

  private added = new BehaviorSubject(of(null));
  private added$ = this.added.asObservable().pipe(switchMap(x => x));

  private removed = new BehaviorSubject(of(null));
  private removed$ = this.removed.asObservable().pipe(switchMap(x => x));

  private content$ = this.content.getContent();

  private pushes$ = this.content.getItemsChanged().pipe(tap(_ => this.refreshItems()));

  private changes$ = merge(this.added$, this.removed$, this.pushes$);

  public data$ = combineLatest(this.items$, this.content$, this.changes$).pipe(
    map(([items, content, ...events]) => ({
      items,
      content,
    }))
  );

  constructor(private content: AppService) {}

  createItem = (name = getRdmName()) => this.added.next(this.content.createItem(name));

  refreshItems = () => this.items.next(this.content.getItems());

  delete = (id: string) => this.removed.next(this.content.deleteItem(id));

  trackById = (index: number, item: any) => item._id;
}

function getRdmName() {
  return `John ${Math.floor(Math.random() * 10000000)}`;
}
