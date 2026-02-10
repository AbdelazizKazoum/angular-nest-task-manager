import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface ProjectFormData {
  name: string;
  description: string;
}

@Component({
  selector: 'app-project-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './project-modal.html',
})
export class ProjectModal implements OnChanges {
  @Input() isOpen = false;
  @Input() mode: 'create' | 'edit' = 'create';
  @Input() initialData: ProjectFormData | null = null;

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<ProjectFormData>();

  projectForm: ProjectFormData = {
    name: '',
    description: '',
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isOpen'] && this.isOpen) {
      this.resetForm();
    }
  }

  resetForm() {
    if (this.mode === 'edit' && this.initialData) {
      this.projectForm = { ...this.initialData };
    } else {
      this.projectForm = {
        name: '',
        description: '',
      };
    }
  }

  onClose() {
    this.close.emit();
  }

  onSubmit() {
    this.save.emit(this.projectForm);
  }
}
