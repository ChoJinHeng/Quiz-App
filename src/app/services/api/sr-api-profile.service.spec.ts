import { TestBed } from '@angular/core/testing';

import { SrApiProfile } from './sr-api-profile';

describe('SrApiProfile', () => {
  let service: SrApiProfile;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SrApiProfile);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
