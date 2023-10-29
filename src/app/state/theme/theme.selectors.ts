/* NgRx */
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ThemeStateInterface, themeFeatureName } from './theme.reducers';

export const selectThemeState = createFeatureSelector<ThemeStateInterface>(themeFeatureName);

export const selectTheme = createSelector(
  selectThemeState,
  (state: ThemeStateInterface) => state.theme
);
