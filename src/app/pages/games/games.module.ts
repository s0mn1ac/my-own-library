/* Angular */
import { NgModule } from '@angular/core';

/* Application modules */
import { GamesComponentRoutingModule } from './games-routing.module';
import { SharedModule } from '../../shared/modules/shared.module';

/* Components */
import { GamesComponent } from './games.component';

@NgModule({
  declarations: [
    GamesComponent
  ],
  imports: [
    GamesComponentRoutingModule,
    SharedModule
  ]
})
export class GamesComponentModule { }
