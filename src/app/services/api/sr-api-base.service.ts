import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { environment } from 'src/environments/environment';
import { SrStorageService } from './sr-storage.service';
import { SrTokenService } from './sr-token.service';

@Injectable({
  providedIn: 'root',
})
export class SrApiBaseService {
  constructor(
    protected storage: SrStorageService,
    protected tokenService: SrTokenService
  ) {}

  protected async init(wToken: boolean = false): Promise<AxiosInstance> {
    const headers: any = {
      XAPIKEY: environment.cmsKey,
    };

    if (wToken)
      headers.Authorization =
        'Bearer ' + this.tokenService.getTokenSync().token;

    return axios.create({
      baseURL: environment.cmsBaseUrl,
      headers,
    });
  }

  protected async get(
    path: string,
    data: any = {},
    wToken: boolean = false
  ): Promise<any> {
    try {
      let response = await ((await this.init(wToken)) as AxiosInstance).get(
        path,
        { data }
      );
      return response.status == 200 ? response.data : false;
    } catch (error) {
      return false;
    }
  }

  protected async post(
    path: string,
    data: any = {},
    wToken: boolean = false
  ): Promise<any> {
    try {
      let response = await ((await this.init(wToken)) as AxiosInstance).post(
        path,
        data
      );
      return response.status == 200 ? response.data : false;
    } catch (error) {
      return false;
    }
  }

  protected async put(path: string, data: any = {}, wToken: boolean = false) {
    try {
      let response = await ((await this.init(wToken)) as AxiosInstance).put(
        path,
        data
      );
      return response.status == 200 ? response.data : false;
    } catch (error) {
      return false;
    }
  }
}
