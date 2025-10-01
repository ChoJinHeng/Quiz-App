import { Component, OnInit } from '@angular/core';
import { IonButton } from '@ionic/angular/standalone';
import { SrApiAuthService } from 'src/app/services/api/sr-api-auth.service';
import { SrNavigationService } from 'src/app/services/sr-navigation.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [IonButton],
})
export class ProfileComponent implements OnInit {
  constructor(
    private authService: SrApiAuthService,
    private navigationService: SrNavigationService
  ) {}

  ngOnInit() {}
  logout() {
    this.authService.logout();
    this.navigationService.goTo(['login']);
  }
}
