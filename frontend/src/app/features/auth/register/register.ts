import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './register.html',
})
export class Register {
  registerForm: FormGroup;
  isLoading = false;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      terms: [false, [Validators.requiredTrue]], // Checkbox must be checked
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      console.log('Register Submitted', this.registerForm.value);

      // Simulate API call
      setTimeout(() => {
        this.isLoading = false;
        // Navigate to dashboard or login
      }, 2000);
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  hasError(field: string): boolean {
    const control = this.registerForm.get(field);
    return !!(control?.invalid && (control.dirty || control.touched));
  }
}
