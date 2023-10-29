/* Enums */
import { PlatformEnum } from '../enums/platform.enum';

export interface GameInterface {
  description: string;
  cover: string;
  id: string;
  name: string;
  platforms: PlatformEnum[];
}
