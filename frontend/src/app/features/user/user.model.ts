export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'user' | 'admin' | 'manager';
  avatar?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// If you need domain logic (e.g., validation), add a class:
export class UserEntity implements User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public phone?: string,
    public role: 'user' | 'admin' | 'manager' = 'user',
    public avatar?: string,
    public isActive: boolean = true,
    public createdAt?: string,
    public updatedAt?: string,
  ) {}

  // Check if user is active
  isUserActive(): boolean {
    return this.isActive;
  }
}
