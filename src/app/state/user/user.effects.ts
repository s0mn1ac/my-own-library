/* Angular */
import { Injectable } from '@angular/core';

/* NgRx */
import { Action } from '@ngrx/store';
import { Actions, OnInitEffects } from '@ngrx/effects';
import { initUserState } from './user.actions';

/* Services */
import { UserService } from '../../shared/services/user.service';

@Injectable()
export class UserEffects implements OnInitEffects {


  constructor(
    private readonly actions$: Actions,
    private readonly userService: UserService
  ) { }

  ngrxOnInitEffects(): Action {
    return initUserState();
  }

}
