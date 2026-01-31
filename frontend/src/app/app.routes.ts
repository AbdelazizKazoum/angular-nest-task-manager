import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout';
import { AuthGuard } from '@core/auth/guards/auth.guard';
import { guestGuard } from '@core/auth/guards/guest.guard';

export const routes: Routes = [
  // 1. Redirect Root URL (localhost:4200) to Dashboard
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },

  {
    path: 'auth',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },

  // 2. App Routes (Wrapped in MainLayout)
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('@features/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'tasks',
        loadComponent: () => import('@features/tasks/task-page/task-page').then((m) => m.TaskPage),
      },
    ],
  },

  // 3. Auth Routes (Wrapped in AuthLayout) - 👇 Add guestGuard here
  {
    path: 'auth',
    component: AuthLayoutComponent,
    canActivate: [guestGuard], // Prevents authenticated users from accessing auth pages
    children: [
      {
        path: 'login',
        loadComponent: () => import('@features/auth/login/login').then((m) => m.Login),
      },
      {
        path: 'register',
        loadComponent: () => import('@features/auth/register/register').then((m) => m.Register),
      },
    ],
  },

  // 4. Wildcard (404) - Optional but recommended
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
