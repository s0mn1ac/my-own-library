/* NgRx */
import { createAction, props } from '@ngrx/store';

/* Interfaces */
import { UserInterface } from '../../shared/interfaces/user.interface';

export enum UserStateEnum {
  InitUserState = '[User] Init User State',
  UpdateUser = '[User] Update User',
  GetUserLoad = '[User] [Load] Get User',
  GetUserSuccess = '[User] [Success] Get User',
  GetUserError = '[User] [Error] Get User'
}


/* ----- Init User State ---------------------------------------------------------------------------------------------------------------- */

export const initUserState = createAction(
  UserStateEnum.InitUserState
);


/* ----- Update User -------------------------------------------------------------------------------------------------------------------- */

export const updateUser = createAction(
  UserStateEnum.UpdateUser,
  props<{ user: UserInterface | null }>()
);


/* ----- Get User ----------------------------------------------------------------------------------------------------------------------- */

export const getUserLoad = createAction(
  UserStateEnum.GetUserLoad
);

export const getUserSuccess = createAction(
  UserStateEnum.GetUserSuccess,
  props<{ user: UserInterface }>()
);

export const getUserError = createAction(
  UserStateEnum.GetUserError,
  props<{ error: Error }>()
);
