/* Interfaces */
import { LanguageEnum } from '../enums/language.enum';
import { ThemeEnum } from '../enums/theme.enum';

export interface FirestoreConfigurationInterface {
  owner: string;
  language: LanguageEnum;
  theme: ThemeEnum;
}
