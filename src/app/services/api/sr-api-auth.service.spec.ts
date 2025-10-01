import { TestBed } from '@angular/core/testing';

import { SrApiAuthService } from './sr-api-auth.service';

describe('SrApiAuth', () => {
  let service: SrApiAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SrApiAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
