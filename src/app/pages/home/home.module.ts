/* Angular */
import { NgModule } from '@angular/core';

/* Application modules */
import { HomeComponentRoutingModule } from './home-routing.module';
import { SharedModule } from '../../shared/modules/shared.module';

/* Components */
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    HomeComponentRoutingModule,
    SharedModule
  ]
})
export class HomeComponentModule { }
