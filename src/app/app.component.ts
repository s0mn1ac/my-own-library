/* Angular */
import { Component, OnDestroy, OnInit } from '@angular/core';

/* RxJs */
import { Observable, Subject, takeUntil } from 'rxjs';

/* NgRx */
import { Store } from '@ngrx/store';
import { selectUser } from './state/user/user.selectors';
import { selectLanguage } from './state/language/language.selectors';
import { selectTheme } from './state/theme/theme.selectors';

/* Services */
import { AuthService } from './shared/services/auth.service';
import { ConfigurationsService } from './shared/services/configurations.service';
import { DispatcherService } from './shared/services/dispatcher.service';

/* Interfaces */
import { UserInterface } from './shared/interfaces/user.interface';
import { ConfigurationInterface } from './shared/interfaces/configuration.interface';

/* Enums */
import { LanguageEnum } from './shared/enums/language.enum';
import { ThemeEnum } from './shared/enums/theme.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  protected readonly destroy$: Subject<boolean> = new Subject<boolean>();

  protected readonly language$: Observable<LanguageEnum> = this.store.select(selectLanguage);
  protected readonly theme$: Observable<ThemeEnum> = this.store.select(selectTheme);
  protected readonly user$: Observable<UserInterface | null> = this.store.select(selectUser);

  private language!: LanguageEnum;
  private theme!: ThemeEnum;
  private user!: UserInterface | null;

  private configuration!: ConfigurationInterface | undefined;

  constructor(
    private readonly authService: AuthService,
    private readonly configurationsService: ConfigurationsService,
    private readonly dispatcherService: DispatcherService,
    private readonly store: Store
  ) { }


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

    this.language$
      .pipe(takeUntil(this.destroy$))
      .subscribe((language: LanguageEnum): LanguageEnum => this.language = language);

    this.theme$
      .pipe(takeUntil(this.destroy$))
      .subscribe((theme: ThemeEnum): ThemeEnum => this.theme = theme);

    this.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: UserInterface | null): Promise<void> => this.onChangeUser(user));
  }

  private async onChangeUser(user: UserInterface | null): Promise<void> {

    const isUserAlreadyLoggedIn: boolean = this.user?.uid === user?.uid;

    this.user = user;

    if (this.user === null || isUserAlreadyLoggedIn) {
      return;
    }

    this.configuration = undefined;

    this.getConfiguration(this.user.uid).then();
  }


  /* ----- Other private methods -------------------------------------------------------------------------------------------------------- */

  private async getConfiguration(uid: string): Promise<void> {

    this.configuration = await this.configurationsService.getConfiguration(uid);

    if (this.configuration === undefined) {
      return;
    }

    if (this.configuration.language !== this.language) {
      this.dispatcherService.changeLanguageLoad(this.configuration.language);
    }

    if (this.configuration.theme !== this.theme) {
      this.dispatcherService.changeThemeLoad(this.configuration.theme);
    }
  }

}
