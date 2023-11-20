/* Angular */
import { Component } from '@angular/core';

/* PrimeNG */
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

/* Interfaces */
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
    private readonly dynamicDyalogConfig: DynamicDialogConfig,
    private readonly dynamicDyalogRef: DynamicDialogRef,
  ) {
    this.titleKey = this.dynamicDyalogConfig.data.titleKey;
    this.messageKey = this.dynamicDyalogConfig.data.messageKey;
  }


  /* ----- On click methods ------------------------------------------------------------------------------------------------------------- */

  public onClickReject(): void {
    this.dynamicDyalogRef.close({ actionPerformed: ConfirmationDialogActionEnum.Reject } as ConfirmationDialogOutputDataInterface);
  }

  public onClickConfirm(): void {
    this.dynamicDyalogRef.close({ actionPerformed: ConfirmationDialogActionEnum.Confirm } as ConfirmationDialogOutputDataInterface);
  }

}
