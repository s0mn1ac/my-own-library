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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

/* Transloco */
import { TranslocoModule } from '@ngneat/transloco';

/* Components */
import { LoaderComponent } from '../components/loader/loader.component';
import { NavigationBarComponent } from '../components/navigation-bar/navigation-bar.component';
import { LibraryComponent } from '../components/library/library.component';
import { GameComponent } from '../components/game/game.component';
import { LibraryDialogComponent } from '../dialogs/library-dialog/library-dialog.component';
import { ConfirmationDialogComponent } from '../dialogs/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    LoaderComponent,
    NavigationBarComponent,
    LibraryComponent,
    GameComponent,
    LibraryDialogComponent,
    ConfirmationDialogComponent
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
    MatInputModule,
    MatProgressSpinnerModule
  ],
  exports: [
    CommonModule,
    TranslocoModule,
    FormsModule,
    ReactiveFormsModule,
    LoaderComponent,
    NavigationBarComponent,
    LibraryComponent,
    GameComponent,
    LibraryDialogComponent,
    ConfirmationDialogComponent,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule
  ]
})
export class SharedModule { }
