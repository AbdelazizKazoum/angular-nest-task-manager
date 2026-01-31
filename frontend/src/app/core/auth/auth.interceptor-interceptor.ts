import { Injectable, inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, switchMap, catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private authService = inject(AuthService);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    let authReq = req;

    if (token) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(authReq).pipe(
      catchError((error) => {
        // Fix: Check if error is 401 AND the URL is NOT the login endpoint
        if (error.status === 401 && !req.url.includes('/auth/login')) {
          // Token expired—try refresh
          return this.authService.refreshToken().pipe(
            switchMap((response) => {
              // Note: refreshToken returns Use object, ensure you grab the token correctly
              // Based on your AuthService, refreshToken populates localstorage,
              // but we need the token string explicitly here if possible,
              // or just grab it from storage again.
              const newToken = response.access_token || this.authService.getToken();

              const retryReq = req.clone({
                setHeaders: { Authorization: `Bearer ${newToken}` },
              });
              return next.handle(retryReq);
            }),
            catchError((refreshErr) => {
              this.authService.logout(); // Logout on refresh failure
              return throwError(() => refreshErr);
            }),
          );
        }

        // If it's a login error (401 on /login) or any other error, pass it to the component
        return throwError(() => error);
      }),
    );
  }
}
