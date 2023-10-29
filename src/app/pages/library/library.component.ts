/* Angular */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

/* Firebase */
import { DocumentReference } from '@firebase/firestore';

/* RxJs */
import { Observable, Subject, takeUntil } from 'rxjs';

/* NgRx */
import { Store } from '@ngrx/store';
import { selectUser } from '../../state/user/user.selectors';

/* Services */
import { DispatcherService } from '../../shared/services/dispatcher.service';
import { LibrariesService } from '../../shared/services/libraries.service';

/* Interfaces */
import { LibraryFormInterface } from './interfaces/library-form.interface';
import { UserInterface } from '../../shared/interfaces/user.interface';

/* Enums */
import { LibraryFormEnum } from './enums/library-form.enum';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit, OnDestroy {

  protected readonly destroy$: Subject<boolean> = new Subject<boolean>();

  protected readonly user$: Observable<UserInterface | null> = this.store.select(selectUser);

  protected readonly LibraryFormEnum: typeof LibraryFormEnum = LibraryFormEnum;

  public user!: UserInterface | null;

  private _form!: UntypedFormGroup;

  constructor(
    private readonly dispatcherService: DispatcherService,
    private readonly librariesService: LibrariesService,
    private readonly router: Router,
    private readonly store: Store
  ) { }


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

  public async onClickCreateLibrary(): Promise<void> {

    if (this.user === null) {
      return;
    }

    const uid: string = this.user.uid;
    const library: { name: string } = this.form.value;

    this.librariesService.createLibrary(library.name, uid)
      .then((): Promise<boolean> => this.router.navigate(['/home']))
      .catch((error: Error) => this.dispatcherService.createLibraryError(error));
  }


  /* ----- Store related Methods -------------------------------------------------------------------------------------------------------- */

  private initStoreSubscriptions(): void {

    this.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: UserInterface | null) => this.user = user);
  }


  /* ----- Other private methods -------------------------------------------------------------------------------------------------------- */

  private initForm(): void {
    this.form = new FormGroup<LibraryFormInterface>({
      name: new FormControl({ value: null, disabled: false }, [Validators.required])
    });
  }

}
