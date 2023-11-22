/* Angular */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';

/* PrimeNG */
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

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
import { LibraryDialogOutputDataInterface } from './interfaces/library-dialog-output-data.interface';
import { FirestoreLibraryInterface } from '../../interfaces/firestore-library.interface';

/* Enums */
import { LibraryDialogFormEnum } from './enums/library-dialog-form.enum';
import { LibraryDialogActionEnum } from './enums/library-dialog-action.enum';
import { ErrorEnum } from '../../enums/error.enum';

@Component({
  selector: 'app-library-dialog',
  templateUrl: './library-dialog.component.html',
  styleUrls: ['./library-dialog.component.scss']
})
export class LibraryDialogComponent implements OnInit, OnDestroy {

  public readonly destroy$: Subject<boolean> = new Subject<boolean>();

  public readonly user$: Observable<UserInterface | null> = this.store.select(selectUser);

  protected readonly LibraryDialogFormEnum: typeof LibraryDialogFormEnum = LibraryDialogFormEnum;
  protected readonly ErrorEnum: typeof ErrorEnum = ErrorEnum;

  public user!: UserInterface | null;
  public library!: LibraryInterface | null;
  public titleKey!: string;

  private _form!: UntypedFormGroup;

  private _isLoading: boolean = false;

  constructor(
    private readonly dynamicDyalogConfig: DynamicDialogConfig,
    private readonly dynamicDyalogRef: DynamicDialogRef,
    private readonly dispatcherService: DispatcherService,
    private readonly librariesService: LibrariesService,
    private readonly store: Store
  ) {
    this.library = this.dynamicDyalogConfig.data?.library ?? null;
    this.titleKey = this.library === null ? 'dialogs.library.createLibrary' : 'dialogs.library.modifyLibrary';
  }


  /* ----- Getters & Setters ------------------------------------------------------------------------------------------------------------ */

  get isLoading(): boolean {
    return this._isLoading;
  }

  set isLoading(isLoading: boolean) {
    this._isLoading = isLoading;
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
    this.dynamicDyalogRef.close({ actionPerformed: LibraryDialogActionEnum.Cancel } as LibraryDialogOutputDataInterface);
  }

  public async onClickCreateLibrary(): Promise<void> {

    if (this.user === null) {
      return;
    }

    this.setLoadingState(true);

    const library: FirestoreLibraryInterface = {
      name: this.form.value.name,
      owner: this.user.uid,
      games: [],
      created: new Date()
    };

    const libraryId: string | undefined = await this.librariesService.createLibrary(library);

    if (libraryId === undefined) {
      this.setLoadingState(false);
      return;
    }

    this.dynamicDyalogRef.close(LibraryDialogActionEnum.Save);
    this.setLoadingState(false);
  }

  public async onClickModifyLibrary(): Promise<void> {

    if (this.user === null || this.library === null) {
      return;
    }

    this.setLoadingState(true);

    const library: LibraryInterface = { ...this.library, name: this.form.value['name'] };

    const isLibraryUpdated: boolean = await this.librariesService.updateLibrary(library);

    if (!isLibraryUpdated) {
      this.setLoadingState(false);
      return;
    }

    this.dynamicDyalogRef.close(LibraryDialogActionEnum.Save);
    this.setLoadingState(false);
  }


  /* ----- Store related Methods -------------------------------------------------------------------------------------------------------- */

  private initStoreSubscriptions(): void {

    this.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: UserInterface | null) => this.user = user);
  }


  /* ----- Other public methods --------------------------------------------------------------------------------------------------------- */

  public checkErrors(error: ErrorEnum): boolean {
    return this.form.controls[LibraryDialogFormEnum.Name].errors?.[error] && this.form.controls[LibraryDialogFormEnum.Name].dirty;
  }


  /* ----- Other private methods -------------------------------------------------------------------------------------------------------- */

  private initForm(): void {
    this.form = new FormGroup<LibraryDialogFormInterface>({
      name: new FormControl({ value: this.library?.name ?? null, disabled: false }, [Validators.required])
    });
  }

  private setLoadingState(isLoading: boolean): void {
    this.isLoading = isLoading;
    this.isLoading ? this.form.disable() : this.form.enable();
  }

}
