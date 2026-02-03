import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  // Existing sidebar states
  isOpen = signal(false);
  isCollapsed = signal(false);

  // New: Modal state (global, so it can be used in main layout)
  showLogoutModal = signal(false);
  isLoggingOut = signal(false);

  toggleSidebar() {
    this.isOpen.update((open) => !open);
  }

  toggleCollapsed() {
    this.isCollapsed.update((collapsed) => !collapsed);
  }

  closeSidebar() {
    this.isOpen.set(false);
  }

  // New: Modal methods
  openLogoutModal() {
    this.showLogoutModal.set(true);
  }

  closeLogoutModal() {
    this.showLogoutModal.set(false);
  }

  setLoggingOut(state: boolean) {
    this.isLoggingOut.set(state);
  }
}
