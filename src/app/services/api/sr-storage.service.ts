import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

export const STORAGE_KEYS = {
  TOKEN: 'TOKEN',
  USER_ID: 'USER_ID',
  ANNOUNCEMENT_SHOWN: 'ANNOUNCEMENT_SHOWN',
  IS_GAME_TIP_SHOWN: 'IS_GAME_TIP_SHOWN',
  LOGIN_TIMER: 'LOGIN_TIMER',
} as const;

export type KeyType = keyof typeof STORAGE_KEYS;

@Injectable({
  providedIn: 'root',
})
export class SrStorageService {
  constructor() {}

  async setItem(key: KeyType, value: any) {
    await Preferences.set({
      key,
      value,
    });
  }
  async getItem(key: KeyType) {
    return (await Preferences.get({ key })).value;
  }

  removeItem(key: KeyType) {
    Preferences.remove({ key });
  }
}
