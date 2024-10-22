// src/types/express.d.ts
import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: { id: number; name: string; email: string; role: string }; // Define the structure of your user object
    }
  }
}
