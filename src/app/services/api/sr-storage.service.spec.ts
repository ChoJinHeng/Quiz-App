import { TestBed } from '@angular/core/testing';

import { SrStorage } from './sr-storage.service';

describe('SrStorage', () => {
  let service: SrStorage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SrStorage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
