/* Angular */
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, isDevMode, NgModule } from '@angular/core';

/* RxJs */
import { Observable } from 'rxjs';

/* Transloco */
import { Translation, TranslocoLoader, TranslocoModule, provideTransloco } from '@ngneat/transloco';

/* Enums */
import { LanguageEnum } from '../enums/language.enum';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {

  private httpClient: HttpClient = inject(HttpClient);

  getTranslation(lang: string): Observable<Translation> {
    return this.httpClient.get<Translation>(`/assets/i18n/${lang}.json`);
  }
}

@NgModule({
  exports: [TranslocoModule],
  providers: [
    provideTransloco({
      config: {
        availableLangs: [LanguageEnum.En, LanguageEnum.Es],
        defaultLang: LanguageEnum.Es,
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader
    })
  ]
})
export class TranslocoRootModule { }
