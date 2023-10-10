/* Angular */
import { Injectable } from '@angular/core';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { Title } from '@angular/platform-browser';

/* Transloco */
import { TranslateParams, TranslocoService } from '@ngneat/transloco';

@Injectable({
  providedIn: 'root'
})
export class CustomTitleStrategyService extends TitleStrategy {

  constructor(
    private readonly title: Title,
    private readonly translocoService: TranslocoService
  ) {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot): void {
    const title: string | undefined = this.buildTitle(routerState);
    if (title === undefined) {
      this.title.setTitle('Library');
    }
    this.translocoService.selectTranslate(title as TranslateParams)
      .subscribe((translation: string) => this.title.setTitle(`Library | ${translation}`));
  }
}
