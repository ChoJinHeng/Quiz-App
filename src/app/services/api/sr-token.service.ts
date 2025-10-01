import { Injectable } from '@angular/core';
import { SrStorageService } from './sr-storage.service';

@Injectable({
  providedIn: 'root',
})
export class SrTokenService {
  private _userId = '';
  private _token = '';
  private _initialized = false;

  constructor(private storage: SrStorageService) {
    this.initializeTokens();
  }

  private async initializeTokens() {
    if (!this._initialized) {
      await this.loadToken();
      this._initialized = true;
    }
  }

  setToken(options: { userId: string; token: string; rememberMe?: boolean }) {
    this._userId = options.userId;
    this._token = options.token;
    this.storage.setItem('USER_ID', options.userId);
    this.storage.setItem('TOKEN', options.token);

    // Puts a timer on login. The check happens on login page
    if (options.rememberMe) {
      this.storage.setItem('LOGIN_TIMER', new Date().getTime() + 3600000);
    }
  }

  async getToken() {
    // Ensure tokens are loaded before returning them
    await this.initializeTokens();
    return {
      userId: this._userId,
      token: this._token,
    };
  }

  getTokenSync() {
    return {
      userId: this._userId,
      token: this._token,
    };
  }

  async loadToken() {
    this._userId = (await this.storage.getItem('USER_ID')) ?? '';
    this._token = (await this.storage.getItem('TOKEN')) ?? '';
  }

  clearToken() {
    this.storage.removeItem('TOKEN');
    this.storage.removeItem('USER_ID');
    this.storage.removeItem('ANNOUNCEMENT_SHOWN');
    this.storage.removeItem('LOGIN_TIMER');
    this.storage.removeItem('IS_GAME_TIP_SHOWN');
    this._userId = '';
    this._token = '';
    this._initialized = false;
  }
}
