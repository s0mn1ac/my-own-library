/* Angular */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/* Material */
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

/* RxJs */
import { Observable, Subject, takeUntil } from 'rxjs';

/* NgRx */
import { Store } from '@ngrx/store';
import { selectLibraries } from '../../state/libraries/libraries.selectors';

/* Interfaces */
import { LibraryInterface } from '../../shared/interfaces/library.interface';
import { LibraryDialogComponent } from '../../shared/dialogs/library-dialog/library-dialog.component';
import {
  LibraryDialogOutputDataInterface
} from '../../shared/dialogs/library-dialog/interfaces/library-dialog-output-data.interface';

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
    private readonly matDialog: MatDialog,
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

  public onClickGoToConfigurationPage(): void {
    this.router.navigate(['/configuration']).then();
  }

  public onClickAddLibrary(): void {
    const config: MatDialogConfig = { disableClose: true, width: '500px' };
    const matDialogRef: MatDialogRef<LibraryDialogComponent> = this.matDialog.open(LibraryDialogComponent, config);
    matDialogRef.afterClosed().subscribe((dialogOutputData: LibraryDialogOutputDataInterface) => console.log(dialogOutputData));
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
