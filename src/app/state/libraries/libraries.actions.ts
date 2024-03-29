/* NgRx */
import { createAction, props } from '@ngrx/store';

/* Interfaces */
import { LibraryInterface } from '../../shared/interfaces/library.interface';
import { GameInterface } from '../../shared/interfaces/game.interface';

export enum LibrariesStateEnum {
  UpdateLibraries = '[Libraries] Update Libraries',
  GetLibrariesLoad = '[Libraries] [Load] Get Libraries',
  GetLibrariesSuccess = '[Libraries] [Success] Get Libraries',
  GetLibrariesError = '[Libraries] [Error] Get Libraries',
  CreateLibraryLoad = '[Libraries] [Load] Create Library',
  CreateLibrarySuccess = '[Libraries] [Success] Create Library',
  CreateLibraryError = '[Libraries] [Error] Create Library',
  UpdateLibraryLoad = '[Libraries] [Load] Update Library',
  UpdateLibrarySuccess = '[Libraries] [Success] Update Library',
  UpdateLibraryError = '[Libraries] [Error] Update Library',
  DeleteLibraryLoad = '[Libraries] [Load] Delete Library',
  DeleteLibrarySuccess = '[Libraries] [Success] Delete Library',
  DeleteLibraryError = '[Libraries] [Error] Delete Library',
  AddGameToLibraryLoad = '[Libraries] [Load] Add Product to Library',
  AddGameToLibrarySuccess = '[Libraries] [Success] Add Product to Library',
  AddGameToLibraryError = '[Libraries] [Error] Add Product to Library',
  RemoveGameFromLibraryLoad = '[Libraries] [Load] Remove Product from Library',
  RemoveGameFromLibrarySuccess = '[Libraries] [Success] Remove Product from Library',
  RemoveGameFromLibraryError = '[Libraries] [Error] Remove Product from Library'
}

/* ----- Update Libraries --------------------------------------------------------------------------------------------------------------- */

export const updateLibraries = createAction(
  LibrariesStateEnum.UpdateLibraries,
  props<{ libraries: LibraryInterface[] }>()
);


/* ----- Get Libraries ------------------------------------------------------------------------------------------------------------------ */

export const getLibrariesLoad = createAction(
  LibrariesStateEnum.GetLibrariesLoad,
  props<{ uid: string }>()
);

export const getLibrariesSuccess = createAction(
  LibrariesStateEnum.GetLibrariesSuccess,
  props<{ libraries: LibraryInterface[] }>()
);

export const getLibrariesError = createAction(
  LibrariesStateEnum.GetLibrariesError,
  props<{ error: Error }>()
);


/* ----- Create Library ----------------------------------------------------------------------------------------------------------------- */

export const createLibraryLoad = createAction(
  LibrariesStateEnum.CreateLibraryLoad
);

export const createLibrarySuccess = createAction(
  LibrariesStateEnum.CreateLibrarySuccess,
  props<{ library: LibraryInterface }>()
);

export const createLibraryError = createAction(
  LibrariesStateEnum.CreateLibraryError,
  props<{ error: Error }>()
);


/* ----- Update Library ----------------------------------------------------------------------------------------------------------------- */

export const updateLibraryLoad = createAction(
  LibrariesStateEnum.UpdateLibraryLoad,
  props<{ id: string }>()
);

export const updateLibrarySuccess = createAction(
  LibrariesStateEnum.UpdateLibrarySuccess,
  props<{ library: LibraryInterface }>()
);

export const updateLibraryError = createAction(
  LibrariesStateEnum.UpdateLibraryError,
  props<{ id: string, error: Error }>()
);


/* ----- Delete Library ----------------------------------------------------------------------------------------------------------------- */

export const deleteLibraryLoad = createAction(
  LibrariesStateEnum.DeleteLibraryLoad,
  props<{ id: string }>()
);

export const deleteLibrarySuccess = createAction(
  LibrariesStateEnum.DeleteLibrarySuccess,
  props<{ id: string }>()
);

export const deleteLibraryError = createAction(
  LibrariesStateEnum.DeleteLibraryError,
  props<{ id: string, error: Error }>()
);


/* ----- Add Game to Library ------------------------------------------------------------------------------------------------------------ */

export const addGameToLibraryLoad = createAction(
  LibrariesStateEnum.AddGameToLibraryLoad,
  props<{ libraryId: string, game: GameInterface }>()
);

export const addGameToLibrarySuccess = createAction(
  LibrariesStateEnum.AddGameToLibrarySuccess,
  props<{ libraryId: string, game: GameInterface }>()
);

export const addGameToLibraryError = createAction(
  LibrariesStateEnum.AddGameToLibraryError,
  props<{ libraryId: string, error: Error }>()
);


/* ----- Remove Game from Library ------------------------------------------------------------------------------------------------------- */

export const removeGameFromLibraryLoad = createAction(
  LibrariesStateEnum.RemoveGameFromLibraryLoad,
  props<{ id: string }>()
);

export const removeGameFromLibrarySuccess = createAction(
  LibrariesStateEnum.RemoveGameFromLibrarySuccess,
  props<{ id: string }>()
);

export const removeGameFromLibraryError = createAction(
  LibrariesStateEnum.RemoveGameFromLibraryError,
  props<{ error: Error }>()
);
