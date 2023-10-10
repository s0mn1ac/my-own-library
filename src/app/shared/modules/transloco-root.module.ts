/* Angular */
import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode, NgModule } from '@angular/core';

/* Transloco */
import { TRANSLOCO_LOADER, Translation, TranslocoLoader, TRANSLOCO_CONFIG, translocoConfig, TranslocoModule } from '@ngneat/transloco';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {

  constructor(
    private readonly http: HttpClient
  ) { }

  getTranslation(lang: string) {
    return this.http.get<Translation>(`/assets/i18n/${lang}.json`);
  }

}

@NgModule({
  exports: [ TranslocoModule ],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: ['en', 'es'],
        defaultLang: 'es',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      })
    },
    { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader }
  ]
})
export class TranslocoRootModule {}
