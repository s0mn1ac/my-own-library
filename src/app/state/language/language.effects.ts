/* Angular */
import { Injectable } from '@angular/core';

/* RxJs */
import { catchError, map, mergeMap, of } from 'rxjs';

/* NgRx */
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { changeLanguageError, changeLanguageLoad, changeLanguageSuccess } from './language.actions';

/* Services */
import { LanguageService } from '../../shared/services/language.service';

/* Enums */
import { LanguageEnum } from '../../shared/enums/language.enum';

@Injectable()
export class LanguageEffects implements OnInitEffects{


  /* ----- Change Language -------------------------------------------------------------------------------------------------------------- */

  changeLanguage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(changeLanguageLoad),
      mergeMap(({ language }) => this.languageService.changeLanguage(language)
        .pipe(
          map(() => changeLanguageSuccess({ language })),
          catchError((error) => of(changeLanguageError({ error })))
        )
      )
    );
  });


  constructor(
    private readonly actions$: Actions,
    private readonly languageService: LanguageService
  ) { }

  ngrxOnInitEffects(): Action {
    return changeLanguageLoad({ language: LanguageEnum.Es });
  }

}
