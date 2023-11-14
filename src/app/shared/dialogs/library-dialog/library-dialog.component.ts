/* Angular */
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';

/* Material */
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

/* RxJs */
import { Observable, Subject, takeUntil } from 'rxjs';

/* NgRx */
import { Store } from '@ngrx/store';
import { selectUser } from '../../../state/user/user.selectors';

/* Services */
import { DispatcherService } from '../../services/dispatcher.service';
import { LibrariesService } from '../../services/libraries.service';

/* Interfaces */
import { LibraryDialogFormInterface } from './interfaces/library-dialog-form.interface';
import { UserInterface } from '../../interfaces/user.interface';
import { LibraryInterface } from '../../interfaces/library.interface';
import { LibraryDialogInputDataInterface } from './interfaces/library-dialog-input-data.interface';
import { LibraryDialogOutputDataInterface } from './interfaces/library-dialog-output-data.interface';

/* Enums */
import { LibraryDialogFormEnum } from './enums/library-dialog-form.enum';
import { LibraryDialogActionEnum } from './enums/library-dialog-action.enum';

@Component({
  selector: 'app-library-dialog',
  templateUrl: './library-dialog.component.html',
  styleUrls: ['./library-dialog.component.scss']
})
export class LibraryDialogComponent implements OnInit, OnDestroy {

  protected readonly destroy$: Subject<boolean> = new Subject<boolean>();

  protected readonly user$: Observable<UserInterface | null> = this.store.select(selectUser);

  protected readonly LibraryFormEnum: typeof LibraryDialogFormEnum = LibraryDialogFormEnum;

  public user!: UserInterface | null;
  public library!: LibraryInterface | null;
  public titleKey!: string;

  private _form!: UntypedFormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogInputData: LibraryDialogInputDataInterface,
    private readonly matDialogRef: MatDialogRef<LibraryDialogComponent>,
    private readonly dispatcherService: DispatcherService,
    private readonly librariesService: LibrariesService,
    private readonly store: Store
  ) {
    this.library = this.dialogInputData?.library ?? null;
    this.titleKey = this.library === null ? 'dialogs.library.createLibrary' : 'dialogs.library.modifyLibrary';
  }


  /* ----- Life cycle methods ----------------------------------------------------------------------------------------------------------- */

  ngOnInit(): void {
    this.initForm();
    this.initStoreSubscriptions();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


  /* ----- Getters & Setters ------------------------------------------------------------------------------------------------------------ */

  get form(): UntypedFormGroup {
    return this._form;
  }

  set form(form: UntypedFormGroup) {
    this._form = form;
  }


  /* ----- On click methods ------------------------------------------------------------------------------------------------------------- */

  public onClickCancel(): void {
    this.matDialogRef.close({ actionPerformed: LibraryDialogActionEnum.Cancel } as LibraryDialogOutputDataInterface);
  }

  public async onClickCreateLibrary(): Promise<void> {

    if (this.user === null) {
      return;
    }

    const uid: string = this.user.uid;
    const library: { name: string } = this.form.value;

    this.librariesService.createLibrary(library.name, uid)
      .then((): void => this.matDialogRef.close(LibraryDialogActionEnum.Save))
      .catch((error: Error) => this.dispatcherService.createLibraryError(error));
  }

  public async onClickModifyLibrary(): Promise<void> {

    if (this.user === null || this.library === null) {
      return;
    }

    const library: { name: string } = this.form.value;

    this.librariesService.modifyLibrary(this.library.id, library.name)
      .then((): void => this.matDialogRef.close(LibraryDialogActionEnum.Save))
      .catch((error: Error) => this.dispatcherService.modifyLibraryError(error));
  }


  /* ----- Store related Methods -------------------------------------------------------------------------------------------------------- */

  private initStoreSubscriptions(): void {

    this.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: UserInterface | null) => this.user = user);
  }


  /* ----- Other private methods -------------------------------------------------------------------------------------------------------- */

  private initForm(): void {
    this.form = new FormGroup<LibraryDialogFormInterface>({
      name: new FormControl({ value: this.library?.name ?? null, disabled: false }, [Validators.required])
    });
  }

}
