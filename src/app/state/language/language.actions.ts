/* NgRx */
import { createAction, props } from '@ngrx/store';

/* Enums */
import { LanguageEnum } from '../../shared/enums/language.enum';

export enum LanguageStateEnum {
  InitLanguageState = '[Language] Init Language State',
  ChangeLanguageLoad = '[Language] [Load] Change Language',
  ChangeLanguageSuccess = '[Language] [Success] Change Language',
  ChangeLanguageError = '[Language] [Error] Change Language'
}

/* ----- Init Language State ------------------------------------------------------------------------------------------------------------ */

export const initLanguageState = createAction(
  LanguageStateEnum.InitLanguageState
);


/* ----- Change Language ---------------------------------------------------------------------------------------------------------------- */

export const changeLanguageLoad = createAction(
  LanguageStateEnum.ChangeLanguageLoad,
  props<{ language: LanguageEnum }>()
);

export const changeLanguageSuccess = createAction(
  LanguageStateEnum.ChangeLanguageSuccess,
  props<{ language: LanguageEnum }>()
);

export const changeLanguageError = createAction(
  LanguageStateEnum.ChangeLanguageError,
  props<{ error: Error }>()
);
