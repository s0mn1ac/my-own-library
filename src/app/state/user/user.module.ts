/* Angular */
import { NgModule } from '@angular/core';

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './user.effects';
import { userFeatureName, userReducer } from './user.reducers';

@NgModule({
  imports: [
    StoreModule.forFeature(userFeatureName, userReducer),
    EffectsModule.forFeature(UserEffects)
  ]
})
export class UserModule { }
