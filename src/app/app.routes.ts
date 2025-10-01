import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { PrivateGuard } from './guards/private.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./pages/home/home.page').then((m) => m.HomePage);
    },
    canActivate: [PrivateGuard],
  },
  {
    path: 'cms',
    loadComponent: () => import('./pages/cms/cms.page').then((m) => m.CmsPage),
    canActivate: [PrivateGuard],
    children: [
      {
        path: 'quiz-management',
        loadComponent: () =>
          import(
            './components/quiz-management-template/quiz-management-template.component'
          ).then((m) => m.QuizManagementTemplateComponent),
      },
    ],
  },
  {
    path: 'login',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/s-log-in/s-log-in.component').then(
        (m) => m.SLogInComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/profile/profile.component').then(
        (m) => m.ProfileComponent
      ),
  },
  {
    path: 'question',
    loadComponent: () =>
      import('./pages/question-page/question-page.component').then(
        (m) => m.QuestionPageComponent
      ),
  },
];
