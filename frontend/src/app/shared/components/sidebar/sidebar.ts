import { Component, inject, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

// 👇 Clean Imports
import { AuthService } from '@core/auth/auth.service';
import { SidebarService } from '@shared/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
})
export class Sidebar {
  authService = inject(AuthService);
  sidebarService = inject(SidebarService);

  // Screen size signal
  isMobile = signal(false);

  constructor() {
    this.isMobile.set(window.innerWidth < 768);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile.set(window.innerWidth < 768);
  }

  // Delegate to service
  openLogoutModal() {
    this.sidebarService.openLogoutModal();
  }

  handleLogoutConfirm() {
    this.sidebarService.setLoggingOut(true);

    this.authService.logout().subscribe({
      next: () => {
        this.sidebarService.setLoggingOut(false);
        this.sidebarService.closeLogoutModal();
      },
      error: (err) => {
        console.error('Logout failed on server', err);
        this.sidebarService.setLoggingOut(false);
        this.sidebarService.closeLogoutModal();
      },
    });
  }
}
