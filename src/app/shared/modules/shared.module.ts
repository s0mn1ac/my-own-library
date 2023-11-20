/* Angular */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* PrimeNG */
import { PrimeNGModule } from './primeng.module';

/* Transloco */
import { TranslocoModule } from '@ngneat/transloco';

/* Components */
import { LoaderComponent } from '../components/loader/loader.component';
import { NavigationBarComponent } from '../components/navigation-bar/navigation-bar.component';
import { LibraryComponent } from '../components/library/library.component';
import { LibrarySkeletonComponent } from '../components/library/skeletons/library-skeleton/library-skeleton.component';
import { GameComponent } from '../components/game/game.component';
import { LibraryDialogComponent } from '../dialogs/library-dialog/library-dialog.component';
import { ConfirmationDialogComponent } from '../dialogs/confirmation-dialog/confirmation-dialog.component';
import { ConfigurationDialogComponent } from '../dialogs/configuration-dialog/configuration-dialog.component';

@NgModule({
  declarations: [
    LoaderComponent,
    NavigationBarComponent,
    LibraryComponent,
    LibrarySkeletonComponent,
    GameComponent,
    LibraryDialogComponent,
    ConfirmationDialogComponent,
    ConfigurationDialogComponent,
  ],
  imports: [
    CommonModule,
    TranslocoModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNGModule
  ],
  exports: [
    CommonModule,
    TranslocoModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNGModule,
    LoaderComponent,
    NavigationBarComponent,
    LibraryComponent,
    LibrarySkeletonComponent,
    GameComponent,
    LibraryDialogComponent,
    ConfirmationDialogComponent,
    ConfigurationDialogComponent
  ]
})
export class SharedModule { }
