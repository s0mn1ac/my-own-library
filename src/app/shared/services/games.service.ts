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
import { GameInterface } from '../interfaces/game.interface';

/* Constants */
import { GamesCollection } from '../constants/collections.constants';
import { FirestoreGameInterface } from '../interfaces/firestore-game.interface';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  private readonly gamesCollection!: CollectionReference;

  constructor(
    private readonly dispatcherService: DispatcherService,
    private readonly firestore: Firestore
  ) {
    this.gamesCollection = collection(this.firestore, GamesCollection);
  }


  /* ----- Get Games -------------------------------------------------------------------------------------------------------------------- */

  public async getGames(): Promise<GameInterface[]> {
    let games: GameInterface[] = [];
    await getDocs(query(this.gamesCollection))
      .then((querySnapshot: QuerySnapshot<unknown>) => games = this.mapGamesFromQuerySnapshot(querySnapshot))
      .catch((error: Error) => console.log(error));
    return games;
  }


  /* ----- Create Game --------------------------------------------------------------------------------------------------------------- */

  // public async createGame(game: FirestoreGameInterface): Promise<string | undefined> {
  //   let gameId: string | undefined = undefined;
  //   this.dispatcherService.createGameLoad();
  //   await addDoc(this.gamesCollection, game)
  //     .then((documentReference: DocumentReference): void => {
  //       gameId = documentReference.id;
  //       this.dispatcherService.createGameSuccess({ ...game, id: gameId, isLoading: false });
  //     })
  //     .catch((error: Error) => this.dispatcherService.createGameError(error));
  //   return gameId;
  // }


  /* ----- Update Game --------------------------------------------------------------------------------------------------------------- */

  // public async updateGame(game: GameInterface): Promise<boolean> {
  //   let isGameUpdated: boolean = false;
  //   this.dispatcherService.updateGameLoad(game.id);
  //   await updateDoc(doc(this.firestore, GamesCollection, game.id), { name: game.name })
  //     .then((): void => {
  //       isGameUpdated = true;
  //       this.dispatcherService.updateGameSuccess(game);
  //     })
  //     .catch((error: Error) => this.dispatcherService.updateGameError(game.id, error));
  //   return isGameUpdated;
  // }


  /* ----- Delete Game --------------------------------------------------------------------------------------------------------------- */

  // public async deleteGame(id: string): Promise<boolean> {
  //   let isGameDeleted: boolean = false;
  //   this.dispatcherService.deleteGameLoad(id);
  //   await deleteDoc(doc(this.firestore, GamesCollection, id))
  //     .then((): void => {
  //       isGameDeleted = true;
  //       this.dispatcherService.deleteGameSuccess(id);
  //     })
  //     .catch((error: Error) => this.dispatcherService.deleteGameError(id, error));
  //   return isGameDeleted;
  // }


  /* ----- Add Item to Game ---------------------------------------------------------------------------------------------------------- */

  // public addGamesToGame(id: string, game: GameInterface): Promise<void> {
  //   return updateDoc(doc(this.firestore, GamesCollection, id), {
  //     games: arrayUnion({
  //       description: game.description,
  //       cover: game.cover,
  //       id: game.id,
  //       name: game.name,
  //       platforms: game.platforms
  //     })
  //   });
  // }


  /* ----- Remove Item from Game ----------------------------------------------------------------------------------------------------- */

  // public removeGameFromGame(id: string, game: GameInterface): Promise<void> {
  //   return updateDoc(doc(this.firestore, GamesCollection, id), {
  //     games: arrayRemove({
  //       description: game.description,
  //       cover: game.cover,
  //       id: game.id,
  //       name: game.name,
  //       platforms: game.platforms
  //     })
  //   });
  // }


  /* ----- Other private methods -------------------------------------------------------------------------------------------------------- */

  private mapGamesFromQuerySnapshot(querySnapshot: QuerySnapshot<unknown>): GameInterface[] {
    const games: GameInterface[] = [];
    querySnapshot.forEach((doc: QueryDocumentSnapshot<unknown>) => games.push({
      ...doc.data() as GameInterface,
      id: doc.id
    }));
    return games;
  }

}
