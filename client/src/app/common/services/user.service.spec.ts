import { TestBed, getTestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { api } from '../../../environments/environment';

import { UserService } from './user.service';

describe('UserService', () => {
  let injector: TestBed;
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [UserService]
    })
    injector = getTestBed();
    service = injector.get(UserService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });

  describe('getUsers()', () => {
    it('should return an Observable<User[]>', () => {
      const dummyUsers = [{}, {}];

      service.getAll().subscribe(users => {
        expect(users.length).toBe(1);
        expect(users).toEqual(dummyUsers);
      });

      const req = httpMock.expectOne(`${api}users`);
      expect(req.request.method).toBe("GET");
      req.flush(dummyUsers);
    });
  });
});
