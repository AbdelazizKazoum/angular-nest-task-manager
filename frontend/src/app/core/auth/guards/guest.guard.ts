import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';

export const guestGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    // User is authenticated, redirect to dashboard
    router.navigate(['/dashboard']);
    return false;
  }

  // User is not authenticated, allow access to auth pages
  return true;
};
