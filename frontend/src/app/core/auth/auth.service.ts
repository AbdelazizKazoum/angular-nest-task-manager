import { HttpClient } from '@angular/common/http';
import { inject, Injectable, InjectionToken } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, tap, throwError, finalize } from 'rxjs';
import { UserService } from '../../features/user/user.service';
import { User } from '../../features/user/user.model';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

// Update User interface to match backend (or remove if using domain User)
// export interface User { ... } // Remove or alias to domain User

export interface AuthResponse {
  access_token: string;
  user: User;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiBaseUrl = inject(API_BASE_URL);
  private router = inject(Router);
  private userService = inject(UserService); // Add this

  // Reactive state: emits current user or null
  private userSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
  user$ = this.userSubject.asObservable();

  constructor() {
    // Check for existing token on app start
    const token = this.getToken();
    if (token) {
      const user = this.getUserFromStorage();
      if (user) {
        this.userSubject.next(user);
      }
      // Optionally validate token with backend (e.g., /auth/profile)
    }
  }

  login(credentials: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiBaseUrl}/auth/login`, credentials).pipe(
      tap((response) => {
        this.setToken(response.access_token);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.userSubject.next(response.user);
        this.router.navigate(['/dashboard']); // Redirect after login
      }),
      catchError((error) => {
        // Handle login errors (e.g., show toast)
        return throwError(() => error);
      }),
    );
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.apiBaseUrl}/auth/logout`, {}).pipe(
      // finalize runs whether the request succeeds or fails
      finalize(() => {
        this.clearToken();
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['auth/login']);
      }),
    );
  }

  refreshToken(): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiBaseUrl}/auth/refresh`, {}).pipe(
      tap((response) => {
        this.setToken(response.access_token);
        this.userSubject.next(response.user);
      }),
    );
  }

  private setToken(token: string): void {
    localStorage.setItem('access_token', token); // Use HttpOnly cookies in prod
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  private clearToken(): void {
    localStorage.removeItem('access_token');
  }

  private getUserFromStorage(): User | null {
    // If you store user in localStorage, retrieve it here
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Add register method
  register(userData: {
    name: string;
    email: string;
    password: string;
    phone?: string;
  }): Observable<User> {
    return this.userService.createUser(userData).pipe(
      tap((user) => {
        // Optional: Log success
        console.log('User registered:', user);
      }),
      catchError((error) => {
        // Handle errors (e.g., show toast notification)
        console.error('Registration failed:', error);
        return throwError(() => error);
      }),
    );
  }
}
