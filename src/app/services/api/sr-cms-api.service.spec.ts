import { TestBed } from '@angular/core/testing';

import { SrCmsApi } from './sr-cms-api.service';

describe('SrCmsApi', () => {
  let service: SrCmsApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SrCmsApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
