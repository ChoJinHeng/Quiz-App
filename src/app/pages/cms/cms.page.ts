import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar,
  IonRouterLink,
  IonContent,
  IonRouterOutlet,
  IonMenuToggle,
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { CmsSidebarComponent } from "src/app/components/cms-sidebar/cms-sidebar.component";
@Component({
  selector: 'app-cms',
  templateUrl: './cms.page.html',
  styleUrls: ['./cms.page.scss'],
  standalone: true,
  imports: [
    IonRouterOutlet,
    IonContent,
    CommonModule,
    FormsModule,
    IonButtons,
    IonHeader,
    IonMenuButton,
    IonTitle,
    IonRouterLink,
    IonToolbar,
    RouterLink,
    CmsSidebarComponent
],
})
export class CmsPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
