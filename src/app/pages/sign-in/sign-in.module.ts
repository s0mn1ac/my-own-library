/* Angular */
import { NgModule } from '@angular/core';

/* Application modules */
import { SignInComponentRoutingModule } from './sign-in-routing.module';
import { SharedModule } from '../../shared/modules/shared.module';

/* Components */
import { SignInComponent } from './sign-in.component';

@NgModule({
  imports: [
    SignInComponentRoutingModule,
    SharedModule
  ],
  declarations: [
    SignInComponent
  ]
})
export class SignInComponentModule { }
