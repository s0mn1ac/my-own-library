/* Angular */
import { Injectable } from '@angular/core';

/* RxJs */
import { Observable, of } from 'rxjs';

/* Services */
import { TranslocoService } from '@ngneat/transloco';

/* Enums */
import { LanguageEnum } from '../enums/language.enum';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(
    private readonly translocoService: TranslocoService
  ) { }


  /* ----- Change Language -------------------------------------------------------------------------------------------------------------- */

  public changeLanguage(language: LanguageEnum): Observable<LanguageEnum> {
    console.log(language === LanguageEnum.Es ? '🇪🇸 Language set to Spanish!' : '🇬🇧 Language set to English!');
    this.translocoService.setActiveLang(language);
    return of(language);
  }

}
