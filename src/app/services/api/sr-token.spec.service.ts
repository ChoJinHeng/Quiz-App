import { TestBed } from '@angular/core/testing';

import { SrToken } from './sr-token.service';

describe('SrToken', () => {
  let service: SrToken;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SrToken);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
