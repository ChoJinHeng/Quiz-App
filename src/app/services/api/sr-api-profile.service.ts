import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SrStorageService } from './sr-storage.service';
import { SrTokenService } from './sr-token.service';
import { SrApiBaseService } from './sr-api-base.service';

@Injectable({
  providedIn: 'root',
})
export class SrApiProfileService extends SrApiBaseService {
  private _userProfile$ = new BehaviorSubject<any>(null);

  constructor(storage: SrStorageService, tokenService: SrTokenService) {
    super(storage, tokenService);
  }

  getProfile() {
    return this._userProfile$.asObservable();
  }

  getProfileData() {
    return this._userProfile$.getValue();
  }

  async fetchProfile() {
    const token = await this.tokenService.getToken();
    let userID = token.userId;
    let response = await this.post(
      'AppUsers/getProfileDetail',
      {
        user_id: userID,
      },
      true
    );

    if (response.result) {
      this._userProfile$.next(response.result);
    }

    return response;
  }

  async isLoginExpired() {
    try {
      const exp = await this.storage.getItem('LOGIN_TIMER');
      if (exp && new Date().getTime() > parseInt(exp)) {
        this.tokenService.clearToken();
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }
  async isUserAuthenticated() {
    if (await this.isLoginExpired()) return false;

    // Check if token exists before making API call
    const token = await this.tokenService.getToken();
    if (!token.token || !token.userId) return false;

    try {
      const response = await this.fetchProfile();
      return !!response?.result?.username;
    } catch (error) {
      // If API call fails, user is not authenticated
      return false;
    }
  }

  async editProfile({ username = null, school = null }) {
    const token = await this.tokenService.getToken();
    let userId = token.userId;
    const data: any = {};
    if (username) {
      data.username = username;
    }
    if (school) {
      data.school = school;
    }

    let response = await this.post('AppUsers/' + userId, data, true);

    return response;
  }

  async deleteProfile() {
    const token = await this.tokenService.getToken();
    let user_id = token.userId;
    let response = await this.post(
      'AppUsers/deactivateUser',
      { user_id },
      true
    );
    return response;
  }

  async editSecurityQuestions(input: any) {
    const token = await this.tokenService.getToken();
    let userId = token.userId;

    const data: any = {};
    try {
      data.security_question = input.question1.value;
      data.security_answer = input.answer1;
      data.security_question_2 = input.question2.value;
      data.security_answer_2 = input.answer2;
      data.security_question_3 = input.question3.value;
      data.security_answer_3 = input.answer3;
      data.requires_setup = false;

      console.log(data.security_answer_3);
      let response = await this.post('AppUsers/' + userId, data, true);
      console.log(response);
      return response;
    } catch (err) {
      console.log(err);
    }
  }
}
