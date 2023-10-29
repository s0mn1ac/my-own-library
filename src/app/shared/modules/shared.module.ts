/* Angular */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Transloco */
import { TranslocoModule } from '@ngneat/transloco';

/* Components */
import { LoaderComponent } from '../components/loader/loader.component';
import { NavigationBarComponent } from '../components/navigation-bar/navigation-bar.component';

@NgModule({
  declarations: [
    LoaderComponent,
    NavigationBarComponent
  ],
  imports: [
    CommonModule,
    TranslocoModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    TranslocoModule,
    FormsModule,
    ReactiveFormsModule,
    LoaderComponent,
    NavigationBarComponent
  ]
})
export class SharedModule { }
