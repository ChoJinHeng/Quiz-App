import { Injectable } from '@angular/core';
import { SrCmsApiService } from './api/sr-cms-api.service';

@Injectable({
  providedIn: 'root',
})
export class SrGameQuestionApiService {
  constructor(private api: SrCmsApiService) {}
  async getData(level: string) {
    return await this.api.getGameQuestions(level);
    // this.data.next();
  }

  async getResults(data: any) {
    return await this.api.getGameResults(data);
  }

  async getTotalResults(data: any) {
    return await this.api.getGameTotal(data);
  }
}
