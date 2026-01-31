import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logout-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logout-modal.html',
})
export class LogoutModal {
  // Use Signal Inputs (Angular 17+)
  isOpen = input.required<boolean>();
  isLoading = input.required<boolean>();

  // Outputs (New Syntax)
  close = output<void>();
  confirm = output<void>();

  onClose() {
    if (!this.isLoading()) {
      this.close.emit();
    }
  }

  onConfirm() {
    this.confirm.emit();
  }

  // Close when clicking outside the modal content
  onBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.onClose();
    }
  }
}
