import { Component, signal } from '@angular/core'; // Import signal
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
})
export class Login {
  loginForm: FormGroup;

  // Use Signals for local UI state
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // Set signal values for loading state
      this.isLoading.set(true);
      this.errorMessage.set(null);

      const credentials = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value,
      };

      this.authService.login(credentials).subscribe({
        next: () => {
          this.isLoading.set(false);
          // Router navigation happens in AuthService, view updates automatically
        },
        error: (err) => {
          this.isLoading.set(false);

          // Handle error messaging
          if (err.status === 401 || err.status === 403) {
            this.errorMessage.set('Invalid email or password.');
          } else {
            this.errorMessage.set('Something went wrong. Please try again later.');
          }
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  hasError(field: string): boolean {
    const control = this.loginForm.get(field);
    return !!(control?.invalid && (control.dirty || control.touched));
  }
}
