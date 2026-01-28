import { Request as ExpressRequest } from 'express';

export interface AuthUser {
  _id?: string;
  id?: string;
  email: string;
  name: string;
}

export interface AuthenticatedRequest extends ExpressRequest {
  user: AuthUser;
}
