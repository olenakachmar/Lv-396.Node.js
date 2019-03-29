import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarProfileComponent } from './navbar-profile.component';

describe('NavbarProfileComponent', () => {
  let component: NavbarProfileComponent;
  let fixture: ComponentFixture<NavbarProfileComponent>;
  const menuRight = [
    {
      id: 1,
      href: '#1',
      title: 'Log Out',
      isCurrent: false,
    },
    {
      id: 2,
      href: '#2',
      title: 'Edit Profile',
      isCurrent: false,
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarProfileComponent);
    component = fixture.componentInstance;
    component.menuRight = menuRight;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
