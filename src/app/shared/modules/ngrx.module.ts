/* Angular */
import { NgModule } from '@angular/core';

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { LanguageModule } from '../../state/language/language.module';
import { LibrariesModule } from '../../state/libraries/libraries.module';
import { ThemeModule } from '../../state/theme/theme.module';
import { UserModule } from '../../state/user/user.module';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot({}),
    EffectsModule.forRoot(),
    StoreDevtoolsModule.instrument({
      name: 'Library',
      maxAge: 25
    }),
    LanguageModule,
    LibrariesModule,
    ThemeModule,
    UserModule
  ]
})
export class NgRxModule { }
