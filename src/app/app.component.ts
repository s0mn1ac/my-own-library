/* Angular */
import { Component, OnDestroy, OnInit } from '@angular/core';

/* RxJs */
import { Subject } from 'rxjs';

/* NgRx */
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  protected readonly destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private readonly store: Store
  ) { }


  /* ----- Life cycle methods ----------------------------------------------------------------------------------------------------------- */

  ngOnInit(): void {
    this.initStoreSubscriptions();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


  /* ----- Store related Methods -------------------------------------------------------------------------------------------------------- */

  private initStoreSubscriptions(): void {
    // TODO: Init store subscriptions
  }

}
