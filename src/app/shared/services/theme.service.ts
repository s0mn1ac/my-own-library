/* Angular */
import { Injectable } from '@angular/core';

/* RxJs */
import { Observable, of } from 'rxjs';

/* Enums */
import { ThemeEnum } from '../enums/theme.enum';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {


  /* ----- Change Theme ----------------------------------------------------------------------------------------------------------------- */

  public changeTheme(theme: ThemeEnum): Observable<ThemeEnum> {
    console.log(theme === ThemeEnum.Dark ? '💡 Lights OFF!' : '💡 Lights ON!');
    document.body.classList.add(theme === ThemeEnum.Light ? ThemeEnum.Light : ThemeEnum.Dark);
    document.body.classList.remove(theme === ThemeEnum.Light ? ThemeEnum.Dark : ThemeEnum.Light);
    return of(theme);
  }

}
