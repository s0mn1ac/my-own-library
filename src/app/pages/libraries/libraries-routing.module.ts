/* Angular */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Components */
import { LibrariesComponent } from './libraries.component';

const routes: Routes = [
  {
    path: '',
    component: LibrariesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibrariesComponentRoutingModule {}
