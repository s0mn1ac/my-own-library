/* Angular */
import { Injectable } from '@angular/core';

/* RxJs */
import { catchError, map, mergeMap, of } from 'rxjs';

/* NgRx */
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { changeThemeError, changeThemeLoad, changeThemeSuccess, initThemeState } from './theme.actions';

/* Services */
import { ThemeService } from '../../shared/services/theme.service';

/* Enums */
import { ThemeEnum } from '../../shared/enums/theme.enum';

@Injectable()
export class ThemeEffects implements OnInitEffects{


  /* ----- Init Theme State ------------------------------------------------------------------------------------------------------------- */

  initThemeState$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(initThemeState),
      map(() => changeThemeLoad({ theme: ThemeEnum.Light }))
    );
  });


  /* ----- Change Theme ----------------------------------------------------------------------------------------------------------------- */

  changeTheme$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(changeThemeLoad),
      mergeMap(({ theme }) => this.themeService.changeTheme(theme)
        .pipe(
          map(() => changeThemeSuccess({ theme })),
          catchError((error) => of(changeThemeError({ error })))
        )
      )
    );
  });


  constructor(
    private readonly actions$: Actions,
    private readonly themeService: ThemeService
  ) { }

  ngrxOnInitEffects(): Action {
    return initThemeState();
  }

}
