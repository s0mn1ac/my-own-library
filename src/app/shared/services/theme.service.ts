/* Angular */
import { Injectable } from '@angular/core';

/* RxJs */
import { Observable, of } from 'rxjs';

/* Services */
import { ConfigurationsService } from './configurations.service';
import { LocalStorageService } from './local-storage.service';

/* Enums */
import { ThemeEnum } from '../enums/theme.enum';

/* Constants */
import { Theme } from '../constants/local-storage.constants';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(
    private readonly configurationsService: ConfigurationsService,
    private readonly localStorageService: LocalStorageService
  ) { }


  /* ----- Public methods --------------------------------------------------------------------------------------------------------------- */

  public changeTheme(theme: ThemeEnum): Observable<ThemeEnum> {
    console.log(theme === ThemeEnum.Dark ? '💡 Lights OFF!' : '💡 Lights ON!');
    this.configurationsService.currentTheme = theme;
    this.localStorageService.set(Theme, theme);
    document.body.classList.add(theme === ThemeEnum.Light ? ThemeEnum.Light : ThemeEnum.Dark);
    document.body.classList.remove(theme === ThemeEnum.Light ? ThemeEnum.Dark : ThemeEnum.Light);
    return of(theme);
  }

}
