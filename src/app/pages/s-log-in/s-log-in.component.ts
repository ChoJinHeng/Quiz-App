import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { SrApiAuthService } from 'src/app/services/api/sr-api-auth.service';
import { SrNavigationService } from 'src/app/services/sr-navigation.service';
import { CommonModule } from '@angular/common';
import { Keyboard } from '@capacitor/keyboard';
import {
  IonButton,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-s-log-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,IonButton],
  templateUrl: './s-log-in.component.html',
  styleUrls: ['./s-log-in.component.scss'],
})
export class SLogInComponent implements OnInit {
  form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  loginError: boolean = false;

  constructor(
    private authApi: SrApiAuthService,
    private navigationService: SrNavigationService
  ) {}

  ngOnInit() {}

  get requiredError() {
    if (!this.form.touched) return '';
    if (!this.form.valid) return 'Username and password are required';
    else if (this.loginError) return 'Wrong username or password';
    return '';
  }

  goTo(path: string) {
    this.form.reset();
    this.loginError = false;
    this.navigationService.goTo([path]);
  }

  async submit() {
    this.form.markAllAsTouched();
    this.loginError = false;
    if (!this.form.valid) {
      return;
    }

    const { username, password } = this.form.value;

    const respond = await this.authApi.login({
      username: username || '',
      password: password || '',
    });
    const userInfo: any = respond;

    if (!userInfo.isLogin) {
      this.loginError = true;
      return;
    }

    // Imported user flow
    if (userInfo.require_setup) {
      this.navigationService.goTo(['security-questions', 'imported-user']);
      return;
    }

    this.form.reset();
    this.goTo('');
  }

  dismissKeyboard(event: any) {
    if (event.key === 'Enter') {
      Keyboard.hide();
      let loginBtn = document.getElementById('loginBtn');
      if (loginBtn) {
        loginBtn.click();
      }
    }
  }
}
