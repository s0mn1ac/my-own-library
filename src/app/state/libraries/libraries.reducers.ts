/* NgRx */
import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { createLibraryError, createLibrarySuccess, getLibrariesError, getLibrariesLoad, getLibrariesSuccess, deleteLibraryLoad, deleteLibrarySuccess, deleteLibraryError, updateLibraries, updateLibraryLoad, updateLibrarySuccess, updateLibraryError, addGameToLibraryLoad, addGameToLibrarySuccess, addGameToLibraryError } from './libraries.actions';

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
  isLoading: false
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
    libraries: orderBy(libraries, 'created', 'desc'),
    isLoading: false
  })),
  on(getLibrariesError, (state, { error }): LibrariesStateInterface => ({
    ...state,
    isLoading: false
  })),
  on(createLibrarySuccess, (state, { library }): LibrariesStateInterface => ({
    ...state,
    libraries: [library, ...state.libraries]
  })),
  on(createLibraryError, (state, { error }): LibrariesStateInterface => ({
    ...state
  })),
  on(updateLibraryLoad, (state, { id }): LibrariesStateInterface => ({
    ...state,
    libraries: state.libraries
      .map((libraryToMap: LibraryInterface): LibraryInterface => libraryToMap.id === id
        ? ({ ...libraryToMap, isLoading: true })
        : libraryToMap)
  })),
  on(updateLibrarySuccess, (state, { library }): LibrariesStateInterface => ({
    ...state,
    libraries: state.libraries
      .map((libraryToMap: LibraryInterface): LibraryInterface => libraryToMap.id === library.id
        ? ({ ...libraryToMap, name: library.name, isLoading: false })
        : libraryToMap)
  })),
  on(updateLibraryError, (state, { id, error }): LibrariesStateInterface => ({
    ...state,
    libraries: state.libraries
      .map((libraryToMap: LibraryInterface): LibraryInterface => libraryToMap.id === id
        ? ({ ...libraryToMap, isLoading: true })
        : libraryToMap)
  })),
  on(deleteLibraryLoad, (state, { id }): LibrariesStateInterface => ({
    ...state,
    libraries: state.libraries
      .map((libraryToMap: LibraryInterface): LibraryInterface => libraryToMap.id === id
        ? ({ ...libraryToMap, isLoading: true })
        : libraryToMap)
  })),
  on(deleteLibrarySuccess, (state, { id }): LibrariesStateInterface => ({
    ...state,
    libraries: state.libraries
      .filter((libraryToMap: LibraryInterface): boolean => libraryToMap.id !== id)
  })),
  on(deleteLibraryError, (state, { id, error }): LibrariesStateInterface => ({
    ...state,
    libraries: state.libraries
      .map((libraryToMap: LibraryInterface): LibraryInterface => libraryToMap.id === id
        ? ({ ...libraryToMap, isLoading: false })
        : libraryToMap)
  })),
  on(addGameToLibraryLoad, (state, { libraryId, game }): LibrariesStateInterface => ({
    ...state,
    libraries: state.libraries
      .map((libraryToMap: LibraryInterface): LibraryInterface => libraryToMap.id === libraryId
        ? ({ ...libraryToMap, isLoading: true })
        : libraryToMap)
  })),
  on(addGameToLibrarySuccess, (state, { libraryId, game }): LibrariesStateInterface => ({
    ...state,
    libraries: state.libraries
      .map((libraryToMap: LibraryInterface): LibraryInterface => libraryToMap.id === libraryId
        ? ({ ...libraryToMap, games: [...libraryToMap.games, game], isLoading: false })
        : libraryToMap)
  })),
  on(addGameToLibraryError, (state, { libraryId, error }): LibrariesStateInterface => ({
    ...state,
    libraries: state.libraries
      .map((libraryToMap: LibraryInterface): LibraryInterface => libraryToMap.id === libraryId
        ? ({ ...libraryToMap, isLoading: false })
        : libraryToMap)
  }))
);
