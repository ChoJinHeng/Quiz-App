import { Injectable } from '@angular/core';

import { SrStorageService } from './sr-storage.service';
import { SrTokenService } from './sr-token.service';
import { SrApiBaseService } from './sr-api-base.service';
import { IUserLogin } from './sr-cms-api.service';

@Injectable({
  providedIn: 'root',
})
export class SrApiAuthService extends SrApiBaseService {
  constructor(storage: SrStorageService, tokenService: SrTokenService) {
    super(storage, tokenService);
  }

  async login(data: Partial<IUserLogin> & { rememberMe?: boolean }) {
    const rememberMe = data.rememberMe;
    delete data.rememberMe;
    let response = await this.post('Auth/login', {
      usertype: 'appuser',
      username: data.username,
      password: data.password,
    });
    if (response?.result?.token && response?.result?.user_id) {
      this.tokenService.setToken({
        token: response?.result?.token,
        userId: response?.result?.user_id,
        rememberMe: false,
      });
      let login = {
        require_setup: response?.result.requires_setup,
        isLogin: true,
      };

      return login;
    }
    return false;
  }

  logout() {
    this.tokenService.clearToken();
  }
}
