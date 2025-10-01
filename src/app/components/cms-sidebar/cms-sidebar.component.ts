import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonMenu,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonRouterLink,
  IonBackButton,
  IonButton,
  IonMenuToggle,
} from '@ionic/angular/standalone';
@Component({
  selector: 'app-cms-sidebar',
  templateUrl: './cms-sidebar.component.html',
  imports: [
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonMenu,
    IonTitle,
    IonRouterLink,
    IonMenuToggle,
    RouterLink,
    IonBackButton,
    IonToolbar,
  ],
  styleUrls: ['./cms-sidebar.component.scss'],
})
export class CmsSidebarComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
