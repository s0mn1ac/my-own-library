/* Interfaces */
import { GameInterface } from './game.interface';

export interface LibraryInterface {
  id: string;
  name: string;
  owner: string;
  games: GameInterface[];
}
