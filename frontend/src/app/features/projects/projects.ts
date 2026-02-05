import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface Project {
  _id: string;
  name: string;
  description?: string;
  owner: User;
  is_archived: boolean;
  created_at: string;
  updated_at: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe],
  templateUrl: './projects.html',
})
export class Projects {
  searchQuery: string = '';
  selectedProjects: Set<string> = new Set();

  projects: Project[] = [
    {
      _id: '1',
      name: 'Website Redesign',
      description: 'Redesigning the company corporate website',
      owner: {
        _id: 'u1',
        name: 'Darlene Robertson',
        email: 'alma.lawson@example.com',
        avatar: 'https://i.pravatar.cc/150?u=1',
      },
      is_archived: false,
      created_at: '2024-01-15T10:00:00Z',
      updated_at: '2024-01-20T10:00:00Z',
    },
    {
      _id: '2',
      name: 'Mobile App Support',
      description: 'Ongoing maintenance for the iOS application',
      owner: {
        _id: 'u2',
        name: 'Annette Black',
        email: 'bill.sanders@example.com',
        avatar: 'https://i.pravatar.cc/150?u=2',
      },
      is_archived: true,
      created_at: '2023-11-05T10:00:00Z',
      updated_at: '2023-12-01T10:00:00Z',
    },
    {
      _id: '3',
      name: 'Marketing Campaign',
      description: 'Q1 2024 Digital Marketing Strategy',
      owner: {
        _id: 'u3',
        name: 'Ronald Richards',
        email: 'weaver@example.com',
        avatar: 'https://i.pravatar.cc/150?u=3',
      },
      is_archived: false,
      created_at: '2024-02-01T09:30:00Z',
      updated_at: '2024-02-02T14:20:00Z',
    },
    {
      _id: '4',
      name: 'Server Migration',
      description: 'Migrating legacy servers to AWS',
      owner: {
        _id: 'u4',
        name: 'Ralph Edwards',
        email: 'simmons@example.com',
        avatar: 'https://i.pravatar.cc/150?u=4',
      },
      is_archived: false,
      created_at: '2024-01-10T11:00:00Z',
      updated_at: '2024-01-25T16:45:00Z',
    },
    {
      _id: '5',
      name: 'Brand Identity',
      description: 'New logo and brand guidelines',
      owner: {
        _id: 'u5',
        name: 'Edward John',
        email: 'lawson@example.com',
        avatar: 'https://i.pravatar.cc/150?u=5',
      },
      is_archived: false,
      created_at: '2023-12-15T08:00:00Z',
      updated_at: '2024-01-05T13:00:00Z',
    },
  ];

  get filteredProjects() {
    return this.projects.filter(
      (p) =>
        p.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        p.owner.name.toLowerCase().includes(this.searchQuery.toLowerCase()),
    );
  }

  isAllSelected() {
    return this.projects.length > 0 && this.selectedProjects.size === this.projects.length;
  }

  toggleAll(event: any) {
    if (event.target.checked) {
      this.selectedProjects = new Set(this.projects.map((p) => p._id));
    } else {
      this.selectedProjects.clear();
    }
  }

  toggleProject(id: string) {
    if (this.selectedProjects.has(id)) {
      this.selectedProjects.delete(id);
    } else {
      this.selectedProjects.add(id);
    }
  }

  isSelected(id: string) {
    return this.selectedProjects.has(id);
  }

  getStatusColor(archived: boolean): string {
    return archived
      ? 'bg-gray-100 text-gray-600' // Archived
      : 'bg-emerald-100 text-emerald-600'; // Active
  }

  getStatusText(archived: boolean): string {
    return archived ? 'Archived' : 'Active';
  }
}
