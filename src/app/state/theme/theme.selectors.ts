/* NgRx */
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { ThemeStateInterface, themeFeatureName } from './theme.reducers';

/* Enums */
import { ThemeEnum } from '../../shared/enums/theme.enum';


/* ----- State -------------------------------------------------------------------------------------------------------------------------- */

export const selectThemeState: MemoizedSelector<object, ThemeStateInterface> = createFeatureSelector<ThemeStateInterface>(
  themeFeatureName
);


/* ----- Theme -------------------------------------------------------------------------------------------------------------------------- */

export const selectTheme: MemoizedSelector<object, ThemeEnum> = createSelector(
  selectThemeState,
  (state: ThemeStateInterface): ThemeEnum => state.theme
);
