/* Angular */
import { NgModule } from '@angular/core';

/* Application modules */
import { LibraryComponentRoutingModule } from './library-routing.module';
import { SharedModule } from '../../shared/modules/shared.module';

/* Components */
import { LibraryComponent } from './library.component';

@NgModule({
  imports: [
    LibraryComponentRoutingModule,
    SharedModule
  ],
  declarations: [
    LibraryComponent
  ]
})
export class LibraryComponentModule { }
