/* Angular */
import { Component, Input } from '@angular/core';

/* RxJs */
import { take } from 'rxjs';

/* Services */
import { DispatcherService } from '../../services/dispatcher.service';
import { LibrariesService } from '../../services/libraries.service';
import { ModalService } from '../../services/modal.service';

/* Components */
import { LibraryDialogComponent } from '../../dialogs/library-dialog/library-dialog.component';

/* Interfaces */
import { ConfirmationDialogOutputDataInterface } from '../../dialogs/confirmation-dialog/interfaces/confirmation-dialog-output-data.interface';
import { LibraryInterface } from '../../interfaces/library.interface';
import { LibraryDialogInputDataInterface } from '../../dialogs/library-dialog/interfaces/library-dialog-input-data.interface';
import { LibraryDialogOutputDataInterface } from '../../dialogs/library-dialog/interfaces/library-dialog-output-data.interface';

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
    private readonly modalService: ModalService
  ) { }


  /* ----- On click methods ------------------------------------------------------------------------------------------------------------- */

  public async onClickDeleteLibrary(): Promise<void> {

    const titleKey: string = 'messages.confirmations.confirmDeleteLibraryTitle';
    const messageKey: string = 'messages.confirmations.confirmDeleteLibraryMessage';

    this.modalService.showConfirmationModal(titleKey, messageKey).onClose
      .pipe(take(1))
      .subscribe((dialogOutputData: ConfirmationDialogOutputDataInterface | undefined): void => {

        if (dialogOutputData === undefined || dialogOutputData?.actionPerformed === ConfirmationDialogActionEnum.Reject) {
          return;
        }

        this.librariesService.deleteLibrary(this.library.id)
          .then((): void => this.dispatcherService.deleteLibrarySuccess(this.library.id))
          .catch((error: Error) => this.dispatcherService.deleteLibraryError(this.library.id, error));
      });
  }

  public onClickModifyLibrary(): void {

    const data: LibraryDialogInputDataInterface = { library: this.library };

    this.modalService.showCustomModal(LibraryDialogComponent, data).onClose
      .pipe(take(1))
      .subscribe((dialogOutputData: LibraryDialogOutputDataInterface | undefined) => console.log(dialogOutputData));
  }

}
