/* Angular */
import { Injectable } from '@angular/core';
import { addDoc, arrayRemove, arrayUnion, collectionData, doc, Firestore, updateDoc, where } from '@angular/fire/firestore';

/* Firebase */
import { collection, CollectionReference, DocumentReference, query, Query } from '@firebase/firestore';

/* RxJs */
import { Observable, of } from 'rxjs';

/* Interfaces */
import { LibraryInterface } from '../interfaces/library.interface';
import { GameInterface } from '../interfaces/game.interface';

/* Constants */
import { LibrariesCollection } from '../constants/collections.constants';

@Injectable({
  providedIn: 'root'
})
export class LibrariesService {

  private readonly librariesCollection!: CollectionReference;

  constructor(
    private readonly firestore: Firestore
  ) {
    this.librariesCollection = collection(this.firestore, LibrariesCollection);
  }


  /* ----- Get Libraries ---------------------------------------------------------------------------------------------------------------- */

  public getLibrariesSubscription(uid: string): Observable<LibraryInterface[]> {
    const librariesQuery: Query = query(collection(this.firestore, LibrariesCollection), where('owner', '==', uid));
    return collectionData(librariesQuery, { idField: 'id' }) as Observable<LibraryInterface[]>;
  }


  /* ----- Create Library --------------------------------------------------------------------------------------------------------------- */

  public createLibrary(name: string, uid: string): Promise<DocumentReference> {
    return addDoc(this.librariesCollection, { name: name, owner: uid, games: [] });
  }


  /* ----- Delete Library --------------------------------------------------------------------------------------------------------------- */

  public deleteLibrary(id: string): Observable<string> {
    return of(id);
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

}
