import { Component, inject, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

// 👇 Clean Imports
import { AuthService } from '@core/auth/auth.service';
import { SidebarService } from '@shared/services/sidebar.service';

interface MenuItem {
  label: string;
  route: string;
  icon: string;
  section: string;
  isRouterLink: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
})
export class Sidebar {
  authService: AuthService = inject(AuthService);
  sidebarService: SidebarService = inject(SidebarService);

  // Screen size signal
  isMobile = signal(false);

  menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      route: '/dashboard',
      icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z',
      section: 'Home',
      isRouterLink: true,
    },
    {
      label: 'My Tasks',
      route: '/tasks',
      icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
      section: 'App',
      isRouterLink: true,
    },
    {
      label: 'Calendar',
      route: '',
      icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
      section: 'App',
      isRouterLink: false,
    },
    {
      label: 'Projects',
      route: '/projects',
      icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
      section: 'App',
      isRouterLink: true,
    },
  ];

  constructor() {
    this.isMobile.set(window.innerWidth < 768);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile.set(window.innerWidth < 768);
  }

  // TrackBy function for ngFor
  trackByItem(index: number, item: MenuItem): string {
    return item.route;
  }

  // Delegate to service
  openLogoutModal() {
    this.sidebarService.openLogoutModal();
  }
}
