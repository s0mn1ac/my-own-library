/* NgRx */
import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { createLibraryError, createLibraryLoad, createLibrarySuccess, getLibrariesError, getLibrariesLoad, getLibrariesSuccess, deleteLibraryLoad, deleteLibrarySuccess, deleteLibraryError, updateLibraries } from './libraries.actions';

/* Lodash */
import { orderBy } from 'lodash';

/* Interfaces */
import { LibraryInterface } from '../../shared/interfaces/library.interface';

export interface LibrariesStateInterface {
  libraries: LibraryInterface[];
  isLoading: boolean;
}

export const librariesFeatureName: string = 'libraries';

export const initialState: LibrariesStateInterface = {
  libraries: [],
  isLoading: true
};

export const librariesReducer: ActionReducer<LibrariesStateInterface, Action> = createReducer(
  initialState,
  on(updateLibraries, (state, { libraries }): LibrariesStateInterface => ({
    ...state,
    libraries: orderBy(libraries, 'created', 'desc'),
    isLoading: false
  })),
  on(getLibrariesLoad, (state): LibrariesStateInterface => ({
    ...state,
    isLoading: true
  })),
  on(getLibrariesSuccess, (state, { libraries }): LibrariesStateInterface => ({
    ...state,
    libraries: libraries,
    isLoading: false
  })),
  on(getLibrariesError, (state, { error }): LibrariesStateInterface => ({
    ...state,
    isLoading: false
  })),
  on(createLibraryLoad, (state): LibrariesStateInterface => ({
    ...state,
    isLoading: true
  })),
  on(createLibrarySuccess, (state, { library }): LibrariesStateInterface => ({
    ...state,
    libraries: [...state.libraries, library],
    isLoading: false
  })),
  on(createLibraryError, (state, { error }): LibrariesStateInterface => ({
    ...state,
    isLoading: false
  })),
  on(deleteLibraryLoad, (state): LibrariesStateInterface => ({
    ...state,
    isLoading: true
  })),
  on(deleteLibrarySuccess, (state, { id }): LibrariesStateInterface => ({
    ...state,
    libraries: [...state.libraries]
      .filter((libraryToFilter: LibraryInterface) => libraryToFilter.id !== id),
    isLoading: false
  })),
  on(deleteLibraryError, (state, { error }): LibrariesStateInterface => ({
    ...state,
    isLoading: false
  }))
);
