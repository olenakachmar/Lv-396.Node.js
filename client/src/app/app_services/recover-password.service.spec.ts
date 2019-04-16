import { TestBed } from '@angular/core/testing';

import { RecoverPasswordService } from './recover-password.service';

describe('RecoverPasswordService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecoverPasswordService = TestBed.get(RecoverPasswordService);
    expect(service).toBeTruthy();
  });
});
