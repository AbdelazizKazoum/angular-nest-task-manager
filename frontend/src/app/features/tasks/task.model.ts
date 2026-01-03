export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in-progress',
  DONE = 'done',
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  assignedTo?: string;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}
