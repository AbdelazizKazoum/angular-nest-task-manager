import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/auth/auth.service'; // Add this

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './register.html',
})
export class Register {
  registerForm: FormGroup;
  isLoading = signal(false);
  showSuccessModal = signal(false);
  private authService = inject(AuthService); // Add this
  private router = inject(Router); // Add this

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: [''], // Optional
      terms: [false, [Validators.requiredTrue]], // Checkbox must be checked
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading.set(true);
      const formValue = this.registerForm.value;
      this.authService
        .register({
          name: formValue.fullName,
          email: formValue.email,
          password: formValue.password,
          phone: formValue.phone || undefined,
        })
        .subscribe({
          next: () => {
            this.isLoading.set(false);
            this.showSuccessModal.set(true);
          },
          error: (error) => {
            this.isLoading.set(false);
            // Show error (e.g., via a toast service or form error)
            console.error('Registration error:', error);
            // Example: Set a general error on the form
            this.registerForm.setErrors({ serverError: 'Registration failed. Please try again.' });
          },
        });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  closeModal() {
    this.showSuccessModal.set(false);
    this.router.navigate(['/auth/login']);
  }

  hasError(field: string): boolean {
    const control = this.registerForm.get(field);
    return !!(control?.invalid && (control.dirty || control.touched));
  }
}
