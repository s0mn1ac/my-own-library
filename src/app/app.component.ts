/* Angular */
import { Component, OnDestroy, OnInit } from '@angular/core';

/* RxJs */
import { Observable, Subject, takeUntil } from 'rxjs';

/* NgRx */
import { Store } from '@ngrx/store';
import { selectUser } from './state/user/user.selectors';

/* Services */
import { AuthService } from './shared/services/auth.service';
import { ConfigurationsService } from './shared/services/configurations.service';
import { DispatcherService } from './shared/services/dispatcher.service';
import { LibrariesService } from './shared/services/libraries.service';

/* Interfaces */
import { UserInterface } from './shared/interfaces/user.interface';
import { LibraryInterface } from './shared/interfaces/library.interface';
import { ConfigurationInterface } from './shared/interfaces/configuration.interface';
import { LanguageEnum } from './shared/enums/language.enum';
import { ThemeEnum } from './shared/enums/theme.enum';
import { selectLanguage } from './state/language/language.selectors';
import { selectTheme } from './state/theme/theme.selectors';

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
  private libraries!: LibraryInterface[] | undefined;

  constructor(
    private readonly authService: AuthService,
    private readonly configurationsService: ConfigurationsService,
    private readonly dispatcherService: DispatcherService,
    private readonly librariesService: LibrariesService,
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

    this.getConfiguration(this.user.uid).then();
    this.getLibraries(this.user.uid).then();
  }


  /* ----- Other private methods -------------------------------------------------------------------------------------------------------- */

  private async getConfiguration(uid: string): Promise<void> {

    this.configuration = await this.configurationsService.getConfiguration(uid);

    if (this.configuration === undefined) {
      return;
    }

    if (this.configuration.language !== this.language) {
      this.dispatcherService.changeLanguage(this.configuration.language);
    }

    if (this.configuration.theme !== this.theme) {
      this.dispatcherService.changeTheme(this.configuration.theme);
    }
  }

  private async getLibraries(uid: string): Promise<void> {

    this.libraries = await this.librariesService.getLibraries(uid);

    if (this.libraries === undefined) {
      return;
    }

    this.dispatcherService.updateLibraries(this.libraries);
  }

}
