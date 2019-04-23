import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
// import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import 'rxjs/add/observable/of';
import { RouterTestingModule } from '@angular/router/testing';
import { NavbarProfileComponent } from './navbar-profile.component';
import { NavItemsService } from '../../common/nav-items.service';
import { UserService } from '../../../common/services/user.service';

describe('NavbarProfileComponent', () => {
  let component: NavbarProfileComponent;
  let fixture: ComponentFixture<NavbarProfileComponent>;
  let navItemsService: NavItemsService;
  let userService: UserService;
  let spy: jasmine.Spy;
  const mockMenuList = [
    {
      id: 'upcoming-tasks',
      title: 'upcoming tasks',
      current: true,
      router: '/profile',
      rightMenu: false,
      burgerMenu: true,
      hr: 'hr',
      dev: 'developer'
    },
    {
      id: 'issues',
      title: 'issues',
      current: false,
      router: '',
      rightMenu: false,
      burgerMenu: true,
      hr: '',
      dev: 'developer'
    },
    {
      id: 'contact-info',
      title: 'contact info',
      current: false,
      router: 'contact-info',
      rightMenu: false,
      burgerMenu: true,
      hr: 'hr',
      dev: 'developer'
    },
    {
      id: 'log-out',
      title: 'log out',
      current: false,
      router: '',
      rightMenu: true,
      burgerMenu: false,
      hr: 'hr',
      dev: 'developer',
      logout: true
    },
    {
      id: 'my-profile',
      title: 'my profile',
      current: false,
      router: 'my-profile',
      rightMenu: true,
      burgerMenu: true,
      hr: 'hr',
      dev: 'developer'
    },
    {
      id: 'edit-profile',
      title: 'edit profile',
      current: false,
      router: '',
      rightMenu: true,
      burgerMenu: false,
      hr: 'hr',
      dev: ''
    },
    {
      id: 'create-user',
      title: 'create user',
      current: false,
      router: 'create-user',
      rightMenu: false,
      burgerMenu: true,
      hr: 'hr',
      dev: ''
    }
  ];


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        // HttpClientModule,
        HttpClientTestingModule
      ],
      declarations: [
        NavbarProfileComponent,
      ],
      providers: [
        UserService,
        NavItemsService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarProfileComponent);
    component = fixture.componentInstance;
    navItemsService = fixture.debugElement.injector.get(NavItemsService);
    userService = fixture.debugElement.injector.get(UserService);
    component.menuList = mockMenuList;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });

  // it(`should call metchod getUserType from userService`, inject([UserService, HttpTestingController], (service: UserService, backend:)) => {
  //   spy = spyOn(UserService.prototype, 'getUser');
  //   component.loadUser();
  //   spy.and.callThrough();
  //   expect(spy)
  //     .toHaveBeenCalled();
  // });



  it(`should be inject service, shouldn't get navites list if note async`, () => {
    jasmine.createSpy('getNavList').and
      .returnValue(Observable.of(mockMenuList));
    expect(component.menuList)
      .toEqual(mockMenuList);
    fixture.detectChanges();
  });

});
