/* Angular */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['sign-in']);
const redirectFromSignInToHome = () => redirectLoggedInTo(['home']);
const redirectFromSignUpToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./pages/sign-in/sign-in.module')
      .then((module) => module.SignInComponentModule),
    title: 'titles.signIn',
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectFromSignInToHome }
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./pages/sign-up/sign-up.module')
      .then((module) => module.SignUpComponentModule),
    title: 'titles.createAccount',
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectFromSignUpToHome }
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module')
      .then((module) => module.HomeComponentModule),
    title: 'titles.home',
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'library',
    loadChildren: () => import('./pages/library/library.module')
      .then((module) => module.LibraryComponentModule),
    title: 'titles.library',
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'configuration',
    loadChildren: () => import('./pages/configuration/configuration.module')
      .then((module) => module.ConfigurationComponentModule),
    title: 'titles.configuration',
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
