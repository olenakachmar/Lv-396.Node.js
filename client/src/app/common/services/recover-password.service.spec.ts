import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { RecoverPasswordService } from './recover-password.service';

describe('RecoverPasswordService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientModule, ReactiveFormsModule ]
  }));

  it('should be created', () => {
    const service: RecoverPasswordService = TestBed.get(RecoverPasswordService);
    expect(service).toBeTruthy();
  });
});
