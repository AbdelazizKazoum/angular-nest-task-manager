import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeService } from '@core/theme/theme.service.ts';
import { Navbar } from '@shared/components/navbar/navbar';
import { Sidebar } from '@shared/components/sidebar/sidebar';
import { LogoutModal } from '@shared/components/modals/logout-modal/logout-modal';
import { SidebarService } from '@shared/services/sidebar.service';
import { AuthService } from '@core/auth/auth.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule, Navbar, Sidebar, LogoutModal],
  templateUrl: './main-layout.html',
})
export class MainLayoutComponent {
  themeService = inject(ThemeService);
  sidebarService = inject(SidebarService);
  authService = inject(AuthService);

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
