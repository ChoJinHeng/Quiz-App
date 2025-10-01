import { TestBed } from '@angular/core/testing';

import { SrGameQuestionApiService } from './sr-game-question-api.service';

describe('SrGameQuestionApiService', () => {
  let service: SrGameQuestionApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SrGameQuestionApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
