/* NgRx */
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserStateInterface, userFeatureName } from './user.reducers';

export const selectUserState = createFeatureSelector<UserStateInterface>(userFeatureName);


/* ----- Items -------------------------------------------------------------------------------------------------------------------------- */

export const selectUser = createSelector(
  selectUserState,
  (state: UserStateInterface) => state.user
);

export const selectIsLoadingUser = createSelector(
  selectUserState,
  (state: UserStateInterface) => state.loading
);
