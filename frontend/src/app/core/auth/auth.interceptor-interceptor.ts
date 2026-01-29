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
        if (error.status === 401) {
          // Token expired—try refresh
          return this.authService.refreshToken().pipe(
            switchMap(() => {
              const newToken = this.authService.getToken();
              const retryReq = req.clone({
                setHeaders: { Authorization: `Bearer ${newToken}` },
              });
              return next.handle(retryReq);
            }),
            catchError(() => {
              this.authService.logout(); // Logout on refresh failure
              return throwError(() => error);
            }),
          );
        }
        return throwError(() => error);
      }),
    );
  }
}
