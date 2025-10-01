import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { SrNavigationService } from '../sr-navigation.service';
import { SrStorageService } from './sr-storage.service';
import { SrTokenService } from './sr-token.service';
import { SrApiBaseService } from './sr-api-base.service';

@Injectable({
  providedIn: 'root',
})
export class SrApiLevelService extends SrApiBaseService {
  private data: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(
    storage: SrStorageService,
    tokenService: SrTokenService,
    private navigationService: SrNavigationService
  ) {
    super(storage, tokenService);
  }

  async getLevelList() {
    const tokenData = await this.tokenService.getToken();
    let tempData = {
      user_id: tokenData.userId,
    };
    let response = await this.post('UserLevels/getList', tempData, true);

    if (response.result.data) {
      const levels = response.result.data.map((i: any) => ({
        ...i,
        unlockall: response.result.unlockall,
      }));
      this.dataEmitter(levels);
      return levels;
    }

    return [];
  }

  dataEmitter(value: any) {
    this.data.next(value);
  }

  datalistener() {
    return this.data.asObservable();  
  }

  levelSelect(index: number, extra: object = {}) {
    this.datalistener()
      .pipe(take(1))
      .subscribe((data) => {
        const level = data[index];
        if (level?.isUnlocked) {
          this.navigationService.goTo(['question', data[index].id], extra);
        }
      });
  }
}
