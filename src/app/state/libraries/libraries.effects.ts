/* Angular */
import { Injectable } from '@angular/core';

/* NgRx */
import { Action } from '@ngrx/store';
import { Actions, OnInitEffects } from '@ngrx/effects';
import { initLibrariesState } from './libraries.actions';

/* Services */
import { LibrariesService } from '../../shared/services/libraries.service';

@Injectable()
export class LibrariesEffects implements OnInitEffects {


  /* ----- Init Baskets State ----------------------------------------------------------------------------------------------------------- */

  // initBasketsState$ = createEffect(() => this.actions$.pipe(
  //   ofType(initBasketState),
  //   map(() => getBasketsLoad())
  // ));


  /* ----- Get Baskets ------------------------------------------------------------------------------------------------------------------ */

  // getBasketsLoad$ = createEffect(() => this.actions$.pipe(
  //   ofType(getBasketsLoad),
  //   mergeMap(() => this.basketService.getBaskets()
  //     .pipe(
  //       map((baskets: BasketInterface[]) => getBasketsSuccess({ baskets })),
  //       catchError((error) => of(getBasketsError({ error })))
  //     )
  //   )
  // ));


  /* ----- Create Basket ---------------------------------------------------------------------------------------------------------------- */

  // createBasketLoad$ = createEffect(() => this.actions$.pipe(
  //   ofType(createBasketLoad),
  //   mergeMap(({ basket }) => this.basketService.createBasket(basket)
  //     .pipe(
  //       map(() => createBasketSuccess({ basket })),
  //       catchError((error) => of(createBasketError({ error })))
  //     )
  //   )
  // ));


  /* ----- Delete Basket ---------------------------------------------------------------------------------------------------------------- */

  // deleteBasketLoad$ = createEffect(() => this.actions$.pipe(
  //   ofType(deleteBasketLoad),
  //   mergeMap(({ id }) => this.basketService.deleteBasket(id)
  //     .pipe(
  //       map(() => deleteBasketSuccess({ id })),
  //       catchError((error) => of(deleteBasketError({ error })))
  //     )
  //   )
  // ));


  constructor(
    private readonly actions$: Actions,
    private readonly librariesService: LibrariesService
  ) { }

  ngrxOnInitEffects(): Action {
    return initLibrariesState();
  }

}
