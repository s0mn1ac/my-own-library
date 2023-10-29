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
