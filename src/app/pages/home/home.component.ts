/* Angular */
import { Component, OnDestroy, OnInit } from '@angular/core';

/* RxJs */
import { Observable, Subject, take, takeUntil } from 'rxjs';

/* NgRx */
import { Store } from '@ngrx/store';
import { selectUser } from '../../state/user/user.selectors';
import { selectLibraries } from '../../state/libraries/libraries.selectors';

/* Services */
import { ModalService } from '../../shared/services/modal.service';

/* Components */
import { LibraryDialogComponent } from '../../shared/dialogs/library-dialog/library-dialog.component';

/* Interfaces */
import { UserInterface } from '../../shared/interfaces/user.interface';
import { LibraryInterface } from '../../shared/interfaces/library.interface';
import { LibraryDialogOutputDataInterface } from '../../shared/dialogs/library-dialog/interfaces/library-dialog-output-data.interface';

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
      .subscribe((user: UserInterface | null): UserInterface | null => this.user = user);

    this.libraries$
      .pipe(takeUntil(this.destroy$))
      .subscribe((libraries: LibraryInterface[]): LibraryInterface[] => this.libraries = libraries);
  }

}
