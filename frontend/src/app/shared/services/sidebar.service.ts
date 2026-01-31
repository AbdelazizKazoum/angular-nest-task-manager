import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  // For mobile: controls visibility
  isOpen = signal(false);

  // For desktop: controls collapsed state (icons only)
  isCollapsed = signal(false);

  toggleSidebar() {
    this.isOpen.update((open) => !open);
  }

  toggleCollapsed() {
    this.isCollapsed.update((collapsed) => !collapsed);
  }

  closeSidebar() {
    this.isOpen.set(false);
  }
}
