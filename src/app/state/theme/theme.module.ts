/* Angular */
import { NgModule } from '@angular/core';

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { themeFeatureName, themeReducer } from './theme.reducers';
import { EffectsModule } from '@ngrx/effects';
import { ThemeEffects } from './theme.effects';

@NgModule({
  imports: [
    StoreModule.forFeature(themeFeatureName, themeReducer),
    EffectsModule.forFeature(ThemeEffects)
  ]
})
export class ThemeModule { }
