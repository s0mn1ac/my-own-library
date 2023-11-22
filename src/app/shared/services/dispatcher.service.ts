/* Angular */
import { Injectable } from '@angular/core';

/* NgRx */
import { Store } from '@ngrx/store';
import { changeLanguageLoad, changeLanguageSuccess } from '../../state/language/language.actions';
import { changeThemeLoad } from '../../state/theme/theme.actions';
import { getUserError, getUserLoad, getUserSuccess, updateUser } from '../../state/user/user.actions';
import { createLibraryError, createLibraryLoad, createLibrarySuccess, deleteLibraryError, deleteLibraryLoad, deleteLibrarySuccess, getLibrariesLoad, updateLibraryError, updateLibraryLoad, updateLibrarySuccess, updateLibraries, getLibrariesSuccess } from '../../state/libraries/libraries.actions';

/* Interfaces */
import { UserInterface } from '../interfaces/user.interface';

/* Enums */
import { LanguageEnum } from '../enums/language.enum';
import { ThemeEnum } from '../enums/theme.enum';
import { LibraryInterface } from '../interfaces/library.interface';

@Injectable({
  providedIn: 'root'
})
export class DispatcherService {

  constructor(
    private readonly store: Store
  ) { }


  /* ----- Language --------------------------------------------------------------------------------------------------------------------- */

  public changeLanguageLoad(language: LanguageEnum): void {
    this.store.dispatch(changeLanguageLoad({ language }));
  }

  public changeLanguageSuccess(language: LanguageEnum): void {
    this.store.dispatch(changeLanguageSuccess({ language }));
  }


  /* ----- Libraries -------------------------------------------------------------------------------------------------------------------- */

  public updateLibraries(libraries: LibraryInterface[]): void {
    this.store.dispatch(updateLibraries({ libraries }));
  }

  public getLibrariesLoad(uid: string): void {
    this.store.dispatch(getLibrariesLoad({ uid }));
  }

  public getLibrariesSuccess(libraries: LibraryInterface[]): void {
    this.store.dispatch(getLibrariesSuccess({ libraries }));
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

  public updateLibraryLoad(id: string): void {
    this.store.dispatch(updateLibraryLoad({ id }));
  }

  public updateLibrarySuccess(library: LibraryInterface): void {
    this.store.dispatch(updateLibrarySuccess({ library }));
  }

  public updateLibraryError(id: string, error: Error): void {
    this.store.dispatch(updateLibraryError({ id, error }));
  }

  public deleteLibraryLoad(id: string): void {
    this.store.dispatch(deleteLibraryLoad({ id }));
  }

  public deleteLibrarySuccess(id: string): void {
    this.store.dispatch(deleteLibrarySuccess({ id }));
  }

  public deleteLibraryError(id: string, error: Error): void {
    this.store.dispatch(deleteLibraryError({ id, error }));
  }


  /* ----- Theme ------------------------------------------------------------------------------------------------------------------------ */

  public changeThemeLoad(theme: ThemeEnum): void {
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
