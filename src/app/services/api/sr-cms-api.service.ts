import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { environment } from 'src/environments/environment';
import { SrTokenService } from './sr-token.service';

export interface IRegisterData {
  usertype: string;
  username: string;
  password: string;
  school: string;
  securityquestion1: string;
  securityanswer1: string;
  securityquestion2: string;
  securityanswer2: string;
  securityquestion3: string;
  securityanswer3: string;
  avatar: string;
}
export interface IUserLogin {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class SrCmsApiService {
  constructor(private tokenService: SrTokenService) {}

  async init(withToken = false) {
    const headers: any = {
      XAPIKEY: environment.cmsKey,
    };

    if (withToken) {
      headers.Authorization = `Bearer ${
        this.tokenService.getTokenSync().token
      }`;
    }
    return axios.create({
      baseURL: environment.cmsBaseUrl,
      headers,
    });
  }

  async getAppUsers(userId: number) {
    return (await this.init()).get(`AppUsers${userId}`);
  }

  async getGameQuestions(level: string) {
    const token = await this.tokenService.getToken();
    let user_id = token.userId;
    let response = await ((await this.init(true)) as any).post(
      'Questions/getRandomGroup',
      {
        level_id: level,
        user_id,
      }
    );
    return response.data.result.questiongroup;
  }

  async getGameResults(data: any) {
    const token = await this.tokenService.getToken();
    let user_id = token.userId;
    data.user_id = user_id;
    let response = await ((await this.init(true)) as any).post(
      'Questions/resultSummary',
      data
    );
    return response.data.result;
  }

  async getGameTotal(data: any) {
    const token = await this.tokenService.getToken();
    let user_id = token.userId;
    data.user_id = user_id;
    let response = await ((await this.init(true)) as any).post(
      'Levels/getTotalPoint',
      data
    );
    return response.data.result;
  }

  async login(data: any) {
    return (await this.init(true)).post('Auth/login', {
      usertype: 'appuser',
      ...data,
    });
  }

  async getLevels() {
    const token = await this.tokenService.getToken();
    let userId = token.userId;
    return (await this.init(true)).post('UserLevels/getList', {
      user_id: userId,
    });
  }
}
