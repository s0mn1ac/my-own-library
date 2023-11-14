/* Angular */
import { Component, Input } from '@angular/core';

/* Material */
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

/* RxJs */
import { lastValueFrom, take } from 'rxjs';

/* Services */
import { DispatcherService } from '../../services/dispatcher.service';
import { LibrariesService } from '../../services/libraries.service';

/* Components */
import { ConfirmationDialogComponent } from '../../dialogs/confirmation-dialog/confirmation-dialog.component';
import { LibraryDialogComponent } from '../../dialogs/library-dialog/library-dialog.component';

/* Interfaces */
import {
  ConfirmationDialogInputDataInterface
} from '../../dialogs/confirmation-dialog/interfaces/confirmation-dialog-input-data.interface';
import {
  ConfirmationDialogOutputDataInterface
} from '../../dialogs/confirmation-dialog/interfaces/confirmation-dialog-output-data.interface';
import { LibraryInterface } from '../../interfaces/library.interface';
import {
  LibraryDialogInputDataInterface
} from '../../dialogs/library-dialog/interfaces/library-dialog-input-data.interface';
import {
  LibraryDialogOutputDataInterface
} from '../../dialogs/library-dialog/interfaces/library-dialog-output-data.interface';

/* Enums */
import { ConfirmationDialogActionEnum } from '../../dialogs/confirmation-dialog/enums/confirmation-dialog-action.enum';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent {

  @Input() library!: LibraryInterface;

  constructor(
    private readonly dispatcherService: DispatcherService,
    private readonly librariesService: LibrariesService,
    private readonly matDialog: MatDialog
  ) { }


  /* ----- On click methods ------------------------------------------------------------------------------------------------------------- */

  public async onClickDeleteLibrary(): Promise<void> {

    const titleKey: string = 'messages.confirmations.confirmDeleteLibraryTitle';
    const messageKey: string = 'messages.confirmations.confirmDeleteLibraryMessage';

    const dialogActionPerformed: ConfirmationDialogActionEnum = await this.showConfirmationDialog(titleKey, messageKey);

    if (dialogActionPerformed === ConfirmationDialogActionEnum.Reject) {
      return;
    }

    this.librariesService.deleteLibrary(this.library.id)
      .then((): void => console.log(' -> TODO: Do Something'))
      .catch((error: Error) => this.dispatcherService.deleteLibraryError(error));
  }

  public onClickModifyLibrary(): void {

    const matDialogRef: MatDialogRef<LibraryDialogComponent> = this.matDialog.open(
      LibraryDialogComponent,
      {
        data: {
          library: this.library
        } as LibraryDialogInputDataInterface,
        disableClose: true,
        width: '500px'
      } as MatDialogConfig
    );

    matDialogRef.afterClosed()
      .pipe(take(1))
      .subscribe((dialogOutputData: LibraryDialogOutputDataInterface) => console.log(dialogOutputData));
  }


  /* ----- Other private methods -------------------------------------------------------------------------------------------------------- */

  private async showConfirmationDialog(titleKey: string, messageKey: string): Promise<ConfirmationDialogActionEnum> {

    const matDialogRef: MatDialogRef<ConfirmationDialogComponent> = this.matDialog.open(
      ConfirmationDialogComponent,
      {
        data: { titleKey, messageKey } as ConfirmationDialogInputDataInterface,
        disableClose: true,
        width: '500px'
      } as MatDialogConfig
    );

    const dialogOutputData: ConfirmationDialogOutputDataInterface = await lastValueFrom(matDialogRef.afterClosed());

    return dialogOutputData.actionPerformed;
  }

}
