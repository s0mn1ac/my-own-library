/* Angular */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TitleStrategy } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';

/* Environment */
import { environment } from '../environments/environment';

/* NgRx */
import { NgRxModule } from './shared/modules/ngrx.module';

/* Transloco */
import { TranslocoRootModule } from './shared/modules/transloco-root.module';

/* Application modules */
import { AppRoutingModule } from './app-routing.module';

/* Services */
import { AuthService } from './shared/services/auth.service';
import { CustomTitleStrategyService } from './shared/services/custom-title-strategy.service';

/* Components */
import { AppComponent } from './app.component';
import { SharedModule } from './shared/modules/shared.module';

@NgModule({
  declarations: [AppComponent],
    imports: [
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        NgRxModule,
        ReactiveFormsModule,
        TranslocoRootModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
        provideAuth(() => getAuth()),
        SharedModule
    ],
  providers: [
    AuthService,
    {
      provide: TitleStrategy,
      useClass: CustomTitleStrategyService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
