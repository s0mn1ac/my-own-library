/* Angular */
import { Component, OnDestroy, OnInit } from '@angular/core';

/* RxJs */
import { Observable, Subject, take, takeUntil } from 'rxjs';

/* NgRx */
import { Store } from '@ngrx/store';
import { selectUser } from '../../state/user/user.selectors';
import { selectLibraries } from '../../state/libraries/libraries.selectors';

/* Services */
import { DispatcherService } from '../../shared/services/dispatcher.service';
import { LibrariesService } from '../../shared/services/libraries.service';
import { ModalService } from '../../shared/services/modal.service';

/* Components */
import { ConfigurationDialogComponent } from '../../shared/dialogs/configuration-dialog/configuration-dialog.component';
import { LibraryDialogComponent } from '../../shared/dialogs/library-dialog/library-dialog.component';

/* Interfaces */
import { UserInterface } from '../../shared/interfaces/user.interface';
import { LibraryInterface } from '../../shared/interfaces/library.interface';
import { LibraryDialogOutputDataInterface } from '../../shared/dialogs/library-dialog/interfaces/library-dialog-output-data.interface';
import { ConfigurationDialogOutputDataInterface } from '../../shared/dialogs/configuration-dialog/interfaces/configuration-dialog-output-data.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public readonly destroy$: Subject<boolean> = new Subject<boolean>();

  public readonly user$: Observable<UserInterface | null> = this.store.select(selectUser);
  public readonly libraries$: Observable<LibraryInterface[]> = this.store.select(selectLibraries);

  public user!: UserInterface | null;
  public libraries!: LibraryInterface[];

  constructor(
    private readonly dispatcherService: DispatcherService,
    private readonly librariesService: LibrariesService,
    private readonly modalService: ModalService,
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


  /* ----- On click methods ------------------------------------------------------------------------------------------------------------- */

  public onClickAddLibrary(): void {

    this.modalService.showCustomModal(LibraryDialogComponent).onClose
      .pipe(take(1))
      .subscribe((dialogOutputData: LibraryDialogOutputDataInterface | undefined) => console.log(dialogOutputData));
  }


  /* ----- Store related Methods -------------------------------------------------------------------------------------------------------- */

  private initStoreSubscriptions(): void {

    this.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: UserInterface | null): Promise<void> => this.onChangeUser(user));

    this.libraries$
      .pipe(takeUntil(this.destroy$))
      .subscribe((libraries: LibraryInterface[]) => this.onChangeLibraries(libraries));
  }

  private async onChangeUser(user: UserInterface | null): Promise<void> {

    const isUserAlreadyLoggedIn: boolean = this.user?.uid === user?.uid;

    this.user = user;

    if (this.user === null || isUserAlreadyLoggedIn) {
      return;
    }

    this.getLibraries(this.user.uid).then();
  }

  private onChangeLibraries(libraries: LibraryInterface[]): void {
    this.libraries = libraries;
  }


  /* ----- Other private methods -------------------------------------------------------------------------------------------------------- */

  private async getLibraries(uid: string): Promise<void> {

    const libraries: LibraryInterface[] | undefined = await this.librariesService.getLibraries(uid);

    if (libraries === undefined) {
      return;
    }

    this.dispatcherService.getLibrariesSuccess(libraries);
  }

}
