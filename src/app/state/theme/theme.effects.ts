/* Angular */
import { Injectable } from '@angular/core';

/* RxJs */
import { catchError, map, mergeMap, of } from 'rxjs';

/* NgRx */
import { Actions, createEffect, CreateEffectMetadata, ofType } from '@ngrx/effects';
import { changeThemeError, changeThemeLoad, changeThemeSuccess } from './theme.actions';

/* Services */
import { ThemeService } from '../../shared/services/theme.service';

@Injectable()
export class ThemeEffects {


  /* ----- Change Theme ----------------------------------------------------------------------------------------------------------------- */

  changeTheme$: CreateEffectMetadata = createEffect(() => {
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

}
