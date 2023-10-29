/* NgRx */
import { createAction, props } from '@ngrx/store';

/* Interfaces */
import { UserInterface } from '../../shared/interfaces/user.interface';

export enum BasketStateEnum {
  InitUserState = '[User] Init User State',
  UpdateUser = '[User] Update User',
  GetUserLoad = '[User] [Load] Get User',
  GetUserSuccess = '[User] [Success] Get User',
  GetUserError = '[User] [Error] Get User'
}


/* ----- Init User State ---------------------------------------------------------------------------------------------------------------- */

export const initUserState = createAction(
  BasketStateEnum.InitUserState
);


/* ----- Update User -------------------------------------------------------------------------------------------------------------------- */

export const updateUser = createAction(
  BasketStateEnum.UpdateUser,
  props<{ user: UserInterface | null }>()
);


/* ----- Get User ----------------------------------------------------------------------------------------------------------------------- */

export const getUserLoad = createAction(
  BasketStateEnum.GetUserLoad
);

export const getUserSuccess = createAction(
  BasketStateEnum.GetUserSuccess,
  props<{ user: UserInterface }>()
);

export const getUserError = createAction(
  BasketStateEnum.GetUserError,
  props<{ error: Error }>()
);
