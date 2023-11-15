/* Angular */
import { Injectable } from '@angular/core';

/* RxJs */
import { catchError, map, mergeMap, of } from 'rxjs';

/* NgRx */
import { Actions, createEffect, CreateEffectMetadata, ofType } from '@ngrx/effects';
import { getLibrariesError, getLibrariesLoad, getLibrariesSuccess } from './libraries.actions';

/* Services */
import { LibrariesService } from '../../shared/services/libraries.service';

/* Interfaces */
import { LibraryInterface } from '../../shared/interfaces/library.interface';

@Injectable()
export class LibrariesEffects {


  /* ----- Get Libraries ---------------------------------------------------------------------------------------------------------------- */

  getLibrariesLoad$: CreateEffectMetadata = createEffect(() => {
    return this.actions$.pipe(
      ofType(getLibrariesLoad),
      mergeMap(({ uid }) => this.librariesService.getLibrariesObservable(uid)
        .pipe(
          map((libraries: LibraryInterface[]) => getLibrariesSuccess({libraries})),
          catchError((error: Error) => of(getLibrariesError({ error })))
        )
      )
    );
  });


  constructor(
    private readonly actions$: Actions,
    private readonly librariesService: LibrariesService
  ) { }

}
