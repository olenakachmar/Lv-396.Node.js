import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { AUTH_PROVIDERS } from './app_services/auth.service';

import { LoggedInGuard } from './app_guards/logged-in.guard';
import { LoggedOutGuard } from './app_guards/logged-out.guard';
import { CheckDevGuard } from './app_guards/checkDev.guard';

import { PageComponent } from './page/page.component';
import { NavbarComponent } from './page/navbar/navbar.component';
import { NavbarProfileComponent } from './page/navbar/navbar-profile/navbar-profile.component';
import { AddTaskButtonComponent } from './page/add-task-button/add-task-button.component';

@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    HomeComponent,
    PageNotFoundComponent,
    NavbarComponent,
    NavbarProfileComponent,
    AddTaskButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    AccordionModule.forRoot(),
    ModalModule.forRoot(),
  ],
  providers: [AUTH_PROVIDERS, LoggedInGuard, LoggedOutGuard, CheckDevGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
