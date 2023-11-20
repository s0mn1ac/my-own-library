/* Angular */
import { Injectable, Type } from '@angular/core';

/* PrimeNG */
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

/* Components */
import { ConfirmationDialogComponent } from '../dialogs/confirmation-dialog/confirmation-dialog.component';

/* Interfaces */
import { ConfirmationDialogInputDataInterface } from '../dialogs/confirmation-dialog/interfaces/confirmation-dialog-input-data.interface';

/* Enums */

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private readonly dialogService: DialogService
  ) { }

  public showConfirmationModal(titleKey: string, messageKey: string): DynamicDialogRef {

    return this.dialogService.open(
      ConfirmationDialogComponent,
      {
        data: { titleKey, messageKey } as ConfirmationDialogInputDataInterface,
        showHeader: false,
        width: '500px'
      } as DynamicDialogConfig
    );
  }

  public showCustomModal(component: Type<unknown>, data?: unknown): DynamicDialogRef {

    return this.dialogService.open(
      component,
      {
        data: data,
        showHeader: false,
        width: '500px'
      } as DynamicDialogConfig
    );
  }

}
