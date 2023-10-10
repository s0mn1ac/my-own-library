/* NgRx */
import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { changeLanguageError, changeLanguageLoad, changeLanguageSuccess } from './language.actions';

/* Enums */
import { LanguageEnum } from '../../shared/enums/language.enum';

export interface LanguageStateInterface {
  language: LanguageEnum;
  loading: boolean;
}

export const languageFeatureName: string = 'language';

export const initialState: LanguageStateInterface = {
  language: LanguageEnum.Es,
  loading: true
};

export const languageReducer: ActionReducer<LanguageStateInterface, Action> = createReducer(
  initialState,
  on(changeLanguageLoad, (state): LanguageStateInterface => ({
    ...state,
    loading: true
  })),
  on(changeLanguageSuccess, (state, { language }): LanguageStateInterface => ({
    ...state,
    language: language,
    loading: false
  })),
  on(changeLanguageError, (state, { error }): LanguageStateInterface => ({
    ...state,
    loading: false
  }))
);
