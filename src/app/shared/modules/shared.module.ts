/* Angular */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Transloco */
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  declarations: [],
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
    ReactiveFormsModule
  ]
})
export class SharedModule { }
