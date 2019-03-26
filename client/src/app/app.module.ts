import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AccordionModule } from 'ngx-bootstrap/accordion';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ModalModule } from 'ngx-bootstrap/modal';

import { FilterForTasksPipe } from './app.pipe.filterForTasks';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageComponent } from './page/page.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { AUTH_PROVIDERS } from './app_services/auth.service';

import { LoggedInGuard } from './app_guards/logged-in.guard';
import { LoggedOutGuard } from './app_guards/logged-out.guard';
import { CheckDevGuard } from './app_guards/checkDev.guard';


import { NavbarComponent } from './page/navbar/navbar.component';

import { FilterComponent } from './page/filter/filter.component';
import { DropdownFilterComponent } from './page/filter/dropdown-filter/dropdown-filter.component';
import { ListComponent } from './page/list/list.component';
import { AccordionComponent } from './page/list/accordion/accordion.component';
import { UserBarInfoComponent } from './page/user-bar-info/user-bar-info.component';
import { LinkToProfileComponent } from './page/user-bar-info/link-to-profile/link-to-profile.component';
import { UserImageComponent } from './page/user-bar-info/user-image/user-image.component';
import { NavbarProfileComponent } from './page/navbar/navbar-profile/navbar-profile.component';
import { AddTaskButtonComponent } from './page/add-task-button/add-task-button.component';


@NgModule({
  declarations: [
    AppComponent,
    
    PageComponent,
    HomeComponent,
    PageNotFoundComponent,
    
    PageComponent,
    FilterComponent,
    NavbarComponent,
    DropdownFilterComponent,
    ListComponent,
    AccordionComponent,
    UserBarInfoComponent,
    LinkToProfileComponent,
    UserImageComponent,
    FilterForTasksPipe,
    NavbarProfileComponent,
    AddTaskButtonComponent
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
