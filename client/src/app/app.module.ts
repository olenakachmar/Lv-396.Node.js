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
import { ListComponent } from './page/list/list.component';
import { AccordionComponent } from './page/list/accordion/accordion.component';
import { ItemComponent } from './page/list/accordion/item/item.component';
import { FilterTasksByPipe } from './page/filter-tasks-by.pipe';
import { DropdownFilterComponent } from './page/filter/dropdown-filter/dropdown-filter.component';
import { FilterComponent } from './page/filter/filter.component';
import { NavbarComponent } from './page/navbar/navbar.component';
import { NavbarProfileComponent } from './page/navbar/navbar-profile/navbar-profile.component';
import { ModalComponent } from './page/modal/modal.component';
import { UserImageComponent } from './page/user-bar-info/user-image/user-image.component';
import { LinkToProfileComponent } from './page/user-bar-info/link-to-profile/link-to-profile.component';
import { UserBarInfoComponent } from './page/user-bar-info/user-bar-info.component';
import { AddTaskButtonComponent } from './page/add-task-button/add-task-button.component';
import { BsDatepickerModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    HomeComponent,
    PageNotFoundComponent,
    ListComponent,
    AccordionComponent,
    ItemComponent,
    FilterTasksByPipe,
    DropdownFilterComponent,
    FilterComponent,
    NavbarComponent,
    NavbarProfileComponent,
    ModalComponent,
    UserImageComponent,
    LinkToProfileComponent,
    UserBarInfoComponent,
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
    BsDatepickerModule.forRoot(),
  ],
  providers: [AUTH_PROVIDERS, LoggedInGuard, LoggedOutGuard, CheckDevGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
