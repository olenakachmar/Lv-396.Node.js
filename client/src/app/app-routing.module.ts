import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { routes as childRoutes, PageModule } from './page/page.module';

import { PageComponent } from './page/page.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { LoggedInGuard } from './app_guards/logged-in.guard';
import { LoggedOutGuard } from './app_guards/logged-out.guard';

import { CheckDevGuard } from './app_guards/check-dev.guard';
import { ForgotPasswordComponent } from './home/common/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './home/common/reset-password/reset-password.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [LoggedOutGuard, CheckDevGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [LoggedOutGuard, CheckDevGuard] },
  { path: 'reset-password', component: ResetPasswordComponent, canActivate: [LoggedOutGuard, CheckDevGuard] },
  {
    path: 'profile',
    component: PageComponent,
    canActivate: [LoggedInGuard],
    children: childRoutes
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), PageModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
