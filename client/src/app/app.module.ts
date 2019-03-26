import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AccordionModule } from 'ngx-bootstrap/accordion';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageComponent } from './page/page.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { AUTH_PROVIDERS } from './app_services/auth.service';

import { LoggedInGuard } from './app_guards/logged-in.guard';
import { LoggedOutGuard } from './app_guards/logged-out.guard';
import { CheckDevGuard } from './app_guards/checkDev.guard';



@NgModule({
  declarations: [
    AppComponent,

    PageComponent,
    HomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,

    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    AccordionModule.forRoot(),
  ],
  providers: [AUTH_PROVIDERS, LoggedInGuard, LoggedOutGuard, CheckDevGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
