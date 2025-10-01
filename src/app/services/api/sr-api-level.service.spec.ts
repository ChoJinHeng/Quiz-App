import { TestBed } from '@angular/core/testing';

import { SrApiLevelService } from './sr-api-level.service';

describe('SrApiLevelService', () => {
  let service: SrApiLevelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SrApiLevelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
