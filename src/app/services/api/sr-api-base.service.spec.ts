import { TestBed } from '@angular/core/testing';

import { SrApiBase } from './sr-api-base.service';

describe('SrApiBase', () => {
  let service: SrApiBase;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SrApiBase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
