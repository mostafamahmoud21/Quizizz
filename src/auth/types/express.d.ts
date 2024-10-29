import * as express from 'express';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: User; // Define the structure of your user object
    }
  }
}
