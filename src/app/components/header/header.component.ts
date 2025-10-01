import { Component, OnInit, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonAvatar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [IonAvatar, RouterLink],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
  message = input();
}
