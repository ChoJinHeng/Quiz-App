import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SrApiProfileService } from '../services/api/sr-api-profile.service';
import { SrNavigationService } from '../services/sr-navigation.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private profileApi: SrApiProfileService,
    private navigationService: SrNavigationService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // This is will authenticate user if user is already login.
    // This is to use in long route, this is quick implementation for now,
    // but need to change later if things gets complex.
    return new Promise<boolean>(async (resolve) => {
      const isUserAuthenticated = await this.profileApi.isUserAuthenticated();
      if (isUserAuthenticated) {
        resolve(false);
        this.navigationService.goTo([''], undefined, true);
      }
      this.navigationService.showSplash = false;
      resolve(true);
    });
  }
}
