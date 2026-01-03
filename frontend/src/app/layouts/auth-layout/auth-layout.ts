import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet], // No ThemeService needed here usually, unless you want a toggle on login
  templateUrl: './auth-layout.html',
})
export class AuthLayoutComponent {}