import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  imports: [CommonModule, FormsModule],
  templateUrl: './projects.html',
})
export class Projects {
  searchQuery: string = '';
  selectedProjects: Set<number> = new Set();

  projects: Project[] = [
    {
      id: 1,
      name: 'Website Redesign',
      lead: 'Darlene Robertson',
      leadAvatar: 'https://i.pravatar.cc/150?u=1',
      category: 'Design Team',
      contactEmail: 'alma.lawson@example.com',
      deadline: '(252) 555-0126', // Using phone format from image as placeholder for now, or actual date
      status: 'Active',
    },
    {
      id: 2,
      name: 'Mobile App Support',
      lead: 'Annette Black',
      leadAvatar: 'https://i.pravatar.cc/150?u=2',
      category: 'Development',
      contactEmail: 'bill.sanders@example.com',
      deadline: '(252) 555-0127',
      status: 'Pending',
    },
    {
      id: 3,
      name: 'Marketing Campaign',
      lead: 'Ronald Richards',
      leadAvatar: 'https://i.pravatar.cc/150?u=3',
      category: 'Marketing',
      contactEmail: 'weaver@example.com',
      deadline: '(252) 555-0128',
      status: 'Active',
    },
    {
      id: 4,
      name: 'Server Migration',
      lead: 'Ralph Edwards',
      leadAvatar: 'https://i.pravatar.cc/150?u=4',
      category: 'Engineering',
      contactEmail: 'simmons@example.com',
      deadline: '(252) 555-0129',
      status: 'Active',
    },
    {
      id: 5,
      name: 'Brand Identity',
      lead: 'Edward John',
      leadAvatar: 'https://i.pravatar.cc/150?u=5',
      category: 'Sales',
      contactEmail: 'lawson@example.com',
      deadline: '(252) 555-0130',
      status: 'Active',
    },
    {
      id: 6,
      name: 'User Research',
      lead: 'Esther Howard',
      leadAvatar: 'https://i.pravatar.cc/150?u=6',
      category: 'Human Resources',
      contactEmail: 'roberts@example.com',
      deadline: '(252) 555-0131',
      status: 'Active',
    },
    {
      id: 7,
      name: 'Cloud Infrastructure',
      lead: 'Devon Lane',
      leadAvatar: 'https://i.pravatar.cc/150?u=7',
      category: 'Customer Success',
      contactEmail: 'tim.jennings@example.com',
      deadline: '(252) 555-0132',
      status: 'Pending',
    },
    {
      id: 8,
      name: 'Data Analysis',
      lead: 'Albert Flores',
      leadAvatar: 'https://i.pravatar.cc/150?u=8',
      category: 'Marketing',
      contactEmail: 'debra.holt@example.com',
      deadline: '(252) 555-0133',
      status: 'Active',
    },
    {
      id: 9,
      name: 'Security Audit',
      lead: 'Courtney Henry',
      leadAvatar: 'https://i.pravatar.cc/150?u=9',
      category: 'Product',
      contactEmail: 'felicia.reid@example.com',
      deadline: '(252) 555-0134',
      status: 'Pending',
    },
  ];

  get filteredProjects() {
    return this.projects.filter(
      (p) =>
        p.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        p.lead.toLowerCase().includes(this.searchQuery.toLowerCase()),
    );
  }

  isAllSelected() {
    return this.projects.length > 0 && this.selectedProjects.size === this.projects.length;
  }

  toggleAll(event: any) {
    if (event.target.checked) {
      this.selectedProjects = new Set(this.projects.map((p) => p.id));
    } else {
      this.selectedProjects.clear();
    }
  }

  toggleProject(id: number) {
    if (this.selectedProjects.has(id)) {
      this.selectedProjects.delete(id);
    } else {
      this.selectedProjects.add(id);
    }
  }

  isSelected(id: number) {
    return this.selectedProjects.has(id);
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Active':
        return 'bg-emerald-100 text-emerald-600';
      case 'Pending':
        return 'bg-amber-100 text-amber-600';
      case 'Completed':
        return 'bg-blue-100 text-blue-600';
      case 'On Hold':
        return 'bg-gray-100 text-gray-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  }
}
