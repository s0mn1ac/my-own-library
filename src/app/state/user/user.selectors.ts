/* NgRx */
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { UserStateInterface, userFeatureName } from './user.reducers';

/* Interfaces */
import { UserInterface } from '../../shared/interfaces/user.interface';


/* ----- State -------------------------------------------------------------------------------------------------------------------------- */

export const selectUserState: MemoizedSelector<object, UserStateInterface> = createFeatureSelector<UserStateInterface>(
  userFeatureName
);


/* ----- User --------------------------------------------------------------------------------------------------------------------------- */

export const selectUser: MemoizedSelector<object, UserInterface | null> = createSelector(
  selectUserState,
  (state: UserStateInterface): UserInterface | null => state.user
);


/* ----- Loading ------------------------------------------------------------------------------------------------------------------------ */

export const selectIsLoadingUser: MemoizedSelector<object, boolean> = createSelector(
  selectUserState,
  (state: UserStateInterface): boolean => state.loading
);
