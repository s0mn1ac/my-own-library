/* NgRx */
import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { changeThemeError, changeThemeLoad, changeThemeSuccess } from './theme.actions';

/* Enums */
import { ThemeEnum } from '../../shared/enums/theme.enum';

export interface ThemeStateInterface {
  theme: ThemeEnum;
  loading: boolean;
}

export const themeFeatureName: string = 'theme';

export const initialState: ThemeStateInterface = {
  theme: ThemeEnum.Light,
  loading: true
};

export const themeReducer: ActionReducer<ThemeStateInterface, Action> = createReducer(
  initialState,
  on(changeThemeLoad, (state): ThemeStateInterface => ({
    ...state,
    loading: true
  })),
  on(changeThemeSuccess, (state, { theme }): ThemeStateInterface => ({
    ...state,
    theme: theme,
    loading: false
  })),
  on(changeThemeError, (state, { error }): ThemeStateInterface => ({
    ...state,
    loading: false
  }))
);
