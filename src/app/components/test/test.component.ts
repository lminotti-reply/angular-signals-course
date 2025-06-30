import { Component } from '@angular/core';
import {BehaviorSubject, debounceTime, distinctUntilChanged, filter, map, Observable, Subject, takeUntil} from 'rxjs';

enum ObjectType {

}

@Component({
  selector: 'app-test',
  imports: [],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {

  _destroyed = new Subject<void>(); // subject to manage unsubscribing from observables

  trigger1 = new Subject<any>();
  trigger2 = new Subject<any>();

  objects$ = new BehaviorSubject<ObjectType[]|undefined>(undefined);

  constructor() {

  }

  ngOnInit(): void {
    this.trigger1
      .pipe(takeUntil(this._destroyed)) // auto-unsubscribe when component is destroyed
      .subscribe(() => {
      // trigger 1 specific logics
      this.objects$.next([]);
    })

    this.trigger2
      .pipe(takeUntil(this._destroyed)) // auto-unsubscribe when component is destroyed
      .subscribe(object => {
      // trigger 2 specific logics
      this.objects$.next(object);
    })
  }

  ngOnDestroy() {
    this._destroyed.next();
  }

}
