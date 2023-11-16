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
import { QuerySnapshot, QueryDocumentSnapshot } from '@firebase/firestore';

@Injectable()
export class LibrariesEffects {


  /* ----- Get Libraries ---------------------------------------------------------------------------------------------------------------- */

  getLibrariesLoad$: CreateEffectMetadata = createEffect(() => {
    return this.actions$.pipe(
      ofType(getLibrariesLoad),
      mergeMap(({ uid }) => this.librariesService.getLibrariesOnce(uid)
        .pipe(
          map((querySnapshot: QuerySnapshot<LibraryInterface>) => getLibrariesSuccess({ libraries: this.mapLibraries(querySnapshot) })),
          catchError((error: Error) => of(getLibrariesError({ error })))
        )
      )
    );
  });


  constructor(
    private readonly actions$: Actions,
    private readonly librariesService: LibrariesService
  ) { }


  /* ----- Mappers ---------------------------------------------------------------------------------------------------------------------- */

  private mapLibraries(querySnapshot: QuerySnapshot<LibraryInterface>): LibraryInterface[] {
    const libraries: LibraryInterface[] = [];
    querySnapshot.forEach((doc: QueryDocumentSnapshot<LibraryInterface>) => libraries.push({ ...doc.data(), id: doc.id }));
    return libraries;
  }

}
