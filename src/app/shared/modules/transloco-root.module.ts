/* Angular */
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, isDevMode, NgModule } from '@angular/core';

/* Transloco */
import { Translation, TranslocoLoader, TranslocoModule, provideTransloco } from '@ngneat/transloco';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {

  private httpClient: HttpClient = inject(HttpClient);

  getTranslation(lang: string) {
    return this.httpClient.get<Translation>(`/assets/i18n/${lang}.json`);
  }
}

@NgModule({
  exports: [TranslocoModule],
  providers: [
    provideTransloco({
      config: {
        availableLangs: ['en', 'es'],
        defaultLang: 'en',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader
    })
  ]
})
export class TranslocoRootModule { }
