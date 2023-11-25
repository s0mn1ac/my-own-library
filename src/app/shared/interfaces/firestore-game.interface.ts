/* Enums */
import { PlatformEnum } from '../enums/platform.enum';

export interface FirestoreGameInterface {
  description: string;
  cover: string;
  name: string;
  platforms: PlatformEnum[];
}
