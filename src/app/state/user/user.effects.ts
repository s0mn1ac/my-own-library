/* Angular */
import { Injectable } from '@angular/core';

/* NgRx */
import { Action } from '@ngrx/store';
import { Actions, OnInitEffects } from '@ngrx/effects';
import { initUserState } from './user.actions';

@Injectable()
export class UserEffects implements OnInitEffects {


  constructor(
    private readonly actions$: Actions
  ) { }

  ngrxOnInitEffects(): Action {
    return initUserState();
  }

}
