import { TestBed } from '@angular/core/testing';

import { SocialNetworkService } from './social-network.service';

describe('SocialNetworkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SocialNetworkService = TestBed.get(SocialNetworkService);
    expect(service).toBeTruthy();
  });
});
