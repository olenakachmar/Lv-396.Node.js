import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageComponent } from './page.component';
import { ListComponent } from './list/list.component';
import { AccordionComponent } from './list/accordion/accordion.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarProfileComponent } from './navbar/navbar-profile/navbar-profile.component';
import { UserBarInfoComponent } from './user-bar-info/user-bar-info.component';
import { UserImageComponent } from './user-bar-info/user-image/user-image.component';
import { LinkToProfileComponent } from './user-bar-info/link-to-profile/link-to-profile.component';
import { FilterComponent } from './filter/filter.component';
import { DropdownFilterComponent } from './filter/dropdown-filter/dropdown-filter.component';
import { FilterTasksByPipe } from './filter-tasks-by.pipe';

describe('PageComponent', () => {
  let component: PageComponent;
  let fixture: ComponentFixture<PageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AccordionComponent,
        ListComponent,
        NavbarComponent,
        NavbarProfileComponent,
        UserBarInfoComponent,
        UserImageComponent,
        LinkToProfileComponent,
        FilterComponent,
        DropdownFilterComponent,
        FilterTasksByPipe,
        PageComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
