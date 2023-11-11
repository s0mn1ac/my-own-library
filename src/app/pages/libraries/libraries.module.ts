/* Angular */
import { NgModule } from '@angular/core';

/* Application modules */
import { LibrariesComponentRoutingModule } from './libraries-routing.module';
import { SharedModule } from '../../shared/modules/shared.module';

/* Components */
import { LibrariesComponent } from './libraries.component';

@NgModule({
  imports: [
    LibrariesComponentRoutingModule,
    SharedModule
  ],
  declarations: [
    LibrariesComponent
  ]
})
export class LibrariesComponentModule { }
