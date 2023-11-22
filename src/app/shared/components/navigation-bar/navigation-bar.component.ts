/* Angular */
import { Component, EventEmitter, Input, Output } from '@angular/core';

/* RxJs */
import { take } from 'rxjs';

/* Services */
import { ModalService } from '../../services/modal.service';

/* Components */
import { ConfigurationDialogComponent } from '../../dialogs/configuration-dialog/configuration-dialog.component';

/* Interfaces */
import { ConfigurationDialogOutputDataInterface } from '../../dialogs/configuration-dialog/interfaces/configuration-dialog-output-data.interface';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {

  @Input() leftActionIcon!: string | undefined;
  @Input() titleKey!: string;
  @Input() rightActionIcon!: string | undefined;

  @Output() leftActionEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() rightActionEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private readonly modalService: ModalService
  ) { }


  /* ----- On click methods ------------------------------------------------------------------------------------------------------------- */

  public async onClickOpenConfigurationDialog(): Promise<void> {

    this.modalService.showCustomModal(ConfigurationDialogComponent).onClose
      .pipe(take(1))
      .subscribe((dialogOutputData: ConfigurationDialogOutputDataInterface | undefined) => console.log(dialogOutputData));
  }

}
