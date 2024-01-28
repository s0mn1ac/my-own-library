/* Angular */
import { Injectable } from '@angular/core';

/* RxJs */
import { Observable, of } from 'rxjs';

/* Services */
import { ConfigurationsService } from './configurations.service';
import { LocalStorageService } from './local-storage.service';
import { TranslocoService } from '@ngneat/transloco';

/* Enums */
import { LanguageEnum } from '../enums/language.enum';

/* Constants */
import { Language } from '../constants/local-storage.constants';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(
    private readonly configurationsService: ConfigurationsService,
    private readonly localStorageService: LocalStorageService,
    private readonly translocoService: TranslocoService
  ) { }


  /* ----- Public methods --------------------------------------------------------------------------------------------------------------- */

  public changeLanguage(language: LanguageEnum): Observable<LanguageEnum> {
    console.log(language === LanguageEnum.Es ? '🇪🇸 Language set to Spanish!' : '🇬🇧 Language set to English!');
    this.configurationsService.currentLanguage = language;
    this.localStorageService.set(Language, language);
    this.translocoService.setActiveLang(language);
    return of(language);
  }

}
