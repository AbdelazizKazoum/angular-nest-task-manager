import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // Required for *ngIf works
import { ThemeService } from '@core/theme/theme.service.ts';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  // Make public so template can access it for the click handler and ngIf
  public themeService = inject(ThemeService);
}
