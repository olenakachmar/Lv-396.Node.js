import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { WrapperComponent } from './wrapper/wrapper.component';
import { UserBarInfoComponent } from './user-bar-info/user-bar-info.component';
import { FilterComponent } from './filter/filter.component';
import { ListComponent } from './list/list.component';
import { UserImageComponent } from './user-bar-info/user-image/user-image.component';
import { LinkToProfileComponent } from './user-bar-info/link-to-profile/link-to-profile.component';
import { DropdownFilterComponent } from './filter/dropdown-filter/dropdown-filter.component';
import { AccordionComponent } from './list/accordion/accordion.component';
import { FilterTasksByPipe } from './filter-tasks-by.pipe';
import { ItemComponent } from './list/accordion/item/item.component';
import { ModalComponent } from './modal/modal.component';

import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { UserListComponent } from './contact-info/user-list/user-list.component';
import { UserFilterComponent } from './contact-info/user-filter/user-filter.component';
import { FilterUsersByPipe } from './contact-info/filter-users-by.pipe';
import { EditMyProfileComponent } from './edit-my-profile/edit-my-profile.component';
import { DatepickerFilterComponent } from './filter/datepicker-filter/datepicker-filter.component';

export const routes: Routes = [
  { path: '', redirectTo: 'profile', pathMatch: 'full' },
  { path: '', component: WrapperComponent },
  { path: 'my-profile', component: MyProfileComponent },
  { path: 'my-profile/:id', component: MyProfileComponent },
  { path: 'edit-my-profile', component: EditMyProfileComponent },
  { path: 'contact-info', component: ContactInfoComponent },
  { path: 'my-profile/:id', component: MyProfileComponent }
];

@NgModule({
  declarations: [
    WrapperComponent,
    UserBarInfoComponent,
    FilterComponent,
    ListComponent,
    UserImageComponent,
    LinkToProfileComponent,
    DropdownFilterComponent,
    AccordionComponent,
    FilterTasksByPipe,
    ItemComponent,
    ModalComponent,
    MyProfileComponent,
    ContactInfoComponent,
    UserListComponent,
    UserFilterComponent,
    FilterUsersByPipe,
    EditMyProfileComponent,
    DatepickerFilterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule,
    HttpModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    AccordionModule.forRoot(),
    ModalModule.forRoot()
  ],
  bootstrap: [WrapperComponent]
})
export class PageModule { }
