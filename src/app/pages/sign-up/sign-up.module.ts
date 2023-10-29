/* Angular */
import { NgModule } from '@angular/core';

/* Application modules */
import { SignUpComponentRoutingModule } from './sign-up-routing.module';
import { SharedModule } from '../../shared/modules/shared.module';

/* Components */
import { SignUpComponent } from './sign-up.component';

@NgModule({
  imports: [
    SignUpComponentRoutingModule,
    SharedModule
  ],
  declarations: [
    SignUpComponent
  ]
})
export class SignUpComponentModule { }
