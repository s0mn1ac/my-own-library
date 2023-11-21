/* Angular */
import { Injectable } from '@angular/core';
import { addDoc, arrayRemove, arrayUnion, collectionData, deleteDoc, doc, Firestore, getDocs, updateDoc, where } from '@angular/fire/firestore';

/* Firebase */
import { collection, CollectionReference, DocumentReference, query, Query, QueryDocumentSnapshot, QuerySnapshot } from '@firebase/firestore';

/* RxJs */
import { from, Observable } from 'rxjs';

/* Services */
import { DispatcherService } from './dispatcher.service';

/* Interfaces */
import { LibraryInterface } from '../interfaces/library.interface';
import { GameInterface } from '../interfaces/game.interface';
import { FirestoreLibraryInterface } from '../interfaces/firestore-library.interface';

/* Constants */
import { LibrariesCollection } from '../constants/collections.constants';

@Injectable({
  providedIn: 'root'
})
export class LibrariesService {

  private readonly librariesCollection!: CollectionReference;

  constructor(
    private readonly dispatcherService: DispatcherService,
    private readonly firestore: Firestore
  ) {
    this.librariesCollection = collection(this.firestore, LibrariesCollection);
  }


  /* ----- Get Libraries ---------------------------------------------------------------------------------------------------------------- */

  public getLibrariesSubscription(uid: string): Observable<LibraryInterface[]> {
    const librariesQuery: Query = query(collection(this.firestore, LibrariesCollection), where('owner', '==', uid));
    return collectionData(librariesQuery, { idField: 'id' }) as Observable<LibraryInterface[]>;
  }

  public getLibrariesOnce(uid: string): Observable<QuerySnapshot<LibraryInterface>> {
    const librariesQuery: Query = query(collection(this.firestore, LibrariesCollection), where('owner', '==', uid));
    return from(getDocs(librariesQuery)) as Observable<QuerySnapshot<LibraryInterface>>;
  }

  public async getLibraries(uid: string): Promise<LibraryInterface[] | undefined> {
    let libraries: LibraryInterface[] | undefined = undefined;
    const librariesQuery: Query = query(collection(this.firestore, LibrariesCollection), where('owner', '==', uid));
    await getDocs(librariesQuery)
      .then((querySnapshot: QuerySnapshot<unknown>) => libraries = this.mapLibrariesFromQuerySnapshot(querySnapshot))
      .catch(() => console.log('TODO: ERROR'));
    return libraries;
  }


  /* ----- Create Library --------------------------------------------------------------------------------------------------------------- */

  public async createLibrary(library: FirestoreLibraryInterface): Promise<string | undefined> {
    let libraryId: string | undefined = undefined;
    this.dispatcherService.createLibraryLoad();
    await addDoc(this.librariesCollection, library)
      .then((documentReference: DocumentReference): void => {
        libraryId = documentReference.id;
        this.dispatcherService.createLibrarySuccess({ ...library, id: libraryId, isLoading: false });
      })
      .catch((error: Error) => this.dispatcherService.createLibraryError(error));
    return libraryId;
  }


  /* ----- Update Library --------------------------------------------------------------------------------------------------------------- */

  public async updateLibrary(library: LibraryInterface): Promise<boolean> {
    let isLibraryUpdated: boolean = false;
    this.dispatcherService.updateLibraryLoad(library.id);
    await updateDoc(doc(this.firestore, LibrariesCollection, library.id), { name: library.name })
      .then((): void => {
        isLibraryUpdated = true;
        this.dispatcherService.updateLibrarySuccess(library);
      })
      .catch((error: Error) => this.dispatcherService.updateLibraryError(library.id, error));
    return isLibraryUpdated;
  }


  /* ----- Delete Library --------------------------------------------------------------------------------------------------------------- */

  public async deleteLibrary(id: string): Promise<boolean> {
    let isLibraryDeleted: boolean = false;
    this.dispatcherService.deleteLibraryLoad(id);
    await deleteDoc(doc(this.firestore, LibrariesCollection, id))
      .then((): void => {
        isLibraryDeleted = true;
        this.dispatcherService.deleteLibrarySuccess(id);
      })
      .catch((error: Error) => this.dispatcherService.deleteLibraryError(id, error));
    return isLibraryDeleted;
  }


  /* ----- Add Item to Library ---------------------------------------------------------------------------------------------------------- */

  public addGamesToLibrary(id: string, game: GameInterface): Promise<void> {
    return updateDoc(doc(this.firestore, LibrariesCollection, id), {
      games: arrayUnion({
        description: game.description,
        cover: game.cover,
        id: game.id,
        name: game.name,
        platforms: game.platforms
      })
    });
  }


  /* ----- Remove Item from Library ----------------------------------------------------------------------------------------------------- */

  public removeGameFromLibrary(id: string, game: GameInterface): Promise<void> {
    return updateDoc(doc(this.firestore, LibrariesCollection, id), {
      games: arrayRemove({
        description: game.description,
        cover: game.cover,
        id: game.id,
        name: game.name,
        platforms: game.platforms
      })
    });
  }


  /* ----- Other private methods -------------------------------------------------------------------------------------------------------- */

  private mapLibrariesFromQuerySnapshot(querySnapshot: QuerySnapshot<unknown>): LibraryInterface[] {
    const libraries: LibraryInterface[] = [];
    querySnapshot.forEach((doc: QueryDocumentSnapshot<unknown>) => libraries.push({
      ...doc.data() as LibraryInterface,
      id: doc.id,
      isLoading: false
    }));
    return libraries;
  }

}
