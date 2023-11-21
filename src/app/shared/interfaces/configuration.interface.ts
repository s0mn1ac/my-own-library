/* Interfaces */
import { LanguageEnum } from '../enums/language.enum';
import { ThemeEnum } from '../enums/theme.enum';

export interface ConfigurationInterface {
  id: string;
  language: LanguageEnum;
  theme: ThemeEnum;
}
