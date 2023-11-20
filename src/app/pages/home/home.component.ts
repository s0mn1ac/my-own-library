/* Angular */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/* RxJs */
import { Observable, Subject, take, takeUntil } from 'rxjs';

/* NgRx */
import { Store } from '@ngrx/store';
import { selectLibraries } from '../../state/libraries/libraries.selectors';

/* Services */
import { ModalService } from '../../shared/services/modal.service';

/* Components */
import { ConfigurationDialogComponent } from '../../shared/dialogs/configuration-dialog/configuration-dialog.component';
import { LibraryDialogComponent } from '../../shared/dialogs/library-dialog/library-dialog.component';

/* Interfaces */
import { LibraryInterface } from '../../shared/interfaces/library.interface';
import { LibraryDialogOutputDataInterface } from '../../shared/dialogs/library-dialog/interfaces/library-dialog-output-data.interface';
import { ConfigurationDialogOutputDataInterface } from '../../shared/dialogs/configuration-dialog/interfaces/configuration-dialog-output-data.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  protected readonly destroy$: Subject<boolean> = new Subject<boolean>();

  protected readonly libraries$: Observable<LibraryInterface[]> = this.store.select(selectLibraries);

  public libraries!: LibraryInterface[];

  constructor(
    private readonly modalService: ModalService,
    private readonly router: Router,
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

  public onClickShowConfigurationOptions(): void {

    this.modalService.showCustomModal(ConfigurationDialogComponent).onClose
      .pipe(take(1))
      .subscribe((dialogOutputData: ConfigurationDialogOutputDataInterface | undefined) => console.log(dialogOutputData));
  }

  public onClickAddLibrary(): void {

    this.modalService.showCustomModal(LibraryDialogComponent).onClose
      .pipe(take(1))
      .subscribe((dialogOutputData: LibraryDialogOutputDataInterface | undefined) => console.log(dialogOutputData));
  }


  /* ----- Store related Methods -------------------------------------------------------------------------------------------------------- */

  private initStoreSubscriptions(): void {

    this.libraries$
      .pipe(takeUntil(this.destroy$))
      .subscribe((libraries: LibraryInterface[]) => this.onChangeLibraries(libraries));
  }

  private onChangeLibraries(libraries: LibraryInterface[]): void {
    this.libraries = libraries;
  }

}
