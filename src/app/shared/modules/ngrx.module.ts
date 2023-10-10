/* Angular */
import { NgModule } from '@angular/core';

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { LanguageModule } from '../../state/language/language.module';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot({}),
    EffectsModule.forRoot(),
    StoreDevtoolsModule.instrument({
      name: 'Library',
      maxAge: 25
    }),
    LanguageModule
  ]
})
export class NgRxModule { }
