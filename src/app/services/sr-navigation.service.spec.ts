import { TestBed } from '@angular/core/testing';

import { SrNavigation } from './sr-navigation.service';

describe('SrNavigation', () => {
  let service: SrNavigation;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SrNavigation);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
