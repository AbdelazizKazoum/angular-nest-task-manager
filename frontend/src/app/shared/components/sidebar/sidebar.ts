import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { LogoutModal } from '../modals/logout-modal/logout-modal'; // Import the Modal

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, LogoutModal],
  templateUrl: './sidebar.html',
})
export class Sidebar {
  authService = inject(AuthService);

  // Modal State Signals
  showLogoutModal = signal(false);
  isLoggingOut = signal(false);

  openLogoutModal() {
    this.showLogoutModal.set(true);
  }

  closeLogoutModal() {
    this.showLogoutModal.set(false);
  }

  handleLogoutConfirm() {
    this.isLoggingOut.set(true);

    // Call the actual backend logout endpoint
    this.authService.logout().subscribe({
      next: () => {
        // Cleaning up state happens in authService.finalize()
        this.isLoggingOut.set(false);
        this.showLogoutModal.set(false);
      },
      error: (err) => {
        // Even if error happens, authService handles the redirection
        console.error('Logout failed on server', err);
        this.isLoggingOut.set(false);
        this.showLogoutModal.set(false);
      },
    });
  }
}
