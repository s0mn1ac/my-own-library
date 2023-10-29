/* Angular */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/* RxJs */
import { Observable, Subject, takeUntil } from 'rxjs';

/* NgRx */
import { Store } from '@ngrx/store';
import { selectTheme } from '../../state/theme/theme.selectors';
import { selectLanguage } from '../../state/language/language.selectors';

/* Services */
import { AuthService } from '../../shared/services/auth.service';
import { DispatcherService } from '../../shared/services/dispatcher.service';

/* Enums */
import { ThemeEnum } from '../../shared/enums/theme.enum';
import { LanguageEnum } from '../../shared/enums/language.enum';
import { LoaderTypeEnum } from '../../shared/enums/loader-type.enum';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit, OnDestroy {

  protected readonly destroy$: Subject<boolean> = new Subject<boolean>();

  protected readonly theme$: Observable<ThemeEnum> = this.store.select(selectTheme);
  protected readonly language$: Observable<LanguageEnum> = this.store.select(selectLanguage);

  public languages: LanguageEnum[] = [LanguageEnum.Es, LanguageEnum.En];
  public languageSelected!: LanguageEnum;

  public themes: ThemeEnum[] = [ThemeEnum.Light, ThemeEnum.Dark];
  public themeSelected!: ThemeEnum;

  private _isSigningOut: boolean = false;

  constructor(
    private readonly authService: AuthService,
    private readonly dispatcherService: DispatcherService,
    private readonly router: Router,
    private readonly store: Store
  ) { }


  /* ----- Getters & Setters ------------------------------------------------------------------------------------------------------------ */

  get isSigningOut(): boolean {
    return this._isSigningOut;
  }

  set isSigningOut(isSigningOut: boolean) {
    this._isSigningOut = isSigningOut;
  }


  /* ----- Life cycle methods ----------------------------------------------------------------------------------------------------------- */

  ngOnInit(): void {
    this.initStoreSubscriptions();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


  /* ----- On click methods ------------------------------------------------------------------------------------------------------------- */

  public onClickGoToHomePage(): void {
    this.router.navigate(['/home']).then();
  }

  public onClickChangeLanguage(language: LanguageEnum): void {
    this.dispatcherService.changeLanguage(language);
  }

  public onClickChangeTheme(theme: ThemeEnum): void {
    this.dispatcherService.changeTheme(theme);
  }

  public onClickSignOut(): void {
    if (this.isSigningOut) {
      return;
    }
    this.isSigningOut = true;
    this.authService.signOut()
      .then(() => this.router.navigate(['/sign-in']))
      .catch((error: Error) => console.error(error))
      .finally((): boolean => this.isSigningOut = false);
  }


  /* ----- Store related Methods -------------------------------------------------------------------------------------------------------- */

  private initStoreSubscriptions(): void {

    this.language$
      .pipe(takeUntil(this.destroy$))
      .subscribe((language: LanguageEnum) => this.onChangeLanguage(language));

    this.theme$
      .pipe(takeUntil(this.destroy$))
      .subscribe((theme: ThemeEnum) => this.onChangeTheme(theme));
  }

  private onChangeLanguage(language: LanguageEnum): void {
    this.languageSelected = language;
  }

  private onChangeTheme(theme: ThemeEnum): void {
    this.themeSelected = theme;
  }

  protected readonly LoaderTypeEnum = LoaderTypeEnum;
}
