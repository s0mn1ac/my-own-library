/* Angular */
import { Component, Inject } from '@angular/core';

/* Material */
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

/* Interfaces */
import { ConfirmationDialogInputDataInterface } from './interfaces/confirmation-dialog-input-data.interface';
import { ConfirmationDialogOutputDataInterface } from './interfaces/confirmation-dialog-output-data.interface';

/* Enums */
import { ConfirmationDialogActionEnum } from './enums/confirmation-dialog-action.enum';

@Component({
  selector: 'app-library-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {

  public titleKey!: string;
  public messageKey!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogInputData: ConfirmationDialogInputDataInterface,
    private readonly matDialogRef: MatDialogRef<ConfirmationDialogComponent>
  ) {
    this.titleKey = this.dialogInputData?.titleKey;
    this.messageKey = this.dialogInputData?.messageKey;
  }


  /* ----- On click methods ------------------------------------------------------------------------------------------------------------- */

  public onClickReject(): void {
    this.matDialogRef.close({ actionPerformed: ConfirmationDialogActionEnum.Reject } as ConfirmationDialogOutputDataInterface);
  }

  public onClickConfirm(): void {
    this.matDialogRef.close({ actionPerformed: ConfirmationDialogActionEnum.Confirm } as ConfirmationDialogOutputDataInterface);
  }

}
