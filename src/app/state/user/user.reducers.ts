/* NgRx */
import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { getUserError, getUserLoad, getUserSuccess, updateUser } from './user.actions';

/* Interfaces */
import { UserInterface } from '../../shared/interfaces/user.interface';

export interface UserStateInterface {
  user: UserInterface | null;
  loading: boolean;
}

export const userFeatureName: string = 'user';

export const initialState: UserStateInterface = {
  user: null,
  loading: true
};

export const userReducer: ActionReducer<UserStateInterface, Action> = createReducer(
  initialState,
  on(updateUser, (state, { user }): UserStateInterface => ({
    ...state,
    user: user,
    loading: false
  })),
  on(getUserLoad, (state): UserStateInterface => ({
    ...state,
    loading: true
  })),
  on(getUserSuccess, (state, { user }): UserStateInterface => ({
    ...state,
    user: user,
    loading: false
  })),
  on(getUserError, (state, { error }): UserStateInterface => ({
    ...state,
    loading: false
  }))
);
