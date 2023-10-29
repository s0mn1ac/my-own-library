/* NgRx */
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { LibrariesStateInterface, librariesFeatureName } from './libraries.reducers';

/* Interfaces */
import { LibraryInterface } from '../../shared/interfaces/library.interface';

/* ----- State -------------------------------------------------------------------------------------------------------------------------- */

export const selectLibrariesState: MemoizedSelector<object, LibrariesStateInterface> = createFeatureSelector<LibrariesStateInterface>(
  librariesFeatureName
);


/* ----- Libraries ---------------------------------------------------------------------------------------------------------------------- */

export const selectLibraries: MemoizedSelector<object, LibraryInterface[]> = createSelector(
  selectLibrariesState,
  (state: LibrariesStateInterface): LibraryInterface[] => state.libraries
);


/* ----- Loading ------------------------------------------------------------------------------------------------------------------------ */

export const selectIsLoadingBaskets: MemoizedSelector<object, boolean> = createSelector(
  selectLibrariesState,
  (state: LibrariesStateInterface): boolean => state.isLoading
);
