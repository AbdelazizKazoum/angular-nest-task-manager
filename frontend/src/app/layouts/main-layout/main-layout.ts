import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../core/theme/theme.service.ts';
import { Navbar } from '../../shared/components/navbar/navbar.js';
import { Sidebar } from '../../shared/components/sidebar/sidebar.js';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule, Navbar, Sidebar],
  templateUrl: './main-layout.html',
})
export class MainLayoutComponent {
  themeService = inject(ThemeService);
}
