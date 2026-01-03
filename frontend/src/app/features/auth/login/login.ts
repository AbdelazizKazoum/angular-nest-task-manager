import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
})
export class Login{
  loginForm: FormGroup;
  isLoading = false;

  constructor(private fb: FormBuilder) {
    // Initialize form with validations
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      console.log('Form Submitted', this.loginForm.value);

      // Simulate API call duration
      setTimeout(() => {
        this.isLoading = false;
        // Navigate to dashboard here
      }, 2000);
    } else {
      // Mark all fields as touched to show errors
      this.loginForm.markAllAsTouched();
    }
  }

  // Helper for template to check error state quickly
  hasError(field: string): boolean {
    const control = this.loginForm.get(field);
    return !!(control?.invalid && (control.dirty || control.touched));
  }
}
