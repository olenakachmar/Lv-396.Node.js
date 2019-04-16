import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { NavbarProfileComponent } from './navbar-profile/navbar-profile.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  const menuBurger = [
    {
      id: 1,
      href: '#1',
      title: 'upcoming tasks',
      isCurrent: true,
    },
    {
      id: 2,
      href: '#2',
      title: 'contact info',
      isCurrent: false,
    },
    {
      id: 3,
      href: '#3',
      title: 'my profile',
      isCurrent: false,
    },
    {
      id: 4,
      href: '#4',
      title: 'create user',
      isCurrent: false,
    }
  ];
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
      declarations: [
        NavbarProfileComponent,
        NavbarComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    component.menuBurger = menuBurger;
    component.menuRight = menuRight;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
