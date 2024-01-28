/* NgRx */
import { createAction, props } from '@ngrx/store';

/* Enums */
import { ThemeEnum } from '../../shared/enums/theme.enum';

export enum ThemeStateEnum {
  ChangeThemeLoad = '[Theme] [Load] Change Theme',
  ChangeThemeSuccess = '[Theme] [Success] Change Theme',
  ChangeThemeError = '[Theme] [Error] Change Theme',
}


/* ----- Change Theme ------------------------------------------------------------------------------------------------------------------- */

export const changeThemeLoad = createAction(
  ThemeStateEnum.ChangeThemeLoad,
  props<{ theme: ThemeEnum }>()
);

export const changeThemeSuccess = createAction(
  ThemeStateEnum.ChangeThemeSuccess,
  props<{ theme: ThemeEnum }>()
);

export const changeThemeError = createAction(
  ThemeStateEnum.ChangeThemeError,
  props<{ error: Error }>()
);
