/* Angular */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/* PrimeNG */
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { SelectButtonOptionClickEvent } from 'primeng/selectbutton';

/* RxJs */
import { Observable, Subject, takeUntil } from 'rxjs';

/* NgRx */
import { Store } from '@ngrx/store';
import { selectLanguage } from '../../../state/language/language.selectors';
import { selectTheme } from '../../../state/theme/theme.selectors';
import { selectUser } from '../../../state/user/user.selectors';

/* Services */
import { AuthService } from '../../services/auth.service';
import { ConfigurationsService } from '../../services/configurations.service';
import { DispatcherService } from '../../services/dispatcher.service';

/* Interfaces */
import { ConfigurationDialogOutputDataInterface } from './interfaces/configuration-dialog-output-data.interface';
import { UserInterface } from '../../interfaces/user.interface';

/* Enums */
import { ConfigurationDialogActionEnum } from './enums/configuration-dialog-action.enum';
import { ThemeEnum } from '../../enums/theme.enum';
import { LanguageEnum } from '../../enums/language.enum';

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
    private readonly authService: AuthService,
    private readonly configurationsService: ConfigurationsService,
    private readonly dispatcherService: DispatcherService,
    private readonly dynamicDyalogRef: DynamicDialogRef,
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
    this.dynamicDyalogRef.close({ actionPerformed: ConfigurationDialogActionEnum.Close } as ConfigurationDialogOutputDataInterface);
  }

  public onClickSignOut(): void {

    if (this.isLoading) {
      return;
    }

    this.isLoading = true;

    this.authService.signOut()
      .then((): void => {
        this.dispatcherService.getLibrariesSuccess([]);
        this.dynamicDyalogRef.close(ConfigurationDialogActionEnum.Close);
        this.router.navigate(['/sign-in']).then();
      })
      .catch((error: Error) => console.error(error))
      .finally((): boolean => this.isLoading = false);
  }


  /* ----- On change methods ------------------------------------------------------------------------------------------------------------ */

  public onChangeLanguage(selectButtonOptionClickEvent: SelectButtonOptionClickEvent): void {

    this.dispatcherService.changeLanguageLoad(selectButtonOptionClickEvent.option as LanguageEnum);

    if (this.user === null) {
      return;
    }

    this.configurationsService.updateLanguage(this.user.uid, selectButtonOptionClickEvent.option as LanguageEnum).then();
  }

  public onChangeTheme(selectButtonOptionClickEvent: SelectButtonOptionClickEvent): void {

    this.dispatcherService.changeThemeLoad(selectButtonOptionClickEvent.option as ThemeEnum);

    if (this.user === null) {
      return;
    }

    this.configurationsService.updateTheme(this.user.uid, selectButtonOptionClickEvent.option as ThemeEnum).then();
  }

}
