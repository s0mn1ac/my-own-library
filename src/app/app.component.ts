/* Angular */
import { Component, OnDestroy, OnInit } from '@angular/core';

/* RxJs */
import { Observable, Subject, takeUntil } from 'rxjs';

/* NgRx */
import { Store } from '@ngrx/store';
import { selectUser } from './state/user/user.selectors';

/* Services */
import { AuthService } from './shared/services/auth.service';

/* Interfaces */
import { UserInterface } from './shared/interfaces/user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  protected readonly destroy$: Subject<boolean> = new Subject<boolean>();
  protected readonly destroyUser$: Subject<boolean> = new Subject<boolean>();

  protected readonly user$: Observable<UserInterface | null> = this.store.select(selectUser);

  private user!: UserInterface | null;

  constructor(
    private readonly authService: AuthService,
    private readonly store: Store
  ) { }


  /* ----- Life cycle methods ----------------------------------------------------------------------------------------------------------- */

  ngOnInit(): void {
    this.initStoreSubscriptions();
    this.initFirestoreSubscriptions();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
    this.destroyUser();
  }


  /* ----- Store related Methods -------------------------------------------------------------------------------------------------------- */

  private initStoreSubscriptions(): void {

    this.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: UserInterface | null): void => this.onChangeUser(user));
  }

  private onChangeUser(user: UserInterface | null): void {

    this.user = user;

    if (user === null) {
      return;
    }

    this.initFirestoreSubscriptions();
  }


  /* ----- Firestore related Methods ---------------------------------------------------------------------------------------------------- */

  private initFirestoreSubscriptions(): void {

    if (this.user === null || this.destroyUser$?.closed) {
      return;
    }

    this.destroyUser();
  }


  /* ----- Destroy Subscriptions -------------------------------------------------------------------------------------------------------- */

  private destroyUser(): void {

    if (this.destroyUser$?.closed) {
      return;
    }

    this.destroyUser$.next(true);
    this.destroyUser$.unsubscribe();
  }

}
