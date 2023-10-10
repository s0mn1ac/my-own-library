/* NgRx */
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { LanguageStateInterface, languageFeatureName } from './language.reducers';

/* Enums */
import { LanguageEnum } from '../../shared/enums/language.enum';

export const selectLanguageState = createFeatureSelector<LanguageStateInterface>(languageFeatureName);

export const selectLanguage: MemoizedSelector<any, any> = createSelector(
  selectLanguageState,
  (state: LanguageStateInterface): LanguageEnum => state.language
);
