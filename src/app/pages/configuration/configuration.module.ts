/* Angular */
import { NgModule } from '@angular/core';

/* Application modules */
import { ConfigurationComponentRoutingModule } from './configuration-routing.module';
import { SharedModule } from '../../shared/modules/shared.module';

/* Components */
import { ConfigurationComponent } from './configuration.component';

@NgModule({
  imports: [
    ConfigurationComponentRoutingModule,
    SharedModule
  ],
  declarations: [
    ConfigurationComponent
  ]
})
export class ConfigurationComponentModule { }
