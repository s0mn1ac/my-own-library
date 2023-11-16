/* Angular */
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/* Material */
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

/* Services */
import { AuthService } from '../../services/auth.service';

/* Interfaces */
import { ConfigurationDialogInputDataInterface } from './interfaces/configuration-dialog-input-data.interface';
import { ConfigurationDialogOutputDataInterface } from './interfaces/configuration-dialog-output-data.interface';

/* Enums */
import { ConfigurationDialogActionEnum } from './enums/configuration-dialog-action.enum';
import { Observable, Subject, takeUntil } from 'rxjs';
import { UserInterface } from '../../interfaces/user.interface';
import { selectUser } from '../../../state/user/user.selectors';
import { Store } from '@ngrx/store';
import { ThemeEnum } from '../../enums/theme.enum';
import { selectTheme } from '../../../state/theme/theme.selectors';
import { LanguageEnum } from '../../enums/language.enum';
import { selectLanguage } from '../../../state/language/language.selectors';
import { DispatcherService } from '../../services/dispatcher.service';

@Component({
  selector: 'app-library-dialog',
  templateUrl: './configuration-dialog.component.html',
  styleUrls: ['./configuration-dialog.component.scss']
})
export class ConfigurationDialogComponent implements OnInit, OnDestroy {

  protected readonly destroy$: Subject<boolean> = new Subject<boolean>();

  protected readonly user$: Observable<UserInterface | null> = this.store.select(selectUser);
  protected readonly language$: Observable<LanguageEnum> = this.store.select(selectLanguage);
  protected readonly theme$: Observable<ThemeEnum> = this.store.select(selectTheme);

  public user!: UserInterface | null;
  public languageSelected!: LanguageEnum;
  public themeSelected!: ThemeEnum;

  public languages: LanguageEnum[] = [LanguageEnum.Es, LanguageEnum.En];
  public themes: ThemeEnum[] = [ThemeEnum.Light, ThemeEnum.Dark];

  private _isLoading: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogInputData: ConfigurationDialogInputDataInterface,
    private readonly authService: AuthService,
    private readonly dispatcherService: DispatcherService,
    private readonly matDialogRef: MatDialogRef<ConfigurationDialogComponent>,
    private readonly router: Router,
    private readonly store: Store
  ) { }


  /* ----- Getters & Setters ------------------------------------------------------------------------------------------------------------ */

  get isLoading(): boolean {
    return this._isLoading;
  }

  set isLoading(isLoading: boolean) {
    this._isLoading = isLoading;
  }


  /* ----- Life cycle methods ----------------------------------------------------------------------------------------------------------- */

  ngOnInit(): void {
    this.initStoreSubscriptions();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


  /* ----- Store related Methods -------------------------------------------------------------------------------------------------------- */

  private initStoreSubscriptions(): void {

    this.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: UserInterface | null): UserInterface | null => this.user = user);

    this.language$
      .pipe(takeUntil(this.destroy$))
      .subscribe((language: LanguageEnum): LanguageEnum => this.languageSelected = language);

    this.theme$
      .pipe(takeUntil(this.destroy$))
      .subscribe((theme: ThemeEnum): ThemeEnum => this.themeSelected = theme);
  }


  /* ----- On click methods ------------------------------------------------------------------------------------------------------------- */

  public onClickClose(): void {
    this.matDialogRef.close({ actionPerformed: ConfigurationDialogActionEnum.Close } as ConfigurationDialogOutputDataInterface);
  }

  public onClickSignOut(): void {

    if (this.isLoading) {
      return;
    }

    this.isLoading = true;

    this.authService.signOut()
      .then((): void => {
        this.router.navigate(['/sign-in']).then();
        this.matDialogRef.close(ConfigurationDialogActionEnum.Close);
      })
      .catch((error: Error) => console.error(error))
      .finally((): boolean => this.isLoading = false);
  }

  public onClickChangeLanguage(language: LanguageEnum): void {
    this.dispatcherService.changeLanguage(language);
  }

  public onClickChangeTheme(theme: ThemeEnum): void {
    this.dispatcherService.changeTheme(theme);
  }

}
