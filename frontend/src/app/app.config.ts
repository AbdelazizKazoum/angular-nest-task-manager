import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { environment } from '../environments/environment';
import { provideHttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { API_BASE_URL } from './core/auth/auth.service';
import { AuthInterceptor } from './core/auth/auth.interceptor-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    { provide: API_BASE_URL, useValue: environment.apiBaseUrl },
    provideHttpClient(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
};
