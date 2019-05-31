import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactInfoComponent } from './contact-info.component';
import { UserFilterComponent } from './user-filter/user-filter.component';
import { FilterUsersByPipe } from './filter-users-by.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { UserListComponent } from './user-list/user-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('ContactInfoComponent', () => {
  let component: ContactInfoComponent;
  let fixture: ComponentFixture<ContactInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactInfoComponent, UserFilterComponent, UserListComponent, FilterUsersByPipe ],
      imports: [ FormsModule, HttpClientModule, RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });
});
