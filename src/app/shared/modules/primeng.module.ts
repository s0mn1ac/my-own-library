/* Angular */
import { APP_INITIALIZER, NgModule } from '@angular/core';

/* PrimeNG */
import { PrimeNGConfig } from 'primeng/api';
import { AutoFocusModule } from 'primeng/autofocus';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RippleModule } from 'primeng/ripple';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SkeletonModule } from 'primeng/skeleton';

const initializeAppFactory = (primeConfig: PrimeNGConfig) => (): boolean => primeConfig.ripple = true;

@NgModule({
  imports: [
    AutoFocusModule,
    ButtonModule,
    DialogModule,
    DynamicDialogModule,
    DropdownModule,
    InputTextModule,
    ProgressSpinnerModule,
    RippleModule,
    SelectButtonModule,
    SkeletonModule
  ],
  exports: [
    AutoFocusModule,
    ButtonModule,
    DialogModule,
    DynamicDialogModule,
    DropdownModule,
    InputTextModule,
    ProgressSpinnerModule,
    RippleModule,
    SelectButtonModule,
    SkeletonModule
  ],
  providers: [
    DialogService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppFactory,
      deps: [PrimeNGConfig],
      multi: true
    }
  ]
})
export class PrimeNGModule { }
