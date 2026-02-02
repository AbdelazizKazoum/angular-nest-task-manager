import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';
import { API_BASE_URL } from '../../core/auth/auth.service'; // Reuse token

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private apiBaseUrl = inject(API_BASE_URL);

  createUser(userData: CreateUserRequest): Observable<User> {
    return this.http.post<User>(`${this.apiBaseUrl}/user`, userData);
  }

  // Add other user operations here (e.g., getUserById) as needed
}
