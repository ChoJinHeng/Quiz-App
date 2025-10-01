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
export class PrivateGuard implements CanActivate {
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
    // Authenticate user if they are already logged in
    return new Promise<boolean>(async (resolve) => {
      try {
        const isUserAuthenticated = await this.profileApi.isUserAuthenticated();
        if (!isUserAuthenticated) {
          console.log('User not authenticated, redirecting to login');
          this.navigationService.goTo(['login']);
          resolve(false);
          return;
        }

        // User is authenticated, hide splash and allow access
        this.navigationService.showSplash = false;
        resolve(true);
      } catch (error) {
        console.error('Authentication check failed:', error);
        this.navigationService.goTo(['login']);
        resolve(false);
      }
    });
  }
}
