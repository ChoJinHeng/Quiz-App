import { Component, signal } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { SrTokenService } from './services/api/sr-token.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  protected readonly title = signal('Quiz-Home');

  constructor(private tokenService: SrTokenService) {
    this.initializeApp();
  }

  private async initializeApp() {
    // Load tokens from storage before navigation starts
    await this.tokenService.loadToken();
  }
}
