import { Location } from '@angular/common';
import { Injectable, NgZone } from '@angular/core';
import { NavigationEnd, NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SrNavigationService {
  private _state$: BehaviorSubject<any> = new BehaviorSubject<any>(
    new Date().getTime()
  );
  private subs: any[] = [];

  constructor(
    private router: Router,
    private nav: NavController,
    private location: Location,
    private zone: NgZone
  ) {
    this.subs[0] = this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this._state$.next(event.url);
      }
    });
  }

  showSplash = true;

  getState() {
    return this._state$.asObservable();
  }

  goTo(path: string[], extras?: NavigationExtras, replaceHistory = false) {
    return new Promise<void>((resolve, reject) => {
      try {
        this.zone.run(() => {
          setTimeout(async () => {
            const navigationExtras = replaceHistory
              ? { ...extras, replaceUrl: true }
              : extras;
            await this.router.navigate(path, navigationExtras);
            resolve();
          }, 1000);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  goToHome() {
    return this.goTo([''], undefined, true); // Replace history
  }

  goBack() {
    this.zone.run(() => {
      setTimeout(() => {
        this.location.back();
      }, 1000);
    });
  }
}
