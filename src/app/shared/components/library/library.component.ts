/* Angular */
import { Component, Input } from '@angular/core';

/* Animations */
import { fadeInOut, fadeSlideHeightInOut, fadeSlideInOut } from '../../animations/animations.config';

/* Interfaces */
import { LibraryInterface } from '../../interfaces/library.interface';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { LibraryDialogComponent } from '../../dialogs/library-dialog/library-dialog.component';
import {
  LibraryDialogOutputDataInterface
} from '../../dialogs/library-dialog/interfaces/library-dialog-output-data.interface';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  LibraryDialogInputDataInterface
} from '../../dialogs/library-dialog/interfaces/library-dialog-input-data.interface';
import { LibraryDialogActionEnum } from '../../dialogs/library-dialog/enums/library-dialog-action.enum';
import { LibrariesService } from '../../services/libraries.service';
import { DispatcherService } from '../../services/dispatcher.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
  animations: [fadeSlideInOut, fadeSlideHeightInOut, fadeInOut]
})
export class LibraryComponent {

  @Input() library!: LibraryInterface;

  constructor(
    private readonly dispatcherService: DispatcherService,
    private readonly librariesService: LibrariesService,
    private readonly matDialog: MatDialog
  ) { }


  /* ----- On click methods ------------------------------------------------------------------------------------------------------------- */

  public onClickDeleteLibrary(): void {
    this.librariesService.deleteLibrary(this.library.id)
      .then((): void => console.log(' -> TODO: Do Something'))
      .catch((error: Error) => this.dispatcherService.deleteLibraryError(error));
  }

  public onClickModifyLibrary(): void {
    const dialogInputData: LibraryDialogInputDataInterface = { library: this.library };
    const config: MatDialogConfig = { data: dialogInputData, disableClose: true, width: '500px' };
    const matDialogRef: MatDialogRef<LibraryDialogComponent> = this.matDialog.open(LibraryDialogComponent, config);
    matDialogRef.afterClosed().subscribe((dialogOutputData: LibraryDialogOutputDataInterface) => console.log(dialogOutputData));
  }

}
