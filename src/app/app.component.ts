/* Angular */
import { Component, OnDestroy, OnInit } from '@angular/core';

/* RxJs */
import { Observable, Subject, takeUntil } from 'rxjs';

/* NgRx */
import { Store } from '@ngrx/store';
import { selectUser } from './state/user/user.selectors';

/* Services */
import { AuthService } from './shared/services/auth.service';
import { DispatcherService } from './shared/services/dispatcher.service';
import { LibrariesService } from './shared/services/libraries.service';

/* Interfaces */
import { UserInterface } from './shared/interfaces/user.interface';
import { LibraryInterface } from './shared/interfaces/library.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  protected readonly destroy$: Subject<boolean> = new Subject<boolean>();

  protected readonly user$: Observable<UserInterface | null> = this.store.select(selectUser);

  private user!: UserInterface | null;

  private libraries!: LibraryInterface[];

  private _isLibrariesSubscriptionInitialized: boolean = false;

  constructor(
    private readonly authService: AuthService,
    private readonly dispatcherService: DispatcherService,
    private readonly librariesService: LibrariesService,
    private readonly store: Store
  ) { }

  /* ----- Getters & Setters ------------------------------------------------------------------------------------------------------------ */

  get isLibrariesSubscriptionInitialized(): boolean {
    return this._isLibrariesSubscriptionInitialized;
  }

  set isLibrariesSubscriptionInitialized(isLibrariesSubscriptionInitialized: boolean) {
    this._isLibrariesSubscriptionInitialized = isLibrariesSubscriptionInitialized;
  }


  /* ----- Life cycle methods ----------------------------------------------------------------------------------------------------------- */

  ngOnInit(): void {
    this.initStoreSubscriptions();
    this.initFirestoreSubscriptions();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


  /* ----- Store related Methods -------------------------------------------------------------------------------------------------------- */

  private initStoreSubscriptions(): void {

    this.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: UserInterface | null): void => this.onChangeUser(user));
  }

  private onChangeUser(user: UserInterface | null): void {
    this.isLibrariesSubscriptionInitialized = !(user === null || this.user?.uid !== user?.uid);
    this.user = user;
    this.initFirestoreSubscriptions();
  }


  /* ----- Firestore related Methods ---------------------------------------------------------------------------------------------------- */

  private initFirestoreSubscriptions(): void {

    if (this.user === null || this.isLibrariesSubscriptionInitialized) {
      return;
    }

    this.isLibrariesSubscriptionInitialized = true;

    this.librariesService.getLibraries(this.user.uid)
      .pipe(takeUntil(this.destroy$))
      .subscribe((libraries: LibraryInterface[]): void => this.onChangeLibraries(libraries));
  }

  private onChangeLibraries(libraries: LibraryInterface[]): void {
    this.libraries = libraries;
    this.dispatcherService.updateLibraries(this.libraries);
  }

}
