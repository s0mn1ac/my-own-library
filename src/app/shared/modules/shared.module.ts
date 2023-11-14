/* Angular */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Material */
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

/* Transloco */
import { TranslocoModule } from '@ngneat/transloco';

/* Components */
import { LoaderComponent } from '../components/loader/loader.component';
import { NavigationBarComponent } from '../components/navigation-bar/navigation-bar.component';
import { LibraryDialogComponent } from '../dialogs/library-dialog/library-dialog.component';

@NgModule({
  declarations: [
    LoaderComponent,
    NavigationBarComponent,
    LibraryDialogComponent
  ],
  imports: [
    CommonModule,
    TranslocoModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    CommonModule,
    TranslocoModule,
    FormsModule,
    ReactiveFormsModule,
    LoaderComponent,
    NavigationBarComponent,
    LibraryDialogComponent,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class SharedModule { }
