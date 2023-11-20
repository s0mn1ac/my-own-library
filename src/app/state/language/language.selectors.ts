/* NgRx */
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { LanguageStateInterface, languageFeatureName } from './language.reducers';

/* Enums */
import { LanguageEnum } from '../../shared/enums/language.enum';


/* ----- State -------------------------------------------------------------------------------------------------------------------------- */

export const selectLanguageState: MemoizedSelector<object, LanguageStateInterface> = createFeatureSelector<LanguageStateInterface>(
  languageFeatureName
);


/* ----- Language ----------------------------------------------------------------------------------------------------------------------- */

export const selectLanguage: MemoizedSelector<object, LanguageEnum> = createSelector(
  selectLanguageState,
  (state: LanguageStateInterface): LanguageEnum => state.language
);
