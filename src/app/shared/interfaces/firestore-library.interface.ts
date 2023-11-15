/* Interfaces */
import { GameInterface } from './game.interface';

export interface FirestoreLibraryInterface {
  name: string;
  owner: string;
  games: GameInterface[];
  created: Date;
}
