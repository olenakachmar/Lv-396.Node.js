import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBarInfoComponent } from './user-bar-info.component';
import { UserImageComponent } from './user-image/user-image.component';
import { LinkToProfileComponent } from './link-to-profile/link-to-profile.component';

describe('UserBarInfoComponent', () => {
  let component: UserBarInfoComponent;
  let fixture: ComponentFixture<UserBarInfoComponent>;
  const userinfo = {
    name: 'Name',
    surname: 'Surname',
    position: 'position',
    managerName: 'Manager Has',
    managerSurname: 'Name',
    departament: 'Departament Has Name'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LinkToProfileComponent,
        UserImageComponent,
        UserBarInfoComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBarInfoComponent);
    component = fixture.componentInstance;
    component.userinfo = userinfo;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
