/* Angular */
import { Injectable } from '@angular/core';

/* NgRx */
import { Store } from '@ngrx/store';
import { changeLanguageLoad } from '../../state/language/language.actions';
import { changeThemeLoad } from '../../state/theme/theme.actions';
import { getUserError, getUserLoad, getUserSuccess, updateUser } from '../../state/user/user.actions';

/* Interfaces */
import { UserInterface } from '../interfaces/user.interface';

/* Enums */
import { LanguageEnum } from '../enums/language.enum';
import { ThemeEnum } from '../enums/theme.enum';
import { LibraryInterface } from '../interfaces/library.interface';
import {
  createLibraryError,
  createLibraryLoad,
  createLibrarySuccess,
  updateLibraries
} from '../../state/libraries/libraries.actions';

@Injectable({
  providedIn: 'root'
})
export class DispatcherService {

  constructor(
    private readonly store: Store
  ) { }


  /* ----- Language --------------------------------------------------------------------------------------------------------------------- */

  public changeLanguage(language: LanguageEnum): void {
    this.store.dispatch(changeLanguageLoad({ language }));
  }


  /* ----- Libraries -------------------------------------------------------------------------------------------------------------------- */

  public updateLibraries(libraries: LibraryInterface[]): void {
    this.store.dispatch(updateLibraries({ libraries }));
  }

  public createLibraryLoad(): void {
    this.store.dispatch(createLibraryLoad());
  }

  public createLibrarySuccess(library: LibraryInterface): void {
    this.store.dispatch(createLibrarySuccess({ library }));
  }

  public createLibraryError(error: Error): void {
    this.store.dispatch(createLibraryError({ error }));
  }


  /* ----- Theme ------------------------------------------------------------------------------------------------------------------------ */

  public changeTheme(theme: ThemeEnum): void {
    this.store.dispatch(changeThemeLoad({ theme }));
  }


  /* ----- User ------------------------------------------------------------------------------------------------------------------------- */

  public updateUser(user: UserInterface | null): void {
    this.store.dispatch(updateUser({ user }));
  }

  public getUserLoad(): void {
    this.store.dispatch(getUserLoad());
  }

  public getUserSuccess(user: UserInterface): void {
    this.store.dispatch(getUserSuccess({ user }));
  }

  public getUserError(error: Error): void {
    this.store.dispatch(getUserError({ error }));
  }

}
