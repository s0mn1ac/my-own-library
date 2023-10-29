/* Angular */
import { NgModule } from '@angular/core';

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LibrariesEffects } from './libraries.effects';
import { librariesFeatureName, librariesReducer } from './libraries.reducers';

@NgModule({
  imports: [
    StoreModule.forFeature(librariesFeatureName, librariesReducer),
    EffectsModule.forFeature(LibrariesEffects)
  ]
})
export class LibrariesModule { }
